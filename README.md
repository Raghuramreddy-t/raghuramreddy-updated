# Raghuramreddy Thummalapalli

## Intelligent Infrastructure Ecosystems Architect

[raghuramreddy.tech](https://raghuramreddy.tech) · [Work](https://raghuramreddy.tech/work) · [Applied AI Systems](https://raghuramreddy.tech/applied-ai-systems) · [Blog](https://raghuramreddy.tech/blog) · [TokenOps Lab](https://raghuramreddy.tech/labs/tokenops)

Personal portfolio covering intelligent infrastructure ecosystems, operational intelligence, lifecycle governance, and AI-assisted infrastructure modernization. Static site, no build step, deployed on GitHub Pages.

## Project Structure

```text
index.html                      Home
about/  work/  applied-ai-systems/
recognition/  future-systems/  contact/   Primary pages
publications/  standards-library/
privacy/  terms/  writing/                 Supporting pages
blog/                           Articles
  blog/diagrams/                Companion diagram suites
labs/tokenops/                  Interactive cost-engineering lab
assets/
  css/                          Stylesheets
  js/      js/pages/            Core + per-page scripts
  data/                         JSON content (drives dynamic lists)
  images/                       Icons, OG image, SVG diagrams
  external/tokenops/            Self-contained TokenOps lab bundle
scripts/                        Dev validation tools (links, sitemap, encoding)
.github/workflows/              CI
*.html (root)                   Legacy redirect stubs -> clean URLs
CNAME  robots.txt  sitemap.xml  site.webmanifest
```

## Conventions

- **Clean URLs** — every page lives at `slug/index.html` and is served at `/slug` (no `.html`). Never create `slug.html`; root-level `.html` files are redirect stubs for old links only.
- **Root-relative paths** — all asset and navigation links start with `/` so they resolve from any depth.
- **Content as data** — `assets/data/*.json` drives the blog index, publications, and home previews; update content there rather than hand-editing every card.

## Local Development

```bash
npm start          # serve at http://localhost:8080
npm run validate   # check encoding, sitemap, and internal links
```

No bundler or framework — open the served pages directly.

## Stack

HTML · CSS · vanilla JavaScript · static JSON · GitHub Pages

## License

Content and branding © 2025–2026 Raghuramreddy Thummalapalli. All rights reserved.
