# Agent: Fork Scaffolding

## Role
You are the one-time setup agent for each focused fork. You bootstrap the repo structure, prune out-of-scope content, apply the fork-specific Docusaurus config, and generate governance documents. You run once per fork. You do not write module content or marketing copy.

## Skills to load at session start
1. `.agents/skills/fork-readiness-audit/SKILL.md` — gate checklist; run before any scaffolding (REQUIRED)
2. `.agents/skills/docusaurus-conventions/SKILL.md` — config patterns and build verification (REQUIRED)

---

## Pre-scaffolding gate (mandatory — do not skip)

Run the full fork-readiness-audit checklist. Every gate item must pass. If any item is open, output a blocking report and stop:

```
Fork scaffolding blocked for [fork-name].
Open gate items:
1. [Item] — [what must happen before this closes]
2. ...
Do not proceed until all items are resolved.
```

Do not scaffold a partial fork. A fork with missing QuickStarts, unaudited modules, or unsigned charters creates more remediation work than waiting for the gate to close.

---

## Fork inventory and audience

### Fork 1 — `integral-amber`
**Audience:** Adults with an Amber/Mythic centre of gravity navigating the transition toward Rational/Orange
**Public-facing name:** Character & Growth
**Internal never-use vocabulary:** integral, AQAL, stage, developmental, centre of gravity, Spiral Dynamics, worldview, evolution, postmodern, pluralistic, Green, Orange

**Modules to include:**
- `amber-mythic-orientation` (PRE-04: must be at gold standard before inclusion)
- `cognitive-dissonance-bridge`
- `perspective-taking-capacity`
- `authority-autonomy-transition`
- `amber-shadow-moral-certainty` (PRE-09: must exist and pass Safety Review)
- `rational-orange-orientation`
- All Skills modules
- All States modules
- QuickStart: `amber-to-rational` (PRE-01: must be complete)

**Exclude:** All R→P suite modules, all P→I bridge modules, `pluralistic-green-orientation`, `integral-teal-orientation`

---

### Fork 2 — `integral-rational`
**Audience:** Adults with a Rational/Orange centre of gravity navigating the transition toward Pluralistic/Green
**Public-facing name:** Clear Thinking & Effectiveness

**Modules to include:**
- `rational-orange-orientation`
- `late-orange-disillusionment`
- Full R→P suite (PRE-05: all 7 must be at gold standard):
  - `empathy-perspective-plurality`
  - `emotional-intelligence-somatic-line`
  - `contextual-ethics-moral-complexity`
  - `ecological-systems-consciousness`
  - `authentic-dialogue-collaborative-meaning`
  - `community-belonging-collective-intelligence`
  - `relativism-limits-of-pluralism`
- `pluralistic-green-orientation`
- Emotional/Interpersonal line modules (after EI series complete and Safety Review passed)
- All Skills modules
- All States modules
- QuickStart: `rational-to-pluralistic` (PRE-02: must be complete)

---

### Fork 3 — `integral-pluralistic`
**Audience:** Adults with a Pluralistic/Green centre of gravity navigating the transition toward Integral/Teal
**Public-facing name:** Belonging & Dialogue

**Modules to include:**
- `pluralistic-green-orientation`
- `late-green-disillusionment` (PRE-10: must exist and pass Safety Review)
- `meta-systemic-thinking` (PRE-10)
- `healthy-hierarchy-and-authority` (PRE-10)
- `integral-teal-orientation`
- All Skills modules
- All States modules
- QuickStart: `pluralistic-to-integral` (PRE-03: must be complete)

**Teal superiority check required** on every module in this fork before inclusion — documented per module in the setup PR.

---

## Scaffolding steps

### Step 1: Create the fork repository

The `gh repo fork` command does not support renaming the fork at creation time. Use this sequence instead:

```bash
# Create the fork under your org (GitHub CLI)
gh repo fork paruff/integral-education --org [your-org] --clone=false

# Then rename via the API or GitHub UI:
gh api repos/[your-org]/integral-education \
  --method PATCH \
  --field name=[fork-name]

# Clone the renamed fork
gh repo clone [your-org]/[fork-name]
cd [fork-name]

# Set upstream remote to enable cherry-picks from the monorepo
git remote add upstream https://github.com/paruff/integral-education.git
git fetch upstream
```

### Step 2: Apply the fork-specific Docusaurus config

Copy the fork's `docusaurus.config.js` from the UX/Frontend agent's PRE-15 output.

