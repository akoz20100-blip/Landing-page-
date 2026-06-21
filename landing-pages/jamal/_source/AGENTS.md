# AGENTS.md — Instructions for the coding agent (Jules / Claude Code)

> Read this entire file and everything in `docs/` BEFORE writing code.
> This file is the contract. Follow it exactly.

## Mission
Finish a production-quality, award-style one-page site for a dark, minimal
clothing brand (one hero garment, English/LTR). The repo already contains a
runnable Vite + React + TS scaffold with the hard parts implemented. Your job is
to complete every section to the brief, polish the dark identity, and ship it
clean.

## Run commands
```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # MUST succeed with zero errors before you finish
```

## Locked tech — DO NOT change or replace
- **GSAP + ScrollTrigger** is the only animation engine. ("the good engine.")
- **Lenis** is the only smooth-scroll.
- **Never remove or refactor away** the Lenis ↔ ScrollTrigger sync in
  `src/lib/smoothScroll.ts`. It is the backbone; removing it desyncs everything.
- Do not add other animation/scroll libraries (no Framer Motion, no Locomotive,
  no AOS). Keep Vite + React + TS + Tailwind.

## Read first (specs)
- `docs/BUILD_BRIEF.md` — vision, structure, what to build.
- `docs/SCROLL_TIMELINE.md` — exact scroll choreography per section.
- `docs/DESIGN_TOKENS.md` — colors, type, spacing, motion.
- `docs/ASSETS.md` — media paths + the 360 video encoding.

## Build order
1. Confirm scaffold runs (`npm install && npm run dev`).
2. Hero: wire `ScrollVideo` to `/assets/model-360.mp4`; verify pin + scrub rotation.
3. Implement each section to `SCROLL_TIMELINE.md` (Manifesto → Showcase → Gallery → Footer).
4. Apply `DESIGN_TOKENS` everywhere: type scale, dark palette, accent, hover states on every button/link.
5. Responsive pass (390 / 768 / 1440). Then performance + a11y pass.
6. Run the Definition of Done loop below until 100% green.

## WORKING METHOD — iterate in a loop, do not stop early
Work in a **loop**: implement → build → self-review against the Definition of
Done → fix EVERY issue found → repeat. **Do not deliver / open the PR / report
done until ALL checks below pass 100%.** After each iteration, write a short
self-review (what failed, what you fixed). Keep looping until the checklist is
fully green. Fix all errors and all warnings — do not leave any.

## DEFINITION OF DONE (the completion gate — all must pass)
1. `npm install` succeeds; `npm run build` completes with **zero** errors and **zero** TypeScript errors.
2. `npm run dev` runs with **no** console errors or warnings.
3. Every section from `BUILD_BRIEF.md` exists, in order, matching `SCROLL_TIMELINE.md`.
4. Hero garment rotates **smoothly** on scroll (scroll-scrubbed video); pins and unpins correctly; no jump at start/end.
5. Lenis smooth scroll is active and **all** scroll animations stay in sync (no jank/desync).
6. Dark identity matches `DESIGN_TOKENS.md` (palette, fonts, spacing); accent via `--accent`; every link/button has a hover state.
7. Fully responsive at 390px, 768px, 1440px — no overflow, no broken layout.
8. `prefers-reduced-motion` respected (no scrubs/pins; static content).
9. **No leftover TODO placeholders** in shipped sections (use brief copy/placeholders).
10. Images lazy-loaded where appropriate; no obvious layout shift (CLS).

## Guardrails
- English, LTR only.
- Transforms/opacity for animation (60fps). Never animate layout props.
- Wrap section GSAP in `gsap.context()` and `revert()` on unmount.
- Call `ScrollTrigger.refresh()` after the preloader and on resize.
- Keep the file/architecture conventions already in `src/`.
- If a real asset is missing, keep the referenced path and a sensible placeholder
  box; never hardcode external URLs.
