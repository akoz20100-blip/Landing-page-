# Atheer Living Canvas QA

Generated on 2026-07-06 from local source build:
`http://127.0.0.1:4173/landing-pages/atheer/index.source.html`

## Evidence Files

- `screenshots/atheer-ar-390.png`
- `screenshots/atheer-ar-768.png`
- `screenshots/atheer-ar-1440.png`
- `screenshots/atheer-en-390.png`
- `screenshots/atheer-en-768.png`
- `screenshots/atheer-en-1440.png`
- `screenshots/before-atheer-1440.png`
- `screenshots/_contact.png`
- `browser-checks.json`
- `lighthouse-mobile.json`
- `lighthouse-desktop.json`

## Automated Results

- `node landing-pages/atheer/_source/build.js`: PASS
  - `index.html`: 9.24MB
  - `index.source.html`: 64KB
  - unresolved tokens: 0
- Lighthouse mobile: PASS
  - Performance: 95
  - Accessibility: 96
  - SEO: 100
  - LCP: 1.8s
  - CLS: 0.006
- Lighthouse desktop: PASS
  - Performance: 100
  - Accessibility: 100
  - SEO: 100
- Browser checks: PASS
  - Console errors/warnings: 0
  - Network issues: 0
  - Horizontal overflow at 390, 768, 1440 in Arabic and English: 0

## Acceptance Checklist

| Requirement | Status | Evidence |
|---|---:|---|
| Page renders correctly at 390px, 768px, 1440px in Arabic and English | PASS | six screenshots + `browser-checks.json` |
| Zero horizontal overflow | PASS | `browser-checks.json` overflow = 0 for all six viewport/language pairs |
| Ivory canvas identity; no dark-theme remnants, purple/blue, glassmorphism | PASS | visual screenshots + static search |
| Thmanyah renders on Arabic | PASS | font preload/font-face retained; screenshots use Thmanyah display/body |
| No emoji in UI chrome | PASS | static search found no emoji icons in Atheer outputs |
| Title-card plays once, is skippable, absent on second load | PASS | `browser-checks.json.titleCard` |
| Reduced motion disables title-card, marquee, petals | PASS | `browser-checks.json.reducedMotion` |
| Hero video autoplay attributes and poster present | PASS | `browser-checks.json` video = true; source HTML uses autoplay/muted/loop/playsinline/poster |
| H1 word-stagger and painted underline render; toggle keeps H1 | PASS | screenshots + `browser-checks.json.languageToggle` |
| Reveals are IntersectionObserver-driven and disabled under reduced motion | PASS | source code + reduced motion check |
| Four real projects present | PASS | screenshots + source |
| Each project lightbox has 6 images | PASS | `browser-checks.json.lightbox` |
| Horizontal gallery and mobile snap carousel implemented | PASS | source CSS/JS + screenshots |
| Before/after slider works by keyboard | PASS | `browser-checks.json.slider` moved 50 to 55 |
| WhatsApp links use 966502305331 with prefilled text | PASS | `browser-checks.json.whatsapp` |
| Stats count and localize digits; no double fire on toggle | PASS | `browser-checks.json.stats` |
| Language toggle swaps direction/copy/fonts and persists | PASS | `browser-checks.json.languageToggle` |
| Lighthouse mobile thresholds | PASS | `lighthouse-mobile.json` |
| Self-contained `index.html` works from file | PASS | local file open + data URI verification |
| No console errors/warnings, no 404s | PASS | final browser check |
| OG image generated at 1200x630 | PASS | `assets/img/og.webp` |

## Craft Self-Review

- The opening experience is anchored by the real oil-painting identity: mobile shows it as a framed canvas, desktop uses it as a living full-bleed field.
- The visual language is restrained: ivory paper, ink hairlines, terracotta daubs, hand-drawn SVG icons, and no template-like glass cards or neon gradients.
- The project section is now grounded in real Saudi project imagery, with framed gallery walls and inline lightboxes instead of placeholder tiles.
