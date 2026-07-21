# Design: SAFE-02 — Enforce Tier 1 safety gate at module entry for all shadow modules

## Component: `src/components/ShadowGate/`

### Structure

```
src/components/ShadowGate/
├── index.js              — React component with gate logic
└── styles.module.css     — Infima-themed styling
```

### Component State

```js
{
  acknowledged: false,    // true → gate hidden, content shown
  blocked: false,         // true → blocking message shown
  distress: null,         // 1–10 or null
  contraindications: [], // checked items
  mindfulnessDone: false, // checkbox
}
```

### Gate Flow

```
┌─────────────────────────────────┐
│ ShadowGate — Tier 1 Entry Check │
│                                 │
│ Consent: "I understand this     │
│ module involves shadow work..." │
│                                 │
│ □ I have completed or attempted │
│   Mindfulness Basics            │
│                                 │
│ Contraindications (check any):  │
│ □ Acute trauma response         │
│ □ Active PTSD without support   │
│ □ Current crisis state          │
│                                 │
│ Current distress level: 1–10    │
│ ○ 1 ○ 2 ○ 3 ○ 4 ○ 5            │
│ ○ 6 ○ 7 ○ 8 ○ 9 ○ 10           │
│                                 │
│ [ I'm ready to proceed → ]      │
└─────────────────────────────────┘
         │
         ▼
  ┌──────────────┐    YES   ┌──────────────────┐
  │ Distress ≥ 7? │────────▶│ BLOCK: grounding  │
  └──────────────┘          │ + crisis banner   │
         │ NO               └──────────────────┘
         ▼
  ┌──────────────────┐ YES  ┌──────────────────┐
  │ Contraindication? │────▶│ BLOCK: "not       │
  └──────────────────┘      │ suitable" + links │
         │ NO               └──────────────────┘
         ▼
  ┌──────────────────┐
  │ Gate passes       │
  │ → hide gate       │
  │ → show content    │
  │ → sessionStorage  │
  └──────────────────┘
```

### sessionStorage

```js
// Key: 'shadow-gate-acknowledged'
// Value: 'true'
// Set when gate passes; cleared on browser close.
```

On component mount: if `sessionStorage.getItem('shadow-gate-acknowledged') === 'true'`, skip gate and show module content immediately.

### Blocking States

**Distress ≥ 7 block:**
```
⚠️ Your current distress level is high.

We recommend grounding first before beginning this practice:
- Place both feet flat on the floor
- Take several slow, natural breaths
- Name five things you can see

<CrisisResourceBanner />

[ I've grounded and still want to proceed ]
[ Return to safety resources ]
```

**Contraindication block:**
```
This practice is not suitable right now.

Shadow work can intensify distress when you're already in a vulnerable state. Consider:
- [Mindfulness Basics →](/docs/modules/mindfulness-basics) — a gentler starting point
- [Crisis resources →](/internal/safety/crisis-resources) — free, confidential support
- Returning to this module when you feel more settled

[ Return to module list ]
```

### Props

```jsx
<ShadowGate>
  {/* Module content renders here when gate passes */}
  {children}
</ShadowGate>
```

## Target Modules (12)

All modules with "shadow" in filename:
1. `integral-shadow-teal-trap.mdx`
2. `moral-line-shadow-moral-injury.mdx`
3. `shadow-321-process.mdx`
4. `shadow-collective-cultural.mdx`
5. `shadow-immunity-to-change.mdx`
6. `shadow-in-relationships.mdx`
7. `shadow-integration-101.md`
8. `shadow-persona-mask.mdx`
9. `shadow-positive-projection.mdx`
10. `shadow-spiritual-bypassing.mdx`
11. `shadow-work-foundation.mdx`
12. `spiritual-line-shadow-integration.mdx`

## Module Integration Pattern

Wrap entire module body content in `<ShadowGate>`:

```mdx
import CrisisResourceBanner from '@site/src/components/CrisisResourceBanner';
import ShadowGate from '@site/src/components/ShadowGate';

<CrisisResourceBanner />
<ShadowGate>

## 🧠 Learn
...module content...

</ShadowGate>
```

## Constraints
- No new npm dependencies
- Infima theme variables only
- sessionStorage not localStorage (per-session, not persistent)
- Must not interfere with CrisisResourceBanner or ModuleMeta