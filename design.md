# Design: UX-13 — Prototype form controls are inaccessible

## Impacted Components
- `src/pages/prototype.js` — Form controls, labels, ARIA attributes, safety gate live region
- `src/pages/prototype.module.css` — Touch target sizing for mobile

## Technical Approach

### 1. Explicit Labels for Selects
**Current:**
```jsx
<label htmlFor="pathway">Pathway</label>
<select id="pathway" ...>
```

**Target:** Already correct - both selects have proper label associations with matching htmlFor/id

### 2. Safety Consent Checkbox aria-label
**Target:**
```jsx
<label className={styles.checkboxRow}>
  <input
    type="checkbox"
    checked={safetyAck}
    onChange={...}
    aria-label="I have read the consent language and stop rules"
  />
  I have read consent language and stop rules.
</label>
```

### 3. Rubric Sliders ARIA
**Target for all three sliders:**
```jsx
<label id="aqalLabel">AQAL completeness</label>
<input
  type="range"
  min="1"
  max="5"
  step="0.5"
  value={aqalScore}
  onChange={...}
  aria-labelledby="aqalLabel"
  aria-valuetext={`${aqalScore} out of 5`}
/>
```
Repeat for evidence and transfer sliders with appropriate labels.

### 4. Safety Gate Live Region
**Target:**
```jsx
<div aria-live="polite" aria-atomic="true" className={styles.note}>
  {safetyAck ? 'Safety gate passed: practice can proceed.' : 'Safety gate pending: review consent and safety instructions before practice.'}
</div>
```

### 5. Touch Target Sizing (CSS)
```css
.card select,
.card input[type="range"] {
  min-height: 44px;
}
```

### 6. Focus Order
Current tab order already matches visual order: Pathway → Readiness → Consent checkbox → 3 rubric sliders. No changes needed.

## Risk Assessment
- **Low risk**: Only ARIA attributes and CSS changes
- **No new dependencies**: Native HTML/ARIA only
- **Focus order**: Already matches visual order
- **Testing**: axe-core validation after implementation
