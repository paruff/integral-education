---
name: deploy-validator
description: "Use this skill before opening a PR, to run the same checks ci-quality.yml will run, locally, so a red CI run is a surprise-check rather than the first check. Trigger when: finishing a docs/content/config change and preparing to open a PR, or when a PR's CI run failed and you need to reproduce the failure locally before pushing a fix."
---

# Deploy Validator

Mirrors `ci-quality.yml`'s `build-and-validate` job exactly, in the same order, so failures surface before a PR round-trip instead of after. This is a local reproduction of CI, not a replacement for it — CI is still the authoritative gate (see `gitops` skill).

## Steps (same order as `ci-quality.yml`)

1. `npm run validate-frontmatter` — frontmatter/tag/journey-template section checks.
2. `npm run content-graph:save` — regenerates `docs/.content-graph.json` and `docs/.content-graph-stats.json`; check the diff is what you expect (new module counts, stage distribution) rather than blindly committing it.
3. `npm run build` — full Docusaurus build; `onBrokenLinks: 'throw'` in `docusaurus.config.js` means a single bad internal link fails the whole build, not just a warning.
4. Link check — CI uses `lycheeverse/lychee-action` against `docs/**/*.md README.md`; there's no local npm script for this, so either install `lychee` locally (`brew install lychee` / see lychee-action docs) or accept this one check only runs in CI and treat a broken external/internal link as something CI will catch that a local `npm run build` alone won't.

## What this catches vs. doesn't

- Catches: frontmatter/tag errors, broken internal doc links, build failures, stale content-graph output.
- Does not catch: the link-check step unless `lychee` is installed locally (flag this gap rather than skipping the step silently — see the "Gotchas" note below).
- Does not run `lefthook`'s pre-commit hooks for you — those run on `git commit` automatically if `npx lefthook install` was run after clone; this skill is for the pre-*PR* check, not a replacement for pre-commit hooks.

## Gotchas

- Don't commit `docs/.content-graph.json` / `docs/.content-graph-stats.json` changes that don't match your actual content changes — a stale regeneration (e.g. run before your edits landed) will show a misleading diff in the PR.
- If `npm run build` passes locally but the PR's CI still fails, suspect an environment difference (Node version — CI pins `node-version: 20`) before assuming the check itself is flaky.
- This skill is about *running* the same checks as CI, not about deciding whether to add lychee or the accessibility scripts (see `accessibility-checker`) to CI itself — that's a CI-policy change requiring explicit sign-off per the `gitops` and `pr-contract` skills, not something to bundle into a routine PR.
