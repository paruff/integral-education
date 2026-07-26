---
name: accessibility-checker
description: "Use this skill whenever running or interpreting an accessibility audit of the built site, before shipping a new interactive component (RetrievalPrompt-style, timers, assessments), or when a PR touches src/components/, custom.css, or Docusaurus theme swizzling. Trigger when: checking WCAG 2.1 AA compliance, deciding whether a component is keyboard-navigable, or triaging axe-core violations reported by scripts/audit-a11y.mjs or scripts/lighthouse-audit.mjs."
---

# Accessibility Checker

This repo already has working accessibility tooling — `scripts/audit-a11y.mjs` (Puppeteer + axe-core, WCAG 2.1 AA) and `scripts/lighthouse-audit.mjs` / `scripts/lighthouse-score.mjs` (Lighthouse via Puppeteer). There is no Playwright dependency in this repo (checked `package.json`) — don't introduce one; the existing Puppeteer+axe-core stack already covers this need.

## Running an audit

1. Start the dev server in one terminal: `npm run start` (or `npm run build && npm run serve` for a production-parity check — `audit-a11y.mjs` targets `http://localhost:3099/integral-education`, confirm this matches whichever server you started).
2. In another terminal: `node scripts/audit-a11y.mjs` for axe-core violations, or `node scripts/lighthouse-audit.mjs` for Lighthouse scores. Both write to `artifacts/`.
3. Read the output file rather than re-deriving pass/fail from console noise.

## Known gap — flag, don't silently fix

Neither script is wired into `package.json`'s `scripts` block or `ci-quality.yml` — they exist but only run when someone remembers to invoke them manually. Adding them to CI is a workflow-policy change (new required check, longer CI runtime) — surface it to the user rather than adding it unasked, per the `gitops` skill's non-negotiables on CI/config changes.

## Interpreting results

- **axe-core violations** are keyed by WCAG success criterion (e.g. `color-contrast`, `label`, `aria-*`). Fix the underlying markup/CSS, not the check — never suppress a rule to make output green.
- **Keyboard navigation**: any new interactive component (see `learner-experience` skill) must be tab-reachable and operable without a mouse — this is already a stated non-functional requirement for components like `RetrievalPrompt` (see `docs/features/lsc-01-retrieval-prompt/specification.md`); treat it as the baseline bar for any new interactive component, not just that one.
- **Contrast/theming**: check against both light and dark Infima theme variables — a fix that passes in one theme can silently fail in the other.

## Gotchas

- The audit targets a fixed page list (homepage, intro, one sample module, one quickstart, prototype, start, 404) — it is a spot-check, not full coverage. A new module or component not on that list won't be caught; add it to the `TARGETS` array in both scripts if it introduces a genuinely new interaction pattern (don't add every module — that's what the spot-check sampling is for).
- `audit-a11y.mjs` requires the dev/prod server already running on the expected port — it does not start one itself. A silent all-pages-failed result usually means the server wasn't up, not that every page is broken.
- Load the `docusaurus-conventions` skill alongside this one when a fix requires touching `src/components/` or theme swizzling.
