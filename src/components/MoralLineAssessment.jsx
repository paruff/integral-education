import React, { useState, useCallback } from 'react';
import Link from '@docusaurus/Link';
import styles from './MoralLineAssessment.module.css';

// ── Section A: Justice Track Dilemmas ────────────────────────────────────────
// 3 adapted DIT dilemmas, each with 8 considerations tagged PI/MN/PC (hidden)
// PI = Personal Interest (Stages 2/3), MN = Maintaining Norms (Stage 4),
// PC = Postconventional (Stages 5/6)

const SECTION_A_DILEMMAS = [
  {
    id: 'd1',
    title: 'The Heinz Dilemma',
    scenario:
      'A woman is dying from a rare disease. There is one drug that might save her — a form of radium that a druggist in the same town recently discovered. The druggist is charging $2,000 for a small dose, which is ten times what the drug costs to make. The sick woman\'s husband, Heinz, goes to everyone he knows to borrow money but can only raise $1,000. He tells the druggist his wife is dying and asks to pay later or buy it cheaper. The druggist says, "No, I discovered the drug and I\'m going to make money from it." Heinz gets desperate and considers breaking into the man\'s store to steal the drug for his wife.',
    actionQuestion: 'Should Heinz steal the drug?',
    considerations: [
      { id: 'd1-c1', text: 'Whether the druggist has a right to charge whatever he wants for a drug he discovered.', schema: 'MN' },
      { id: 'd1-c2', text: 'Whether Heinz loves his wife enough to risk going to jail for her.', schema: 'PI' },
      { id: 'd1-c3', text: 'Whether stealing the drug would set a precedent that it is acceptable to take what you need if you are desperate.', schema: 'MN' },
      { id: 'd1-c4', text: 'Whether the value of a human life outweighs the value of property rights.', schema: 'PC' },
      { id: 'd1-c5', text: 'Whether Heinz might get caught and sent to jail, leaving his wife alone regardless.', schema: 'PI' },
      { id: 'd1-c6', text: 'Whether the druggist\'s refusal respects the dignity of the dying woman.', schema: 'PC' },
      { id: 'd1-c7', text: 'Whether society depends on people respecting laws even when those laws conflict with personal needs.', schema: 'MN' },
      { id: 'd1-c8', text: 'Whether a law that protects property at the cost of a human life can be considered a just law.', schema: 'PC' },
    ],
  },
  {
    id: 'd2',
    title: 'The Whistleblower',
    scenario:
      'An engineer at a manufacturing company discovers that a product design flaw could cause serious injury to users. The company has already shipped thousands of units and a recall would cost millions, potentially shutting down the division and costing dozens of coworkers their jobs. The engineer\'s manager tells them to stay quiet — the odds of injury are low, and reporting it would destroy the team\'s work. The engineer must decide whether to report the flaw to regulators.',
    actionQuestion: 'Should the engineer report the flaw to regulators?',
    considerations: [
      { id: 'd2-c1', text: 'Whether the engineer has a personal obligation to protect their team and coworkers.', schema: 'PI' },
      { id: 'd2-c2', text: 'Whether obeying the manager\'s instruction is the right thing to do in a workplace.', schema: 'MN' },
      { id: 'd2-c3', text: 'Whether the potential harm to users outweighs the harm to the company and its employees.', schema: 'PC' },
      { id: 'd2-c4', text: 'Whether the engineer could lose their job and damage their career permanently.', schema: 'PI' },
      { id: 'd2-c5', text: 'Whether there are laws requiring safety reporting that should be followed regardless of personal feelings.', schema: 'MN' },
      { id: 'd2-c6', text: 'Whether a company that knowingly ships dangerous products violates the social contract that justifies its existence.', schema: 'PC' },
      { id: 'd2-c7', text: 'Whether the manager\'s loyalty to the team is understandable given the pressure they are under.', schema: 'PI' },
      { id: 'd2-c8', text: 'Whether society benefits when professionals are expected to prioritise public safety over organisational loyalty.', schema: 'PC' },
    ],
  },
  {
    id: 'd3',
    title: 'Triage Ethics',
    scenario:
      'In a resource-limited emergency, a doctor has one remaining ventilator and two patients who need it to survive. Patient A is a 70-year-old community leader who has mentored hundreds of young people and continues to serve on several nonprofit boards. Patient B is a 25-year-old single parent with a young child. The doctor must decide who receives the ventilator.',
    actionQuestion: 'Who should receive the ventilator?',
    considerations: [
      { id: 'd3-c1', text: 'Whether the doctor is personally closer to one patient or their family.', schema: 'PI' },
      { id: 'd3-c2', text: 'Whether hospital policy or established triage protocols should determine the decision.', schema: 'MN' },
      { id: 'd3-c3', text: 'Whether the value of a life should be measured by future potential years or by contributions already made.', schema: 'PC' },
      { id: 'd3-c4', text: 'Whether the 25-year-old\'s dependent child creates a special obligation.', schema: 'PI' },
      { id: 'd3-c5', text: 'Whether the community leader\'s past contributions create a debt that society should honour.', schema: 'MN' },
      { id: 'd3-c6', text: 'Whether any fair system for allocating scarce resources must be agreed upon before the emergency, not decided case by case.', schema: 'PC' },
      { id: 'd3-c7', text: 'Whether the doctor\'s own emotional comfort with the decision should be considered.', schema: 'PI' },
      { id: 'd3-c8', text: 'Whether a principle like "save the most life-years" can be consistently applied without discrimination.', schema: 'PC' },
    ],
  },
];

