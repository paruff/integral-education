# UX-20 · Rename or reposition "Open Prototype" out of primary hero CTA

## Problem
"Open Prototype" sits as a co-equal hero CTA next to "Get Started" and "Find Your Path" on the homepage. This signals unfinished work — a prototype link at the top of the page suggests the product is incomplete — before a visitor has done anything else on the site. The prototype is a functional interactive demo, not a production learning path, and its placement undermines the site's credibility.

## Requirements
1. Remove "Open Prototype" from the hero CTA row in `src/pages/index.js`
2. The prototype is already listed as "Interactive Prototype" in the Maps & Tools section — rename this card entry to describe what it does (a demo) rather than its internal codename
3. `npm run build` must pass

## Non-Requirements
- No changes to the prototype page itself (`src/pages/prototype.js`)
- No changes to the "Get Started →" or "Find Your Path →" CTAs
- No changes to hero layout or styling beyond removing the prototype link
- UX-21 (reducing hero to single primary CTA) is a separate issue

## Acceptance Criteria
| ID | Criterion | Test Type |
|---|---|---|
| AC-1 | "Open Prototype" link is removed from the `.buttons` div in the hero section | unit |
| AC-2 | The Maps & Tools card previously titled "Interactive Prototype" has a user-facing title that describes a demo, not an internal codename | unit |
| AC-3 | The Maps & Tools card's CTA text is updated from "Open prototype →" to describe a demo action | unit |
| AC-4 | `npm run build` succeeds | integration |
| AC-5 | "Get Started →" and "Find Your Path →" remain unchanged | unit |
