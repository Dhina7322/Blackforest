const fs = require('fs');
const path = require('path');
const https = require('https');

const utilsDir = path.join(__dirname, 'src', 'utils');
const contextDir = path.join(__dirname, 'src', 'context');
const dataDir = path.join(__dirname, 'src', 'data');
const targetDir = path.join(__dirname, 'public', 'images', 'pages');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      resolve(); 
      return;
    }
    
    let fetchUrl = url;
    if (url.includes('unsplash.com')) {
      fetchUrl = url.replace(/&auto=format/, '&fm=webp').replace(/\?auto=format/, '?fm=webp');
      if (!fetchUrl.includes('fm=webp')) {
         fetchUrl += (fetchUrl.includes('?') ? '&' : '?') + 'fm=webp';
      }
    }

    const file = fs.createWriteStream(destPath);
    https.get(fetchUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
          return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${fetchUrl}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {}); 
      reject(err);
    });
  });
}

async function processDirectory(directory) {
    if (!fs.existsSync(directory)) return;
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await processDirectory(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            await processFile(fullPath);
        }
    }
}

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const urlRegex = /https:\/\/(images\.unsplash\.com\/photo-[a-zA-Z0-9-]+|blackforestholidays\.com\/wp-content\/uploads\/[a-zA-Z0-9_./-]+)[^'"\s\\]*/g;
  
  const matches = [...content.matchAll(urlRegex)];
  const uniqueUrls = [...new Set(matches.map(m => m[0]))];
  if (uniqueUrls.length === 0) return;
  
  let i = 1;
  for (const url of uniqueUrls) {
    let filename;
    if (url.includes('unsplash.com')) {
        const photoIdMatch = url.match(/photo-([a-zA-Z0-9-]+)/);
        const photoId = photoIdMatch ? photoIdMatch[1].substring(0, 12) : `img${i}`;
        filename = `unsplash-${photoId}.webp`;
    } else {
        const basename = path.basename(url.split('?')[0]);
        filename = basename.endsWith('.webp') ? basename : basename + '.webp';
    }
    
    const localPath = `/images/pages/${filename}`;
    const destPath = path.join(targetDir, filename);
    
    console.log(`Downloading ${filename} from ${url}`);
    try {
        await downloadImage(url, destPath);
        content = content.split(url).join(localPath);
    } catch(e) {
        console.error("Error downloading", url, e);
    }
    
    i++;
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${filePath}`);
}

async function main() {
  await processDirectory(utilsDir);
  await processDirectory(contextDir);
  await processDirectory(dataDir);
  console.log("Done downloading misc images.");
}

main();
