# Product Plan

> **Status:** Accepted by the Product Owner (@paruff), 2026-10-24
> ([review.md](review.md))
> **Date:** 2026-10-02 (revised 2026-10-18: P8 visuals, P9 stage sites and
> language, P10 metrics, P11 deterministic build and CI; 2026-10-24: issue
> links, design links, P12 stage nomenclature; 2026-11-09: open rows rewritten
> to match the code, per the implementation-readiness review; 2026-11-13:
> [planning audit](../audits/2026-11-13-planning-audit.md) applied: goals,
> the next release, the owner's queue, a Spec column, P7 moved to Later,
> closed phases moved to [archive/plan-2026-10.md](archive/plan-2026-10.md).
> The 2026-11-13 revision awaits the Plan gate)
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

- Metrics baseline (P10) **before** stage sites (P9) was the rule. It was
   not met: Clear Thinking was published on 2026-10-21, the day analytics
   went live, so no pre-launch baseline exists. The comparison is therefore
   **concurrent**: both sites over the same 8 weeks (P9-06), with the first
   recorded values as the baseline (P10-04a). Stage-specific language and
   separate sites have no direct evidence, so one site is compared with the
   main site before any other is built.

Each task below is one PR unless noted. **Proof** is what must be true to
close it. **Spec** is the requirement in `specification.md` the task serves.

## Goals and the next release

