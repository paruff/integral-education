# Specification — Shadow Work Self-Assessment Tool

**Issue:** #93 | **Date:** 2026-07-24 | **Component:** `ShadowAssessment.jsx`

## 1. Functional Requirements

### FR-01: Three-Section Assessment Structure
Component SHALL present three sections: A) Primary Shadow Pattern (10 scenario-based questions), B) Developmental Line Shadow Profile (8 questions), C) Spiritual Bypassing Tendencies (12 items). Sections are independently navigable on a single page.

### FR-02: Ethical Framing
SHALL display full-screen ethical framing before any questions: "Shadow work involves encountering disowned parts of yourself. This tool is a map for self-reflection, not a clinical assessment. If anything activated feels overwhelming, please stop and seek support." Learner must acknowledge to proceed.

### FR-03: Section A — Primary Shadow Pattern (10 questions)
Scenario-based questions identifying dominant shadow mechanisms: projection, introjection, repression, reaction formation, splitting. Each produces a descriptive profile, not a score.

### FR-04: Section B — Developmental Line Shadow Profile (8 questions)
Adapted from the Shadow-Developmental Lines Map, identifying which developmental lines carry the strongest shadow charge.

### FR-05: Section C — Spiritual Bypassing Tendencies (12 items)
Adapted from the Spiritual Bypassing module's inventory, identifying bypass patterns.

### FR-06: Results Page
Descriptive profile per section (3–5 sentences interpretation), integrated profile summary, top-3 module recommendations, Facilitated Support callout (triggers when trauma-adjacent indicators selected in 3+ questions).

### FR-07: No persistent storage. All state in React useState.

### FR-08: Export to Journal via Clipboard API.

### FR-09: Full accessibility — keyboard navigable, ARIA labels on all interactive elements.

### FR-10: Partial submission supported.

## 2. NFRs
| NFR | Constraint |
|-----|-----------|
| NFR-01 | Follow AmberRationalAssessment pattern (inline styles) |
| NFR-02 | Mobile-responsive |
| NFR-03 | Build must pass with zero errors |
| NFR-04 | Docusaurus Link for module recommendations |
