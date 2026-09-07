const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      resolve(); 
      return;
    }
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
          return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(destPath, () => {}); 
      reject(err);
    });
  });
}

const experiences = [
    'adventure-nature',
    'island-holidays',
    'family-holidays',
    'honeymoon-escapes',
    'luxury-escapes'
];

async function scrapeExperiences() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const mapping = {};
    
    for (const exp of experiences) {
        console.log(`Scraping experience: ${exp}...`);
        const page = await browser.newPage();
        await page.goto(`https://blackforestholidays.com/${exp}/`, { waitUntil: 'networkidle2' });
        
        const urls = await page.evaluate(() => {
            const extracted = new Set();
            
            // Get background images
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const bg = window.getComputedStyle(el).backgroundImage;
                if (bg && bg !== 'none') {
                    const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
                    if (match) extracted.add(match[1]);
                }
            });
            
            // Get img tags
            const imgs = document.querySelectorAll('img');
            imgs.forEach(img => {
                if (img.src) extracted.add(img.src);
            });
            
            return Array.from(extracted).filter(url => 
                url.includes('wp-content/uploads') && 
                !url.includes('logo') && 
                !url.includes('elementor')
            );
        });
        
        mapping[exp] = urls.slice(0, 8);
        console.log(`Found ${urls.length} images for ${exp}, keeping first 8.`);
        await page.close();
    }
    
    await browser.close();
    return mapping;
}

async function updateExperiencesData(mapping) {
    const dataFile = path.join(__dirname, 'src', 'data', 'experiencesData.js');
    let content = fs.readFileSync(dataFile, 'utf-8');
    
    for (const [exp, urls] of Object.entries(mapping)) {
        console.log(`Updating ${exp}...`);
        const localUrls = [];
        
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const basename = path.basename(url.split('?')[0]);
            const filename = basename.endsWith('.webp') ? basename : basename + '.webp';
            const localPath = `/images/experiences/${filename}`;
            const destPath = path.join(__dirname, 'public', 'images', 'experiences', filename);
            
            try {
                await downloadImage(url, destPath);
                localUrls.push(localPath);
            } catch(e) {
                console.error("Error downloading", url, e);
            }
        }
        
        if (localUrls.length >= 8) {
            // we have enough to replace
            const expRegex = new RegExp(`'${exp}':\\s*\\{[\\s\\S]*?\\}\\s*(?=,|\\n\\s*')`, 'g'); // simplified, maybe easier to parse or use JSON
            
            // Instead of regex, let's just do sequential replacements of old paths inside that block
            // It's safer to extract the block first
            const blockRegex = new RegExp(`['"]?${exp}['"]?:\\s*\\{[\\s\\S]*?\\}(?=\\n\\s*[,}]+)`);
            let blockMatch = content.match(blockRegex);
            if (blockMatch) {
                let block = blockMatch[0];
                
                // Replace heroImage
                block = block.replace(/heroImage:\s*['"][^'"]+['"]/, `heroImage: '${localUrls[0]}'`);
                // Replace intro.image
                block = block.replace(/image:\s*['"][^'"]+['"]/, `image: '${localUrls[1]}'`); // first occurrence of image:
                
                // Replace experiencesList.images
                let imagesMatch = block.match(/images:\s*\[[\s\S]*?\]/);
                if (imagesMatch) {
                    block = block.replace(imagesMatch[0], `images: [\n        '${localUrls[2]}',\n        '${localUrls[3]}',\n        '${localUrls[4]}'\n      ]`);
                }
                
                // Replace bottomSection.collageImages
                let collageMatch = block.match(/collageImages:\s*\[[\s\S]*?\]/);
                if (collageMatch) {
                    block = block.replace(collageMatch[0], `collageImages: [\n        '${localUrls[5]}',\n        '${localUrls[6]}',\n        '${localUrls[7]}'\n      ]`);
                }
                
                content = content.replace(blockMatch[0], block);
            }
        }
    }
    
    fs.writeFileSync(dataFile, content, 'utf-8');
    console.log("Updated experiencesData.js successfully!");
}

async function main() {
    console.log("Starting scraper...");
    const mapping = await scrapeExperiences();
    await updateExperiencesData(mapping);
}

main();
