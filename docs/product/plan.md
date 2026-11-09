# Product Plan

> **Status:** Accepted by the Product Owner (@paruff), 2026-10-24
> ([review.md](review.md))
> **Date:** 2026-10-02 (revised 2026-10-18: P8 visuals, P9 stage sites and
> language, P10 metrics, P11 deterministic build and CI; 2026-10-24: issue
> links, design links, P12 stage nomenclature; 2026-11-09: open rows rewritten
> to match the code, per the implementation-readiness review)
> **Implements:** [specification.md](specification.md), which serves
> [intent.md](intent.md). **How:** [design.md](design.md).
>
> This is the **single product-level plan**. It consolidates the planning
> documents listed in § Superseded sources. Open items from each were
> re-checked against the repo on 2026-10-02 and carried in here. If work
> departs from this plan, update this file in the same PR.
>
> **Status lives on the board, not here.** Each task ID links to its issue
> (P12-01 links its merged PR, which had no issue),
> and the issue's Status on [Project #6](https://github.com/users/paruff/projects/6)
> is the only record of progress (`AGENTS.md` § Workflow). A new row and its
> issue land in the same PR.

## Direction

Make every module and pathway work for an adult **learning alone**, using
the techniques with the strongest evidence for durable learning
(*Make It Stick* and the research in `specification.md`). Priorities 1–5, then one sequencing rule:

1. Retention first: retrieval, spacing and mastery (Strong evidence).
2. The rest of the toolkit inside modules: generation, elaboration,
   calibration, load management.
3. Self-regulation scaffolds on pathways, since self-paced learners need the
   structure a teacher would otherwise give.
4. Measure retention objectively before claiming the product works.
5. Explanatory visuals, added in the same PRs as the module toolkit (P8).

Sequencing:

- Metrics baseline (P10) **before** stage sites (P9). Stage-specific
   language and separate sites have no direct evidence, so launch one site,
   compare it with the main site, then decide on the rest.

Each task below is one PR unless noted. **Proof** is what must be true to
close it.

## P0 — Documents

