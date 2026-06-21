# Design Tokens — Dark Identity

Source of truth for color, type, spacing, motion. Mirror these in
`tailwind.config.js` and `src/index.css`. Reference vibe: pcg.sa (near-black,
single accent) + duyucare (calm editorial spacing).

## Color

| Token | Value | Use |
|---|---|---|
| `ink` | `#0A0A0A` | Page background (near-black, not pure #000) |
| `surface` | `#111111` | Cards, image wells |
| `line` | `#222222` | Hairline borders, grid gaps |
| `cream` | `#F5F2EC` | Primary text / "white" |
| `muted` | `#8A8A8A` | Secondary text |
| `accent` | `var(--accent)` → `#E5462B` | One accent only. Links/hover/price. Change in `src/index.css`. |

Rule: **one accent color**. Everything else is the grayscale dark ramp. (pcg.sa
used red `#FF0004` — pick your own.)

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
