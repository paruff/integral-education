# CLARITY-03 Design

## Component Changes

### src/pages/index.js
Replace lines 156-166 (Shadow Integration card) with new card for Amber/Mythic Orientation.

**Current (Shadow Integration):**
```jsx
<article className="homepage-card">
  <h3>Shadow Integration</h3>
  <p>Focus area: Recognizing disowned patterns and integrating them safely.</p>
  <div className="homepage-card-meta-row">
    <span className="homepage-level-badge">Intermediate</span>
    <span className="homepage-card-meta">Read time: 12 min</span>
  </div>
  <Link className="homepage-card-cta" to="/docs/modules/shadow-integration-101">
    Open module →
  </Link>
</article>
```

**New (Amber/Mythic Orientation):**
```jsx
<article className="homepage-card">
  <h3>Amber/Mythic Orientation</h3>
  <p>Understand your current developmental stage with dignity — grounded in Kegan, Cook-Greuter, and Fowler, not just typology.</p>
  <div className="homepage-card-meta-row">
    <span className="homepage-level-badge">Beginner</span>
    <span className="homepage-card-meta">Read time: 8 min</span>
  </div>
  <Link className="homepage-card-cta" to="/docs/modules/amber-mythic-orientation">
    Open module →
  </Link>
</article>
```

## Files Affected

| File | Change Type |
|------|-------------|
| `src/pages/index.js` | Modify Featured Modules section |
| `docs/features/clarity-03-differentiated-module/specification.md` | Specification |
| `docs/features/clarity-03-differentiated-module/design.md` | This file |
| `docs/features/clarity-03-differentiated-module/tasks.json` | Task tracking |

## No CSS Changes

The existing `.homepage-card`, `.homepage-level-badge`, `.homepage-card-meta-row`, `.homepage-card-meta`, `.homepage-card-cta` classes handle all styling. The new card uses the same structure.

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Module path incorrect | Low | Build fails | Verify module ID is `amber-mythic-orientation` |
| Blurb too long for card | Low | Layout shift | Blurb is 2 lines, similar to existing cards |
| Build fails | Low | Blocked PR | Run `npm run build` before commit |