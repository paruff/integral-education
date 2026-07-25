# UX-26 · Design and implement a signature visual element for the homepage

## Problem
The homepage hero is a clean, competent solid green block with centered text — indistinguishable from a generic app landing page. There is no single memorable visual element that signals "this is the Integral Education platform, not a wellness site."

## Design Direction (human-approved)
An AQAL quadrant motif rendered behind the hero text as legible texture — not generic decoration, but the framework itself made visible. Four faint quadrant labels (I · It · We · Its) rendered as real text in the corners, with a subtle conic-gradient background suggesting the four quadrants.

## Requirements
1. Add an absolutely-positioned motif container behind the hero text with a subtle four-section gradient
2. Render real quadrant labels (I, It, We, Its) as faint text in the four corners, using the display font (Lora)
3. Fade-in animation on load (1.5s, CSS `@keyframes`) — static with `prefers-reduced-motion`
4. `pointer-events: none` on the motif so it never interferes with clicks
5. Labels must be legible texture: faint enough to be background, readable if you look (target ~8-12% white opacity)
6. `npm run build` must pass
7. Contrast verification: WCAG AA on hero title text against the motif background

## Non-Requirements
- No JavaScript, no SVG, no image assets, no external dependencies
- No interactive widgets or continuous animations
- No changes to hero content, layout, or CTAs
- Not a "hero redesign" — the motif is an additive layer only

## Acceptance Criteria
| ID | Criterion | Test Type |
|---|---|---|
| AC-1 | AQAL quadrant motif renders behind the hero text as a CSS gradient | unit |
| AC-2 | Four real quadrant labels (I · It · We · Its) are positioned in corners | unit |
| AC-3 | Labels use the Lora display font at low opacity as faint background texture | unit |
| AC-4 | Motif fades in on load; static with prefers-reduced-motion | unit |
| AC-5 | Motif has pointer-events: none — does not interfere with CTA clicks | integration |
| AC-6 | `npm run build` succeeds | integration |
