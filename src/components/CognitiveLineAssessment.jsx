import React, { useState, useCallback } from 'react';
import Link from '@docusaurus/Link';
import styles from './CognitiveLineAssessment.module.css';

// ── Section A: Cognitive Operations Tasks ──────────────────────────────────
// 8 graduated tasks spanning concrete → formal → postformal → early metasystematic
// Each option is tagged to a Commons MHC level (1–4), hidden from the learner

const SECTION_A_TASKS = [
  {
    id: 'a1',
    level: 1,
    text: 'A recipe calls for 3 cups of flour to make 12 cookies. How many cups of flour would you need to make 20 cookies?',
    options: [
      { value: 'a', label: 'I would just estimate — about 5 cups sounds right.', level: 1 },
      { value: 'b', label: 'Set up a proportion: 3/12 = x/20, so x = (3 × 20) ÷ 12 = 5 cups.', level: 2 },
      { value: 'c', label: 'The ratio is 3:12 = 1:4. For 20 cookies you need 5 cups, but in practice you might adjust slightly based on dough consistency and environmental humidity.', level: 3 },
      { value: 'd', label: 'Proportional reasoning gives 5 cups, but this assumes linear scaling. Cookie recipes often scale non-linearly due to mixing dynamics, and the concept of "a cup of flour" varies with packing density. The structural relationship between ingredients matters more than the arithmetic.', level: 4 },
    ],
  },
  {
    id: 'a2',
    level: 1,
    text: 'You notice that every time your neighbour waters their garden in the evening, your own plants look healthier the next morning. What is the most reasonable conclusion?',
    options: [
      { value: 'a', label: 'My neighbour\'s watering causes my plants to be healthier — I can see the pattern clearly.', level: 1 },
      { value: 'b', label: 'There is a correlation, but I would need to check whether morning dew, shared soil, or other factors explain it before concluding causation.', level: 2 },
      { value: 'c', label: 'Multiple interacting variables could explain this: groundwater flow, microclimate effects, or even confirmation bias in what I notice. A controlled comparison over several weeks would help disambiguate.', level: 3 },
      { value: 'd', label: 'This is a complex systems question. Even controlled comparison may not isolate causation because ecological systems have feedback loops. The question itself assumes a linear cause-effect model that may not fit a garden ecosystem — emergence, tipping points, and multi-causal networks are all in play.', level: 4 },
    ],
  },
  {
    id: 'a3',
    level: 2,
    text: 'A politician argues: "We must either increase military spending or accept that our country will be vulnerable to attack. There is no middle ground." What is the most accurate analysis of this argument?',
    options: [
      { value: 'a', label: 'The politician is probably right — national security is not something to compromise on.', level: 1 },
      { value: 'b', label: 'This is a false dilemma. There may be other ways to ensure security — diplomacy, alliances, intelligence, cyber-defence — that do not require increased military spending.', level: 2 },
      { value: 'c', label: 'The false-dilemma framing serves a rhetorical function: it constructs the terms of debate to pre-emptively exclude alternatives. The deeper question is what "security" means — the concept is contested and its definition shapes which options appear viable.', level: 3 },
      { value: 'd', label: 'The argument operates at multiple levels: as a logical fallacy (false dilemma), as a framing device that constructs "security" as a unidimensional military concept, and as a developmental signal — it reveals a formal-operational structure that has not yet coordinated the multiple systems (military, diplomatic, economic, cyber) that constitute actual national security. The "either/or" itself indicates where the speaker\'s cognitive structure sits on the MHC spectrum.', level: 4 },
    ],
  },
  {
    id: 'a4',
    level: 2,
    text: 'You are analysing a dataset where ice cream sales and drowning deaths both increase during summer months. How would you characterise the relationship?',
    options: [
      { value: 'a', label: 'There is clearly a connection — maybe eating ice cream before swimming causes cramps that lead to drowning. We should warn people.', level: 1 },
      { value: 'b', label: 'This is a classic example of correlation without causation. Both variables increase because of a third factor: hot weather drives both ice cream consumption and swimming activity.', level: 2 },
      { value: 'c', label: 'The hot-weather confound is correct, but the situation is more nuanced: even within summer, the relationship may vary — heatwave days show different patterns from mild summer days. The correlation is real but the causal structure is multi-layered.', level: 3 },
      { value: 'd', label: 'This question illustrates why single-variable causal models are insufficient for complex social phenomena. Ice cream sales and drowning rates are both emergent properties of a system (summer recreational culture), and the "confound" of weather is itself mediated by air-conditioning access, public pool availability, and socioeconomic patterns in leisure time. Asking "what causes what" assumes a level of causal isolation that complex systems do not provide.', level: 4 },
    ],
  },
  {
    id: 'a5',
    level: 3,
    text: 'A company must decide between two strategies: Strategy A has a 70% chance of moderate success and 30% chance of moderate failure. Strategy B has a 20% chance of extraordinary success and 80% chance of complete failure. Different stakeholders have strongly conflicting views. How should the decision be made?',
    options: [
      { value: 'a', label: 'Strategy A is clearly safer. Most people would prefer a reliable outcome over gambling.', level: 1 },
      { value: 'b', label: 'Calculate the expected utility of each strategy using probability-weighted outcomes. If the extraordinary success of Strategy B is large enough, it could mathematically outweigh the risk.', level: 2 },
      { value: 'c', label: 'Expected utility alone is insufficient because different stakeholders have different risk tolerances and time horizons. The decision process needs to surface whose values are being prioritised and why — this is as much an ethical question as a mathematical one.', level: 3 },
      { value: 'd', label: 'The decision cannot be "optimised" in a single framework because the stakeholders themselves operate at different developmental altitudes — their definitions of "success," their relationship to probability, and their capacity to hold multiple perspectives simultaneously all differ. The real question is: what decision-making process can coordinate across those structural differences without reducing one group\'s concerns to a sub-component of another\'s framework?', level: 4 },
    ],
  },
  {
    id: 'a6',
    level: 3,
    text: 'Two respected scientific studies reach opposite conclusions about the same phenomenon. Both used rigorous methods and were published in peer-reviewed journals. What is the most sophisticated interpretation?',
    options: [
      { value: 'a', label: 'One of the studies must be wrong — science will eventually determine which one.', level: 1 },
      { value: 'b', label: 'I would examine the methodologies closely: sample size, control conditions, measurement instruments. The study with stronger methodology is more likely to be correct.', level: 2 },
      { value: 'c', label: 'Contradictory findings often indicate that both studies captured a real effect, but under different boundary conditions or operational definitions. The contradiction is itself data — it tells us the phenomenon is context-dependent and the theoretical frameworks may need to expand to accommodate both findings.', level: 3 },
      { value: 'd', label: 'This is not merely about methodology or boundary conditions — it is about the incommensurability of paradigms. Each study may operate within a conceptual framework that defines "the phenomenon" differently, measures different constructs, and interprets findings through different theoretical lenses. Reconciling them may require constructing a meta-framework that shows how each paradigm\'s findings are valid within its own assumptions while also revealing what each paradigm systematically misses.', level: 4 },
    ],
  },
  {
    id: 'a7',
    level: 4,
    text: 'You are designing a curriculum that must teach critical thinking to students ranging from age 8 to adult professionals, across five cultural contexts with different epistemological traditions. What framework do you use?',
    options: [
      { value: 'a', label: 'Use the same critical thinking curriculum for everyone — the skills are universal. Adapt only the examples and language level.', level: 1 },
      { value: 'b', label: 'Different age groups need different cognitive demands: concrete examples for younger students, formal logic for older ones. Cultural adaptation means translating examples but keeping the same underlying skill progression.', level: 2 },
      { value: 'c', label: 'Critical thinking itself is culturally situated — what counts as "good reasoning" varies across epistemological traditions. The curriculum must be pluralistic: teach multiple reasoning frameworks and help learners recognise when each is appropriate, rather than imposing one model.', level: 3 },
      { value: 'd', label: 'The curriculum design challenge itself reveals your own cognitive center of gravity. A formal-operational designer builds a single sequence and adapts examples. A postformal designer builds multiple parallel tracks. A metasystematic designer builds a system that generates appropriate sequences from first principles — a meta-curriculum that teaches learners to construct their own critical thinking frameworks, recognises that frameworks themselves develop, and accounts for the developmental diversity of both learners and teachers.', level: 4 },
    ],
  },
  {
    id: 'a8',
    level: 4,
    text: 'You observe a pattern: teams with high psychological safety produce more innovative solutions, but also take longer to reach decisions. Teams with hierarchical decision-making are faster but produce less novel output. An organisation needs both speed and innovation. What do you recommend?',
    options: [
      { value: 'a', label: 'The organisation should choose whichever priority matters more — speed or innovation — and structure teams accordingly.', level: 1 },
      { value: 'b', label: 'Structure different teams differently: innovation teams should prioritise psychological safety, while operational teams should prioritise decision speed. Match structure to function.', level: 2 },
      { value: 'c', label: 'The speed-innovation trade-off is not universal — it depends on the domain, the stakes, and the stage of the project. The organisation needs a decision-making protocol that selects the appropriate team structure based on context, rather than a one-size-fits-all policy.', level: 3 },
      { value: 'd', label: 'The apparent trade-off between psychological safety and decision speed may itself be an artefact of a particular stage of organisational development. At higher levels of collective cognitive complexity, teams can maintain psychological safety AND make rapid decisions — because shared sensemaking frameworks reduce the coordination cost. The recommendation is not to choose or to allocate, but to develop the organisation\'s collective cognitive capacity so the trade-off dissolves. The diagnostic question is: what is the organisation\'s current developmental center of gravity, and what would the next stage make possible that currently appears contradictory?', level: 4 },
    ],
  },
];

