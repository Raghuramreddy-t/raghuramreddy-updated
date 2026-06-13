const fs = require('fs');
const path = require('path');

const sitemap = fs.readFileSync(path.join(process.cwd(), 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

if (!urls.length) {
  console.error('Sitemap: no URLs found');
  process.exit(1);
}

console.log(`Sitemap: OK (${urls.length} URLs)`);
