const fs = require('fs');
const path = require('path');

const destFile = path.join(__dirname, 'src', 'data', 'destinationsData.js');
const expFile = path.join(__dirname, 'src', 'data', 'experiencesData.js');

let destContent = fs.readFileSync(destFile, 'utf-8');
let expContent = fs.readFileSync(expFile, 'utf-8');

const fallbackImg = '/images/destinations/destinations-151642612207.webp'; // the africa hero

destContent = destContent.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^'"\s]*/g, fallbackImg);
expContent = expContent.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^'"\s]*/g, fallbackImg);

fs.writeFileSync(destFile, destContent, 'utf-8');
fs.writeFileSync(expFile, expContent, 'utf-8');
console.log('Fixed remaining unsplash links with fallback.');
