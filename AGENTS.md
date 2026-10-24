# TOKEN COST: This file loads on every AI coding assistant request (Claude Code, GitHub Copilot, Cursor, OpenCode, etc.).
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
| QuickStart validation | .agents/skills/quickstart-validator/SKILL.md |
| Accessibility checks | .agents/skills/accessibility-checker/SKILL.md |
| AQAL tagging | .agents/skills/aqal-tagger/SKILL.md |
| Pre-PR deploy validation | .agents/skills/deploy-validator/SKILL.md |

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

## Workflow
State lives only in Status on [Project #6](https://github.com/users/paruff/projects/6).
Labels never carry state: `agent:*` and `copilot-implementable` say who,
`human-required` says the task contains a human step.
- Gates: intent → spec → design → plan → PR → merge/release, plus human steps
  (`docs/product/review.md`: who decides, what approved means, decision log).
- Status: Backlog (dependencies open or not prioritised) · Ready for agent (only a human puts it
  here) · In progress (you claimed it) · Needs human review (set Gate to the
  decision) · Blocked (name the blocker: comment or `gh issue edit N --add-blocked-by M`) · Done (auto on close).
- Next for you (swap the label for your harness):
  `gh project item-list 6 --owner paruff --limit 100 --query 'status:"Ready for agent" is:open label:agent:claude-code' --format json --jq '[.items | sort_by(.content.number)[] | "#\(.content.number) \(.title)"] | .[0] // "nothing Ready for agent"'`
- Waiting on a human:
  `gh project item-list 6 --owner paruff --limit 100 --query 'status:"Needs human review"' --format json --jq '(.items[] | "\(.gate // "no gate")\t#\(.content.number)\t\(.title)") // "nothing waiting on a human"'`
- Move: `gh project item-edit 6 --owner paruff --url <issue-url> --field Status --value "In progress"`
  (`--field Gate --value PR` when you hand over).
- Loop: claim → branch from `main` → PR using the template (`Closes #N`) →
  Needs human review + Gate → a human merges. Merge a PR only when its base is `main`.
- Issues: title `P<n>-<nn> · <task>`, body per `.github/ISSUE_TEMPLATE/plan-task.md`.
  Plan rows link to their issue; a new row and its issue land in the same PR.
- Commits: `type: description (P-ID, #issue)`.

| Harness | Give it | Never give it |
|---|---|---|
| Copilot | Issues assigned to it (`gh issue edit N --add-assignee @copilot`), CI fixes, PR review. Doesn't read the board | Learning-science or safety judgment; deploy pipeline |
| OpenCode + MiMo (`agent:opencode-mimo`) | Bulk repetitive edits; must pass build, `npm test`, validators | Citations, evidence tiers, Tier 2/safety, CI/deploy |
| Nemotron (`agent:nemotron`) | Read-only audits and analysis prep | Code or workflow changes |
| Claude Code (`agent:claude-code`, model in issue) | Haiku: small chores · Sonnet: features, CI, content batches, skills · Opus: evidence judgments, study design | — |
| Human | Decisions, citation checks, item validation, audience readers, repo settings | — |

## Context Before Writing Code
- Architecture overview: ARCHITECTURE.md
- Product intent, spec, design, plan and gate log: docs/product/{intent,specification,design,plan,review}.md
- Feature-level discovery/spec/design/tasks: docs/features/<slug>/
- AQAL map: docs/maps/
- Quality gates: internal/quality/
- UI changes: read DESIGN.md first (tokens, components, do and don't)
- Reviewing a PR: apply REVIEW.md (what is Important, verification, validation, security)

## See Also
- docs/AI_COST_GUIDE.md
- docs/MODEL_ROUTING_GUIDE.md
