# 004 — Add a CI verification baseline (repo has zero automated checks)

**Status:** DONE (2026-07-07) — .github/workflows/verify.yml + scripts/check-gallery-assets.mjs created; YAML validated (yaml-lint); gallery check passes (8 refs) incl. a negative-test proof; mcp-server npm ci + typecheck + test all green (37/37); atheer build re-run clean (leftover:0). Push/CI-run verification deferred to the owner per the plan's own allowance ("if pushing is out of scope for the executor, the local step-3 gates are the acceptance bar").
**Written against commit:** `79f7788` (branch `codex/atheer-living-canvas`)
**Effort:** M · **Risk of fix:** Low · **Priority:** 4
**Depends on:** Plans 001/002 should land first (they change which files the Atheer build writes); this plan's drift check then locks them in.

---

## Why this matters

There is no `.github/` directory in this repo — nothing runs on push or PR. Three
concrete gaps:

1. `psmmc-military/packages/mcp-server` has a real vitest suite
   (`test/auth.test.ts`, `test/http-auth.test.ts`, `test/analytics.test.ts`,
   `test/server.test.ts`) and a `typecheck` script — but they only run when someone
   remembers to run them. This package is security-sensitive (bearer-token auth for a
   hospital-dashboard MCP server); its auth tests silently rotting is the worst-case.
2. The Atheer page is a generated artifact (`_source/template.html` + `_source/build.js`
   → committed HTML). Nothing verifies the committed output matches the source — an edit
   to the built file that skips the template would silently drift and be overwritten by
   the next rebuild.
3. The gallery `index.html` references project thumbnails by relative path; a renamed or
   deleted asset 404s on the live site with no warning.

## Current state (verified at 79f7788)

- No `.github/` directory at repo root (verified via `ls -a`).
- MCP server scripts (from `psmmc-military/packages/mcp-server/package.json`):
  `"test": "vitest run"`, `"typecheck": "tsc -p tsconfig.json --noEmit"`,
  engines `node >=18.18`, and a committed `package-lock.json` (so `npm ci` works).
- Atheer build: `node landing-pages/atheer/_source/build.js` regenerates the committed
  HTML deterministically (pure function of template + assets; verified deterministic —
  it is plain string replacement + base64 of committed binaries).
  It also reads fonts from `landing-pages/eddah/fonts/thmanyah/` (committed, 788KB).
- Gallery cards in root `index.html` reference these local images (all exist today):
  `./landing-pages/jamal/assets/model-360-poster.jpg`,
  `./landing-pages/eddah/brand/hero-technician.png`,
  `./landing-pages/jamal-v2/assets/model-360-poster.jpg`,
  `./landing-pages/atheer/assets/img/identity-landscape.webp`.
- GitHub Pages deploys from `main` via the automatic `pages-build-deployment` workflow
  (documented in `CLAUDE.md`); this plan adds *verification*, not deployment.

## Scope

**In scope**
- New file: `.github/workflows/verify.yml`
- New file: `scripts/check-gallery-assets.mjs` (dependency-free Node script)

**Out of scope — do not touch**
- Any existing file. No deploy workflow. No Lighthouse-in-CI (nice-to-have, not baseline).
- Do not add linters/formatters to the landing pages.

## Steps

1. Create `scripts/check-gallery-assets.mjs`:

   ```js
   // Verifies every local ./… src/href referenced by the root gallery page exists on disk.
   import { readFileSync, existsSync } from "node:fs";
   import { dirname, join } from "node:path";
   import { fileURLToPath } from "node:url";

   const root = join(dirname(fileURLToPath(import.meta.url)), "..");
   const html = readFileSync(join(root, "index.html"), "utf8");
   const refs = [...html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)].map((m) => m[1]);
   const missing = refs.filter((ref) => !existsSync(join(root, ref.split("#")[0].split("?")[0])));
   if (missing.length) {
     console.error("Missing gallery references:\n" + missing.map((m) => `  - ${m}`).join("\n"));
     process.exit(1);
   }
   console.log(`gallery ok — ${refs.length} local references checked`);
   ```

   Note: directory links like `./landing-pages/jamal/` pass `existsSync` as directories —
   that is intended (GitHub Pages serves their `index.html`).

2. Create `.github/workflows/verify.yml`:

   ```yaml
   name: verify
   on:
     push:
       branches: [main]
     pull_request:
   jobs:
     mcp-server:
       runs-on: ubuntu-latest
       defaults:
         run:
           working-directory: psmmc-military/packages/mcp-server
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
             cache-dependency-path: psmmc-military/packages/mcp-server/package-lock.json
         - run: npm ci
         - run: npm run typecheck
         - run: npm test
     atheer-build-drift:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: node landing-pages/atheer/_source/build.js
         - name: committed output must match rebuilt output
           run: git diff --exit-code -- landing-pages/atheer/
     gallery-assets:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: node scripts/check-gallery-assets.mjs
   ```

3. Verify locally before committing (all read-only / write only inside the checkout):
   ```bash
   node scripts/check-gallery-assets.mjs                # expect: "gallery ok — N local references checked"
   node landing-pages/atheer/_source/build.js           # expect: exit 0
   git status --short landing-pages/atheer/             # expect: empty (no drift)
   cd psmmc-military/packages/mcp-server && npm ci && npm run typecheck && npm test
   ```
   If `git status` shows drift in step 3, the committed Atheer HTML does not match the
   source at your commit — STOP and report (plans 001/002 may not have landed, or someone
   hand-edited the built file).

4. Validate the workflow YAML parses:
   ```bash
   python3 -c "import yaml,sys;yaml.safe_load(open('.github/workflows/verify.yml'))"
   ```
   (or `npx --yes yaml-lint` if PyYAML is unavailable).

## Done criteria (machine-checkable)

- `.github/workflows/verify.yml` exists, parses as YAML, and defines exactly the three
  jobs `mcp-server`, `atheer-build-drift`, `gallery-assets`.
- `node scripts/check-gallery-assets.mjs` exits 0 locally.
- The four local commands in step 3 all exit 0.
- After pushing the branch: `gh run list --workflow=verify --limit 1` shows a run, and
  `gh run watch` (or `gh run view`) reports all three jobs green. (If pushing is out of
  scope for the executor, the local step-3 gates are the acceptance bar and the CI run is
  verified by the reviewer post-push.)

## Test plan

The workflow *is* the test infrastructure. Negative test worth doing once locally:
temporarily rename `landing-pages/jamal/assets/model-360-poster.jpg` in a scratch copy
(or edit the script's input in-memory) and confirm `check-gallery-assets.mjs` exits 1 —
then restore. Do not commit the negative-test state.

## Maintenance note

- New landing pages: no workflow change needed — the gallery check reads whatever
  `index.html` references, and the drift job only covers Atheer. If a future project
  adopts the same generated-artifact pattern, add a matching drift job.
- The mcp-server job pins Node 20 (engines allow ≥18.18); bump deliberately.

## Escape hatches

- If `npm test` fails at 79f7788+ (pre-existing red tests), do NOT fix the tests in this
  plan — report the failures; a failing baseline is itself a finding.
- If GitHub Actions is disabled for this repo (settings-level), report — the files are
  still worth committing, but the owner must flip the setting.
