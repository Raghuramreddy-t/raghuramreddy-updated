const fs = require('fs');
const path = require('path');

const root = process.cwd();
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.integration') continue;
      walk(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      htmlFiles.push(full);
    }
  }
}

walk(root);

const missing = [];
const fileExists = (target) => fs.existsSync(path.join(root, target));

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const matches = [...content.matchAll(/\b(?:href|src)="([^"#?][^"]*)"/g)];
  for (const match of matches) {
    const raw = match[1];
    if (/^(https?:|mailto:|tel:|data:|#)/i.test(raw)) continue;
    const clean = raw.split('?')[0].split('#')[0];
    if (!clean) continue;
    const resolved = path.normalize(path.join(path.dirname(file), clean));
    if (!fs.existsSync(resolved) && !fileExists(clean.replace(/^\.\//, ''))) {
      missing.push({ file: rel, target: raw });
    }
  }
}

if (missing.length) {
  console.error('Broken local links found:');
  for (const item of missing.slice(0, 50)) {
    console.error(`- ${item.file} -> ${item.target}`);
  }
  process.exit(1);
}

console.log(`Links: OK (${htmlFiles.length} HTML files scanned)`);
