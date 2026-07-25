# UX-21 · Establish single primary CTA in hero, demote the other two

## Problem
After UX-20 removed "Open Prototype" from the hero, two CTAs remain: "Get Started →" and "Find Your Path →". They read as co-equal choices, leaving a first-time visitor without a clear signal of what to do first. Committing to one primary action is a well-established pattern for resolving this ambiguity.

## Requirements
1. Make "Find Your Path →" the primary CTA (filled/high-contrast button)
2. Demote "Get Started →" to a secondary CTA (outline/ghost button)
3. `npm run build` must pass

## Rationale
"Find Your Path" is the platform's own onboarding instrument — it gives a personalized next-step recommendation based on stage and line, rather than a generic entry point. It should visually lead.

## Non-Requirements
- No changes to the hero CTAs beyond CSS class swapping
- No changes to the `/start` or `/docs/intro` link targets
- No changes to Maps & Tools or any other section
- No changes to the prototype link (already handled by UX-20)

## Acceptance Criteria
| ID | Criterion | Test Type |
|---|---|---|
| AC-1 | "Find Your Path →" is rendered with the primary button style (`button--primary` filled green) | unit |
| AC-2 | "Get Started →" is rendered with the secondary button style (`button--secondary` outline/ghost) | unit |
| AC-3 | Both link targets (`/start` and `/docs/intro`) remain unchanged | unit |
| AC-4 | `npm run build` succeeds | integration |
