---
name: aqal-tagger
description: "Use this skill whenever deciding which stage, line, or safety-tier tags to assign to a module, quickstart, or other content — as opposed to validating that tags already assigned are internally consistent (that's validate-frontmatter.js / the module-authoring skill's frontmatter section). Trigger when: drafting a new module and unsure which stage/line it belongs to, auditing existing content for mis-tagged or under-tagged material, splitting a module that spans more than one stage, or reconciling a module's tags against docs/maps/aqal-competency-map.md."
---

# AQAL Tagger

`scripts/validate-frontmatter.js` and the `module-authoring` skill already enforce that tags exist and are internally consistent (a `tier-2` tag requires a matching `safety_tier: 2` field, etc.). This skill is upstream of that: it's about *choosing the right tag in the first place*, which is a classification judgment call, not a syntax check.

## Tag vocabulary (must match exactly)

- **Stage tags**: `magenta` / `red` / `amber` / `orange` / `green` / `teal` — see `docs/maps/aqal-competency-map.md` and `docs/maps/aqal-overview.md` for the full Spiral Dynamics color definitions and the platform's 4-level (L1–L4) working-model crosswalk.
- **Line tags**: `cognitive-line`, `emotional-line`, `interpersonal-line`, `moral-line`, `self-line`, `somatic-line`, `spiritual-line` — one per independent line of development; a module can carry more than one if it genuinely integrates lines (check `docs/quickstarts/*-line-development.mdx` for the canonical per-line framing before assigning a line tag that isn't already represented there).
- **Safety tier tags**: `tier-1` (standard reflective) / `tier-2` (elevated risk — somatic, shadow, identity-disruption, relational vulnerability) — assigning this tag is properly the `safety-classification` skill's job; this skill only flags when a stage/content combination looks like it should have gotten more safety-tier scrutiny than it got (e.g. Magic/Purple- or Red/Power-stage content tagged `tier-1` when it touches identity or shadow material) and defers the actual tier decision to that skill.

## How to classify

1. Read the module's actual Learn/Practice content, not just its title — a module titled generically can still be squarely one stage's material once you read the Gifts/Limitations framing.
2. Cross-reference `docs/maps/aqal-competency-map.md`'s stage descriptions to match content to the stage whose worldview/capacities it's describing or building.
3. If content deliberately addresses multiple stages at once (e.g. any Integral/Teal module discussing developmental diversity), that's expected — don't force a single-stage tag onto content that structurally requires naming several stages. Reflective/observational content about earlier stages (see `magic-purple-stage-orientation.mdx`, `magic-mythic-red-stage-orientation.md`) is tagged for the stage being *learned about*, since these modules are consumed by learners whose own center of gravity is Amber or later — the tag describes the content's subject, not an assumption about the reader's current stage.
4. If a module's content clearly spans two stages' worth of material, that's a signal to split it into two modules rather than dual-tag it — check with the user before doing the split; it's a bigger structural change than a tag fix.

## Gotchas

- Never invent a stage or line label outside the fixed vocabulary above — a mismatched tag (e.g. `mythic` instead of `amber`) silently breaks `generate-content-graph.js`'s stage-distribution stats and any QuickStart that filters by tag (see `quickstart-validator`).
- Load `developmental-vocabulary` alongside this skill when the tagging decision also requires deciding how to *talk about* the stage in learner-facing copy — tagging and audience-appropriate phrasing are related but separate judgment calls.
- Don't re-tag historical/archived content (`docs/features/*/specification.md`, `internal/implementation/*`) to "fix" stage labels that were accurate at time of writing — those are point-in-time records, not living frontmatter.
