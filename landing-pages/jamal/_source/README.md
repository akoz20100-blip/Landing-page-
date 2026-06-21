# Dark Clothing — Jules / Claude Code Starter

A runnable **Vite + React + TypeScript** starter for a dark, minimal,
award-style one-page clothing site. The hard parts are already implemented:
**Lenis ↔ GSAP ScrollTrigger** sync, a **scroll-scrubbed 360 hero video**, a
preloader, and dark design tokens. An AI coding agent finishes the rest from the
specs in `docs/`.

> بالعربي باختصار: هذا مشروع جاهز للتشغيل. الأجزاء الصعبة (السكرول الناعم Lenis +
> محرك الحركة GSAP + دوران الموديل 360 على السكرول + البريلودر + هوية مظلمة)
> مكتوبة صح. ادفعه على GitHub، شغّل عليه Jules أو Claude Code، والصق الأمر
> الموجود في `START_PROMPT.md`. حط صورك/الفيديو في `public/assets/`.

## Quickstart (local)
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build (must pass clean)
```

## Hand it to the agent (Jules or Claude Code)
1. Push this folder to a GitHub repo.
2. Open it in **Jules** (jules.google.com) or **Claude Code**.
3. Paste the prompt from **`START_PROMPT.md`** as the task.
4. The agent reads `AGENTS.md` + `docs/`, builds, and **loops until the
   Definition of Done passes 100%**, fixing all errors. Review and bounce back if
   needed (see START_PROMPT.md).

## Add your media
Drop files in `public/assets/` (exact names in `public/assets/README.txt`).
Encode the 360 hero clip per `docs/ASSETS.md` (dense keyframes = smooth scrub).

## What's inside
```
AGENTS.md            Agent contract: rules + Definition of Done (the loop gate)
CLAUDE.md            Pointer for Claude Code -> AGENTS.md
START_PROMPT.md      The paste-ready prompt + how the loop works
docs/
  BUILD_BRIEF.md     Vision, structure, references, acceptance
  SCROLL_TIMELINE.md Section-by-section scroll choreography
  DESIGN_TOKENS.md   Colors / type / spacing / motion
  ASSETS.md          Media manifest + ffmpeg encoding for the 360
src/
  lib/smoothScroll.ts        Lenis + ScrollTrigger sync (the backbone)
  components/ScrollVideo.tsx  The 360 scroll-scrubbed hero
  components/Preloader.tsx    0->100 counter + curtain
  hooks/useReveal.ts          [data-reveal] fade/rise on scroll
  components/sections/*       Hero, Manifesto, Showcase, Gallery, Footer
public/assets/        <- your images & the 360 video go here
```

## Locked tech (don't let the agent swap these)
Vite · React · TypeScript · Tailwind · **GSAP + ScrollTrigger** · **Lenis**.
Never remove the Lenis↔ScrollTrigger sync in `src/lib/smoothScroll.ts`.
