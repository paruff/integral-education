import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './start.module.css';

// ─── Assessment data ──────────────────────────────────────────────────────────
// Zero AQAL terminology. Mapped to observable life situations.
// Phase 1: stage routing (4 questions, a/b/c options)
// Phase 2: line routing (5 questions, emotional/interpersonal/self/cognitive/moral options)

const QUESTIONS = [
  {
    id: 0,
    text: 'When facing a difficult decision, I tend to:',
    options: [
      { value: 'a', label: 'Follow the rules or trusted guidance that have worked before.' },
      { value: 'b', label: 'Research the evidence, weigh pros and cons, and decide for myself.' },
      { value: 'c', label: 'Look at the situation from several different angles before choosing.' },
    ],
  },
  {
    id: 1,
    text: 'The best way to know something is true is when:',
    options: [
      { value: 'a', label: 'It comes from a reliable source — someone I trust or an established tradition.' },
      { value: 'b', label: 'I can verify it with facts, logic, or data that hold up to scrutiny.' },
      { value: 'c', label: 'It makes sense across different contexts and takes multiple viewpoints into account.' },
    ],
  },
  {
    id: 2,
    text: 'When I disagree with someone, I usually:',
    options: [
      { value: 'a', label: 'Look to shared values or respected authority to help resolve the difference.' },
      { value: 'b', label: 'Present my reasoning with evidence and expect them to engage with the facts.' },
      { value: 'c', label: 'Try to understand their full perspective — there may be truth in both views.' },
    ],
  },
  {
    id: 3,
    text: 'I feel most confident when:',
    options: [
      { value: 'a', label: 'I know the right way to handle things — clear rules and reliable methods.' },
      { value: 'b', label: "I've thought through a problem carefully and can back up my conclusions." },
      { value: 'c', label: 'I can hold several possibilities in mind without needing to lock onto one answer.' },
    ],
  },
];

// ─── Line-diagnostic questions (Phase 2) ──────────────────────────────────────
// Options map to: emotional, interpersonal, self, cognitive, moral
// Language describes observable behaviors, not traits or labels.

const LINE_QUESTIONS = [
  {
    id: 0,
    text: 'When I feel under pressure, I tend to:',
    options: [
      { value: 'emotional', label: 'Feel flooded by strong feelings — I have trouble naming what I\'m experiencing.' },
      { value: 'interpersonal', label: 'Pull back from people or shut down — conflict and tension feel hard to stay present with.' },
      { value: 'self', label: 'Feel unsettled at a deeper level — my sense of who I am and what I believe feels shaky.' },
      { value: 'cognitive', label: 'Struggle to think clearly or hold onto complexity — my thinking gets simpler and more rigid.' },
      { value: 'moral', label: 'Feel torn about what\'s right, unsure which value should win out.' },
    ],
  },
  {
    id: 1,
    text: 'In difficult or high-stakes conversations, I most often:',
    options: [
      { value: 'emotional', label: 'Get overwhelmed by emotion and lose the ability to think clearly.' },
      { value: 'interpersonal', label: 'Focus so much on the other person that I lose track of my own needs and boundaries.' },
      { value: 'self', label: 'Notice that something about my identity or values is being challenged — it touches deeper than the topic.' },
      { value: 'cognitive', label: 'Lose track of the bigger picture — I can\'t hold all the moving parts in mind at once.' },
      { value: 'moral', label: 'Feel caught between competing obligations or values, unsure how to weigh them.' },
    ],
  },
  {
    id: 2,
    text: 'The area I feel the strongest need for growth right now is:',
    options: [
      { value: 'emotional', label: 'Understanding and working with my feelings — I feel driven by emotions I don\'t fully understand.' },
      { value: 'interpersonal', label: 'Navigating relationships with more skill — I want to handle conflict and closeness better.' },
      { value: 'self', label: 'Understanding how my sense of self has developed — there are patterns I can feel but can\'t yet name.' },
      { value: 'cognitive', label: 'Thinking through complexity — handling situations with many interacting parts and no clear-cut answer.' },
      { value: 'moral', label: 'Working through ethical questions — deciding what\'s right when values conflict or the "rules" don\'t clearly apply.' },
    ],
  },
  {
    id: 3,
    text: 'When I\'m learning something new and complicated, I tend to:',
    options: [
      { value: 'emotional', label: 'Get anxious or overwhelmed before I\'ve even had a chance to understand it.' },
      { value: 'interpersonal', label: 'Want to talk it through with someone else before I trust my own take on it.' },
      { value: 'self', label: 'Wonder whether I\'m the kind of person who\'s good at this kind of thing.' },
      { value: 'cognitive', label: 'Struggle most with holding several moving parts in mind at once — I do better one piece at a time.' },
      { value: 'moral', label: 'Feel unsure whether there\'s even a "right" way to approach it, or if it\'s just a matter of preference.' },
    ],
  },
  {
    id: 4,
    text: 'When two things I care about seem to pull in different directions, I usually:',
    options: [
      { value: 'emotional', label: 'Feel the tension in my body before I can name what\'s actually bothering me.' },
      { value: 'interpersonal', label: 'Worry most about how the people involved will be affected.' },
      { value: 'self', label: 'Question what this conflict says about who I am or what I stand for.' },
      { value: 'cognitive', label: 'Try to map out the logic of the situation, but get lost once it gets complex.' },
      { value: 'moral', label: 'Wrestle with which value should take priority — this is where I get stuck most.' },
    ],
  },
];

