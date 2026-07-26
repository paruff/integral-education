import React, { useState, useCallback } from 'react';
import Link from '@docusaurus/Link';
import styles from './MoralLineAssessment.module.css';

// ─── Section A: Scenario-Based Meaning-Making ─────────────────────────────────
// 10 scenarios presenting interpersonal, moral, or identity challenges.
// Each option is tagged to a Cook-Greuter stage group (hidden during completion):
//   CON = Conformist / Expert (conventional, rule- and role-based)
//   ACH = Achiever (late conventional, effectiveness-focused)
//   IND = Individualist (early postconventional, self-questioning)
//   INT = Strategist / Alchemist (integral, systems-aware, transformative)
//
// Options are presented in mixed order so stage labels are not obvious.

const SECTION_A_SCENARIOS = [
  {
    id: 's1',
    title: 'Team Consensus',
    text: 'You are in a meeting where your team reaches a consensus that you privately disagree with. Your most natural response is to:',
    options: [
      { id: 's1-a', label: 'Go along with the group decision. Harmony matters, and your role is to be a supportive team member.', stage: 'CON' },
      { id: 's1-b', label: 'Implement the decision efficiently while privately noting its limitations for future reference.', stage: 'ACH' },
      { id: 's1-c', label: 'Share your perspective, but hold your view lightly — you have been wrong before, and group intelligence has value.', stage: 'IND' },
      { id: 's1-d', label: 'Name the dynamic you are noticing, offer your perspective clearly, and stay curious about how the group arrived where it did.', stage: 'INT' },
    ],
  },
  {
    id: 's2',
    title: 'Significant Mistake',
    text: 'You make a significant mistake at work that affects your team. Your first instinct is to:',
    options: [
      { id: 's2-a', label: 'Apologise and fix it quickly. You do not want to damage your reputation or the team\'s trust in you.', stage: 'CON' },
      { id: 's2-b', label: 'Analyse what went wrong, develop a correction plan, and communicate the steps you are taking.', stage: 'ACH' },
      { id: 's2-c', label: 'Hold yourself genuinely accountable without excessive self-criticism — you see this as information about where you still have growing to do.', stage: 'IND' },
      { id: 's2-d', label: 'Acknowledge the impact on others while also exploring what the mistake reveals about your assumptions and meaning-making.', stage: 'INT' },
    ],
  },
  {
    id: 's3',
    title: 'Personal Change',
    text: 'A close friend tells you that you have changed significantly over the past few years — that you are not the same person they used to know. You:',
    options: [
      { id: 's3-a', label: 'Feel somewhat unsettled and wonder if the changes might be pulling you away from values and people that matter to you.', stage: 'CON' },
      { id: 's3-b', label: 'Feel confirmed — you have been working intentionally to develop, and the change reflects your efforts.', stage: 'ACH' },
      { id: 's3-c', label: 'Feel genuinely curious. You have been aware of your own shifts and wonder how others are experiencing them.', stage: 'IND' },
      { id: 's3-d', label: 'Receive it with equanimity. Identity as a fixed thing has never quite fit your experience, and you are interested in what this observation opens up.', stage: 'INT' },
    ],
  },
  {
    id: 's4',
    title: 'Rule That Causes Harm',
    text: 'You discover that a rule or norm you have always followed is causing harm in a specific situation. You:',
    options: [
      { id: 's4-a', label: 'Follow the rule anyway. Exceptions create inconsistency, and it is not your place to make individual judgments about established norms.', stage: 'CON' },
      { id: 's4-b', label: 'Make a pragmatic exception in this case while working to change the norm through proper channels.', stage: 'ACH' },
      { id: 's4-c', label: 'Sit with the genuine tension between the norm and the specific situation, rather than resolving it too quickly.', stage: 'IND' },
      { id: 's4-d', label: 'Recognise that the rule is itself a constructed response to values, and use this case as an opportunity to examine what values are actually at stake.', stage: 'INT' },
    ],
  },
  {
    id: 's5',
    title: 'Critical Feedback',
    text: 'Someone you deeply respect offers critical feedback that challenges a central belief you hold about yourself. You:',
    options: [
      { id: 's5-a', label: 'Feel initially defensive, then work to align yourself with what the respected person is saying.', stage: 'CON' },
      { id: 's5-b', label: 'Evaluate the feedback against evidence and adjust your self-assessment if the criticism proves valid.', stage: 'ACH' },
      { id: 's5-c', label: 'Feel the sting, sit with it, and eventually appreciate the feedback even if you do not fully agree — your self-concept is not so fragile.', stage: 'IND' },
      { id: 's5-d', label: 'Experience both the challenge and the affirmation simultaneously, curious about what the feedback reveals about both yourself and the person offering it.', stage: 'INT' },
    ],
  },
  {
    id: 's6',
    title: 'Competing Commitments',
    text: 'You are deeply committed to two different values that suddenly require you to choose between them. You:',
    options: [
      { id: 's6-a', label: 'Refer to what your community, tradition, or role requires of you in this kind of situation.', stage: 'CON' },
      { id: 's6-b', label: 'Analyse the options systematically and choose the path that produces the best overall outcome.', stage: 'ACH' },
      { id: 's6-c', label: 'Sit with the tension and accept that there may be no clean answer — and that you will likely carry some regret either way.', stage: 'IND' },
      { id: 's6-d', label: 'Hold both values simultaneously and look for a creative path that honours the complexity rather than simply dissolving it.', stage: 'INT' },
    ],
  },
  {
    id: 's7',
    title: 'Shared Recognition',
    text: 'You receive public recognition for something that you know involved the significant contributions of others who are not being credited. You:',
    options: [
      { id: 's7-a', label: 'Accept the recognition graciously. Recognition for the team reflects well on everyone, and declining would be awkward.', stage: 'CON' },
      { id: 's7-b', label: 'Publicly acknowledge the contributions of others while accepting the recognition — good leaders share credit.', stage: 'ACH' },
      { id: 's7-c', label: 'Feel genuinely uneasy about the attribution and look for specific, concrete ways to make the invisible contributions visible.', stage: 'IND' },
      { id: 's7-d', label: 'Notice something revealing in the recognition — what does it say about how achievement is culturally attributed? — while still attending to the practical matter of fair credit.', stage: 'INT' },
    ],
  },
  {
    id: 's8',
    title: 'Life Direction Uncertainty',
    text: 'You are facing a period of significant uncertainty about your direction in life. Your primary orientation is to:',
    options: [
      { id: 's8-a', label: 'Seek guidance from trusted people and frameworks that have proven reliable in the past.', stage: 'CON' },
      { id: 's8-b', label: 'Identify the challenge clearly, research your options, and develop a concrete plan of action.', stage: 'ACH' },
      { id: 's8-c', label: 'Sit with the uncertainty as information. Perhaps you are in a necessary transition, and forcing clarity too soon would foreclose important learning.', stage: 'IND' },
      { id: 's8-d', label: 'Hold the uncertainty lightly, trusting that meaning will emerge from engagement rather than from planning alone, while staying attentive to signals from within and around you.', stage: 'INT' },
    ],
  },
  {
    id: 's9',
    title: 'Persistent Interpersonal Conflict',
    text: 'You are in a long-standing conflict with someone whose approach to the world is fundamentally different from yours. You:',
    options: [
      { id: 's9-a', label: 'Try to find enough common ground to re-establish the relationship on a workable basis.', stage: 'CON' },
      { id: 's9-b', label: 'Clarify your position clearly, try to understand their position, and look for a fair resolution.', stage: 'ACH' },
      { id: 's9-c', label: 'Find yourself genuinely curious about how they arrived at their worldview, even as you disagree with it.', stage: 'IND' },
      { id: 's9-d', label: 'Hold the conflict as itself informative — the tension between your frameworks may reveal something that neither of you can see alone.', stage: 'INT' },
    ],
  },
  {
    id: 's10',
    title: 'Facing a Personal Limit',
    text: 'You encounter a deep limitation in yourself — a habitual way of thinking or relating that you can see is causing harm, but cannot yet fully change. You:',
    options: [
      { id: 's10-a', label: 'Commit to working harder to overcome it and look for practical strategies to improve.', stage: 'CON' },
      { id: 's10-b', label: 'Develop a concrete improvement plan, seek feedback, and track your progress over time.', stage: 'ACH' },
      { id: 's10-c', label: 'Hold the limitation with compassion rather than judgment, recognising that seeing it is itself a kind of progress.', stage: 'IND' },
      { id: 's10-d', label: 'Recognise that this limitation belongs to your current way of making meaning — what is needed is not just effort, but a deeper shift in how you are seeing.', stage: 'INT' },
    ],
  },
];

