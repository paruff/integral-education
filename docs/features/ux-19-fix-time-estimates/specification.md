# Specification: UX-19 — Fix contradictory time estimates between homepage and QuickStart pages

> **Issue #418** | Labels: P2-ux, agent:content

## Problem

The homepage QuickStart cards display "Estimated time:" values that do not match the linked QuickStart pages' actual stated time commitments.

| Card | Homepage estimate | QuickStart actual | Discrepancy |
|------|------------------|-------------------|-------------|
| Personal → Integral | 20 min | 3–6 weeks (20–30 min/day) | Describes read time, not total |
| Amber → Rational | 20 min | Core path: 10–20 weeks | Describes read time, not total |
| Interpersonal Line | 25–40 min per module | 4–6 weeks (25–40 min/module, ~2.5 h total) | Missing weeks duration |
| Emotional Line | 20–40 min per module | 3–5 weeks (20–40 min/module, ~2.75 h total) | Missing weeks duration |

A learner choosing a path based on the homepage "20 min" estimate for Amber → Rational will have a materially different expectation than the path actually delivers.

## Requirements

### Functional
1. Audit every QuickStart card on the homepage against its linked QuickStart page's stated time commitment
2. Correct the homepage estimates to match the QuickStart page's actual time commitment, or explicitly distinguish "time to preview" from "time to complete"
3. All 4 QuickStart cards must be consistent with their linked pages

### Non-Functional
4. Keep card text concise — homepage cards have limited space
5. `npm run build` must pass

## Acceptance Criteria

| ID | Criterion | Test Type |
|----|-----------|-----------|
| AC-01 | Personal → Integral card estimate matches QuickStart page (3–6 weeks) | unit |
| AC-02 | Amber → Rational card estimate matches QuickStart page (10–20 weeks) | unit |
| AC-03 | Interpersonal Line card estimate matches QuickStart page (4–6 weeks) | unit |
| AC-04 | Emotional Line card estimate matches QuickStart page (3–5 weeks) | unit |
| AC-05 | All 4 cards consistently labeled (same format across cards) | unit |
| AC-06 | `npm run build` passes | build |

## Scope
- **Modified:** `src/pages/index.js` — update 4 card time estimates
- **NOT modified:** QuickStart pages, other homepage sections, sidebar, config
