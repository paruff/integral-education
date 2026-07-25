# Specification: EFFICACY-01 — Honest "what this platform can and cannot do" statement

> **Issue #409** | Depends on: nothing — prioritized as trust and integrity work

## Problem

Population-level data on adult development (Kegan, Cook-Greuter) shows the overwhelming majority of adults are centered between Amber and early Rational. The intervention literature on what actually produces stage transition is thin — the most rigorous studies found measurable effects only with sustained, intensive programs (40+ hours, coaching relationships, cohort containers), not brief or self-guided content. No evidence currently supports self-guided digital content alone producing stage transition at population scale.

This platform already holds itself to a high evidence-tiering standard for external claims. That same discipline has not yet been turned on the platform's own implicit promise. The risk: a learner or a sophisticated outside reviewer could reasonably conclude the site is implicitly overclaiming what completing a QuickStart will do for them.

## Requirements

### Functional
1. Create an honest efficacy statement page at `docs/about/what-this-platform-does.md`
2. Clearly distinguish what the platform can reliably do vs. what the evidence does not support it doing alone
3. Cite population distribution data (Kegan's ~65%/34%/1% Stage 3/4/5 split, or Cook-Greuter's ~10%/80%/rare split) at Tier B
4. Explicitly recommend pairing platform use with a coach, therapist, mentor, or peer cohort for anyone seeking substantial developmental movement — framed as what the evidence supports, not as an upsell
5. Address non-linearity and regression explicitly: development is not a smooth line, stress activates earlier-stage material, plateau or backsliding is normal rather than failure
6. Add a visible link from the homepage to the new statement
7. Audit all QuickStart outcome/goal sections against the new standard; add scope notes where missing

### Non-Functional
8. Tone: confident but not self-defeating — honest positioning, not undermining genuine value
9. Follow existing MD conventions and heading hierarchy
10. Use Tier B citations consistent with existing evidence discipline
11. `npm run build` must pass

## Acceptance Criteria

| ID | Criterion | Test Type |
|----|-----------|-----------|
| AC-01 | Efficacy statement page exists at `docs/about/what-this-platform-does.md` | unit |
| AC-02 | Page clearly distinguishes what the platform can do (map provision, confusion reduction, preparation for real work, reflection support) from what the evidence does not support it doing alone (stage transition through self-guided content without sustained relationship) | unit |
| AC-03 | Page cites Kegan or Cook-Greuter population distribution data at Tier B with caveat | unit |
| AC-04 | Page explicitly recommends pairing with a coach/therapist/mentor/peer cohort for substantial developmental movement — framed as evidence-supported, not upsell | unit |
| AC-05 | Page addresses non-linearity and regression explicitly (stress activates earlier-stage material, plateau is normal) | unit |
| AC-06 | Page tone is confident, not self-defeating — honest positioning, not undermining value | unit |
| AC-07 | Homepage has a visible link to the efficacy statement | integration |
| AC-08 | All QuickStart outcome/goal sections reviewed; scope notes added where overclaiming risk exists | integration |
| AC-09 | `npm run build` passes with zero errors | build |

## Scope
- **New file:** `docs/about/what-this-platform-does.md`
- **Modified:** `src/pages/index.js` (homepage link)
- **Modified (as needed):** QuickStart files with missing scope boundaries on outcome/goal claims
