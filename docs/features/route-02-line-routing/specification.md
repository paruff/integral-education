# Specification: ROUTE-02 — Extend Find Your Path to route by line, not just by stage
> **Issue #396** | Depends on: ROUTE-01 (LSC-03)

## Problem

The four QuickStarts on the homepage span two axes:
- **Stage-based:** Personal→Integral, Amber→Rational
- **Line-based:** Interpersonal Line Development, Emotional Line Development

The current Find Your Path assessment (`src/pages/start.js`) routes only along the stage axis. A learner whose actual need is line-specific has no assessment pointing them there.

## Design Decision

**Single combined instrument** — extend the existing Find Your Path with a second phase of line-diagnostic questions, rather than create a separate instrument.

**Rationale:**
- The learner is already engaged in the assessment flow; a split creates friction
- The homepage has one "Find Your Path" CTA — two instruments requires two entry points
- Stage and line results can be clearly distinguished in a single results view
- The single-instrument approach follows the existing LSC-03/ROUTE-01 patterns, minimizing structural change

## Requirements

### Functional
1. Retain all existing stage questions (QUESTIONS array, tally(), RESULTS mapping) — no regression on ROUTE-01
2. Add 3 line-diagnostic questions (LINE_QUESTIONS) that route to a line-specific QuickStart
3. Line questions must be non-labeling, non-AQAL — use everyday language about observable behaviors
4. Assessment flow: Phase 1 (4 stage questions) → submit → Phase 2 (3 line questions) → submit → combined results view
5. Results present both a stage path recommendation AND a line path recommendation, clearly distinguished
6. Each result includes: (a) path title, (b) 2–3 sentence mirror paragraph reflecting answers, (c) direct CTA button
7. All-paths grid includes line QuickStarts (Emotional, Interpersonal) alongside existing paths
8. Mirror paragraphs follow developmental-vocabulary skill guidelines

### Non-Functional
9. Follow existing `src/pages/start.js` patterns — no structural rewrite
10. Use Infima theme variables for styling (no hardcoded colors beyond existing)
11. Keyboard accessible
12. `npm run build` must pass
13. No new dependencies
14. No changes to sidebar, navbar, or other pages

## Acceptance Criteria

| ID | Criterion | Test Type |
|----|-----------|-----------|
| AC-01 | Existing 4 stage questions, tally(), and 4 RESULTS states unchanged and verified correct | unit |
| AC-02 | 3 new line-diagnostic questions added with language reviewed for developmental accuracy | unit |
| AC-03 | Line question options map to distinct line recommendations (emotional, interpersonal, self) | unit |
| AC-04 | Line tally function uses 2-of-3 threshold for classification, 'mixed' fallback | unit |
| AC-05 | Results view renders both stage recommendation (from Phase 1) and line recommendation (from Phase 2) in clearly labeled sections | integration |
| AC-06 | Stage and line recommendations use distinct visual sections distinguished by headers ("Your Stage Path Recommendation" / "Your Line Path Recommendation") | integration |
| AC-07 | All-paths grid displays 6 paths including Emotional Line and Interpersonal Line QuickStarts | integration |
| AC-08 | Recommended badge appears on both the stage-recommended path and the line-recommended path in the grid | integration |
| AC-09 | Mirror paragraphs use non-labeling, non-pathologizing language | unit |
| AC-10 | `npm run build` passes with zero errors | build |

## Scope
- **Modified:** `src/pages/start.js` — add LINE_QUESTIONS, LINE_RESULTS, tallyLine(), Phase 2 UI, combined results rendering, expanded ALL_PATHS
- **Modified:** `src/pages/start.module.css` — minimal CSS for line results section and phase transition
- **NOT modified:** tally() logic for stage, existing QUESTIONS, existing RESULTS, sidebar, navbar, other pages
