const fs = require('fs');
const path = require('path');

const root = process.cwd();
const targets = [];
const badPattern = /[Ââ€¢â†Ã]/;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walk(full);
    } else if (/\.(html?|css|js|json|md|txt|xml)$/.test(entry.name)) {
      targets.push(full);
    }
  }
}

walk(root);

const bad = [];
for (const file of targets) {
  if (path.basename(file) === 'check-encoding.js') continue;
  const text = fs.readFileSync(file, 'utf8');
  if (badPattern.test(text)) bad.push(path.relative(root, file));
}

if (bad.length) {
  console.error(`Encoding artifacts found in ${bad.length} file(s):`);
  for (const file of bad) console.error(`- ${file}`);
  process.exit(1);
}

console.log('Encoding: OK');
