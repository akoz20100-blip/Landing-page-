# 003 — Fix broken live URLs and stale project list in README.md

**Status:** DONE (2026-07-07) — all 4 done-criteria grep checks pass; no CNAME found (escape hatch N/A)
**Written against commit:** `79f7788` (branch `codex/atheer-living-canvas`)
**Effort:** S · **Risk of fix:** None · **Priority:** 3
**Depends on:** nothing (independent)

---

## Why this matters

Every "live URL" in the root `README.md` 404s. The site is a GitHub Pages **project
page**, so all URLs live under `https://akoz20100-blip.github.io/Landing-page-/` (note
the capital **L** — the path is case-sensitive). This is documented in `CLAUDE.md` lines
6–8 and confirmed by shipped artifacts: `landing-pages/jamal-v2/sitemap.xml` and the
Atheer canonical URL both use the `/Landing-page-/` prefix. The README predates that fix
(commit `4c7605b` corrected the base paths in the *apps* but not the README) and still
points at the user-page origin without the prefix. These are the links the owner is most
likely to copy when sharing with clients, and agents reading the repo will propagate them.

The README's structure section and URL table are also stale: they list only `jamal` and
`eddah`, omitting `jamal-v2` and `atheer` (both live, both carded in the gallery per the
canonical rule in `CLAUDE.md`).

## Current state (verified at 79f7788)

`README.md` line 6:

```
**الرابط المباشر:** https://akoz20100-blip.github.io/
```

`README.md` lines 26–30 (the live-URLs table):

```
| الموقع | الرابط |
|--------|--------|
| المعرض الرئيسي | https://akoz20100-blip.github.io/ |
| جمال (JAMAL) | https://akoz20100-blip.github.io/landing-pages/jamal/ |
| عُدّة (Eddah) | https://akoz20100-blip.github.io/landing-pages/eddah/ |
```

Correct URLs (from `CLAUDE.md` and shipped sitemaps):

```
https://akoz20100-blip.github.io/Landing-page-/
https://akoz20100-blip.github.io/Landing-page-/landing-pages/jamal/
https://akoz20100-blip.github.io/Landing-page-/landing-pages/jamal-v2/
https://akoz20100-blip.github.io/Landing-page-/landing-pages/eddah/
https://akoz20100-blip.github.io/Landing-page-/landing-pages/atheer/
```

## Scope

**In scope:** `README.md` only.
**Out of scope — do not touch:** `CLAUDE.md` (already correct), root `index.html`, any
file under `landing-pages/`, `psmmc-military/`, `portfolio-brief/`.

## Steps

1. Fix line 6 to `https://akoz20100-blip.github.io/Landing-page-/`.
2. In the live-URLs table, prefix the three existing rows with `/Landing-page-/` and add
   two rows: «جمال v2» → `…/landing-pages/jamal-v2/` and «أثير الزهراني» →
   `…/landing-pages/atheer/`.
3. Update the structure tree (lines 10–22) to also list `jamal-v2/` (Vite + React) and
   `atheer/` (static HTML built by `_source/build.js`), mirroring the project table in
   `CLAUDE.md`. Keep it brief — one line per project is enough; do not document
   `psmmc-military/` or `portfolio-brief/` in the structure tree unless a section already
   exists for them (it doesn't; leave them out).
4. **Style rules (mandatory):** the README is Arabic-first RTL. Table rows must start
   with the Arabic cell (as they already do); keep URLs alone in their own cell; do not
   start any Arabic paragraph or list item with a Latin word or URL — match the existing
   file's pattern exactly.

## Done criteria (machine-checkable)

- `grep -c 'akoz20100-blip.github.io/Landing-page-/' README.md` → ≥ 6
- `grep -n 'akoz20100-blip.github.io/landing-pages' README.md` → no output (no
  unprefixed project URLs remain)
- `grep -c 'jamal-v2' README.md` → ≥ 2 (tree + table)
- `grep -c 'atheer' README.md` → ≥ 2 (tree + table)
- Table renders correctly: the table separator row count is unchanged and each `|` row
  has exactly 2 columns.

## Test plan

Render the README (e.g. `grep`-based checks above plus a visual pass in any Markdown
preview). No code paths are affected.

## Maintenance note

When a new landing page ships, `CLAUDE.md`'s canonical rule requires a gallery card; add
the README table row in the same commit. (A future improvement could generate this table,
but that is not worth automating at 4 projects.)

## Escape hatches

- If the GitHub Pages URL scheme has changed since 79f7788 (e.g. a custom domain was
  attached — check for a `CNAME` file at repo root; none exists at 79f7788), STOP and
  report instead of guessing the new base URL.
