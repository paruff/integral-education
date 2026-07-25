# Build Report — EFFICACY-01

## Build Summary

Created the honest efficacy statement page, added homepage visibility link, and audited all QuickStarts for scope boundary compliance. Three QuickStarts received scope notes where previously missing.

## Files Changed

### New
| File | Description |
|------|-------------|
| `docs/about/what-this-platform-does.md` | Core efficacy statement page with 8 sections, Tier B citations, population data, and scope boundaries |

### Modified
| File | Change |
|------|--------|
| `src/pages/index.js` | Added honesty-signal link beneath rigor signal in hero section |
| `docs/maps/aqal-overview.md` | Added link to efficacy statement in Next Steps |
| `docs/quickstarts/amber-to-rational.mdx` | Added "What This QuickStart Does Not Do" scope section + cross-link |
| `docs/quickstarts/rational-to-pluralistic.mdx` | Added "What This QuickStart Does Not Do" scope section + cross-link |
| `docs/quickstarts/moral-line-development.mdx` | Added "Scope" section + cross-link |

## Tasks Completed

| Task ID | Description | Status |
|---------|-------------|--------|
| efficacy-01-01 | Create efficacy statement page | ✅ |
| efficacy-01-02 | Add homepage link | ✅ |
| efficacy-01-03 | Scope-note Amber → Rational | ✅ |
| efficacy-01-04 | Scope-note Rational → Pluralistic | ✅ |
| efficacy-01-05 | Scope-note Moral Line | ✅ |
| efficacy-01-06 | Verify npm run build | ⚠ CI-expected |

## QuickStart Audit Summary

| QuickStart | Pre-existing scope boundary | Action taken |
|-----------|---------------------------|--------------|
| Personal → Integral | ✅ Scoped (systems work in later paths) | None needed |
| Amber → Rational | ❌ Missing | Added "What This QuickStart Does Not Do" |
| Rational → Pluralistic | ❌ Missing | Added "What This QuickStart Does Not Do" |
| Pluralistic → Integral | ✅ "Platform's Own Limits" admonition | None needed |
| Cognitive Line | ✅ "Cognitive Development Takes Time" | None needed |
| Emotional Line | ✅ Scoped (facilitated work beyond scope) | None needed |
| Interpersonal Line | ✅ Scoped | None needed |
| Moral Line | ❌ Missing | Added "Scope" section |
| Self Line | ✅ "Timeline Honesty" section | None needed |
| Somatic Line | ✅ Scoped | None needed |
| Spiritual Line | ✅ Trauma-sensitive + safety notes | None needed |
| State Development | ✅ Safety overview + bypassing warning | None needed |
| Shadow Work | ✅ Safety framework + disclaimer | None needed |

## Validation Results

- Content: All quotes from Kegan and Cook-Greuter verified at Tier B
- Links: All internal links to cross-referenced pages verified
- Tone: Confident, not self-defeating — explicit section on what platform CAN do precedes limitations
- Local build: Blocked by Node v26 / Docusaurus 3.10.2 incompatibility (known env issue)
