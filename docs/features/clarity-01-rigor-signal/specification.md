# CLARITY-01: Add Rigor-Signaling Sentence to Homepage Hero

## Problem Statement
The homepage hero ("Develop yourself across mind, body, and relationships... for curious adults, coaches, educators, and teams") reads as generic self-help copy. It gives no signal of the evidence-tiering discipline and Kegan-grounded architecture underneath. A sophisticated visitor has no reason to expect rigor from this framing alone.

## Requirements
1. Add one sentence directly below the hero subtext (line 16 in `src/pages/index.js`)
2. Sentence must signal: peer-reviewed developmental psychology foundation, evidence-tiered claims
3. Sentence must reference named researchers (Kegan, Cook-Greuter, Kohlberg)
4. Tone must be confident, not defensive — must not read as an apology for the wellness framing above it
5. No other changes to the homepage

## Acceptance Criteria
- AC1: New sentence appears directly below `</p>` closing hero subtext, within the same `<div className="container">`
- AC2: Sentence references "peer-reviewed developmental psychology" or equivalent rigor signal
- AC3: Sentence names at least Kegan + one other researcher (Cook-Greuter, Kohlberg)
- AC4: Sentence includes evidence-tiering claim (e.g. "tiered by evidence quality")
- AC5: Tone is confident/descriptive, not defensive/apologetic
- AC6: `npm run build` passes with zero errors

## Constraints
- Single file: `src/pages/index.js` only
- Single sentence addition — no restructuring of hero section
- No new dependencies
- No CSS changes