// ── Section B: Care Track Dilemmas ───────────────────────────────────────────
// 2 dilemmas with 6 care-oriented considerations each

const SECTION_B_DILEMMAS = [
  {
    id: 'c1',
    title: 'Family Obligation vs. Self-Care',
    scenario:
      'Maria has been the primary caregiver for her aging mother for three years. Her mother\'s needs are increasing, and Maria has been offered a promotion that would require relocating to another city. Moving would mean better financial security for her own future and her children\'s education, but would require placing her mother in assisted living. Her mother has said she would feel abandoned. Maria\'s own health has been declining from the stress of caregiving.',
    considerations: [
      { id: 'c1-r1', text: 'How Maria\'s relationship with her mother would be affected by this decision.' },
      { id: 'c1-r2', text: 'Whether Maria can maintain her caregiving role while also attending to her own wellbeing.' },
      { id: 'c1-r3', text: 'How the decision would affect Maria\'s children and their relationship with their grandmother.' },
      { id: 'c1-r4', text: 'Whether placing her mother in assisted living could mean better professional care than Maria can provide alone.' },
      { id: 'c1-r5', text: 'How Maria\'s mother\'s feelings of abandonment reflect the depth of their bond, not manipulation.' },
      { id: 'c1-r6', text: 'Whether asking "what would a caring person do?" helps more than asking "what are my rights and obligations?"' },
    ],
  },
  {
    id: 'c2',
    title: 'Community Responsibility',
    scenario:
      'David is a member of a close-knit faith community. He recently learned that a beloved community leader engaged in harmful behaviour toward a vulnerable member fifteen years ago. The behaviour was addressed privately at the time, the leader apologised, and the community chose to forgive and move forward. The leader has since done considerable good work. Now, a new member has joined who has a history of being harmed in similar ways. David wonders whether to raise the past incident again.',
    considerations: [
      { id: 'c2-r1', text: 'How raising the past would affect the leader, who has genuinely changed and contributed meaningfully since.' },
      { id: 'c2-r2', text: 'How staying silent could affect the new member if they later discover the history on their own.' },
      { id: 'c2-r3', text: 'Whether the community\'s collective decision to forgive should carry moral weight in David\'s individual choice.' },
      { id: 'c2-r4', text: 'How David\'s own relationship with both the leader and the new member shapes his responsibility.' },
      { id: 'c2-r5', text: 'Whether accountability and care can coexist — can the community honour both the leader\'s growth and the new member\'s need for safety?' },
      { id: 'c2-r6', text: 'Whether the most caring response is to trust the community\'s earlier process or to honour the new member\'s unspoken vulnerability.' },
    ],
  },
];

// ── Section C: Moral Courage Gap Questions ────────────────────────────────────
// 5 Likert-scale items assessing gap between moral conviction and moral action

