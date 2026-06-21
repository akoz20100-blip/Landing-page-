# The Prompt — paste this into Claude Code (or Jules)

Push this repo to GitHub (or open the local folder in Claude Code), then paste
the prompt below as the task. Tuned for **Claude Code** (it has `/compact` and a
context %). On Jules the `/compact` line is ignored — it auto-manages context —
but PROGRESS.md still keeps the loop on track.

---

## ✅ PASTE THIS

```
ROLE: Senior creative front-end engineer. Build a production-quality, award-style
one-page site for a dark, minimal clothing brand with ONE hero garment (English, LTR).

READ FIRST and obey exactly: AGENTS.md, CLAUDE.md, and every file in docs/
(BUILD_BRIEF, SCROLL_TIMELINE, DESIGN_TOKENS, ASSETS). The repo already has a
runnable Vite + React + TypeScript scaffold with the hard parts implemented.

QUALITY TARGET — match the craft of the reference sites in docs/BUILD_BRIEF.md:
dark identity like pcg.sa, the scroll-driven 360 garment rotation like duyucare,
buttery Lenis smooth-scroll like freshman.tv, horizontal gallery like oddritual.
Not a clone — same level of polish and motion quality.

LOCKED TECH (never change): GSAP + ScrollTrigger = the ONLY animation engine;
Lenis = the ONLY smooth-scroll; never remove the Lenis↔ScrollTrigger sync in
src/lib/smoothScroll.ts. Do not add any other animation/scroll library.

PERSISTENT MEMORY: maintain PROGRESS.md at repo root. After EVERY iteration,
update it: status, Definition-of-Done checklist state, what you just did, what
failed, what's next. PROGRESS.md is your source of truth.

CONTEXT MANAGEMENT: when your context usage reaches ~40%, FIRST write the full
current state into PROGRESS.md, THEN run /compact, THEN resume from PROGRESS.md.
Repeat whenever you hit ~40% so you never lose the plan.

WORK IN A LOOP — DO NOT STOP EARLY:
Repeat: implement -> run `npm run build` -> self-review against the Definition of
Done in AGENTS.md AND the QUALITY TARGET above -> fix EVERY error and warning ->
update PROGRESS.md -> repeat.
Do NOT report done and do NOT finalize until ALL 10 Definition-of-Done checks
pass 100% AND the result matches the quality target. Only THEN stop.
  1) build + typecheck: zero errors
  2) dev: zero console errors/warnings
  3) all sections present, in order
  4) hero garment rotates smoothly on scroll, pins correctly
  5) Lenis active, all scroll animations in sync
  6) dark identity matches DESIGN_TOKENS, every link/button has hover
  7) responsive at 390/768/1440, no overflow
  8) prefers-reduced-motion respected
  9) no leftover TODO placeholders in shipped sections
  10) images lazy-loaded, no layout shift

After each loop, post a 2-3 line self-review (what failed, what you fixed).
START NOW: read the docs, create PROGRESS.md, then begin iteration 1.
```

---

## Notes
- **"Loop until it matches, then stop"** is enforced by the two gates: the 10
  Definition-of-Done checks **and** the QUALITY TARGET. The agent keeps iterating
  and self-correcting until both are satisfied, then stops.
- **`/compact` at ~40%** keeps long autonomous runs from degrading. Because state
  is written to `PROGRESS.md` first, the loop survives the compaction with no
  loss of plan. (40% is aggressive on purpose — frequent, safe checkpoints.)
- If you review and something's still off, reply specifically: **"Not done. [what's
  wrong]. Re-check against the Definition of Done + quality target and fix."**
