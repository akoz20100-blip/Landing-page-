# feat(atheer): Living Canvas redesign

## Summary

Rebuilds Atheer Al-Zahrani's portfolio landing page as the "Living Canvas" experience from the final redesign brief.

- Replaces the previous dark/glass visual direction with an ivory oil-painting identity.
- Adds the hero video pipeline, poster, identity stills, OG image, and 24 real project images.
- Rebuilds the static page in vanilla HTML/CSS/JS with bilingual Arabic/English support.
- Keeps the repo's dual-output contract:
  - `landing-pages/atheer/_source/template.html`
  - `landing-pages/atheer/_source/build.js`
  - regenerated `index.html`
  - regenerated `index.source.html`
- Updates the root gallery card for Atheer.
- Adds QA evidence: six responsive/language screenshots, before screenshot, browser checks, and Lighthouse reports.

## QA

- `node landing-pages/atheer/_source/build.js`
  - `index.html`: 9.24MB
  - `index.source.html`: 64KB
  - unresolved tokens: 0
- Lighthouse mobile:
  - Performance: 95
  - Accessibility: 96
  - SEO: 100
  - LCP: 1.8s
  - CLS: 0.006
- Lighthouse desktop:
  - Performance: 100
  - Accessibility: 100
  - SEO: 100
- Browser automation:
  - 390px, 768px, 1440px in Arabic and English
  - horizontal overflow: 0 on all six checks
  - console errors/warnings: 0
  - network issues: 0
  - all four project lightboxes open with 6 images each
  - before/after slider keyboard interaction works
  - WhatsApp links use `966502305331` with prefilled text
  - language toggle persists after reload
  - title-card plays once, skips, and is disabled under reduced motion

## Evidence

- `landing-pages/atheer/qa/ACCEPTANCE-CHECKLIST.md`
- `landing-pages/atheer/qa/browser-checks.json`
- `landing-pages/atheer/qa/lighthouse-mobile.json`
- `landing-pages/atheer/qa/lighthouse-desktop.json`
- `landing-pages/atheer/qa/screenshots/before-atheer-1440.png`
- `landing-pages/atheer/qa/screenshots/atheer-ar-390.png`
- `landing-pages/atheer/qa/screenshots/atheer-ar-768.png`
- `landing-pages/atheer/qa/screenshots/atheer-ar-1440.png`
- `landing-pages/atheer/qa/screenshots/atheer-en-390.png`
- `landing-pages/atheer/qa/screenshots/atheer-en-768.png`
- `landing-pages/atheer/qa/screenshots/atheer-en-1440.png`

## Craft Notes

- The identity is anchored by the supplied oil-painting video and stills.
- The visual system uses ivory canvas, warm ink, hairlines, terracotta daubs, hand-drawn SVG icons, and framed project canvases.
- The project section now uses real images for عِدة, نُزل, نُسق, and ديمورا instead of placeholder tiles.
