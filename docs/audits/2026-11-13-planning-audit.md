# Planning Audit, 2026-11-13

> **Status:** Phase 1 (audit) reviewed by the Product Owner on 2026-11-13: all findings approved. Phase 2 (doc revisions) is applied in the same branch; see section 7. Phase 3 (GitHub) is not drafted or applied.
> File and line references below describe the repo **before** Phase 2. Phase 2 moved `docs/AUDIT_AND_IMPLEMENTATION_PLAN.md` and `docs/v0.3.0-alpha-todo.md` to `docs/product/archive/` and changed line numbers in the planning docs.
> **Scope:** planning only. The 13-section module rubric was skipped, as asked.
> **Checked against:** `main` at `e4ba758`, 17 open issues, 4 milestones, all closed issues from #409 up.

## What could not be checked

| Gap | Why | Effect |
| --- | --- | --- |
| Project #6 board (Status and Gate of each item) | The session's GitHub access is REST-only and repo-scoped. `gh project` needs GraphQL and returned HTTP 403 | Every statement below about an issue is about open/closed state, labels and text. Board Status is **UNVERIFIED** |
| Research statistics against their sources | `api.crossref.org` is outside the session's allowed network | Bibliographic records and effect sizes are **UNVERIFIED** by this audit (finding 16) |
| Site traffic | No access to the GoatCounter dashboard | Whether the P9-06 comparison will have enough visits is **UNVERIFIED** (finding 2) |

## 1. Proposed structure

**The premise needs correcting first.** The repo already has a single intent → spec → design → plan chain in `docs/product/`, accepted on 2026-10-24 (`docs/product/review.md:46-47`). `docs/AUDIT_AND_IMPLEMENTATION_PLAN.md`, `docs/v0.3.0-alpha-todo.md` and `internal/implementation/backlog.md` each carry a "Superseded 2026-10-02" banner pointing to `docs/product/plan.md`. None of the 40 folders in `docs/features/` maps to an open issue. So this is not a consolidation job. It is closing the gaps between the existing chain and the prei pattern.

Compared with prei (`intent.md`, `spec.md`, `plan.md` at its root, read on 2026-11-13):

| prei does | integral-education today | Proposed |
| --- | --- | --- |
| Plan is a list of **goals**, each with an Outcome, a Proof and a milestone of the same name | Plan is 13 phases (P0–P12). Goals G0–G7 exist only as GitHub issues, and the P → G mapping lives in issue bodies | Keep every P-ID. Add a short "Goals" table at the top of `plan.md`: goal, outcome, proof, its P rows, its tracking issue, its milestone |
| "One goal at a time", and a **Later** section with no milestone | Seven open human steps across four goals at once; P7 is an unnumbered list | Add the one-goal rule and a "Later" section. P7 and the second and third stage sites move there |
| Each row has a **Spec** column (FR and AC IDs) | FR IDs appear in some task texts only; P12 has none | Add a Spec column to the open rows |
| The finished plan is archived (`features/functioning-prei/`) and the live plan holds open goals | 41 of 51 rows are closed and still inline | Move closed phases (P0, P1, P2, P4, P6, P8, P11) to `docs/product/archive/plan-2026-10.md`, IDs and links unchanged |
| Old plans live in `docs/archive/` | Superseded plans sit in `docs/` and are built into the public site | Move them to an archive folder outside the published docs (finding 13) |
| Approval is the merge of the PR that changes the file | Approval is a status line plus a row in `review.md` | Keep `review.md`. It is stricter than prei and already in use |
| Chain at the repo root | Chain in `docs/product/` | Keep `docs/product/`. `AGENTS.md` and every issue point there |

## 2. Findings, ranked by impact

### 1. The "baseline before launch" gate was skipped, and its issue is closed without its proof

- Rule: "Metrics baseline (P10) **before** stage sites (P9)" (`docs/product/plan.md:39`); "a baseline is recorded in `docs/METRICS.md` before the first stage site launches" (`docs/product/specification.md:240-241`); `docs/product/intent.md:68`.
- Fact: Clear Thinking is published (`sites/sites.json:8`, release row `docs/product/review.md:44`, 2026-10-21). `docs/METRICS.md:5` says "structure only (P10-04, #535). **No baseline values yet.**" Analytics went live the same day (`docs/METRICS.md:6`), so no pre-launch baseline can exist.
- P10-04's proof is "Baseline recorded" (`plan.md:169`). #535 was closed as completed on 2026-10-21. P9-06 depends on it (`plan.md:157`; #529 "Depends on: #528, #535").
- **Fix:** (a) Amend the three sentences to say what is now possible: a concurrent comparison over the same 8 weeks, not a before/after. Record it as a Plan-gate decision in `review.md`. (b) New row P10-04a `[HUMAN-REQUIRED]`: fill the Baseline column of `docs/METRICS.md` with values and dates, due 2026-11-30 with the P9-06 rule. Do not reopen #535; link the new issue to it.

