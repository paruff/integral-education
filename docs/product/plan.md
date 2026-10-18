# Product Plan

> **Status:** Draft, awaiting Product Owner acceptance (@paruff)
> **Date:** 2026-10-02
> **Implements:** `specification.md`, which serves `intent.md`.
>
> This is the **single product-level plan**. It consolidates the planning
> documents listed in § Superseded sources. Open items from each were
> re-checked against the repo on 2026-10-02 and carried in here. If work
> departs from this plan, update this file in the same PR.

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

Each task below is one PR unless noted. **Proof** is what must be true to
close it.

## P0 — Documents (this PR)

| ID | Task | Proof | Depends |
| --- | --- | --- | --- |
| P0-01 | Add `intent.md` and `plan.md`; rebuild `specification.md` around self-paced learning evidence | PO merges; build passes | — |
| P0-02 | Archive the merged MM-01 feature files from the repo root to `docs/features/mm-01-magic-purple-orientation/` | No root spec left | — |
| P0-03 | Merge PR #501 (protocol §7 evidence base) | Merged | — |

## P1 — Decisions `[HUMAN-REQUIRED]`

| ID | Task | Proof | Depends |
| --- | --- | --- | --- |
| P1-01 | Revise the charter: self-paced-only scope; replace O4 (self-report) with the FR-15 retention measure; remove facilitated pilot pathways | Charter v0.2 signed | P0-01 |
| P1-02 | Check the five new citations in `specification.md` against their sources | Each marked checked with a date | — |
| P1-03 | Name a safety reviewer for Tier 2 content | Named in `raci.md` | — |

## P2 — Retention foundation (Strong evidence)

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| P2-01 | Add `<RetrievalPrompt>` to the 19 modules missing it and fix the 50 whose `cards` lacked `[ ]`, plus a check script that fails CI if any module lacks it (FR-04). Done in one PR with P2-05 (same files, same check) | 69 modules, `scripts/check-retention.mjs`, `ci-quality.yml` | 77/77; check in CI | — |
| P2-02 | Calibration: `RetrievalCard` shows a model answer or criteria before the learner self-rates (FR-10) | `src/components/RetrievalCard/` | Component test | — |
| P2-03 | Interleaved review: the due-review list mixes cards across modules within a pathway (FR-05). Check current behavior first and change only if needed | `src/components/RetrievalPrompt/`, `src/hooks/useProgress.js` | Test with cards from 3 modules | — |
| P2-04 | Learner can view and clear local learning data (NFR-05) | `useProgress`, `docs/my-progress.mdx` | Unit test on reset | — |
| P2-05 | Mastery thresholds stated in every Assess section (FR-07) | `docs/modules/*` (batched) | Audit lists 0 missing | — |

## P3 — Module toolkit (every module)

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| P3-01 | Add generation, elaboration, calibration, load and no-low-utility checks to the `module-authoring` skill checklist (FR-08 to FR-12) | `.agents/skills/module-authoring/SKILL.md` | Checklist updated | P1-02 |
| P3-02 | Apply the toolkit to existing modules, starting with the most-used QuickStart paths, batched by pathway | `docs/modules/*` (several PRs) | Each batch passes the checklist | P3-01 |
| P3-03 | Evidence tiers in Theoretical Frameworks; stage models introduced as a lens (FR-14) | `docs/modules/*` | `evidence-vetting` pass; human citation check | P0-03 |

## P4 — Self-paced pathways (every QuickStart)

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| P4-01 | Extend `quickstart-validator` for planning prompt, if-then plan, visible progress, pace guidance (FR-13), mixed review points (FR-05) and mastery thresholds (FR-07) | `.agents/skills/quickstart-validator/SKILL.md` | Skill updated | — |
| P4-02 | Apply to all 13 QuickStarts (absorbs `prod-02`) | `docs/quickstarts/*` | 13/13 pass | P4-01, P2-03 |

## P5 — Measure retention

| ID | Task | Files | Proof | Depends |
| --- | --- | --- | --- | --- |
| P5-01 | Self-paced study protocol: one QuickStart, delayed retention test ≥7 days after the last module, self-report reported separately (FR-15). Includes a question on whether learners chose the right starting QuickStart (absorbs `prod-04`) | `internal/pilots/` | Protocol reviewed | P1-01 |
| P5-02 | Draft retention test items with AI; a human validates them `[HUMAN-REQUIRED]` | `internal/pilots/` | Validation recorded | P5-01 |
| P5-03 | Run the study and write the report. Effect sizes with intervals, labelled preliminary, no efficacy claims from one study (absorbs issue #21) | `internal/pilots/` | Report published | P5-02 |

## P6 — Content quality hygiene

| ID | Task | Proof | Depends |
| --- | --- | --- | --- |
| P6-01 | Clear prohibited-vocabulary and frontmatter warnings, batched by term, then make warnings fail CI (FR-01, FR-06) | Validator 77/77 (today 35%) | — |
| P6-02 | Run `audit-a11y.mjs` in CI (NFR-02; was `prod-01`) | CI fails on a seeded violation | — |
| P6-03 | Fix `docs/quality/` → `internal/quality/` links (18 files) and `ARCHITECTURE.md` counts (75→77 modules, 10→13 QuickStarts; was `prod-05`) | Grep finds 0; counts match | — |
| P6-04 | Audit stage/line/tier tags against `aqal-competency-map.md` (was `prod-03`) | Zero mismatches | P6-01 |

## P7 — Content expansion (after P2–P4)

Carried over from `v0.3.0-alpha-todo.md` and the backlog. Each item must
meet the P3 toolkit from the start. None of the Tier 2 items starts before
P1-03.

- Decide fork vs. main placement for Magic/Red content (#415, #416).
- Fork track (v0.3.0 #11, #13–#18, #22–#25), including the Tier 2
  `amber-shadow-moral-certainty` module.
- Bridge modules: `late-green-disillusionment`, `meta-systemic-thinking`.
  A `healthy-hierarchy*` module already exists, so verify it rather than
  recreate it.
- Somatic expansion (v0.3.0 #26–#29). Archaic/Magic/Red somatic modules wait
  on a decision about embodied (audio/movement) delivery.

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Retrofitting 77 modules takes longer than expected | High | Medium | P2 first (highest evidence), then P3 batched by most-used pathway |
| Desirable difficulties feel harder and learners quit | Medium | Medium | Explain briefly why retrieval and spacing feel hard; keep sessions short (FR-12); planning prompts (FR-13) |
| Self-rated retrieval stays overconfident | Medium | Medium | Model answers before self-rating (P2-02) |
| Retention study sample is small | High | Medium | Label results preliminary; report intervals |
| AI fabricates citations during backfill | Medium | High | Human checks every citation against its source |
| No Tier 2 safety reviewer | High | Medium | P1-03; P2–P6 don't depend on it |

## Superseded sources

Kept for history. Their open items live above.

| Document | What moved here |
| --- | --- |
| `docs/AUDIT_AND_IMPLEMENTATION_PLAN.md` (2026-07-26) | P6-01 – P6-03 |
| `docs/v0.3.0-alpha-todo.md` (2026-07-25) | P1-03, P6-01, P7 |
| `internal/implementation/backlog.md` (M1–M3) | P1-01, P5, P7 |
| `docs/product/tasks.json` (`prod-01` – `prod-05`) | P6-02, P4-02, P6-04, P5-01, P6-03 |
| Root `specification.md` / `design.md` / `tasks.json` (MM-01) | Archived to `docs/features/mm-01-magic-purple-orientation/` |
