# Specification: UX-13 — Prototype form controls are inaccessible

## Problem
The prototype form controls have multiple accessibility failures:
- Pathway and Readiness selects have no associated label elements
- Safety consent checkbox label association is unclear
- Rubric sliders have no aria-label or aria-valuetext
- On mobile, select elements and sliders have touch targets smaller than 44px (WCAG 2.5.5)
- Safety gate status message is not announced to screen readers as a live region

## UX Rationale
Form accessibility failures are the most common WCAG violations on the web and the most impactful for users with disabilities. The prototype is the only interactive component on this site — getting its accessibility right is the most concentrated accessibility investment available. The aria-live region for safety gate status is particularly important: a user relying on a screen reader who clicks the consent checkbox must hear whether the gate has cleared.

## Requirements

### Functional
- Add explicit label elements for Pathway and Readiness selects, with matching id attributes on the selects
- Add aria-label to the safety consent checkbox: "I have read the consent language and stop rules"
- Add aria-label to each rubric slider: "AQAL completeness rating 1-5", "Evidence quality rating 1-5", "Transfer feasibility rating 1-5"
- Add aria-valuetext to each rubric slider showing value out of 5
- Wrap the safety gate status message in a div with aria-live="polite" and aria-atomic="true"
- Ensure all interactive elements meet 44px minimum height on mobile: add min-height: 44px to select and range inputs in custom CSS
- Verify focus order follows visual reading order: Pathway, Readiness, Consent, Rubric sliders

### Non-Functional
- No new dependencies
- Follow existing component patterns
- No regressions: build must pass

## Acceptance Criteria
1. All form inputs have associated label elements or aria-label attributes
2. Safety gate status is wrapped in an aria-live region
3. Rubric sliders have aria-label and aria-valuetext
4. All interactive elements are at least 44px tall on mobile
5. Focus order follows visual reading order
6. axe-core reports zero form-label violations on the prototype page