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

## Governance

Each fork has its own:
- `CHARTER-[fork-name].md` — product charter signed by named owner
- RACI matrix — named owners for all roles
- GitHub Pages deployment
- Issue tracker and backlog

Upstream repository maintainers have admin access to all forks for cross-cutting changes.
