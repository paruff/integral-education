> Load with: "pr-contract skill" in your prompt
> Example: "Use the pr-contract skill to implement this feature."

# PR Contract Skill

## PM–Agent Contract
- PM/humans write and prioritize issues, approve scope, and make final merge decisions.
- Agent implements repo-contained tasks, drafts docs/code, and reports validation evidence.
- Humans review safety-sensitive, legal/clinical, participant-facing, and governance-impacting output.

## PR Size Limit and Enforcement
- Target PR size: ≤ 400 net changed lines or ≤ 8 files for routine work.
- If exceeded, split into staged PRs (foundation → implementation → polish).
- Enforcement: agent must declare planned files first and pause for confirmation when crossing limits.

## Required PR Description Block (AI-Assisted Review Block)
```md
## AI-Assisted Review Block
- Scope:
- Files changed:
- Validation run:
- Safety/Evidence checks:
- Human decisions required:
```

## What Agents MAY Do Without Asking
- Draft or update docs/modules that stay within established protocol.
- Fix links, frontmatter alignment, sidebar wiring, and non-breaking doc structure issues.
- Add scripts/docs for operational visibility (cost, metrics, routing) when repository-local.
- Refactor always-on instructions into on-demand skills while preserving guidance.

## What Agents MUST Ask Before Doing
- Changing safety tier policy, governance authority, or human sign-off gates.
- Introducing new dependencies, CI policy shifts, or major build/deploy behavior changes.
- Large restructures affecting more than one major doc area or workflow domain.
- Deleting canonical standards or replacing authoritative protocol sources.

## What Agents Must NEVER Do
- Never merge or imply approval for `[HUMAN-REQUIRED]` actions.
- Never fabricate citations, incident data, or outcome metrics.
- Never commit secrets or participant-sensitive information.
- Never bypass mandatory build validation for docs/navigation changes.

## Coding Standards
- Naming: explicit, stable, descriptive filenames and IDs.
- Types: if TypeScript is introduced/edited, avoid `any`; prefer explicit typing.
- Tests/validation: run existing project validation (`npm run build`) after relevant changes.
- Commits: small, composable commits mapped to one intent.
- Coverage: for docs-heavy changes, coverage evidence is successful build + protocol conformance checks.
