const fs = require('fs');
const path = require('path');
const https = require('https');

const dirsToMake = [
  'public/images/destinations',
  'public/images/experiences',
  'public/images/tours',
  'public/images/corporate',
  'public/images/concierge'
];

dirsToMake.forEach(d => {
  const dir = path.join(__dirname, d);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      resolve(); // Already downloaded
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

async function processFile(filePath, category) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^'"\s]*/g;
  
  const matches = [...content.matchAll(urlRegex)];
  const uniqueUrls = [...new Set(matches.map(m => m[0]))];
  
  let i = 1;
  for (const url of uniqueUrls) {
    const photoIdMatch = url.match(/photo-([a-zA-Z0-9-]+)/);
    const photoId = photoIdMatch ? photoIdMatch[1].substring(0, 12) : `img${i}`;
    
    const filename = `${category}-${photoId}.webp`;
    const localPath = `/images/${category}/${filename}`;
    const destPath = path.join(__dirname, 'public', 'images', category, filename);
    
    console.log(`Downloading ${filename}...`);
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
  await processFile(path.join(__dirname, 'src', 'data', 'destinationsData.js'), 'destinations');
  await processFile(path.join(__dirname, 'src', 'data', 'experiencesData.js'), 'experiences');
  console.log("Done downloading data images.");
}

main();
