# Specification — Rational → Pluralistic Stage Progress Self-Assessment

**Issue:** #106 (GH Issue #106)
**Date:** 2026-07-24
**Component:** `RationalPluralisticAssessment.jsx`

## 1. Functional Requirements

### FR-01: Three-Section Assessment Structure
Component SHALL present three sequentially displayed sections on a single page:
- **Section A: Late-Orange Recognition** (8 scenario-based questions identifying late-Orange disillusionment signals and transition readiness)
- **Section B: Pluralistic Capacities** (12 scenario-based questions across five domains: empathy, contextual ethics, ecological awareness, dialogue, and relativism recognition)
- **Section C: Green Shadow Awareness** (6 questions identifying characteristic Green blind spots: epistemic cowardice, green-on-green aggression, consensus compulsion, relativism)

### FR-02: Scenario-Based Design (Not Self-Report Traits)
All questions SHALL use scenario-based formats — concrete situations with behavioral response options — rather than abstract trait self-ratings (e.g., not "How empathic are you?" but "In this situation, what would you most likely do?"). This addresses two known assessment distortions:
- Green-identified learners overrating themselves on Green capacities
- Orange-identified learners defensively dismissing Green capacities

### FR-03: Descriptive Profile (Not Score/Ranking)
Results SHALL present a descriptive profile with three categories:
- "Your emerging capacities" — capacities showing early signs but not yet consolidated
- "Your consolidated strengths" — capacities operating reliably across contexts
- "Your current growing edges" — capacities not yet developed or consistently accessed
No numerical scores, no stage labels, no ranking against norms.

### FR-04: Section A — Late-Orange Recognition
8 scenario-based questions assessing:
- Disillusionment with achievement-only metrics of success
- Recognition that "optimizing the system" has diminishing returns
- Experience of meaning-deficit despite external success
- Questioning whether individual autonomy is sufficient
- Awareness of systemic interconnection beyond individual agency
- Capacity to see one's own worldview as a worldview (not reality)
- Openness to perspectives that challenge rational/meritocratic assumptions
- Recognition that emotional and relational dimensions are not "soft" but developmental

### FR-05: Section B — Pluralistic Capacities
12 scenario-based questions across 5 domains (2–3 questions each):
- **Empathy & Multiple Perspectives:** recognizing emotional experience of people with different life contexts
- **Contextual Ethics:** understanding that moral reasoning is context-dependent, not rule-application
- **Ecological & Systems Awareness:** seeing interconnection beyond individual or organizational level
- **Inclusive Dialogue:** valuing collaborative meaning-making over competitive debate
- **Relativism Recognition:** understanding that all perspectives are situated, while resisting the collapse into "all perspectives are equally valid"

### FR-06: Section C — Green Shadow Awareness
6 questions identifying characteristic Green blind spots:
- Epistemic cowardice: avoiding asserting truth claims to maintain inclusivity
- Green-on-green aggression: enforcing ideological conformity within pluralistic communities
- Consensus compulsion: requiring unanimous agreement before action
- Relativism paralysis: inability to make value judgments between competing perspectives
- Performative empathy: displaying empathy as identity signal rather than genuine practice
- Spiritual bypass through "oneness": using nondual language to avoid necessary conflict

### FR-07: Results Page
Upon submission, SHALL display:
(a) Descriptive profile: emerging capacities, consolidated strengths, growing edges
(b) Domain-level breakdown across the 5 Pluralistic Capacities domains
(c) Personalized top-3 module recommendations with brief rationale for each
(d) Prominent framing: "Developmental assessments are maps, not territories..."
(e) "Consider Facilitated Support" callout if Section A responses indicate significant late-Orange crisis (depression/burnout markers) rather than developmental transition
(f) Export to Journal (clipboard copy) and Retake Assessment button

### FR-08: Facilitated Support Callout
SHALL trigger a visible callout when Section A responses suggest the learner is experiencing significant late-Orange crisis (e.g., depression, burnout, meaning-loss) rather than developmental readiness. Callout SHALL recommend seeking facilitated support and link to relevant resources without diagnosing.

### FR-09: No Persistent Storage
All responses stored only in React component state. No localStorage, no cookies, no transmission.

### FR-10: Partial Submission
Learner can submit with partially completed sections. Profile is computed from available data with appropriate caveats for incomplete sections.

## 2. Non-Functional Requirements

| NFR | Constraint |
|-----|-----------|
| NFR-01 | Follow AmberRationalAssessment component pattern (inline styles acceptable per existing pattern) |
| NFR-02 | Mobile-responsive |
| NFR-03 | Accessibility: all inputs labeled, radio buttons keyboard-accessible |
| NFR-04 | No stage labels visible to learner (use "emerging", "consolidated", "growing edge") |
| NFR-05 | Build must pass with zero errors |
| NFR-06 | Single-page assessment (not wizard) |
| NFR-07 | Docusaurus Link component for module recommendations |
| NFR-08 | Clipboard API for Export to Journal |

## 3. Module Recommendation Mapping

Existing Rational → Pluralistic modules:
- `late-orange-disillusionment` (Orange crisis signal)
- `empathy-perspective-plurality` (Pluralistic empathy domain)
- `emotional-intelligence-somatic-line` (Cross-line integration)
- `contextual-ethics-moral-complexity` (Pluralistic ethics domain)
- `ecological-systems-consciousness` (Pluralistic systems domain)
- `authentic-dialogue-collaborative-meaning` (Pluralistic dialogue domain)
- `community-belonging-collective-intelligence` (Pluralistic community domain)
- `relativism-limits-of-pluralism` (Relativism + shadow awareness)
- `pluralistic-green-orientation` (Pluralistic overview)
- `rational-to-pluralistic` (QuickStart path)

## 4. Constraints

- Component must follow AmberRationalAssessment component pattern (inline styles)
- No API calls, no external dependencies beyond React
- Must use `@docusaurus/Link` for module recommendations
- Must use Clipboard API for export (with fallback)
- No persistent storage — all state in React useState
