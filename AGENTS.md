# TOKEN COST: This file loads on every Copilot/Claude Code/Cursor request.
# Every line is billed on every interaction. Keep it lean.
# Full details live in .github/skills/ — load them on demand only.

## AI Policy
- Use Copilot to draft code/docs quickly, but keep humans accountable for final decisions.
- Never include secrets, tokens, participant identifiers, or private operational data in prompts or commits.
- Treat safety-sensitive learning content as human-governed; AI can draft, humans approve.
- Require human review before merge for safety, governance, and policy-impacting changes.
- Verify citations and claims; if uncertain, mark uncertainty explicitly.
- Prefer smallest possible change set that meets acceptance criteria.

## Project Identity
- Product: Integral Education Platform (AQAL-aligned learning docs + Docusaurus site).
- Stack: Docusaurus v3, Markdown/MDX docs, React JSX, GitHub Actions.
- Constraint: instructional rigor, safety protocol compliance, and build-pass documentation updates.

## Never Do (Project-Specific)
1. Never publish Tier 2/3 shadowwork content without explicit human safety sign-off.
2. Never present AI output as therapy, diagnosis, or clinical guidance.
3. Never merge docs that violate required module flow (Overview→AQAL→Learn→Practice→Reflect→Assess→Integrate→Retrieval→Evidence; Safety when needed).
4. Never bypass evidence standards by inventing or unverifiable citations.
5. Never ship doc/navigation changes without a successful `npm run build` from repo root.

## Token Budget Protocol (Agent Mode)
Before starting Agent Mode, include: files to read, files to change, and a 2-sentence plan.
If scope grows beyond ~5 files or one subsystem, stop and propose phased execution.
Keep always-on instructions lean; load details from `.github/skills/*/SKILL.md` on demand.

## On-Demand Skills
| Skill | Path | When to load |
|---|---|---|
| Architecture | `.github/skills/architecture/SKILL.md` | Structure rules, dependency boundaries, PR architecture checks |
| PR Contract | `.github/skills/pr-contract/SKILL.md` | PM-agent boundaries, PR size, coding/testing contract |
| Metrics | `.github/skills/metrics/SKILL.md` | DORA tracking, thresholds, rework, AI credit burn ritual |
| Model Routing | `.github/skills/model-routing/SKILL.md` | Ask/Edit/Agent mode and model-cost routing decisions |

## Context Files to Read Before Writing Code
| Purpose | File |
|---|---|
| Protocol map | `docs/maps/aqal-label-crosswalk.md` |
| Instructional quality gate | `docs/quality/instructional-design-protocol.md` |
| Evidence rules | `docs/quality/evidence-vetting-checklist.md` |
| Peer review process | `docs/quality/peer-review-sop.md` |
| Template baseline | `docs/implementation/integral-aqal-protocol-template.md` |

## See Also
- Cost guide: `docs/COPILOT_COST_GUIDE.md`
- Model routing guide: `docs/MODEL_ROUTING_GUIDE.md`
- Team golden path: `.github/copilot-budget.md`
