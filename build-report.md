# Build Report — UX-21

## Summary
Swapped primary/secondary visual treatment on the two hero CTAs: "Find Your Path →" is now the primary filled-green button, "Get Started →" is the secondary outline/ghost button.

## Files Changed
| File | Change |
|---|---|
| `src/pages/index.js` | Swapped CSS classes on the two hero `<Link>` elements (lines 21–30) |

## Tasks Completed
| ID | Title | Status |
|---|---|---|
| T1 | Swap primary/secondary styling on hero CTAs | ✓ Complete |
| T2 | Verify build passes | ✓ Complete |

## Validation Results
| Gate | Result |
|---|---|
| `npm run build` | ✓ PASS (production build succeeded; only pre-existing broken anchor warnings) |

## Blockers
None.