const SECTION_C_QUESTIONS = [
  {
    id: 'g1',
    text: 'I often know what the right thing to do is, but find it difficult to actually do it.',
  },
  {
    id: 'g2',
    text: 'When I see someone being treated unfairly, I speak up — even when it would be easier to stay quiet.',
    reverse: true,
  },
  {
    id: 'g3',
    text: 'I sometimes compromise my moral values to avoid conflict or disapproval from others.',
  },
  {
    id: 'g4',
    text: 'There are moral convictions I hold privately that I rarely express because they differ from what people around me believe.',
  },
  {
    id: 'g5',
    text: 'Looking back at difficult situations in my life, there is a meaningful gap between the person I believe I should have been and how I actually behaved.',
  },
];

// ── Likert Scale Labels ──────────────────────────────────────────────────────

const LIKERT_LABELS = {
  1: 'Not at all important',
  2: 'Slightly important',
  3: 'Moderately important',
  4: 'Very important',
  5: 'Extremely important',
};

const COURAGE_LIKERT_LABELS = {
  1: 'Strongly disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly agree',
};

// ── Scoring Helpers ──────────────────────────────────────────────────────────

function computeSchemaProfile(sectionAAnswers) {
  const schemaCounts = { PI: 0, MN: 0, PC: 0 };
  let totalRatings = 0;
  let completedDilemmas = 0;

  SECTION_A_DILEMMAS.forEach((dilemma) => {
    const response = sectionAAnswers[dilemma.id];
    if (!response || !response.action) return;

    const ratings = response.ratings || {};
    const dilemmaRatings = Object.entries(ratings);
    if (dilemmaRatings.length === 0) return;

    completedDilemmas += 1;

    dilemmaRatings.forEach(([considerationId, rating]) => {
      if (rating < 4) return; // Only count high-importance ratings (4–5)
      const consideration = dilemma.considerations.find((c) => c.id === considerationId);
      if (consideration && schemaCounts[consideration.schema] !== undefined) {
        schemaCounts[consideration.schema] += 1;
        totalRatings += 1;
      }
    });
  });

  const totalDilemmas = SECTION_A_DILEMMAS.length;

  if (totalRatings === 0) {
    return {
      piPct: 0,
      mnPct: 0,
      pcPct: 0,
      dominant: null,
      totalDilemmas,
      completedDilemmas,
    };
  }

  const piPct = Math.round((schemaCounts.PI / totalRatings) * 100);
  const mnPct = Math.round((schemaCounts.MN / totalRatings) * 100);
  const pcPct = Math.round((schemaCounts.PC / totalRatings) * 100);

  // Dominant schema: highest proportion; tie → PC > MN > PI
  let dominant = 'PI';
  if (mnPct > (dominant === 'PI' ? piPct : schemaCounts.MN > schemaCounts.PI ? mnPct : -1)) {
    dominant = 'MN';
  }
  if (pcPct >= mnPct && pcPct >= piPct) {
    dominant = 'PC';
  } else if (mnPct >= piPct && mnPct >= pcPct) {
    dominant = 'MN';
  }

  return { piPct, mnPct, pcPct, dominant, totalDilemmas, completedDilemmas };
}

function computeCareScore(sectionBAnswers) {
  let totalRating = 0;
  let totalConsiderations = 0;
  let completedDilemmas = 0;

  SECTION_B_DILEMMAS.forEach((dilemma) => {
    const response = sectionBAnswers[dilemma.id];
    if (!response || !response.ratings) return;

    const ratings = Object.values(response.ratings);
    if (ratings.length === 0) return;

    completedDilemmas += 1;
    ratings.forEach((rating) => {
      totalRating += rating;
      totalConsiderations += 1;
    });
  });

  if (totalConsiderations === 0) {
    return { score: 0, average: 0, completedDilemmas, totalConsiderations };
  }

  const average = totalRating / totalConsiderations;
  return {
    score: average.toFixed(1),
    average,
    completedDilemmas,
    totalConsiderations,
  };
}

