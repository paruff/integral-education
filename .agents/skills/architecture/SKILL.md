> Load with: "architecture skill" in your prompt
> Example: "Use the architecture skill to implement this feature."

# Architecture Skill

## Layer Structure Diagram
```
docs content (docs/**)
        ↓ references
site navigation/config (sidebars.js, docusaurus.config.js)
        ↓ build pipeline
validation & delivery (.github/workflows/**, npm run build)
```

## Dependency Direction Rules
- Module and quickstart content depends on protocol docs, not vice versa.
- Sidebar/config references docs paths; docs must exist before linking.
- Workflows enforce quality and safety checks; docs and config must satisfy workflow guards.
- Safety and evidence standards are upstream constraints for all learning content.

## Hard Architectural Rules
- Keep canonical protocol sources in `docs/quality/`, `docs/maps/`, and `docs/implementation/` as single sources of truth.
- Preserve Docusaurus structure: content in `docs/`, UI in `src/`, static assets in `static/`.
- Ensure sidebar entries and frontmatter IDs stay aligned with file paths.
- Treat broken links/build failures as blocking defects.
- Do not introduce runtime/service architecture outside static-site scope unless explicitly requested.

## What to Read Before Writing Code
- `README.md`
- `sidebars.js`
- `docusaurus.config.js`
- `docs/quality/instructional-design-protocol.md`
- `docs/quality/evidence-vetting-checklist.md`
- `docs/quality/peer-review-sop.md`
- `docs/maps/aqal-label-crosswalk.md`
- `.github/workflows/ci-quality.yml`
- `.github/workflows/content-protocol.yml`

## PR Architecture Checklist
- [ ] Change is scoped to the smallest affected layer.
- [ ] Any new/renamed docs are reflected in `sidebars.js`.
- [ ] Frontmatter IDs/titles/labels are coherent with navigation.
- [ ] Protocol, evidence, and safety constraints remain satisfied.
- [ ] `npm run build` succeeds before handoff.
- [ ] Workflow-level assumptions were not silently broken.
