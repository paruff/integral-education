# Review instructions

For every reviewer of a pull request here. Claude Code Code Review reads
this file from `main`, and Copilot code review reads `REVIEW.md` too; local
reviewers (Claude Code `/code-review`, OpenCode) are pointed here by
`AGENTS.md`. A review finds problems
and reports evidence. It never approves: a human merges (`docs/product/review.md`).

## What Important means here

This repo is a static learning site plus its content. Mark a finding
Important when the change would:

- **Break the site or its deploy:** a failing build, a broken route or
  redirect, a stage site that links outside itself, a deploy that ships
  something CI didn't test.
- **Lose or leak learner data:** a `localStorage` key written outside
  `src/utils/learnerData.js`, a key without the site's `projectName`, a
  migration that overwrites newer data, unguarded storage access that
  throws in private browsing, anything from progress, answers, ratings or
  reflections sent off the device (analytics may count page views and the
  two hub events only, per `docs/product/analytics-decision.md`).
- **Open a security hole:** a committed secret or token; HTML injected
  from content or input (`dangerouslySetInnerHTML`, unescaped strings); a
  new third-party script or network call; a GitHub Action not pinned to a
  commit SHA, broader `permissions:` than the job needs, untrusted input
  (issue titles, PR bodies, branch names) interpolated into `run:`, or
  `pull_request_target` checking out PR code; a dependency added without a
  lockfile change or from an unexpected source.
- **Misstate evidence or safety:** a citation that doesn't support the
  claim or can't be found, a claim stated more strongly than its evidence
  tier, a stage model presented as a finding (FR-14), therapy, diagnosis or
  clinical-outcome language, Tier 2 content without its tier tag and a full
  Safety Note, an agent marking a `[HUMAN-REQUIRED]` step as done.
- **Fail a learner:** a WCAG 2.2 AA regression (contrast, keyboard, focus,
  labels, alt text), or stage names shown to learners on a stage site (FR-17).

Style, naming and refactoring suggestions are Nit at most. Report at most
five Nits per review.

## Always check

- **Verification (built right):** the AI-Assisted Review Block in the PR
  body lists the commands that were run, and they cover the change: code in
  `src/` or `scripts/` comes with a test in `tests/` that would fail without
  it; UI changes ran the accessibility audit. A claim of "passes" or "done"
  points to output, not intent.
- **Validation (right thing built):** the PR says `Closes #N`; every change
  traces to that issue's "Done when" and its plan row in
  `docs/product/plan.md` (and its spec requirement). Flag work outside that
  scope, and "Done when" items the diff doesn't satisfy.
- **Gates:** a PR that changes `intent.md`, `specification.md`,
  `design.md`, `plan.md` or publishes a stage site adds its row to the
  decision log in `docs/product/review.md`. The PR's base branch is `main`.
- **UI consistency:** changes to CSS or components use the tokens and rules
  in `DESIGN.md`: no new hard-coded colours, sizes or radii outside its
  scales, one primary CTA per view, visible focus, `prefers-reduced-motion`
  respected.
- **Content:** learner-facing copy follows the `developmental-vocabulary`
  skill; module structure follows the `module-authoring` skill; no hype words.

## Evidence for findings

Behaviour claims need a `file:line` citation in the source, not an
inference from a name. Evidence claims need the source checked, not
recalled. If you can't verify a finding, say it is unverified rather than
dropping or overstating it.

## Do not report

- What CI already fails on: the lefthook checks (build, unit tests,
  frontmatter, AQAL tags, retention, toolkit, QuickStarts, H1, placeholders,
  conflict markers), the accessibility audit, CodeQL, gitleaks, npm audit.
  Do report a change that weakens or skips one of these checks.
- Generated files: `docs/.content-graph.json`, `docs/.content-graph-stats.json`,
  `src/data/pathways.json`, `src/data/moduleNav.js`, `package-lock.json`.
  Review the script or source that generates them instead.
- Baseline files `sites/*-baseline.json`, except a baseline that grows.
