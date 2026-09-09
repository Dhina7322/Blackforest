const fs = require('fs');
const path = require('path');

const directories = [
  './src/pages/admin',
  './src/components/layout'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Specific replacements for common patterns to ensure good contrast
  // 1. Buttons that are dark green with orange text -> dark green with white text
  content = content.replace(/bg-\[#10221b\] text-\[#f29727\]/g, 'bg-[#10221b] text-white');
  content = content.replace(/bg-\[#10221b\] hover:bg-\[#1c382e\] text-\[#f29727\]/g, 'bg-[#10221b] hover:bg-[#1c382e] text-white');
  
  // 2. AdminLayout sidebar logo box: bg orange, dark text -> bg white, dark text
  content = content.replace(/bg-\[#f29727\] flex items-center justify-center text-\[#0d1210\]/g, 'bg-white flex items-center justify-center text-[#0d1210]');
  
  // 3. Active menu item text in sidebar: text orange -> text white
  content = content.replace(/isActive \? 'text-\[#f29727\]'/g, "isActive ? 'text-white'");
  content = content.replace(/bg-\[#f29727\]\/15 text-\[#f29727\]/g, 'bg-white/15 text-white');

  // 4. Any remaining orange text -> dark green
  content = content.replace(/text-\[#f29727\]/g, 'text-[#10221b]');
  
  // 5. Any remaining orange bg -> dark green
  content = content.replace(/bg-\[#f29727\]/g, 'bg-[#10221b]');
  
  // 6. Any remaining orange border/ring -> dark green
  content = content.replace(/border-\[#f29727\]/g, 'border-[#10221b]');
  content = content.replace(/ring-\[#f29727\]/g, 'ring-[#10221b]');
  content = content.replace(/fill-\[#f29727\]/g, 'fill-[#10221b]');
  
  // Also fix AdminLoginPage.jsx specific issues
  content = content.replace(/focus:border-\[#f29727\]/g, 'focus:border-[#10221b]');
  content = content.replace(/focus:ring-\[#f29727\]/g, 'focus:ring-[#10221b]');
  content = content.replace(/border-t-transparent/g, 'border-t-transparent');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

directories.forEach(walkDir);
console.log('Done replacing orange color.');
