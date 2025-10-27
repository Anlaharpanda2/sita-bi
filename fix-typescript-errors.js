const fs = require('fs');
const path = require('path');

// Function to recursively find all .ts files
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

// Fix common TypeScript strict mode issues
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix: process.env.PROPERTY -> process.env['PROPERTY']
  const envRegex = /process\.env\.([A-Z_][A-Z0-9_]*)/g;
  if (envRegex.test(content)) {
    content = content.replace(/process\.env\.([A-Z_][A-Z0-9_]*)/g, "process.env['$1']");
    modified = true;
  }
  
  // Fix: req.query.property -> req.query['property']
  const queryRegex = /req\.query\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
  if (queryRegex.test(content)) {
    content = content.replace(/req\.query\.([a-zA-Z_][a-zA-Z0-9_]*)/g, "req.query['$1']");
    modified = true;
  }
  
  // Fix: req.params.property -> req.params['property']
  const paramsRegex = /req\.params\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
  if (paramsRegex.test(content)) {
    content = content.replace(/req\.params\.([a-zA-Z_][a-zA-Z0-9_]*)/g, "req.params['$1']");
    modified = true;
  }
  
  // Fix: req.body.property -> req.body['property'] (untuk yang tidak dalam destructuring)
  const bodyRegex = /req\.body\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
  if (bodyRegex.test(content)) {
    content = content.replace(/req\.body\.([a-zA-Z_][a-zA-Z0-9_]*)/g, "req.body['$1']");
    modified = true;
  }
  
  // Fix unused parameters: (req, res) -> (_req, res) or (req: Request, res: Response) -> (_req: Request, res: Response)
  // Only if req is not used in the function
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Find function declarations with req parameter
    const funcMatch = line.match(/(?:async\s+)?\(([^)]*)\)\s*(?::|=>)/);
    if (funcMatch && funcMatch[1].includes('req')) {
      // Check if this is the start of a function
      const params = funcMatch[1];
      const hasReqParam = params.includes('req:') || params.match(/\breq\b/);
      
      if (hasReqParam) {
        // Find the end of this function (rough approximation)
        let funcBody = '';
        let braceCount = 0;
        let started = false;
        
        for (let j = i; j < Math.min(i + 100, lines.length); j++) {
          const bodyLine = lines[j];
          funcBody += bodyLine + '\n';
          
          for (const char of bodyLine) {
            if (char === '{') { braceCount++; started = true; }
            if (char === '}') braceCount--;
          }
          
          if (started && braceCount === 0) break;
        }
        
        // Check if req is used in the body (excluding the parameter declaration)
        const reqUsageRegex = /\breq\.(body|params|query|headers|user)\b/;
        if (!reqUsageRegex.test(funcBody)) {
          // Replace req with _req
          lines[i] = line.replace(/\b(req)(\s*:\s*Request)?/g, '_$1$2');
          modified = true;
        }
      }
    }
  }
  
  if (modified) {
    content = lines.join('\n');
  }
  
  // Fix: asyncHandler((req, res): Promise<void> => { ... }) 
  // Should be: asyncHandler(async (req, res): Promise<void> => { ... })
  const asyncHandlerRegex = /asyncHandler\(\s*\(/g;
  if (asyncHandlerRegex.test(content)) {
    content = content.replace(/asyncHandler\(\s*\(/g, 'asyncHandler(async (');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

// Main execution
const srcDir = path.join(__dirname, 'apps', 'api', 'src');
const tsFiles = findTsFiles(srcDir);

console.log(`Found ${tsFiles.length} TypeScript files`);

let fixedCount = 0;
tsFiles.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files`);
