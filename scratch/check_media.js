const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/savio/.gemini/antigravity-ide/brain/318fd339-aea0-4440-b614-dbb7aa8bc3a5';
const files = fs.readdirSync(brainDir).filter(f => f.startsWith('media__'));

console.log('Media files:', files);
