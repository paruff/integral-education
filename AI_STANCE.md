# AI Stance — Integral Education Platform

> **Last reviewed:** 2026-07-25
> **Next review due:** 2026-10-25 (quarterly)
> **Owner:** @paruff
> **Suite:** uFawkesAI

## Expectation of Use

AI-assisted development is **expected and encouraged** in this repository. We use AI to clear bottlenecks in the content lifecycle — authoring modules, enforcing quality gates, auditing consistency — not to replace human judgment on safety, evidence integrity, or developmental nuance. Every commit is human-reviewed before merge.

## Organizational Support

- **Permitted tools:** listed in the table below
- **Skill suite:** `.agents/skills/` — load relevant skills before each agent session
- **Agent workflows:** Feature flow, repair flow, discovery flow per `.opencode/` configuration
- **Questions or policy concerns:** file a GitHub issue with label `ai-policy`
- **Policy reviews:** quarterly (see `ai-policy-lifecycle` skill)

## Permitted Tools

| Tool | Model / version | Scope |
|------|----------------|-------|
| opencode | deepseek-v4-flash-free (current) | Agentic development sessions — all repos |
| Claude | claude-sonnet-4-6 | Skill authoring, code review, complex reasoning |
| GitHub Copilot | Current | IDE code completion only |

## Three-Bucket Classification

### Prohibited

- Sending PII, secrets, or proprietary infrastructure configs to public AI models
- Committing AI-generated code without running pre-commit hooks (npm run build, CI workflows)
- Bypassing branch protection rules because "the AI said it was fine"
- Using AI to generate safety classification or clinical content without human expert review
- AI-generated learner-facing safety notes without human verification of Tier accuracy
- Fabricated citations or evidence — any AI-generated citation must be verified against the source

### Permitted with Guardrails

| Use | Guardrail |
|-----|-----------|
| AI-generated module content merged to main | Human review required; at least one build pass; safety tier verified by human |
| AI-assisted specification and design documents | Discovery brief must exist first (discover or spec agent ran) |
| AI-generated release notes and changelogs | Human review before publishing |
| Agent sessions modifying Docusaurus config | Build must pass before commit; verify no broken links introduced |
| AI-generated test stubs | Human completes and verifies test logic |
| AI-assisted evidence vetting and citation format | Human verifies each citation against original source |
| opencode sessions in this repo | Session must load AGENTS.md and relevant skills first |

### Allowed

- AI-assisted code completion (Copilot, Claude Code, opencode) for any file not in Prohibited list
- AI-generated first drafts of blog posts, dev.to articles, LinkedIn posts
- AI-assisted issue triage and labeling
- Asking AI tools to explain existing code or documentation
- AI-generated accessibility audits (aXe, Lighthouse) — results verified by human before acting

## Role Applicability

This stance applies to: **human contributors AND AI agents** (opencode sessions, GitHub Actions workflows, any automated agent invocation). Agents must load the `ai-stance` skill and verify this document exists before beginning substantive work.

When acting as an agent in this repo: always load the relevant skill for your task (e.g. `module-authoring` for module content, `docusaurus-conventions` for Docusaurus config, `safety-classification` for tier assessment) before writing any output.
