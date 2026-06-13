const fs = require('fs');
const path = require('path');

const dirs = ['pages', 'pages/blog'];
const badPatterns = [
  { pattern: /â€[“”]/, name: 'broken em/en-dash' },
  { pattern: /ðŸ/, name: 'broken emoji prefix' },
  { pattern: /Ã¢€/, name: 'double-encoded UTF-8' },
];

let found = false;
for (const dir of dirs) {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) continue;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    for (const { pattern, name } of badPatterns) {
      if (pattern.test(content)) {
        console.error(`Encoding issue (${name}) in: ${path.relative(process.cwd(), filePath)}`);
        found = true;
      }
    }
  }
}

if (found) {
  process.exit(1);
} else {
  console.log('Encoding: OK');
}
