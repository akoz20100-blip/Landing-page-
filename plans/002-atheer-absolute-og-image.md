# 002 — Make Atheer's og:image / twitter:image an absolute URL (link previews are broken)

**Status:** DONE (2026-07-07) — og:image/twitter:image now absolute in both index.html and standalone.html, no data: og:image remains, og.webp confirmed on disk, build exits 0 with leftover:0
**Written against commit:** `79f7788` (branch `codex/atheer-living-canvas`)
**Effort:** S · **Risk of fix:** None · **Priority:** 2
**Depends on:** Plan 001 (edits the same `build.js`; execute 001 first to avoid conflicts. If 001 was NOT executed, see "Escape hatches".)

---

## Why this matters

The Atheer portfolio's entire conversion flow is sharing the page link over WhatsApp
(every CTA is a `wa.me/966502305331` link). When the page URL is pasted into WhatsApp, X,
or Facebook, the scraper reads `og:image` / `twitter:image` — and both are currently
unusable in **both** build variants:

- In the deployed standalone `index.html`, `og:image` is a **base64 data URI** (verified:
  `grep -c 'og:image" content="data:image/webp;base64' landing-pages/atheer/index.html`
  → 1). Social scrapers do not accept data-URI images.
- In the relative build (`index.source.html` at 79f7788), it is the **relative path**
  `assets/img/og.webp`. The Open Graph protocol requires a full URL; WhatsApp/Facebook/X
  do not resolve relative `og:image` values.

Result: shared links show no preview image. The QA checklist only verified that
`og.webp` exists at 1200×630 — not that the meta tag resolves.

## Current state (verified at 79f7788)

`landing-pages/atheer/_source/template.html` head (lines 14–18):

```html
<meta property="og:image" content="__IMG_OG__" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="أثير الزهراني — تصميم بصري يوقف التمرير من أول ثانية" />
<meta name="twitter:description" content="هوية كاملة لعلامتك بلمسة الذكاء الاصطناعي وذوق مصمِّمة." />
<meta name="twitter:image" content="__IMG_OG__" />
```

`__IMG_OG__` is an entry in the `images` map of
`landing-pages/atheer/_source/build.js` (line 32: `__IMG_OG__:"og.webp"`), so the
relative variant gets `assets/img/og.webp` and the standalone variant gets a data URI.

The canonical/og:url tags are already correct absolute URLs
(`https://akoz20100-blip.github.io/Landing-page-/landing-pages/atheer/`, template lines
10 and 14 area) — use the same origin and casing (**capital L** in `Landing-page-`; GitHub
Pages project paths are case-sensitive).

The OG image file exists: `landing-pages/atheer/assets/img/og.webp` (63,226 bytes).

## Scope

**In scope**
- `landing-pages/atheer/_source/template.html` (the two meta lines above)
- `landing-pages/atheer/_source/build.js` (one new token replacement; remove the now-unused
  `__IMG_OG__` map entry)
- Regenerated build outputs (`index.html` + `standalone.html` if plan 001 landed;
  `index.html` + `index.source.html` otherwise)

**Out of scope — do not touch**
- Any other meta tag, any visible page content, the `qa/` directory, other projects,
  root `index.html`, `vercel.json`.

## Steps

1. In `template.html`, change both meta values from `__IMG_OG__` to a new token
   `__OG_ABS__` (lines 14 and 18 — the `og:image` and `twitter:image` tags only).

2. In `build.js`:
   - Remove the `__IMG_OG__:"og.webp"` entry from the `images` map (line 32) — otherwise
     it is dead config. `og.webp` stays on disk; the build script never copies files, it
     only rewrites tokens.
   - Near the `fontBase` constant (line 30), add:
     ```js
     const OG_ABS="https://akoz20100-blip.github.io/Landing-page-/landing-pages/atheer/assets/img/og.webp";
     ```
   - In **both** variant builds (the `source`/relative block and the `standalone` block),
     add before writing the file:
     ```js
     source=source.split("__OG_ABS__").join(OG_ABS);
     ```
     (and the equivalent for the standalone string). The existing leftover-token check at
     the end of `build.js` (`/__[A-Z0-9_]+__/g`) will fail the build if either replacement
     is missed — that guard is the safety net; keep it intact.

3. Rebuild: `node landing-pages/atheer/_source/build.js` → expect `leftover: 0`, exit 0.

## Done criteria (machine-checkable)

- `grep -c 'og:image" content="https://akoz20100-blip.github.io/Landing-page-/landing-pages/atheer/assets/img/og.webp' landing-pages/atheer/index.html` → 1
- Same grep against the standalone file (`standalone.html` after plan 001) → 1
- `grep -c 'twitter:image" content="https://' landing-pages/atheer/index.html` → 1
- `grep -c 'og:image" content="data:' landing-pages/atheer/index.html landing-pages/atheer/standalone.html` → 0 in both
- `node landing-pages/atheer/_source/build.js` exits 0 with `leftover: 0`
- `test -f landing-pages/atheer/assets/img/og.webp` → exists

## Test plan

Command gates above. Post-merge to `main` (not part of this plan's execution), the owner
can paste the live URL into WhatsApp or https://www.opengraph.xyz/ and confirm the
preview image renders. Note: previews only work once merged to `main` and published by
GitHub Pages — they cannot be verified from a local build.

## Maintenance note

If the site ever moves to a custom domain, `OG_ABS` in `build.js` is the one place to
update. Plan 004's CI drift check will catch a template/build mismatch.

## Escape hatches

- If plan 001 has NOT been executed, the standalone block writes to `index.html` and the
  relative block writes to `index.source.html` — apply the same token change to both
  blocks regardless of file names; done criteria then apply to `index.source.html` +
  `index.html` instead.
- If the leftover-token guard fires after your edit, you missed one variant — fix rather
  than removing the guard. Never delete the guard to make the build pass.
