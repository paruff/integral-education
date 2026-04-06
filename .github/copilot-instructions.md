# Copilot Instructions for Integral Education Platform

This repository builds an evidence-based integral learning platform. Copilot should optimize for instructional rigor, safety, and implementation speed while respecting human-only boundaries.

Canonical protocol reference:
- `docs/maps/aqal-label-crosswalk.md`
- `docs/quality/instructional-design-protocol.md`
- `docs/quality/evidence-vetting-checklist.md`
- `docs/quality/peer-review-sop.md`
- `docs/implementation/integral-aqal-protocol-template.md`

When generating or editing learning content, Copilot must align output to these protocol documents before proposing completion.

---

## 1. Coding Conventions

### Language and Stack
- Primary languages: **Markdown** (docs), **JavaScript/JSX** (Docusaurus UI), **YAML** (workflows and config).
- Follow the existing Docusaurus v3 project structure: `docs/`, `src/`, `static/`, `sidebars.js`, `docusaurus.config.js`.
- Use Node.js ≥ 18 as the runtime baseline.

### Patterns to Prefer
- Small, composable changes over large refactors.
- Explicit, predictable naming for files, components, and variables.
- Functional React components with hooks over class components.
- Relative imports within the same package; use package-level imports for shared utilities.
- YAML anchors (`&`/`*`) to reduce repetition in workflow files.

### Patterns to Avoid
- Do not introduce new npm dependencies without a stated justification and security check.
- Avoid inline styles in JSX; prefer CSS modules or Docusaurus theme variables.
- Do not use `any` type in TypeScript; if types must be added, be explicit.
- Do not leave commented-out code blocks in committed files.
- Avoid hard-coded secrets, credentials, or environment-specific URLs in source files.

---

## 2. Documentation Standards