function computeCourageGap(sectionCAnswers) {
  let totalScore = 0;
  let answeredQuestions = 0;

  SECTION_C_QUESTIONS.forEach((question) => {
    const rawRating = sectionCAnswers[question.id];
    if (rawRating === undefined || rawRating === null) return;

    // Reverse-score items where higher agreement = more courage (less gap)
    const rating = question.reverse ? 6 - rawRating : rawRating;
    totalScore += rating;
    answeredQuestions += 1;
  });

  if (answeredQuestions === 0) {
    return { average: 0, band: 'unknown', answeredQuestions, totalQuestions: SECTION_C_QUESTIONS.length };
  }

  const average = totalScore / answeredQuestions;
  let band;
  if (average < 2.5) band = 'low';
  else if (average < 3.5) band = 'moderate';
  else band = 'significant';

  return {
    average: average.toFixed(1),
    band,
    answeredQuestions,
    totalQuestions: SECTION_C_QUESTIONS.length,
  };
}

// ── Module Recommendations ───────────────────────────────────────────────────

const SCHEMA_LABELS = {
  PI: 'Personal Interest (Stages 2/3)',
  MN: 'Maintaining Norms (Stage 4)',
  PC: 'Postconventional (Stages 5/6)',
};

const MODULE_RECOMMENDATIONS = {
  PI: {
    label: 'Personal Interest (Conventional)',
    description:
      'Your responses emphasise personal relationships, individual consequences, and direct personal stakes. This pattern is consistent with Kohlberg\'s preconventional and early conventional stages — the foundation on which more complex moral reasoning develops.',
    modules: [
      { title: 'Moral Line Overview (Dual Track)', to: '/docs/modules/moral-line-overview-dual-track' },
      { title: 'Conventional Moral Reasoning', to: '/docs/modules/moral-line-conventional-reasoning' },
      { title: 'Shadow, Moral Injury & Forgiveness', to: '/docs/modules/moral-line-shadow-moral-injury' },
    ],
  },
  MN: {
    label: 'Maintaining Norms (Conventional)',
    description:
      'Your responses centre on laws, rules, social order, and maintaining the systems that hold society together. This is Kohlberg\'s conventional stage — the capacity to subordinate personal interests to shared norms and institutional expectations.',
    modules: [
      { title: 'Moral Line Overview (Dual Track)', to: '/docs/modules/moral-line-overview-dual-track' },
      { title: 'Conventional Moral Reasoning', to: '/docs/modules/moral-line-conventional-reasoning' },
      { title: 'Postconventional Moral Reasoning', to: '/docs/modules/moral-line-postconventional-reasoning' },
    ],
  },
  PC: {
    label: 'Postconventional (Principled)',
    description:
      'Your responses engage universal ethical principles, social contracts, and the recognition that laws and norms must themselves be justified by deeper values. This is Kohlberg\'s postconventional stage — moral reasoning that can evaluate the systems it operates within.',
    modules: [
      { title: 'Postconventional Moral Reasoning', to: '/docs/modules/moral-line-postconventional-reasoning' },
      { title: 'Moral Line — Imagination and Ethics', to: '/docs/modules/moral-line-imagination-integral-ethics' },
      { title: 'Moral Line Overview (Dual Track)', to: '/docs/modules/moral-line-overview-dual-track' },
    ],
  },
};

// ── Export Helper ────────────────────────────────────────────────────────────

