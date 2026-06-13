# Contributing

Thanks for helping improve `raghuramreddy.tech`.

This project is a static portfolio for intelligent infrastructure ecosystems, operational intelligence, lifecycle governance, and AI-assisted infrastructure modernization.

## Guiding Principles

- Keep the visual language calm, premium, and architecture-led.
- Prefer content updates and light structural changes over redesigns.
- Preserve proof points, metrics, and real project outcomes.
- Keep navigation and footer order consistent across pages.
- Use human-governed AI framing, not autonomous AI hype.
- Keep writing pages and companion lab/diagram pages connected.

## Before You Edit

- Check the existing page structure before making changes.
- Reuse the existing design system, components, and spacing rules.
- Confirm whether the page already has a companion article or tool before adding a new one.
- Keep root-level redirect files and `pages/` routes aligned.

## Content Rules

- Avoid generic DevOps or generic cybersecurity wording.
- Avoid overusing buzzwords.
- Keep the site focused on intelligent infrastructure ecosystems.
- Preserve existing metrics unless there is a clear reason to update them.
- Keep headings, nav labels, and footer labels in sequence.

## Styling Rules

- Do not change the established typography, colors, or overall layout unless fixing a clear issue.
- Prefer small spacing adjustments over broad layout rewrites.
- Keep responsive behavior intact.
- Avoid introducing new libraries for simple content changes.

## Local Development

Run the site locally with:

```bash
npm start
```

Or with Python directly:

```bash
python -m http.server 8080
```

Then open:

- http://localhost:8080

## Useful Areas

- `index.html` - homepage and featured content
- `about/`, `work/`, `recognition/`, `contact/`, etc. - clean URL pages (each is `SLUG/index.html`)
- `blog/` - articles and diagram suites
- `labs/` - interactive tools and labs
- `assets/css/` - site styling
- `assets/js/` - rendering and interaction logic
- `assets/data/` - homepage, writing, and metadata content

## Page Structure

All pages live at `SLUG/index.html` and are served at `/SLUG` with no `.html` extension.
Never create `SLUG.html` files — always use the directory pattern.
Root-level `.html` files (e.g. `about.html`) are redirect stubs for backward compatibility only.

## Before You Finish

- Check for broken internal links.
- Check for stale navigation or footer labels.
- Ensure all new pages use root-relative paths (`/assets/css/...`, `/about`, etc.).

