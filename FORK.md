# Fork Strategy — Integral Education Platform

> **Last updated:** 2026-07-25
> **Status:** Draft
> **Owner:** @paruff

## Philosophy

This repository is the **upstream monorepo** for the Integral Education Platform. It contains all learning modules, maps, quickstarts, and platform configuration across all developmental stages. Forks extract stage-specific subsets of this content for targeted audiences.

**One upstream, three forks.** Each fork removes AQAL jargon, filters content by developmental stage, and rebrands for its target audience. Forks are not mirrors; they are curated experiences.

## Fork Inventory

| Fork | Repo | Target Stage Transition | Content Scope |
|------|------|------------------------|---------------|
| Upstream | `integral-education` | All stages (authoring) | Full module library, maps, internal docs |
| Fork 1 | `integral-amber` | Amber → Rational | Amber stage orientation, QuickStart, shadow module |
| Fork 2 | `integral-rational` | Rational → Pluralistic | 7-module R→P suite, emotional/somatic/interpersonal lines |
| Fork 3 | `integral-pluralistic` | Pluralistic → Integral | Late Green, bridge modules, Teal orientation |

## Scope Rules

### What stays upstream only
- AQAL framework language and jargon
- Internal documentation (feature specs, quality gates, protocols)
- Agent skill files (`.agents/skills/`)
- Feature archives (`docs/features/`)
- Internal content plugin (`internal/`)
- Build artifacts, CI/CD internals, Docusaurus config for upstream deployment

### What gets forked
- Learner-facing modules (subset by stage)
- QuickStart paths (subset)
- Maps and tools (AQAL-free versions)
- Docusaurus config (fork-specific title, tagline, baseUrl, search)

### What stays in sync across all repos
- `AGENTS.md` (fork references upstream skill suite)
- `README.md` license and linking conventions
- `CHANGELOG.md` (fork-specific entries)
- React component library (shared via `src/components/`)
- Custom CSS (shared theme variables)
- CI/CD workflows (shared structure)

## Fork Process

1. **Pre-flight:** Run `fork-readiness-audit` skill — all P0/P1 gates must pass
2. **Scaffold:** Clone upstream, strip non-scoped content, apply fork-specific config
3. **Governance:** Create fork Product Charter (`CHARTER-[fork-name].md`), populate RACI
4. **Vocabulary audit:** Remove all prohibited terms from learner-facing copy
5. **Safety review:** Clinician sign-off on all Tier 2 modules in scope
6. **Launch:** Deploy to GitHub Pages, announce, update suite context

## Upstream → Fork Content Flow

- Bug fixes to shared components (`src/components/`) flow **upstream-first**, then cherry-pick to forks
- New modules are authored **upstream-first**, then included in the relevant fork's next sync
- Fork-specific content (e.g. landing page copy) lives **only in the fork**
- Docusaurus config changes that affect all forks (e.g. plugin upgrades) are coordinated via upstream PR

## North Star Metrics

Every fork must define exactly **one north star metric** that governs all scope and quality decisions. This metric should measure whether the fork is actually useful to its target audience, not vanity metrics like module count or GitHub stars.

| Fork | North Star Metric | Why This Metric |
|------|------------------|-----------------|
| **Fork 1** (`integral-amber`) | **QuickStart completion rate:** % of learners who start the Amber→Rational QuickStart and complete all modules in sequence | Fork 1's value is guiding a specific transition. If learners don't complete the sequence, the fork is not achieving its purpose. |
| **Fork 2** (`integral-rational`) | **Practice adoption rate:** % of learners who report applying at least one practice from the module in daily life within 14 days | Fork 2's modules are skill-heavy. The fork succeeds if skills transfer to daily behaviour, not just conceptual understanding. |
| **Fork 3** (`integral-pluralistic`) | **Bridge completion rate:** % of learners who complete all three bridge modules (late-green-disillusionment, meta-systemic-thinking, healthy-hierarchy) before starting the Teal orientation | Fork 3's unique risk is premature stage-identification. The metric enforces the developmental sequence. |

**How to use:** Every proposed content addition, removal, or modification to the fork must be evaluated against the north star metric. "Will this improve completion rate?" or "Will this improve practice adoption?" If the answer is no, the change is scope creep.

**Measurement approach:** All forks are static sites (no server-side analytics). Measurement is indirect:
- Pre/post surveys of pilot participants
- Self-reported completion checkpoints built into module content
- Longitudinal follow-up (3-month intervals) with early adopters

Design the fork knowing what metric matters, even if you cannot measure it perfectly at launch.

## Governance

Each fork has its own:
- `CHARTER-[fork-name].md` — product charter signed by named owner
- RACI matrix — named owners for all roles
- GitHub Pages deployment
- Issue tracker and backlog

Upstream repository maintainers have admin access to all forks for cross-cutting changes.
