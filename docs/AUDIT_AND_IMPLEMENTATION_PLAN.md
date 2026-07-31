---
id: audit-and-implementation-plan
title: Repo Audit & Implementation Plan
description: Point-in-time audit of the integral-education platform (main, 2026-07-26) with a prioritized implementation plan.
---

# Repo Audit & Implementation Plan

> **Point in time:** `main` @ commit `e8970a1` (2026-07-26), 77 modules / 13 QuickStarts.
> Method: direct inspection of scripts, CI config, and a fresh re-run of
> `scripts/validate-frontmatter.js` and `scripts/generate-content-graph.js`
> against the current working tree — not a re-derivation from docs or prior
> reports. Where a finding below contradicts an existing doc, the doc is
> treated as wrong until the live check says otherwise.

Scope note: this is a repo-health / infrastructure-and-process audit, not a
full per-module 13-section content audit (that is `.agents/agents/audit.md`'s
job, and — as Finding 1 shows — module content is already at 100% journey-
skeleton compliance, so there's no standing need to run it against all 77
modules right now).

## Summary

The platform's content-remediation effort (the "journey-batch" series,
PRs #448–#465) fully succeeded: every module now has the complete gold-
standard skeleton. The two live gaps that actually matter are **vocabulary/
frontmatter compliance** (P1) and **accessibility CI** (P1) — both are real,
current, and unresolved. Everything else below is documentation drift
(stale counts, broken links, a stale scratch file) or a housekeeping backlog
(uncommitted work with no PR open).

## Findings

### P1 — Frontmatter & prohibited-vocabulary compliance is 35%, not resolved by prior fix PRs

`node scripts/validate-frontmatter.js` (run fresh this session): **77 files
validated, 27 pass, 50 warnings, 0 errors — 35% compliance.** The dominant
warning is prohibited developmental/AQAL vocabulary (`integral`, `AQAL`,
`pre/trans`, etc.) leaking into learner-facing module bodies — the exact
class of issue PR #467 ("remove prohibited hype terms") and PR #469 ("section-
aware prohibited-vocabulary scan... compound-tag exemption") already tried to
fix. Those PRs reduced but did not close the gap; roughly two-thirds of
modules still carry at least one warning.

**Why this matters:** FR-06 (`docs/product/specification.md`) requires
audience-appropriate vocabulary; this is currently unverifiable at the
"zero warnings" bar the spec implies, and warnings-not-errors means the gap
is invisible in CI (validate-frontmatter exits 0 on warnings).

**Next action:** a `content-authoring` pass batched by warning type (not by
module), starting with the highest-frequency terms, using the same
section-aware exemption logic PR #469 added. Track as its own
`docs/features/<slug>/` entry — this is feature-sized work, not a doc fix.

### P1 — Accessibility checks still not wired into CI (known gap, confirmed still open)

`scripts/audit-a11y.mjs` and `scripts/lighthouse-audit.mjs` exist on disk;
`package.json`'s `"scripts"` block has no entry for either, and
`.github/workflows/ci-quality.yml` doesn't invoke them (grepped both this
session, zero matches). `lighthouse` appears only as a `trustedDependencies`
entry, not a wired check. NFR-02 (WCAG 2.1 AA) is currently enforced by
nothing automated.

**Next action:** already tracked as `prod-01` in `docs/product/tasks.json` —
no new task needed, just execution priority. Route through the
`ux-frontend` agent per that task's assignment, as its own PR (CI-config
changes need their own PR per the `gitops` skill).

### P2 — `docs/quality/` is referenced in 17+ places but doesn't exist; the real path is `internal/quality/`

`docs/quality/instructional-design-protocol.md`,
`docs/quality/evidence-vetting-checklist.md`, `docs/quality/peer-review-sop.md`,
and `docs/quality/accessibility-audit.md` are all linked from
`ARCHITECTURE.md`, `README.md`, `CONTRIBUTING.md`, `AGENTS.md`,
`.agents/skills/architecture/SKILL.md`, `.github/copilot-instructions.md`,
GH issue templates, `internal/implementation/*`, and this session's own
`docs/product/specification.md`. All four files actually live under
`internal/quality/` (confirmed via `ls`). This looks like a directory that
was intentionally moved to `internal/` (these are curator/maintainer docs,
not learner-facing — consistent with the `internal/` convention seen
elsewhere) without a repo-wide link update, rather than a missing file.

**Next action:** pick one of two fixes and apply repo-wide — (a) update all
`docs/quality/...` links to `internal/quality/...`, or (b) if `docs/quality/`
was meant to be the public-facing location, move the four files there
instead. (a) is the smaller, lower-risk change given the files are already
settled at `internal/quality/` and that directory's naming convention
matches `internal/implementation/`. Zero-line-count doc fix, safe to bundle
with the `prod-05` count fix below in one PR.

