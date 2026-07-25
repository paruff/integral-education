# UX-25-REV · Apply typography refinement consistently

## Problem
UX-24-REV introduced Lora as a display typeface via `--ifm-heading-font-family`. This issue verifies that the new display face is applied consistently to: homepage hero, module page titles, QuickStart titles, Maps page titles — while leaving body text, badges, sidebar, and breadcrumbs untouched.

## Audit Findings
The audit found that `--ifm-heading-font-family: Lora` (set globally by UX-24-REV) inherently applies to all h1–h6 elements across the entire Docusaurus site. Every target element in the issue is already a proper heading element (h1, h2, or h3). Non-heading elements (body, badges, sidebar, breadcrumbs) correctly inherit the system sans-serif from `--ifm-font-family-base`.

**Result: No code changes needed.** The global approach is already fully consistent.

## Requirements
1. Audit all target elements for heading-tag usage ✓ (Complete — all use h1/h2/h3)
2. Confirm no heading-like elements use non-heading markup missing Lora ✓ (None found)
3. Confirm body/badges/sidebar/breadcrumbs are unaffected ✓ (All use non-heading elements)

## Acceptance Criteria
| ID | Criterion | Test Type |
|---|---|---|
| AC-1 | Homepage hero h1 uses Lora via heading font family | unit |
| AC-2 | QuickStart titles (homepage h3 + page h2) use Lora | unit |
| AC-3 | Maps titles (homepage h3 cards + doc page h2) use Lora | unit |
| AC-4 | Body text, badges, sidebar, breadcrumbs stay on system sans-serif | unit |
| AC-5 | `npm run build` succeeds | integration |
