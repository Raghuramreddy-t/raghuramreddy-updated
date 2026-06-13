const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(process.cwd(), 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found');
  process.exit(1);
}

const xml = fs.readFileSync(sitemapPath, 'utf8');
const urlMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const disallowed = urlMatches.filter(url =>
  url.includes('/pages/tokenops-old.html') ||
  url.includes('/pages/tokenops.html') ||
  url.includes('/pages/blog/token-cost-comparator.html')
);

if (disallowed.length) {
  console.error('Sitemap contains legacy redirect URLs:');
  for (const url of disallowed) console.error(`- ${url}`);
  process.exit(1);
}

if (!xml.includes('<?xml version="1.0" encoding="UTF-8"?>') || !xml.includes('<urlset')) {
  console.error('Sitemap XML structure looks invalid');
  process.exit(1);
}

console.log(`Sitemap: OK (${urlMatches.length} URLs)`);