### P2 — `ARCHITECTURE.md` module/QuickStart counts are stale

States "75 learning modules" / "10 QuickStart paths" (lines 13, 127-128);
actual current counts are **77 modules / 13 QuickStarts**. Already tracked
as `prod-05` in `docs/product/tasks.json` — no new task needed.

### P3 — `module-skeleton-gap-audit.md` (repo root, untracked) is a stale scratch artifact, not a current finding

This file claims only 6/77 modules are gold-standard compliant, contradicting
`docs/.content-graph-stats.json`'s 100%. Investigated by spot-checking one of
its "heavy bucket, 8 sections missing" files
(`docs/modules/authority-autonomy-transition.mdx`) directly: **all 8
supposedly-missing sections are present in the file today.** The audit file
is dated from mid-remediation (references `feat/journey-batch-d`, PR #447/
#448 as unmerged); `git log` shows batches D through T (PRs #448–#465) have
since all merged. It's leftover output from an earlier session that was
never committed or cleaned up — not a live discrepancy.

**Next action:** delete it (it's untracked, zero git cost) or, if there's
value in keeping remediation history, move it into `.agents/logs/` with its
actual date and a "superseded — see PR #465" note so it can't be mistaken
for current state again.

### P3 — `gitops` skill's "Known Gap" about branch protection is resolved but not updated

`.agents/skills/gitops/SKILL.md` states `main` has no branch protection
(404 as of when it was written). `gh api repos/paruff/integral-education/
branches/main/protection` now returns a full protection config: 1 required
approving review, required status checks (Build And Validate, Protocol
Guardrails, CodeQL, NPM Audit, Dependency Review, GitGuardian), no force-push,
no deletion. This is good news, not a gap — the skill doc just hasn't caught
up.

**Next action:** trivial edit to `.agents/skills/gitops/SKILL.md` — replace
the "Known Gap" section with the current protection config, or remove the
section if nothing is left unprotected worth flagging.

### P2 — Meaningful completed work sitting uncommitted with no PR, on `main` directly

`git status` shows six modified/deleted files (Copilot-reference cleanup)
and seven new untracked paths (`docs/product/`, four new
`.agents/skills/*/SKILL.md`, `docs/AI_COST_GUIDE.md`) — all from this
conversation, none committed. Current branch is `main` itself (not a
feature branch), and `AGENTS.md`'s own GitOps rule requires all changes to
go through a PR, never direct commits to `main`.

**Next action:** before anything else in this plan gets built on top of it,
this backlog needs a branch + PR (or several, split by concern —
Copilot-cleanup vs. docs/product/ vs. new skills — per the `gitops` skill's
guidance on not bundling unrelated changes). Not doing this silently; ask
before branching/pushing, since it touches `.github/` config.

## Implementation Plan (priority order)

| # | Item | Priority | Owner/Agent | Depends on |
|---|---|---|---|---|
| 1 | Branch + PR(s) for this session's uncommitted work | P2 | human decision, then `gitops` | none |
| 2 | Wire `audit-a11y.mjs`/`lighthouse-audit.mjs` into CI (`prod-01`) | P1 | `ux-frontend` | #1 (own PR) |
| 3 | Vocabulary/frontmatter remediation pass (35% → target ~100%) | P1 | `content-authoring`, batched by term | none |
| 4 | Fix `docs/quality/` → `internal/quality/` links repo-wide | P2 | `content-authoring` | none |
| 5 | Reconcile `ARCHITECTURE.md` counts (`prod-05`) | P2 | `content-authoring` | bundle with #4 |
| 6 | Delete/archive `module-skeleton-gap-audit.md` | P3 | any | none |
| 7 | Update `gitops` skill's stale "Known Gap" note | P3 | any | none |
| 8 | `prod-02`/`prod-03` (QuickStart + tag audits) | P2 | `audit` | none |
| 9 | `prod-04` (placement-accuracy feedback loop) | P3 | `discover` | #8 |

Items 4, 5, 6, 7 are all small enough to land in one "docs hygiene" PR.
Item 3 is the only one sized like real content work — scope it as its own
`docs/features/<slug>/` entry rather than folding it in here.

## References

- `docs/product/tasks.json` — `prod-01` through `prod-05`, referenced above
- `scripts/validate-frontmatter.js`, `scripts/generate-content-graph.js` — live checks this audit relied on
- `.agents/agents/audit.md` — the per-module content-quality auditor (not run in full here; not currently needed given Finding 1)
- `.agents/skills/gitops/SKILL.md`
