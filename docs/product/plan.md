# Product Plan

> **Status:** Accepted by the Product Owner (@paruff), 2026-10-24
> ([review.md](review.md))
> **Date:** 2026-10-02 (revised 2026-10-18: P8 visuals, P9 stage sites and
> language, P10 metrics, P11 deterministic build and CI; 2026-10-24: issue
> links, design links, P12 stage nomenclature)
> **Implements:** [specification.md](specification.md), which serves
> [intent.md](intent.md). **How:** [design.md](design.md).
>
> This is the **single product-level plan**. It consolidates the planning
> documents listed in § Superseded sources. Open items from each were
> re-checked against the repo on 2026-10-02 and carried in here. If work
> departs from this plan, update this file in the same PR.
>
> **Status lives on the board, not here.** Each task ID links to its issue,
> and the issue's Status on [Project #6](https://github.com/users/paruff/projects/6)
> is the only record of progress (`AGENTS.md` § Workflow). A new row and its
> issue land in the same PR.

## Direction

Make every module and pathway work for an adult **learning alone**, using
the techniques with the strongest evidence for durable learning
(*Make It Stick* and the research in `specification.md`). In priority order:

1. Retention first: retrieval, spacing and mastery (Strong evidence).
2. The rest of the toolkit inside modules: generation, elaboration,
   calibration, load management.
3. Self-regulation scaffolds on pathways, since self-paced learners need the
   structure a teacher would otherwise give.
4. Measure retention objectively before claiming the product works.
5. Explanatory visuals, added in the same PRs as the module toolkit (P8).
6. Metrics baseline (P10) **before** stage sites (P9). Stage-specific
   language and separate sites have no direct evidence, so launch one site,
   compare it with the main site, then decide on the rest.

Each task below is one PR unless noted. **Proof** is what must be true to
close it.

## P0 — Documents (this PR)

