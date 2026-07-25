# UX-22 · Design

## Impacted Components

| File | Change |
|---|---|
| `src/components/ModuleMeta/index.js` | Add TIER badge rendering logic |
| 17 module files in `docs/modules/` | Add `safety_tier: 2` frontmatter field |

## Detailed Changes

### 1. Add `safety_tier: 2` to Tier 2 module frontmatter
Add between the closing `---` of existing frontmatter, alongside other metadata fields (`difficulty`, `readingTime`, etc.):

```
safety_tier: 2
```

**Affected modules (17):**
1. `self-line-integration-practice.mdx`
2. `shadow-collective-cultural.mdx`
3. `nondual-awareness-orientation.mdx`
4. `shadow-work-foundation.mdx`
5. `shadow-positive-projection.mdx`
6. `shadow-spiritual-bypassing.mdx`
7. `shadow-integration-101.md`
8. `integral-shadow-teal-trap.mdx`
9. `integral-life-practice-embodying-2nd-tier.mdx`
10. `causal-witness-state.mdx`
11. `shadow-321-process.mdx`
12. `shadow-in-relationships.mdx`
13. `shadow-immunity-to-change.mdx`
14. `shadow-persona-mask.mdx`
15. `moral-line-shadow-moral-injury.mdx`
16. `spiritual-line-shadow-integration.mdx`
17. `subtle-state-access.mdx`

These are all modules that import CrisisResourceBanner or ShadowGate — confirmed Tier 2 per the safety classification protocol.

### 2. Extend ModuleMeta to render TIER badge

In `src/components/ModuleMeta/index.js`:

1. Read `safety_tier` from frontmatter (alongside existing fields)
2. Add a TIER config map for styling (amber palette for Tier 2, red for Tier 3)
3. Render a TIER badge when `safety_tier` is ≥ 2, following the existing pattern:
   - Icon: `⛑️`
   - Label: `TIER`
   - Value for Tier 2: `2 · Guided`
   - Value for Tier 3: `3 · Facilitated`

The badge uses the same CSS classes (`styles.badge`, `styles.icon`, `styles.label`, `styles.value`) with CSS custom properties `--meta-badge-colour` and `--meta-badge-bg` for the amber colour.

**Tier config:**
| Tier | Colour | Background | Label Value |
|---|---|---|---|
| 2 | `#8a4200` (dark amber) | `#ffedd1` (light amber) | `2 · Guided` |
| 3 | `#a50e0e` (dark red) | `#f5d9d6` (light red) | `3 · Facilitated` |

### 3. No CSS changes
The existing `.badge[style*="--meta-badge-colour"]` CSS selector in `styles.module.css` already handles custom-coloured badges with the border and background styling.
