---
name: fork-readiness-audit
description: "Use this skill before scaffolding any fork, before opening a fork PR, or whenever verifying that pre-fork gate conditions are met. Trigger when: the Fork Scaffolding agent is about to create a fork, when checking whether a fork is ready to launch, or when any agent needs to verify which pre-fork issues remain open. Run this skill first and get a documented pass/fail before any fork scaffolding begins. A partial fork creates more remediation work than waiting."
---

# Fork Readiness Audit

Run this checklist in full before scaffolding any fork. Every gate item must pass and be documented. A single unresolved P0 or P1 gate item blocks scaffolding.

---

## Universal gates (required before ANY fork)

These must be closed before any of the three forks are scaffolded.

### Governance
| Item | Issue | Verification |
|------|-------|-------------|
| `FORK.md` exists upstream | PRE-06 | File present at repo root; contains fork philosophy, scope rules, upstream/fork content delineation |
| RACI has named owners | PRE-07 | Zero placeholder entries remain |
| Product Charter template ready | PRE-08 | Template in `.opencode/CHARTER-[fork-name].md`; to be instantiated per fork |

### Technical baseline
| Item | Issue | Verification |
|------|-------|-------------|
| H1→H2 heading fix applied | PRE-16 / UX-09 | `grep -rn "^# " docs/` returns zero results in module body files |
| Search plugin installed and working | PRE-17 / UX-14 | `npm run build` produces `search-index.json`; search bar functional in `npm run serve` |
| `npm run build` passing | — | Zero errors; zero broken links |

### Site navigability
| Item | Issue | Verification |
|------|-------|-------------|
| Homepage hero in plain language | UX-01 | No AQAL vocabulary in homepage; three audience entry points present |
| Nav restructured | UX-02 | "Start Here" present; "Modules" replacing "Learn" |
| Sidebar in 4 sub-groups | UX-04 | Stage Journeys / Skills / States / Reference categories present |

---

## Fork 1 gates — `integral-amber` (Amber→Rational)

All universal gates PLUS:

### Content gates
| Item | Issue | Status required | Verification |
|------|-------|-----------------|-------------|
| `amber-to-rational` QuickStart complete | PRE-01 | 5-step path; readiness check; transition signals present | Audit agent gap report: all 13 sections ✅ |
| `amber-mythic-orientation` at gold standard | PRE-04 | All 13 sections complete | Audit agent gap report: all 13 sections ✅ |
| `amber-shadow-moral-certainty` exists | PRE-09 | Created; Tier 2; Safety Review passed | Safety Review agent: PASS on file |

### Safety gates
| Item | Verification |
|------|-------------|
| Clinician review confirmed for ALL Tier 2 modules in inventory | Named reviewer confirmed for each module; not just "scheduled" |
| Stage-member review confirmed for `amber-shadow-moral-certainty` | Named reviewer at or near Amber CoG confirmed |
| MKT-18 safety review passed for all Amber-facing marketing copy | Human sign-off documented |

### Vocabulary gate
| Item | Verification |
|------|-------------|
| Zero prohibited vocabulary in learner-facing copy | Full vocabulary audit of all modules, nav, QuickStart, and landing pages; grep for: integral, AQAL, stage, developmental, Spiral Dynamics, worldview, postmodern, pluralistic, Green, Orange, transcend, centre of gravity |

### Governance gate
| Item | Verification |
|------|-------------|
| Fork 1 Product Charter signed | Signature present; not draft |
| Fork 1 RACI populated | Named owners for all roles |
| Fork 1 `docusaurus.config.js` prepared | UX/Frontend agent output reviewed and approved |

**Fork 1 readiness at last assessment:** ~55%

---

## Fork 2 gates — `integral-rational` (Rational→Pluralistic)

All universal gates PLUS:

### Content gates
| Item | Issue | Verification |
|------|-------|-------------|
| `rational-to-pluralistic` QuickStart created | PRE-02 | 13-section standard; Audit agent gap report: all ✅ |
| All 7 R→P suite modules at gold standard | PRE-05 | Individual audit reports for each: |
| — `empathy-perspective-plurality` | | ✅ |
| — `emotional-intelligence-somatic-line` | | ✅ |
| — `contextual-ethics-moral-complexity` | | ✅ |
| — `ecological-systems-consciousness` | | ✅ |
| — `authentic-dialogue-collaborative-meaning` | | ✅ |
| — `community-belonging-collective-intelligence` | | ✅ |
| — `relativism-limits-of-pluralism` | | ✅ |

### Safety gates
| Item | Verification |
|------|-------------|
| Clinician review confirmed for all Tier 2 modules (esp. `emotional-intelligence-somatic-line`) | Named reviewer confirmed |
| EI-20 safety addendum applied to all EI/interpersonal modules | Safety Review agent PASS on each |

### Governance gate
| Item | Verification |
|------|-------------|
| Fork 2 Product Charter signed | |
| Fork 2 RACI populated | |
| Fork 2 `docusaurus.config.js` prepared | |

**Fork 2 readiness at last assessment:** ~70% — recommended first to launch

---

## Fork 3 gates — `integral-pluralistic` (Pluralistic→Integral)

All universal gates PLUS:

### Content gates
| Item | Issue | Verification |
|------|-------|-------------|
| `pluralistic-to-integral` QuickStart created | PRE-03 | Depends on PRE-10 bridge modules existing |
| `late-green-disillusionment` created | PRE-10 | 13-section standard; Safety Review PASS |
| `meta-systemic-thinking` created | PRE-10 | 13-section standard; Safety Review PASS |
| `healthy-hierarchy-and-authority` created | PRE-10 | 13-section standard; Safety Review PASS |
| `integral-teal-orientation` audited | — | Audit agent gap report: all ✅ |

### Teal superiority check (mandatory — unique to Fork 3)
| Item | Verification |
|------|-------------|
| Teal superiority check documented for EVERY module in Fork 3 inventory | Per-module log entry: "Teal superiority check: PASSED — [date] — [reviewer]" |
| No module implies Teal practitioners are more valuable as humans than Green practitioners | Human reviewer sign-off on the full module inventory |

### Safety gates
| Item | Verification |
|------|-------------|
| Clinician review confirmed for all Tier 2 modules | Named reviewer confirmed for each |
| Pre/Trans note present in all modules touching non-ordinary states or somatic content | Audit agent verified |

### Governance gate
| Item | Verification |
|------|-------------|
| Fork 3 Product Charter signed | |
| Fork 3 RACI populated | |
| Fork 3 `docusaurus.config.js` prepared | |

**Fork 3 readiness at last assessment:** ~35% — launch last

---

## Audit output format

```markdown
## Fork readiness audit: [fork-name]
**Date:** [date]
**Auditor:** Fork Scaffolding agent

### Universal gates
| Gate item | Status | Notes |
|-----------|--------|-------|
| FORK.md | ✅/❌ | |
| RACI named owners | ✅/❌ | |
| H1→H2 fix applied | ✅/❌ | |
| Search plugin working | ✅/❌ | |
| Build passing | ✅/❌ | |
| Homepage navigable | ✅/❌ | |

### Fork-specific gates
| Gate item | Issue | Status | Blocking? |
|-----------|-------|--------|-----------|
| [QuickStart] | PRE-0X | ✅/❌ | Yes/No |
...

### Teal superiority log (Fork 3 only)
| Module | Check passed | Date | Reviewer |
|--------|-------------|------|---------|

### Decision
READY TO SCAFFOLD / NOT READY

### Blocking items (if NOT READY)
1. [Item] — [what must happen before this gate closes] — [estimated effort]
2. ...

### Recommended next action
[Specific action for the team to take before rerunning this audit]
```

---

## Launch sequence recommendation
1. **Fork 2** (Rational→Pluralistic) — most content ready; launch first
2. **Fork 1** (Amber→Rational) — amber-shadow module is the key remaining gate
3. **Fork 3** (Pluralistic→Integral) — three bridge modules must be created first; launch last