import React, { useCallback, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './MoralLineAssessment.module.css';

const SECTION_A_QUESTIONS = [
  {
    id: 'a1',
    text: 'When you pray, meditate, or enter sacred space, how would you describe the felt quality of the relationship itself (for example: closeness, distance, trust, awe, duty, mystery)?',
  },
  {
    id: 'a2',
    text: 'When life becomes painful or confusing, what changes (if anything) in the way you relate to ultimate reality?',
  },
  {
    id: 'a3',
    text: 'How do you experience symbols, stories, or sacred texts: as fixed truths, living sources of meaning, paradox, or something else?',
  },
  {
    id: 'a4',
    text: 'Describe a time when your spiritual life felt deeply alive. What was the structure of that experience (belonging, certainty, inquiry, unknowing, unity, etc.)?',
  },
  {
    id: 'a5',
    text: 'When your tradition and your direct experience seem to conflict, how do you hold that tension?',
  },
  {
    id: 'a6',
    text: 'How do you decide whether an inner spiritual impression is trustworthy?',
  },
  {
    id: 'a7',
    text: 'How do you experience people whose spiritual worldview is radically different from your own?',
  },
  {
    id: 'a8',
    text: 'What does spiritual maturity mean to you structurally (not what you believe, but how one relates to the sacred)?',
  },
];

const SECTION_A_REFLECTION_PROMPTS = [
  {
    stage: 2,
    label: 'Reflection Prompt A',
    text: 'My spiritual meaning tends to be concrete, story-shaped, and tied to clear symbols and literal narratives.',
  },
  {
    stage: 3,
    label: 'Reflection Prompt B',
    text: 'My spiritual meaning is strongly relational and communal; trusted people and shared belonging matter deeply for how I know what is true.',
  },
  {
    stage: 4,
    label: 'Reflection Prompt C',
    text: 'I experience spiritual life through personal responsibility, examined belief, and internally chosen commitments.',
  },
  {
    stage: 5,
    label: 'Reflection Prompt D',
    text: 'I can hold paradox and multiple traditions with humility; I sense truth as deeper than any single language system.',
  },
  {
    stage: 6,
    label: 'Reflection Prompt E',
    text: 'I experience an ethically universal, boundary-crossing compassion where commitment to justice and love extends to all beings.',
  },
];

const SECTION_B_SCENARIOS = [
  {
    id: 'b1',
    title: 'Encounter with Doubt',
    scenario: 'A belief that has guided your life for years suddenly feels uncertain after a major loss.',
    options: [
      { value: 'a', text: 'I return to familiar sacred stories and trusted authorities to restore clarity.', stage: 2 },
      { value: 'b', text: 'I seek support from my faith community to regain shared grounding.', stage: 3 },
      { value: 'c', text: 'I re-examine my convictions and rebuild a more personally accountable framework.', stage: 4 },
      { value: 'd', text: 'I stay with paradox, letting grief and mystery deepen my relationship to truth.', stage: 5 },
    ],
  },
  {
    id: 'b2',
    title: 'Tradition-Questioning',
    scenario: 'You discover a morally difficult part of your own tradition\'s history.',
    options: [
      { value: 'a', text: 'I assume the tradition is still right and I may not fully understand yet.', stage: 2 },
      { value: 'b', text: 'I protect unity first, discussing concerns carefully within trusted circles.', stage: 3 },
      { value: 'c', text: 'I evaluate the issue through principles and conscience, even if that creates tension.', stage: 4 },
      { value: 'd', text: 'I hold tradition with love while integrating critique, historical context, and shared human dignity.', stage: 5 },
    ],
  },
  {
    id: 'b3',
    title: 'Interfaith Encounter',
    scenario: 'A close friend from another tradition describes sacred experiences very different from yours.',
    options: [
      { value: 'a', text: 'I listen respectfully, but assume their path is mostly mistaken.', stage: 2 },
      { value: 'b', text: 'I value the relationship, while staying rooted in my group\'s shared understanding.', stage: 3 },
      { value: 'c', text: 'I compare beliefs critically and decide what is coherent with my own commitments.', stage: 4 },
      { value: 'd', text: 'I see genuine windows into the sacred across traditions without collapsing important differences.', stage: 5 },
    ],
  },
  {
    id: 'b4',
    title: 'Spiritual Disorientation',
    scenario: 'Practices that once felt meaningful now feel empty for several months.',
    options: [
      { value: 'a', text: 'I increase discipline and return to proven forms until meaning returns.', stage: 2 },
      { value: 'b', text: 'I lean on community rhythms to stay connected through the dry period.', stage: 3 },
      { value: 'c', text: 'I revise my practice structure and choose what remains deeply authentic.', stage: 4 },
      { value: 'd', text: 'I treat disorientation as part of transformation and allow new forms to emerge slowly.', stage: 5 },
    ],
  },
  {
    id: 'b5',
    title: 'Authority and Conscience',
    scenario: 'A respected spiritual leader gives guidance that conflicts with your moral intuition.',
    options: [
      { value: 'a', text: 'I follow the guidance and trust the authority\'s role.', stage: 2 },
      { value: 'b', text: 'I seek discernment from trusted peers in the community before acting.', stage: 3 },
      { value: 'c', text: 'I honor the leader but follow conscience, even if my decision is unpopular.', stage: 4 },
      { value: 'd', text: 'I integrate conscience, relationship, and compassion while staying open to complexity.', stage: 5 },
    ],
  },
  {
    id: 'b6',
    title: 'Universal Concern',
    scenario: 'You feel called to serve people far outside your identity group, with no social reward.',
    options: [
      { value: 'a', text: 'Service is strongest when focused on my own people first.', stage: 2 },
      { value: 'b', text: 'I serve where my community recognizes and supports the commitment.', stage: 3 },
      { value: 'c', text: 'I serve from principle and responsibility, even without recognition.', stage: 4 },
      { value: 'd', text: 'I experience service as universal solidarity that transcends social boundaries.', stage: 6 },
    ],
  },
];

const SECTION_C_QUESTIONS = [
  {
    id: 'c1',
    text: 'Your weekly contemplative life is best described as:',
    options: [
      { value: 'a', text: 'Consistent and familiar, mainly within one inherited form.', stage: 2 },
      { value: 'b', text: 'Shaped by shared community rhythms and accountability.', stage: 3 },
      { value: 'c', text: 'Personally intentional with chosen disciplines and regular review.', stage: 4 },
      { value: 'd', text: 'Rooted in a tradition while integrating contemplative depth from multiple sources.', stage: 5 },
    ],
  },
  {
    id: 'c2',
    text: 'When selecting spiritual practices, you usually:',
    options: [
      { value: 'a', text: 'Follow practices that are clearly prescribed and trusted.', stage: 2 },
      { value: 'b', text: 'Prefer practices endorsed by people whose spiritual life I trust.', stage: 3 },
      { value: 'c', text: 'Choose practices based on tested fit with conscience and life demands.', stage: 4 },
      { value: 'd', text: 'Discern patterns across traditions without reducing them to a single formula.', stage: 5 },
    ],
  },
  {
    id: 'c3',
    text: 'Your relationship to tradition feels most like:',
    options: [
      { value: 'a', text: 'A sacred container that should be preserved as faithfully as possible.', stage: 2 },
      { value: 'b', text: 'A living home I belong to and help sustain with others.', stage: 3 },
      { value: 'c', text: 'A source I engage critically and commit to with personal responsibility.', stage: 4 },
      { value: 'd', text: 'One genuine expression among many, held with reverence and openness.', stage: 5 },
    ],
  },
  {
    id: 'c4',
    text: 'If a practice becomes dry or mechanical, you typically:',
    options: [
      { value: 'a', text: 'Continue faithfully because consistency itself is spiritually important.', stage: 2 },
      { value: 'b', text: 'Seek encouragement from mentors or peers to stay aligned.', stage: 3 },
      { value: 'c', text: 'Reassess why I practice and redesign the discipline intentionally.', stage: 4 },
      { value: 'd', text: 'Explore the dryness itself as part of deeper surrender and transformation.', stage: 5 },
    ],
  },
  {
    id: 'c5',
    text: 'Eclectic spirituality (mixing practices from many traditions) feels to you like:',
    options: [
      { value: 'a', text: 'Usually confusing; depth comes from staying with one clear path.', stage: 2 },
      { value: 'b', text: 'Potentially risky unless held in trusted communal guidance.', stage: 3 },
      { value: 'c', text: 'Useful when done thoughtfully with clear principles and boundaries.', stage: 4 },
      { value: 'd', text: 'Potentially fruitful when rooted in humility, depth, and disciplined integration.', stage: 5 },
    ],
  },
];

const STAGE_LABELS = {
  2: 'Stage 2 — Mythic-Literal',
  3: 'Stage 3 — Synthetic-Conventional',
  4: 'Stage 4 — Individuative-Reflective',
  5: 'Stage 5 — Conjunctive',
  6: 'Stage 6 — Universalizing (rare)',
};

const STAGE_DESCRIPTIONS = {
  2: 'Meaning is often held through concrete symbols, sacred stories, and reliable structure. This can support loyalty, moral clarity, and deep devotion.',
  3: 'Meaning is mediated strongly through trusted relationships and community belonging. Shared identity and mutual care are central strengths.',
  4: 'Meaning is increasingly examined and internally authored. Commitment is chosen and reflected upon, with greater personal accountability.',
  5: 'Meaning becomes more paradox-capable and integrative. Multiple traditions or perspectives can be held without collapsing complexity.',
  6: 'Meaning expresses universal compassion and justice across all boundaries. This pattern is uncommon and typically embodied through sustained service.',
};

const MODULE_RECOMMENDATIONS = {
  2: [
    { title: 'Spiritual Line Overview & Orientation', to: '/docs/modules/spiritual-line-overview-orientation' },
    { title: 'Spiritual Line: Mythic to Rational', to: '/docs/modules/spiritual-line-mythic-to-rational' },
    { title: 'State Identification Assessment', to: '/docs/maps/state-identification-assessment' },
  ],
  3: [
    { title: 'Spiritual Line: Mythic to Rational', to: '/docs/modules/spiritual-line-mythic-to-rational' },
    { title: 'Spiritual Line Overview & Orientation', to: '/docs/modules/spiritual-line-overview-orientation' },
    { title: 'Spiritual Line Shadow Integration', to: '/docs/modules/spiritual-line-shadow-integration' },
  ],
  4: [
    { title: 'Spiritual Line: Conjunctive to Universalizing', to: '/docs/modules/spiritual-line-conjunctive-universalizing' },
    { title: 'Spiritual Line Shadow Integration', to: '/docs/modules/spiritual-line-shadow-integration' },
    { title: 'State–Stage Integration Map', to: '/docs/maps/state-stage-integration-map' },
  ],
  5: [
    { title: 'Spiritual Line: Conjunctive to Universalizing', to: '/docs/modules/spiritual-line-conjunctive-universalizing' },
    { title: 'Spiritual Line: Post-Metaphysical Integral Religion', to: '/docs/modules/spiritual-line-post-metaphysical-integral-religion' },
    { title: 'State–Stage Integration Map', to: '/docs/maps/state-stage-integration-map' },
  ],
  6: [
    { title: 'Spiritual Line: Conjunctive to Universalizing', to: '/docs/modules/spiritual-line-conjunctive-universalizing' },
    { title: 'Spiritual Line Shadow Integration', to: '/docs/modules/spiritual-line-shadow-integration' },
    { title: 'State Development QuickStart', to: '/docs/quickstarts/state-development' },
  ],
};

function computeStageProfile(stageValues) {
  const counts = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  if (stageValues.length === 0) {
    return { counts, dominantStage: null, total: 0 };
  }

  stageValues.forEach((stage) => {
    if (counts[stage] !== undefined) counts[stage] += 1;
  });

  let dominantStage = null;
  let maxCount = 0;
  [6, 5, 4, 3, 2].forEach((stage) => {
    if (counts[stage] > maxCount) {
      maxCount = counts[stage];
      dominantStage = stage;
    }
  });

  return { counts, dominantStage, total: stageValues.length };
}

function buildExportText(profile, totalSignals) {
  const lines = [];
  lines.push('═══ Spiritual Line Developmental Profile ═══');
  lines.push('');
  lines.push('── Structural Spiritual Profile (Fowler-oriented) ──');
  lines.push(`Signals interpreted: ${totalSignals}`);
  [2, 3, 4, 5, 6].forEach((stage) => {
    const pct = totalSignals > 0 ? Math.round((profile.counts[stage] / totalSignals) * 100) : 0;
    lines.push(`  ${STAGE_LABELS[stage]}: ${pct}%`);
  });
  lines.push('');
  lines.push(`Current structural pattern: ${profile.dominantStage ? STAGE_LABELS[profile.dominantStage] : 'Not enough data yet'}`);
  lines.push('');
  lines.push('── State–Stage Distinction ──');
  lines.push('Temporary spiritual states (awe, unity, stillness, nondual glimpses) can occur at any structural stage.');
  lines.push('This profile describes structure of meaning-making, not peak-state depth.');
  lines.push('');
  lines.push('── Important Methodological Note ──');
  lines.push('Faith development stage cannot be accurately determined by self-report. This tool offers phenomenological prompts for self-reflection, not a clinical faith development assessment.');
  lines.push('');
  lines.push('No persistent data is stored — your results exist only in this browser session.');
  return lines.join('\n');
}

export default function SpiritualLineAssessment() {
  const [sectionAResponses, setSectionAResponses] = useState({});
  const [sectionAReflections, setSectionAReflections] = useState({});
  const [sectionBAnswers, setSectionBAnswers] = useState({});
  const [sectionCAnswers, setSectionCAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const stageValues = useMemo(() => {
    const fromA = Object.values(sectionAReflections);
    const fromB = SECTION_B_SCENARIOS.map((scenario) => {
      const answerValue = sectionBAnswers[scenario.id];
      if (!answerValue) return null;
      const option = scenario.options.find((opt) => opt.value === answerValue);
      return option ? option.stage : null;
    }).filter(Boolean);
    const fromC = SECTION_C_QUESTIONS.map((question) => {
      const answerValue = sectionCAnswers[question.id];
      if (!answerValue) return null;
      const option = question.options.find((opt) => opt.value === answerValue);
      return option ? option.stage : null;
    }).filter(Boolean);

    return [...fromA, ...fromB, ...fromC];
  }, [sectionAReflections, sectionBAnswers, sectionCAnswers]);

  const profile = computeStageProfile(stageValues);

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSectionAResponses({});
    setSectionAReflections({});
    setSectionBAnswers({});
    setSectionCAnswers({});
    setSubmitted(false);
    setCopied(false);
  };

  const handleExport = useCallback(async () => {
    const text = buildExportText(profile, stageValues.length);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
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
  }, [profile, stageValues.length]);

  const sectionAComplete = Object.keys(sectionAResponses).length;
  const sectionBComplete = Object.keys(sectionBAnswers).length;
  const sectionCComplete = Object.keys(sectionCAnswers).length;

  if (submitted) {
    const recommendations = profile.dominantStage ? MODULE_RECOMMENDATIONS[profile.dominantStage] : [];

    return (
      <div className={styles.results}>
        <h2 className={styles.resultsTitle}>Your Spiritual Developmental Profile</h2>

        <div className={styles.resultSection}>
          <h3>Spiritual Line Profile (Fowler-oriented)</h3>
          <p className={styles.resultNote}>
            Your profile reflects interpreted structure-of-relationship signals from Sections A–C.
            It does <strong>not</strong> evaluate belief content.
          </p>
          <div className={styles.schemaBars}>
            {[2, 3, 4, 5, 6].map((stage) => {
              const pct = profile.total > 0 ? Math.round((profile.counts[stage] / profile.total) * 100) : 0;
              return (
                <div key={stage} className={styles.schemaBarRow}>
                  <span className={styles.schemaLabel}>{STAGE_LABELS[stage]}</span>
                  <div className={styles.schemaBarTrack}>
                    <div
                      className={`${styles.schemaBarFill} ${profile.dominantStage === stage ? styles.schemaBarDominant : ''}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={styles.schemaCount}>{pct}%</span>
                </div>
              );
            })}
          </div>
          {profile.dominantStage ? (
            <p className={styles.dominantNote}>
              <strong>Current structural center of gravity:</strong> {STAGE_LABELS[profile.dominantStage]}.{' '}
              {STAGE_DESCRIPTIONS[profile.dominantStage]}
            </p>
          ) : (
            <p className={styles.resultNote}>
              Complete more prompts to generate a clearer structural profile.
            </p>
          )}
        </div>

        <div className={styles.resultSection}>
          <h3>Structure vs. State Experiences</h3>
          <p className={styles.resultNote}>
            Structural stage and spiritual state are different dimensions. You can access profound
            states (awe, silence, unity, subtle or causal awareness) at many structural stages.
            This profile estimates meaning-making structure, while state depth is better explored in
            the State Development suite.
          </p>
          <ul className={styles.moduleList}>
            <li><Link to="/docs/maps/state-identification-assessment">State Identification Assessment</Link></li>
            <li><Link to="/docs/maps/state-stage-integration-map">State–Stage Integration Map</Link></li>
            <li><Link to="/docs/quickstarts/state-development">State Development QuickStart</Link></li>
          </ul>
        </div>

        <div className={styles.resultSection}>
          <h3>Personalized Module Recommendations</h3>
          {recommendations.length > 0 ? (
            <ul className={styles.moduleList}>
              {recommendations.map((module) => (
                <li key={module.to}><Link to={module.to}>{module.title}</Link></li>
              ))}
            </ul>
          ) : (
            <p className={styles.resultNote}>
              Complete at least one full section to receive recommendations.
            </p>
          )}
        </div>

        <div className={`${styles.resultSection} ${styles.disclaimer}`}>
          <h3>Important</h3>
          <p>
            Faith development stage cannot be accurately determined by self-report. This tool offers phenomenological prompts for self-reflection, not a clinical faith development assessment.
          </p>
          <p>
            No persistent data is stored — your results exist only in this browser session.
          </p>
        </div>

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

  return (
    <div className={styles.assessment}>
      <div className={styles.framingMessage}>
        <p>
          This assessment explores the structure of your relationship to the sacred — not the
          content of your beliefs. There are no correct or incorrect answers, and no stage is
          superior to another. Each stage represents a genuine and complete way of relating to
          ultimate reality.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section A: Spiritual Relationship Structure</h2>
        <p className={styles.sectionIntro}>
          Respond to each open-ended prompt in your own words. After writing, choose the reflection
          prompt that best matches the structure of your experience.
        </p>
        <div className={styles.sectionStatus}>{sectionAComplete} of {SECTION_A_QUESTIONS.length} prompts written</div>

        {SECTION_A_QUESTIONS.map((question, index) => (
          <div key={question.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Prompt {index + 1} of {SECTION_A_QUESTIONS.length}</p>
            <p className={styles.questionText}>{question.text}</p>
            <label className={styles.textareaLabel}>
              Your response:
              <textarea
                className={styles.textarea}
                rows={5}
                value={sectionAResponses[question.id] || ''}
                onChange={(event) => setSectionAResponses((prev) => ({ ...prev, [question.id]: event.target.value }))}
                placeholder="Write your reflection here..."
              />
            </label>

            {(sectionAResponses[question.id] || '').trim() && (
              <div className={styles.considerationsSection}>
                <p className={styles.considerationsHeader}>Which reflection prompt fits this response best?</p>
                {SECTION_A_REFLECTION_PROMPTS.map((prompt) => (
                  <label key={`${question.id}-${prompt.label}`} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`${question.id}-reflection`}
                      className={styles.radio}
                      checked={sectionAReflections[question.id] === prompt.stage}
                      onChange={() => setSectionAReflections((prev) => ({ ...prev, [question.id]: prompt.stage }))}
                    />
                    <span className={styles.optionText}><strong>{prompt.label}:</strong> {prompt.text}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section B: Spiritual Challenge Scenarios</h2>
        <p className={styles.sectionIntro}>
          Choose the response that most closely matches how you would likely orient in each
          situation involving doubt, interfaith encounter, and spiritual disorientation.
        </p>
        <div className={styles.sectionStatus}>{sectionBComplete} of {SECTION_B_SCENARIOS.length} scenarios answered</div>

        {SECTION_B_SCENARIOS.map((scenario, index) => (
          <div key={scenario.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Scenario {index + 1} of {SECTION_B_SCENARIOS.length}</p>
            <p className={styles.dilemmaTitle}>{scenario.title}</p>
            <p className={styles.scenarioText}>{scenario.scenario}</p>
            <div className={styles.considerationsSection}>
              {scenario.options.map((option) => (
                <label key={option.value} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={scenario.id}
                    className={styles.radio}
                    checked={sectionBAnswers[scenario.id] === option.value}
                    onChange={() => setSectionBAnswers((prev) => ({ ...prev, [scenario.id]: option.value }))}
                  />
                  <span className={styles.optionText}>{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section C: Practice and Tradition Relationship</h2>
        <p className={styles.sectionIntro}>
          These questions explore depth vs. eclecticism, and commitment vs. rigidity in your
          ongoing spiritual life.
        </p>
        <div className={styles.sectionStatus}>{sectionCComplete} of {SECTION_C_QUESTIONS.length} questions answered</div>

        {SECTION_C_QUESTIONS.map((question, index) => (
          <div key={question.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Question {index + 1} of {SECTION_C_QUESTIONS.length}</p>
            <p className={styles.questionText}>{question.text}</p>
            <div className={styles.considerationsSection}>
              {question.options.map((option) => (
                <label key={option.value} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={question.id}
                    className={styles.radio}
                    checked={sectionCAnswers[question.id] === option.value}
                    onChange={() => setSectionCAnswers((prev) => ({ ...prev, [question.id]: option.value }))}
                  />
                  <span className={styles.optionText}>{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className={styles.submitArea}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          View Your Spiritual Profile
        </button>
        <p className={styles.privacyNote}>
          No data is stored or transmitted. Your responses remain in this browser session only.
        </p>
      </div>
    </div>
  );
}
