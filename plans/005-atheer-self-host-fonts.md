# 005 — Decouple Atheer's fonts from the eddah project folder

**Status:** DONE (2026-07-07) — 6 fonts copied to assets/fonts/, fontBase/FD repointed, no eddah/fonts ref remains, build.js's only akoz20100-blip.github.io ref is now OG_ABS, deterministic rebuild confirmed, all 6 fonts + og.webp verified 200 over local HTTP. Note: the plan's "6 data:font/woff2 occurrences" done-criterion is actually 8 (both Regular-weight fonts appear twice — once in <link preload>, once in @font-face — unchanged behavior, not a regression; confirmed against template.html)
**Written against commit:** `79f7788` (branch `codex/atheer-living-canvas`)
**Effort:** S · **Risk of fix:** Low · **Priority:** 5
**Depends on:** Plans 001 and 002 (all three edit `_source/build.js`; execute in order 001 → 002 → 005). Plan 004's drift check, if already landed, will verify this plan's rebuild.

---

## Why this matters

The Atheer page's Arabic typography (Thmanyah Sans + Thmanyah Serif Display) is loaded
from **another project's folder on the live site**. `_source/build.js` line 30 hardcodes:

```js
const fontBase="https://akoz20100-blip.github.io/Landing-page-/landing-pages/eddah/fonts/thmanyah/";
```

so the deployed relative-asset build preloads and `@font-face`-loads six woff2 files from
`landing-pages/eddah/fonts/thmanyah/`. Consequences:

- Deleting, renaming, or restructuring the **eddah** project silently breaks **Atheer's**
  fonts — an invisible cross-project dependency nothing documents or checks.
- The page cannot render its fonts from a local dev server or a Vercel preview: the URLs
  point at the production GitHub Pages origin regardless of where the page is served.
- The standalone build already reads the same files from disk (`FD`, build.js line 6:
  `path.resolve(__dirname,"../../eddah/fonts/thmanyah/")`), coupling the *build* to
  eddah's folder layout too.

The fonts are 788KB total for 6 files — copying them into Atheer's own assets is cheap
and makes the project self-contained (matching how jamal/jamal-v2/eddah each own their
assets).

## Current state (verified at 79f7788)

- `landing-pages/eddah/fonts/thmanyah/` contains (at least) the six files build.js maps
  (build.js lines 22–29): `thmanyahsans-Light.woff2`, `thmanyahsans-Regular.woff2`,
  `thmanyahsans-Medium.woff2`, `thmanyahsans-Bold.woff2`,
  `thmanyahserifdisplay-Regular.woff2`, `thmanyahserifdisplay-Bold.woff2`.
- `_source/template.html` uses tokens for every font reference — preloads (lines 20–21:
  `href="__F_SERIF_R__"`, `href="__F_SANS_R__"`) and six `@font-face` `src:url(...)`
  declarations — so only `build.js` decides where fonts come from. No hardcoded font URL
  exists in the template.
- After plan 001, build outputs are `landing-pages/atheer/index.html` (relative build)
  and `landing-pages/atheer/standalone.html` (data-URI build).

## Scope

**In scope**
- New directory `landing-pages/atheer/assets/fonts/` (copies of the six woff2 files)
- `landing-pages/atheer/_source/build.js` (`fontBase` and `FD` constants)
- Regenerated build outputs

**Out of scope — do not touch**
- `landing-pages/eddah/**` — the originals stay; eddah's own pages use them.
- `_source/template.html` (no changes needed — fonts are token-driven).
- Every other project.

## Steps

1. Copy the six woff2 files:
   ```bash
   mkdir -p landing-pages/atheer/assets/fonts
   cp landing-pages/eddah/fonts/thmanyah/thmanyahsans-Light.woff2 \
      landing-pages/eddah/fonts/thmanyah/thmanyahsans-Regular.woff2 \
      landing-pages/eddah/fonts/thmanyah/thmanyahsans-Medium.woff2 \
      landing-pages/eddah/fonts/thmanyah/thmanyahsans-Bold.woff2 \
      landing-pages/eddah/fonts/thmanyah/thmanyahserifdisplay-Regular.woff2 \
      landing-pages/eddah/fonts/thmanyah/thmanyahserifdisplay-Bold.woff2 \
      landing-pages/atheer/assets/fonts/
   ```
2. In `_source/build.js`:
   - Line 6: `const FD=path.resolve(__dirname,"../../eddah/fonts/thmanyah")+path.sep;` →
     `const FD=path.resolve(__dirname,"../assets/fonts")+path.sep;`
   - Line 30: `const fontBase="https://…/eddah/fonts/thmanyah/";` →
     `const fontBase="assets/fonts/";`
     (Relative, like the image and video paths — resolves under the page's own directory
     on GitHub Pages, local servers, and Vercel alike.)
3. Rebuild: `node landing-pages/atheer/_source/build.js` → exit 0, `leftover: 0`.
4. Smoke-test: serve locally (`python3 -m http.server 4173`), open
   `http://127.0.0.1:4173/landing-pages/atheer/`, and confirm in DevTools → Network that
   all font requests hit `…/atheer/assets/fonts/…` with status 200 and Arabic text
   renders in Thmanyah (serif display headings), not a system fallback.

## Done criteria (machine-checkable)

- `ls landing-pages/atheer/assets/fonts/ | wc -l` → 6
- `grep -c 'assets/fonts/thmanyahsans-Regular.woff2' landing-pages/atheer/index.html` → ≥ 1
- `grep -c 'eddah/fonts' landing-pages/atheer/index.html` → 0
- `grep -c 'akoz20100-blip.github.io' landing-pages/atheer/_source/build.js` → counts only
  the `OG_ABS` constant from plan 002 (i.e. 1), not `fontBase`
- `grep -c 'data:font/woff2' landing-pages/atheer/standalone.html` → 6
- Rebuild is deterministic: running build.js twice yields empty `git diff`

## Test plan

The step-4 browser pass is the functional test (font network requests + rendered
typography in both Arabic and English modes — toggle the language switch). If plan 004's
CI is live, its `atheer-build-drift` job re-verifies the committed outputs.

## Maintenance note

Atheer now owns its font files; eddah's copies remain independently. The duplication is
deliberate (~788KB) — project folders in this repo are self-contained deliverables that
get shared/moved individually. If a third project needs Thmanyah, prefer a shared
top-level `fonts/` directory at that point, not before.

## Escape hatches

- If any of the six files is missing from `landing-pages/eddah/fonts/thmanyah/`, STOP and
  report — do not substitute a different weight.
- Thmanyah is a licensed typeface family: this plan only *moves copies within the same
  repo/site*, which changes nothing about usage. If the executor is asked to publish the
  fonts anywhere else, stop — that is a licensing question for the owner.
