---
id: instructional-design-protocol
title: Evidence-Based Instructional Design Protocol
sidebar_label: Design Protocol
tags: [quality, evidence, instructional-design, accessibility]
---

## Evidence-Based Instructional Design Protocol

This document is the canonical design and presentation protocol for contributors and Copilot when creating or revising learning content in this repository.

## Purpose

- Ensure objective, unbiased, evidence-based course development.
- Align design choices with adult learning science and cognitive psychology.
- Standardize quality, safety, and accessibility practices across all modules.

## 1) Strategic Foundations

### Core stance

- Use evidence-based instructional design, not intuition-first teaching.
- Measure success by instructional attainment, transfer, and long-term retention.
- Treat adult learner relevance and application as primary constraints.

### Pedagogical anchors

- Andragogy: self-direction, relevance, problem-solving.
- Connectivism: networked learning, peer knowledge construction, non-linear pathways.

### Design implication

- LMS pathways must balance autonomy and scaffolding.
- Avoid purely linear, instructor-led progression when learner autonomy is required.

## 2) Cognitive Science and Presentation Protocol

### Cognitive load management (CLT)

- Optimize intrinsic and germane load.
- Minimize extraneous load in content, interface, and navigation.
- Use chunking and scaffolding.
- As a rule of thumb, provide assimilation time during online instruction.

### Multimedia standards (Mayer-aligned)

- Coherence first: remove non-essential visuals/text.
- Prioritize high-signal, low-distraction presentations.
- Maintain active processing over passive consumption.

### Microlearning and video standards

- 3-5 minute micro-lessons.
- One concept per lesson.
- Key message appears early.
- In-line interaction for active recall; lock progression for critical checks when appropriate.

### Accessibility (WCAG 2.2)

- Perceivable, Operable, Understandable, Robust.
- Provide alt text, captions/transcripts, and contrast/readability support.
- Treat accessibility as cognitive-load reduction, not only compliance.

## 3) Retention Architecture

### Retrieval practice

- Require active recall tasks in each module.
- Prefer low-stakes frequent checks over passive review.

### Spacing and interleaving

- Use distributed practice over cramming.
- Start novice flows with lower switching cost (for example, AABBCC).
- Move to higher interleaving for advanced transfer (for example, ABCABC).

### LMS enforcement

- Use activity completion and restricted access gates to enforce retrieval loops.

## 4) Content Objectivity and Rigor

### Verification and claims discipline

- Validate claims against originating sources.
- Do not imply causality from observational studies.
- Flag hype terms and overstatements.
- Require citations for non-trivial claims.

### Bias control

- Require external review for complex claims.
- Explicitly include counter-evidence and competing interpretations.
- For controversial topics, guide perspective-taking and synthesis.

### Academic integrity

- Design hard-to-plagiarize assessment prompts.
- Maintain citation and attribution standards.
- Use analytics to flag integrity anomalies.

## 5) Assessment Quality Protocol

### Reliability and validity

- Align assessment to target outcomes and Bloom level.
- Standardize administration and rubric interpretation.

### Performance-based assessment preference

- Prioritize application, reasoning, reflection, and transfer.
- Use clear rubrics and criterion-level descriptors.

### Bias mitigation in grading

- Grade blind where feasible.
- Use multiple assessors for complex work when possible.
- Monitor stereotype-threat risks and language impacts.

## 6) Digital Environment and Community

### Personalized pathways

- Use completion gates and adaptive sequencing.
- Ensure foundational mastery before advanced complexity.

### Collaboration and peer assessment

- Define measurable objectives for collaborative work.
- Use netiquette and moderation standards.
- Support peer assessment with clear rubrics.

### Motivation and engagement

- Use meaningful progression signals (badges/leaderboards) responsibly.
- Focus on intrinsic motivation and relevance over novelty effects.

## 7) Evidence Base

Section 4 requires citations for non-trivial claims, and this protocol is
held to the same rule. Strength: **Strong** = replicated meta-analyses;
**Moderate** = a meta-analysis or several RCTs with caveats; **Weak** =
theory or a single study; **Contested** = credible counter-evidence exists.
Sources checked 2026-10-01.

