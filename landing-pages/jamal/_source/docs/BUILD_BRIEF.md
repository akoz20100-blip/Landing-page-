# Build Brief — Dark Clothing Brand (single garment)

## Vision
A high-end, award-style one-page site for a dark, minimal clothing brand built
around **one hero garment**. Cinematic, editorial, quiet luxury. The signature
moment: the garment **rotates 360° as the user scrolls** (scroll-scrubbed video).

Identity: near-black (`#0A0A0A`), warm off-white text, **one** accent color.
Language/direction: **English, LTR**.

## What to borrow from each reference

| Reference | Take this |
|---|---|
| **duyucare** (Next.js + Lenis + Swiper) | The calm editorial pacing + the hero "product motion" (we do it scroll-scrubbed). Preloader with counter. |
| **pcg.sa** | The dark identity (near-black + single accent), heavy preloader, confident type. |
| **oddritual** (Shopify, by malvah) | Horizontal-scroll gallery, image hover-swaps, draggable feel. |
| **freshman.tv** | Cinematic full-bleed media + Lenis smoothness. |

Do NOT clone any of them. Borrow technique and feel, not layout.

## Locked tech (do not change)
- Vite + React + TypeScript
- **GSAP + ScrollTrigger** = the ONLY animation engine
- **Lenis** = the ONLY smooth scroll, synced to ScrollTrigger in `src/lib/smoothScroll.ts`
- Tailwind for styling; tokens in `docs/DESIGN_TOKENS.md`
- `split-type` allowed for text splitting

## Site structure (order)
1. **Preloader** — counter 0→100, curtain reveal.
2. **Hero (360)** — pinned, scroll rotates the garment. Headline overlay.
3. **Manifesto** — large editorial statement, line reveals.
4. **Showcase** — the single product; pin image, scroll copy (desktop).
5. **Gallery** — horizontal scroll of lifestyle shots.
6. **Footer** — big contact line + links + social.

(Jules/agent may add a small "details/specs" band between Showcase and Gallery if
it strengthens the story — keep it on-brand.)

## Components (already scaffolded)
`Preloader`, `Nav`, `ScrollVideo` (the 360), `useReveal` hook, section
components. Extend them; keep the architecture.

## Performance & accessibility budget
- 60fps scroll. Animate transforms/opacity only.
- Hero mp4 < ~10 MB, `+faststart`, poster for first paint.
- Lazy-load below-the-fold images.
- Respect `prefers-reduced-motion` (static fallback).
- Semantic headings, alt text, keyboard-focusable links.
- No CLS from late-loading media (reserve aspect ratios).

## Acceptance criteria
See the **Definition of Done** in `AGENTS.md`. The build is not finished until
every item there passes.
