# CLARITY-05 Design

## Impacted Components

| File | Change Type |
|------|-------------|
| `sidebars.js` | Add `description` field to "Stage Development" and "State Training" category objects |

## Current State

In `sidebars.js`, lines 133-191, the "Stage Development" and "State Training" categories are defined inline (no `_category_.json` files) under the "Modules" generated-index category:

```js
{
  type: 'category',
  label: 'Stage Development',
  collapsible: true,
  collapsed: true,
  items: [/* ... */],
},
{
  type: 'category',
  label: 'State Training',
  collapsible: true,
  collapsed: true,
  items: [/* ... */],
},
```

These categories currently have **no `description` field**, so visitors see only the label with no context about how the two differ.

## Technical Approach

Docusaurus v3 sidebar category objects support a `description` field. When the parent category uses `type: 'generated-index'`, subcategory descriptions display on the generated index page, giving visitors immediate context for why both categories exist.

### Changes to `sidebars.js`

**"Stage Development" category** (around line 134):
```js
{
  type: 'category',
  label: 'Stage Development',
  description: 'Your long-term centre of gravity — the developmental stage that shapes how you make meaning. See the AQAL Overview for how stages differ from states.',
  collapsible: true,
  collapsed: true,
  items: [ /* ... unchanged ... */ ],
},
```

**"State Training" category** (around line 179):
```js
{
  type: 'category',
  label: 'State Training',
  description: 'Temporary experiences of consciousness (from ordinary waking to deep meditative states) that can be accessed at any stage. See the AQAL Overview for how states differ from stages.',
  collapsible: true,
  collapsed: true,
  items: [ /* ... unchanged ... */ ],
},
```

### AQAL Overview Reference

The AQAL Overview page at `docs/maps/aqal-overview.md` already contains the state/stage distinction:
- **Levels section** (lines 71-87): explains developmental stages
- **States section** (lines 105-115): explains states as temporary experiences
- **4-Path Lens** (lines 142-145): distinguishes "Growing Up" (stages) from "Waking Up" (states)

The descriptions use "See the AQAL Overview" phrasing rather than duplicating the full AQAL explanation, satisfying AC-03.

## Placement Rationale

- Docusaurus renders category descriptions on the generated-index page, so visitors see the distinction when browsing Modules
- Descriptions are concise (1 sentence each) — enough to orient, not enough to overwhelm
- Linking to AQAL Overview avoids content duplication while providing a path to deeper understanding
- No `_category_.json` files needed since categories are defined inline in sidebars.js

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| description field not supported by Docusaurus v3 | Low | Category renders without description | Verify with `npm run build`; checked against Docusaurus sidebar schema |
| Text too long for category card | Low | Layout shift | Descriptions are 1 sentence (~25 words each), well within limits |
| Build fails | Low | Blocked | Run `npm run build` before commit |