// ─── Section B: Sentence Completion Reflection ───────────────────────────────
// 8 open-ended sentence stems. Learner writes their completion, then is shown
// a rubric of how different stage orientations typically complete each stem.

const SECTION_B_STEMS = [
  {
    id: 'b1',
    stem: 'When someone disagrees with me strongly, I...',
    rubric: {
      CON: '"...try to restore harmony or defer to whoever has more authority or experience in the situation."',
      ACH: '"...evaluate their reasoning against evidence and refine my position if their argument is stronger."',
      IND: '"...get curious about how they arrived at a different view, and notice my own attachment to being right."',
      INT: '"...see the disagreement itself as potentially generative — the tension between our positions may reveal something neither of us can see alone."',
    },
  },
  {
    id: 'b2',
    stem: 'What I value most in myself is...',
    rubric: {
      CON: '"...being reliable, loyal, and consistent — someone others can count on to do the right thing."',
      ACH: '"...my ability to achieve meaningful results and continuously improve my performance."',
      IND: '"...my capacity for honest self-examination and my willingness to question my own assumptions."',
      INT: '"...the ability to hold complexity without needing to resolve it prematurely, and to act with integrity even in ambiguous situations."',
    },
  },
  {
    id: 'b3',
    stem: 'When I make a mistake that affects others, I...',
    rubric: {
      CON: '"...feel bad about letting people down, try to repair the damage quickly, and work to not repeat it."',
      ACH: '"...take accountability, analyse what went wrong, and implement concrete changes to avoid the same outcome."',
      IND: '"...hold myself accountable without spiralling into self-criticism — I try to understand the mistake as information."',
      INT: '"...see the mistake as revealing something about my assumptions or blind spots, and I get curious about what that might mean for how I am making meaning."',
    },
  },
  {
    id: 'b4',
    stem: 'The thing about myself that I find hardest to accept is...',
    rubric: {
      CON: '"...the ways I fall short of my own standards, or the moments when I am not who I think I should be."',
      ACH: '"...the limitations in my performance — the gap between what I am capable of and what I actually achieve."',
      IND: '"...my own contradictions — the parts of me that do not fit the coherent self-narrative I am trying to construct."',
      INT: '"...the depth of my own conditioning — the way even my most sincere self-examination may still be shaped by assumptions I cannot fully see."',
    },
  },
  {
    id: 'b5',
    stem: 'When I think about who I am at my core, I...',
    rubric: {
      CON: '"...think of someone defined by their roles, relationships, and commitments — a member of something larger than myself."',
      ACH: '"...think of someone defined by their values, goals, and the impact they are working to create in the world."',
      IND: '"...find myself uncertain — the core keeps shifting the more closely I look at it, and I am not sure that is a problem."',
      INT: '"...notice that \'who I am\' is less a noun than a verb — more like an ongoing process of making meaning than a fixed entity I am discovering."',
    },
  },
  {
    id: 'b6',
    stem: 'What I have come to understand about other people is...',
    rubric: {
      CON: '"...that most people want to do the right thing according to their community\'s standards, even if they disagree about what that is."',
      ACH: '"...that people operate according to their own goals and incentives, and understanding those makes collaboration more effective."',
      IND: '"...that people\'s behaviour makes complete sense from within their own framework, even when that framework is very different from mine."',
      INT: '"...that each person is, in some sense, living in a different world — shaped by their stage, type, history, and context — and genuine understanding requires entering that world rather than just observing it from mine."',
    },
  },
  {
    id: 'b7',
    stem: 'When I face a situation where there is no clear right answer, I...',
    rubric: {
      CON: '"...look to trusted sources — tradition, leaders I respect, or established principles — to guide my decision."',
      ACH: '"...gather as much information as I can, weigh the options systematically, and make the best judgment I am capable of."',
      IND: '"...sit with the ambiguity rather than forcing a premature resolution, and accept that some decisions will carry regret regardless."',
      INT: '"...hold the question lightly, trusting that continued engagement will reveal more than analysis alone can provide, while still acting decisively when needed."',
    },
  },
  {
    id: 'b8',
    stem: 'The most important thing I have learned about myself in the last five years is...',
    rubric: {
      CON: '"...that I am more deeply shaped by my relationships, commitments, and community than I previously understood."',
      ACH: '"...what actually drives my best performance, and how to create the conditions for sustained effectiveness."',
      IND: '"...that many of the convictions I thought were \'just true\' were actually assumptions shaped by my particular history and context."',
      INT: '"...that development is not linear, that each \'stage\' of insight brings new blind spots, and that wisdom may lie less in certainty than in the quality of one\'s questions."',
    },
  },
];