// ── Section B: Dialectical Thinking Problems ────────────────────────────────
// 4 open-ended problems; learner writes response then self-evaluates against Basseches rubric

const SECTION_B_PROBLEMS = [
  {
    id: 'b1',
    text: 'Consider the claim: "Individual freedom and social equality are fundamentally in tension — you cannot maximise both simultaneously." Write a response that engages with this tension without simply choosing one side or dismissing the claim. A dialectical response should recognise what is valid in each position, identify the deeper relationship between them, and articulate a more integrated understanding.',
  },
  {
    id: 'b2',
    text: 'Someone argues: "Technology is making us less human — the more we mediate our lives through screens, the more we lose genuine connection." Someone else counters: "Technology is making us more human — it extends our capacity for connection, creativity, and self-expression beyond what biology alone allows." Write a response that moves beyond this binary and articulates a more nuanced understanding of the relationship between technology and human flourishing.',
  },
  {
    id: 'b3',
    text: 'A colleague says: "In our organisation, we should either standardise all processes for efficiency or give teams complete autonomy. Trying to do both creates confusion." Write a response that engages with the apparent tension between standardisation and autonomy. A dialectical response would explore whether the binary itself is the problem, and articulate how both values might be honoured simultaneously in a more complex organisational design.',
  },
  {
    id: 'b4',
    text: 'Reflect on a belief you once held strongly that you no longer hold. Describe: (a) what the belief was and why it made sense to you at the time, (b) what changed your mind, and (c) how you now understand your former perspective — not as "wrong," but as a developmental phase that was genuine and coherent within its context. A dialectical response honours both the former and current self without dismissing either.',
  },
];

