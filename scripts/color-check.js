const fs = require('fs');
const path = require('path');

const allowedColors = [
  '#091C38', '#03224C', '#012A4A', '#013A63', '#006AA5',
  '#CAF0F8', '#90E0EF', '#FFD700', '#FFFFFF', '#000000',
  '#00B4D8', '#F9C74F', '#D62828', '#6C757D'
];

const regex = /#[0-9A-Fa-f]{6}/g;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(regex);
  if (matches) {
    for (const color of matches) {
      if (!allowedColors.includes(color)) {
        console.error(`❌ Unauthorized color found: ${color} in ${filePath}`);
        process.exit(1);
      }
    }
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.css') || file.endsWith('.scss') || file.endsWith('.js')) {
      scanFile(fullPath);
    }
  }
}

scanDirectory('./css'); // Change this if your code lives elsewhere
console.log('✅ All colors are valid.');
