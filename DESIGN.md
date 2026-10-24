---
colors:
  primary: "#1a6b3c"
  primary-dark: "#165a31"
  primary-darker: "#144d2a"
  primary-darkest: "#0f3a20"
  primary-light: "#218243"
  primary-lighter: "#258f49"
  primary-lightest: "#2ba055"
  primary-dark-mode: "#25c2a0"
  on-primary: "#ffffff"
  text: "#1c1e21"
  danger: "#c9252b"
  danger-hover: "#a31b20"
  badge-beginner: "#1a5a9e"
  badge-beginner-background: "#dce8f5"
  badge-intermediate: "#8a4200"
  badge-intermediate-background: "#ffedd1"
  badge-advanced: "#a50e0e"
  badge-advanced-background: "#f5d9d6"
  badge-tier-2: "#8a4200"
  badge-tier-2-background: "#ffedd1"
  badge-tier-3: "#a50e0e"
  badge-tier-3-background: "#f5d9d6"
typography:
  headline:
    fontFamily: "Lora, Georgia, serif"
  body:
    fontFamily: "system-ui stack (Infima --ifm-font-family-base)"
    fontSize: 1rem
  lead:
    fontSize: 1.1rem
  compact:
    fontSize: 0.95rem
  small:
    fontSize: 0.9rem
  caption:
    fontSize: 0.85rem
  badge:
    fontSize: 0.78rem
    fontWeight: 700
spacing:
  scale: [0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem]
rounded:
  control: 0.5rem
  card: 0.75rem
  pill: 999px
components:
  primary-cta: { background: primary, color: on-primary, focus: "2px outline primary-darker, offset 2px" }
  secondary-cta: { class: "button button--secondary" }
  card: { background: "--ifm-card-background-color", border: "1px --ifm-toc-border-color", rounded: card, padding: 1rem }
  badge: { rounded: pill, typography: badge }
---

# Design

> **Status:** Draft, awaiting design review (`docs/product/review.md`)
> **Source of truth for values:** `src/css/custom.css` (Infima variables) and
> `src/components/ModuleMeta/index.js` (badges). The front matter above
> mirrors them; change the CSS and this file in the same PR.
>
> Format: Google's DESIGN.md (alpha): tokens in the front matter, rules in the
> body. Component behaviour, learner-data handling and copy principles live in
> the `learner-experience` skill (`.agents/skills/learner-experience/SKILL.md`);
> this file covers how things look. How the product is built:
> `docs/product/design.md`.

## Overview

Adults learning alone, often in a reflective state. The site should feel
calm, trustworthy and unhurried: a serif for headings, a plain system font
for reading, one green brand colour, flat surfaces, generous spacing. The UI
orients; it never competes with the content. Stage sites use the same
tokens with their own titles and copy.

## Colors

- **Primary green** `#1a6b3c` is the only brand colour (UX-24). Use the
  Infima variables (`var(--ifm-color-primary)` and its shades), never the
  hex in component CSS. Dark mode uses the lighter green `#25c2a0`.
- **Measured contrast** (WCAG 2.2 AA needs 4.5:1 for normal text): primary
  on white 6.54:1; white on primary 6.54:1; dark-mode primary on the dark
  background 7.62:1; difficulty and tier badges 5.63–6.39:1; white on danger
  5.55:1; body text on white 16.71:1.
- **Links in body text are underlined.** Green alone is 2.55:1 against body
  text, so colour can't be the only cue (UX-17).
- **Danger** `#c9252b` is for destructive actions only (clearing learner data).
- **Badges** (difficulty, safety tier) take their colours from `ModuleMeta`:
  amber for Tier 2 and Intermediate, red for Tier 3 and Advanced, blue for
  Beginner. A badge always carries a text label too.

## Typography

- Headings: Lora with Georgia fallback, set once through
  `--ifm-heading-font-family` (UX-24, UX-25). Don't set font families per
  component.
- Body, navigation, buttons and badges: Infima's system font stack.
- Text sizes: lead 1.1rem, body 1rem, compact 0.95rem, small 0.9rem,
  caption 0.85rem; 0.78rem bold is for
  badges only. Nothing a learner must read goes below 0.85rem.
- One H1 per page, from front matter `title:`. Headings never skip a level.

## Layout

- Docusaurus layout: navbar, sidebar, content, table of contents. Don't
  build custom page shells for content pages.
- Grids collapse to one column below 768px (`custom.css`).
- Spacing comes from the scale in the front matter: 0.75–1rem inside
  components, 1.5rem between homepage sections.

## Elevation & Depth

Flat. Surfaces are separated by a 1px border in
`var(--ifm-toc-border-color)`, not shadows. A focus ring may use a soft
`box-shadow`; nothing else should.

## Shapes

- 0.5rem for controls (buttons, inputs), 0.75rem for cards, 999px for pills
  and badges.

## Components

- **Primary CTA:** one per view (UX-21). Filled primary, white text,
  visible focus ring (2px `primary-darker`, offset 2px).
- **Secondary CTA:** Infima `button--secondary` (outline).
- **"Start here" navbar pill:** primary at 12% fill, 30% border.
- **Cards:** card background, 1px border, 0.75rem radius, 1rem padding.
- **Module metadata badges:** rendered by `ModuleMeta` only; don't style
  badges by hand in MDX.
- **Learning components** (`RetrievalPrompt`, `RetrievalCard`,
  `MixedReview`, `PracticeTimer`, assessments): behaviour and copy follow
  the `learner-experience` skill.
- **Diagrams:** Mermaid, next to the text they explain, with `accTitle`
  (FR-16; `scripts/check-toolkit.mjs` checks it).

## Do's and Don'ts

Do:

- Use Infima variables and the tokens above; add a token here before adding a new value.
- Keep focus visible on every interactive element, and make everything work by keyboard.
- Respect `prefers-reduced-motion`: any animation stops or becomes static.
- Write UI copy that invites rather than pressures, with no stage names on stage sites (FR-17).
- Run the accessibility audit (`scripts/audit-a11y.mjs`, also in CI) on UI changes.

Don't:

- Hard-code hex colours in component CSS.
- Use colour as the only indicator of state.
- Add decorative images or stock photos to learning content (FR-16). The homepage AQAL motif (UX-26) is the one decorative element, and it is `aria-hidden`.
- Add gamification (points, streaks, badges for activity), social comparison, email capture, push notifications or in-module chat (`learner-experience` skill, "What not to build").
- Add timers that create urgency.

## Known drift (2026-10-24)

Found while writing this file. Fix in separate PRs:

- Accent blue `#2e7dce` is hard-coded in `StateAssessment.module.css`,
  `start.module.css`, `reflect.module.css` and `prototype.module.css`, and
  used as text colour. It is 4.25:1 on white, below 4.5:1 for normal text.
- Radii outside the scale: 3px, 4px, 6px, 8px and 0.4rem appear in component CSS.
- Font sizes outside the scale (0.8rem, 0.92rem, 1.05rem, 1.15rem, 1.3rem) appear in component CSS.
