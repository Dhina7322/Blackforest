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

const regions = [
    'africa', 'america', 'asian-countries', 'australia', 
    'europe', 'indian_ocean', 'middle_east_countries', 'south-asia'
];

async function scrapeDestinations() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const mapping = {}; // region -> { destinationName: imageUrl }
    
    for (const region of regions) {
        console.log(`Scraping region: ${region}...`);
        const page = await browser.newPage();
        await page.goto(`https://blackforestholidays.com/${region}/`, { waitUntil: 'networkidle2' });
        
        const extracted = await page.evaluate(() => {
            const data = {};
            // Flip boxes for destinations
            const headings = document.querySelectorAll('h2.eael-elements-flip-box-heading');
            headings.forEach(h => {
                const name = h.innerText.trim();
                const container = h.closest('.eael-elements-flip-box-container');
                if (container) {
                    const front = container.querySelector('.eael-elements-flip-box-front-container');
                    if (front) {
                        const bg = window.getComputedStyle(front).backgroundImage;
                        const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
                        if (match) {
                            data[name] = match[1];
                        }
                    }
                }
            });
            // Also check for the main hero image (usually the first large section background)
            const firstSection = document.querySelector('.elementor-top-section');
            if (firstSection) {
                 const bg = window.getComputedStyle(firstSection).backgroundImage;
                 const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
                 if (match) data['hero'] = match[1];
            }
            return data;
        });
        
        mapping[region] = extracted;
        console.log(`Found ${Object.keys(extracted).length} images for ${region}.`);
        await page.close();
    }
    
    await browser.close();
    return mapping;
}

async function updateDestinationsData(mapping) {
    const destFile = path.join(__dirname, 'src', 'data', 'destinationsData.js');
    let content = fs.readFileSync(destFile, 'utf-8');
    
    for (const [region, data] of Object.entries(mapping)) {
        for (const [destName, url] of Object.entries(data)) {
            if (destName === 'hero') continue; // we might skip hero or handle later
            
            // Generate local filename
            const basename = path.basename(url.split('?')[0]);
            const filename = basename.endsWith('.webp') ? basename : basename + '.webp';
            const localPath = `/images/destinations/${filename}`;
            const destPath = path.join(__dirname, 'public', 'images', 'destinations', filename);
            
            console.log(`Downloading ${filename} for ${destName}...`);
            try {
                await downloadImage(url, destPath);
                
                // Now replace in content based on the destination name
                // This regex looks for { name: 'DestinationName', image: 'oldUrl', ... }
                const destRegex = new RegExp(`\\{\\s*name:\\s*['"]${destName}['"],\\s*image:\\s*['"]([^'"]+)['"]`, 'g');
                content = content.replace(destRegex, `{ name: '${destName}', image: '${localPath}'`);
            } catch(e) {
                console.error("Error downloading", url, e);
            }
        }
    }
    
    fs.writeFileSync(destFile, content, 'utf-8');
    console.log("Updated destinationsData.js successfully!");
}

async function main() {
    console.log("Starting scraper...");
    const mapping = await scrapeDestinations();
    console.log(mapping);
    await updateDestinationsData(mapping);
}

main();
