const fs = require('fs');
const path = require('path');

const root = process.cwd();
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      walk(full);
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(full);
    }
  }
}

walk(root);

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/href="([^"]+)"|src="([^"]+)"/g)) {
    const ref = match[1] || match[2];
    if (!ref || /^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    if (ref.startsWith('/')) continue;
    const resolved = path.normalize(path.join(path.dirname(file), ref.split('?')[0].split('#')[0]));
    if (!fs.existsSync(resolved)) {
      console.error(`Missing link target: ${path.relative(root, file)} -> ${ref}`);
      process.exit(1);
    }
  }
}

console.log(`Links: OK (${htmlFiles.length} HTML files scanned)`);
