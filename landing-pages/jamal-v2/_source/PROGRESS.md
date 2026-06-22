# PROGRESS — durable build memory

Update after EVERY iteration. This file is the source of truth that survives
`/compact`. Before compacting context, write your full current state here first.

## Status: LIVE — desktop black-void bugs fixed + VERIFIED on the live site via Playwright

User reported (with screenshots) two desktop scroll voids. Diagnosed by driving a REAL
headless browser (Playwright + system Chrome) against the live URL and logging a per-scroll
section map (see preview-raf-gotcha memory) — the only way to see pinned/scrubbed desktop
scroll (Claude_Preview can't). Two root causes, both fixed and re-verified live:
1. **Hero bleeding through Showcase / Showcase void** — Showcase was a transparent section
   pinned with `pinSpacing:false`. Fix: `bg-ink` (opaque) + CSS `position:sticky` image
   column (md:sticky top-0 h-screen self-start) + copy 160vh→130vh.
2. **Huge empty void before the gallery** — the hero 360 pin was built late (on the video's
   `loadedmetadata`), adding its 300vh spacer AFTER the gallery pin cached its start, so the
   gallery engaged ~2600px early and left a ~1700px void then re-rendered in normal flow.
   Fix: create the hero pin IMMEDIATELY (stable spacer; currentTime seek waits for duration)
   + `ScrollTrigger.refresh()` on window `load`. Post-fix section map is clean & sequential:
   hero → atelier → collection → details → gallery(pinned) → contact, zero `mid=root` frames.

## Status: LIVE on GitHub Pages — re-themed to the REAL oxblood/burgundy brand identity

### Brand re-theme (2026-06-22, from the official brand image the user supplied)
Real identity = deep wine linen + cream serif wordmark (NOT the old gold placeholder).
Instagram: instagram.com/jamal.atelier. New palette (mirrored in `src/index.css` :root +
`tailwind.config.js`; verified zero old colors leak into the built CSS):
`--ink #1a0b10` · `--surface #2a1620` · `--line #422835` · `--cream #f3ece5` ·
`--muted #a98a90` (dusty mauve) · `--accent #c97f86` (antique rose, single accent,
light enough for kicker text) · `--accent-soft #dda3a8` · `--wine #4a1f2a`.
Also: faint fixed oxblood body wash + wine hero-vignette glow; wordmark now cream
(Nav + Footer); favicon → burgundy field + cream "J"; theme-color #1A0B10. DESIGN_TOKENS.md
updated. Hero verified visually (rose accents + burgundy frame); deeper sections verified
via clean built CSS (Tailwind config changes need a dev-server restart to show in preview).

## Status: LIVE on GitHub Pages (akoz20100-blip.github.io/landing-pages/jamal/) — gallery black-fix shipped

### Desktop gallery black-fix (user-reported on live site)
User saw black around the desktop gallery images. Three compounding causes, all fixed:
1. The clip-path curtain reveal turned figures pure black until revealed (worsened by
   scrub:1 lag) → REMOVED. Images now always visible with a subtle always-on horizontal
   parallax (Studio-Freight/duyucare feel), baseline scale 1.16 so the shift shows no gap.
2. `loading="lazy"` gallery images rendered as the near-black `--surface #111` until loaded
   → switched to `loading="eager"` (all 7 share one vertical band; bounded cost).
3. Figures `md:h-[72vh]` left a big vertical letterbox → enlarged to `md:h-[84vh]`
   (intro/outro panels too).
Note: the headless Claude_Preview can't visually verify the pinned+scrubbed gallery
(frozen rAF during pin; screenshots only paint at scrollY 0; raster doesn't composite
under the `#root` transform trick). Verified instead via DOM state: imgs load (eager,
naturalWidth>0), `opacity:1`/visible, `elementFromPoint` hits the IMG, no clip, parallax
bounded ±26px. Real-hardware confirmation is the user's.

## Status: COMPLETE — DoD 100% + final elevation audit GO (zero CRITICAL/HIGH), all MEDIUMs remediated

### Elevation pass (to match/exceed duyucare reference)
Reference duyucare.dops.agency analysed from source: scroll-scrubbed `<video>` hero
(currentTime + GSAP ScrollTrigger scrub), Lenis, Swiper gallery, counter preloader,
LIGHT theme — confirms JAMAL's dark identity is correct (borrow technique, not layout).
Installed skill `awwwards-animations` (global) for GSAP/Lenis motion patterns.

Added (GSAP/Lenis only, reduced-motion + touch safe):
- `CustomCursor.tsx` — lagging ring + snappy dot, difference blend, grows over
  links/buttons (ring scale 1.8 / labelled 2.8), "view" label over gallery; gated to
  (pointer:fine)+no-reduced-motion; sets `body.cursor-custom{cursor:none}`. Label written
  imperatively (textContent + classList) → zero React re-render on hover.
- `Magnetic.tsx` — wraps CTAs; quickTo pull (strength 0.25, power3.out) toward cursor;
  no-op on touch/reduce; `will-change` set imperatively only while the branch is live.
- `Marquee.tsx` — velocity-reactive infinite band (ScrollTrigger.getVelocity) between
  Showcase and Details; `aria-hidden` on the track wrapper; static under reduced motion.
- Nav rewritten as accessible modal drawer: role=dialog/aria-modal, focus trap
  (toggle↔links), focus restore to toggle, `inert` when closed, Escape close, scroll lock.
- Anchor nav unified via `lenisStore.scrollToHash` (offset-aware) in Nav + Footer +
  Showcase/Gallery CTAs; native fallback via CSS scroll-margin-top.

### Clip-path curtain reveals (the duyucare differentiator — varies the reveal grammar)
- **Gallery figures**: clip-path `inset(bottom)` + Ken-Burns scale (1.12→1) driven
  DETERMINISTICALLY off the pin scrub's `onUpdate` as a pure function of progress
  (per-figure left-edge vs viewport band 0.92vw→0.6vw). NOT per-element containerAnimation
  triggers — those don't fire on instant jumps and risk stranding a figure closed. The
  onUpdate model can't strand (all figures verified `inset(0%)` at progress 1) and behaves
  identically on smooth scroll + jumps. Verified across p0/0.25/0.5/0.75/1.
- **Showcase product image**: clip-path curtain + scale 1.1 on a vertical trigger
  (`top 78%`), a different reveal grammar from the copy's rise+fade. Verified open+restore.

Audits run: (1) full 7-dim → 17 findings, ALL fixed. (2) fix-verify → 17/17 resolved,
flagged 3 new nav regressions (focus mgmt HIGH, first-tap MED, CTA anchors MED) — ALL fixed.
(3) final elevation audit → **GO, 0 blockers**; 3 nav fixes confirmed resolved. Its 6 MEDIUMs
ALL remediated this pass: gallery "drag"→"view"/"Scroll to explore" honesty; clip-path reveals
(gallery+showcase); cursor scale 2.3/3.6→1.8/2.8 + magnetic 0.4→0.25 power3.out; `cursor:none`
input/textarea caret exception; cursor `will-change` scoped to `body.cursor-custom`; marquee
`aria-hidden` moved to track. Build clean: JS 109.9KB gzip, CSS 6.17KB gzip; console clean.

## Status: COMPLETE — all 10 Definition-of-Done checks pass

Brand realized from the supplied assets: **JAMAL — Linen Atelier** (quiet-luxury
linen menswear). Dark identity per DESIGN_TOKENS with the brand **gold accent
`#C09A62`** (from `LOGO.svg`) replacing the scaffold's placeholder red. Hero 360
= the supplied `video hero.mp4` (a clean 360° rotation of the linen set on a dark
studio backdrop) re-encoded with dense keyframes.

## Definition of Done (from AGENTS.md)
- [x] 1. `npm install` + `npm run build`: zero errors, zero TS errors
- [x] 2. `npm run dev`: zero console errors/warnings (only Vite/React-DevTools info)
- [x] 3. All sections present, in order (Preloader, Hero/360, Manifesto, Showcase, **Details**, Gallery, Footer)
- [x] 4. Hero garment rotates smoothly on scroll; pins 0→+300%; scroll→currentTime verified (scroll 1350 → videoTime 5.02 = 50%)
- [x] 5. Lenis active (`isStopped:false`); pins for hero/showcase/gallery; scrub in sync
- [x] 6. Dark identity matches DESIGN_TOKENS; gold accent via `--accent`; every link/button has hover (`.link-underline`, `.btn`)
- [x] 7. Responsive 390 / 768 / 1440; horizontal overflow = 0 at all three
- [x] 8. prefers-reduced-motion respected (gsap.matchMedia static branches; preloader instant; verified via `?flat`)
- [x] 9. No leftover TODO placeholders (grep clean; all real JAMAL copy)
- [x] 10. Images lazy-loaded (`loading="lazy"` + explicit width/height) → no CLS; hero poster preloaded

## Quality target (reference feel)
- [x] Dark identity (pcg.sa vibe) — near-black + single gold accent, heavy preloader
- [x] 360 scroll rotation (duyucare vibe) — pinned scroll-scrubbed video, magazine-cover overlay
- [x] Buttery Lenis smooth-scroll (freshman.tv vibe) — Lenis↔ScrollTrigger sync intact
- [x] Horizontal gallery (oddritual vibe) — pinned horizontal lookbook, hover-scale, native-swipe fallback

## Architecture / key files
- `src/lib/smoothScroll.ts` — Lenis↔ScrollTrigger sync (UNCHANGED logic; added only ticker-callback cleanup on destroy to stop StrictMode/HMR rAF leaks).
- `src/lib/motion.ts` — EASE/MEDIA constants + `prefersReducedMotion()`.
- `src/lib/flags.ts` + `main.tsx` — `?flat` QA flag forces the reduced-motion path + native scroll (inert without the param; used for static screenshots).
- `src/components/Logo.tsx` — inline SVG JAMAL serif wordmark (gold).
- `src/components/ScrollVideo.tsx` — pinned 360; portrait plate object-contain + `.hero-plate` edge-feather mask + vignette; reduced-motion = static poster; `onProgress` drives hero overlay fade.
- Sections: `Hero`, `Manifesto` (split-type words), `Showcase` (pinned image col, `motion-safe:` tall copy), `Details` (full-bleed parallax band + craft notes), `Gallery` (horizontal pin / native-swipe fallback), `Footer`.
- Every section wraps GSAP in `gsap.context()` + `gsap.matchMedia()` (motionOk vs motionReduce) and reverts on unmount.

## Assets (in public/assets/, all from `../photo and vidue/`)
- `model-360.mp4` (3.3MB, -g6 dense keyframes, +faststart) + `model-360-poster.jpg`
- `product-front/shirt/back.webp`, `detail-01/02.webp`, `editorial-01/02.webp`, `gallery/01–06.webp`, `og_image.jpg`, `/favicon.svg`
- Excluded off-brand plaid shots (IMG_0600/0601).

## Notes
- Preview screenshots only render at scrollY=0 AND when the tab is foregrounded; rAF is throttled while the preview tab is hidden (background-tab behavior — not a code bug). Verified motion mode by foregrounding via screenshot; verified all static layouts via `?flat` + a `#root` translateY screenshot trick.
- Bundle: CSS 5.24KB gzip (budget 30KB ✓). JS 107KB gzip = GSAP+React+Lenis floor (locked tech).

## Next up
- Done. Optional future: real product/checkout, more lookbook frames, sequence-canvas fallback if iOS scrub stutters.

---

## 2026-06-22 — v2 polish LOOP 1/3 (8 approved fixes)
Applied the approved feel/a11y/perf fixes; production build passes clean (tsc -b && vite build, 0 errors).

- **F1 (type pairing)** `src/index.css`: removed the catch-all `@layer utilities` override that forced
  `letter-spacing:0` on all `.tracking-*`; restored intentional values (tight -0.02em, wide 0.06em,
  widest 0.22em, widest2 0.3em). `.kicker` now 0.2em + 0.76rem; `.btn` 0.12em; `.cursor-label` 0.1em.
  Restores the wide-eyebrow vs tight-Didone tension.
- **RF-01 (gallery hover)** `Gallery.tsx`: wrapped each `<img>` in an inner div that carries the
  `group-hover:scale-[1.06]` (compositor transform). GSAP still drives the `<img>` (scale/x) during the
  pinned scrub, so hover composes with — never fights — the inline transform. Caption span + index lift
  (`translate-y-2 opacity-70 → group-hover:translate-y-0 opacity-100`).
- **GALLERY-LOAD (perf)** `Gallery.tsx`: added `w`/`h` to Shot + each SHOT (portrait 1200x2133, wide
  editorial 2133x1200), pass width/height; first figure `loading="eager"`, rest `lazy`; kept decoding async.
- **A11Y-1 (caption scrim)** `Gallery.tsx`: deepened/extended figcaption scrim
  `from-ink via-ink/70 to-transparent` + `pt-10 pb-4`; accent index number stays >4.5:1.
- **A11Y-2 (manifesto heading)** `Manifesto.tsx`: `aria-labelledby="manifesto-heading"` on `#atelier`,
  `id` on the kicker. Section now named + in the heading outline. No visual change.
- **F3 (empty panel)** `Manifesto.tsx`: filled the blank `luxury-panel` with a cropped detail-01.webp
  fabric crop (1100x1375, lazy) + caption "European linen · garment-washed".
- **F6 (hero echo)** `Hero.tsx`: repurposed the right-rail chip (kicker "The piece" + materials line)
  so it no longer repeats the H1; kept the vertical cue as the single scroll affordance.
- **A11Y-3 (hero focus ring)** `Hero.tsx`: removed `focus:outline-none` from the H1; global
  `:focus:not(:focus-visible)` still suppresses the programmatic-focus flash, keyboard ring restored.

Preserved: Lenis↔ScrollTrigger sync, ScrollVideo eager pin-spacer + currentTime throttle, single-accent
discipline, palette tokens, reduced-motion architecture, gsap.context()+matchMedia teardown in every section.

---

## 2026-06-22 — v2 Review LOOP 1/3 (7 approved fixes applied; build clean)

- **A1 (hero scrub smoothness)** Re-encoded `public/assets/model-360.mp4` to all-intra
  (`-g 1 -keyint_min 1 -sc_threshold 0 -crf 20 -preset slow -movflags +faststart`): keyframes
  41/241 → 241/241, moov-before-mdat preserved (faststart kept). Size 1.4MB → 4.2MB (accepted
  trade for gapless currentTime seeks). `ScrollVideo.tsx` throttle relaxed 1/24 → 1/48s so the
  rotation resolves at sub-frame smoothness now that every frame is seekable.
- **A2 (hero H1 legibility)** Added `.hero-scrim` lower-left radial (`index.css`) and a
  `pointer-events-none absolute inset-0 -z-[1]` scrim inside the Hero overlay, behind the H1.
  Counters the vignette washing the cream headline. Localized, no layout impact.
- **A3 (LCP decouple)** `Preloader.tsx` rebuilt: counter now driven by REAL load progress
  (creep to 90% on mount, finish + lift on `window load`, power2.in easing) instead of a fixed
  1.9s fake tween. 2.4s fallback guards a hung asset. Curtain no longer holds hero LCP hostage.
  Reduced-motion branch untouched.
- **A4 (gallery hover-swap) + A6 (video preload)** `Gallery.tsx`: optional `hoverSrc` on Shot;
  "the set — front/back" (05/06) cross-fade to each other via an opacity-only second `<img>`
  (`group-hover:opacity-100`). GSAP parallax now collects BOTH `.gallery-img` per figure
  (imgGroups) so the hover layer shares the baseline scale/parallax — no edge gap. `index.html`
  adds `<link rel="preload" as="video">` for the hero clip.
- **A5 (gallery keyboard + contrast)** `Gallery.tsx`: viewport `onKeyDown` maps Arrow keys to
  Lenis scroll (page scroll = horizontal browse when pinned) or native `scrollBy` when Lenis is
  off (mobile/reduced-motion). WCAG 2.1.1. Index number forced to `opacity-100` (was `opacity-70`
  baseline → low contrast); caption text keeps its hover lift.
- **A7 (Bodoni 600 / skip link / delete shirt)** `index.html` Google Fonts URL appends Bodoni
  Moda 600. `App.tsx` adds a `sr-only`→`focus-visible:not-sr-only` "Skip to content" link
  targeting new `<main id="main-content">` (WCAG 2.4.1). Deleted orphaned
  `public/assets/product-shirt.webp` (zero references in src/ or index.html).

Build: `tsc -b && vite build` → clean, 57 modules, 0 TS errors. Verified generated CSS contains
`.sr-only`/`not-sr-only` + `.hero-scrim`; dist html carries the video preload; no shirt asset ships.
Preserved: Lenis↔ScrollTrigger sync, accent #C97F86 single-accent discipline, reduced-motion
architecture, gsap.context()+matchMedia teardown, faststart.

---

## 2026-06-22 — FINAL loop v2 (surgical a11y + craft fixes)

Applied 3 approved fixes:

- **A1** — Removed Bodoni 300 faux-synthesis. `font-light` → `font-normal` on
  `Marquee.tsx:74` (running-band span) and `Nav.tsx:171` (mobile drawer link).
  `grep -rn font-light src/` now returns zero. index.html loads Bodoni Moda 400;500
  only; both lines now pair font-display with a loaded weight (no algorithmic stroke
  shaving on the two most kinetic serif surfaces). Honors LOCKED Bodoni 400/500-only.
- **A2** — Gallery arrow-key nav now branches on the desktop pin state
  (`viewport.classList.contains('is-pinned')`) instead of mere `lenisStore.current`
  existence. Below 768px with a keyboard + Lenis live, arrows now move the native
  horizontal lookbook (`viewport.scrollBy({left})`) instead of scrolling the page
  vertically — closes a WCAG 2.1.1 gap. Desktop pinned path unchanged (is-pinned →
  Lenis nudge). Did NOT touch the Lenis↔ScrollTrigger sync.
- **A3** — Manifesto editorial statement is now an `<h2 id="manifesto-heading">`
  (was `<p>`); section `aria-labelledby` repoints to it; id removed from the kicker.
  ref type updated `HTMLParagraphElement` → `HTMLHeadingElement`. Section now
  contributes a heading to the outline (WCAG 2.4.6 / 1.3.1) — H-key nav no longer
  skips Atelier. SplitType operates on the ref by reference, tag-agnostic (split.revert
  unaffected); className byte-identical, no visual/motion change.

Build: `tsc -b && vite build` → clean, 57 modules, 0 TS errors.
Preserved: Lenis↔ScrollTrigger sync, ScrollVideo 300vh pin + 1/24 throttle, no video
preload re-add / no re-encode, single antique-rose accent, reduced-motion architecture,
gsap.context()+matchMedia teardown, Nav drawer a11y, Showcase sticky pin.
