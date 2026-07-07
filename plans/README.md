# Improvement Plans — Landing-page- repo

Audit run: 2026-07-07, `/improve quick`, against commit `79f7788` on branch
`codex/atheer-living-canvas`. Quick mode covered correctness, security, and tests on the
recon hotspots (atheer — highest churn; root gallery; vercel config; the psmmc MCP
server). Not audited: jamal/jamal-v2/eddah `_source` internals, performance beyond the
atheer payload issue, dependency freshness.

Session was non-interactive, so per the skill's default the top findings by leverage were
planned without waiting for a selection.

## Execution order & dependencies

```
001 ──► 002 ──► 005        (all three edit atheer _source/build.js — strict order)
003                        (independent, any time)
004                        (land AFTER 001/002/005 — its drift check locks their outputs in)
```

## Status

| # | Plan | Effort | Status |
|---|------|--------|--------|
| 001 | [Serve the lightweight Atheer build as the deployed page](001-atheer-serve-lightweight-build.md) | M | TODO |
| 002 | [Absolute og:image / twitter:image for Atheer link previews](002-atheer-absolute-og-image.md) | S | TODO |
| 003 | [Fix broken live URLs + stale project list in README.md](003-fix-readme-live-urls.md) | S | TODO |
| 004 | [CI verification baseline (mcp-server tests, atheer drift, gallery assets)](004-ci-verification-baseline.md) | M | TODO |
| 005 | [Decouple Atheer fonts from the eddah folder](005-atheer-self-host-fonts.md) | S | TODO |

Executors: update Status to IN-PROGRESS / DONE / BLOCKED (with a one-line reason).

## Considered and rejected / deferred (do not re-audit)

- **psmmc MCP server security** — audited clean at 79f7788: fail-closed bearer-token auth
  with constant-time comparison (`src/auth.ts`), placeholder-token rejection and 16-char
  minimum (`src/transports/http.ts:15-28`), query-param tokens deliberately refused,
  host/origin allowlists, deterministic **synthetic** seed data (`src/data/seed.ts` —
  satisfies the owner's synthetic-data-only rule), real vitest coverage. No finding.
- **eddah robots.txt/sitemap point at `https://eddah.sa`** while the page serves from
  GitHub Pages — plausibly by-design (client's future domain). Deferred: confirm with the
  owner before "fixing"; changing it wrongly would hurt the client's SEO cutover.
- **Root gallery `index.html` has no `og:image`** — LOW impact (the gallery is an internal
  showcase, shared pages are the projects themselves). Not planned.
- **`card--soon` placeholder uses `aria-hidden="true"` on a visible element** — cosmetic
  a11y quibble, intentional decoration. Rejected.
- **nuzul / nusuq / dimora folders have no gallery cards** — correct per `CLAUDE.md`:
  they are `_source` reference collections, not built landing pages. Rejected as a
  finding; they become card-worthy only when built.
