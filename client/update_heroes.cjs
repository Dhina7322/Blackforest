const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'destinationsData.js');
let data = fs.readFileSync(filePath, 'utf8');

const replacements = {
  'africa': 'https://blackforestholidays.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-8-2026-11_48_04-PM.png',
  'america': 'https://blackforestholidays.com/wp-content/uploads/2026/08/bhargava-marripati-7LDBKPWAHJ4-unsplash-scaled.jpg',
  'asian-countries': 'https://blackforestholidays.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-1-2026-11_13_45-PM.png',
  'australia': 'https://blackforestholidays.com/wp-content/uploads/2026/08/quentin-fahrner-TGF7gtpCJz0-unsplash-1-scaled.jpg',
  'europe': 'https://blackforestholidays.com/wp-content/uploads/2026/08/kristine-zale-macro-viewpoint-EZT6qusWOBQ-unsplash-scaled.jpg',
  'indian-ocean': 'https://blackforestholidays.com/wp-content/uploads/2026/08/pexels-asadphoto-9149367-scaled.jpg',
  'middle-east': 'https://blackforestholidays.com/wp-content/uploads/2026/08/metro-railway-glass-skyscrapers-dubai-traffic-street-dubai-museum-future-dubai-cityscape-skyline-urban-background-scaled.jpg',
  'south-asia': 'https://blackforestholidays.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-1-2026-11_13_45-PM.png' // default to asia
};

for (const [key, url] of Object.entries(replacements)) {
  const regex = new RegExp(`(${key}:\\s*{[\\s\\S]*?heroImage:\\s*['"])(.*?)(['"])`, 'g');
  data = data.replace(regex, `$1${url}$3`);
}

fs.writeFileSync(filePath, data, 'utf8');
console.log('Updated destinationsData.js');
