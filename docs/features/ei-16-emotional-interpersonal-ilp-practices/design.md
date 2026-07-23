# Design: EI-16 — Add Emotional & Interpersonal practices to ILP Practice Taxonomy

## Architecture Overview

**Change type:** Content extension — single file, no code changes, no component changes, no infrastructure.

**File:** `docs/maps/ilp-practice-taxonomy.md` only.

### Design Rationale

The ILP Practice Taxonomy already has a mature structure: practice families overview, taxonomy dimensions per family, progression ladders with fallbacks, safety boundaries, delivery dimensions, practice card template, example entries, scheduling guidelines, and assessment integration. The Emotional and Interpersonal lines follow the same pattern as existing families but require new sections rather than merging into existing families (despite some overlap with Relationships and Somatic).

**Decision: Create two new practice families (Emotional, Interpersonal) rather than merging into existing families.**
- *Rationale:* The Emotional and Interpersonal lines have distinct developmental arcs, dedicated module suites, stage maps, and competency ladders. Merging would dilute their specificity and confuse the taxonomy's mapping from family to developmental line. Body and Somatic are already separate families for analogous reasons.
- *Tradeoff:* Two new families means two new progression ladders, two new taxonomy dimensions tables, and two new sets of example entries. Total additions: ~10–12 tables. Acceptable — the taxonomy already has 8 families.

## Components

### Sections to Extend

| Section | What Changes |
|---------|--------------|
| 1. Practice Families Overview | Add Emotional and Interpersonal rows to the table |
| 2. Taxonomy Dimensions | Add 2.8 Emotional and 2.9 Interpersonal dimension tables |
| 3. Progression Ladders | Add 3.8 Emotional and 3.9 Interpersonal ladders (L1–L4) |
| 7. Example Taxonomy Entries | Add 10 new rows (5 Emotional, 5 Interpersonal) |
| 10. Launch Readiness Checklist | Add checkboxes for Emotional and Interpersonal families |

### Sections NOT Changed

| Section | Reason |
|---------|--------|
| 4. Safety Boundaries for Shadow and Contemplative Practices | Emotional/Interpersonal safety is covered by the safety addendum, not shadow-specific protocols |
| 5. Delivery Dimensions Reference | No new delivery dimensions needed — existing dimensions cover all needs |
| 6. Practice Card Template | Template is universal; applies to new families as-is |
| 8. Scheduling Guidelines | General guidelines already apply; no family-specific scheduling needed |
| 9. Assessment Integration | General assessment patterns already apply |

## Data Flow

No runtime data flow. All changes are static markdown content.

## Practice ID Scheme

Following existing convention (`ILP-{FAMILY}-{NNN}`):
- Emotional: `ILP-EMOT-001` through `ILP-EMOT-005`
- Interpersonal: `ILP-INT-001` through `ILP-INT-005`

## Competency Level Mapping

| Level | Emotional Practices | Interpersonal Practices |
|-------|-------------------|------------------------|
| L1    | Emotion wheel journaling (entry-level) | — |
| L2    | ABC chain analysis, Reappraisal micro-practice, Somatic emotion tracking, Affect labelling | Perspective accuracy verification, Four Horsemen self-audit |
| L3    | ABC chain analysis (extended), Reappraisal micro-practice (applied), Affect labelling | PACE attunement listening, NVC repair attempt drafting, Cross-difference dialogue |
| L4    | — | Cross-difference dialogue (advanced facilitation) |

## Safety Tier Classification

Per the Emotional & Interpersonal Safety Addendum:

| Practice | Tier | Rationale |
|----------|------|-----------|
| Emotion wheel journaling | Tier 1 | Solo-safe, no contraindications |
| ABC chain analysis | Tier 1 | Solo-safe, cognitive-reflective |
| Reappraisal micro-practice | Tier 1 | Solo-safe, cognitive strategy |
| Somatic emotion tracking | Tier 2 | Body-focused attention can activate body-held trauma (per addendum, somatic body scan trigger) |
| Affect labelling in conversation | Tier 1 | Solo-safe; live practice is low intensity |
| Perspective accuracy verification | Tier 1 | Solo-safe cognitive check |
| PACE attunement listening | Tier 2 | Partner exercise — attachment-related distress risk (per addendum, co-regulation trigger) |
| Four Horsemen self-audit | Tier 1 | Solo-safe reflective audit |
| NVC repair attempt drafting | Tier 1 | Solo writing exercise; actual delivery may be Tier 2 if facilitated |
| Cross-difference dialogue | Tier 2 | Identity threat/minority stress risk (per addendum, cross-difference dialogue trigger) |

## Evidence References

| Module | Evidence Source |
|--------|----------------|
| EI-01 Emotional Line Overview | Barrett (constructed emotion), RULER framework |
| EI-02 Emotional Granularity | Kashdan et al., Barrett granularity research |
| EI-05 Emotional Appraisal & Meaning-Making | Gross process model, cognitive reappraisal RCTs |
| EI-06 Emotional Intelligence & Somatic Line | Porges polyvagal theory, interoception research |
| EI-08 Interpersonal Line Overview | Kegan subject-object, attachment theory |
| EI-09 Perspective-Taking & Empathic Accuracy | Ickes empathic accuracy, perspective-taking research |
| EI-10 Relational Repair & Conflict Navigation | Gottman Four Horsemen, NVC framework |
| EI-11 Cross-Difference Dialogue | Sue microaggressions, cultural competence frameworks |

## Constraints

- Single file changed: no CI/CD pipeline impacts
- No component imports or MDX needed
- No sidebar changes
- `npm run build` must pass
- Follow existing table formatting conventions exactly