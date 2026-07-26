# Product Specification

> Product-wide requirements and acceptance criteria. This file does not
> restate `internal/implementation/product-charter.md` — it translates the
> charter's mission/scope/constraints into testable requirements. Treat the
> charter as the authoritative source for mission, scope, and constraints;
> treat this file as the authoritative source for how those are verified.

## Problem

Adult learners have uneven developmental capacity across cognitive,
emotional, moral, interpersonal, somatic, and spiritual lines, and no
self-directed, evidence-grounded, AQAL-structured platform exists to help
them close that gap without requiring a clinician or live facilitator. See
`docs/product/discovery-draft.md` for the persona/JTBD detail behind this
problem statement.

## Scope

Scope-in and scope-out are defined in `product-charter.md`'s "Scope In/Out"
section and are not repeated here. The one addition this file makes:
**every functional requirement below must be traceable to something in that
scope-in list** — a requirement that isn't should be flagged for charter
amendment rather than implemented as scope creep.

## Functional Requirements

- **FR-01 — Stage/line-tagged content.** Every module carries frontmatter
  tags identifying its stage, line, and safety tier (see `aqal-tagger`
  skill). Acceptance: `npm run validate-frontmatter` passes with zero tag
  errors.
- **FR-02 — Stage-transition and line-development QuickStarts.** Learners can
  self-select a pathway matching their stage-transition or line focus.
  Acceptance: every `docs/quickstarts/*.mdx` file passes the
  `quickstart-validator` skill's checks (module links resolve, tags match
  stated stage/line, sequence matches stated rationale).
- **FR-03 — Descriptive, non-ranking self-assessment.** Learners can locate
  their own approximate stage/line starting point without a numerical score
  or ranking against norms (see `docs/features/rp-106-progress-self-assessment/`).
  Acceptance: assessment output uses developmental language only, no
  scores/percentiles/ranks.
- **FR-04 — Retrieval practice at module end.** Every module ends with a
  spaced-retrieval mechanism (see `docs/features/lsc-01-retrieval-prompt/`
  and the live `RetrievalPrompt` component). Acceptance: modules use
  `<RetrievalPrompt>`, not static Q&A text.
- **FR-05 — Safety tiering.** Every module declares a Safety Tier (1 or 2)
  consistent with its actual content (see `safety-classification` skill).
  Acceptance: `npm run validate-frontmatter` passes with zero tier-consistency
  warnings.
- **FR-06 — Audience-appropriate vocabulary.** Learner-facing copy matches
  the target audience's stage vocabulary (see `developmental-vocabulary`
  skill). Acceptance: no cross-stage jargon leakage (e.g. canonical AQAL
  terms in Amber-facing copy) — checked at content-review time, not
  automatable today.

## Non-Functional Requirements

- **NFR-01 — No server-side runtime.** Static Docusaurus site; see
  `ARCHITECTURE.md` § Key Architectural Decisions.
- **NFR-02 — Accessibility.** WCAG 2.1 AA on all learner-facing pages (see
  `accessibility-checker` skill). Not yet wired into CI — known gap, tracked
  there, not silently closed by this spec.
- **NFR-03 — Build integrity.** `npm run build` passes with zero broken
  internal links (`onBrokenLinks: 'throw'`) on every merge to `main`.
- **NFR-04 — Fork portability.** Content and config can be forked per
  `ARCHITECTURE.md` § Fork Architecture and `fork-readiness-audit` skill
  gates.

## Out of Scope

Per `product-charter.md`: clinical therapy, live facilitator certification,
algorithmic developmental placement/grading, live facilitation/recruitment
(`[HUMAN-REQUIRED]`), personalized AI coaching. Do not treat a request that
falls in this list as an implicit FR above, even if it would be a natural
extension — surface it to the user as a charter-scope question instead.

## Acceptance Criteria (roll-up)

A product-level release is acceptance-ready when: all FRs above pass their
stated acceptance check, `npm run build` passes, `docs/quality/` gates pass
(see that directory for the current gate list), and no `[HUMAN-REQUIRED]`
item has been silently auto-approved.

## References

- `internal/implementation/product-charter.md`
- `internal/implementation/raci.md`
- `docs/quality/`
- `ARCHITECTURE.md`
