# CLARITY-02: Add Scale/Depth Stat Line to Homepage

## Problem Statement
Nothing on the homepage communicates that this is a 75-module platform with seven fully-built developmental lines and per-module evidence tables. A skeptical visitor has no way to recalibrate their expectations of scale.

## Requirements
1. Add a short stat line near the hero or below "How It Works" on the homepage
2. Display verified module and developmental line counts
3. Signal evidence-tiered citations throughout
4. `npm run build` passes

## Acceptance Criteria
- AC1: Stat line appears on the homepage (below hero or below "How It Works")
- AC2: Stat line contains the verified module count (75)
- AC3: Stat line contains the verified developmental line count (7)
- AC4: Stat line references evidence-tiered citations
- AC5: `npm run build` passes

## Constraints
- No new dependencies
- No restructuring of the homepage
- Counts must be verified against actual docs/modules/ directory