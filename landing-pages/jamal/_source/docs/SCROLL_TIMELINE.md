# Scroll Timeline — Section by Section

This is the part a screenshot can never convey: **what animates, when, and how**.
Build every section to this. All scroll work goes through GSAP ScrollTrigger,
driven by Lenis (see `src/lib/smoothScroll.ts`).

Page order: Preloader → Hero (360) → Manifesto → Showcase → Gallery → Footer.

| # | Section | Trigger / start → end | Pin | Scrub | What happens |
|---|---|---|---|---|---|
| 0 | **Preloader** | on load | — | — | Counter 0→100 (2s), hairline bar scales x 0→1, then curtain slides up (`yPercent:-100`). On complete → `ScrollTrigger.refresh()`. |
| 1 | **Hero (360)** | `top top` → `+=300%` | yes | `scrub:1` | Video pinned full-screen; `currentTime = progress × duration` → garment rotates as you scroll. Headline fades/splits in on enter; fades out near end. |
| 2 | **Manifesto** | each line `top 85%` | no | — | Lines/words rise + fade (`y:40, autoAlpha:0→1`, `power3.out`). Optional: split-type for per-line stagger. |
| 3 | **Showcase** | `top top` → `+=100%` | image col | `scrub:1` | Desktop: pin the image column, scroll the copy column past it. Price + name reveal. Mobile: stack, simple reveal. |
| 4 | **Gallery** | `top top` → `+=trackWidth` | yes | `scrub:1` | Horizontal scroll: section pins, track translates `x` by `scrollWidth - innerWidth`. `invalidateOnRefresh` for resize. |
| 5 | **Footer** | `top 85%` | no | — | Big contact line reveals; links hover → accent. |

## Global rules
- Nav is fixed with `mix-blend-difference` so it reads on dark or light frames.
- Always pin with `pin: true` + a real `end` distance; never animate layout
  properties (use transforms/opacity) to stay 60fps.
- After preloader and on resize, call `ScrollTrigger.refresh()`.
- Wrap every section's GSAP in `gsap.context()` and `revert()` on unmount.
- Honor `prefers-reduced-motion`: skip scrubs/pins, show content statically.

## Implementation notes (as built)
- **Showcase (row 3):** implemented as a sticky-style pin — the image column is
  pinned with `pin: imageCol, pinSpacing:false, start:'top top', end:'bottom
  bottom'` while the taller copy column scrolls past it, plus a scrubbed parallax
  on the inset detail plate. This delivers the described "pin the image, scroll
  the copy past it" behavior more robustly than a single `+=100%` scrub. On
  mobile / reduced-motion it stacks with simple reveals.
- **Gallery:** desktop pins + scrubs the horizontal track; mobile / reduced-motion
  degrades to a native, keyboard-focusable horizontal swipe (no pin).
- **Reduced motion:** Lenis itself is not initialized (native scroll), and every
  section's `gsap.matchMedia` reduce branch shows content statically.

## Easing palette
- Reveals: `power3.out`
- Curtains / big moves: `power4.inOut`
- Scrubs: linear (`ease:'none'`) + ScrollTrigger `scrub`
