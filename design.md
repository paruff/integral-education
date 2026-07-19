# Design: UX-12 — Prototype page is framed as a developer tool, not a learner experience

## Impacted Components
- `src/pages/prototype.js` — Page title, sub-headline, section headings, Implementation Docs section, and demo callout

## Technical Approach

### 1. Page Title and Sub-headline
**Current:**
```jsx
<h1>Integral Learning Prototype</h1>
<p>Explore pathway selection, safety-aware practice flow, retrieval loops, and rubric-based assessment...</p>
```

**Target:**
```jsx
<h1>Try a Practice Session</h1>
<p>Choose a learning path, step through a guided practice, and see how your progress is tracked.</p>
```

### 2. Section Headings
| Current | Target |
|---------|--------|
| `1) Select Pathway` | `Choose Your Path` |
| `2) Practice Flow` | `Begin Your Practice` |
| `3) Retrieval Loop Preview` | `How Review Works` |
| `4) Rubric Preview` | `How You Are Assessed` |

### 3. Demo Context Callout
Add a callout box at the top of the page (before the `.grid` section) styled similarly to the existing hero:
```jsx
<div className={styles.callout}>
  <strong>🧪 This is a demo — not a full session.</strong>
  <br />
  Explore how a guided practice works before you begin. No progress is saved.
</div>
```

### 4. Implementation Docs — Collapsible
Wrap the existing `.links` section in a native HTML `<details>`/`<summary>` element:
```jsx
<details className={styles.links}>
  <summary>Implementation Docs (for developers)</summary>
  <ul>...</ul>
</details>
```

The `.links` CSS needs minor adjustment to support the `details`/`summary` pattern:
- Remove the `section` tag, use `details` instead
- The `<summary>` element replaces the `<h2>` for the collapsed heading

### 5. CSS Changes (`prototype.module.css`)
- Add `.callout` style for the demo context callout
- Adjust `.links` to work with `details`/`summary` elements

## Risk Assessment
- **Low risk**: Page already exists, no new dependencies, no backend changes
- **Minimal change surface**: Only text and one structural change (details/summary)
- **Natively supported**: details/summary is standard HTML, no polyfill needed
- **No regression risk**: Content is preserved, just rearranged
