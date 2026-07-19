import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './start.module.css';

// ─── Assessment data ──────────────────────────────────────────────────────────
// Zero AQAL terminology. Mapped to observable life situations.

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
    id: 'self-line',
    title: 'Understanding Yourself',
    description: 'Explore how your sense of self develops over time.',
    to: '/docs/quickstarts/self-line-development',
  },
  {
    id: 'shadow-work',
    title: 'Working with Shadow',
    description: 'Recognise and integrate disowned parts of yourself.',
    to: '/docs/quickstarts/shadow-work',
  },
];

// ─── Results mapping ─────────────────────────────────────────────────────────

const RESULTS = {
  'A-dominant': {
    title: 'Clear Thinking Path',
    explanation:
      'Your responses suggest you value clarity, structure, and trusted guidance. The Clear Thinking Path is designed to help you build skills in evidence-based reasoning and critical thinking — while honouring the values and frameworks that have served you well. It is not about abandoning what you know, but adding new tools for when situations get more complex.',
    recommended: '/docs/quickstarts/amber-to-rational',
    alt: 'You might also find the Personal to Integral path helpful as a broader starting point.',
    altLink: '/docs/quickstarts/personal-to-integral',
  },
  'B-dominant': {
    title: 'Multiple Perspectives Path',
    explanation:
      'Your responses suggest you are comfortable with analytical thinking — weighing evidence, reasoning things through, and forming your own conclusions. The Multiple Perspectives Path is designed to help you expand this strength by learning to hold and integrate viewpoints very different from your own. It builds on your analytical skill rather than replacing it.',
    recommended: '/docs/quickstarts/rational-to-pluralistic',
    alt: 'If you want to strengthen your analytical foundations first, the Clear Thinking Path is a good starting point.',
    altLink: '/docs/quickstarts/amber-to-rational',
  },
  'C-dominant': {
    title: 'Integrating Perspectives Path',
    explanation:
      'Your responses suggest you naturally see situations from multiple angles and value diverse perspectives. The Integrating Perspectives Path is designed for people who have already done significant perspective-taking work and are now asking: how do I weave all these views together into something coherent and actionable?',
    recommended: '/docs/quickstarts/pluralistic-to-integral',
    alt: 'If you are still developing your comfort with multiple perspectives, the Multiple Perspectives Path may be a better starting point.',
    altLink: '/docs/quickstarts/rational-to-pluralistic',
  },
  mixed: {
    title: 'Personal to Integral',
    explanation:
      'Your responses span a range of approaches — which is completely normal. Different situations call for different ways of thinking. The Personal to Integral path offers a broad foundation: it starts with building self-awareness and practical skills, then gradually introduces systems thinking and multiple-perspective approaches. It is designed to meet you where you are.',
    recommended: '/docs/quickstarts/personal-to-integral',
    alt: 'If you are drawn to a specific area, explore any of the paths below.',
    altLink: null,
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

function getRecommendedPathTitle(resultKey) {
  const info = RESULTS[resultKey];
  if (!info) return null;
  const match = ALL_PATHS.find((p) => p.to === info.recommended);
  return match ? match.title : null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function StartPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;
  const allAnswered = answered === total;

  function handleSelect(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleSubmit() {
    if (allAnswered) setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  const resultKey = submitted ? tally(answers) : null;
  const result = resultKey ? RESULTS[resultKey] : null;

  return (
    <Layout
      title="Find Your Path"
      description="Answer a few questions to discover which learning path fits where you are right now."
    >
      <main className={styles.wrapper}>
        <h1>Find Your Path</h1>
        <p>
          Answer four questions about how you tend to approach decisions, truth,
          disagreement, and confidence. There are no right or wrong answers —
          this is about finding the starting point that fits where you are{' '}
          <em>right now</em>.
        </p>

        <div className={styles.disclaimer} role="alert">
          <strong>This is a self-reflection tool, not a clinical assessment.</strong>{' '}
          It cannot diagnose or evaluate any condition. It exists only to help you
          choose a learning path that matches your current approach to thinking and
          decision-making.
        </div>

        {!submitted && (
          <>
            <progress
              className={styles.progressBar}
              value={answered}
              max={total}
              aria-label={`${answered} of ${total} questions answered`}
            />
            <p className={styles.progressLabel}>
              {answered} of {total} questions answered
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
                      checked={answers[q.id] === opt.value}
                      onChange={() => handleSelect(q.id, opt.value)}
                      className={styles.optionInput}
                    />
                    {opt.label}
                  </label>
                ))}
              </fieldset>
            ))}

            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={!allAnswered}
              aria-disabled={!allAnswered}
            >
              See My Recommendation
            </button>
          </>
        )}

        {submitted && result && (
          <>
            <div className={styles.resultBox} role="region" aria-label="Your recommended path">
              <h2 className={styles.resultTitle}>
                Your Recommended Starting Point: {result.title}
              </h2>
              <p className={styles.explanation}>{result.explanation}</p>

              <div className={styles.recommendedActions}>
                <Link to={result.recommended} className={styles.primaryPath}>
                  Begin the {result.title} →
                </Link>
              </div>

              {result.alt && (
                <p className={styles.altText}>
                  {result.alt}
                  {result.altLink && (
                    <>
                      {' '}
                      <Link to={result.altLink}>Explore that path →</Link>
                    </>
                  )}
                </p>
              )}
            </div>

            <div className={styles.allPathsSection}>
              <h2>All Learning Paths</h2>
              <p>Here are all the curated paths available. Your recommendation is highlighted.</p>
              <div className={styles.allPathsGrid}>
                {ALL_PATHS.map((path) => {
                  const isRecommended = path.to === result.recommended;
                  return (
                    <article
                      key={path.id}
                      className={`${styles.pathCard} ${isRecommended ? styles.recommendedCard : ''}`}
                    >
                      <h3>
                        {path.title}
                        {isRecommended && (
                          <span className={styles.recommendedBadge}>Recommended</span>
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