const BASCHES_CRITERIA = [
  { id: 'multiplicity', label: 'Recognition of multiple legitimate perspectives on the issue' },
  { id: 'integration', label: 'Coordination or integration of opposing viewpoints (not just listing them)' },
  { id: 'contextuality', label: 'Recognition that truth claims are developmentally and contextually situated' },
  { id: 'meta', label: 'Metasystematic awareness — reflection on the frameworks themselves, not just positions within them' },
];

// ── Section C: Metacognitive Reflection ─────────────────────────────────────

const SECTION_C_QUESTIONS = [
  {
    id: 'c1',
    text: 'As you worked through the cognitive tasks in Section A, what did you notice about how you approached problems that felt easy versus problems that felt difficult? What strategies did you use when you were uncertain?',
  },
  {
    id: 'c2',
    text: 'When writing your dialectical responses in Section B, did you notice any patterns in how you think about opposing viewpoints? Do you tend to resolve tensions quickly, hold them unresolved, reframe them, or approach them differently depending on the topic?',
  },
  {
    id: 'c3',
    text: 'Were there any moments in this assessment where you became aware of your own thinking process — not just the content of your thoughts, but the structure of how you were thinking? Describe one such moment.',
  },
  {
    id: 'c4',
    text: 'How confident are you that your responses on this assessment accurately reflect your cognitive capacities? What factors — fatigue, interest in the topics, test anxiety, cultural familiarity with the question formats — might have influenced your performance?',
  },
  {
    id: 'c5',
    text: 'If you were to design a better way to assess cognitive development than this tool, what would you change? What does your answer to this question reveal about your own assumptions about what "cognitive development" means?',
  },
];

