const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\e4c209ab-90cd-44f1-9a1d-b6cc1a574569\\.system_generated\\steps\\184\\content.md', 'utf-8');
const $ = cheerio.load(content);

// Find 'Egypt'
const egyptHeading = $('h2:contains("Egypt")').first();
console.log("Heading found:", egyptHeading.text());

// Traverse up to find a common container, then look for img
let container = egyptHeading.parent();
let imgFound = false;
for(let i=0; i<10; i++) {
    const img = container.find('img').first();
    if (img.length > 0) {
        console.log("Found image in parent level", i, ":", img.attr('src'));
        imgFound = true;
        break;
    }
    container = container.parent();
}

if (!imgFound) {
    console.log("No image found inside parents. Checking previous siblings...");
    // Sometimes the image is in a previous column
    let col = egyptHeading.closest('.elementor-column');
    const prevCol = col.prev('.elementor-column');
    if (prevCol.length > 0) {
        const img = prevCol.find('img').first();
        if (img.length > 0) {
             console.log("Found image in previous column:", img.attr('src'));
        }
    }
}
