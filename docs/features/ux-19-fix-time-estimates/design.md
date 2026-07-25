# Design: UX-19 — Fix contradictory time estimates

## Approach

Replace the "Estimated time:" label on each homepage QuickStart card with the actual time commitment from the linked QuickStart page. Use the same format across all 4 cards for consistency.

### Per-card mapping

| Card | Current | Replacement | Rationale |
|------|---------|-------------|-----------|
| Personal → Integral | `Estimated time: 20 min` | `Time commitment: 3–6 weeks` | QuickStart says "3–6 weeks (20–30 min/day)" |
| Amber → Rational | `Estimated time: 20 min` | `Time commitment: 10–20 weeks` | QuickStart says "Core path: 10–20 weeks" |
| Interpersonal Line | `Estimated time: 25–40 min per module` | `Time commitment: 4–6 weeks` | QuickStart says "4–6 weeks (25–40 min/module)" — weeks is the primary number |
| Emotional Line | `Estimated time: 20–40 min per module` | `Time commitment: 3–5 weeks` | QuickStart says "3–5 weeks (20–40 min/module)" — weeks is the primary number |

### Format decision

Use "Time commitment:" instead of "Estimated time:" because:
- "Time commitment" matches the QuickStart pages' own label
- It avoids the ambiguity of what "estimated time" refers to (read time vs. completion time)
- It is consistent with how the QuickStart pages describe their own duration

### Files changed

Only `src/pages/index.js` — the 4 card meta paragraphs.

### Dependencies
- None. No new dependencies, no QuickStart page changes, no config changes.
