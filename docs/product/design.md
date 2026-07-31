# Product Design

> Point-in-time architectural snapshot from the product-discovery session
> that produced `discovery-draft.md` and `specification.md`. **`ARCHITECTURE.md`
> at repo root is the living, continuously-updated reference — this file does
> not replace it.** Use this file to see how the personas/requirements above
> map onto the architecture as of this discovery pass; use `ARCHITECTURE.md`
> for the current, authoritative system design.

## How personas map onto the architecture

| Persona (discovery-draft.md) | Architectural surface |
|---|---|
| Amber-Anchored Learner, Rational Achiever, Pluralistic Integrator, Integral Practitioner | Stage frontmatter tag (`ARCHITECTURE.md` § Content Model) → filtered into `docs/quickstarts/*.mdx` sequences → rendered as static MD/MDX, no personalization server-side (§ No Server-Side Runtime) |
| Line-Focused Specialist Learner | Line frontmatter tag, orthogonal to stage tag — same content model, different quickstart family (`*-line-development.mdx`) |
| Facilitator / Guide | Facilitator Note admonitions embedded per-module (content-as-data, not a separate facilitator app or portal) |

No persona receives server-computed personalization or algorithmic
placement — this is a deliberate architectural consequence of
`product-charter.md`'s scope-out (no algorithmic grading/placement, no
personalized AI coaching) combined with `ARCHITECTURE.md`'s "No Server-Side
Runtime" decision. Routing is entirely learner self-selection through static
navigation (QuickStarts, nav labels), not computed.

## Requirement → architecture traceability

- **FR-01 (stage/line/tier tags)** → `ARCHITECTURE.md` § Content Model +
  § Key Architectural Decisions #2 (Content as Data); enforced by
  `scripts/validate-frontmatter.js` in `ci-quality.yml`.
- **FR-02 (QuickStarts)** → `docs/quickstarts/` directory, sidebar wiring in
  `sidebars.js`; no dedicated architectural layer beyond standard Docusaurus
  docs routing.
- **FR-03 (descriptive self-assessment)** → client-side only, no persisted
  learner data server-side (consistent with No Server-Side Runtime); see
  `docs/features/rp-106-progress-self-assessment/design.md` for the
  feature-level design this references rather than duplicates.
- **FR-04 (retrieval practice)** → `src/components/RetrievalPrompt`,
  session-only state (no persistence — see
  `docs/features/lsc-01-retrieval-prompt/specification.md`'s explicit
  "sessionStorage only" non-functional requirement).
- **FR-05 (safety tiering)** → `ARCHITECTURE.md` § Key Architectural
  Decisions #3 (Safety Tier 2 Protocol).
- **NFR-02 (accessibility)** → `scripts/audit-a11y.mjs` /
  `scripts/lighthouse-audit.mjs` exist but are not wired into
  `ci-quality.yml` — flagged as a known gap in both `specification.md` and
  the `accessibility-checker` skill, not silently closed here.
- **NFR-04 (fork portability)** → `ARCHITECTURE.md` § Fork Architecture;
  gated by the `fork-readiness-audit` skill before any fork is scaffolded.

## Open architectural questions from this discovery pass

- The riskiest assumption in `discovery-draft.md` (learners can accurately
  self-locate their stage/line) has no architectural mitigation beyond the
  descriptive self-assessment (FR-03) — there is no telemetry or feedback
  loop measuring actual placement accuracy, because the No Server-Side
  Runtime decision means no learner-level data is collected. This is a
  product-level tension worth surfacing to the user: closing the loop on
  placement accuracy would require either a server-side component (a bigger
  architectural change) or a purely qualitative signal (facilitator/pilot
  feedback, per `internal/pilots/`).

## References

- `ARCHITECTURE.md` (living reference — defer to this over this file)
- `docs/product/discovery-draft.md`
- `docs/product/specification.md`
