# UX-24-REV · Typography and layout refinement pass

## Problem
The site uses a single system sans-serif font stack (Infima default) for every element — hero, headers, body, badges, UI chrome — with no display/body distinction. The green accent color (`#2e8555` light / `#25c2a0` dark) is the Docusaurus default, not a deliberate brand choice.

## Requirements
1. Add Lora (Google Fonts) as a display typeface for heading moments: hero h1, module page h1, section h2
2. Keep body text, badges, sidebar, navbar, buttons, and all UI chrome on the existing system sans-serif
3. Replace the Docusaurus-default light-mode green (`#2e8555`) with a deliberate brand green (`#1a6b3c`) and derived palette
4. Dark mode color unchanged
5. `npm run build` must pass

## Non-Requirements
- No changes to badge-pill component, card border/spacing, or callout box styling
- No changes to component structure or module content
- No font changes for h3 and below, body text, or UI elements

## Acceptance Criteria
| ID | Criterion | Test Type |
|---|---|---|
| AC-1 | Lora font is loaded and applied to hero h1 (`.hero__title`) | unit |
| AC-2 | Lora font is applied to module page h1 and section h2 | unit |
| AC-3 | System sans-serif remains on body text, badges, navbar, and sidebar | unit |
| AC-4 | Light-mode primary green is `#1a6b3c` with derived palette | unit |
| AC-5 | Dark-mode primary green remains `#25c2a0` | unit |
| AC-6 | `npm run build` succeeds | integration |
