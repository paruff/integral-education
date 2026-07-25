# Specification: MOD-01 — Fix Mindfulness Basics prerequisite mismatch

> **Issue #419** | Labels: P2-content, agent:content

## Problem

The Mindfulness Basics module has `prerequisites: - rational-orange-orientation` in its frontmatter but is tagged `difficulty: Beginner` and `level: Personal → Pluralistic`. Its content is genuinely foundational — breath awareness, body scanning, open monitoring, no dependency on Rational-stage cognitive capacities. The prerequisite is a copy-paste error.

## Spot-check findings

5 Core Skills modules checked for same class of error (prerequisite field that doesn't match level/category):

| Module | Difficulty | Prerequisites | Verdict |
|--------|-----------|---------------|---------|
| Mindfulness Basics | Beginner | rational-orange-orientation | ❌ Mismatch — prereq is wrong |
| Mindfulness Deepening | Beginner | rational-orange-orientation | ❌ Mismatch — prereq conflicts with Beginner difficulty |
| Cognitive Bias 101 | Beginner | None | ✓ Correct |
| Critical Thinking Foundations | Beginner | None | ✓ Correct |
| Evidence Evaluation | Beginner | None | ✓ Correct |
| Systems Thinking 101 | Intermediate | rational-orange-orientation | ✓ Correct (level-appropriate) |

## Requirements

### Functional
1. Remove `prerequisites: - rational-orange-orientation` from Mindfulness Basics frontmatter and replace with `prerequisites: None`
2. Fix Mindfulness Deepening: either remove prereq (if it should match its Beginner difficulty) or update difficulty (if prereq is intentional). Given that Mindfulness Deepening introduces advanced practices (jhana, noting), changing difficulty to Intermediate is the more accurate fix.
3. `npm run build` must pass

### Non-Functional
4. Only touch frontmatter — no content changes
5. No changes to other modules, sidebar, or config

## Acceptance Criteria

| ID | Criterion | Test Type |
|----|-----------|-----------|
| AC-01 | Mindfulness Basics prerequisites changed from `rational-orange-orientation` to `None` | unit |
| AC-02 | Mindfulness Deepening difficulty changed from `Beginner` to `Intermediate` (to match its prereq of `rational-orange-orientation`) | unit |
| AC-03 | No other module frontmatter modified | integration |
| AC-04 | `npm run build` passes | build |

## Scope
- **Modified:**
  - `docs/modules/mindfulness-basics.md` — frontmatter: `prerequisites: - rational-orange-orientation` → `prerequisites: None`
  - `docs/modules/mindfulness-deepening.mdx` — frontmatter: `difficulty: Beginner` → `difficulty: Intermediate`
- **NOT modified:** sidebar, navbar, config, any other module content