// ─── All available paths ────────────────────────────────────────────────────

const ALL_PATHS = [
  {
    id: 'personal-to-integral',
    title: 'Personal to Integral',
    description: 'A general starting point — build self-awareness and systems thinking.',
    to: '/docs/quickstarts/personal-to-integral',
  },
  {
    id: 'amber-to-rational',
    title: 'Clear Thinking Path',
    description: 'Move from rule-based to evidence-based thinking.',
    to: '/docs/quickstarts/amber-to-rational',
  },
  {
    id: 'rational-to-pluralistic',
    title: 'Multiple Perspectives Path',
    description: 'Expand beyond analysis to include diverse viewpoints.',
    to: '/docs/quickstarts/rational-to-pluralistic',
  },
  {
    id: 'pluralistic-to-integral',
    title: 'Integrating Perspectives Path',
    description: 'Weave multiple ways of knowing into a coherent whole.',
    to: '/docs/quickstarts/pluralistic-to-integral',
  },
  {
    id: 'emotional-line',
    title: 'Emotional Line Development',
    description: 'Build emotional vocabulary, regulation, and somatic awareness.',
    to: '/docs/quickstarts/emotional-line-development',
  },
  {
    id: 'interpersonal-line',
    title: 'Interpersonal Line Development',
    description: 'Build perspective-taking, empathy, and relational repair skills.',
    to: '/docs/quickstarts/interpersonal-line-development',
  },
  {
    id: 'self-line',
    title: 'Understanding Yourself',
    description: 'Explore how your sense of self develops over time.',
    to: '/docs/quickstarts/self-line-development',
  },
  {
    id: 'cognitive-line',
    title: 'Cognitive Line Development',
    description: 'Build capacity for complexity — postformal and metasystematic thinking.',
    to: '/docs/quickstarts/cognitive-line-development',
  },
  {
    id: 'moral-line',
    title: 'Moral Line Development',
    description: 'Develop ethical reasoning from conventional to post-conventional stages.',
    to: '/docs/quickstarts/moral-line-development',
  },
  {
    id: 'shadow-work',
    title: 'Working with Shadow',
    description: 'Recognise and integrate disowned parts of yourself.',
    to: '/docs/quickstarts/shadow-work',
  },
];

// ─── Stage results mapping (unchanged from ROUTE-01) ─────────────────────────

