# Copilot Instructions for Integral Education Platform

This repository builds an evidence-based integral learning platform. Copilot should optimize for instructional rigor, safety, and implementation speed while respecting human-only boundaries.

## Product Constraints

- Use evidence-based instructional design over intuition.
- Prioritize adult learning assumptions (self-direction, relevance, problem-solving).
- Support networked learning and collaboration (connectivist flows).
- Enforce cognitive load management:
  - Microlearning first (3-5 minute concept units).
  - One concept per micro-lesson.
  - Avoid extraneous visuals and text.
  - Add retrieval interactions, not passive content only.
- Treat accessibility (WCAG 2.2) as a core quality requirement.

## Integral Scope Requirements

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

## Safety Requirements (Shadowwork and Reflective Practices)

For any shadow or emotionally intense content:
- Include clear consent language.
- Include contraindications and stop rules.
- Include grounding alternatives.
- Include escalation guidance.
- Default to low-intensity versions unless explicitly marked facilitator-led.

Copilot must not claim to provide therapy or clinical care.

## Evidence and Citation Rules

- Prefer primary or high-quality secondary sources.
- Avoid overclaiming causality from observational evidence.
- Flag hype terms: breakthrough, cure, revolutionary, guaranteed.
- Require citations for non-trivial claims.
- Mark uncertain claims with explicit evidence-quality language.

## Task Classification Rules

When creating or updating backlog tasks, always classify as one of:
- `[COPILOT]` implementation can be completed in repo.
- `[HUMAN-RECOMMENDED]` Copilot can draft, human should approve.
- `[HUMAN-REQUIRED]` legal, clinical, facilitation, participant operations, or ethics board action required.

## Code and Docs Implementation Style

- Keep changes small and composable.
- Prefer markdown docs for process artifacts.
- Keep naming explicit and predictable.
- Add acceptance criteria for every substantial task.
- For prototype UI, prefer clear interaction flow over visual complexity.

## Prototype Expectations

Prototype pages should demonstrate:
- Pathway selection by learner goal and readiness.
- Practice flow with safety checks.
- Rubric-based assessment preview.
- Retrieval schedule preview.

## Pilot Execution Boundaries

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
