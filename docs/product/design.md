# Product Design

> **Status:** Draft, awaiting design review (gate record: [review.md](review.md))
> **Date:** 2026-10-24
> **Implements:** [specification.md](specification.md) (what to build), which
> serves [intent.md](intent.md). Tasks: [plan.md](plan.md).
>
> This file says **how** the spec is implemented: the decision, how data
> moves, the trade-offs and the options rejected. `ARCHITECTURE.md` at the
> repo root describes the system **as built**. When a design here ships,
> update `ARCHITECTURE.md` in the same PR. Feature-level designs in
> `docs/features/<slug>/design.md` link to the section here they implement.
>
> Replaces the 2026-10-02 discovery snapshot, which predated the
> self-paced rebuild of the spec (its FR numbers no longer match).

Each section uses the same parts: **Decision**, **How it works**,
**Trade-offs**, **Rejected**, **Plan**. Add an **Open** line only when
something is undecided.

## 1. Constraints every design inherits

- **Decision:** static site, no server, no accounts (NFR-01). Learner data
  stays in the learner's browser (NFR-05). Content is Markdown/MDX with
  frontmatter, so it can be validated, filtered per site and reviewed in a PR.
- **Trade-offs:** no server means no per-learner data, so learning is
  measured locally, by learner-controlled export, or by aggregate counts (§9).
- **Rejected:** accounts or a backend for progress sync. It would add a
  security surface and personal data for a gain the spec doesn't ask for.
- **Details:** `ARCHITECTURE.md` § Key Architectural Decisions.

## 2. Content model and validators

- **Decision:** every rule that can be checked mechanically is a script in
  `scripts/check-*.mjs` or `scripts/validate-frontmatter.js`, run by
  lefthook locally and by the same lefthook command in CI. Judgment calls
  stay in skills (`aqal-tagger`, `developmental-vocabulary`).
- **How it works:** author edits a module → lefthook pre-commit (build,
  frontmatter, AQAL tags, retention, toolkit, QuickStarts, H1,
  placeholders, conflicts) → PR → CI runs `npx lefthook run pre-commit
  --all-files` → same result.
- **Trade-offs:** one hook definition for local and CI means a hook change
  is a CI change, so it goes through the same review.
- **Rejected:** pre-commit.ci as a second hook manager (P11-01);
  warnings-only validation (P6-01 made warnings fail CI).
- **Plan:** P6, P11-02.

## 3. Retention components

- **Decision:** retrieval, spacing, calibration and mixed review are React
  components used in MDX, with state in `localStorage` through one hook.
- **How it works:** `<RetrievalPrompt>` at the end of each module
  (FR-04) → `RetrievalCard` asks for an attempt, then shows the model
  answer and criteria **before** the learner rates it (FR-10) →
  `useProgress` stores ratings and the next due date → the progress page
  lists due reviews → `MixedReview` runs due cards interleaved across the
  pathway's modules (FR-05). `src/utils/learnerData.js` owns every key:
  `iel_` prefix plus the site's `projectName` (NFR-06), with a one-time
  copy of the old `iel_progress_v1` data for the main site. The learner can
  view and clear it all on the progress page (NFR-05).
- **Trade-offs:** local storage means reviews are per device and lost if
  the learner clears the browser. Mastery gates are advisory (FR-07),
  because a static site can't enforce them.
- **Rejected:** `sessionStorage` (no spacing across days); a shared key
  across sites (stage sites on one origin overwrite each other).
- **Plan:** P2, P9-02.

## 4. Toolkit enforcement in every module

- **Decision:** the Make It Stick toolkit (FR-08 to FR-12, FR-14) is
  enforced by the `module-authoring` checklist and by
  `scripts/check-toolkit.mjs` for its mechanical parts: generation
  questions, model answers on cards, no learning-styles or reread-as-study,
  inline evidence tiers, an accessible diagram.
- **Trade-offs:** elaboration quality, load and whether a diagram explains
  can't be checked by a script; they stay checklist review items.
- **Plan:** P3. Module edits are batched with P8-03 so each module is
  touched once.

## 5. Self-paced pathways

