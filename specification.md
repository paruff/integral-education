# Specification: UX-12 — Prototype page is framed as a developer tool, not a learner experience

## Problem
The prototype page (`/prototype`) is titled 'Integral Learning Prototype' with a sub-headline describing 'pathway selection, safety-aware practice flow, retrieval loops, and rubric-based assessment' — a technical product description, not a learner invitation. Section headings use developer-facing language. The bottom of the page contains a list of implementation documentation links visible to all learners, breaking the learner context entirely.

## UX Rationale
A prototype page in the primary navigation of a learning platform will be used by learners, not just developers. Every learner who clicks it reads technical system language and is confused about whether this content is for them. The implementation documentation links at the bottom are a back-stage artefact showing through to the front of house — a classic UX leakage problem. Framing must match the audience that actually encounters the page.

## Requirements

### Functional
- Rewrite the page title to learner-facing language (e.g. 'Try a Learning Session' or 'Practice Path Demo')
- Rewrite the sub-headline to describe the learner experience
- Rename section headings to learner language: 'Choose Your Path', 'Begin Your Practice', 'How Review Works', 'How You Are Assessed'
- Move the Implementation Docs block to a collapsible details/summary element (hidden by default)
- Add a brief 'This is a demo — not a full session' callout at the top

### Non-Functional
- No new dependencies — use native HTML details/summary for collapsible
- Follow existing component patterns (same page structure)
- No regressions: build and link checks must pass

## Acceptance Criteria
1. Page title contains no 'Prototype' label in the learner-visible heading
2. Sub-headline describes the learner experience
3. All section headings use learner-facing language
4. Implementation Docs are not visible by default (collapsible)
5. A demo context callout is present at the top of the page
