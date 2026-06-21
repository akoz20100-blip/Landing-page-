# CLAUDE.md

This project is built by an autonomous coding agent (Claude Code or Jules).

**Before writing any code, read `AGENTS.md` and every file in `docs/`. Follow
them exactly.** `AGENTS.md` is the contract.

Key rules (full list in AGENTS.md):
- Locked tech: Vite + React + TS + Tailwind, **GSAP + ScrollTrigger** (animation),
  **Lenis** (smooth scroll). Never remove the Lenis↔ScrollTrigger sync in
  `src/lib/smoothScroll.ts`. Do not add other animation/scroll libraries.
- Work in a **loop**: implement → `npm run build` → self-review against the
  **Definition of Done** in AGENTS.md → fix every error/warning → repeat.
- **Do not stop or report done until the Definition of Done is 100% green.**
- English / LTR. Dark identity per `docs/DESIGN_TOKENS.md`.

Commands: `npm install`, `npm run dev`, `npm run build` (must pass clean).