### Formatting
- All documentation lives under `docs/` and is written in Markdown (`.md`) or MDX (`.mdx`).
- Every doc file must start with a YAML front matter block containing at least `id`, `title`, and `sidebar_label`.
- Use ATX-style headings (`#`, `##`, `###`) and never skip heading levels.
- Use fenced code blocks with language identifiers (e.g., ` ```yaml `).
- Intra-repo links use relative paths (e.g., `../modules/m1-orientation.md`).
- External links must include the `https://` scheme.

### Required Sections for Learning Content
Every learning content document must include, in order:
1. **Overview** — what the learner will achieve and why it matters.
2. **AQAL Mapping** — quadrant, level, line, state, and type coverage.
3. **Learn** — core concept delivery (microlearning, ≤ 5 min per unit).
4. **Practice** — at least one applied activity.
5. **Reflect** — a journaling or dialogue prompt.
6. **Assess** — a rubric-based task or quiz.
7. **Integrate** — transfer-to-context activity.
8. **Retrieval Schedule** — spaced repetition plan (24 h, 72 h, 7 d).
9. **Evidence and Citations** — table with claim, source, quality tier, and caveat.
10. **Safety Notes** — required when content is emotionally intensive (Tier 2+).

### Tone
- Clear, direct, adult-learner-respectful.
- Avoid jargon without definition; define AQAL terms on first use per document.
- Do not use marketing or motivational filler ("amazing", "game-changing").
- Prefer active voice. Use second person ("you will") for learner-facing content.

---

## 3. Test Expectations

### Docusaurus Build
- Always verify that `npm run build` succeeds with no errors before marking a doc task complete.
- Broken internal links must be treated as build failures.

### Content Quality Checks
- Every new doc page must pass the acceptance checklist in `docs/quality/instructional-design-protocol.md`.
- Evidence tables must reference real, verifiable sources; placeholder citations are not acceptable.
- Safety-tier classification must be explicitly set for every module (Tier 1, 2, or 3).

### Workflow/CI Checks
- All GitHub Actions workflow files must pass YAML lint before merge.
- Security workflow (`security.yml`) must run and pass on every push to `main`.

### Coverage Guidance
- There is no automated JavaScript unit-test suite at this time. Do not add one unless the issue explicitly requests it.
- When a testing framework is introduced, follow the existing project style and document the `npm run test` command in `README.md`.

---

## 4. Security and Safety Constraints

### Repository Security
- Never commit secrets, API keys, tokens, or passwords to any file in this repository.
- Use GitHub Actions secrets for all sensitive configuration values.
- Dependabot is enabled; do not suppress dependency alerts without human approval.
- All third-party GitHub Actions must be pinned to a specific commit SHA, not a mutable tag.

### Content Safety
- Copilot must not generate content that claims to provide therapy, diagnosis, or clinical care.
- For any shadow work or emotionally intensive content:
  - Include explicit consent language before the activity.
  - State contraindications and stop rules clearly.
  - Provide at least one grounding alternative.
  - Include an escalation path to a qualified human.
  - Default to Tier 1 (low intensity) unless the issue explicitly marks it Tier 2 or Tier 3 (facilitator-led).
- Safety reviews (`[HUMAN-REQUIRED]`) must be completed before publishing Tier 2 or Tier 3 content.

---

## 5. Handling Ambiguous Tasks

When a task or prompt is unclear, Copilot must:

1. **State the ambiguity explicitly** at the top of the response before proceeding.
2. **Make the most conservative safe assumption** and note what was assumed.
3. **Propose two or three alternative interpretations** with a brief rationale for each.
4. **Produce output for the most likely interpretation** and label it as a draft for human review.
5. **Tag the output** `[HUMAN-RECOMMENDED]` if the task touches safety, ethics, clinical content, or legal matters.
6. **Never fabricate citations**, data, or safety evidence to fill gaps.

If a task falls outside the `[COPILOT]` boundary (e.g., requires live facilitation, participant recruitment, or ethics board review), state this clearly and produce only the supporting artifacts (runbook, template, script) within scope.

---

## 6. Good vs. Bad Prompt Examples

### Feature / Code Prompts

| ❌ Bad Prompt | ✅ Good Prompt |
|---|---|
| "Add some tests." | "Add a Docusaurus build smoke-test to `.github/workflows/ci-quality.yml` that runs `npm run build` on every PR targeting `main`." |
| "Fix the bug." | "The sidebar entry for `docs/modules/m1-orientation.md` is missing from `sidebars.js`. Add it under the `Modules` category." |
| "Make the site better." | "Update `docusaurus.config.js` to set `onBrokenLinks: 'throw'` so broken internal links fail the build." |

### Content / Learning Design Prompts

| ❌ Bad Prompt | ✅ Good Prompt |
|---|---|
| "Write a lesson on shadow work." | "Draft a Tier 1 (self-paced, no facilitator) micro-lesson on recognizing projection, following the AQAL protocol template. Map to Quadrant I, Orange-to-Green level, Emotional line. Include consent language, a grounding alternative, and the retrieval schedule." |
| "Create a quiz." | "Generate a 5-question multiple-choice retrieval quiz for `docs/modules/m2-shadow.md`, covering the main concepts from the Learn and Practice sections. Each question must map to a specific learning objective." |
| "Add an assessment." | "Create a performance-based assessment rubric for the 'Recognizing Blind Spots' module with three dimensions (self-awareness, evidence quality, integration depth), a 4-point scale per dimension, and a passing threshold of 10/12." |

### Issue / Backlog Prompts

| ❌ Bad Prompt | ✅ Good Prompt |
|---|---|
| "Make an issue for the new feature." | "Create a GitHub issue using the Feature Request template for adding learner pathway selection to the prototype homepage. Tag it `[COPILOT]`, milestone M2, with acceptance criteria tied to the prototype page requirements." |
| "We need a safety check." | "Open a Safety Review issue for the `m3-shadow-intensive` module. Classify as `[HUMAN-REQUIRED]`. Include the contraindications list, stop rules, and escalation path as supporting artifacts." |

---

## 7. Product Constraints

- Use evidence-based instructional design over intuition.
- Prioritize adult learning assumptions (self-direction, relevance, problem-solving).
- Support networked learning and collaboration (connectivist flows).
- Enforce cognitive load management:
  - Microlearning first (3-5 minute concept units).
  - One concept per micro-lesson.
  - Avoid extraneous visuals and text.
  - Add retrieval interactions, not passive content only.
- Treat accessibility (WCAG 2.2) as a core quality requirement.

---

## 8. Integral Scope Requirements

All new learning content must explicitly map to:
- Quadrant(s): I, We, It, Its
- Level(s): developmental complexity markers
- Line(s): at least one explicit developmental line
- State(s): target state support and prerequisites
- Type(s): style/personality adaptation note

All modules should include:
- Learn
- Practice
- Reflect
- Assess
- Integrate
- Retrieval loop (spaced and interleaved)

---

## 9. Safety Requirements (Shadowwork and Reflective Practices)

For any shadow or emotionally intense content:
- Include clear consent language.
- Include contraindications and stop rules.
- Include grounding alternatives.
- Include escalation guidance.
- Default to low-intensity versions unless explicitly marked facilitator-led.

Copilot must not claim to provide therapy or clinical care.

---

## 10. Evidence and Citation Rules

- Prefer primary or high-quality secondary sources.
- Avoid overclaiming causality from observational evidence.
- Flag hype terms: breakthrough, cure, revolutionary, guaranteed.
- Require citations for non-trivial claims.
- Mark uncertain claims with explicit evidence-quality language.

---

## 11. Task Classification Rules

When creating or updating backlog tasks, always classify as one of:
- `[COPILOT]` implementation can be completed in repo.
- `[HUMAN-RECOMMENDED]` Copilot can draft, human should approve.
- `[HUMAN-REQUIRED]` legal, clinical, facilitation, participant operations, or ethics board action required.

---

## 12. Code and Docs Implementation Style

- Keep changes small and composable.
- Prefer markdown docs for process artifacts.
- Keep naming explicit and predictable.
- Add acceptance criteria for every substantial task.
- For prototype UI, prefer clear interaction flow over visual complexity.

---

## 13. Prototype Expectations

Prototype pages should demonstrate:
- Pathway selection by learner goal and readiness.
- Practice flow with safety checks.
- Rubric-based assessment preview.
- Retrieval schedule preview.

---

## 14. Pilot Execution Boundaries

Copilot can prepare:
- Runbooks
- Scripts
- Templates
- Analytics schemas
- Revision reports

Humans must execute:
- Recruitment and consent
- Live facilitation
- Safety escalation
- Final interpretation of sensitive outcomes
