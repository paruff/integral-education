# Specification: EI-15 — Add Emotional & Interpersonal line rows to Shadow–Developmental Lines Map

> **Issue #237** | **Labels: maps, emotional-line, interpersonal-line, shadow, copilot-implementable, human-recommended**
> **Priority: P1** | **Effort: M**

## Problem

The Shadow–Developmental Lines Map had Emotional and Interpersonal line rows in the main matrix that were cross-stage summaries without explicit stage-by-stage shadow characterisation. The Emotional Line Stage Map and Interpersonal Line Stage Map existed as separate reference documents but were not cross-referenced from the shadow map. Learners using the shadow map as a diagnostic compass could not see how emotional and interpersonal shadow manifest differently at each developmental stage, and had no navigation link to the dedicated stage maps.

## Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-01 | Enhance Emotional line row in main matrix with stage-specific shadow descriptions (Amber, Orange, Green, Teal) | must-have |
| REQ-02 | Enhance Interpersonal line row in main matrix with stage-specific shadow descriptions (Amber, Orange, Green, Teal) | must-have |
| REQ-03 | Add cross-reference links to Emotional Line Stage Map and Interpersonal Line Stage Map | must-have |
| REQ-04 | Update recommended practice links to reference current Emotional and Interpersonal line modules | must-have |
| REQ-05 | Add EI-13 (Emotional–Interpersonal Integration) to line-specific module references | must-have |
| REQ-06 | `npm run build` passes with no broken links | must-have |

## Acceptance Criteria

1. Emotional row includes stage-specific shadow for Amber, Orange, Green, Teal
2. Interpersonal row includes stage-specific shadow for Amber, Orange, Green, Teal
3. Cross-references to Emotional Line Stage Map and Interpersonal Line Stage Map present in Complementary Reference Maps
4. Emotional module references updated to current suite (Emotion Regulation Foundations, Affect Labelling, etc.)
5. Interpersonal module references updated to current suite (EI-09 through EI-11)
6. EI-13 module listed as cross-line integration reference
7. `npm run build` exits zero, no new broken links

## Constraints

- File: `docs/maps/shadow-developmental-lines-map.mdx` only
- MDX format with JSX imports — preserve existing structure
- Stage-specific content must align with Emotional Line Stage Map and Interpersonal Line Stage Map characterisations
- No changes to other lines' rows, Teal table, Lines Asynchrony, or Evidence sections