# TOKEN COST: This file loads on every Copilot/Claude Code/Cursor request.
# Every line is billed on every interaction. Keep it lean.
# Full details live in .agents/skills/ — load on demand only.

## AI Policy
- AI drafts; humans approve. Safety-sensitive output needs human sign-off.
- Never include secrets or learner data.
- Verify claims/citations; mark uncertainty. Never fabricate citations, evidence, or safety outcomes.
- Do not generate therapy/diagnosis/clinical claims.
- Respect `[COPILOT]`, `[HUMAN-RECOMMENDED]`, `[HUMAN-REQUIRED]` boundaries.
- Keep scope small and testable; confirm scope (files to read/change, 2-sentence plan) before Agent Mode.
- No Tier2/3 shadow content without human sign-off. No required module-flow break.
- No docs/nav merge without `npm run build` pass.
- GitOps: `main` is the deploy source of truth — no direct pushes or force-push, no
  manual GitHub Pages publish, no repo/CI config changes outside a PR (see gitops skill).

## Project Identity
- Integral Education Platform (AQAL docs/site). Stack: Docusaurus v3, MD/MDX, React, GHA.
- Git hooks: lefthook (`lefthook.yml`) only — no husky. Pre-commit runs build,
  no-h1-in-body, no-placeholders, frontmatter-format, no-merge-conflicts.
  No `prepare` script; run `npx lefthook install` after clone.

## On-Demand Skills
| Use | Path |
|---|---|
| Architecture | .agents/skills/architecture/SKILL.md |
| PR contract | .agents/skills/pr-contract/SKILL.md |
| Metrics | .agents/skills/metrics/SKILL.md |
| Model routing | .agents/skills/model-routing/SKILL.md |
| GitOps | .agents/skills/gitops/SKILL.md |
| Learner experience (v2) | .agents/skills/learner-experience/SKILL.md |
| Module authoring | .agents/skills/module-authoring/SKILL.md |
| Docusaurus conventions | .agents/skills/docusaurus-conventions/SKILL.md |
| Evidence vetting | .agents/skills/evidence-vetting/SKILL.md |
| Safety classification | .agents/skills/safety-classification/SKILL.md |
| Developmental vocabulary | .agents/skills/developmental-vocabulary/SKILL.md |
| Fork readiness audit | .agents/skills/fork-readiness-audit/SKILL.md |

## Specialized Agent Roles
| Role | Path |
|---|---|
| Audit (gap report, run first on existing modules) | .agents/agents/audit.md |
| Content authoring | .agents/agents/content-authoring.md |
| Safety review (veto power, gates all drafts) | .agents/agents/safety-review.md |
| Learner experience (React/MDX interactivity) | .agents/agents/learner-experience.md |
| UX / frontend (Docusaurus config, nav, search) | .agents/agents/ux-frontend.md |
| Marketing copy | .agents/agents/marketing-copy.md |
| Fork scaffolding (one-time per fork) | .agents/agents/fork-scaffolding.md |

## Context Before Writing Code
- Architecture overview: ARCHITECTURE.md
- AQAL map: docs/maps/
- Quality gates: docs/quality/

## See Also
- docs/COPILOT_COST_GUIDE.md
- docs/MODEL_ROUTING_GUIDE.md
- .github/copilot-budget.md