const RESULTS = {
  'A-dominant': {
    title: 'Clear Thinking Path',
    explanation:
      'Your answers suggest you tend to rely on established sources, trusted guidance, and clear rules when making decisions. These are real strengths — and there are also times when evidence-based reasoning opens doors that rules alone cannot. The Clear Thinking Path is designed to build that second skill without asking you to set aside the first.',
    recommended: '/docs/quickstarts/amber-to-rational',
    alt: 'You might also find the Personal to Integral path helpful as a broader starting point.',
    altLink: '/docs/quickstarts/personal-to-integral',
  },
  'B-dominant': {
    title: 'Multiple Perspectives Path',
    explanation:
      'Your answers suggest you are comfortable weighing evidence, reasoning things through, and forming your own conclusions. That analytical skill is a powerful foundation. The Multiple Perspectives Path builds on it by helping you hold and integrate viewpoints very different from your own — which is where the hardest decisions usually live.',
    recommended: '/docs/quickstarts/rational-to-pluralistic',
    alt: 'If you want to strengthen your analytical foundations first, the Clear Thinking Path is a good starting point.',
    altLink: '/docs/quickstarts/amber-to-rational',
  },
  'C-dominant': {
    title: 'Integrating Perspectives Path',
    explanation:
      'Your answers suggest you naturally see situations from multiple angles and value diverse viewpoints. That perspective-taking capacity is a genuine strength. The Integrating Perspectives Path helps you weave all those views together into something coherent and actionable — the jump from seeing many truths to working with all of them at once.',
    recommended: '/docs/quickstarts/pluralistic-to-integral',
    alt: 'If you are still developing your comfort with multiple perspectives, the Multiple Perspectives Path may be a better starting point.',
    altLink: '/docs/quickstarts/rational-to-pluralistic',
  },
  mixed: {
    title: 'Personal to Integral',
    explanation:
      'Your answers span a range of approaches — which is completely normal; different situations genuinely call for different ways of thinking. You are likely someone who moves flexibly between evidence, values, and perspectives depending on what the moment demands. The Personal to Integral Path is a broad foundation designed to meet you where you are and gradually introduce more integrative skills across all of those modes.',
    recommended: '/docs/quickstarts/personal-to-integral',
    alt: 'If you are drawn to a specific area, explore any of the paths below.',
    altLink: null,
  },
};

// ─── Line results mapping (new for ROUTE-02) ─────────────────────────────────

