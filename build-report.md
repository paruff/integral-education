# Build Report — SAFE-01: Add crisis resource banner to all shadow-adjacent module pages

## Summary

Created a persistent, non-intrusive `CrisisResourceBanner` component that displays at the top of every shadow-adjacent and altered-state module page. Created a dedicated `docs/safety/crisis-resources.md` page with US crisis lines, Samaritans (UK/IE), and international resources. The banner was imported into 17 target modules.

## Session

- **Session ID:** `safe-01-20260720`
- **Branch:** `fix/safe-01-crisis-resource-banner`

## Files Changed

| File | Action | Purpose |
|------|--------|---------|
| `src/components/CrisisResourceBanner/index.js` | **Created** | Persistent banner component with crisis link |
| `src/components/CrisisResourceBanner/styles.module.css` | **Created** | Infima-themed styling, responsive |
| `docs/safety/crisis-resources.md` | **Created** | Crisis resource page (US + UK/IE + international) |
| 14 shadow-tagged module files | Modified | Added banner import after frontmatter |
| 3 state-tagged module files | Modified | Added banner import after frontmatter |

## Tasks Completed

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Create CrisisResourceBanner component | ✅ Done | `index.js` + `styles.module.css` with Infima variables |
| 2 | Create crisis-resources page | ✅ Done | US crisis lines, Samaritans, international resources |
| 3 | Import banner into 14 shadow modules | ✅ Done | All shadow-tagged modules updated |
| 4 | Import banner into 3 state modules | ✅ Done | causal, nondual, subtle modules updated |
| 5 | Validate build | ✅ Done | `npm run build` SUCCESS |

## Component Architecture

```
src/components/CrisisResourceBanner/
├── index.js              — React component with @docusaurus/Link
└── styles.module.css     — Infima-themed, responsive, keyboard accessible
```

**Component features:**
- `role="complementary"` + `aria-label="Crisis resources"` for screen readers
- ⚠️ warning icon with `aria-hidden="true"`
- Text: "If you feel overwhelmed or unsafe, stop the practice. Crisis resources →"
- Link to `/docs/safety/crisis-resources` using `@docusaurus/Link`
- Infima `--ifm-color-warning-contrasting-background` + `--ifm-color-warning-dark` border
- Responsive: reduced padding at 480px breakpoint

## Crisis Resources Page

```
docs/safety/crisis-resources.md
├── United States: 988 Lifeline, Crisis Text Line, Veterans Crisis Line
├── United Kingdom / Ireland: Samaritans (116 123)
├── International: findahelpline.com, IASP directory
└── Emergency numbers: 911 (US), 999 (UK), 112 (EU)
```

## Validation Results

### Build
```
npm run build → [SUCCESS] Generated static files in "build".
```

### Import count
```
grep -rl 'CrisisResourceBanner' docs/modules/ → 17 files
```

### Component rendering
Verified banner HTML present in build output for all 17 module pages.

## Blockers

None.