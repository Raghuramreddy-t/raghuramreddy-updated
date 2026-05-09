# Review Notes

## Summary
- Audited the portfolio for mobile readability, layout stability, and Applied AI Systems sequencing.
- Kept the dark/futuristic identity intact while removing overly broad responsive overrides.

## Files Reviewed
- `pages/applied-ai-systems.html`
- `index.html`
- `assets/css/main.css`
- `assets/css/enhancements.css`
- `assets/css/pages.css`

## Issues Found
- The homepage hero and some page sections were being pushed into awkward mobile layouts by overly broad responsive overrides.
- The Applied AI Systems category row needed `LLMOps & Fine-Tuning` in the main sequence.
- The Applied AI Systems card list marker had an encoding artifact.

## Issues Fixed
- Added `LLMOps & Fine-Tuning` into the Applied AI Systems category row.
- Updated the Applied AI Systems sequence to keep the row visually aligned on desktop.
- Fixed the card list-marker glyph so the checkmark renders cleanly.
- Removed the broad mobile overrides that were forcing sections and grids into a broken desktop-like or zoom-only view.
- Simplified the homepage hero on mobile by hiding decorative elements that were crowding the top of the page.

## Risky Items Not Changed
- Navigation structure and URLs were left intact.
- The site theme and desktop layout were preserved.
- No framework or build-tool changes were introduced.

## Applied AI Systems Category Update
- Added `LLMOps & Fine-Tuning`.
- Kept the sequence aligned with the existing applied AI category row.
- Left the rest of the page structure unchanged.

## Mobile Readability Fix
- Removed the overly broad mobile visibility overrides that were causing cramped layouts.
- Kept responsive stacking behavior for content sections and cards.
- Simplified the homepage hero on mobile so the page is readable without zooming.
- Allowed hero visuals to size naturally on mobile instead of forcing desktop heights.

## Manual Review
- Check the homepage on a phone-width viewport to confirm the hero is readable and no longer feels cramped.
- Check the Applied AI Systems page on mobile to confirm it remains readable and does not force zoom.
- Confirm no section is clipped or pushed off-screen horizontally.
