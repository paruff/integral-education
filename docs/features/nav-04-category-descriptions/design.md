# NAV-04 Design

## Impacted Components

| File | Change Type |
|------|-------------|
| `sidebars.js` | Add `description` field to 10 inline `type: 'category'` objects |

## Current State

In `sidebars.js`, the following module grouping categories currently have **no `description` field**:

| Line | Category Label | Sidebar Section | Currently Has Description? |
|------|---------------|-----------------|---------------------------|
| 28 | Self Line | Top-level | ❌ |
| 38 | Emotional Line | Top-level | ❌ |
| 53 | Interpersonal Line | Top-level | ❌ |
| 67 | Cognitive Line | Top-level | ❌ |
| 79 | Spiritual Line | Top-level | ❌ |
| 91 | Moral Line | Top-level | ❌ |
| 102 | Shadow Work | Top-level | ❌ |
| 115 | Somatic Line | Top-level | ❌ |
| 196 | Core Skills | Under Modules | ❌ |
| 210 | Shadow Work | Under Modules | ❌ |

Already have descriptions from CLARITY-05:
| 136 | Stage Development | Under Modules | ✅ |
| 183 | State Training | Under Modules | ✅ |

## Technical Approach

Docusaurus v3 sidebar category objects support a `description` field. When a parent category uses `type: 'generated-index'`, subcategory descriptions display on the generated index page. For top-level categories, the description is stored in sidebar data and available for tooltip/sidebar rendering.

### Proposed Descriptions

Each is one sentence. Tone matches CLARITY-05: plain language, briefly descriptive, avoids AQAL jargon for readers new to the framework.

| Category | Proposed Description |
|----------|---------------------|
| **Self Line** | Your sense of identity and self-concept — from conformist and achiever through individualist to unitive awareness. |
| **Emotional Line** | Your capacity to recognise, regulate, and work with emotion — from basic affect labelling to emotional granularity and relational integration. |
| **Interpersonal Line** | Your ability to relate across difference — from perspective-taking and empathic accuracy to collaborative meaning-making and trust across divides. |
| **Cognitive Line** | Your thinking capabilities — from concrete and formal operations through postformal reasoning to metasystematic and vision-logic. |
| **Spiritual Line** | Your relationship with meaning, mystery, and transcendence — from mythic belief through rational inquiry to post-metaphysical integral practice. |
| **Moral Line** | Your sense of justice and care — from conventional reasoning through postconventional imagination to integral ethics and moral repair. |
| **Shadow Work** (top-level) | Work with what runs beneath awareness — the 3-2-1 process, persona masks, spiritual bypassing, and collective cultural shadow. |
| **Somatic Line** | Your embodied presence and body-based awareness — the felt sense that anchors every other line of development. |
| **Core Skills** (under Modules) | Foundational tools for learning across all lines — mindfulness, critical thinking, systems thinking, and evidence evaluation. |
| **Shadow Work** (under Modules) | Core shadow practices within the module path — from shadow foundation through the 3-2-1 process to applications in relationships and culture. |

### Placement

Each `description` field will be added to the existing category object in `sidebars.js`, right after the `label` field, before `collapsible`/`collapsed` or `items` — matching the placement pattern used by CLARITY-05 for Stage Development and State Training.

### Example Pattern

```js
{
  type: 'category',
  label: 'Emotional Line',
  description: 'Your capacity to recognise, regulate, and work with emotion — from basic affect labelling to emotional granularity and relational integration.',
  collapsible: true,
  collapsed: false,
  items: [ /* ... */ ],
},
```

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Description field not supported for top-level categories | Low | Description silently ignored | Verified Docusaurus sidebar schema includes description for all category types |
| Description too long for sidebar tooltip/display | Low | Truncation or layout shift | All descriptions are one sentence (~15-25 words) |
| Tone inconsistency with CLARITY-05 | Low | Perceived as two separate efforts | Descriptions follow same pattern: noun phrase + em-dash elaboration |
| Build fails | Low | Blocked | Run `npm run build` before commit |