// ── Scoring Helpers ─────────────────────────────────────────────────────────

function computeMHCProfile(sectionAAnswers) {
  const levelCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const total = Object.keys(sectionAAnswers).length;
  if (total === 0) return { levelCounts, dominantLevel: null, total };

  Object.values(sectionAAnswers).forEach((answer) => {
    const task = SECTION_A_TASKS.find((t) => t.id === answer.taskId);
    if (!task) return;
    const option = task.options.find((o) => o.value === answer.value);
    if (option && levelCounts[option.level] !== undefined) {
      levelCounts[option.level] += 1;
    }
  });

  // Find dominant level (highest count; if tie, highest level wins as most generous interpretation)
  let dominantLevel = null;
  let maxCount = 0;
  [4, 3, 2, 1].forEach((level) => {
    if (levelCounts[level] > maxCount) {
      maxCount = levelCounts[level];
      dominantLevel = level;
    }
  });

  return { levelCounts, dominantLevel, total };
}

function computeDialecticalScore(sectionBSelfEvals) {
  let totalScore = 0;
  let totalCriteria = 0;
  Object.values(sectionBSelfEvals).forEach((scores) => {
    if (Array.isArray(scores)) {
      scores.forEach((s) => {
        totalScore += s;
        totalCriteria += 1;
      });
    }
  });
  if (totalCriteria === 0) return { totalScore: 0, totalCriteria: 0, average: 0 };
  return { totalScore, totalCriteria, average: (totalScore / totalCriteria).toFixed(1) };
}

// ── Module Recommendations ──────────────────────────────────────────────────

const MODULE_RECOMMENDATIONS = {
  1: {
    label: 'Concrete-Formal Operations',
    description: 'Your responses cluster around concrete and formal operational reasoning — the capacity to apply logical operations to concrete situations and abstract propositions. This is the foundation all higher-order cognition builds on.',
    modules: [
      { title: 'Cognitive Line Overview & Orientation', to: '/docs/modules/cognitive-line-overview-orientation' },
      { title: 'Concrete to Formal Operations', to: '/docs/modules/cognitive-line-concrete-to-formal' },
      { title: 'Cognitive Bias 101', to: '/docs/modules/cognitive-bias-101' },
    ],
  },
  2: {
    label: 'Formal-Operational Reasoning',
    description: 'Your responses centre on formal operational reasoning — systematic hypothesis-testing, controlled variable analysis, and abstract logical deduction. This is the cognitive structure that underpins scientific thinking and principled argument.',
    modules: [
      { title: 'Cognitive Line Overview & Orientation', to: '/docs/modules/cognitive-line-overview-orientation' },
      { title: 'Cognitive Dissonance Bridge', to: '/docs/modules/cognitive-dissonance-bridge' },
      { title: 'Concrete to Formal Operations', to: '/docs/modules/cognitive-line-concrete-to-formal' },
    ],
  },
  3: {
    label: 'Postformal Operations',
    description: 'Your responses cluster around postformal reasoning — the capacity to coordinate multiple systems, recognise context-dependence, and hold contradictory perspectives in productive tension. This is the cognitive structure that enables genuine pluralism and dialectical thinking.',
    modules: [
      { title: 'Postformal Operations', to: '/docs/modules/cognitive-line-postformal-operations' },
      { title: 'Cognitive Dissonance Bridge', to: '/docs/modules/cognitive-dissonance-bridge' },
      { title: 'Cognitive Line Overview & Orientation', to: '/docs/modules/cognitive-line-overview-orientation' },
    ],
  },
  4: {
    label: 'Early Metasystematic',
    description: 'Your responses extend into metasystematic reasoning — the capacity to reflect on the frameworks themselves, to compare paradigms from a position outside any single one, and to generate new frameworks rather than choosing between existing ones. This is the cognitive structure that enables genuine interdisciplinarity and paradigm innovation.',
    modules: [
      { title: 'Metasystematic & Vision-Logic', to: '/docs/modules/cognitive-line-metasystematic-vision-logic' },
      { title: 'Cognitive Practice Architecture', to: '/docs/modules/cognitive-line-practice-architecture' },
      { title: 'Postformal Operations', to: '/docs/modules/cognitive-line-postformal-operations' },
    ],
  },
};

