# Integral Education Platform — Claude Code Instructions

This file is lean by design to control always-on token spend.

## Required startup steps
1. Read `/tmp/workspace/paruff/integral-education/AGENTS.md`.
2. Confirm task scope (files to read, files to change, 2-sentence plan) before Agent Mode.
3. Load only relevant skill files from `/tmp/workspace/paruff/integral-education/.github/skills/`.

## Non-negotiables
- Respect `[COPILOT]`, `[HUMAN-RECOMMENDED]`, and `[HUMAN-REQUIRED]` boundaries.
- Do not generate therapy/diagnosis/clinical claims.
- For content or navigation edits, require `npm run build` success.
- Never fabricate citations, evidence, or safety outcomes.

## Skill file index
- Architecture: `/tmp/workspace/paruff/integral-education/.github/skills/architecture/SKILL.md`
- PR Contract: `/tmp/workspace/paruff/integral-education/.github/skills/pr-contract/SKILL.md`
- Metrics: `/tmp/workspace/paruff/integral-education/.github/skills/metrics/SKILL.md`
- Model Routing: `/tmp/workspace/paruff/integral-education/.github/skills/model-routing/SKILL.md`
