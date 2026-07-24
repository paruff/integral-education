# Discovery Brief — Moral Line Developmental Profile Assessment

**Issue:** #177 (GH Issue #90)
**Date:** 2026-07-23
**Status:** Draft

## JTBD (Job to Be Done)

When I'm curious about how I reason through moral dilemmas — not just what moral positions I hold, but **how** I think about right and wrong — I want to engage with structured moral dilemmas that reveal my reasoning patterns across both the justice and care tracks, so that I can locate myself developmentally without needing a clinician or an ethics professor to interpret my responses.

## User Need

A self-guided learner exploring the Moral line wants:
1. To distinguish **how** they reason (not just **what** they conclude)
2. To encounter both justice-track and care-track dilemmas (not just Kohlberg's justice-only model)
3. To understand the gap between their stated moral convictions and their actual moral action (the Narvaez/Rest action gap)
4. To receive personalized module recommendations based on their profile
5. To have all results stay private (no persistent storage)

## Why DIT Methodology (Not Kohlberg Interviews)

The Defining Issues Test (Rest, 1979; Rest et al., 1999) has been validated with over 50,000 participants and correlates reliably with moral development stage. It uses **scenario-based rating tasks** where learners rate the importance of different considerations — far more practical for web-based self-assessment than Kohlberg's original method of posing open-ended dilemmas and scoring responses by trained raters.

Rest's three-schema model (personal interest, maintaining norms, postconventional) provides a reliable scoring framework that the component can implement programmatically.

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| DIT methodology (rating-based) | Empirically validated; implementable as a web component |
| Dual-track (Justice + Care) | Gilligan's care track is missing from the original DIT; integral moral development requires both |
| Moral Courage Gap section | Narvaez/Rest action gap is a critical developmental insight; distinguishes moral reasoning from moral action |
| Three condensed dilemmas (not 5-6 original DIT) | Web-based self-assessment — keep completion time under 20 minutes |
| No persistent storage | Privacy; results in browser session only; Export to Journal for learners who want to keep their results |

## References

- Rest, J. (1979). *Development in Judging Moral Issues.*
- Rest, J., Narvaez, D., Bebeau, M., & Thoma, S. (1999). *Postconventional Moral Thinking.*
- Rest's three moral schemas: personal interest (Stages 2/3), maintaining norms (Stage 4), postconventional (Stages 5/6)
- Narvaez, D., & Rest, J. (1995). The four components of acting morally.
- Gilligan, C. (1982). *In a Different Voice.*
- Skoe, E. E., & Diessner, R. (1994). Ethic of care, justice, and identity.
- Walker, L. J. (1989). A longitudinal study of moral reasoning.