No issues: done in PRs before the board existed (P0-01 in PR #508, P0-03 is PR #501).

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
| [P2-01](https://github.com/paruff/integral-education/issues/512) | Add `<RetrievalPrompt>` to the 19 modules missing it and fix the 50 whose `cards` lacked `[ ]`, plus a check script that fails CI if any module lacks it (FR-04). Done in one PR with P2-05 (same files, same check) | 69 modules, `scripts/check-retention.mjs`, `ci-quality.yml` | 77/77; check in CI | — |
| [P2-02](https://github.com/paruff/integral-education/issues/513) | Calibration: `RetrievalCard` shows a model answer or criteria before the learner self-rates (FR-10) | `src/components/RetrievalCard/` | Component test | — |
| [P2-03](https://github.com/paruff/integral-education/issues/514) | Interleaved review: the due-review list mixes cards across modules within a pathway (FR-05). Check current behavior first and change only if needed | `src/components/RetrievalPrompt/`, `src/hooks/useProgress.js` | Test with cards from 3 modules | — |
| [P2-04](https://github.com/paruff/integral-education/issues/515) | Learner can view and clear local learning data (NFR-05) | `useProgress`, `docs/my-progress.mdx` | Unit test on reset | — |
| [P2-05](https://github.com/paruff/integral-education/issues/516) | Mastery thresholds stated in every Assess section (FR-07) | `docs/modules/*` (batched) | Audit lists 0 missing | — |

## P3 — Module toolkit (every module)

Design: [§4 Toolkit enforcement](design.md#4-toolkit-enforcement-in-every-module).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P3-01](https://github.com/paruff/integral-education/issues/517) | Add generation, elaboration, calibration, load and no-low-utility checks to the `module-authoring` skill checklist (FR-08 to FR-12) | `.agents/skills/module-authoring/SKILL.md` | Checklist updated | P1-02 |
| [P3-02](https://github.com/paruff/integral-education/issues/518) | Apply the toolkit to existing modules, starting with the most-used QuickStart paths, batched by pathway | `docs/modules/*` (several PRs) | Each batch passes the checklist | P3-01 |
| [P3-03](https://github.com/paruff/integral-education/issues/519) | Evidence tiers in Theoretical Frameworks; stage models introduced as a lens (FR-14) | `docs/modules/*` | `evidence-vetting` pass; human citation check | P0-03 |

## P4 — Self-paced pathways (every QuickStart)

Design: [§5 Self-paced pathways](design.md#5-self-paced-pathways).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P4-01](https://github.com/paruff/integral-education/issues/522) | Extend `quickstart-validator` for planning prompt, if-then plan, visible progress, pace guidance (FR-13), mixed review points (FR-05) and mastery thresholds (FR-07) | `.agents/skills/quickstart-validator/SKILL.md` | Skill updated | — |
| [P4-02](https://github.com/paruff/integral-education/issues/523) | Apply to all 13 QuickStarts (absorbs `prod-02`) | `docs/quickstarts/*` | 13/13 pass | P4-01, P2-03 |

## P5 — Measure retention

Design: [§9 Metrics and analytics](design.md#9-metrics-and-analytics).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P5-01](https://github.com/paruff/integral-education/issues/530) | Self-paced study protocol: one QuickStart, delayed retention test ≥7 days after the last module, self-report reported separately (FR-15). Includes a question on whether learners chose the right starting QuickStart (absorbs `prod-04`) | `internal/pilots/` | Protocol reviewed | P1-01 |
| [P5-02](https://github.com/paruff/integral-education/issues/531) | Draft retention test items with AI; a human validates them `[HUMAN-REQUIRED]` | `internal/pilots/` | Validation recorded | P5-01 |
| [P5-03](https://github.com/paruff/integral-education/issues/628) | Run the study and write the report. Effect sizes with intervals, labelled preliminary, no efficacy claims from one study (absorbs issue #21) | `internal/pilots/` | Report published | P5-02 |

## P6 — Content quality hygiene

Design: [§2 Content model and validators](design.md#2-content-model-and-validators).

| ID | Task | Proof | Depends |
| --- | --- | --- | --- |
| [P6-01](https://github.com/paruff/integral-education/issues/536) | Clear prohibited-vocabulary and frontmatter warnings, batched by term, then make warnings fail CI (FR-01, FR-06) | Validator 77/77 (today 35%) | — |
| [P6-02](https://github.com/paruff/integral-education/issues/537) | Run `audit-a11y.mjs` in CI (NFR-02; was `prod-01`) | CI fails on a seeded violation | — |
| [P6-03](https://github.com/paruff/integral-education/issues/538) | Fix `docs/quality/` → `internal/quality/` links (18 files) and `ARCHITECTURE.md` counts (75→77 modules, 10→13 QuickStarts; was `prod-05`) | Grep finds 0; counts match | — |
| [P6-04](https://github.com/paruff/integral-education/issues/539) | Audit stage/line/tier tags against `aqal-competency-map.md` (was `prod-03`) | Zero mismatches | P6-01 |

## P7 — Content expansion (after P2–P4)

Design: [§4 Toolkit enforcement](design.md#4-toolkit-enforcement-in-every-module). Not yet issued: each item gets an ID and an issue before work starts.

Carried over from `v0.3.0-alpha-todo.md` and the backlog. Each item must
meet the P3 toolkit from the start. None of the Tier 2 items starts before
P1-03.

- Stage content (v0.3.0 #11, #13–#18, #22–#25), including the Tier 2
  `amber-shadow-moral-certainty` module. Site work moved to P9 (built in
  this repo, not as forks).
- Bridge modules: `late-green-disillusionment`, `meta-systemic-thinking`.
  A `healthy-hierarchy*` module already exists, so verify it rather than
  recreate it.
- Somatic expansion (v0.3.0 #26–#29). Archaic/Magic/Red somatic modules wait
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
| [P9-01a](https://github.com/paruff/integral-education/issues/525) | Multi-site build: a per-site config (title, navbar, sidebar, search, `include` filter) built with `--config` and `--out-dir` into one Pages artifact; CI builds every site | `sites/*.config.js`, `package.json`, deploy workflow | All sites build in CI; a link check fails if a stage site links to another stage or to AQAL pages | P9-01 |
| [P9-02](https://github.com/paruff/integral-education/issues/526) | Per-site storage key with migration from `iel_progress_v1` (NFR-06) | `src/hooks/useProgress.js` | Unit test: two sites, no overwrite; old data kept | — |
| [P9-03](https://github.com/paruff/integral-education/issues/527) | Stage-language checks: add FR-17 rules (prior knowledge, relevance, tiers in register) to `developmental-vocabulary`; write a cognitive-interview script for audience readers | `.agents/skills/developmental-vocabulary/`, `internal/pilots/` | Skill and script reviewed | — |
| [P9-04](https://github.com/paruff/integral-education/issues/415) | Neutral hub page on the main site: descriptive self-placement (FR-03) linking to stage sites, with a "choose again" route (absorbs #415) | `src/pages/` or `docs/` | Build passes; vocabulary check passes | P9-01 |
| [P9-05](https://github.com/paruff/integral-education/issues/528) | Launch the first stage site: rewrite its QuickStart and modules in stage register; make shared line modules neutral or split them into per-site variants | its site config, `docs/` | Scope and vocabulary gates pass; 3 audience readers per QuickStart `[HUMAN-REQUIRED]` | P9-01a–P9-04, P10-02 |
| [P9-06](https://github.com/paruff/integral-education/issues/529) | Compare the first site with the main site on FR-19 after 8 weeks; decide on the other two | `docs/METRICS.md` | Decision recorded | P9-05, P10-04 |

## P10 — Success metrics (FR-19)

Design: [§9 Metrics and analytics](design.md#9-metrics-and-analytics).

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P10-01](https://github.com/paruff/integral-education/issues/532) | `[HUMAN-REQUIRED]` Decide on site analytics: none, or a cookieless aggregate-only tool. Record privacy reasoning. **Decided 2026-10-21: cookieless aggregate-only** | `analytics-decision.md` | Decision recorded | — |
| [P10-01a](https://github.com/paruff/integral-education/issues/586) | Choose the tool against the criteria in `analytics-decision.md` `[HUMAN-REQUIRED]` (cost, vendor); add it to production builds only, with the hub events and a footer privacy note | `docusaurus.config.js`, `sites/*.config.js`, privacy page | No cookies or device storage set (checked in browser devtools); not loaded on PR builds | P10-01 |
| [P10-02](https://github.com/paruff/integral-education/issues/533) | Compute process metrics in the browser (on-time reviews, calibration gap, completion, return) and show them to the learner on the progress page | `src/hooks/useProgress.js`, `docs/my-progress.mdx` | Unit tests per metric | P2-02, P9-02 |
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
| [P11-03](https://github.com/paruff/integral-education/issues/542) | Pin the toolchain: `.nvmrc` on Node 24 LTS (Node 20 reached end of life in April 2026, Node 22 is end of life), `node-version-file` in every workflow, `engines` to match; `ubuntu-24.04` instead of `ubuntu-latest`; plain `grep` instead of unpinned apt `ripgrep` | `.nvmrc`, `.github/workflows/*`, `package.json` | No hard-coded Node version left; build passes | — |
| [P11-04](https://github.com/paruff/integral-education/issues/543) | Pin GitHub Actions to commit SHAs (Dependabot already updates `github-actions`) | `.github/workflows/*` | No `@vN` tags left | — |
| [P11-05](https://github.com/paruff/integral-education/issues/544) | Fix the required check that can hang: `Protocol Guardrails` is required but path-filtered, so PRs without `docs/` changes wait forever. Run it on every PR | `content-protocol.yml` | A non-docs PR gets the check | — |
| [P11-06](https://github.com/paruff/integral-education/issues/545) | Take the network out of the PR gate: internal links fail the build (`markdown.hooks.onBrokenMarkdownLinks: 'throw'`, replacing the deprecated top-level option; `onBrokenAnchors: 'throw'`); external links move to a nightly lychee job that opens an issue on failure | `docusaurus.config.js`, `ci-quality.yml`, new scheduled workflow | PR gate makes no external requests | — |
| [P11-07](https://github.com/paruff/integral-education/issues/546) | Fix the failing NPM Audit job on `main` | `package.json`, `package-lock.json` | Audit green on `main` | — |
| [P11-08](https://github.com/paruff/integral-education/issues/547) | Add `npm test` using the built-in `node --test` runner, run in CI and lefthook. P2-02, P2-04, P9-02 and P10-02 need it | `package.json`, `test/` | One passing test in CI | — |
| [P11-09](https://github.com/paruff/integral-education/issues/548) | Deploy what was tested: deploy uses the build artifact from the CI run on the same commit instead of rebuilding | `deploy-gh-pages.yml`, `ci-quality.yml` | Deployed artifact hash matches the CI artifact | P11-03 |

## P12 — Stage nomenclature

Design: [§8 Stage nomenclature](design.md#8-stage-nomenclature). Goal: G6 (#555).

Steps 2–4 were built as a stack of PRs (#621–#627) that merged into each
other's branches, not into `main`. They land as one PR per original step,
in order, each based on `main`.

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| [P12-01](https://github.com/paruff/integral-education/pull/620) | Decide one internal stage-name set and its crosswalk | `.agents/skills/developmental-vocabulary/SKILL.md` | Merged in PR #620 | — |
| [P12-02](https://github.com/paruff/integral-education/issues/629) | Accept the new names alongside the old ones; migrate level and tag values and the content graph (steps 2–3) | frontmatter in `docs/`, `docs/maps/`, `docs/.content-graph*.json`, validators | Validators and build pass on `main` | P12-01 |
| [P12-03](https://github.com/paruff/integral-education/issues/630) | Rename docs, components and URLs per stage, with redirects from the old URLs (step 4), one PR per stage | `docs/**`, `src/components/`, `.agents/`, redirects | Every old URL redirects; build passes | P12-02 |
| [P12-04](https://github.com/paruff/integral-education/issues/631) | Remove the old values and aliases (step 5) | validators, `developmental-vocabulary` crosswalk | No old value left outside the crosswalk and citations | P12-03 |

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Retrofitting 77 modules takes longer than expected | High | Medium | P2 first (highest evidence), then P3 batched by most-used pathway |
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

## Superseded sources

Kept for history. Their open items live above.

| Document | What moved here |
| --- | --- |
| `docs/AUDIT_AND_IMPLEMENTATION_PLAN.md` (2026-07-26) | P6-01 – P6-03 |
| `docs/v0.3.0-alpha-todo.md` (2026-07-25) | P1-03, P6-01, P7 |
| `internal/implementation/backlog.md` (M1–M3) | P1-01, P5, P7 |
| `docs/product/tasks.json` (`prod-01` – `prod-05`) | P6-02, P4-02, P6-04, P5-01, P6-03 |
| Root `specification.md` / `design.md` / `tasks.json` (MM-01) | Archived to `docs/features/mm-01-magic-purple-orientation/` |
