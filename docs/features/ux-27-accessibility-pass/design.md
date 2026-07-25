# UX-27 · Accessibility Pass — Technical Design

## Approach

### Audit Phase
Run the existing audit infrastructure from `internal/quality/accessibility-audit.md`:
1. **axe-core audit** (`scripts/audit-a11y.mjs`): Puppeteer + axe-core 4.12.1, headless Chrome, audits 7 pages against WCAG 2.1 A + AA rules
2. **Lighthouse score** (`scripts/lighthouse-score.mjs`): Accessibility category score, pass ≥ 90
3. **Served locally**: `npm run build` → `npm run serve -- --port 3099`

### Manual Checks (not automated)
- **Keyboard focus states**: Visual review of `:focus-visible` outlines on all interactive elements (links, buttons, form controls) per the internal frontend-design quality-floor requirement
- **Color contrast verification**: Test `#1a6b3c` (forest green) against all backgrounds used in the CSS — nav active states, breadcrumbs, links, CTAs
- **Safety-tier badge semantics**: Confirm TIER badge renders `"2 · Guided"` text (not color alone)

### Remediation
- Fix any violations found by axe-core (automated rules)
- Remediate any missing or inadequate `:focus-visible` outline styles
- Fix any contrast issues identified manually
- Document every fix and its rationale

## Impacted Components

| Component | Risk Area | Check |
|---|---|---|
| `src/css/custom.css` | Primary color contrast | `#1a6b3c` vs varied backgrounds |
| `src/css/custom.css` | Focus states | `.navbar-start-here:focus-visible` exists; audit other nav elements |
| `src/components/ModuleMeta/index.js` | Tier badge semantics | Verify text labels present |
| `src/components/ModuleMeta/styles.module.css` | Badge contrast | Difficulty + Tier badge colors |
| `src/pages/index.js` | Homepage CTA contrast + focus | Primary CTA button, secondary link, AQAL motif labels |
| `src/pages/index.module.css` | Focus + contrast | CTA focus states, AQAL label contrast |
| `src/components/RetrievalCard/` | Focus states | `.revealBtn`, `.rememberedBtn`, `.reviewBtn` |
| `src/components/RetrievalPrompt/` | Focus states | `.copyBtn` |
| `src/components/ModuleComplete/` | Focus states | `.completeBtn`, `.completedBtn` |
| `src/components/NextStep/` | Focus states | `.primaryCta` |

## Constraints
- Must not break the existing visual design (UX-24/25/26)
- CSS-only fixes preferred — no new JS dependencies
- Follow existing patterns for `:focus-visible` styles (2px outline + 2px offset using `--ifm-color-primary-darker`)
- `prefers-reduced-motion` already respected for AQAL motif animation

## Audit Pages (unchanged from existing infrastructure)
1. Homepage — `/`
2. Intro — `/docs/intro`
3. Module — `/docs/modules/mindfulness-basics`
4. Quickstart — `/docs/quickstarts/personal-to-integral`
5. Prototype — `/prototype`
6. Start Here — `/start`
7. 404 — any invalid URL