function buildExportText(schemaProfile, careScore, courageGap) {
  const lines = [];
  lines.push('═══ Moral Line Developmental Profile ═══');
  lines.push('');
  lines.push('── Moral Reasoning Schema Profile ──');
  lines.push(`Dilemmas completed: ${schemaProfile.completedDilemmas}/${schemaProfile.totalDilemmas}`);
  lines.push('');
  lines.push(`  Personal Interest (Stages 2/3):  ${schemaProfile.piPct}%`);
  lines.push(`  Maintaining Norms (Stage 4):     ${schemaProfile.mnPct}%`);
  lines.push(`  Postconventional (Stages 5/6):   ${schemaProfile.pcPct}%`);
  lines.push('');
  if (schemaProfile.dominant) {
    lines.push(`Dominant schema: ${SCHEMA_LABELS[schemaProfile.dominant]}`);
  } else {
    lines.push('Dominant schema: Not determined');
  }
  lines.push('');
  lines.push('── Care Track Orientation ──');
  if (careScore.completedDilemmas > 0) {
    lines.push(`Care orientation score: ${careScore.score} / 5.0 (across ${careScore.totalConsiderations} considerations)`);
  } else {
    lines.push('No care-track data submitted.');
  }
  lines.push('');
  lines.push('── Moral Courage Gap ──');
  if (courageGap.answeredQuestions > 0) {
    const bandLabels = { low: 'Low gap', moderate: 'Moderate gap', significant: 'Significant gap', unknown: 'Unknown' };
    lines.push(`Perceived gap: ${courageGap.average} / 5.0 — ${bandLabels[courageGap.band] || 'Unknown'}`);
    lines.push(`(${courageGap.answeredQuestions}/${courageGap.totalQuestions} questions answered)`);
  } else {
    lines.push('No courage gap data submitted.');
  }
  lines.push('');
  lines.push('── Recommended Modules ──');
  if (schemaProfile.dominant && MODULE_RECOMMENDATIONS[schemaProfile.dominant]) {
    MODULE_RECOMMENDATIONS[schemaProfile.dominant].modules.forEach((m) => {
      lines.push(`  • ${m.title}`);
    });
  } else {
    lines.push('  Complete Section A to receive module recommendations.');
  }
  lines.push('');
  lines.push('── IMPORTANT ──');
  lines.push('This assessment adapts the Defining Issues Test (DIT) methodology');
  lines.push('(Rest, 1979; Rest et al., 1999) for self-guided developmental exploration.');
  lines.push('It is not a clinical instrument and has not been independently validated');
  lines.push('for the specific dilemmas used here. Treat your results as one data');
  lines.push('point for reflection, not a diagnostic measure of your moral development.');
  lines.push('');
  lines.push('No persistent data is stored — your results exist only in this browser session.');
  return lines.join('\n');
}

// ── Component ────────────────────────────────────────────────────────────────

