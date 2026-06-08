---
name: evidence-vetting
description: "Use this skill whenever rating citations, building the Evidence and Citations table (Section 12), evaluating whether a claim requires a citation, or checking whether a module's evidence base is sufficient for publication. Trigger when: any module section makes an empirical claim; when building or auditing Section 12; when the Audit agent flags citation issues; or when the Content Authoring agent is unsure whether a source qualifies as Tier A, B, or C. Also trigger when a module cites findings known to have replication concerns."
---

# Evidence Vetting Protocol

Every empirical claim in a module requires a citation. Every citation requires a Tier rating. Every Tier-C citation requires a stated caveat. Every known contested or partially replicated finding requires a caveat regardless of Tier.

---

## Tier definitions

### Tier A — High confidence
**What qualifies:**
- Randomised controlled trial (RCT) published in a peer-reviewed journal
- Systematic review or meta-analysis of multiple RCTs
- Pre-registered replication studies with adequate statistical power

**Presentation:** Cite as authoritative. No caveat required unless there is a known replication failure or significant methodological concern with this specific study.

**Critical check:** Tier A applies to individual peer-reviewed studies, not to popular books summarising those studies. *Thinking, Fast and Slow* is Tier B or C; the underlying Kahneman & Tversky experimental papers are Tier A.

---

### Tier B — Moderate confidence
**What qualifies:**
- Peer-reviewed observational study (cohort, case-control, cross-sectional) with adequate sample size
- Expert consensus statements from professional organisations (APA, AMA, etc.)
- Well-validated clinical frameworks with substantial peer-reviewed research backing (e.g. attachment theory, CBT outcome research, MBSR)
- Longitudinal developmental research using validated instruments (Cook-Greuter ego development interviews, Kegan subject-object assessment)

**Presentation:** Cite with appropriate confidence. Include a caveat if the evidence base has known limitations ("observational data; causal direction not established").

---

### Tier C — Theoretical / low empirical confidence
**What qualifies:**
- Expert opinion or practitioner consensus without systematic empirical backing
- Single case studies
- Theoretical frameworks not yet empirically validated
- Self-published or non-peer-reviewed sources
- Books that synthesise or interpret research rather than reporting original studies

**Presentation:** Always include a caveat: "Theoretical framework; empirical validation limited" or "Expert opinion; not yet replicated in controlled trials."

**Rule:** No module should rest primarily on Tier-C sources for its core claims. If the best available evidence for a central claim is Tier C, state this in the Safety Note and frame the practice as exploratory rather than evidence-based.

---

## Minimum citation standard per module type

| Module type | Minimum citations | Minimum Tier A/B |
|-------------|------------------|-----------------|
| Orientation (stage) | 6+ | 4 Tier A or B |
| Skills module | 4+ | 3 Tier A or B |
| Emotional line | 6+ | 4 Tier A; polyvagal + attachment theory required |
| Interpersonal line | 6+ | 4 Tier A; Zaki/Epley empathic accuracy required |
| Shadow module | 6+ | 3 Tier A or B; developmental theory may be Tier B |
| Somatic module | 6+ | 4 Tier A or B; neuroscience evidence base required |

---

## Section 12 table format

```markdown
## Evidence and Citations

| Citation | Tier | Caveat |
|----------|------|--------|
| Kabat-Zinn, J. (1990). *Full Catastrophe Living*. Delacorte. | B | Book format; underlying MBSR RCT evidence is Tier A (see Hofmann et al. 2010 for meta-analysis) |
| Hofmann, S. G., et al. (2010). The effect of mindfulness-based therapy on anxiety and depression. *Journal of Consulting and Clinical Psychology*, 78(2), 169–183. | A | None |
```

APA 7th edition format for all citations.

---

## Source quality reference by domain

### Emotional intelligence
- **Mayer, Salovey & Caruso** — Four-Branch EI model; original peer-reviewed research = Tier A
- **RULER programme (Yale Centre for Emotional Intelligence)** — Tier B; school-based intervention research; some RCTs
- **Barrett, L. F.** — Constructed emotion / emotional granularity; Tier A for neuroscience base; Tier B for psychological claims (her 2017 book is Tier C/B; cite the underlying papers)
- **Brackett, M. A.** — RULER research; Tier B

