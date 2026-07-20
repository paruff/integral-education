# TOKEN COST: This file loads on every Copilot/Claude Code/Cursor request.
# Every line is billed on every interaction. Keep it lean.
# Full details live in .github/skills/ — load them on demand only.

## AI Policy
- AI drafts; humans approve.
- Never include secrets or learner data.
- Safety-sensitive output needs human sign-off.
- Verify claims/citations; mark uncertainty.
- Keep scope small and testable.

## Project Identity
- Integral Education Platform (AQAL docs/site).
- Stack: Docusaurus v3, MD/MDX, React, GHA.
- Constraint: safety, evidence rigor, build-pass docs.

## Never Do (Project-Specific)
1. No Tier2/3 shadow content without human sign-off.
2. No therapy/diagnosis claims.
3. No required module-flow break.
4. No fabricated citations/evidence.
5. No docs/nav merge without `npm run build` pass.

## Token Budget Protocol (Agent Mode)
Before Agent Mode: list read files, write files, plan, validation.
If scope expands, stop and re-scope.

## On-Demand Skills
| Use | Path | Version |
|---|---|---|
| Detailed rules | .github/skills/ | — |
| Learner experience | .agents/skills/learner-experience/SKILL.md | v2 |
| Module authoring | .agents/skills/module-authoring/SKILL.md | — |
| Docusaurus conventions | .agents/skills/docusaurus-conventions/SKILL.md | — |
| Evidence vetting | .agents/skills/evidence-vetting/SKILL.md | — |
| Safety classification | .agents/skills/safety-classification/SKILL.md | — |
| Developmental vocabulary | .agents/skills/developmental-vocabulary/SKILL.md | — |
| Fork readiness audit | .agents/skills/fork-readiness-audit/SKILL.md | — |

## Context Files to Read Before Writing Code
| Purpose | File |
|---|---|
| AQAL map | docs/maps/ |
| Quality gates | docs/quality/ |

## See Also
- docs/COPILOT_COST_GUIDE.md
- docs/MODEL_ROUTING_GUIDE.md
- .github/copilot-budget.md