const MHC_LEVEL_LABELS = {
  1: 'Concrete Operational',
  2: 'Formal Operational',
  3: 'Postformal',
  4: 'Early Metasystematic',
};

// ── Export Helper ───────────────────────────────────────────────────────────

function buildExportText(mhcProfile, dialecticalScore, sectionCAnswers, dominantLevel) {
  const lines = [];
  lines.push('═══ Cognitive Line Developmental Profile ═══');
  lines.push('');
  lines.push('── MHC Cognitive Operations Profile ──');
  lines.push(`Total tasks completed: ${mhcProfile.total}/8`);
  lines.push('');
  [1, 2, 3, 4].forEach((level) => {
    const count = mhcProfile.levelCounts[level];
    const bar = '█'.repeat(count);
    lines.push(`  ${MHC_LEVEL_LABELS[level]}: ${bar} (${count} responses)`);
  });
  lines.push('');
  lines.push(`Dominant cognitive level: ${dominantLevel ? MHC_LEVEL_LABELS[dominantLevel] : 'Not determined'}`);
  lines.push('');
  lines.push('── Dialectical Thinking (Basseches Self-Evaluation) ──');
  if (dialecticalScore.totalCriteria > 0) {
    lines.push(`Average self-rating: ${dialecticalScore.average}/2.0 across ${dialecticalScore.totalCriteria} criteria`);
  } else {
    lines.push('No self-evaluation data submitted.');
  }
  lines.push('');
  lines.push('── Metacognitive Reflections ──');
  SECTION_C_QUESTIONS.forEach((q, i) => {
    const answer = sectionCAnswers[q.id];
    if (answer && answer.trim()) {
      lines.push(`Q${i + 1}: ${answer}`);
      lines.push('');
    }
  });
  lines.push('── IMPORTANT ──');
  lines.push('Cognitive operations are highly domain-specific and context-sensitive.');
  lines.push('These results reflect your performance on these tasks in this moment —');
  lines.push('treat them as one data point, not a fixed assessment of your cognitive capacity.');
  lines.push('');
  lines.push('── Recommended Modules ──');
  if (dominantLevel && MODULE_RECOMMENDATIONS[dominantLevel]) {
    MODULE_RECOMMENDATIONS[dominantLevel].modules.forEach((m) => {
      lines.push(`  • ${m.title}`);
    });
  }
  return lines.join('\n');
}

// ── Component ───────────────────────────────────────────────────────────────