### 2. The P9-06 decision (due 2026-12-16) cannot be made as written

- The draft rule is "**go** if the site's completion proxy is at least the main site's and the switch rate is not high against the P10-04 baseline" (`plan.md:157`). "Not high" has no number, the baseline is empty (finding 1), and there is no minimum number of visits below which the answer is "inconclusive".
- Three human prerequisites are open with 33 days left: the rule itself (due 2026-11-30), the devtools check and export check in P10-01a (`docs/product/analytics-decision.md:91-94`), and three audience readers for P9-05 (`plan.md:156`).
- Reader-driven copy changes during the window confound the comparison. The plan logs them (`plan.md:156`) but does not limit them.
- **Fix:** rewrite the P9-06 proof as: a numeric switch-rate threshold, a minimum visit count per arm, and a fourth outcome "extend 4 weeks" when the minimum is not met. Remove P9-05 from P9-06's dependencies and freeze override copy until 2026-12-16 (readers' changes land after the decision). **Needs the owner's numbers (question 2).**

### 3. The first stage site is published without the FR-17 acceptance

- `specification.md:188-191`: acceptance needs "at least three readers from the target audience" and marks it `[HUMAN-REQUIRED]`. `plan.md:156` lists the readers as "Remaining" on a site that is already "built and published". No reader row exists in `review.md`.
- **Fix:** record the choice honestly. Either add a `review.md` row stating the site was released before the reader check, as a measured trial, or set `published` to `false` until the readers are done. The second restarts the 8-week clock. **Owner decides (question 3).**

### 4. The critical path runs through one human, not through the agents

Open rows and who can do the remaining work:

| Row | Issue | Remaining work | Who |
| --- | --- | --- | --- |
| P10-01a | #586 | Devtools check; is the export enough | Human, short |
| P10-04a (new) | none | Baseline values | Human, short |
| P9-06 | #529 | Write the rule by 2026-11-30; decide by 2026-12-16 | Human |
| P9-05 | #528 | Recruit and run 3 readers; naming call | Human, depends on other people |
| P3-03 | #519 | Check every Tier A tag (48) and at least 10% of the 207 B and C tags, so at least 69 citations (`docs/product/p3-03-citation-check-worklist.md:5`) | Human, the largest block |
| P5-01 | #530 | Consent wording, recruitment route, form tool | Human |
| P5-02 | #531 | Validate 28 items | Human |
| P5-03 | #628 | Recruit 20–40 adults, run a study with a delay of 7 days or more, report | Human, then Opus |
| P12-02 | #629 | Rebase and land one branch | Agent, unblocked today |
| P12-03, P12-04 | #630, #631 | Six rename PRs, then cleanup | Agent, blocked until P9-06 |

Only one row can be handed to a cheaper model now. The plan gives no order for the seven human rows.

- **Fix:** state an order in the plan. Suggested: P10-01a → P10-04a and the P9-06 rule (by 2026-11-30) → P3-03 in batches of about 15 → P9-06 decision (2026-12-16) → P5-01 → P5-02 → P5-03. Split the agent-doable parts out of human rows so they do not wait (see finding 15).

### 5. "The next release" is not defined anywhere

- `package.json:3` is `0.0.0`. `CHANGELOG.md` has `[Unreleased]` above `[0.2.0-alpha] — 2026-07-25`. `docs/v0.3.0-alpha-todo.md` is superseded. The four milestones (6C, 6D, 6E, 7A) are open with 0 open issues and no due date. No open issue has a milestone.
- `review.md:24` defines a release as a stage site set to `published: true` or a version in `CHANGELOG.md`, but no version is planned.
- **Fix:** name the next release and give it a milestone. Suggested: `v0.3.0-alpha` = everything in `[Unreleased]` plus the recorded P9-06 decision. **Owner decides (question 1).**

### 6. Goals and plan rows disagree

- `plan.md:192` says P12's goal is "G6 (#555)". #555's supporting list has P6-01 to P6-04 only, all ticked, and the issue is still open.
- #554 (G5) lists "`[x] #21 P5-03`". #21 was closed as a duplicate on 2026-10-24; the plan row is #628 (`plan.md:105`), which is open. G5 therefore shows P5-03 as done.
- #557 is titled "goals G0–G7" and its body says "Clear Thinking is *not* live yet … `"published": false`", which `sites/sites.json:8` contradicts.
- **Fix:** put the goals table in `plan.md` (section 1) and make the issue bodies copies of it. Phase 3 lists the edits.