// ─── Stage Group Labels ───────────────────────────────────────────────────────

const STAGE_LABELS = {
  CON: 'Grounded in Community and Shared Standards',
  ACH: 'Focused on Effectiveness and Results',
  IND: 'Examining Your Own Assumptions',
  INT: 'Holding Multiple Systems and Perspectives at Once',
};

const STAGE_DESCRIPTIONS = {
  CON: 'Your responses most frequently reflect a pattern where meaning-making centres on belonging, role expectations, rules, and the standards of communities and institutions you respect. Reliability, consistency, and meeting shared norms feel important. This is a foundational pattern of adult meaning-making — the base on which further development builds.',
  ACH: 'Your responses most frequently reflect a pattern where meaning-making centres on effectiveness, goal-achievement, and self-improvement. You are oriented toward outcomes, evidence, and continuous development. Most leadership development models are designed for and by this pattern — it is the dominant centre of gravity in professional culture.',
  IND: 'Your responses most frequently reflect a pattern where meaning-making shifts from identifying with outcomes to examining the process of meaning-making itself. Questions about identity, relativity, and the limits of conventional frameworks become live. This can feel like a disorienting transition — old certainties start to show their seams.',
  INT: 'Your responses most frequently reflect a pattern where meaning-making becomes systemic and transformative. You are able to hold multiple frameworks simultaneously, see the ways that your own perspective is itself constructed, and act with both deep commitment and genuine epistemic humility. This pattern is relatively rare across the population.',
};