const LINE_RESULTS = {
  emotional: {
    title: 'Emotional Line Development',
    explanation:
      'Your answers suggest that emotional experiences — naming feelings, staying grounded under pressure, and working with emotional intensity — are areas where focused attention could make a meaningful difference. The Emotional Line path builds emotional vocabulary, regulation skill, and somatic awareness in a structured, stage-aware sequence.',
    recommended: '/docs/quickstarts/emotional-line-development',
    alt: 'If you also want to build relational skills alongside emotional awareness, the Interpersonal Line path is a natural complement.',
    altLink: '/docs/quickstarts/interpersonal-line-development',
  },
  interpersonal: {
    title: 'Interpersonal Line Development',
    explanation:
      'Your answers suggest that relational skill — navigating conflict, staying present with others during tension, and balancing your own needs with another person\'s perspective — is an area where focused attention could be particularly valuable. The Interpersonal Line path builds perspective-taking, empathic accuracy, and relational repair skills in a structured sequence.',
    recommended: '/docs/quickstarts/interpersonal-line-development',
    alt: 'If you also want to strengthen emotional awareness as a foundation for relational work, the Emotional Line path is a natural starting point.',
    altLink: '/docs/quickstarts/emotional-line-development',
  },
  self: {
    title: 'Understanding Yourself',
    explanation:
      'Your answers suggest that identity and meaning-making — how you understand who you are, what shapes your values, and why certain challenges feel so personal — is an area where deeper exploration could be especially useful. The Self Line path maps how identity develops across stages and provides practices for understanding your own meaning-making structure.',
    recommended: '/docs/quickstarts/self-line-development',
    alt: 'If you are also interested in how emotional patterns shape your sense of self, the Emotional Line path is a helpful complement.',
    altLink: '/docs/quickstarts/emotional-line-development',
  },
  cognitive: {
    title: 'Cognitive Line Development',
    explanation:
      'Your answers suggest that handling complexity — holding several variables in mind at once, thinking through situations with many interacting parts, and reasoning at a level that matches how complicated the world actually is — is an area where focused attention could be especially useful. The Cognitive Line path builds capacity for postformal and metasystematic thinking in a structured, stage-aware sequence.',
    recommended: '/docs/quickstarts/cognitive-line-development',
    alt: 'If you also want to build self-understanding alongside cognitive complexity, the Self Line path is a natural complement.',
    altLink: '/docs/quickstarts/self-line-development',
  },
  moral: {
    title: 'Moral Line Development',
    explanation:
      'Your answers suggest that ethical reasoning — weighing competing values, working through situations where the "right" answer isn\'t obvious, and reasoning about fairness and obligation — is an area where focused attention could be especially useful. The Moral Line path builds capacity for post-conventional ethical reasoning in a structured, stage-aware sequence.',
    recommended: '/docs/quickstarts/moral-line-development',
    alt: 'If you also want to strengthen perspective-taking alongside moral reasoning, the Interpersonal Line path is a natural complement.',
    altLink: '/docs/quickstarts/interpersonal-line-development',
  },
  mixed: {
    title: 'Emotional Line Development',
    explanation:
      'Your answers span multiple areas — which is completely normal. The Emotional and Interpersonal lines are strongly connected: emotional skill supports relational skill, and relationships are where emotional patterns become most visible. We suggest starting with the Emotional Line path for foundational skills, or the Interpersonal path if relationships are your primary concern right now.',
    recommended: '/docs/quickstarts/emotional-line-development',
    alt: 'If relationships are your primary concern, start with the Interpersonal Line path instead.',
    altLink: '/docs/quickstarts/interpersonal-line-development',
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function tally(answers) {
  const counts = { a: 0, b: 0, c: 0 };
  for (const val of Object.values(answers)) {
    if (counts[val] !== undefined) counts[val] += 1;
  }
  const max = Math.max(...Object.values(counts));
  // Require at least 3 of 4 for classification; otherwise mixed
  if (max < 3) return 'mixed';
  if (counts.a === max) return 'A-dominant';
  if (counts.b === max) return 'B-dominant';
  if (counts.c === max) return 'C-dominant';
  return 'mixed';
}

function tallyLine(answers) {
  const counts = { emotional: 0, interpersonal: 0, self: 0, cognitive: 0, moral: 0 };
  for (const val of Object.values(answers)) {
    if (counts[val] !== undefined) counts[val] += 1;
  }
  const max = Math.max(...Object.values(counts));
  // Require at least 2 of 5 for classification; otherwise mixed
  if (max < 2) return 'mixed';
  const leaders = Object.keys(counts).filter((key) => counts[key] === max);
  if (leaders.length > 1) return 'mixed';
  return leaders[0];
}

function getRecommendedPathTitle(resultKey) {
  const info = RESULTS[resultKey];
  if (!info) return null;
  const match = ALL_PATHS.find((p) => p.to === info.recommended);
  return match ? match.title : null;
}

function getRecommendedLinePathTitle(resultKey) {
  const info = LINE_RESULTS[resultKey];
  if (!info) return null;
  const match = ALL_PATHS.find((p) => p.to === info.recommended);
  return match ? match.title : null;
}

// ─── Result box sub-component (shared for stage and line) ────────────────────

function ResultBox({ label, result, styles: s }) {
  return (
    <section className={s.resultBox} role="region" aria-label={label}>
      <h2 className={s.resultTitle}>{result.title}</h2>
      <p className={s.explanation}>{result.explanation}</p>

      <div className={s.recommendedActions}>
        <Link to={result.recommended} className={s.primaryPath}>
          Begin the {result.title} →
        </Link>
      </div>

      {result.alt && (
        <p className={s.altText}>
          {result.alt}
          {result.altLink && (
            <>
              {' '}
              <Link to={result.altLink}>Explore that path →</Link>
            </>
          )}
        </p>
      )}
    </section>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function StartPage() {
  const [stageAnswers, setStageAnswers] = useState({});
  const [lineAnswers, setLineAnswers] = useState({});
  // phase: null → showing stage questions
  //        'stage' → stage submitted, showing line questions
  //        'complete' → both submitted, showing combined results
  const [phase, setPhase] = useState(null);

  const stageAnswered = Object.keys(stageAnswers).length;
  const stageTotal = QUESTIONS.length;
  const stageAllAnswered = stageAnswered === stageTotal;

  const lineAnswered = Object.keys(lineAnswers).length;
  const lineTotal = LINE_QUESTIONS.length;
  const lineAllAnswered = lineAnswered === lineTotal;

  function handleStageSelect(questionId, value) {
    setStageAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleLineSelect(questionId, value) {
    setLineAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleStageSubmit() {
    if (stageAllAnswered) setPhase('stage');
  }

  function handleLineSubmit() {
    if (lineAllAnswered) setPhase('complete');
  }

  function handleReset() {
    setStageAnswers({});
    setLineAnswers({});
    setPhase(null);
  }

  const stageResultKey = phase !== null ? tally(stageAnswers) : null;
  const stageResult = stageResultKey ? RESULTS[stageResultKey] : null;

  const lineResultKey = phase === 'complete' ? tallyLine(lineAnswers) : null;
  const lineResult = lineResultKey ? LINE_RESULTS[lineResultKey] : null;

  // Determine recommended paths for the all-paths grid badges
  const stageRecommendedPath = stageResult ? stageResult.recommended : null;
  const lineRecommendedPath = lineResult ? lineResult.recommended : null;

  return (
    <Layout
      title="Find Your Path"
      description="Answer a few questions to discover which learning paths fit where you are right now."
    >
      <main className={styles.wrapper}>
        <h1>Find Your Path</h1>
        <p>
          Answer a few questions about how you tend to approach decisions,
          disagreement, and growth. There are no right or wrong answers —
          this is about finding the starting points that fit where you are{' '}
          <em>right now</em>.
        </p>

        <div className={styles.disclaimer} role="alert">
          <strong>This is a self-reflection tool, not a clinical assessment.</strong>{' '}
          It cannot diagnose or evaluate any condition. It exists only to help you
          choose learning paths that match your current approach to thinking and
          decision-making.
        </div>

        {/* ── Phase 1: Stage questions ──────────────────────────────────── */}
        {phase === null && (
          <>
            <h2 className={styles.phaseTitle}>Part 1: How You Think</h2>
            <p className={styles.phaseSubtitle}>
              These questions help identify which approach to reasoning and
              decision-making fits you best right now.
            </p>

            <progress
              className={styles.progressBar}
              value={stageAnswered}
              max={stageTotal}
              aria-label={`${stageAnswered} of ${stageTotal} questions answered`}
            />
            <p className={styles.progressLabel}>
              {stageAnswered} of {stageTotal} questions answered
            </p>

            {QUESTIONS.map((q) => (
              <fieldset key={q.id} className={styles.questionBlock}>
                <legend className={styles.questionText}>
                  {q.id + 1}. {q.text}
                </legend>
                {q.options.map((opt, idx) => (
                  <label key={idx} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={opt.value}
                      checked={stageAnswers[q.id] === opt.value}
                      onChange={() => handleStageSelect(q.id, opt.value)}
                      className={styles.optionInput}
                    />
                    {opt.label}
                  </label>
                ))}
              </fieldset>
            ))}

            <button
              className={styles.submitBtn}
              onClick={handleStageSubmit}
              disabled={!stageAllAnswered}
              aria-disabled={!stageAllAnswered}
            >
              See My Stage Recommendation
            </button>
          </>
        )}

        {/* ── Phase 2: Line questions ───────────────────────────────────── */}
        {phase === 'stage' && (
          <>
            {stageResult && (
              <div className={styles.phaseResultPreview} role="region" aria-label="Your stage path recommendation">
                <h2 className={styles.phaseResultPreviewTitle}>
                  Your Stage Path: {stageResult.title}
                </h2>
                <p className={styles.phaseResultPreviewText}>{stageResult.explanation}</p>
                <p className={styles.phaseResultPreviewHint}>
                  Hold onto that — you'll see your full results at the end.
                  Now, a few more questions to find your line focus.
                </p>
              </div>
            )}

            <hr className={styles.phaseDivider} />

            <h2 className={styles.phaseTitle}>Part 2: What to Focus On</h2>
            <p className={styles.phaseSubtitle}>
              These questions help identify which area of development —
              emotional skill, relational skill, self-understanding,
              handling complexity, or ethical reasoning — might be most
              useful to work on right now.
            </p>

            <progress
              className={styles.progressBar}
              value={lineAnswered}
              max={lineTotal}
              aria-label={`${lineAnswered} of ${lineTotal} questions answered`}
            />
            <p className={styles.progressLabel}>
              {lineAnswered} of {lineTotal} questions answered
            </p>

            {LINE_QUESTIONS.map((q) => (
              <fieldset key={q.id} className={styles.questionBlock}>
                <legend className={styles.questionText}>
                  {q.id + 1}. {q.text}
                </legend>
                {q.options.map((opt, idx) => (
                  <label key={idx} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`line-q${q.id}`}
                      value={opt.value}
                      checked={lineAnswers[q.id] === opt.value}
                      onChange={() => handleLineSelect(q.id, opt.value)}
                      className={styles.optionInput}
                    />
                    {opt.label}
                  </label>
                ))}
              </fieldset>
            ))}

            <button
              className={styles.submitBtn}
              onClick={handleLineSubmit}
              disabled={!lineAllAnswered}
              aria-disabled={!lineAllAnswered}
            >
              See My Full Recommendation
            </button>
          </>
        )}

        {/* ── Combined results ───────────────────────────────────────────── */}
        {phase === 'complete' && stageResult && lineResult && (
          <>
            <h2 className={styles.phaseTitle}>Your Recommendations</h2>

            <ResultBox label="Your stage path recommendation" result={stageResult} styles={styles} />

            <div className={styles.resultDistinction}>
              <p>
                <strong>Stage paths</strong> address <em>how</em> you approach reasoning and decision-making
                — the kind of thinking you tend to rely on.{' '}
                <strong>Line paths</strong> address <em>what domain</em> to develop
                — the specific capacity that could use focused attention right now.
                These are complementary. You can follow both.
              </p>
            </div>

            <ResultBox label="Your line path recommendation" result={lineResult} styles={styles} />

            <div className={styles.allPathsSection}>
              <h2>All Learning Paths</h2>
              <p>Here are all the curated paths available. Your stage and line recommendations are highlighted.</p>
              <div className={styles.allPathsGrid}>
                {ALL_PATHS.map((path) => {
                  const isStageRecommended = path.to === stageRecommendedPath;
                  const isLineRecommended = path.to === lineRecommendedPath;
                  const isRecommended = isStageRecommended || isLineRecommended;
                  const badgeLabel = isStageRecommended && isLineRecommended
                    ? 'Stage + Line'
                    : isStageRecommended
                      ? 'Stage'
                      : isLineRecommended
                        ? 'Line'
                        : null;
                  return (
                    <article
                      key={path.id}
                      className={`${styles.pathCard} ${isRecommended ? styles.recommendedCard : ''}`}
                    >
                      <h3>
                        {path.title}
                        {isRecommended && (
                          <span className={styles.recommendedBadge}>{badgeLabel}</span>
                        )}
                      </h3>
                      <p>{path.description}</p>
                      <Link to={path.to} className={styles.pathLink}>
                        Explore →
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className={styles.resultActions}>
              <button className={styles.resetBtn} onClick={handleReset}>
                Retake Assessment
              </button>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}