### 7. The spec promises a retention result per stage site; the plan's study has no stage-site arm

- `specification.md:227`: headline target "Effect size with interval, reported per stage site".
- `plan.md:157`: "The retention study (P5-03) covers one QuickStart and has no stage-site arm". `plan.md:103`: "single-arm paired analysis (a between-site comparison is a later analysis)".
- **Fix:** change the FR-19 target to "reported for the studied QuickStart; per-site comparison is a later study". This is a Spec-gate change.

### 8. P7 has no IDs, no issues, and depends on a superseded file

- `plan.md:120` says "Not yet issued". `plan.md:126` and `plan.md:132` refer to "items 11, 13–18 and 22–25" and "items 26–29" of `docs/v0.3.0-alpha-todo.md`, which says "Kept for history".
- **Fix:** copy those items into a "Later" table in `plan.md` with IDs P7-01 onward and "no issue yet". The old file is then truly history and can move to the archive.

### 9. P12 traces to no requirement

- `specification.md` has no requirement on stage nomenclature (no match for "nomenclature" or "stage name"). P12-02 to P12-04 (#629–#631) therefore have no spec ID. `review.md:45` records the decision as a Design gate only.
- **Fix:** add one requirement (suggested NFR-07, "one internal stage-name set; old URLs redirect; stored progress survives a rename"), taken from the proofs already in `plan.md:212-214`. Spec-gate change.

### 10. Gate records are out of step

- `docs/product/design.md:3` is "Draft, awaiting design review", while `plan.md:3` is "Accepted" and every phase links to a design section. `review.md:22` says an approved plan needs "a design section" per task.
- `review.md:48` still reads "Pending … this PR" for the 2026-11-09 plan rewrite. That PR (#663) merged on 2026-11-09.
- `review.md:46-47` link to "PR adding this file" (it is #632).
- **Fix:** the owner approves or returns `design.md` and updates the three rows. An agent must not write "Approved" (`review.md:27-29`).

### 11. Stale statements in the chain

| Where | Says | Now |
| --- | --- | --- |
| `intent.md:23`, `intent.md:62` | "Only 59 of 77 modules end with spaced retrieval" | 77/77 (`node scripts/check-retention.mjs`, run 2026-11-13). `specification.md:121-122` also says only 8/77 worked on 2026-10-18, so the two files disagreed even then |
| `intent.md:67` | Pathway maps "0 / 13" | P8-02 (#524) closed 2026-10-19 |
| `intent.md:69` | Stage sites live "0" | 1 |
| `specification.md:104` | "today 27/77 pass" | 77/77, 0 warnings (`node scripts/validate-frontmatter.js`, run 2026-11-13) |
| `specification.md:247` | `audit-a11y.mjs` "is not yet run in CI" | It runs (`.github/workflows/ci-quality.yml:59`) |
| `STAGE-SITES.md:16` | "built and checked in CI but not published: `published` stays `false`" | `sites/sites.json:8` is `true` |

- **Fix:** date the "Today" column in `intent.md` (as of 2026-10-02) and add a "2026-11-13" column; correct the three other lines.

### 12. Open issues whose titles or checklists no longer describe the work

- #586 "Choose and add the cookieless analytics tool": chosen and added (`review.md:43`). Its five checkboxes are all unticked. What remains is the human check.
- #528 "Launch the first stage site: rewrite…; neutral or per-site shared modules": launched; decided as per-site overrides (`plan.md:156`). What remains is the readers and the name.
- #529 "…on FR-19 after 8 weeks": the plan now says engagement proxies only (`plan.md:157`).
- #586, #531 and #628 carry `agent:claude-code` although the remaining step is human. `AGENTS.md` says labels say who.
- **Fix:** retitle and relabel in Phase 3.

### 13. Planning documents are part of the public learner site

- `docusaurus.config.js:38-43` excludes `docs/features/` only from search. The local `build/docs/` folder contains `product/`, `features/`, `audit-and-implementation-plan/` and `v0.3.0-alpha-todo/`. I did not check the live site, so the public URLs are **UNVERIFIED**.
- This file, in `docs/audits/`, will be published the same way.
- **Fix (owner's choice, question 4):** leave as is, or move planning (`docs/product/`, `docs/features/`, `docs/audits/`, the superseded plans) out of the learner-facing docs plugin. Moving them is a nav change and needs a full build.

### 14. Housekeeping on GitHub

- Milestones 6C, 6D, 6E, 7A: open, 0 open issues. Close them.
- #656 and #658 are both "Nightly link check failed". #658 has six "still failing" comments, so the one-issue rule works now; #656 is a leftover. Close #656 as duplicate.
- #658 reports one error: `https://religioustraumarecovery.com/` in `docs/modules/spiritual-line-shadow-integration.mdx` (line 463). The issue has been open since 2026-11-07. It is a support-resource link in a shadow module, so a human should choose the replacement.
- Neither nightly issue maps to a plan row. That is fine for an operational alert; no row needed.

### 15. Agent-doable work is hidden inside human rows

- P5-01 includes "Archive the superseded facilitated files … to `internal/pilots/archive/`" (`plan.md:103`). The folder does not exist; the three files it names are still in `internal/pilots/`.
- P5-01 also needs a form-tool choice. A shortlist against the criteria in `analytics-decision.md` can be drafted by an agent, as was done for analytics.
- **Fix:** split into P5-01a (archive, Haiku) and P5-01b (form-tool shortlist, Sonnet). Phase 3 drafts the issues.

### 16. Evidence

- **UNVERIFIED:** "Practice testing beats restudy (g = 0.51) across 217 studies (Adesope et al., 2017)" (`specification.md:40`). I could not reach a source. My own recollection of the paper's abstract is different on the count (I recall 272 effect sizes from 188 experiments), but I am not certain, so treat this as a prompt to re-read the paper, not as a correction.
- This citation is not in the fifteen-row human check log (`specification.md:79-95`). It falls under "Citations from protocol §7 were checked against sources on 2026-10-01" (`specification.md:64`; `internal/quality/instructional-design-protocol.md:144`), which names no checker. Given the rule that a human checks every citation (`intent.md:87-88`), record who checked the §7 set, or re-check its numbers (Adesope 217 and g = 0.51; Kulik "108 controlled evaluations", `specification.md:42`).
- The other statistics in the spec's evidence table carry a human check dated 2026-10-18 in the log. I did not re-verify them.
- 255 inline evidence tags in modules are unchecked by a human (`p3-03-citation-check-worklist.md:3`). This is already planned as P3-03.
- "Target 20–40 adults" (`plan.md:103`) has no power calculation. `internal/pilots/retention-study-protocol.md:40` says it is "too small for efficacy claims", which is honest. No change needed.

### 17. Feature specs: none open, some with stale task files

- 40 folders in `docs/features/` (the first draft of this audit said 41; that was a miscount). No open issue refers to any of them.
- `tasks.json` still shows "pending" tasks in `rp-106-…` (6), `ilp-96-…` (5) and `sw-93-…` (4), although issues #106, #96 and #93 closed on 2026-07-24 and the pages exist in `docs/maps/`. `ei-74-…` (8), `ei-90-…` (8) and `clarity-03-…` (3) also show pending tasks; whether that work shipped is **UNVERIFIED**.
- **Fix:** extend the existing `docs/features/README.md` (it lists 4 of the 40 folders): one line per folder with its issue and "shipped" or "check". A cheap-model task (Phase 3).

### 18. The board commands in `AGENTS.md` do not work in cloud sessions

- `AGENTS.md:64-67` gives `gh project item-list` and `gh project item-edit`. In this Claude Code cloud session they return HTTP 403 (GraphQL unavailable). An agent here cannot find "Next for you" or move an item.
- **Fix:** add one line to `AGENTS.md`: in cloud sessions the human moves the card; the agent says so in the PR.

## 3. Traceability

### Open plan rows → spec and issue

| Row | Spec ID in the row | Issue | Gap |
| --- | --- | --- | --- |
| P3-03 | FR-14 | #519 | none |
| P5-01 | FR-15 | #530 | none |
| P5-02 | none (FR-15 by context) | #531 | add Spec column |
| P5-03 | FR-15 (in the issue title only) | #628 | add Spec column |
| P7 (list) | none | none | finding 8 |
| P9-05 | FR-17, FR-18 (section heading only) | #528 | add Spec column |
| P9-06 | FR-19 (in the text) | #529 | finding 2 |
| P10-01a | FR-19 (section heading only) | #586 | add Spec column |
| P12-02, P12-03, P12-04 | none | #629, #630, #631 | finding 9 |

### Open issues → plan row

| Issue | Plan row |
| --- | --- |
| #519, #528, #529, #530, #531, #586, #628, #629, #630, #631 | P3-03, P9-05, P9-06, P5-01, P5-02, P10-01a, P5-03, P12-02, P12-03, P12-04 |
| #551 (G2), #553 (G4), #554 (G5), #555 (G6), #557 (Roadmap) | No row: goals are not in `plan.md` (finding 6) |
| #656, #658 | None (operational, finding 14) |

### Closed issue whose plan proof is not met

| Issue | Row | Proof | State |
| --- | --- | --- | --- |
| #535 | P10-04 | "Baseline recorded" | Not recorded (finding 1) |

All other closed P-row issues (#509–#548 except the open ones above) were not re-tested against their proofs in this pass, apart from P2-01, P2-05, P6-01 and P6-02, whose checks pass today.

## 4. Scope proposal for a reachable next release

- **Keep:** P10-01a, P10-04a (new), P9-06, P12-02.
- **Keep, but outside the release:** P3-03 (in batches), P9-05 readers.
- **Defer to "Later":** P5-01 to P5-03 until P9-06 is decided (one study, one recruiter); P7; the second and third stage sites; P12-03 and P12-04 (already wait on P9-06).
- **Close:** G6 (#555) if P12 moves to its own goal; milestones 6C–7A; #656.

## 5. Questions for the Product Owner

1. What is the next release: `v0.3.0-alpha` at the P9-06 decision (suggested), or something else?
2. P9-06 rule: what switch rate is "high", and what is the minimum number of visits per arm before a decision counts?
3. Clear Thinking was published before the three readers. Record that as a deliberate trial, or unpublish until the readers are done?
4. Should planning docs stay on the public site?
5. Is deferring the retention study (P5) until after 2026-12-16 acceptable? It delays the intent's headline measure.
6. May P12 get its own goal (G8) and requirement (NFR-07), or should it stay under G6?

## 6. Phase 3 draft (GitHub changes)

Not drafted yet. It follows the Phase 2 approvals. Nothing on GitHub changes until the owner says "apply".

## 7. Phase 2: what was applied (2026-11-13)

Owner's answers: (1) next release is `v0.3.0-alpha`; (2) use the audit's recommended P9-06 numbers; (3) the early publish is a deliberate trial, so readers read the live site; (4) remove planning docs from the public site; (5) the retention study waits until after 2026-12-16; (6) P12 gets its own goal and requirement.

| Finding | Applied in Phase 2 | Left for |
| --- | --- | --- |
| 1 | Baseline wording corrected in intent, spec, plan and `docs/METRICS.md`; new row P10-04a | Owner: record the values. Phase 3: the issue |
| 2 | P9-06 rewritten with a minimum count, a 25% threshold, one extension and a copy freeze; rule drafted in `docs/METRICS.md` | Owner: confirm the numbers by 2026-11-30 |
| 3 | Trial recorded in `review.md`, plan P9-05 and `STAGE-SITES.md` | Owner: the readers |
| 4 | "Owner's queue" in `plan.md`, in order | — |
| 5 | `v0.3.0-alpha` defined in `plan.md` | Phase 3: the milestone |
| 6 | Goals table in `plan.md`; P12 moved to G8 | Phase 3: edit #554, #555, #557; open the G8 issue |
| 7 | FR-19 target reworded | Owner: Spec gate |
| 8 | P7 is now rows P7-01 to P7-13 under "Later" | — |
| 9 | NFR-07 added | Owner: Spec gate |
| 10 | `review.md` rows corrected; pending rows added | Owner: approve or return `design.md` and the three revisions |
| 11 | Six stale statements corrected | — |
| 12 | — | Phase 3: retitle and relabel #528, #529, #531, #586, #628 |
| 13 | `docs/product/`, `docs/features/`, `docs/audits/` excluded from the docs build; superseded plans moved into `docs/product/archive/` | `docs/METRICS.md`, `AI_COST_GUIDE.md` and `MODEL_ROUTING_GUIDE.md` are still built: they are not planning docs, but say if they should go too |
| 14 | — | Phase 3: close milestones and #656. Owner: the replacement link in #658 |
| 15 | Rows P5-01a and P5-01b | Phase 3: the issues |
| 16 | New row P3-04; note in the spec | Owner: the re-check |
| 17 | Index appended to the existing `docs/features/README.md` (the audit wrongly said none existed); its two stale "Open" rows corrected (PRs #336, #337 are merged) | The six "check" folders are still unverified |
| 18 | One line in `AGENTS.md` | — |

New rows have no issue yet. `AGENTS.md` says a new row and its issue land in the same PR; here the issues wait for the owner's "apply" in Phase 3, so the rows say "no issue yet".
