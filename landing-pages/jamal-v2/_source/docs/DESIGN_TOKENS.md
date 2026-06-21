# Design Tokens — Oxblood / Burgundy Identity

Source of truth for color, type, spacing, motion. Mirror these in
`tailwind.config.js` and `src/index.css`. Identity drawn from the JAMAL brand
mark (deep wine linen, cream serif wordmark); calm editorial spacing à la duyucare.

## Color

| Token | Value | Use |
|---|---|---|
| `ink` | `#1A0B10` | Page background (deep burgundy-black) |
| `surface` | `#2A1620` | Cards, image wells (burgundy) |
| `line` | `#422835` | Hairline borders, grid gaps (burgundy) |
| `cream` | `#F3ECE5` | Primary text / wordmark ("white") |
| `muted` | `#A98A90` | Secondary text (dusty mauve) |
| `accent` | `var(--accent)` → `#C97F86` | One accent only — antique rose. Kickers/links/hover/price. |
| `accent-soft` | `#DDA3A8` | Lighter rose for highlights |
| `wine` | `#4A1F2A` | Deep burgundy for atmosphere (body wash, hero glow) |

Rule: **one accent color** (antique rose), everything else is the tonal burgundy
ramp. Cream text + cream wordmark on deep oxblood. Change the accent only in
`src/index.css` `:root` (and mirror the hardcoded ramp in `tailwind.config.js`).

## Type

- Display: **Space Grotesk** — headlines, hero, big numbers. As built, headlines
  render at **300 (light)** for an editorial feel; only 300/400/500 are loaded.
- Body: **Inter** (400/500) — paragraphs, nav, UI.
- Wordmark: **Bodoni Moda** (Didone) — the JAMAL logo mark only, subset to its
  glyphs, echoing the brand logo across all platforms.
- Swap later for a paid grotesk (Suisse, Neue Haas) if licensed; keep the scale.

Scale (fluid): hero `clamp(3rem, 12vw, 12rem)`, h2 `clamp(2rem, 6vw, 4rem)`,
body `1rem–1.125rem`, caption `0.8rem`. Line-height: display `0.85–0.95`, body `1.6`.

## Spacing & layout

- Section vertical padding: `py-40` desktop, `py-24` mobile.
- Horizontal gutter: `px-8`.
- Max content width: `max-w-5xl` for text blocks; full-bleed for media.
- Grid gaps use `bg-line` showing through (1px hairline aesthetic).

## Motion

| Token | Value |
|---|---|
| Reveal duration | `1s` |
| Reveal ease | `power3.out` |
| Scrub smoothing | ScrollTrigger `scrub: 1` |
| Transition (hover) | `200ms ease` |
| Lenis duration | `1.1` |

Hover convention: text → `hover:text-accent`; images → subtle `scale(1.03)`
over `400ms`. Buttons/links: underline-on-hover or accent fill. Keep it
restrained — motion is for scroll, not for every micro-interaction.