| Protocol rule                                                    | Evidence                                                                                                                                                                                                                                                                           | Strength          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Retrieval practice; low-stakes frequent checks (§3)              | Practice testing beats restudy (g = 0.51) and no activity (g = 0.93) across 217 studies (Adesope, Trevisan & Sundararajan, 2017); Roediger & Karpicke (2006)                                                                                                                       | Strong            |
| Distributed practice over cramming (§3)                          | Cepeda et al. (2006) meta-analysis; Dunlosky et al. (2013) rate practice testing and distributed practice the highest-utility techniques                                                                                                                                           | Strong            |
| Interleaving for transfer (§3)                                   | Rohrer & Taylor (2007). Starting novices blocked (AABBCC) is a reasonable reading but less directly tested than interleaving itself                                                                                                                                                | Moderate          |
| Cognitive load management; chunking; scaffolding (§2)            | Sweller's cognitive load theory; worked-example effect (Crissman, 2006, dissertation meta-analysis, d ≈ 0.57); fade support as expertise grows (Kalyuga et al., 2003)                                                                                                              | Strong            |
| Coherence; remove non-essential material (§2)                    | Mayer, _Multimedia Learning_ (multiple experiments per principle)                                                                                                                                                                                                                  | Strong            |
| 3–5 minute micro-lessons (§2)                                    | Engagement drops after ~6 minutes across 6.9M edX sessions (Guo, Kim & Rubin, 2014). This measures engagement, not learning, so treat the length as a ceiling, not a learning effect                                                                                               | Moderate          |
| Mastery gates; foundational mastery before complexity (§6)       | 108 controlled evaluations: positive, lasting effects, largest for weaker students (Kulik, Kulik & Bangert-Drowns, 1990); Bloom (1984)                                                                                                                                             | Strong            |
| Progression signals used responsibly (§6)                        | Gamification has small effects: cognitive g = 0.49, motivational 0.36, behavioral 0.25 (Sailer & Homner, 2020)                                                                                                                                                                     | Moderate          |
| Peer assessment with rubrics (§6)                                | g = 0.31 against no assessment; similar to self-assessment (Double, McGrane & Hopfenbeck, 2020)                                                                                                                                                                                    | Moderate          |
| Autonomy balanced with scaffolding; self-paced pathways (§1, §6) | Self-paced online courses lose most learners: 52% of MOOC registrants never start (Reich & Ruipérez-Valiente, 2019). Time management, metacognition and effort regulation predict online achievement (Broadbent & Poon, 2015). Pathways need planning prompts and visible progress | Strong (the risk) |
| Andragogy (§1)                                                   | Knowles's assumptions are widely used but mostly untested as causal claims about learning outcomes                                                                                                                                                                                 | Weak              |
| Connectivism (§1)                                                | A theory of networked learning (Siemens, 2005) with little controlled evidence that designing for it improves outcomes                                                                                                                                                             | Weak / contested  |

**What this means for contributors:** rules rated Strong are requirements.
Rules rated Weak are design stances. Keep them, but don't cite them as
evidence in learner-facing claims (§4: "do not imply causality from
observational studies").

### Sources

- Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking the use of tests. _Review of Educational Research_, 87(3), 659–701. https://eric.ed.gov/?id=EJ1141817
- Brown, P. C., Roediger, H. L., & McDaniel, M. A. (2014). _Make It Stick_. Harvard University Press. (Readable synthesis of the retrieval, spacing and interleaving research.)
- Broadbent, J., & Poon, W. L. (2015). Self-regulated learning strategies and academic achievement in online higher education. _The Internet and Higher Education_, 27, 1–13.
- Cepeda, N. J., et al. (2006). Distributed practice in verbal recall tasks. _Psychological Bulletin_, 132(3), 354–380.
- Crissman, J. K. (2006). _The design and utilization of effective worked examples: A meta-analysis_ (Doctoral dissertation, University of Nebraska). https://digitalcommons.unl.edu/dissertations/AAI3208114/
- Double, K. S., McGrane, J. A., & Hopfenbeck, T. N. (2020). The impact of peer assessment on academic performance. _Educational Psychology Review_, 32, 481–509. https://link.springer.com/article/10.1007/s10648-019-09510-3
- Dunlosky, J., et al. (2013). Improving students' learning with effective learning techniques. _Psychological Science in the Public Interest_, 14(1), 4–58.
- Guo, P. J., Kim, J., & Rubin, R. (2014). How video production affects student engagement. _L@S 2014_. https://dl.acm.org/doi/10.1145/2556325.2566239
- Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. _Educational Psychologist_, 38(1), 23–31.
- Kulik, C.-L. C., Kulik, J. A., & Bangert-Drowns, R. L. (1990). Effectiveness of mastery learning programs. _Review of Educational Research_, 60(2), 265–299.
- Mayer, R. E. (2021). _Multimedia Learning_ (3rd ed.). Cambridge University Press.
- Reich, J., & Ruipérez-Valiente, J. A. (2019). The MOOC pivot. _Science_, 363(6423), 130–131. https://www.science.org/doi/10.1126/science.aav7958
- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. _Psychological Science_, 17(3), 249–255.
- Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning. _Instructional Science_, 35, 481–498.
- Sailer, M., & Homner, L. (2020). The gamification of learning: A meta-analysis. _Educational Psychology Review_, 32, 77–112. https://eric.ed.gov/?id=EJ1245270

## Required Contribution Checklist

Contributors and Copilot must verify all of the following before merge:

- AQAL mapping is explicit (quadrant, level, line, state, type).
- Module structure includes Learn, Practice, Reflect, Assess, Integrate.
- Retrieval loop (spaced and interleaved) is present.
- Evidence quality and citations are documented.
- Safety rules are included for emotionally intense practices.
- Accessibility requirements (WCAG 2.2) are satisfied.

## Related Standards in This Repository

- `internal/quality/evidence-vetting-checklist.md`
- `internal/quality/peer-review-sop.md`
- `docs/safety/shadowwork-safety-standard.md`
- `.github/copilot-instructions.md`
