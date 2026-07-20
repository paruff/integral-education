# Specification: SAFE-02 — Enforce Tier 1 safety gate at module entry for all shadow modules

## Problem

The Shadowwork Safety Standard defines Tier 1 entry criteria: informed consent, baseline regulation (Mindfulness Basics), distress ≤ 3/10, contraindications confirmed. None are enforced. A learner can open Shadow Integration 101 from the homepage with zero prior exposure or in acute distress.

## Requirements

### Functional
- Create `src/components/ShadowGate/` component — pre-module consent and readiness check
- Gate displays four elements: (a) consent statement, (b) contraindications checklist, (c) distress self-report (1–10), (d) Mindfulness Basics confirmation
- Client-side only — uses `sessionStorage` so gate does not fire on every page reload within a session
- If distress ≥ 7: block entry, display grounding prompt and CrisisResourceBanner
- If contraindication checked: block entry, display "This practice is not suitable right now" with links to Mindfulness Basics and crisis resources
- Gate injected at top of all 12 shadow modules (filename contains "shadow")

### Non-Functional
- Infima theme variables for styling
- Keyboard accessible
- Follows existing `src/components/` patterns
- `npm run build` must pass

## Acceptance Criteria
1. ShadowGate component exists at `src/components/ShadowGate/`
2. Gate displays consent statement, contraindications checklist, distress 1–10 radio, Mindfulness Basics confirmation
3. Distress ≥ 7 blocks entry with grounding prompt + crisis banner
4. Contraindication checked blocks entry with "not suitable" message + links
5. sessionStorage acknowledgment prevents re-fire within session
6. Gate injected into all 12 shadow modules
7. `npm run build` passes