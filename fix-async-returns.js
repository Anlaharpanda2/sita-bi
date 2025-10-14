const fs = require('fs');
const path = require('path');

function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules' && file !== 'dist') {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function fixAsyncReturns(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix: return res.status(...).json(...) -> res.status(...).json(...); return;
  // This pattern matches: return res. followed by method chain ending with );
  const returnResPattern = /(\s+)return (res\.(status|json|send|sendFile|redirect|download)\([^)]*\)(?:\.[a-z]+\([^)]*\))*);/g;
  
  const newContent = content.replace(returnResPattern, (match, indent, resCall) => {
    modified = true;
    return `${indent}${resCall};\n${indent}return;`;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed async returns in: ${filePath}`);
  }
}

// Fix all TypeScript files in src
const srcDir = path.join(__dirname, 'apps', 'api', 'src');
const tsFiles = findTsFiles(srcDir);

console.log(`Checking ${tsFiles.length} files...`);

tsFiles.forEach(file => {
  fixAsyncReturns(file);
});

console.log('Done!');
