# Integral Education Platform — Claude Code Instructions

Docusaurus v3 site at https://paruff.github.io/integral-education

## Protocol References (read before generating content)
- `docs/maps/aqal-label-crosswalk.md`
- `docs/quality/instructional-design-protocol.md`
- `docs/quality/evidence-vetting-checklist.md`
- `docs/quality/peer-review-sop.md`
- `docs/implementation/integral-aqal-protocol-template.md`

Always align output to these documents before proceeding.

## Stack
- Markdown/MDX (docs), JavaScript/JSX (Docusaurus UI), YAML (workflows)
- Docusaurus v3 structure: `docs/`, `src/`, `static/`, `sidebars.js`, `docusaurus.config.js`
- Node.js ≥ 18

## Required Sections for Every Learning Module (in order)
1. Overview
2. AQAL Mapping (quadrant, level, line, state, type)
3. Learn (microlearning ≤ 5 min per unit, one concept per unit)
4. Practice (at least one applied activity)
5. Reflect (journaling or dialogue prompt)
6. Assess (rubric-based task or quiz)
7. Integrate (transfer-to-context activity)
8. Retrieval Schedule (24h, 72h, 7d)
9. Evidence and Citations (claim, source, quality tier, caveat)
10. Safety Notes (required for Tier 2+ emotionally intensive content)

## AQAL Mapping Requirements
Every module must explicitly map:
- Quadrant(s): I, We, It, Its
- Level(s): developmental complexity markers
- Line(s): at least one explicit developmental line
- State(s): target state and prerequisites
- Type(s): style/personality adaptation note

## Safety Rules (non-negotiable)
- Never claim to provide therapy, diagnosis, or clinical care
- For shadow/somatic/emotionally intensive content:
  - Include explicit consent language before any activity
  - State contraindications and stop rules clearly
  - Provide at least one grounding alternative
  - Include escalation path to a qualified human
  - Default to Tier 1 (low intensity) unless issue explicitly marks Tier 2 or 3
- Tier 2+ content requires `[HUMAN-REQUIRED]` safety sign-off before publishing

## Task Classification — always tag output:
- `[COPILOT]` — fully implementable in repo
- `[HUMAN-RECOMMENDED]` — Claude drafts, human approves
- `[HUMAN-REQUIRED]` — legal, clinical, facilitation, or ethics board action needed

## Coding Conventions
- Small, composable changes over large refactors
- Explicit predictable naming for files, components, variables
- Functional React components with hooks
- No new npm dependencies without stated justification and security check
- No inline styles in JSX — use CSS modules or Docusaurus theme variables
- No commented-out code in committed files
- No hard-coded secrets or environment-specific URLs

## Documentation Standards
- Every doc file must start with YAML frontmatter: `id`, `title`, `sidebar_label`
- ATX headings only (`#`, `##`, `###`) — never skip levels
- Fenced code blocks with language identifiers
- Intra-repo links use relative paths
- External links must include `https://`

## Evidence and Citation Rules
- Prefer primary or high-quality secondary sources
- Never fabricate citations — leave a placeholder if unsure
- Flag hype terms: breakthrough, cure, revolutionary, guaranteed
- Mark uncertain claims with explicit evidence-quality language
- Avoid overclaiming causality from observational evidence

## Build Requirement
Always verify `npm run build` succeeds before marking any task complete.
Broken internal links = build failure.

## Handling Ambiguous Tasks
1. State the ambiguity explicitly at top of response
2. Make the most conservative safe assumption and note it
3. Propose 2-3 alternative interpretations
4. Produce output for most likely interpretation, label as draft
5. Tag `[HUMAN-RECOMMENDED]` if touching safety, ethics, clinical, or legal content

## Tone
- Clear, direct, adult-learner-respectful
- Active voice, second person ("you will") for learner-facing content
- No jargon without definition — define AQAL terms on first use per document
- No marketing filler: "amazing", "game-changing", "revolutionary"

## What Claude Must NOT Do
- Add a JS test suite unless the issue explicitly requests it
- Change `docusaurus.config.js` without asking first
- Suppress Dependabot alerts without human approval
- Use mutable GitHub Actions tags — pin to commit SHA

## Pilot Execution Boundaries
Claude can prepare: runbooks, scripts, templates, analytics schemas, revision reports
Humans must execute: recruitment, consent, live facilitation, safety escalation, sensitive outcome interpretation

## Definition of Done for every module
- [ ] File created at correct path
- [ ] Frontmatter id matches filename
- [ ] Added to sidebars.js under correct category
- [ ] Prerequisite files exist or are created in same commit
- [ ] `npm run build` passes with zero errors
- [ ] Commit message references the issue number