### Somatic and nervous system
- **Porges, S. W. (polyvagal theory)** — Rate as Tier B with caveat. The core anatomical claims about the ventral vagal complex have been challenged on methodological grounds (see Grossman & Taylor 2007 for critique). Polyvagal theory has broad practitioner adoption and clinical utility but the specific neurophysiological mechanisms as described by Porges are contested. Cite as: "Tier B — influential clinical framework; specific neurophysiological mechanisms contested; practitioner evidence base strong."
- **van der Kolk, B. (The Body Keeps the Score)** — Tier B (book synthesising research; cite underlying papers for specific claims)
- **Levine, P. (Somatic Experiencing)** — Tier B/C; growing practitioner evidence base; RCT evidence limited; note in caveat

### Interpersonal and relational
- **Zaki, J.** — Empathic accuracy; Tier A; peer-reviewed experimental research
- **Epley, N.** — Perspective-taking; Tier A; peer-reviewed experimental research
- **Bowlby, J. / Ainsworth, M.** — Attachment theory; Tier B; extensive replication across decades; observational, not RCT
- **Buber, M. (I-Thou)** — Tier C; philosophical framework; cite as theoretical

### Developmental frameworks
- **Cook-Greuter, S.** — Ego development research; Tier B; longitudinal data, validated instrument (Washington University Sentence Completion Test); specialised population
- **Kegan, R.** — Subject-object theory; Tier B; constructive-developmental; extensive clinical application; not easily RCT-testable by design
- **Spiral Dynamics / Beck & Cowan** — Tier C; value systems model; limited peer-reviewed empirical validation; cite as theoretical framework
- **Wilber, K. (AQAL)** — Tier C; philosophical-theoretical synthesis; cite as theoretical framework

### Cognitive and learning science
- **Roediger & Karpicke** — Retrieval practice / testing effect; Tier A; robust replication
- **Kornell & Bjork** — Spacing effect; Tier A; robust replication
- **Dweck, C. S. (growth mindset)** — **Tier A with mandatory caveat.** Original findings are Tier A; however, large pre-registered replication attempts (e.g. Bahník & Vranka 2017; Education Endowment Foundation 2019 RCT) have found inconsistent or null effects in real-world educational settings. Cite as: "Tier A for original lab findings; real-world replication inconsistent; use with caveat."
- **Baumeister et al. (ego depletion)** — **Do not cite without major caveat.** Large-scale pre-registered replication (Hagger et al. 2016, 23 labs) found near-zero effect. Cite only if specifically addressing the controversy. Do not present as an established finding.

### Mindfulness and contemplative
- **Kabat-Zinn, J. (MBSR)** — Tier B for books; Tier A for the large RCT and meta-analytic evidence base (cite Hofmann et al. 2010; Khoury et al. 2013)
- **Hofmann, S. G. et al.** — Mindfulness meta-analyses; Tier A
- **Lutz, A. et al.** — Neuroscience of meditation; Tier A for neuroimaging studies; note sample size limitations (experienced meditators; small N)

---

## Common errors

**Citing a popular book as Tier A:** Books synthesise research; they are not themselves peer-reviewed studies. Rate books Tier B at best; for the specific empirical claims, find and cite the underlying papers.

**Citing a theory's originator as the only source:** For polyvagal theory, AQAL, Spiral Dynamics — the originator's work is often Tier C or B. Supplement with empirical research on the framework's applications and outcomes.

**Not updating caveats for contested findings:** Growth mindset, ego depletion, power poses, and several social priming effects have failed or substantially weakened in large-scale replication. Check the replication status of any finding before citing and add a caveat if contested.

**Treating "lots of practitioners use this" as evidence:** Widespread practitioner adoption is not the same as empirical validation. Many effective practices have strong practitioner consensus (Tier B/C) but limited RCT backing. Represent the evidence accurately.

**Paraphrasing without citing:** If a sentence says "research shows that X," there must be a citation for it. If you cannot find a citation, rewrite the sentence as a practitioner observation ("clinicians working in this field commonly observe that...") and rate that observation accordingly.

**Citing DOIs without verifying they resolve:** Hallucinated DOIs are a known risk in AI-generated content. If you are uncertain whether a citation is accurate, flag it for human verification rather than presenting it as confirmed.