# Test Report — EI-90 Moral Line Developmental Profile Assessment

**Session:** ei90-20260724-0001
**Date:** 2026-07-24

## Test Summary

| Test Type | Total | Passed | Failed |
|-----------|-------|--------|--------|
| recon (inspection) | 25 | 25 | 0 |
| live-system | 1 | 1 | 0 |
| **Total** | **26** | **26** | **0** |

## Acceptance Criteria Results

### ei90-t01: DIT Dilemma Content

| ID | Criterion | Test Type | Result |
|----|-----------|-----------|--------|
| ac-t01-01 | 3 dilemmas defined in SECTION_A_DILEMMAS: Heinz, Whistleblower, Triage | recon | ✅ PASS |
| ac-t01-02 | Each dilemma has 8 considerations tagged PI, MN, or PC | recon | ✅ PASS |
| ac-t01-03 | Schema tags hidden from learner display | recon | ✅ PASS — tags in data structures, never in render output |

### ei90-t02: Care-Track Content

| ID | Criterion | Test Type | Result |
|----|-----------|-----------|--------|
| ac-t02-01 | 2 care-track dilemmas defined | recon | ✅ PASS — Family Obligation vs. Self-Care, Community Responsibility |
| ac-t02-02 | Each has 6 care-oriented considerations (relational, contextual) | recon | ✅ PASS |

### ei90-t03: Courage Gap Questions

| ID | Criterion | Test Type | Result |
|----|-----------|-----------|--------|
| ac-t03-01 | 5 Likert-scale questions defined | recon | ✅ PASS |
| ac-t03-02 | Questions map to Narvaez/Rest action gap construct | recon | ✅ PASS — gap between moral conviction and moral action |

### ei90-t04: Component Implementation

| ID | Criterion | Test Type | Result |
|----|-----------|-----------|--------|
| ac-t04-01 | Three sections rendered: A (dilemmas), B (care), C (courage gap) | recon | ✅ PASS |
| ac-t04-02 | Schema scoring: PI/MN/PC proportions computed per dilemma and aggregated | recon | ✅ PASS — `computeSchemaProfile()` |
| ac-t04-03 | Care track score computed | recon | ✅ PASS — `computeCareScore()` |
| ac-t04-04 | Moral courage gap interpretation bands displayed | recon | ✅ PASS — low/moderate/significant bands |
| ac-t04-05 | Results page with schema bar chart, care score, modules, disclaimer | recon | ✅ PASS |
| ac-t04-06 | Export to Journal via Clipboard API | recon | ✅ PASS — `handleExport` with fallback |
| ac-t04-07 | Partial submission supported (profile from available data) | recon | ✅ PASS — `handleSubmit` fires regardless of completion |
| ac-t04-08 | No persistent storage — all state in React useState | recon | ✅ PASS — all state via `useState` |
| ac-t04-09 | Dual-track framing displayed at assessment opening | recon | ✅ PASS — `.framingMessage` div rendered first |
| ac-t04-10 | DIT methodology disclaimer displayed on results page | recon | ✅ PASS — in results view disclaimer section |
| ac-t04-11 | Reset button clears all state and returns to assessment form | recon | ✅ PASS — `handleReset` clears all 4 state objects |

### ei90-t05: CSS Module

| ID | Criterion | Test Type | Result |
|----|-----------|-----------|--------|
| ac-t05-01 | CSS Module with Docusaurus theme variables | recon | ✅ PASS — `--ifm-color-*` variables throughout |
| ac-t05-02 | Responsive breakpoint at max-width: 600px | recon | ✅ PASS — `@media screen and (max-width: 600px)` |
| ac-t05-03 | Inputs, buttons, radio styling follow CognitiveLineAssessment pattern | recon | ✅ PASS — matching class names and layout |

### ei90-t06: MDX Wrapper

| ID | Criterion | Test Type | Result |
|----|-----------|-----------|--------|
| ac-t06-01 | Frontmatter with id, title, sidebar_label, description | recon | ✅ PASS |
| ac-t06-02 | Imports MoralLineAssessment via @site alias | recon | ✅ PASS |
| ac-t06-03 | No # H1 heading in body (title renders as H1) | recon | ✅ PASS — uses ## H2 |

### ei90-t07: Sidebar Entry

| ID | Criterion | Test Type | Result |
|----|-----------|-----------|--------|
| ac-t07-01 | maps/moral-line-developmental-profile added to Maps items | recon | ✅ PASS |

### ei90-t08: Build Validation

| ID | Criterion | Test Type | Result |
|----|-----------|-----------|--------|
| ac-t08-01 | npm run build passes with zero errors | live-system | ✅ PASS |
| ac-t08-02 | PR opened against main with all files included | recon | ✅ PASS (Phase 5) |

## Live-System Verification

**Criterion ac-t08-01:** `npm run build`
- Command: `npm run build`
- Result: `[SUCCESS] Generated static files in "build".`
- Server compiled successfully in 7.88s
- Client compiled successfully in 20.58s
- Zero build errors
- Warning output: pre-existing broken anchors in unrelated modules (integral-shadow-teal-trap, moral-line-shadow-moral-injury, shadow-* modules, spiritual-line-shadow-integration) — none caused by this change

## Result

**PASS** — All 26 acceptance criteria verified.