One goal at a time. A goal is done when its proof passes. Each goal is a
tracking issue; its rows are that issue's sub-issues. Work not needed for
the current goal waits in its own phase or in [Later](#later-no-milestone).

| Goal | Outcome | Proof | Rows | Issue | State |
| --- | --- | --- | --- | --- | --- |
| G0 | Decisions and evidence checks unblock the plan | P1 rows closed | P1 | #549 | Done 2026-10-18 |
| G1 | Learning lasts: retrieval, calibration, mastery in every module | `check-retention.mjs` 77/77 in CI | P2 | #550 | Done 2026-10-18 |
| G2 | Every module applies the toolkit, with visuals and evidence tiers | P3-03 worklist Result column complete; `check-toolkit.mjs` passes | P3, P8 | #551 | Open: P3-03, P3-04 |
| G3 | Self-paced pathways supply the structure a teacher would | `check-quickstarts.mjs` 13/13 | P4 | #552 | Done 2026-10-19 |
| G4 | One stage site, measured against the main site | P9-06 decision and its numbers in [review.md](review.md) | P9 | #553 | **Current.** Decision due 2026-12-16 |
| G5 | We know whether learning works | Retention report committed (P5-03); values in `docs/METRICS.md` (P10-04a) | P5, P10 | #554 | Open. P5 starts after G4 |
| G6 | Content meets its own quality rules | Validator 77/77, warnings fail CI | P6 | #555 | Done 2026-10-21 (issue still open) |
| G7 | Deterministic build | Deployed artifact is the tested artifact | P11 | #556 | Done 2026-10-21 |
| G8 | One stage-name set everywhere | `check-stage-names.mjs` passes in CI (P12-04) | P12 | no issue yet | Open. P12-03 starts after G4 |

**Next release: `v0.3.0-alpha`** (milestone of the same name, no milestone
yet). It is cut when the P9-06 decision is recorded. It holds P10-01a,
P10-04a, P9-06 and P12-02, plus what is under `[Unreleased]` in
`CHANGELOG.md`. P3-03, P3-04 and the P9-05 readers run alongside but do not
hold the release. P5 and P12-03 onward come after it.

## Owner's queue

Every open step that needs the Product Owner, in the order to do them.

| # | Step | Row | Issue | By |
| --- | --- | --- | --- | --- |
| 1 | Devtools check on a normal visit; is the GoatCounter export enough | P10-01a | [#586](https://github.com/paruff/integral-education/issues/586) | now |
| 2 | Fill the Baseline column in `docs/METRICS.md` | P10-04a | no issue yet | 2026-11-30 |
| 3 | Confirm the go / revise / stop rule in `docs/METRICS.md` | P9-06 | [#529](https://github.com/paruff/integral-education/issues/529) | 2026-11-30 |
| 4 | Three audience readers; the site's name | P9-05 | [#528](https://github.com/paruff/integral-education/issues/528) | before 2026-12-16 if possible |
| 5 | Citation check, at least 69 tags, in batches | P3-03 | [#519](https://github.com/paruff/integral-education/issues/519) | alongside |
| 6 | Re-check the numbers in the protocol §7 citations | P3-04 | no issue yet | alongside |
| 7 | Choose a replacement for the dead support-resource link | none (nightly alert) | [#658](https://github.com/paruff/integral-education/issues/658) | alongside |
| 8 | Gates: approve or return `design.md` (still Draft) and the 2026-11-13 revisions of intent, spec and plan | — | [review.md](review.md) | with this PR |
| 9 | Decide the stage sites | P9-06 | [#529](https://github.com/paruff/integral-education/issues/529) | 2026-12-16 |
| 10 | Consent wording, recruitment route, form tool; then validate 28 items; then run the study | P5-01, P5-02, P5-03 | [#530](https://github.com/paruff/integral-education/issues/530), [#531](https://github.com/paruff/integral-education/issues/531), [#628](https://github.com/paruff/integral-education/issues/628) | after 2026-12-16 |

## Done phases

P0, P1, P2, P4, P6, P8 and P11 are closed. Their rows, unchanged, are in
[archive/plan-2026-10.md](archive/plan-2026-10.md). Rows below that depend
on them (for example P11-08) link there.

## P3 — Module toolkit (every module)

Design: [§4 Toolkit enforcement](design.md#4-toolkit-enforcement-in-every-module).

| ID | Spec | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- | --- |
| [P3-01](https://github.com/paruff/integral-education/issues/517) | FR-08 to FR-12 | Add generation, elaboration, calibration, load and no-low-utility checks to the `module-authoring` skill checklist (FR-08 to FR-12) | `.agents/skills/module-authoring/SKILL.md` | `module-authoring` checklist lists the five checks (FR-08 to FR-12) and `check-toolkit.mjs` still passes; reviewed by the Product Owner in the PR | P1-02 |
| [P3-02](https://github.com/paruff/integral-education/issues/518) | FR-08 to FR-12 | Apply the toolkit to existing modules, starting with the `amber-to-rational` QuickStart (the live stage site), then the other twelve in `docs/quickstarts/` order, batched by pathway | `docs/modules/*` (several PRs) | Each batch passes the checklist | P3-01 |
| [P3-03](https://github.com/paruff/integral-education/issues/519) | FR-14 | Inline evidence tiers already exist (255 tags). Remaining: the human citation check of [`p3-03-citation-check-worklist.md`](p3-03-citation-check-worklist.md) (every Tier A, at least 10% of B and C) `[HUMAN-REQUIRED]`, then fix the tags the check downgrades; confirm each Theoretical Frameworks section introduces stage models as a lens (FR-14) | `p3-03-citation-check-worklist.md` (Result column filled in), only the modules the check flags | Worklist Result column complete; reviewer and date at the end of that file and a row in [review.md](review.md); `check-toolkit.mjs` passes | P0-03 |
| P3-04 (no issue yet) | FR-04, FR-07 | `[HUMAN-REQUIRED]` Re-check the numbers in the citations that came from protocol §7 and are not in the fifteen-row human log: Adesope et al. (2017) "g = 0.51 across 217 studies" and Kulik et al. (1990) "108 controlled evaluations" first. The 2026-10-01 check names no checker, and the audit could not verify the Adesope count | `specification.md` (evidence table and citation check log), `internal/quality/instructional-design-protocol.md` §7 | Each §7 citation has a row in the citation check log with a date and initials; any corrected number is corrected in both files | — |

## P5 — Measure retention

Design: [§9 Metrics and analytics](design.md#9-metrics-and-analytics).

The human steps of P5 start after the P9-06 decision (2026-12-16): one
person recruits for one thing at a time. P5-01a and P5-01b are agent work
and can be done before then.

| ID | Spec | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- | --- |
| P5-01a (no issue yet) | FR-15 | Archive the superseded facilitated files `pilot-runbook-20-40.md` and `pilot-pathway-*.md` to `internal/pilots/archive/`, and fix any link to them | `internal/pilots/archive/` (create), `sidebarsInternal.js` if it lists them | The three files are under `archive/`; `npm run build` passes | — |
| P5-01b (no issue yet) | FR-15, NFR-05 | Draft a test-form tool shortlist against the rules in [analytics-decision.md](analytics-decision.md) (a form tool is a new data processor), the way `analytics-tool-shortlist.md` did for analytics. The owner picks | `docs/product/form-tool-shortlist.md` (create) | Shortlist names what each tool stores, where, and for how long, with a link to each tool's own documentation for every claim | — |
| [P5-01](https://github.com/paruff/integral-education/issues/530) | FR-15 | Finish the self-paced study protocol: one QuickStart (`amber-to-rational`, the Clear Thinking QuickStart), delayed retention test at least 7 days after the last module, self-report kept separate (FR-15), single-arm paired analysis (a between-site comparison is a later analysis). The draft already covers design, measures, analysis and data handling. Remaining: `[HUMAN-REQUIRED]` consent wording, sample and recruitment route (target 20–40 adults), and the test-form tool. A form tool is a new data processor, so record it in [analytics-decision.md](analytics-decision.md) before use (shortlist: P5-01b). Archiving the facilitated files is P5-01a | `internal/pilots/retention-study-protocol.md` (modify), `analytics-decision.md` (modify) | Protocol review checklist (§9) ticked by the Product Owner; form tool recorded; row in [review.md](review.md) | P1-01, P5-01b, P9-06 |
| [P5-02](https://github.com/paruff/integral-education/issues/531) | FR-15 | Items are drafted (two sets of 14, two per module). Remaining: the Product Owner validates every item against the checklist in the file `[HUMAN-REQUIRED]` | `internal/pilots/retention-test-items.md` (modify: reviewer, date, changes) | All checklist boxes ticked; reviewer and date recorded in the file and a row in [review.md](review.md) | P5-01 |
| [P5-03](https://github.com/paruff/integral-education/issues/628) | FR-15, FR-19 | Run the study and write the report. Effect size is the paired Cohen's d of delayed vs pre-test with a 95% interval (protocol §7), labelled preliminary, no efficacy claims from one study (absorbs issue #21). Replaces `pilot-revision-report-template.md`, which moves to `internal/pilots/archive/` | `internal/pilots/retention-study-report.md` (create) | Report committed with the protocol's §7 tables and §8 limits; aggregates only (n < 5 cells suppressed) | P5-02 |

## P9 — Stage sites and stage-specific language (FR-17, FR-18)

Design: [§7 Stage sites](design.md#7-stage-sites).

| ID | Spec | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- | --- |
| [P9-01](https://github.com/paruff/integral-education/issues/416) | FR-18 | `[HUMAN-REQUIRED]` Confirm the stage-site model: multi-config builds from this repo (forks deferred), the three transitions in `STAGE-SITES.md`, which launches first, and Magic/Red placement (closes #416) | `STAGE-SITES.md`, decision record | Decision recorded; `STAGE-SITES.md` updated | — |
| [P9-01a](https://github.com/paruff/integral-education/issues/525) | FR-18 | Multi-site build: each site is an entry in `sites/sites.json` (its doc list) plus a `sites/<id>.config.js`; `scripts/prepare-site.mjs` assembles the docs with per-site `overrides/` and `patches/`, and `scripts/build-sites.mjs` builds every site into one Pages artifact; CI builds every site | `sites/sites.json`, `sites/*.config.js`, `scripts/prepare-site.mjs`, `scripts/build-sites.mjs`, deploy workflow | All sites build in CI; a link check fails if a stage site links to another stage or to AQAL pages (`tests/check-site-links.test.mjs`) | P9-01 |
| [P9-02](https://github.com/paruff/integral-education/issues/526) | NFR-06 | Per-site storage key with migration from `iel_progress_v1` (NFR-06) | `src/hooks/useProgress.js` | `tests/learner-data.test.mjs`: two sites do not overwrite each other; legacy data is kept | P11-08 |
| [P9-03](https://github.com/paruff/integral-education/issues/527) | FR-17 | Stage-language checks: add FR-17 rules (prior knowledge, relevance, tiers in register) to `developmental-vocabulary`; write a cognitive-interview script for audience readers | `.agents/skills/developmental-vocabulary/`, `internal/pilots/` | Skill and script reviewed by the Product Owner in the PR; the cognitive-interview script is `internal/pilots/stage-language-cognitive-interview.md` | — |
| [P9-04](https://github.com/paruff/integral-education/issues/415) | FR-03, FR-18 | Neutral hub page on the main site: descriptive self-placement (FR-03) linking to stage sites, with a "choose again" route (absorbs #415) | `src/pages/` or `docs/` | Build passes; vocabulary check passes | P9-01 |
| [P9-05](https://github.com/paruff/integral-education/issues/528) | FR-17, FR-18 | Clear Thinking (`amber-to-rational`) is built and published: per-site overrides, not neutral shared modules (decided in [stage-site-rewrite-plan.md](stage-site-rewrite-plan.md)), and the vocabulary baseline is `[]`. Remaining: the audience readers `[HUMAN-REQUIRED]` per `internal/pilots/stage-language-reader-kit.md` (3 per QuickStart), and the owner's naming call. Do not edit shared `docs/` modules. The site was published before the readers, as a deliberate trial, so that readers read the live site ([review.md](review.md), 2026-11-13). Copy changes from the readers go only in `sites/clear-thinking/overrides/`, are logged with their date in `docs/METRICS.md`, and are applied after the P9-06 decision (copy freeze) | `sites/clear-thinking/**` | `node scripts/check-site-vocabulary.mjs --strict` and `node scripts/build-sites.mjs --strict` pass; 3 readers recorded in [review.md](review.md) | P9-01a, P9-02, P9-03, P9-04, P10-02 |
| [P9-06](https://github.com/paruff/integral-education/issues/529) | FR-19 | Compare the first site with the main site after 8 weeks, counting from its publication on 2026-10-21 (decision due 2026-12-16). The comparison is concurrent: there is no pre-launch baseline. This is an **engagement** decision, not a learning one. It uses only the completion proxy and the switch-rate proxy from `analytics-decision.md`, both labelled as proxies, for the `amber-to-rational` QuickStart on each site. The retention study (P5-03) has no stage-site arm and does not drive this decision. Rule, recommended by the planning audit and accepted by the owner on 2026-11-13 (the owner confirms the numbers in `docs/METRICS.md` by 2026-11-30): it counts only if each site has at least 30 first-step views of the QuickStart and the hub has at least 30 entries to the stage site in the window. Then **go** if the stage site's completion proxy is at least the main site's and the switch rate is 25% or lower; **revise** if one holds; **stop** if neither. If the minimum is not met, **extend** once by 4 weeks (to 2027-01-13); if still not met, record "inconclusive" and build no further site. The thresholds are judgment values with no research source. Override copy in `sites/clear-thinking/overrides/` is frozen from 2026-11-13 until the decision, so reader findings (P9-05) are logged and applied afterwards | `docs/METRICS.md`, [review.md](review.md) | Rule in `docs/METRICS.md` by 2026-11-30; the decision, both proxies and the view counts recorded in the decision log | P10-01a, P10-04a |

## P10 — Success metrics (FR-19)

Design: [§9 Metrics and analytics](design.md#9-metrics-and-analytics).

| ID | Spec | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- | --- |
| [P10-01](https://github.com/paruff/integral-education/issues/532) | FR-19, NFR-05 | `[HUMAN-REQUIRED]` Decide on site analytics: none, or a cookieless aggregate-only tool. Record privacy reasoning (outcome in [review.md](review.md)) | `analytics-decision.md` | Decision recorded | — |
| [P10-01a](https://github.com/paruff/integral-education/issues/586) | FR-19, NFR-05 | GoatCounter is chosen and wired in (`analytics-decision.md`). Remaining: the browser-devtools check on a normal visit (no cookie and no storage entry; the `enter-stage-site` and `choose-again` clicks register on the dashboard) `[HUMAN-REQUIRED]`, and whether the GoatCounter export is enough for the P10-04 baseline. The footer privacy note is a string in `analytics.js`, so no privacy page is needed. If the export is not enough, the P10-04 baseline is provisional and is re-recorded when this closes | `analytics-decision.md` (modify: result of both checks), `analytics.js`, `src/clientModules/goatcounter.js`, `static/js/goatcounter-count.js`, `tests/analytics.test.mjs`, `GOATCOUNTER_CODE` in `.github/workflows/ci-quality.yml` (change only if a check fails) | Both checks recorded in `analytics-decision.md`; `npm test` passes; analytics not loaded on PR builds | P10-01 |
| [P10-02](https://github.com/paruff/integral-education/issues/533) | FR-13, FR-19 | Compute process metrics in the browser (on-time reviews, calibration gap, completion, return) and show them to the learner on the progress page | `src/hooks/useProgress.js`, `docs/my-progress.mdx` | `tests/metrics.test.mjs`: one test per metric | P2-02, P9-02, P11-08 |
| [P10-03](https://github.com/paruff/integral-education/issues/534) | FR-19, NFR-05 | Learner-controlled export: download a summary of their own metrics, to share only in a study | `docs/my-progress.mdx` | Learner sees what is exported before saving | P10-02 |
| [P10-04](https://github.com/paruff/integral-education/issues/535) | FR-19 | Add a learning-metrics section to `docs/METRICS.md` and the monthly ritual in the `metrics` skill; record the baseline | `docs/METRICS.md`, `.agents/skills/metrics/SKILL.md` | Baseline recorded | P10-01a, P10-02 |
| P10-04a (no issue yet) | FR-19 | `[HUMAN-REQUIRED]` Record the values. P10-04 (#535) was closed with the structure only: `docs/METRICS.md` has no baseline values. Fill the Baseline column with values and dates from GoatCounter and, where there is one, a learner export. Leave "not measured" where no source exists yet | `docs/METRICS.md` | Every row of the learning-metrics table has a dated value or "not measured" with the reason; done by 2026-11-30 | P10-01a |

## P12 — Stage nomenclature

Design: [§8 Stage nomenclature](design.md#8-stage-nomenclature). Goal: G8 (no issue yet; was listed under G6, #555).

P12-01 is done. Steps 2–4 are written but **not on `main`**: PRs #621–#627 merged into each other's branches (`origin/feat/stage-names-steps-2-3` is not an ancestor of `main`, checked 2026-11-13).

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

| ID | Spec | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- | --- |
| [P12-01](https://github.com/paruff/integral-education/pull/620) | NFR-07 | Decide one internal stage-name set and its crosswalk (PR #620) | `.agents/skills/developmental-vocabulary/SKILL.md` | Crosswalk in the skill | — |
| [P12-02](https://github.com/paruff/integral-education/issues/629) | NFR-07 | Accept the new names alongside the old ones; migrate level and tag values and the content graph (steps 2–3). Rebase `origin/feat/stage-names-steps-2-3` onto `main` | frontmatter in `docs/`, `docs/maps/`, `docs/.content-graph*.json`, `scripts/validate-frontmatter.js`, `scripts/check-aqal-tags.mjs`, `scripts/generate-content-graph.js` (hard-coded transition names at line 28), the `level:` values in `sites/clear-thinking/overrides/docs/**` | `npm test` and `npm run build` pass on `main`; old and new names both validate (test in `tests/site-tools.test.mjs`) | P12-01 |
| [P12-03](https://github.com/paruff/integral-education/issues/630) | NFR-07 | Rename docs, components and URLs per stage, one PR per stage, in the order Traditional, Rational, Pluralistic, Integral, Magical, Egocentric (step 4). Redirects use `@docusaurus/plugin-client-redirects`, pinned to the same version as `@docusaurus/core`, configured in `docusaurus.config.js` and in each `sites/*.config.js` (`clear-thinking.config.js` replaces `plugins`, so it needs its own entry). The old→new URL list is generated from the crosswalk in `developmental-vocabulary` and committed as `src/data/stage-redirects.json`. Each PR also updates every file that names a renamed slug, and the stage-site files: `sites/sites.json`, `sites/clear-thinking.config.js`, `sites/clear-thinking.sidebars.js`, `sites/clear-thinking/pages/index.js`, and the filenames under `sites/clear-thinking/overrides/docs/` and its patches. It starts only after P9-06 is decided, so analytics paths are not split mid-window | `docs/**`, `src/components/`, `.agents/`, `sidebars.js`, `src/pages/index.js`, `src/pages/start.js`, `src/data/pathways.json`, `src/data/moduleNav.js`, `src/data/stage-redirects.json` (create), `src/data/stage-id-map.json` (create), `src/utils/learnerData.js`, `src/components/ModuleMeta/index.js`, `scripts/audit-a11y.mjs` (line 20), `tests/module-footer.test.mjs`, `sites/**` as listed in the task, `docusaurus.config.js`, `package.json` | Every old URL in `stage-redirects.json` resolves (new test in `tests/site-tools.test.mjs`); progress saved under an old doc id still shows under the new id (`tests/use-progress.test.mjs`, `tests/learner-data.test.mjs`); no stage site links to another stage (`tests/check-site-links.test.mjs`); `npm run build` and `node scripts/build-sites.mjs --strict` pass | P12-02, P9-06 |
| [P12-04](https://github.com/paruff/integral-education/issues/631) | NFR-07 | Remove the old values and aliases (step 5). The check is `node scripts/check-stage-names.mjs` (create), which fails on any old stage name outside the crosswalk and the `docs/product/specification.md` Sources; it runs in lefthook and CI | `scripts/validate-frontmatter.js`, `scripts/check-aqal-tags.mjs`, `scripts/check-stage-names.mjs` (create), `lefthook.yml`, `.agents/skills/developmental-vocabulary/SKILL.md` | `check-stage-names.mjs` passes in CI; a seeded old value fails it; an alias accepted in P12-02 is rejected here (`tests/site-tools.test.mjs`) | P12-03 |

## Later (no milestone)

Not started and not issued. A row gets an issue when it is pulled into a
goal. Each new module must meet the P3 toolkit from the start and use the
P12-01 stage names. Rows P7-01 to P7-12 were carried from
`archive/v0.3.0-alpha-todo.md` (its item number is in brackets) and the
backlog; that file wrote of forks, which P9-01 replaced with stage sites.

| ID | Spec | Task | Waits on |
| --- | --- | --- | --- |
| P7-01 | FR-01, FR-14 | Create the Tier 2 `amber-shadow-moral-certainty` module [11] | Safety Lead sign-off (P1-03 names the reviewer) |
| P7-02 | FR-17 | `[HUMAN-REQUIRED]` Stage-member review of `amber-shadow-moral-certainty` [13] | P7-01 |
| P7-03 | FR-06, FR-17 | Zero prohibited vocabulary in each stage site's learner-facing copy [14]. For Clear Thinking this is `check-site-vocabulary.mjs --strict`; repeat per new site | P7-13 |
| P7-04 | FR-18 | Scope note, `sites/sites.json` entry, config and named owners for each further stage site [15–17, 22, 23: were fork charters, configs and RACI] | P7-13 |
| P7-05 | FR-01 | Verify the emotional and interpersonal safety addendum on every module in a new site's scope [18] | P7-13 |
| P7-06 | FR-17 | `[HUMAN-REQUIRED]` Superiority check on every module of the Pluralistic → Integral site [24] | P7-13 |
| P7-07 | FR-14 | Pre/trans note check on that site's modules touching non-ordinary states or somatic content [25] | P7-13 |
| P7-08 | FR-01 | Bridge modules `late-green-disillusionment` and `meta-systemic-thinking`. A `healthy-hierarchy*` module exists: verify it, do not recreate it | P7-13 |
| P7-09 | FR-01 | Verify `somatic-line-overview` against the 13-section standard [26]. Check `internal/quality/module-rubric-audit.md` first; this may already be done | — |
| P7-10 | FR-01 | Archaic/Magic/Red somatic modules [27] | A decision on embodied (audio/movement) delivery |
| P7-11 | FR-01 | Create `somatic-line-regulation-foundations` [28] | — |
| P7-12 | FR-01 | Create `somatic-line-co-regulation` [29] | — |
| P7-13 | FR-18 | Second and third stage sites (Rational → Pluralistic, Pluralistic → Integral), and where Magic/Red content sits (`STAGE-SITES.md`) | P9-06 says go |

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
| `docs/product/archive/AUDIT_AND_IMPLEMENTATION_PLAN.md` (2026-07-26) | P6-01 to P6-03 |
| `docs/product/archive/v0.3.0-alpha-todo.md` (2026-07-25) | P1-03, P6-01, P7 (now in Later) |
| `internal/implementation/backlog.md` (M1–M3) | P1-01, P5, P7 |
| `docs/product/tasks.json` | `prod-01` to P6-02, `prod-02` to P4-02, `prod-03` to P6-04, `prod-04` to P5-01, `prod-05` to P6-03 |
| Root `specification.md` / `design.md` / `tasks.json` (MM-01) | Archived to `docs/features/mm-01-magic-purple-orientation/` |