export default function MoralLineAssessment() {
  const [sectionAAnswers, setSectionAAnswers] = useState({});
  const [sectionBAnswers, setSectionBAnswers] = useState({});
  const [sectionCAnswers, setSectionCAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const schemaProfile = computeSchemaProfile(sectionAAnswers);
  const careScore = computeCareScore(sectionBAnswers);
  const courageGap = computeCourageGap(sectionCAnswers);

  // ── Section A handlers ──
  const handleSectionAAction = (dilemmaId, action) => {
    setSectionAAnswers((prev) => ({
      ...prev,
      [dilemmaId]: { ...prev[dilemmaId], action },
    }));
  };

  const handleSectionARating = (dilemmaId, considerationId, rating) => {
    setSectionAAnswers((prev) => ({
      ...prev,
      [dilemmaId]: {
        ...prev[dilemmaId],
        ratings: { ...(prev[dilemmaId]?.ratings || {}), [considerationId]: rating },
      },
    }));
  };

  // ── Section B handler ──
  const handleSectionBRating = (dilemmaId, considerationId, rating) => {
    setSectionBAnswers((prev) => ({
      ...prev,
      [dilemmaId]: {
        ...prev[dilemmaId],
        ratings: { ...(prev[dilemmaId]?.ratings || {}), [considerationId]: rating },
      },
    }));
  };

  // ── Section C handler ──
  const handleSectionCChange = (questionId, rating) => {
    setSectionCAnswers((prev) => ({ ...prev, [questionId]: rating }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSectionAAnswers({});
    setSectionBAnswers({});
    setSectionCAnswers({});
    setSubmitted(false);
    setCopied(false);
  };

  const handleExport = useCallback(async () => {
    const text = buildExportText(schemaProfile, careScore, courageGap);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [schemaProfile, careScore, courageGap]);

  const sectionAComplete = Object.keys(sectionAAnswers).filter(
    (id) => sectionAAnswers[id]?.action
  ).length === SECTION_A_DILEMMAS.length;

  // ── Results view ──
  if (submitted) {
    const rec = schemaProfile.dominant ? MODULE_RECOMMENDATIONS[schemaProfile.dominant] : null;
    const bandLabels = { low: 'Low gap', moderate: 'Moderate gap', significant: 'Significant gap' };

    return (
      <div className={styles.results}>
        <h2 className={styles.resultsTitle}>Your Moral Developmental Profile</h2>

        {/* Schema Profile */}
        <div className={styles.resultSection}>
          <h3>Moral Reasoning Schema Profile</h3>
          <p className={styles.resultNote}>
            Based on your importance ratings of different considerations across{' '}
            {schemaProfile.completedDilemmas} of {schemaProfile.totalDilemmas} justice-track
            dilemmas. Each consideration reflects one of Rest&apos;s three moral schemas.
          </p>
          <div className={styles.schemaBars}>
            {[
              { key: 'PI', label: 'Personal Interest (Stages 2/3)', pct: schemaProfile.piPct },
              { key: 'MN', label: 'Maintaining Norms (Stage 4)', pct: schemaProfile.mnPct },
              { key: 'PC', label: 'Postconventional (Stages 5/6)', pct: schemaProfile.pcPct },
            ].map((item) => (
              <div key={item.key} className={styles.schemaBarRow}>
                <span className={styles.schemaLabel}>{item.label}</span>
                <div className={styles.schemaBarTrack}>
                  <div
                    className={`${styles.schemaBarFill} ${schemaProfile.dominant === item.key ? styles.schemaBarDominant : ''}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className={styles.schemaCount}>{item.pct}%</span>
              </div>
            ))}
          </div>
          {schemaProfile.dominant && (
            <p className={styles.dominantNote}>
              <strong>Your responses most consistently reflect {SCHEMA_LABELS[schemaProfile.dominant]} reasoning.</strong>
            </p>
          )}
        </div>

        {/* Care Track */}
        <div className={styles.resultSection}>
          <h3>Care Track Orientation</h3>
          <p className={styles.resultNote}>
            Based on your importance ratings of relational and contextual considerations
            across the care-track dilemmas. Higher scores indicate stronger orientation toward
            care-based moral reasoning — attending to relationships, context, and the wellbeing of
            specific others.
          </p>
          {careScore.completedDilemmas > 0 ? (
            <p>
              Care orientation score: <strong>{careScore.score} / 5.0</strong> across{' '}
              {careScore.totalConsiderations} considerations
            </p>
          ) : (
            <p>No care-track data submitted.</p>
          )}
        </div>

        {/* Moral Courage Gap */}
        <div className={styles.resultSection}>
          <h3>Moral Courage Gap</h3>
          <p className={styles.resultNote}>
            The gap between what we believe is right and what we actually do is a well-documented
            phenomenon in moral psychology (Narvaez &amp; Rest, 1995). A larger gap does not mean
            you are less moral — it often reflects honest self-awareness.
          </p>
          {courageGap.answeredQuestions > 0 ? (
            <>
              <div className={styles.gapDisplay}>
                <span className={styles.gapValue}>{courageGap.average}</span>
                <span className={styles.gapScale}>/ 5.0</span>
              </div>
              <p>
                Interpretation: <strong>{bandLabels[courageGap.band] || 'Unknown'}</strong>{' '}
                between moral conviction and moral action
                {' '}({courageGap.answeredQuestions}/{courageGap.totalQuestions} questions answered)
              </p>
              {courageGap.band === 'significant' && (
                <p className={styles.gapNote}>
                  A significant gap often accompanies developmental transitions — as your moral
                  reasoning develops, your capacity to act on new insights may lag behind. This is
                  normal and is itself a developmental signal.
                </p>
              )}
            </>
          ) : (
            <p>No moral courage gap data submitted.</p>
          )}
        </div>

        {/* Module Recommendations */}
        <div className={styles.resultSection}>
          <h3>Recommended Modules</h3>
          {rec ? (
            <>
              <p className={styles.resultNote}>{rec.description}</p>
              <ul className={styles.moduleList}>
                {rec.modules.map((m, i) => (
                  <li key={i}>
                    <Link to={m.to}>{m.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className={styles.resultNote}>
              Complete at least one justice-track dilemma to receive module recommendations.
            </p>
          )}
        </div>

        {/* DIT Disclaimer */}
        <div className={`${styles.resultSection} ${styles.disclaimer}`}>
          <h3>Important</h3>
          <p>
            This assessment adapts the Defining Issues Test (DIT) methodology (Rest, 1979; Rest et
            al., 1999) for self-guided developmental exploration. It is not a clinical instrument
            and has not been independently validated for the specific dilemmas used here. Treat your
            results as one data point for reflection, not a diagnostic measure of your moral
            development.
          </p>
          <p>
            Moral reasoning is domain-specific and context-sensitive. You may reason at different
            levels depending on the topic, your emotional state, and your familiarity with the
            situation. Development is uneven, ongoing, and not captured by a single assessment.
          </p>
          <p>
            This tool includes both justice-track and care-track dilemmas because mature moral
            development integrates both — Gilligan&apos;s (1982) critique of Kohlberg&apos;s
            justice-only model is central to how this assessment is designed. Neither track is
            superior to the other.
          </p>
          <p>
            No persistent data is stored — your results exist only in this browser session.
          </p>
        </div>

        {/* Actions */}
        <div className={styles.resultActions}>
          <button className={styles.exportButton} onClick={handleExport}>
            {copied ? '✓ Copied to Clipboard' : 'Export to Journal'}
          </button>
          <button className={styles.resetButton} onClick={handleReset}>
            Take Assessment Again
          </button>
        </div>
      </div>
    );
  }

  // ── Assessment form view ──
  return (
    <div className={styles.assessment}>
      {/* Opening Framing */}
      <div className={styles.framingMessage}>
        <p>
          This assessment explores both <strong>justice-based</strong> and{' '}
          <strong>care-based</strong> moral reasoning. Both are equally valid developmental tracks,
          and mature moral development integrates both.
        </p>
      </div>

      {/* ── Section A: Justice Track ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section A: Justice-Track Moral Reasoning</h2>
        <p className={styles.sectionIntro}>
          Below are three moral dilemmas. For each, indicate what you think the person should do,
          then rate how important each consideration is to your thinking. There are no right or
          wrong answers — different people weigh different considerations, and all approaches are
          developmentally informative.
        </p>
        <div className={styles.sectionStatus}>
          {sectionAComplete
            ? '✓ All 3 dilemmas completed'
            : `${Object.keys(sectionAAnswers).filter((id) => sectionAAnswers[id]?.action).length} of ${SECTION_A_DILEMMAS.length} dilemmas completed`}
        </div>

        {SECTION_A_DILEMMAS.map((dilemma, dIndex) => (
          <div key={dilemma.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Dilemma {dIndex + 1} of 3</p>
            <h3 className={styles.dilemmaTitle}>{dilemma.title}</h3>
            <p className={styles.scenarioText}>{dilemma.scenario}</p>

            {/* Action choice */}
            <p className={styles.actionQuestion}>{dilemma.actionQuestion}</p>
            <div className={styles.actionOptions}>
              <label className={styles.optionLabel}>
                <input
                  type="radio"
                  name={`${dilemma.id}-action`}
                  value="yes"
                  checked={sectionAAnswers[dilemma.id]?.action === 'yes'}
                  onChange={() => handleSectionAAction(dilemma.id, 'yes')}
                  className={styles.radio}
                />
                <span className={styles.optionText}>Yes</span>
              </label>
              <label className={styles.optionLabel}>
                <input
                  type="radio"
                  name={`${dilemma.id}-action`}
                  value="no"
                  checked={sectionAAnswers[dilemma.id]?.action === 'no'}
                  onChange={() => handleSectionAAction(dilemma.id, 'no')}
                  className={styles.radio}
                />
                <span className={styles.optionText}>No</span>
              </label>
            </div>

            {/* Consideration ratings */}
            <div className={styles.considerationsSection}>
              <p className={styles.considerationsHeader}>
                Rate how important each of the following considerations is to your thinking about
                this dilemma:
              </p>
              {dilemma.considerations.map((c) => (
                <div key={c.id} className={styles.considerationRow}>
                  <p className={styles.considerationText}>{c.text}</p>
                  <div className={styles.likertScale}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <label key={val} className={styles.likertLabel}>
                        <input
                          type="radio"
                          name={c.id}
                          value={val}
                          checked={sectionAAnswers[dilemma.id]?.ratings?.[c.id] === val}
                          onChange={() => handleSectionARating(dilemma.id, c.id, val)}
                          className={styles.radio}
                        />
                        <span className={styles.likertValue}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className={styles.likertLegend}>
                {Object.entries(LIKERT_LABELS).map(([val, label]) => (
                  <span key={val} className={styles.legendItem}>
                    {val} = {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Section B: Care Track ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section B: Care-Track Moral Reasoning</h2>
        <p className={styles.sectionIntro}>
          The following dilemmas explore moral reasoning through a care and relationship lens. Rate
          how important each consideration is to your thinking. As with Section A, there are no
          right or wrong answers.
        </p>
        <div className={styles.sectionStatus}>
          {Object.keys(sectionBAnswers).filter((id) => sectionBAnswers[id]?.ratings && Object.keys(sectionBAnswers[id].ratings).length > 0).length === SECTION_B_DILEMMAS.length
            ? '✓ All 2 dilemmas completed'
            : `${Object.keys(sectionBAnswers).filter((id) => sectionBAnswers[id]?.ratings && Object.keys(sectionBAnswers[id].ratings).length > 0).length} of ${SECTION_B_DILEMMAS.length} dilemmas completed`}
        </div>

        {SECTION_B_DILEMMAS.map((dilemma, dIndex) => (
          <div key={dilemma.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Care Dilemma {dIndex + 1} of 2</p>
            <h3 className={styles.dilemmaTitle}>{dilemma.title}</h3>
            <p className={styles.scenarioText}>{dilemma.scenario}</p>

            <div className={styles.considerationsSection}>
              <p className={styles.considerationsHeader}>
                Rate how important each consideration is to your thinking:
              </p>
              {dilemma.considerations.map((c) => (
                <div key={c.id} className={styles.considerationRow}>
                  <p className={styles.considerationText}>{c.text}</p>
                  <div className={styles.likertScale}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <label key={val} className={styles.likertLabel}>
                        <input
                          type="radio"
                          name={c.id}
                          value={val}
                          checked={sectionBAnswers[dilemma.id]?.ratings?.[c.id] === val}
                          onChange={() => handleSectionBRating(dilemma.id, c.id, val)}
                          className={styles.radio}
                        />
                        <span className={styles.likertValue}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className={styles.likertLegend}>
                {Object.entries(LIKERT_LABELS).map(([val, label]) => (
                  <span key={val} className={styles.legendItem}>
                    {val} = {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Section C: Moral Courage Gap ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section C: Moral Courage Gap</h2>
        <p className={styles.sectionIntro}>
          Knowing what is right and doing what is right are different things. The following
          questions explore the gap between your moral convictions and your moral actions. Answer
          honestly — there is no judgment in honest self-awareness.
        </p>
        <div className={styles.sectionStatus}>
          {Object.keys(sectionCAnswers).length === SECTION_C_QUESTIONS.length
            ? '✓ All 5 questions answered'
            : `${Object.keys(sectionCAnswers).length} of ${SECTION_C_QUESTIONS.length} questions answered`}
        </div>

        {SECTION_C_QUESTIONS.map((question, qIndex) => (
          <div key={question.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Question {qIndex + 1} of 5</p>
            <p className={styles.questionText}>{question.text}</p>
            <div className={styles.likertScale}>
              {[1, 2, 3, 4, 5].map((val) => (
                <label key={val} className={styles.likertLabel}>
                  <input
                    type="radio"
                    name={question.id}
                    value={val}
                    checked={sectionCAnswers[question.id] === val}
                    onChange={() => handleSectionCChange(question.id, val)}
                    className={styles.radio}
                  />
                  <span className={styles.likertValue}>{val}</span>
                </label>
              ))}
            </div>
            <div className={styles.courageLegend}>
              {Object.entries(COURAGE_LIKERT_LABELS).map(([val, label]) => (
                <span key={val} className={styles.legendItem}>
                  {val} = {label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Submit ── */}
      <div className={styles.submitArea}>
        {!sectionAComplete && (
          <p className={styles.submitHint}>
            Section A is not yet complete ({Object.keys(sectionAAnswers).filter((id) => sectionAAnswers[id]?.action).length}/{SECTION_A_DILEMMAS.length} dilemmas answered). You can still submit to see your profile based on the dilemmas you completed.
          </p>
        )}
        <button className={styles.submitButton} onClick={handleSubmit}>
          View Your Moral Profile
        </button>
        <p className={styles.privacyNote}>
          No data is stored or transmitted. Your responses remain in this browser session only.
        </p>
      </div>
    </div>
  );
}