export default function CognitiveLineAssessment() {
  const [sectionAAnswers, setSectionAAnswers] = useState({});
  const [sectionBResponses, setSectionBResponses] = useState({});
  const [sectionBSelfEvals, setSectionBSelfEvals] = useState({});
  const [sectionCAnswers, setSectionCAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const mhcProfile = computeMHCProfile(sectionAAnswers);
  const dialecticalScore = computeDialecticalScore(sectionBSelfEvals);

  const handleSectionAChange = (taskId, value) => {
    setSectionAAnswers((prev) => ({ ...prev, [taskId]: { taskId, value } }));
  };

  const handleSectionBResponse = (problemId, response) => {
    setSectionBResponses((prev) => ({ ...prev, [problemId]: response }));
  };

  const handleSectionBEval = (problemId, criterionIndex, score) => {
    setSectionBSelfEvals((prev) => {
      const current = prev[problemId] || [0, 0, 0, 0];
      const updated = [...current];
      updated[criterionIndex] = score;
      return { ...prev, [problemId]: updated };
    });
  };

  const handleSectionCChange = (questionId, response) => {
    setSectionCAnswers((prev) => ({ ...prev, [questionId]: response }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSectionAAnswers({});
    setSectionBResponses({});
    setSectionBSelfEvals({});
    setSectionCAnswers({});
    setSubmitted(false);
    setCopied(false);
  };

  const handleExport = useCallback(async () => {
    const text = buildExportText(mhcProfile, dialecticalScore, sectionCAnswers, mhcProfile.dominantLevel);
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
  }, [mhcProfile, dialecticalScore, sectionCAnswers]);

  const sectionAComplete = Object.keys(sectionAAnswers).length === SECTION_A_TASKS.length;

  // ── Results view ──────────────────────────────────────────────────────
  if (submitted) {
    const rec = mhcProfile.dominantLevel ? MODULE_RECOMMENDATIONS[mhcProfile.dominantLevel] : null;
    return (
      <div className={styles.results}>
        <h2 className={styles.resultsTitle}>Your Cognitive Developmental Profile</h2>

        {/* MHC Profile */}
        <div className={styles.resultSection}>
          <h3>Cognitive Operations Profile (MHC Spectrum)</h3>
          <p className={styles.resultNote}>
            Based on your responses to 8 graduated reasoning tasks. Each response corresponds to one of four cognitive levels in Commons&apos; Model of Hierarchical Complexity.
          </p>
          <div className={styles.mhcBars}>
            {[1, 2, 3, 4].map((level) => {
              const count = mhcProfile.levelCounts[level];
              const pct = mhcProfile.total > 0 ? (count / mhcProfile.total) * 100 : 0;
              return (
                <div key={level} className={styles.mhcBarRow}>
                  <span className={styles.mhcLabel}>{MHC_LEVEL_LABELS[level]}</span>
                  <div className={styles.mhcBarTrack}>
                    <div
                      className={`${styles.mhcBarFill} ${mhcProfile.dominantLevel === level ? styles.mhcBarDominant : ''}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={styles.mhcCount}>{count} of {mhcProfile.total}</span>
                </div>
              );
            })}
          </div>
          {mhcProfile.dominantLevel && (
            <p className={styles.dominantNote}>
              <strong>Your responses most consistently reflect {MHC_LEVEL_LABELS[mhcProfile.dominantLevel]} reasoning.</strong>
            </p>
          )}
        </div>

        {/* Dialectical Score */}
        <div className={styles.resultSection}>
          <h3>Dialectical Thinking Self-Assessment</h3>
          <p className={styles.resultNote}>
            Your self-evaluation across 4 Basseches criteria (recognition of multiple perspectives, integration of opposing views, contextual awareness, and metasystematic reflection). Scored 0–2 per criterion.
          </p>
          {dialecticalScore.totalCriteria > 0 ? (
            <p>
              Average self-rating: <strong>{dialecticalScore.average} / 2.0</strong> across {dialecticalScore.totalCriteria} criteria
            </p>
          ) : (
            <p>No self-evaluation data submitted for the dialectical thinking problems.</p>
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
              Complete at least one section of the assessment to receive module recommendations.
            </p>
          )}
        </div>

        {/* Domain-Specificity Disclaimer */}
        <div className={`${styles.resultSection} ${styles.disclaimer}`}>
          <h3>Important</h3>
          <p>
            Cognitive operations are highly domain-specific and context-sensitive. These results reflect your performance on these tasks in this moment — treat them as one data point, not a fixed assessment of your cognitive capacity. A person who demonstrates metasystematic reasoning in a familiar domain may reason formally in an unfamiliar one. Development is uneven, context-dependent, and ongoing.
          </p>
          <p>
            This tool is designed for self-reflection and developmental orientation, not for diagnostic, selection, or comparative purposes. No persistent data is stored — your results exist only in this browser session.
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

  // ── Assessment form view ──────────────────────────────────────────────
  return (
    <div className={styles.assessment}>
      {/* ── Section A ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section A: Cognitive Operations Tasks</h2>
        <p className={styles.sectionIntro}>
          Below are 8 reasoning problems that span concrete, formal, postformal, and metasystematic levels of cognitive complexity. Read each problem and select the response that best represents how you would think about it. There are no right or wrong answers — different responses reflect different cognitive approaches, and all are developmentally valid.
        </p>
        <div className={styles.sectionStatus}>
          {sectionAComplete ? '✓ All 8 tasks completed' : `${Object.keys(sectionAAnswers).length} of ${SECTION_A_TASKS.length} tasks completed`}
        </div>

        {SECTION_A_TASKS.map((task, index) => (
          <div key={task.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Task {index + 1} of 8</p>
            <p className={styles.questionText}>{task.text}</p>
            <div className={styles.options}>
              {task.options.map((opt) => (
                <label key={opt.value} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={task.id}
                    value={opt.value}
                    checked={sectionAAnswers[task.id]?.value === opt.value}
                    onChange={() => handleSectionAChange(task.id, opt.value)}
                    className={styles.radio}
                  />
                  <span className={styles.optionText}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Section B ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section B: Dialectical Thinking Assessment</h2>
        <p className={styles.sectionIntro}>
          Below are 4 open-ended problems. For each, write a response that demonstrates dialectical thinking — the capacity to recognise multiple legitimate perspectives, hold tension productively, and articulate an integrated understanding that goes beyond simply choosing one side.
        </p>
        <p className={styles.sectionIntro}>
          After writing your response, evaluate it against the four Basseches criteria below. Be honest — this is self-assessment for your own developmental awareness, not a test with external grading.
        </p>

        {SECTION_B_PROBLEMS.map((problem, index) => (
          <div key={problem.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Problem {index + 1} of 4</p>
            <p className={styles.questionText}>{problem.text}</p>

            <label className={styles.textareaLabel}>
              Your dialectical response:
              <textarea
                className={styles.textarea}
                rows={6}
                value={sectionBResponses[problem.id] || ''}
                onChange={(e) => handleSectionBResponse(problem.id, e.target.value)}
                placeholder="Write your response here..."
              />
            </label>

            {/* Self-evaluation rubric */}
            <div className={styles.rubric}>
              <p className={styles.rubricTitle}>Self-Evaluation: Rate your response on each of the following criteria (0 = not present, 1 = partially present, 2 = clearly demonstrated)</p>
              {BASCHES_CRITERIA.map((criterion, ci) => (
                <div key={criterion.id} className={styles.rubricRow}>
                  <span className={styles.rubricCriterion}>{criterion.label}</span>
                  <div className={styles.rubricOptions}>
                    {[0, 1, 2].map((score) => (
                      <label key={score} className={styles.rubricLabel}>
                        <input
                          type="radio"
                          name={`${problem.id}-${criterion.id}`}
                          value={score}
                          checked={(sectionBSelfEvals[problem.id] || [])[ci] === score}
                          onChange={() => handleSectionBEval(problem.id, ci, score)}
                          className={styles.radio}
                        />
                        <span>{score}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Section C ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Section C: Metacognitive Reflection</h2>
        <p className={styles.sectionIntro}>
          The way you reflect on your own thinking process is itself a window into your cognitive development. Answer the following questions thoughtfully — there are no right answers, only honest ones.
        </p>

        {SECTION_C_QUESTIONS.map((question, index) => (
          <div key={question.id} className={styles.questionCard}>
            <p className={styles.questionNumber}>Question {index + 1} of 5</p>
            <p className={styles.questionText}>{question.text}</p>
            <label className={styles.textareaLabel}>
              Your response:
              <textarea
                className={styles.textarea}
                rows={5}
                value={sectionCAnswers[question.id] || ''}
                onChange={(e) => handleSectionCChange(question.id, e.target.value)}
                placeholder="Write your reflection here..."
              />
            </label>
          </div>
        ))}
      </section>

      {/* ── Submit ── */}
      <div className={styles.submitArea}>
        {!sectionAComplete && (
          <p className={styles.submitHint}>
            Section A is not yet complete ({Object.keys(sectionAAnswers).length}/{SECTION_A_TASKS.length} tasks answered). You can still submit to see your profile based on the tasks you completed.
          </p>
        )}
        <button className={styles.submitButton} onClick={handleSubmit}>
          View Your Cognitive Profile
        </button>
        <p className={styles.privacyNote}>
          No data is stored or transmitted. Your responses remain in this browser session only.
        </p>
      </div>
    </div>
  );
}