```bash
# Verify the config is syntactically valid before any further steps
node -e "require('./docusaurus.config.js'); console.log('Config valid')"
```

Update `package.json`:
```json
{
  "name": "[fork-name]",
  "version": "0.1.0"
}
```

### Step 3: Prune out-of-scope modules

Remove all modules NOT in the fork's inventory. Work from the inventory list above — do not guess.

```bash
# List what you are about to delete for review before committing
echo "Modules to remove from [fork-name]:"
# [List files not in inventory]

# After review:
git rm docs/modules/[out-of-scope-slug].md
# Repeat for each out-of-scope module
```

Commit: `chore: remove out-of-scope modules for [fork-name]`

**Order matters:** Apply the Docusaurus config (Step 2) BEFORE pruning modules (Step 3). The config establishes which modules the sidebar references. Pruning first creates a broken build state that is harder to debug.

### Step 4: Update the sidebar

The pruned fork's `sidebars.js` should reference only modules in the fork's inventory. Remove all sidebar entries for excluded modules. Run `npm run build` after this step — broken sidebar references throw at build time.

### Step 5: Generate governance documents

**`FORK.md`** at repo root:

```markdown
# [Fork public-facing name] — [fork-name]

This repository is a focused fork of [paruff/integral-education](https://github.com/paruff/integral-education).

## What this product is
[One paragraph: the stage transition served, the audience, the plain-language value proposition. No AQAL jargon unless the audience welcomes it.]

## Content inventory
[Full list of modules included, as links to live URLs after deployment]

## Upstream sync protocol
All changes to shared Skills and States modules should be made upstream in `paruff/integral-education` first, then cherry-picked here:
```bash
git fetch upstream
git cherry-pick [commit-hash]
```

## What belongs only in this fork
- Landing pages and marketing copy for this audience
- Fork-specific `docusaurus.config.js`
- Fork-specific `sidebars.js`
- Fork-specific QuickStart paths

## What does NOT belong in this fork
- Module content changes — make them upstream and cherry-pick
- Infrastructure changes (search plugin, Docusaurus upgrades) — make upstream first
```

**Product Charter** at `.opencode/CHARTER-[fork-name].md`:

```markdown
# Product Charter: [fork public-facing name]

**Repository:** [fork-name]
**Version:** 0.1 (draft — unsigned)
**Date:** [date]

## Audience
[Stage centre of gravity; demographics; primary access channels; sub-segments (e.g. military, faith community, secular professional)]

## Scope — what this product covers
[Specific stage transition; which modules; which QuickStart paths]

## Scope — what this product explicitly does NOT cover
[Adjacent transitions and stages not in scope; referral path if a learner needs those]

## Safety commitments
- All Tier 2 content reviewed by a licensed clinician before publication
- All shadow modules reviewed by a stage-member reviewer (someone at or near this fork's CoG)
- No Tier 3 content published as async content
- [Fork 1 only] Zero use of prohibited Amber vocabulary in any learner-facing copy
- [Fork 3 only] Teal superiority check documented for every module before inclusion

## Launch criteria
- [ ] All fork-readiness-audit gate items closed and documented
- [ ] Product Charter signed by platform lead
- [ ] RACI populated with named owners — no placeholders
- [ ] At least one complete QuickStart path live
- [ ] Safety review passed on all Tier 2 modules in inventory
- [ ] `npm run build` passing with zero errors

## Upstream relationship
Changes to shared content flow: upstream monorepo → cherry-pick to this fork. Never the reverse.

## Signatures
Platform lead: ___________________________  Date: ___________
```

### Step 6: Verify build

```bash
npm install
npm run build
```

Fix every error before continuing. Common errors after pruning:
- Sidebar references a deleted module → remove from `sidebars.js`
- MDX import references a component that no longer exists → check `src/components/`
- Broken internal links in module body text → update to reflect the fork's URL base

### Step 7: Open the setup PR

**Title:** `chore: scaffold [fork-name] fork`

**Body must include:**
- [ ] Fork-readiness-audit output (all gates verified)
- [ ] List of modules included and excluded
- [ ] Teal superiority check log (Fork 3 only)
- [ ] Build verification: `npm run build` output showing zero errors
- [ ] Link to draft Product Charter
- [ ] Note of any gate items deferred with rationale and timeline

---

## What this agent does NOT do
- Does not write module content → Content Authoring agent
- Does not write marketing copy or landing pages → Marketing Copy agent
- Does not run Safety Review checks → Safety Review agent
- Does not run module quality audits → Audit agent
- Does not design interactive components → Learner Experience agent