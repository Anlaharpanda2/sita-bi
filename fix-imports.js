const fs = require('fs');
const path = require('path');

// Function to fix imports in a single file
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix jwtAuthMiddleware imports
  if (content.includes('jwtAuthMiddleware')) {
    content = content.replace(/jwtAuthMiddleware/g, 'authMiddleware');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed imports in: ${filePath}`);
  }
}

// Fix all router files
const routersDir = path.join(__dirname, 'apps', 'api', 'src', 'api');
const files = fs.readdirSync(routersDir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    fixImports(path.join(routersDir, file));
  }
});

console.log('Done fixing imports');