- **Decision:** each QuickStart supplies the structure a teacher would:
  an if-then planning prompt, visible progress, pace, a pathway map, a mixed
  review at least every three modules and a threshold per step (FR-13,
  FR-05, FR-07). `scripts/check-quickstarts.mjs` checks them, and each
  step's threshold must match the module's own Assess threshold.
- **How it works:** QuickStart step tables drive the module footer "Next"
  links, so the path order lives in one place.
- **Rejected:** enforced gates between modules. A static site can't
  enforce them, so FR-07 gates are advisory and say so.
- **Plan:** P4.

## 6. Visuals

- **Decision:** diagrams are Mermaid (`@docusaurus/theme-mermaid`), next to
  the text they explain, with alt text and a text description when they
  carry more than one idea (FR-16).
- **Trade-offs:** text-based diagrams can be reviewed in a PR and reused on
  every site; SVG stays allowed where Mermaid can't draw the structure.
- **Rejected:** stock, ornamental or decorative images (coherence effect,
  FR-16 rule 1).
- **Plan:** P8.

## 7. Stage sites

- **Decision:** stage sites are built from this repo, one Docusaurus config
  per site, into one Pages artifact (FR-18; P9-01 decision in
  `STAGE-SITES.md`).
- **How it works:** `sites/sites.json` lists each site's docs and
  `published` flag → `scripts/prepare-site.mjs` assembles the shared docs,
  then applies `sites/<id>/overrides/docs/` (whole-page rewrites) and
  `sites/<id>/patches/` (text replacements that fail the build if the
  shared text changes) →
  `scripts/build-sites.mjs` builds each config → link and vocabulary checks
  run against baselines that can only shrink (`--strict` needs both at 0 to
  launch). The main-site hub links to published sites, and each stage site
  links back with "choose again".
- **Trade-offs:** shared modules must be neutral or overridden per site;
  overrides can drift from the shared module, so the toolkit is applied to
  the shared module first.
- **Rejected:** fork repos per stage (deferred until a site needs its own
  owners or domain).
- **Plan:** P9.

## 8. Stage nomenclature

- **Decision:** one internal stage-name set (Archaic, Magical, Egocentric,
  Traditional, Rational, Pluralistic, Integral), decided in the
  `developmental-vocabulary` skill. Learners never see it (FR-17).
- **How it works:** new values are accepted alongside the old ones → code
  and frontmatter values migrate → docs and URLs are renamed per stage with
  redirects from the old URLs → old values are removed. Each step is one PR
  to `main`.
- **Trade-offs:** redirects keep old links working, at the cost of a
  redirect list to maintain.
- **Rejected:** colour names as identifiers (kept only as aliases in the
  crosswalk and in citations of Spiral Dynamics or Wilber);
  Premodern/Modern/Postmodern as names or groupings.
- **Plan:** P12.

## 9. Metrics and analytics

- **Decision:** learning is judged on a delayed retention test (FR-15).
  Process metrics are computed in the browser and shown to the learner.
  Site-wide counts come from cookieless, aggregate-only analytics
  (FR-19; [analytics-decision.md](analytics-decision.md)).
- **How it works:** `useProgress` data → metrics computed on the progress
  page (P10-02) → learner-controlled export for studies (P10-03).
  GoatCounter loads only in the deploy build on `main` (`analytics.js`) and
  counts page views plus two hub events.
- **Trade-offs:** return rates stay local only; switch and completion rates
  from analytics are proxies and are labelled as such.
- **Rejected:** no analytics (P9-06 would have no data); tools that set
  cookies or device storage, or keep a visitor ID.
- **Plan:** P5, P10.

## 10. Deterministic build and CI

- **Decision:** what passes locally passes in CI, and what deploys is what
  was tested.
- **How it works:** Node pinned by `.nvmrc`; actions pinned to commit SHAs;
  CI runs the lefthook hooks, `npm test` and `npm run build:sites`, then
  uploads the site artifact. `deploy-gh-pages.yml` deploys that artifact
  from the successful CI run on `main` and never rebuilds. External links
  are checked nightly, not in the PR gate.
- **Rejected:** rebuilding on deploy (untested output); network calls in
  the PR gate (flaky).
- **Plan:** P11.

## References

- [specification.md](specification.md), [plan.md](plan.md),
  [review.md](review.md)
- `ARCHITECTURE.md` (as built), `STAGE-SITES.md` (stage-site decision)
