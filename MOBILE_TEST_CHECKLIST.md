# Mobile Testing Checklist - ALL PAGES

## Pages to Test (37 total)

### Core Pages
- [ ] index.html - Home/Hero section
- [ ] pages/about.html - About section
- [ ] pages/contact.html - Contact form
- [ ] pages/blog.html - Blog list

### Blog Articles (with tables/content)
- [ ] pages/blog/intelligent-delivery-platforms.html
- [ ] pages/blog/intelligent-delivery-platforms-diagrams.html
- [ ] pages/blog/ai-cicd-troubleshooter.html
- [ ] pages/blog/ci-cd-failures-at-scale.html
- [ ] pages/blog/rag-knowledge-systems.html
- [ ] pages/blog/secure-by-design-ci-cd.html
- [ ] pages/blog/xops-beyond-devops-2025.html
- [ ] pages/blog/token-cost-comparator.html
- [ ] pages/blog/devops-to-platform-engineering.html
- [ ] pages/blog/toolchain-modernization.html

### Diagram Pages
- [ ] pages/blog/diagrams/operational-intelligence-flow.html
- [ ] pages/blog/diagrams/evolution-of-software-delivery.html
- [ ] pages/blog/diagrams/platform-engineering-ecosystem.html
- [ ] pages/blog/diagrams/reference-architecture.html
- [ ] pages/blog/diagrams/runtime-reality-vs-desired-state.html
- [ ] pages/blog/diagrams/traditional-vs-intelligent-pipelines.html

### Feature Pages
- [ ] pages/platforms.html - Platform sections with tabs
- [ ] pages/projects.html - Project cards
- [ ] pages/publications.html - Publication list
- [ ] pages/impact.html - Impact section
- [ ] pages/work.html - Work experience
- [ ] pages/professional-profile.html - Profile
- [ ] pages/technical-impact.html - Technical impact
- [ ] pages/recognition.html - Recognition
- [ ] pages/tokenops.html - TokenOps tool
- [ ] pages/operational-standards-library.html
- [ ] pages/standards-library.html
- [ ] pages/applied-ai-systems.html
- [ ] pages/ai-platform-work.html
- [ ] pages/future-systems.html

### Legal Pages
- [ ] pages/privacy.html
- [ ] pages/terms.html
- [ ] pages/writing.html

## Mobile Testing Checklist

For EACH page, verify:

### Viewport & Display
- [ ] Page loads without horizontal scroll
- [ ] All content visible without scrolling right
- [ ] No content cut off on left/right edges
- [ ] Text is readable without zooming
- [ ] Images scale properly

### Hero Sections
- [ ] Hero title visible
- [ ] Hero subtitle visible
- [ ] Hero visual/image visible
- [ ] All CTA buttons visible
- [ ] Tag strips scrollable (horizontal scroll with touch)

### Tables
- [ ] Tables are scrollable horizontally
- [ ] Table headers visible
- [ ] All table data accessible
- [ ] No cut-off columns

### Tabs/Panels
- [ ] Tab buttons visible
- [ ] Tab content visible
- [ ] Can switch between tabs
- [ ] Tab scrollable if needed
- [ ] Active tab highlighted

### Navigation
- [ ] Header/nav visible
- [ ] Logo visible and clickable
- [ ] Theme toggle button visible
- [ ] Mobile menu accessible (if applicable)
- [ ] All nav links clickable

### Forms & Inputs
- [ ] Form fields full width
- [ ] Submit buttons accessible
- [ ] Input fields have proper padding
- [ ] Error messages visible

### Cards/Grids
- [ ] Cards stack vertically
- [ ] Each card visible
- [ ] No content overlap
- [ ] Proper spacing between items
- [ ] All text readable

### Animations
- [ ] Animations work (no freezing)
- [ ] Animations don't cause layout shift
- [ ] Diagrams render properly

## Test Device Sizes
- [ ] iPhone 375px width
- [ ] Android 412px width
- [ ] iPad 768px width
- [ ] Small tablet 600px width

## How to Test

### Using Chrome DevTools
1. Open page in browser
2. Press F12 to open DevTools
3. Click Device Toolbar (Ctrl+Shift+M)
4. Select "iPhone 12" (390px)
5. Scroll through entire page
6. Check each section against checklist
7. Test responsive behavior (drag to resize)

### Using Real Device
1. Get localhost:8000 URL
2. Open on mobile phone
3. Test in both portrait and landscape
4. Check all interactive elements
5. Scroll through entire page
6. Test on multiple devices if possible

## Common Issues Found & Fixed

- ✅ Hero sections now fully visible
- ✅ Hero tags/chips now horizontally scrollable
- ✅ Tables now scrollable without cut-off
- ✅ All sections display as blocks (no hidden content)
- ✅ Text wrapping enabled
- ✅ 100% width constraints on mobile
- ✅ Tab panels scrollable
- ✅ Forms and inputs full width
- ✅ Navigation accessible

## Report Issues

If you find content still missing:
1. Note the PAGE name
2. Note the SECTION name
3. Describe what's NOT visible
4. Screenshot if possible
5. Report in issue format

Example:
- Page: pages/blog/intelligent-delivery-platforms.html
- Section: "Evolution of Software Delivery" table
- Issue: Column 3 still cut off on 375px width

---

**Note:** These CSS fixes ensure ALL elements are visible on mobile. If something is still not showing, it may be due to a JavaScript issue or specific element needing additional CSS.
