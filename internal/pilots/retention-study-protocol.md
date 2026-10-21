---
id: retention-study-protocol
title: Self-Paced Retention Study Protocol
sidebar_label: Retention Study Protocol
description: Protocol for the FR-15 study. Learners complete one QuickStart on their own, then take a delayed retention test at least 7 days after the last module.
tags: [pilot, retention, fr-15, fr-19]
---

## Self-Paced Retention Study Protocol

**Status:** draft for human review (P5-01, #530). Supersedes the facilitated
runbook in `pilot-runbook-20-40.md` (#20). Recruiting, consent, item
validation and interpretation are `[HUMAN-REQUIRED]`.

## 1. Question

After completing one QuickStart on their own, how much do learners still
remember at least 7 days after their last module? This is the headline
outcome of FR-19. It is a delayed test, not an in-session score, because
performance during study is a poor guide to lasting learning (Soderstrom &
Bjork, 2015).

Secondary questions, reported separately:

- Did learners choose the right starting QuickStart (absorbs `prod-04`)?
- How useful and comfortable did learners find the material? (Self-report;
  never the headline, since it tracks satisfaction more than learning:
  Sitzmann et al., 2010.)

## 2. Design

- **Self-paced.** No facilitator, no live sessions. Learners work in their
  own browser on their own schedule.
- **One QuickStart per learner.** Which one is the learner's own choice
  from the hub (FR-03 stays descriptive, never placement). Report results
  per QuickStart and per stage site.
- **Comparison.** Phase 1 is single-arm: scores are described with an
  effect size and interval against the pre-test of the same learner.
  A between-site comparison (P9-06) is a later, separate analysis.
- **Sample.** Target 20–40 adults. Too small for efficacy claims, so
  results are labelled **preliminary** (see §8).

## 3. Timeline

| When | Step |
| --- | --- |
| Day 0 | Consent, short baseline quiz (pre-test) on the chosen QuickStart's content, QuickStart choice recorded |
| Days 0–N | Learner completes the QuickStart at their own pace; last-module date is recorded by the learner |
| Last module + ≥7 days | Delayed retention test, same construct, different items (see §5) |
| Same day as delayed test | Self-report survey (separate form) and the "right QuickStart?" question |

A reminder is sent by the researcher on day 7 after the learner reports
finishing. Learners who test earlier than 7 days are excluded from the
headline analysis and kept in a sensitivity analysis.

## 4. Participants and Safety

- Adults 18+, recruited by a human. No clinical claims; this is not therapy.
- Exclude the shadow-work QuickStart from this study (self-paced shadow work
  needs the stop rules and screening in the safety skill; run it only after
  `safety-review` signs off).
- Participation is voluntary and withdrawable at any time, with data
  deleted on request.

## 5. Measures

**Headline: delayed retention score.** Percentage correct on the delayed
test. Items are retrieval questions (free recall and short application),
drafted with AI and validated by a human (P5-02, `[HUMAN-REQUIRED]`).
Two parallel item sets (A and B) are used so the pre-test and delayed test
differ; set assignment is randomised per learner.

**Process (from the learner's browser, shared only by export, P10-03):**
reviews completed within 2 days of due, calibration gap, pathway
completion, return within 7 and 30 days.

**Self-report (separate table, never headline):** perceived usefulness,
comfort with the stage language, and "Did you pick the right starting
QuickStart?" (yes / no / unsure, plus a free-text reason).

## 6. Data Handling

- No identifiers in the data file; learners get a random participant code.
- Process metrics leave the browser only through the learner-controlled
  export, after they see its contents (NFR-05).
- No reflections or card answers are collected. Test responses are entered
  into the test form only.
- Store data outside the repository. Publish only aggregates.

## 7. Analysis

- Primary: mean delayed score with a 95% confidence interval; standardized
  effect size (Cohen's d, paired, with interval) of delayed vs. pre-test.
- Report per QuickStart and per stage site, with n shown. Suppress cells
  with n < 5.
- Self-report reported in its own table with a clear label.
- Mis-placement: share answering "no" to the right-QuickStart question.
- Dropout reported at every step; analyse completers and intention-to-treat.

## 8. Reporting Rules

- Label the report **preliminary**. One study of this size supports no
  efficacy claim; state limits (self-selection, no control, small n).
- Never present self-report as evidence of learning.
- Record deviations from this protocol in the report (P5-03, absorbs #21).

## 9. Review Checklist

- [ ] Protocol reviewed by a human `[HUMAN-REQUIRED]`
- [ ] Consent wording approved
- [ ] Sample size and exclusion rules accepted
- [ ] Hand off to P5-02 (item drafting and validation)

## References

- Soderstrom, N. C., & Bjork, R. A. (2015). Learning versus performance: An
  integrative review. *Perspectives on Psychological Science*, 10(2), 176–199.
- Sitzmann, T., Ely, K., Brown, K. G., & Bauer, K. N. (2010). Self-assessment
  of knowledge: A cognitive learning or affective measure? *Academy of
  Management Learning & Education*, 9(2), 169–191.
