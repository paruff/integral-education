# Specification: AGENT-01 — learner-experience/SKILL.md revision (v1 → v2)

## Problem

The `learner-experience/SKILL.md` skill file is still v1 and inconsistent with the v2 agent file (`.agents/agents/learner-experience.md`) on four critical points:

1. **Assessment scoring**: v1 has linear 0–90 aggregate score ranges; v2 agent specifies per-line modal scoring
2. **Retrieval reset logic**: v1 resets missed intervals to zero; v2 agent specifies "drop back one interval"
3. **localStorage schema version mismatch**: v1 is `version: 1` with `assessment.result` string; v2 is `version: 2` with `assessment.lineResults` object and `assessment.modalResult`
4. **Missing graceful degradation**: v1 has no `safeLocalStorageGet/Set`; v2 requires try/catch for private browsing and in-memory fallback

The agent file is correct and authoritative. The skill file needs to be revised to match.

## Requirements

### Functional
- Update `.agents/skills/learner-experience/SKILL.md` to v2, consistent with the v2 agent file
- Replace TransitionAssessment scoring: linear 0–90 aggregation → per-line modal scoring
- Replace RetrievalScheduler reset logic: "reset to zero" → "drop back one interval"
- Update localStorage schema: version 1 → version 2, `assessment.result` → `assessment.lineResults` + `assessment.modalResult`
- Add graceful degradation pattern: `safeLocalStorageGet`/`safeLocalStorageSet` with private browsing fallback
- Add error boundary pattern for component crashes
- Add `useDocusaurusContext` hook pattern for fork-safe internal links

### Non-Functional
- Skill file must be stage-neutral (no stage names in UI copy examples)
- Skill file must preserve all existing component specifications (CompetencyMap, ReadinessCheck, PracticeTimer, PartnerPrompt)
- "What not to build" section must be preserved
- MDX integration patterns must be preserved

## Acceptance Criteria
1. SKILL.md TransitionAssessment section uses per-line modal scoring, not linear 0–90 ranges
2. SKILL.md RetrievalScheduler uses "drop back one interval" logic, not reset-to-zero
3. SKILL.md localStorage schema is version 2 with `lineResults` and `modalResult` fields
4. SKILL.md includes graceful degradation pattern (safeLocalStorageGet/Set, private browsing message)
5. SKILL.md includes error boundary pattern
6. SKILL.md includes useDocusaurusContext hook pattern
7. `.agents/AGENTS.md` updated with SKILL.md revision status: v2 (or AGENTS.md updated to reflect skill revision)
8. `npm run build` passes (no regressions)