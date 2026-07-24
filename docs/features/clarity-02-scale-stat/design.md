# CLARITY-02: Design

## Impacted Components
- **File:** `src/pages/index.js`
- **Location:** After "How It Works" section (after line 88), before "QuickStarts" section
- **Scope:** Add one `<p>` element with the stat line

## Technical Approach
1. Insert a `<p>` element between the "How It Works" section and "QuickStarts" section
2. Text: "75 modules · 7 developmental lines · Evidence-tiered citations throughout"
3. Add supporting CSS in `index.module.css` for visual subtlety (smaller font, muted color)
4. Verified counts: 75 .md/.mdx files in docs/modules/, 7 developmental lines (cognitive, emotional, interpersonal, moral, self, shadow, spiritual)

## Placement Rationale
- Below "How It Works" gives immediate scale context after understanding the learning loop
- Separate from hero to not compete with CLARITY-01 rigor signal
- Visually subtle — communicates depth without disrupting flow