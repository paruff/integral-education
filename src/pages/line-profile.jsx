import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useProgress from '@site/src/hooks/useProgress';

const LINES = ['cognitive', 'emotional', 'moral', 'interpersonal', 'somatic', 'spiritual'];

const LINE_NAMES = {
  cognitive: 'Cognitive',
  emotional: 'Emotional',
  moral: 'Moral',
  interpersonal: 'Interpersonal',
  somatic: 'Somatic',
  spiritual: 'Spiritual',
};

const QUESTIONS = [
  // Cognitive (2)
  { line: 'cognitive', text: 'How would you rate your ability to reason through complex problems without relying on authority or rules?' },
  { line: 'cognitive', text: 'How well can you think in systems — holding multiple variables and their interactions simultaneously?' },
  // Emotional (2)
  { line: 'emotional', text: 'How precisely can you name what you feel in emotionally charged moments?' },
  { line: 'emotional', text: 'How well can you regulate strong emotions without suppressing or ignoring them?' },
  // Moral (2)
  { line: 'moral', text: 'How would you rate your ability to make ethical decisions when values genuinely conflict?' },
  { line: 'moral', text: 'How well can you recognise when your moral judgments are shaped by your culture rather than universal principles?' },
  // Interpersonal (2)
  { line: 'interpersonal', text: 'How effectively do you navigate disagreements while maintaining the relationship?' },
  { line: 'interpersonal', text: 'How well can you genuinely see a situation from another person\'s perspective?' },
  // Somatic (2)
  { line: 'somatic', text: 'How aware are you of bodily sensations in real time — tension, warmth, tightness, energy?' },
  { line: 'somatic', text: 'How well can you use your body as a source of information about your emotional state?' },
  // Spiritual (2)
  { line: 'spiritual', text: 'How coherent is your sense of meaning and purpose — does your life connect to something larger than yourself?' },
  { line: 'spiritual', text: 'How comfortable are you when your spiritual or existential beliefs are challenged by new experiences?' },
];

const OPTIONS = [
  { value: 1, label: 'Not yet — I rarely experience this' },
  { value: 2, label: 'Beginning — I can do this with support or in calm conditions' },
  { value: 3, label: 'Competent — I can do this independently most of the time' },
  { value: 4, label: 'Strong — this is a reliable capacity, even under pressure' },
];

// Module recommendations per line
const RECOMMENDED_MODULES = {
  cognitive: { title: 'Cognitive Line Overview', to: '/docs/modules/cognitive-line-overview-orientation' },
  emotional: { title: 'Emotional Granularity', to: '/docs/modules/emotional-granularity' },
  moral: { title: 'Moral Line: Dual Track', to: '/docs/modules/moral-line-overview-dual-track' },
  interpersonal: { title: 'Interpersonal Line Overview', to: '/docs/modules/interpersonal-line-overview-orientation' },
  somatic: { title: 'Emotional Intelligence & Somatic Line', to: '/docs/modules/emotional-intelligence-somatic-line' },
  spiritual: { title: 'Spiritual Line Overview', to: '/docs/modules/spiritual-line-overview-orientation' },
};

function calculateProfile(answers) {
  const scores = {};
  for (const line of LINES) scores[line] = { total: 0, count: 0 };
  for (const answer of answers) {
    scores[answer.line].total += answer.value;
    scores[answer.line].count += 1;
  }
  const profile = {};
  for (const line of LINES) {
    profile[line] = Math.round(scores[line].total / scores[line].count);
  }
  return profile;
}

function getGrowthLine(profile) {
  let minLine = LINES[0];
  let minScore = profile[minLine];
  for (const line of LINES) {
    if (profile[line] < minScore) {
      minScore = profile[line];
      minLine = line;
    }
  }
  return minLine;
}

export default function LineProfilePage() {
  const { isAvailable, updateLineProfile, hasLineProfile } = useProgress();
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const profile = submitted && answers.length === QUESTIONS.length ? calculateProfile(answers) : null;
  const growthLine = profile ? getGrowthLine(profile) : null;

  function handleAnswer(questionIndex, line, value) {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = { line, value };
      return next;
    });
  }

  function handleSubmit() {
    const prof = calculateProfile(answers);
    updateLineProfile(prof);
    setSubmitted(true);
  }

  function handleRetake() {
    setAnswers([]);
    setSubmitted(false);
  }

  const allAnswered = answers.filter(Boolean).length === QUESTIONS.length;

  return (
    <Layout title="Line Profile" description="Assess your development across six key lines.">
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1>Line Profile</h1>
        <p>Answer 12 questions to get a rough picture of your development across six core lines. This is not a clinical assessment — it is a self-reflection tool to help you identify where to focus next.</p>

        {!isAvailable && (
          <div className="alert alert--warning" role="alert">
            <strong>Private browsing detected.</strong> Your profile will not be saved.
          </div>
        )}

        {!submitted && (
          <>
            {QUESTIONS.map((q, idx) => (
              <fieldset key={idx} style={{ border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
                <legend style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {idx + 1}. {q.text}
                </legend>
                <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '0.5rem' }}>
                  {LINE_NAMES[q.line]} line
                </p>
                {OPTIONS.map((opt) => (
                  <label key={opt.value} style={{ display: 'block', marginBottom: '0.3rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt.value}
                      checked={answers[idx]?.value === opt.value}
                      onChange={() => handleAnswer(idx, q.line, opt.value)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </fieldset>
            ))}
            <button
              className="button button--primary"
              onClick={handleSubmit}
              disabled={!allAnswered}
              style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}
            >
              See My Profile
            </button>
          </>
        )}

        {submitted && profile && (
          <>
            <h2>Your Line Profile</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              {LINES.map((line) => (
                <div key={line} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 600 }}>{LINE_NAMES[line]}</span>
                    <span style={{ color: 'var(--ifm-color-emphasis-600)' }}>{['', 'Not yet', 'Beginning', 'Competent', 'Strong'][profile[line]]}</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--ifm-color-emphasis-200)', borderRadius: '4px' }}>
                    <div style={{ height: '100%', width: `${(profile[line] / 4) * 100}%`, background: line === growthLine ? 'var(--ifm-color-primary)' : 'var(--ifm-color-success)', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>

            {growthLine && (
              <div style={{ padding: '1.25rem', background: 'var(--ifm-color-primary-lightest)', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Your growth opportunity</h3>
                <p>
                  Your <strong>{LINE_NAMES[growthLine]} line</strong> shows the most room for development right now. 
                  This is not a weakness — it is information. Every person develops different lines at different speeds. 
                  Focusing on your lowest-scoring line often creates the most leverage across your other capacities.
                </p>
                <Link className="button button--primary" to={RECOMMENDED_MODULES[growthLine].to}>
                  Start: {RECOMMENDED_MODULES[growthLine].title} →
                </Link>
              </div>
            )}

            <button className="button button--secondary" onClick={handleRetake} style={{ marginBottom: '1rem' }}>
              Retake Assessment
            </button>

            <p>
              <Link to="/docs/my-progress">View your full progress dashboard →</Link>
            </p>
          </>
        )}
      </main>
    </Layout>
  );
}