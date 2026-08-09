const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/savio/.gemini/antigravity-ide/brain/318fd339-aea0-4440-b614-dbb7aa8bc3a5';
const destDir = 'd:/Projects/portfolio/public/certifications';

// Copy the original uploaded media files directly!
const mediaMap = [
  { file: 'media__1786291986509.jpg', target: 'original_1.jpg' },
  { file: 'media__1786291986765.png', target: 'original_2.png' },
  { file: 'media__1786291987002.jpg', target: 'original_3.jpg' },
  { file: 'media__1786291987090.png', target: 'original_4.png' },
];

for (const item of mediaMap) {
  const src = path.join(srcDir, item.file);
  const dest = path.join(destDir, item.target);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${item.file} -> ${dest}`);
  }
}
