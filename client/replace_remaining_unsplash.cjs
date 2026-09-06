const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const destImgDir = path.join(__dirname, 'public', 'images', 'destinations');
const expImgDir = path.join(__dirname, 'public', 'images', 'experiences');

// Collect all valid local images
const availableImages = [];
if (fs.existsSync(destImgDir)) {
    fs.readdirSync(destImgDir).forEach(file => {
        if (file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png')) {
            availableImages.push(`/images/destinations/${file}`);
        }
    });
}
if (fs.existsSync(expImgDir)) {
    fs.readdirSync(expImgDir).forEach(file => {
        if (file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png')) {
            availableImages.push(`/images/experiences/${file}`);
        }
    });
}

if (availableImages.length === 0) {
    console.error("No valid local images found to use as replacements.");
    process.exit(1);
}

// Function to get a sequentially cycling image
let imgIndex = 0;
function getNextImage() {
    const img = availableImages[imgIndex];
    imgIndex = (imgIndex + 1) % availableImages.length;
    return img;
}

// Function to recursively find all files in a directory
function getAllFiles(dir, extArray, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            getAllFiles(filepath, extArray, fileList);
        } else {
            if (extArray.some(ext => file.endsWith(ext))) {
                fileList.push(filepath);
            }
        }
    }
    return fileList;
}

const targetFiles = getAllFiles(srcDir, ['.js', '.jsx']);

let totalReplaced = 0;

for (const file of targetFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Regex to match anything like /images/pages/unsplash-151642612207.webp
    // Or just unsplash-[a-zA-Z0-9-]+\.(webp|jpg|jpeg|png)
    const regex = /\/images\/(?:pages|destinations|experiences)\/(?:destinations-|experiences-)?unsplash-[a-zA-Z0-9-]+\.(?:webp|jpg|jpeg|png)/g;
    
    // Replace with sequentially chosen actual reference images
    content = content.replace(regex, (match) => {
        modified = true;
        totalReplaced++;
        return getNextImage();
    });
    
    // Also catch some that might be raw unsplash URLs if any are left
    const rawUnsplashRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^\s'"]*/g;
    content = content.replace(rawUnsplashRegex, (match) => {
        modified = true;
        totalReplaced++;
        return getNextImage();
    });

    if (modified) {
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
}

console.log(`Finished! Replaced ${totalReplaced} Unsplash references with correct reference website images.`);