No issues: done in PRs before the board existed (P0-01 in PR #508, P0-02 in PR #502, P0-03 in PR #501).

| ID | Task | Proof | Depends |
| --- | --- | --- | --- |
| P0-01 | Add `intent.md` and `plan.md`; rebuild `specification.md` around self-paced learning evidence | PO merges; build passes | — |
| P0-02 | Archive the merged MM-01 feature files from the repo root to `docs/features/mm-01-magic-purple-orientation/` | No root spec left | — |
| P0-03 | Merge PR #501 (protocol §7 evidence base) | Merged | — |

## P1 — Decisions `[HUMAN-REQUIRED]`

Design: none (decisions). Outcomes: [review.md](review.md).

| ID | Task | Proof | Depends |
| --- | --- | --- | --- |
| [P1-01](https://github.com/paruff/integral-education/issues/509) | Revise the charter: self-paced-only scope; replace O4 (self-report) with the FR-15 retention measure; remove facilitated pilot pathways | Charter v0.2 signed | P0-01 |
| [P1-02](https://github.com/paruff/integral-education/issues/510) | Check the fifteen AI-sourced citations in `specification.md` against their sources (log in § Citation check log) | Each marked checked with a date | — |
| [P1-03](https://github.com/paruff/integral-education/issues/511) | Name a safety reviewer for Tier 2 content | Named in `raci.md` | — |

## P2 — Retention foundation (Strong evidence)

Design: [§3 Retention components](design.md#3-retention-components).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P2-01](https://github.com/paruff/integral-education/issues/512) | Add `<RetrievalPrompt>` to every module missing it and fix every module whose `cards` lack `[ ]`, plus a check script that fails CI if any module lacks a working prompt (FR-04). Same PR as P2-05 because both edit each module's Assess section and run in `check-retention.mjs` | 69 modules, `scripts/check-retention.mjs`, `ci-quality.yml` | 77/77; check in CI | — |
| [P2-02](https://github.com/paruff/integral-education/issues/513) | Calibration: `RetrievalCard` shows a model answer or criteria before the learner self-rates (FR-10) | `src/components/RetrievalCard/` | `tests/retrieval-card.test.mjs`: the model answer shows before the self-rating buttons | P11-08 |
| [P2-03](https://github.com/paruff/integral-education/issues/514) | Interleaved review: the due-review list mixes cards across modules within a pathway (FR-05). Check current behavior first and change only if needed | `src/components/RetrievalPrompt/`, `src/hooks/useProgress.js` | `tests/interleave.test.mjs`: cards from 3 due modules are mixed | P11-08 |
| [P2-04](https://github.com/paruff/integral-education/issues/515) | Learner can view and clear local learning data (NFR-05) | `useProgress`, `docs/my-progress.mdx` | `tests/learner-data.test.mjs`: reset clears progress, schedule and reflections | P11-08 |
| [P2-05](https://github.com/paruff/integral-education/issues/516) | State a mastery threshold in every Assess section (FR-07) | `docs/modules/*` (batched) | Audit lists 0 missing | — |

## P3 — Module toolkit (every module)

Design: [§4 Toolkit enforcement](design.md#4-toolkit-enforcement-in-every-module).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P3-01](https://github.com/paruff/integral-education/issues/517) | Add generation, elaboration, calibration, load and no-low-utility checks to the `module-authoring` skill checklist (FR-08 to FR-12) | `.agents/skills/module-authoring/SKILL.md` | `module-authoring` checklist lists the five checks (FR-08 to FR-12) and `check-toolkit.mjs` still passes; reviewed by the Product Owner in the PR | P1-02 |
| [P3-02](https://github.com/paruff/integral-education/issues/518) | Apply the toolkit to existing modules, starting with the `amber-to-rational` QuickStart (the live stage site), then the other twelve in `docs/quickstarts/` order, batched by pathway | `docs/modules/*` (several PRs) | Each batch passes the checklist | P3-01 |
| [P3-03](https://github.com/paruff/integral-education/issues/519) | Inline evidence tiers already exist (255 tags). Remaining: the human citation check of [`p3-03-citation-check-worklist.md`](p3-03-citation-check-worklist.md) (every Tier A, at least 10% of B and C) `[HUMAN-REQUIRED]`, then fix the tags the check downgrades; confirm each Theoretical Frameworks section introduces stage models as a lens (FR-14) | `p3-03-citation-check-worklist.md` (Result column filled in), only the modules the check flags | Worklist Result column complete; reviewer and date at the end of that file and a row in [review.md](review.md); `check-toolkit.mjs` passes | P0-03 |

## P4 — Self-paced pathways (every QuickStart)

Design: [§5 Self-paced pathways](design.md#5-self-paced-pathways).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P4-01](https://github.com/paruff/integral-education/issues/522) | Extend `quickstart-validator` for planning prompt, if-then plan, visible progress, pace guidance (FR-13), mixed review points (FR-05) and mastery thresholds (FR-07) | `.agents/skills/quickstart-validator/SKILL.md` | `quickstart-validator` fails a QuickStart missing any of the six checks; run on the 13 QuickStarts, reviewed in the PR by the Product Owner | — |
| [P4-02](https://github.com/paruff/integral-education/issues/523) | Apply to all 13 QuickStarts (absorbs `prod-02`) | `docs/quickstarts/*` | 13/13 pass | P4-01, P2-03 |

## P5 — Measure retention

Design: [§9 Metrics and analytics](design.md#9-metrics-and-analytics).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P5-01](https://github.com/paruff/integral-education/issues/530) | Finish the self-paced study protocol: one QuickStart (`amber-to-rational`, the Clear Thinking QuickStart), delayed retention test at least 7 days after the last module, self-report kept separate (FR-15), single-arm paired analysis (a between-site comparison is a later analysis). The draft already covers design, measures, analysis and data handling. Remaining: `[HUMAN-REQUIRED]` consent wording, sample and recruitment route (target 20–40 adults), and the test-form tool. A form tool is a new data processor, so record it in [analytics-decision.md](analytics-decision.md) before use. Archive the superseded facilitated files `pilot-runbook-20-40.md` and `pilot-pathway-*.md` to `internal/pilots/archive/` | `internal/pilots/retention-study-protocol.md` (modify), `internal/pilots/archive/` (create), `analytics-decision.md` (modify) | Protocol review checklist (§9) ticked by the Product Owner; form tool recorded; row in [review.md](review.md) | P1-01 |
| [P5-02](https://github.com/paruff/integral-education/issues/531) | Items are drafted (two sets of 14, two per module). Remaining: the Product Owner validates every item against the checklist in the file `[HUMAN-REQUIRED]` | `internal/pilots/retention-test-items.md` (modify: reviewer, date, changes) | All checklist boxes ticked; reviewer and date recorded in the file and a row in [review.md](review.md) | P5-01 |
| [P5-03](https://github.com/paruff/integral-education/issues/628) | Run the study and write the report. Effect size is the paired Cohen's d of delayed vs pre-test with a 95% interval (protocol §7), labelled preliminary, no efficacy claims from one study (absorbs issue #21). Replaces `pilot-revision-report-template.md`, which moves to `internal/pilots/archive/` | `internal/pilots/retention-study-report.md` (create) | Report committed with the protocol's §7 tables and §8 limits; aggregates only (n < 5 cells suppressed) | P5-02 |

## P6 — Content quality hygiene

Design: [§2 Content model and validators](design.md#2-content-model-and-validators).

| ID | Task | Proof | Depends |
| --- | --- | --- | --- |
| [P6-01](https://github.com/paruff/integral-education/issues/536) | Clear prohibited-vocabulary and frontmatter warnings, batched by term, then make warnings fail CI (FR-01, FR-06) | Validator 77/77 | — |
| [P6-02](https://github.com/paruff/integral-education/issues/537) | Run `audit-a11y.mjs` in CI (NFR-02; was `prod-01`) | CI fails on a seeded violation | — |
| [P6-03](https://github.com/paruff/integral-education/issues/538) | Fix `docs/quality/` → `internal/quality/` links (18 files) and `ARCHITECTURE.md` counts (75→77 modules, 10→13 QuickStarts; was `prod-05`) | `grep -r "docs/quality/" docs` finds nothing; counts match | — |
| [P6-04](https://github.com/paruff/integral-education/issues/539) | Audit stage/line/tier tags against `aqal-competency-map.md` (was `prod-03`) | Zero mismatches | P6-01 |

## P7 — Content expansion (after P2–P4)

Design: [§4 Toolkit enforcement](design.md#4-toolkit-enforcement-in-every-module). Not yet issued: each item gets an ID and an issue before work starts.

Carried over from `v0.3.0-alpha-todo.md` and the backlog. Each item must
meet the P3 toolkit from the start. None of the Tier 2 items starts before
P1-03.

- Stage content (items 11, 13–18 and 22–25 of `docs/v0.3.0-alpha-todo.md`, not GitHub issues), including the Tier 2
  `amber-shadow-moral-certainty` module. New modules use the P12-01 stage names; colour names are aliases only. Site work moved to P9 (built in
  this repo, not as forks).
- Bridge modules: `late-green-disillusionment`, `meta-systemic-thinking`.
  A `healthy-hierarchy*` module already exists, so verify it rather than
  recreate it.
- Somatic expansion (items 26–29 of `docs/v0.3.0-alpha-todo.md`). Archaic/Magic/Red somatic modules wait
  on a decision about embodied (audio/movement) delivery.

## P8 — Visuals (FR-16)

Design: [§6 Visuals](design.md#6-visuals).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P8-01](https://github.com/paruff/integral-education/issues/520) | Enable `@docusaurus/theme-mermaid` (official plugin, same version as core). Add FR-16 visual rules to the `module-authoring` checklist and `quickstart-validator` | `docusaurus.config.js`, `package.json`, both skills | Build passes with one sample diagram; checklists updated | — |
| [P8-02](https://github.com/paruff/integral-education/issues/524) | Pathway map on each of the 13 QuickStarts: steps, current position, review points | `docs/quickstarts/*` | 13/13; `audit-a11y.mjs` passes | P8-01, P4-02 |
| [P8-03](https://github.com/paruff/integral-education/issues/521) | Explanatory visuals in modules, done in the same batch PRs as P3-02 so each module is touched once | `docs/modules/*` | Each batch passes the FR-16 checklist | P8-01, P3-01 |

## P9 — Stage sites and stage-specific language (FR-17, FR-18)

Design: [§7 Stage sites](design.md#7-stage-sites).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P9-01](https://github.com/paruff/integral-education/issues/416) | `[HUMAN-REQUIRED]` Confirm the stage-site model: multi-config builds from this repo (forks deferred), the three transitions in `STAGE-SITES.md`, which launches first, and Magic/Red placement (closes #416) | `STAGE-SITES.md`, decision record | Decision recorded; `STAGE-SITES.md` updated | — |
| [P9-01a](https://github.com/paruff/integral-education/issues/525) | Multi-site build: each site is an entry in `sites/sites.json` (its doc list) plus a `sites/<id>.config.js`; `scripts/prepare-site.mjs` assembles the docs with per-site `overrides/` and `patches/`, and `scripts/build-sites.mjs` builds every site into one Pages artifact; CI builds every site | `sites/sites.json`, `sites/*.config.js`, `scripts/prepare-site.mjs`, `scripts/build-sites.mjs`, deploy workflow | All sites build in CI; a link check fails if a stage site links to another stage or to AQAL pages (`tests/check-site-links.test.mjs`) | P9-01 |
| [P9-02](https://github.com/paruff/integral-education/issues/526) | Per-site storage key with migration from `iel_progress_v1` (NFR-06) | `src/hooks/useProgress.js` | `tests/learner-data.test.mjs`: two sites do not overwrite each other; legacy data is kept | P11-08 |
| [P9-03](https://github.com/paruff/integral-education/issues/527) | Stage-language checks: add FR-17 rules (prior knowledge, relevance, tiers in register) to `developmental-vocabulary`; write a cognitive-interview script for audience readers | `.agents/skills/developmental-vocabulary/`, `internal/pilots/` | Skill and script reviewed by the Product Owner in the PR; the cognitive-interview script is `internal/pilots/stage-language-cognitive-interview.md` | — |
| [P9-04](https://github.com/paruff/integral-education/issues/415) | Neutral hub page on the main site: descriptive self-placement (FR-03) linking to stage sites, with a "choose again" route (absorbs #415) | `src/pages/` or `docs/` | Build passes; vocabulary check passes | P9-01 |
| [P9-05](https://github.com/paruff/integral-education/issues/528) | Clear Thinking (`amber-to-rational`) is built and published: per-site overrides, not neutral shared modules (decided in [stage-site-rewrite-plan.md](stage-site-rewrite-plan.md)), and the vocabulary baseline is `[]`. Remaining: the audience readers `[HUMAN-REQUIRED]` per `internal/pilots/stage-language-reader-kit.md` (3 per QuickStart), and the owner's naming call. Do not edit shared `docs/` modules. Copy changes from the readers go only in `sites/clear-thinking/overrides/`, each logged with its date in `docs/METRICS.md` so P9-06 can account for them | `sites/clear-thinking/**` | `node scripts/check-site-vocabulary.mjs --strict` and `node scripts/build-sites.mjs --strict` pass; 3 readers recorded in [review.md](review.md) | P9-01a, P9-02, P9-03, P9-04, P10-02 |
| [P9-06](https://github.com/paruff/integral-education/issues/529) | Compare the first site with the main site after 8 weeks, counting from its publication on 2026-10-21 (decision due 2026-12-16). This is an **engagement** decision, not a learning one: it uses only the completion proxy and the switch-rate proxy from `analytics-decision.md`, both labelled as proxies, and the main site's completion proxy for the same QuickStart as the comparison. The retention study (P5-03) covers one QuickStart and has no stage-site arm, so it is reported separately and does not drive this decision. The Product Owner writes the go / revise / stop rule in `docs/METRICS.md` by 2026-11-30, before the window closes. Draft rule: **go** if the site's completion proxy is at least the main site's and the switch rate is not high against the P10-04 baseline; **revise** if one holds; **stop** if neither | `docs/METRICS.md`, [review.md](review.md) | Rule written before 2026-12-16; decision and the numbers recorded in the decision log | P9-05, P10-04 |

## P10 — Success metrics (FR-19)

Design: [§9 Metrics and analytics](design.md#9-metrics-and-analytics).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P10-01](https://github.com/paruff/integral-education/issues/532) | `[HUMAN-REQUIRED]` Decide on site analytics: none, or a cookieless aggregate-only tool. Record privacy reasoning (outcome in [review.md](review.md)) | `analytics-decision.md` | Decision recorded | — |
| [P10-01a](https://github.com/paruff/integral-education/issues/586) | GoatCounter is chosen and wired in (`analytics-decision.md`). Remaining: the browser-devtools check on a normal visit (no cookie and no storage entry; the `enter-stage-site` and `choose-again` clicks register on the dashboard) `[HUMAN-REQUIRED]`, and whether the GoatCounter export is enough for the P10-04 baseline. The footer privacy note is a string in `analytics.js`, so no privacy page is needed. If the export is not enough, the P10-04 baseline is provisional and is re-recorded when this closes | `analytics-decision.md` (modify: result of both checks), `analytics.js`, `src/clientModules/goatcounter.js`, `static/js/goatcounter-count.js`, `tests/analytics.test.mjs`, `GOATCOUNTER_CODE` in `.github/workflows/ci-quality.yml` (change only if a check fails) | Both checks recorded in `analytics-decision.md`; `npm test` passes; analytics not loaded on PR builds | P10-01 |
| [P10-02](https://github.com/paruff/integral-education/issues/533) | Compute process metrics in the browser (on-time reviews, calibration gap, completion, return) and show them to the learner on the progress page | `src/hooks/useProgress.js`, `docs/my-progress.mdx` | `tests/metrics.test.mjs`: one test per metric | P2-02, P9-02, P11-08 |
| [P10-03](https://github.com/paruff/integral-education/issues/534) | Learner-controlled export: download a summary of their own metrics, to share only in a study | `docs/my-progress.mdx` | Learner sees what is exported before saving | P10-02 |
| [P10-04](https://github.com/paruff/integral-education/issues/535) | Add a learning-metrics section to `docs/METRICS.md` and the monthly ritual in the `metrics` skill; record the baseline | `docs/METRICS.md`, `.agents/skills/metrics/SKILL.md` | Baseline recorded | P10-01a, P10-02 |

## P11 — Deterministic build and CI

Design: [§10 Deterministic build and CI](design.md#10-deterministic-build-and-ci).

Goal: a commit that passes locally passes in CI, and what deploys is what
was tested. Findings from 2026-10-18 are in each row.

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P11-01](https://github.com/paruff/integral-education/issues/540) | Retire pre-commit.ci. The repo has no `.pre-commit-config.yaml` and no pre-commit.ci check runs; uninstall the app if it is installed `[HUMAN-REQUIRED]` (repo settings). Lefthook stays the only hook manager | repo settings, `CONTRIBUTING.md` | App gone; docs name lefthook only | — |
| [P11-02](https://github.com/paruff/integral-education/issues/541) | One hook definition for local and CI: move the inline shell in `lefthook.yml` into `scripts/check-*.mjs`; CI runs `npx lefthook run pre-commit --all-files`; pin `lefthook` to an exact version | `lefthook.yml`, `scripts/`, `ci-quality.yml`, `package.json` | CI fails on a seeded H1, TODO and conflict marker | — |
| [P11-03](https://github.com/paruff/integral-education/issues/542) | Pin the toolchain: `.nvmrc` on Node 24 LTS (Node 20 reached end of life in April 2026), `node-version-file` in every workflow, `engines` to match; `ubuntu-24.04` instead of `ubuntu-latest`; plain `grep` instead of unpinned apt `ripgrep` | `.nvmrc`, `.github/workflows/*`, `package.json` | No hard-coded Node version left; build passes | — |
| [P11-04](https://github.com/paruff/integral-education/issues/543) | Pin GitHub Actions to commit SHAs (Dependabot already updates `github-actions`) | `.github/workflows/*` | No `@vN` tags left | — |
| [P11-05](https://github.com/paruff/integral-education/issues/544) | Fix the required check that can hang: `Protocol Guardrails` is required but path-filtered, so PRs without `docs/` changes wait forever. Run it on every PR | `content-protocol.yml` | A non-docs PR gets the check | — |
| [P11-06](https://github.com/paruff/integral-education/issues/545) | Take the network out of the PR gate: internal links fail the build (`markdown.hooks.onBrokenMarkdownLinks: 'throw'`, replacing the deprecated top-level option; `onBrokenAnchors: 'throw'`); external links move to a nightly lychee job that opens an issue on failure | `docusaurus.config.js`, `ci-quality.yml`, new scheduled workflow | PR gate makes no external requests | — |
| [P11-07](https://github.com/paruff/integral-education/issues/546) | Fix the failing NPM Audit job on `main` | `package.json`, `package-lock.json` | Audit green on `main` | — |
| [P11-08](https://github.com/paruff/integral-education/issues/547) | Add `npm test` using the built-in `node --test` runner, run in CI and lefthook. Tests live in `tests/` (`tests/setup.mjs`, `tests/loader.mjs`). P2-02, P2-04, P9-02 and P10-02 add their tests there | `package.json`, `tests/` | One passing test in CI. Consumers that depend on it: P2-02, P2-03, P2-04, P9-02, P10-02 | — |
| [P11-09](https://github.com/paruff/integral-education/issues/548) | Deploy what was tested: deploy uses the build artifact from the CI run on the same commit instead of rebuilding | `deploy-gh-pages.yml`, `ci-quality.yml` | Deployed artifact hash matches the CI artifact | P11-03 |

## P12 — Stage nomenclature

Design: [§8 Stage nomenclature](design.md#8-stage-nomenclature). Goal: G6 (#555).

Steps 2–4 were built as a stack of PRs (#621–#627) that merged into each
other's branches, not into `main`. They land as one PR per original step,
in order, each based on `main`. The canonical tips are the `origin/`
branches (for example `origin/feat/stage-names-steps-2-3` is `0b8013c`; the
local `99a00d7` is its parent). Run `git fetch` and rebase each onto `main`
before opening its PR.

Stored learner progress is keyed by doc id (`ModuleFooter` uses
`normalizeDocId(metadata.id)`), so renaming a doc orphans that module's
progress unless it is copied. P12-03 therefore ships the old→new doc id map
as `src/data/stage-id-map.json` and a one-time copy that extends
`migrateLegacyData` in `src/utils/learnerData.js` (it already copies pre-NFR-06
keys once and keeps the old ones). The copy rewrites the keys of `modules` and
`retrievalSchedule` in each site's stored progress.

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P12-01](https://github.com/paruff/integral-education/pull/620) | Decide one internal stage-name set and its crosswalk (PR #620) | `.agents/skills/developmental-vocabulary/SKILL.md` | Crosswalk in the skill | — |
| [P12-02](https://github.com/paruff/integral-education/issues/629) | Accept the new names alongside the old ones; migrate level and tag values and the content graph (steps 2–3). Rebase `origin/feat/stage-names-steps-2-3` onto `main` | frontmatter in `docs/`, `docs/maps/`, `docs/.content-graph*.json`, `scripts/validate-frontmatter.js`, `scripts/check-aqal-tags.mjs`, `scripts/generate-content-graph.js` (hard-coded transition names at line 28), the `level:` values in `sites/clear-thinking/overrides/docs/**` | `npm test` and `npm run build` pass on `main`; old and new names both validate (test in `tests/site-tools.test.mjs`) | P12-01 |
| [P12-03](https://github.com/paruff/integral-education/issues/630) | Rename docs, components and URLs per stage, one PR per stage, in the order Traditional, Rational, Pluralistic, Integral, Magical, Egocentric (step 4). Redirects use `@docusaurus/plugin-client-redirects`, pinned to the same version as `@docusaurus/core`, configured in `docusaurus.config.js` and in each `sites/*.config.js` (`clear-thinking.config.js` replaces `plugins`, so it needs its own entry). The old→new URL list is generated from the crosswalk in `developmental-vocabulary` and committed as `src/data/stage-redirects.json`. Each PR also updates every file that names a renamed slug, and the stage-site files: `sites/sites.json`, `sites/clear-thinking.config.js`, `sites/clear-thinking.sidebars.js`, `sites/clear-thinking/pages/index.js`, and the filenames under `sites/clear-thinking/overrides/docs/` and its patches. It starts only after P9-06 is decided, so analytics paths are not split mid-window | `docs/**`, `src/components/`, `.agents/`, `sidebars.js`, `src/pages/index.js`, `src/pages/start.js`, `src/data/pathways.json`, `src/data/moduleNav.js`, `src/data/stage-redirects.json` (create), `src/data/stage-id-map.json` (create), `src/utils/learnerData.js`, `src/components/ModuleMeta/index.js`, `scripts/audit-a11y.mjs` (line 20), `tests/module-footer.test.mjs`, `sites/**` as listed in the task, `docusaurus.config.js`, `package.json` | Every old URL in `stage-redirects.json` resolves (new test in `tests/site-tools.test.mjs`); progress saved under an old doc id still shows under the new id (`tests/use-progress.test.mjs`, `tests/learner-data.test.mjs`); no stage site links to another stage (`tests/check-site-links.test.mjs`); `npm run build` and `node scripts/build-sites.mjs --strict` pass | P12-02, P9-06 |
| [P12-04](https://github.com/paruff/integral-education/issues/631) | Remove the old values and aliases (step 5). The check is `node scripts/check-stage-names.mjs` (create), which fails on any old stage name outside the crosswalk and the `docs/product/specification.md` Sources; it runs in lefthook and CI | `scripts/validate-frontmatter.js`, `scripts/check-aqal-tags.mjs`, `scripts/check-stage-names.mjs` (create), `lefthook.yml`, `.agents/skills/developmental-vocabulary/SKILL.md` | `check-stage-names.mjs` passes in CI; a seeded old value fails it; an alias accepted in P12-02 is rejected here (`tests/site-tools.test.mjs`) | P12-03 |

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Retrofitting 77 modules risks delaying P4 and P8 | High | Medium | P2 first (highest evidence), then P3 batched by pathway, `amber-to-rational` first |
| Desirable difficulties feel harder and learners quit | Medium | Medium | Explain briefly why retrieval and spacing feel hard; keep sessions short (FR-12); planning prompts (FR-13) |
| Self-rated retrieval stays overconfident | Medium | Medium | Model answers before self-rating (P2-02) |
| Retention study sample is small | High | Medium | Label results preliminary; report intervals |
| AI fabricates citations during backfill | Medium | High | Human checks every citation against its source |
| No Tier 2 safety reviewer | High | Medium | P1-03; P2–P6 don't depend on it |
| Stage-specific language and sites don't improve learning | Medium | High | One site first; compare on FR-19 before building more (P9-06) |
| Learners pick the wrong stage site | Medium | Medium | Descriptive hub, "choose again" route, track switches (FR-19) |
| Stage-register rewrites conflict with the main site's wording | Medium | Medium | Site-specific copy lives in per-site pages or partials; shared modules stay neutral |
| Diagrams become decoration | Medium | Low | FR-16 checklist: every visual must explain something |
| Analytics erode learner privacy | Low | High | Cookieless and aggregate-only, or none; human decision (P10-01) |
| Stage renames lose learners' stored progress, break stage-site overrides or split analytics paths | Medium | High | P12-03 ships an id map, a one-time progress copy and redirects, updates the stage-site files, and waits for P9-06 |

## Superseded sources

Kept for history. Their open items live above.

| Document | What moved here |
| --- | --- |
| `docs/AUDIT_AND_IMPLEMENTATION_PLAN.md` (2026-07-26) | P6-01 to P6-03 |
| `docs/v0.3.0-alpha-todo.md` (2026-07-25) | P1-03, P6-01, P7 |
| `internal/implementation/backlog.md` (M1–M3) | P1-01, P5, P7 |
| `docs/product/tasks.json` | `prod-01` to P6-02, `prod-02` to P4-02, `prod-03` to P6-04, `prod-04` to P5-01, `prod-05` to P6-03 |
| Root `specification.md` / `design.md` / `tasks.json` (MM-01) | Archived to `docs/features/mm-01-magic-purple-orientation/` |