const MODULE_RECOMMENDATIONS = {
  CON: [
    { title: 'Self Line Overview — The Psychograph', to: '/docs/modules/self-line-overview-psychograph' },
    { title: 'Self Line: Conventional — Conformist to Achiever', to: '/docs/modules/self-line-conventional-conformist-achiever' },
    { title: 'Orientation: Values, Belonging, and Structure', to: '/docs/modules/amber-mythic-orientation' },
  ],
  ACH: [
    { title: 'Self Line Overview — The Psychograph', to: '/docs/modules/self-line-overview-psychograph' },
    { title: 'Self Line: Conventional — Conformist to Achiever', to: '/docs/modules/self-line-conventional-conformist-achiever' },
    { title: 'Self Line: Postconventional — Individualist to Strategist', to: '/docs/modules/self-line-postconventional-individualist-strategist' },
  ],
  IND: [
    { title: 'Self Line: Postconventional — Individualist to Strategist', to: '/docs/modules/self-line-postconventional-individualist-strategist' },
    { title: 'Self Line Overview — The Psychograph', to: '/docs/modules/self-line-overview-psychograph' },
    { title: 'Self Line: Integration Practice', to: '/docs/modules/self-line-integration-practice' },
  ],
  INT: [
    { title: 'Self Line: Postautonomous — Construct-Aware to Unitive', to: '/docs/modules/self-line-postautonomous-construct-aware-unitive' },
    { title: 'Self Line: Integration Practice', to: '/docs/modules/self-line-integration-practice' },
    { title: 'Self Line: Postconventional — Individualist to Strategist', to: '/docs/modules/self-line-postconventional-individualist-strategist' },
  ],
};

