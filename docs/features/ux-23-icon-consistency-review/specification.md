# UX-23-REV · Icon consistency review

## Problem
An icon consistency audit found 7 cases where the same concept uses different emoji across different modules, undermining the visual language consistency.

## Audit Findings
| Concept | Standard Emoji | Inconsistent Emoji | Affected Count |
|---|---|---|---|
| Integrate | 🔄 | 🔗 | 29 files |
| Learn | 🧠 | 📚 | 17 files |
| Stabilize | ⚓ | 🧲 | 27 files |
| Reflect | 🔍 | 🧘 | 7 files |
| When to Seek Support | 🆘 | 🚨 | 2 files |
| Encounter | 🌿 | 🔍 | 20 files |
| AQAL Mapping | 🗺️ | (none) | 9 files missing emoji |

## Requirements
1. Standardize all inconsistent headings to use the standard emoji for each concept
2. Add missing emoji to headings that lack them
3. `npm run build` must pass

## Non-Requirements
- No CSS or component changes
- No content changes beyond emoji substitution in headings
- No restructuring of module sections

## Acceptance Criteria
| ID | Criterion | Test Type |
|---|---|---|
| AC-1 | 🔗 Integrate → 🔄 Integrate in all 29 affected files | unit |
| AC-2 | 📚 Learn → 🧠 Learn in all 17 affected files | unit |
| AC-3 | 🧲 Stabilize → ⚓ Stabilize in all 27 affected files | unit |
| AC-4 | 🧘 Reflect → 🔍 Reflect in all 7 affected files | unit |
| AC-5 | 🚨 When to Seek Support → 🆘 When to Seek Support in both affected files | unit |
| AC-6 | 🔍 Encounter → 🌿 Encounter in all 20 affected files | unit |
| AC-7 | 🗺️ AQAL Mapping in all 9 files missing the emoji | unit |
| AC-8 | `npm run build` succeeds | integration |
