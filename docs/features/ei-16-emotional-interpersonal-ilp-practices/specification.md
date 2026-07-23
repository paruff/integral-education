# Specification: EI-16 — Add Emotional & Interpersonal practices to ILP Practice Taxonomy

> **Issue #238** | **Labels: maps, emotional-line, interpersonal-line, ilp, copilot-implementable, human-recommended**
> **Priority: P1** | **Effort: M**

## Problem

The ILP Practice Taxonomy (`docs/maps/ilp-practice-taxonomy.md`) defines the platform's canonical library of Integral Life Practice modalities across seven practice families. The Emotional and Interpersonal developmental lines are referenced in the AQAL Competency Map, the Emotional Line Stage Map, and the Interpersonal Line Stage Map, and have dedicated module suites (EI-01 through EI-13 and EI-08 through EI-11 respectively). However, the ILP Practice Taxonomy has no dedicated practice entries for these two lines. Learners following an ILP-based development plan have structured guidance on Body, Somatic, Mind, Spirit/Meaning, Shadow, Ethics, Relationships, and Service practices — but no guidance on which specific practices develop Emotional or Interpersonal line competencies.

## Requirements

### Functional

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-01 | Add Emotional line practice entries to the ILP Practice Taxonomy with all required fields per the Practice Card Template (Section 6) | must-have |
| REQ-02 | Add Interpersonal line practice entries to the ILP Practice Taxonomy with all required fields per the Practice Card Template (Section 6) | must-have |
| REQ-03 | Emotional line entries must include: Emotion wheel journaling, ABC chain analysis, Reappraisal micro-practice, Somatic emotion tracking, Affect labelling in conversation | must-have |
| REQ-04 | Interpersonal line entries must include: Perspective accuracy verification, PACE attunement listening, Four Horsemen self-audit, NVC repair attempt drafting, Cross-difference dialogue | must-have |
| REQ-05 | Each practice entry must include: practice ID, family, AQAL tags, duration, intensity, tier, instructions, reflection prompt, evidence capture, safety notes, fallback practice, escalation trigger | must-have |
| REQ-06 | All Tier 2 practices must have explicit contraindications and safety notes referencing the Emotional & Interpersonal Safety Addendum | must-have |
| REQ-07 | Evidence references must link to module Evidence tables or recognized external sources | must-have |
| REQ-08 | New practices must be integrated into the Example Taxonomy Entries table (Section 7) | should-have |
| REQ-09 | If creating new families (Emotional, Interpersonal), add them to the Practice Families Overview table (Section 1) and create progression ladders + fallbacks (Section 3) | must-have |
| REQ-10 | Ensure `npm run build` passes with no errors | must-have |

### Non-Functional

- No changes to existing practice families or taxonomy dimensions
- No changes to module content
- No changes to sidebar configuration or navigation
- No changes to Docusaurus configuration
- No React component changes required

## Acceptance Criteria

1. Two new practice families defined: Emotional line and Interpersonal line
2. Practice Families Overview table (Section 1) updated with Emotional and Interpersonal rows
3. Taxonomy dimensions tables (Section 2) added for Emotional (2.8) and Interpersonal (2.9) families
4. Five Emotional line practice entries added with all required fields
5. Five Interpersonal line practice entries added with all required fields
6. Progression ladders (Section 3) added for Emotional (3.8) and Interpersonal (3.9) families
7. Example Taxonomy Entries table (Section 7) updated with 10 new rows
8. All Tier 2 practices have contraindications, safety notes, and escalation triggers
9. Evidence references link to module Evidence tables (EI-01, EI-02, EI-05, EI-06, EI-08, EI-09, EI-10, EI-11) or recognized external sources
10. SME review sign-off documented in the Launch Readiness Checklist (Section 10)
11. `npm run build` exits zero with no errors

## Constraints

- File modified: `docs/maps/ilp-practice-taxonomy.md` only
- Markdown format — no MDX imports or JSX components
- Follow existing taxonomy conventions for naming, table formatting, and practice ID scheme
- Safety tier assignments must align with the Emotional & Interpersonal Safety Addendum (`internal/safety/emotional-interpersonal-safety-addendum.md`)
- Evidence references must use the platform's tier A/B/C evidence classification from the Evidence Vetting skill
- Copilot-implementable: AI can complete all content authoring; safety tier review requires human SME sign-off

## Dependencies

- Emotional Line Stage Map (`docs/maps/emotional-line-stage-map.md`) — provides stage context for competency levels
- Interpersonal Line Stage Map (`docs/maps/interpersonal-line-stage-map.md`) — provides stage context for competency levels
- AQAL Competency Map (`docs/maps/aqal-competency-map.md`) — provides L1–L4 progression indicators
- Emotional & Interpersonal Safety Addendum (`internal/safety/emotional-interpersonal-safety-addendum.md`) — provides Tier 2 triggers and grounding protocol
- Shadowwork Safety Standard (`internal/safety/shadowwork-safety-standard.md`) — provides Tier model reference

## Out of Scope

- Creating new Emotional or Interpersonal line modules
- Modifying existing module content
- Creating MDX components for new practice types
- Adding practices to any existing family (Body, Somatic, Mind, Spirit/Meaning, Shadow, Ethics, Relationships, Service)