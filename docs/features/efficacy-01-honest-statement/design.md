# Design: EFFICACY-01 — Honest efficacy statement

## Architecture

A new standalone markdown page (`docs/about/what-this-platform-does.md`) structured as follows:

```markdown
# What This Platform Can and Cannot Do

## What This Platform Can Reliably Do
Five bullet-point capabilities grounded in educational design evidence

## What The Evidence Does Not Support This Platform Doing Alone
Three bullet-points with Tier B citations

## Where Most Adults Actually Are
Population distribution data (Kegan or Cook-Greuter) with Tier B citation

## The Role of Relationship in Development
Recommendation for coaching/therapy/mentor/peer cohort — framed as evidence-supported

## Development Is Not a Straight Line
Non-linearity, regression, plateau addressed

## What This Means For Your QuickStart Path
Connection to the QuickStart system — platform is a scaffold, not a container

## Learn More
Cross-links to AQAL Overview, Line Profile Overview, evidence-vetting skill
```

## Homepage link placement

Add to `src/pages/index.js` in the `How It Works` section (the Learn → Practice → Reflect → Assess → Integrate loop) as a visibility anchor — a small honesty-signal text link near the loop, or alternatively in the hero section near the existing rigor signal paragraph. 

**Chosen approach:** Add to the hero section beneath the existing rigor signal paragraph (`scaleStat`), styled as a subtle text line — this preserves the integrity-focused framing already present in the hero.

## QuickStart audit design

### QuickStarts already in good shape (scope notes present):
- Personal → Integral: already scoped ("Systems thinking and multi-perspective integration are addressed in later paths")
- Emotional Line: already scoped ("Facilitated emotional work (Tier 2–3)... beyond scope")
- Interpersonal Line: already scoped
- Somatic Line: already scoped
- Self Line: has "Timeline Honesty" section
- Pluralistic → Integral: has "Platform's Own Limits" admonition
- State Development: has safety overview and bypassing warning
- Shadow Work: has extensive safety framework + disclaimer
- Spiritual Line: has trauma-sensitive entry framings
- Cognitive Line: has "Cognitive Development Takes Time"

### QuickStarts needing scope notes:
- **Amber → Rational:** No explicit outcome section; the "Goal" is well-framed but has no boundary note. Add a "What This QuickStart Does Not Do" sub-section after the Learner Expectations section.
- **Rational → Pluralistic:** No explicit outcome section; the "Goal" is well-framed without boundary. Add a scope note after "What Comes Next."
- **Moral Line:** Brief QuickStart with no scope note. Add a short scope statement.

## Dependencies
- None. All linked content already exists. No new npm dependencies.