// ─── Scoring ──────────────────────────────────────────────────────────────────

function computeMeaningMakingProfile(answers) {
  const counts = { CON: 0, ACH: 0, IND: 0, INT: 0 };
  const total = Object.keys(answers).length;

  Object.values(answers).forEach((stage) => {
    if (counts[stage] !== undefined) counts[stage] += 1;
  });

  const pct = {};
  Object.keys(counts).forEach((k) => {
    pct[k] = total > 0 ? Math.round((counts[k] / total) * 100) : 0;
  });

  let dominant = null;
  if (total > 0) {
    dominant = Object.keys(counts).reduce((a, b) => {
      if (counts[b] > counts[a]) return b;
      // Tie-break: INT > IND > ACH > CON
      const priority = { INT: 4, IND: 3, ACH: 2, CON: 1 };
      if (counts[b] === counts[a]) return priority[b] > priority[a] ? b : a;
      return a;
    });
  }

  return { counts, pct, dominant, total };
}

// ─── Export Helper ────────────────────────────────────────────────────────────

function buildExportText(profile, sectionBResponses) {
  const lines = [];
  lines.push('═══ Self Line Developmental Profile — Journal Export ═══');
  lines.push('');
  lines.push('── Section A: Meaning-Making Profile ──');
  lines.push(`Scenarios answered: ${profile.total} of ${SECTION_A_SCENARIOS.length}`);
  lines.push('');
  lines.push(`  ${STAGE_LABELS.CON}: ${profile.pct.CON}%  (${profile.counts.CON} responses)`);
  lines.push(`  ${STAGE_LABELS.ACH}: ${profile.pct.ACH}%  (${profile.counts.ACH} responses)`);
  lines.push(`  ${STAGE_LABELS.IND}: ${profile.pct.IND}%  (${profile.counts.IND} responses)`);
  lines.push(`  ${STAGE_LABELS.INT}: ${profile.pct.INT}%  (${profile.counts.INT} responses)`);
  lines.push('');
  if (profile.dominant) {
    lines.push(`Dominant pattern: ${STAGE_LABELS[profile.dominant]}`);
  }
  lines.push('');
  lines.push('── Section B: Sentence Completion Responses ──');
  lines.push('');
  SECTION_B_STEMS.forEach((stem) => {
    const response = sectionBResponses[stem.id] || '';
    lines.push(`Stem: ${stem.stem}`);
    lines.push(`Your completion: ${response || '(not answered)'}`);
    lines.push('');
    lines.push('Reflection rubric:');
    Object.entries(stem.rubric).forEach(([stage, example]) => {
      lines.push(`  ${STAGE_LABELS[stage]}: ${example}`);
    });
    lines.push('');
    lines.push('Reflection questions:');
    lines.push('  • Which rubric description feels closest to your completion — or furthest?');
    lines.push('  • What does your completion reveal about what you find most important in this situation?');
    lines.push('  • If you wrote a different completion tomorrow, what might change?');
    lines.push('');
  });
  lines.push('── Important Note ──');
  lines.push('This tool offers a phenomenological mirror, not a clinical assessment.');
  lines.push('Genuine ego development measurement requires trained evaluators and the');
  lines.push('formal Washington University Sentence Completion Test (WUSCT).');
  lines.push('');
  lines.push('No persistent data was stored — this export is your only record.');
  return lines.join('\n');
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SelfLineAssessment() {
  const [sectionAAnswers, setSectionAAnswers] = useState({});
  const [sectionBResponses, setSectionBResponses] = useState({});
  const [showRubric, setShowRubric] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const profile = computeMeaningMakingProfile(sectionAAnswers);
  const sectionAComplete = profile.total === SECTION_A_SCENARIOS.length;

  const handleSectionASelect = (scenarioId, stage) => {
    setSectionAAnswers((prev) => ({ ...prev, [scenarioId]: stage }));
  };

  const handleSectionBChange = (stemId, value) => {
    setSectionBResponses((prev) => ({ ...prev, [stemId]: value }));
  };

  const toggleRubric = (stemId) => {
    setShowRubric((prev) => ({ ...prev, [stemId]: !prev[stemId] }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSectionAAnswers({});
    setSectionBResponses({});
    setShowRubric({});
    setSubmitted(false);
    setCopied(false);
  };

  const handleExport = useCallback(async () => {
    const text = buildExportText(profile, sectionBResponses);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [profile, sectionBResponses]);

  // ── Results view ────────────────────────────────────────────────────────────

  if (submitted) {
    const rec = profile.dominant ? MODULE_RECOMMENDATIONS[profile.dominant] : null;

    return (
      <div className={styles.results}>
        <h2 className={styles.resultsTitle}>Your Self Line Meaning-Making Profile</h2>

        {/* Phenomenological mirror note */}
        <div className={`${styles.resultSection} ${styles.disclaimer}`}>
          <h3>⚠ Important: A Mirror, Not a Measure</h3>
          <p>
            This tool offers a <strong>phenomenological mirror</strong>, not a clinical assessment.
            Genuine ego development measurement requires trained evaluators and the formal{' '}
            <strong>Washington University Sentence Completion Test (WUSCT)</strong>, available
            through certified practitioners. Self-report instruments — including this one — are
            inherently limited for ego development assessment because the very instrument being
            used to assess your stage is itself filtered through that stage.
          </p>
          <p>
            Treat these results as one data point for reflection, not a diagnostic measure of
            your development.
          </p>
        </div>

        {/* Section A Results */}
        <div className={styles.resultSection}>
          <h3>Section A: Meaning-Making Profile</h3>
          <p className={styles.resultNote}>
            The following profile shows the distribution of your responses across the
            conventional-postconventional arc. Most people show a spread across multiple
            action-logics — this is normal and expected. The dominant pattern suggests where
            your centre of gravity most often rests, not a ceiling on your capacity.
          </p>

          <div className={styles.schemaBars}>
            {Object.entries(STAGE_LABELS).map(([key, label]) => (
              <div key={key} className={styles.schemaBarRow}>
                <span className={styles.schemaLabel}>{label}</span>
                <div className={styles.schemaBarTrack}>
                  <div
                    className={`${styles.schemaBarFill}${profile.dominant === key ? ` ${styles.schemaBarDominant}` : ''}`}
                    style={{ width: `${profile.pct[key] || 0}%` }}
                  />
                </div>
                <span className={styles.schemaCount}>
                  {profile.pct[key]}% ({profile.counts[key]})
                </span>
              </div>
            ))}
          </div>

          {profile.dominant && (
            <p className={styles.dominantNote}>
              <strong>Dominant pattern:</strong> {STAGE_LABELS[profile.dominant]}
              {' — '}
              {STAGE_DESCRIPTIONS[profile.dominant]}
            </p>
          )}

          {profile.total < SECTION_A_SCENARIOS.length && (
            <p className={styles.resultNote} style={{ color: 'var(--ifm-color-warning-dark)' }}>
              You answered {profile.total} of {SECTION_A_SCENARIOS.length} scenarios. Complete
              all scenarios for a more representative profile.
            </p>
          )}
        </div>

        {/* Section B Reflection Guide */}
        <div className={styles.resultSection}>
          <h3>Section B: Sentence Completion Reflection Guide</h3>
          <p className={styles.resultNote}>
            The following is a reflection guide, not a scored measure. For each stem, you can
            review your completion alongside interpretive rubrics showing how different
            orientations typically respond. The questions below each stem are more important
            than any label.
          </p>

          {SECTION_B_STEMS.map((stem) => {
            const response = sectionBResponses[stem.id];
            return (
              <div key={stem.id} className={styles.questionCard} style={{ marginBottom: '1.25rem' }}>
                <p className={styles.questionNumber}>{stem.stem}</p>
                {response ? (
                  <p className={styles.scenarioText}>
                    <em>Your completion:</em> {response}
                  </p>
                ) : (
                  <p className={styles.scenarioText} style={{ color: 'var(--ifm-color-emphasis-400)' }}>
                    <em>(Not answered)</em>
                  </p>
                )}

                <details style={{ marginTop: '0.75rem' }}>
                  <summary style={{ cursor: 'pointer', fontSize: '0.9rem', color: 'var(--ifm-color-primary)', fontWeight: 600 }}>
                    View example responses
                  </summary>
                  <div style={{ marginTop: '0.75rem', paddingLeft: '0.75rem', borderLeft: '3px solid var(--ifm-color-emphasis-200)' }}>
                    {Object.entries(stem.rubric).map(([stage, example]) => (
                      <div key={stage} style={{ marginBottom: '0.65rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ifm-color-emphasis-600)', display: 'block', marginBottom: '0.2rem' }}>
                          {STAGE_LABELS[stage]}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-800)' }}>{example}</span>
                      </div>
                    ))}
                  </div>
                </details>

                <div style={{ marginTop: '0.75rem', padding: '0.65rem', background: 'var(--ifm-color-emphasis-0)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-700)' }}>
                  <strong>Reflection questions:</strong>
                  <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.25rem' }}>
                    <li>Which rubric description feels closest to your completion — or furthest away?</li>
                    <li>What does your completion reveal about what you find most important in this situation?</li>
                    <li>If you wrote a different completion tomorrow, what might change?</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Module Recommendations */}
        {rec && (
          <div className={styles.resultSection}>
            <h3>Recommended Modules</h3>
            <p className={styles.resultNote}>
              Based on your dominant meaning-making pattern, these three modules are most likely
              to meet you where you are and invite growth into the next range:
            </p>
            <ul className={styles.moduleList}>
              {rec.map((m) => (
                <li key={m.to}>
                  <Link to={m.to}>{m.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Facilitated Support Callout */}
        <div className={styles.resultSection} style={{ borderLeft: '4px solid var(--ifm-color-primary)', background: 'color-mix(in srgb, var(--ifm-color-primary) 5%, var(--ifm-background-color))' }}>
          <h3>💬 Consider Facilitated Support</h3>
          <p className={styles.resultNote}>
            For anyone seriously exploring Self line development, working with a trained
            developmental coach or facilitator is strongly recommended. Ego development unfolds
            in relationship — the holding environment of a skilled facilitator can support
            transitions that self-directed reading alone cannot. See the{' '}
            <strong>Self Line Facilitation Guide</strong> for guidance on finding and working
            with a qualified developmental facilitator.
          </p>
          <p className={styles.resultNote}>
            The formal <strong>Washington University Sentence Completion Test (WUSCT)</strong>,
            developed by Jane Loevinger and extended by Susanne Cook-Greuter, is available
            through certified practitioners and provides a rigorously validated ego development
            assessment. If you are serious about understanding your developmental centre of
            gravity, pursuing the WUSCT with a certified evaluator is the appropriate next step.
          </p>
        </div>

        <div className={styles.resultActions}>
          <button className={styles.exportButton} onClick={handleExport}>
            {copied ? '✓ Copied to clipboard' : 'Export to Journal'}
          </button>
          <button className={styles.resetButton} onClick={handleReset}>
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // ── Assessment view ─────────────────────────────────────────────────────────

  return (
    <div className={styles.assessment}>
      {/* Framing message */}
      <div className={styles.framingMessage}>
        <p>
          <strong>How to use this tool.</strong> The Self line is unique among the developmental
          lines: it is the line that organises and interprets all the others. This creates a
          fundamental challenge for self-assessment — the instrument doing the measuring is
          itself shaped by what it is measuring. Cook-Greuter's research demonstrates that
          sentence completion methodology is more valid than questionnaire-based self-report
          for ego development, precisely because it bypasses the tendency to select
          stage-flattering answers.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          This tool adapts that methodology for a web-based context, combining{' '}
          <strong>scenario-based questions</strong> (Section A) that reveal your meaning-making
          structure through the responses that feel most natural, and{' '}
          <strong>open-ended sentence stems</strong> (Section B) that you complete in your own
          words and then interpret using provided rubrics. There are no right or wrong answers.
          Respond to what genuinely resonates, not what sounds most sophisticated.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          This tool is a <strong>phenomenological mirror</strong>, not a clinical assessment.
          Ego development research (Loevinger, Cook-Greuter) consistently finds that people
          cannot reliably self-assess their own stage — we see clearly one or two levels below
          our own, and tend to misidentify higher stages as more attractive-sounding rather
          than lived experience. Use these results as one reflective data point, not a verdict.
        </p>
      </div>

      {/* Section A */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section A: Scenario-Based Meaning-Making</h2>
        <p className={styles.sectionIntro}>
          For each scenario, select the response that feels most natural to you — not the
          response you think is most advanced, or what a wise person would say, but what
          genuinely matches your first, unconsidered reaction. The depth of this tool depends
          on your honesty with yourself.
        </p>
        <div className={styles.sectionStatus}>
          {sectionAComplete
            ? `✓ All ${SECTION_A_SCENARIOS.length} scenarios answered`
            : `${profile.total} of ${SECTION_A_SCENARIOS.length} scenarios answered`}
        </div>

        {SECTION_A_SCENARIOS.map((scenario, idx) => (
          <div key={scenario.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Scenario {idx + 1} of {SECTION_A_SCENARIOS.length}</p>
            <h3 className={styles.dilemmaTitle}>{scenario.title}</h3>
            <p className={styles.scenarioText}>{scenario.text}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {scenario.options.map((opt) => (
                <label key={opt.id} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={scenario.id}
                    value={opt.id}
                    checked={sectionAAnswers[scenario.id] === opt.stage}
                    onChange={() => handleSectionASelect(scenario.id, opt.stage)}
                    className={styles.radio}
                  />
                  <span className={styles.optionText}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Section B */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section B: Sentence Completion Reflection</h2>
        <p className={styles.sectionIntro}>
          Complete each sentence stem below in your own words. Write what first comes to mind
          rather than what sounds best. After you submit, you will be shown a rubric describing
          how different developmental orientations typically complete each stem, along with
          reflective questions to guide your own interpretation. You will not be scored —
          the rubric is a mirror, not a meter.
        </p>
        <div className={styles.sectionStatus}>
          {Object.keys(sectionBResponses).filter((k) => sectionBResponses[k]?.trim()).length === SECTION_B_STEMS.length
            ? `✓ All ${SECTION_B_STEMS.length} stems completed`
            : `${Object.keys(sectionBResponses).filter((k) => sectionBResponses[k]?.trim()).length} of ${SECTION_B_STEMS.length} stems completed`}
        </div>

        {SECTION_B_STEMS.map((stem, idx) => (
          <div key={stem.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Stem {idx + 1} of {SECTION_B_STEMS.length}</p>
            <p className={styles.questionText} style={{ fontStyle: 'italic' }}>{stem.stem}</p>
            <textarea
              value={sectionBResponses[stem.id] || ''}
              onChange={(e) => handleSectionBChange(stem.id, e.target.value)}
              placeholder="Write your completion here..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '6px',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                fontFamily: 'inherit',
                resize: 'vertical',
                background: 'var(--ifm-background-color)',
                color: 'var(--ifm-color-content)',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}
      </section>

      {/* Submit */}
      <div className={styles.submitArea}>
        {!sectionAComplete && (
          <p className={styles.submitHint}>
            Section A is not yet complete ({profile.total}/{SECTION_A_SCENARIOS.length} scenarios answered).
            You can still submit to see a partial profile.
          </p>
        )}
        <button className={styles.submitButton} onClick={handleSubmit}>
          View Your Developmental Profile
        </button>
        <p className={styles.privacyNote}>
          No data is stored or transmitted. Your responses remain in this browser session only.
        </p>
      </div>
    </div>
  );
}
