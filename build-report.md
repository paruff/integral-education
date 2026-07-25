# Build Report — UX-20

## Summary
Repositioned "Open Prototype" out of the hero CTA row and renamed it to "Platform Demo" / "Try the demo →" in the Maps & Tools section.

## Files Changed
| File | Change |
|---|---|
| `src/pages/index.js` | Removed "Open Prototype" hero link (lines 31–35); renamed Maps & Tools card (lines 209–217) |

## Tasks Completed
| ID | Title | Status |
|---|---|---|
| T1 | Remove Open Prototype link from hero CTA row | ✓ Complete |
| T2 | Rename Maps & Tools prototype card | ✓ Complete |
| T3 | Verify build passes | ✓ Complete |

## Validation Results
| Gate | Result |
|---|---|
| Lint | N/A (no JSX lint script configured) |
| Typecheck | N/A (no TypeScript — JSX project) |
| `npm run build` | ✓ PASS (production build succeeded; only pre-existing broken anchor warnings) |

## Blockers
None. The broken anchor warnings are pre-existing in shadow modules, unrelated to this change.
