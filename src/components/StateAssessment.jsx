import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './StateAssessment.module.css';

// ─── Assessment data ──────────────────────────────────────────────────────────

/**
 * Each answer option is tagged with a state key:
 *   G = gross  |  S = subtle  |  C = causal/witness  |  N = nondual
 */
const QUESTIONS = [
  {
    id: 1,
    text: 'In your most recent practice session, the dominant quality of your experience was:',
    options: [
      { label: 'Ordinary physical sensations — breath, body contact, external sounds.', state: 'G' },
      { label: 'Subtle luminosity, flowing energy, or dream-like imagery.', state: 'S' },
      { label: 'A quiet, expansive awareness with thoughts and sensations in the background.', state: 'C' },
      { label: 'A vast openness in which the sense of a separate "me" softened or dissolved.', state: 'N' },
    ],
  },
  {
    id: 2,
    text: 'When attention settles during practice, it most naturally rests on:',
    options: [
      { label: 'Physical anchors — feet, hands, breath, or posture.', state: 'G' },
      { label: 'A felt sense of inner warmth, light, or subtle energetic movement.', state: 'S' },
      { label: 'The awareness that perceives, rather than on any object it perceives.', state: 'C' },
      { label: 'No particular anchor — everything appears within a single, boundless field.', state: 'N' },
    ],
  },
  {
    id: 3,
    text: 'When you experience quiet in practice, it most closely feels like:',
    options: [
      { label: 'Physical relaxation and calm — muscles releasing, breath slowing.', state: 'G' },
      { label: 'A gentle, luminous stillness with soft imagery at the edges of awareness.', state: 'S' },
      { label: 'A vast, open silence in which thoughts arise and dissolve without pulling you in.', state: 'C' },
      { label: 'An effortless dissolving of the boundary between inside and outside.', state: 'N' },
    ],
  },
  {
    id: 4,
    text: 'When strong emotions arise during practice, your most common experience is:',
    options: [
      { label: 'Noticing them as bodily feelings — tension, heat, tightness, or fluttering.', state: 'G' },
      { label: 'Sensing them as subtle energetic or textural shifts beneath the surface.', state: 'S' },
      { label: 'Observing them from a stable background awareness without being absorbed.', state: 'C' },
      { label: 'Finding that the emotion and the one who notices it are part of the same seamless field.', state: 'N' },
    ],
  },
  {
    id: 5,
    text: 'The quality of your concentration during practice is most often:',
    options: [
      { label: 'Grounded and steady, anchored in the body or breath.', state: 'G' },
      { label: 'Absorbed — you sometimes lose track of external sounds or the passage of time.', state: 'S' },
      { label: 'Spacious and non-grasping — attention is present but does not cling to objects.', state: 'C' },
      { label: 'Boundary-free — subject and object feel continuous rather than separate.', state: 'N' },
    ],
  },
  {
    id: 6,
    text: 'After a practice session, you most frequently notice:',
    options: [
      { label: 'A sense of physical refreshment and grounded, embodied presence.', state: 'G' },
      { label: 'A lingering softness or luminous quality in ordinary perception.', state: 'S' },
      { label: 'An abiding sense of witnessing stillness that persists for some time.', state: 'C' },
      { label: 'A gentle dissolution of the sense that ordinary experience is solid or self-enclosed.', state: 'N' },
    ],
  },
  {
    id: 7,
    text: 'When you close your eyes at the start of a sitting, you most typically notice:',
    options: [
      { label: "The body's weight, temperature, and breath rhythm.", state: 'G' },
      { label: 'A subtle inner landscape of colours, patterns, or gentle imagery.', state: 'S' },
      { label: 'A shift into an open, background awareness — like stepping back from the front of the stage.', state: 'C' },
      { label: 'Immediate spaciousness — a sense that the observer and the observed are not separate.', state: 'N' },
    ],
  },
  {
    id: 8,
    text: 'During longer or deeper practice sessions, the experience of time feels:',
    options: [
      { label: 'Normal — you remain aware of time passing in the ordinary way.', state: 'G' },
      { label: 'Expanded or distorted — time seems to slow or become fluid.', state: 'S' },
      { label: 'Irrelevant — you are aware, but time does not register as particularly meaningful.', state: 'C' },
      { label: 'Absent — ordinary time-tracking dissolves completely.', state: 'N' },
    ],
  },
  {
    id: 9,
    text: 'The most accurate description of your sense of "self" during practice is:',
    options: [
      { label: 'Stable — "I am here, meditating." The sense of self is ordinary and continuous.', state: 'G' },
      { label: 'Absorbed — the self is temporarily forgotten in the quality of the experience.', state: 'S' },
      { label: 'Thinned — awareness remains, but the "I" is no longer foregrounded.', state: 'C' },
      { label: 'Absent or transparent — what remains is awareness itself, with no separate observer.', state: 'N' },
    ],
  },
  {
    id: 10,
    text: 'When an unexpected sound occurs during practice, you most often:',
    options: [
      { label: 'Note it, possibly react briefly, then return to the physical anchor.', state: 'G' },
      { label: 'Feel it subtly ripple through an inner energetic field before settling.', state: 'S' },
      { label: 'Remain in a witnessing position — the sound arises and dissolves within awareness.', state: 'C' },
      { label: 'Experience it as part of an undivided field — no sense of something interrupting a separate self.', state: 'N' },
    ],
  },
  {
    id: 11,
    text: 'The practice format that most reliably supports your deepest access is:',
    options: [
      { label: 'Consistent short sits with strong body or breath anchors.', state: 'G' },
      { label: 'Extended sits, Yoga Nidra, or hypnagogic threshold practices.', state: 'S' },
      { label: 'Open awareness, self-inquiry, or noting practices.', state: 'C' },
      { label: 'Pointing-out instruction, koan, or non-dual inquiry.', state: 'N' },
    ],
  },
  {
    id: 12,
    text: 'Which statement best describes your overall relationship to contemplative states?',
    options: [
      { label: 'I am building a consistent foundation — regular practice with physical anchors.', state: 'G' },
      { label: 'I regularly access absorbed or luminous states and want to understand them better.', state: 'S' },
      { label: 'I have tasted a stable witnessing quality and want to deepen and integrate it.', state: 'C' },
      { label: 'I have experienced glimpses of subject-object dissolution and am learning to work with them.', state: 'N' },
    ],
  },
];

// ─── Result profiles ──────────────────────────────────────────────────────────

const PROFILES = {
  G: {
    title: 'Gross State Explorer',
    emoji: '🌍',
    interpretation:
      'Your practice is primarily anchored in ordinary waking awareness — body, breath, and sensorimotor reality. This is a valuable and necessary foundation. Stable gross-state awareness supports safe entry into subtler dimensions of experience. Your next developmental edge is cultivating sensitivity to the subtle layers available beneath ordinary waking perception.',
    module: { label: 'Subtle State Access', to: '/docs/modules/subtle-state-access' },
    secondary: { label: 'Gross State Awareness', to: '/docs/modules/gross-state-awareness' },
  },
  S: {
    title: 'Subtle State Practitioner',
    emoji: '✨',
    interpretation:
      'You are regularly accessing the subtle state spectrum — inner luminosity, flowing energy, absorbed concentration, or dream-like imagery. This indicates meaningful depth of practice. Your next developmental edge is stabilizing the background witnessing awareness that persists even when subtle phenomena are vivid.',
    module: { label: 'Causal-Witness State', to: '/docs/modules/causal-witness-state' },
    secondary: { label: 'Subtle State Access', to: '/docs/modules/subtle-state-access' },
  },
  C: {
    title: 'Witnessing Practitioner',
    emoji: '👁️',
    interpretation:
      'You are consistently accessing causal or witnessing awareness — a stable, spacious background from which thoughts and feelings are observed without identification. This represents significant depth in contemplative development. Your next edge is exploring whether the witness itself can be released into seamless, nondual presence.',
    module: { label: 'Nondual Awareness Orientation', to: '/docs/modules/nondual-awareness-orientation' },
    secondary: { label: 'Causal-Witness State', to: '/docs/modules/causal-witness-state' },
  },
  N: {
    title: 'Nondual Glimpse Practitioner',
    emoji: '🌌',
    interpretation:
      'Your practice descriptions suggest regular access to nondual glimpses — moments in which the ordinary sense of a separate observer softens or dissolves. These are meaningful experiences. The developmental emphasis now is on integration: making glimpses more accessible, grounding them in ethical life, and relating them to your centre of gravity across the full AQAL spectrum.',
    module: { label: 'Nondual Awareness Orientation', to: '/docs/modules/nondual-awareness-orientation' },
    secondary: { label: 'State Development QuickStart', to: '/docs/quickstarts/state-development' },
  },
  TIE: {
    title: 'Balanced State Explorer',
    emoji: '⚖️',
    interpretation:
      'Your responses suggest roughly equal access across multiple state categories. This may reflect genuine breadth of experience, or it may indicate that your access is still stabilising. Focus on whichever state feels most consistent in practice, ground it further, and then build from that stable base.',
    module: { label: 'State Development QuickStart', to: '/docs/quickstarts/state-development' },
    secondary: { label: 'Gross State Awareness', to: '/docs/modules/gross-state-awareness' },
  },
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function tally(answers) {
  const counts = { G: 0, S: 0, C: 0, N: 0 };
  for (const state of Object.values(answers)) {
    counts[state] += 1;
  }
  const max = Math.max(...Object.values(counts));
  const winners = Object.keys(counts).filter((k) => counts[k] === max);
  if (winners.length > 1) return 'TIE';
  return winners[0];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StateAssessment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;
  const allAnswered = answered === total;

  function handleSelect(questionId, state) {
    setAnswers((prev) => ({ ...prev, [questionId]: state }));
  }

  function handleSubmit() {
    if (allAnswered) setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  const dominantKey = submitted ? tally(answers) : null;
  const profile = dominantKey ? PROFILES[dominantKey] : null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.disclaimer}>
        <strong>⚠️ Disclaimer:</strong> This is a self-reflection tool, not a clinical instrument. It is designed to support contemplative self-inquiry and cannot diagnose, treat, or assess any clinical condition. If you are experiencing psychological distress, please consult a qualified mental health professional.
      </div>

      {!submitted && (
        <>
          <p>
            Answer each question based on your actual recent practice experience — not on how you hope to experience practice or what you think the "correct" answer might be. There are no right or wrong responses.
          </p>

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
            <div key={q.id} className={styles.questionBlock}>
              <div className={styles.questionText}>
                {q.id}. {q.text}
              </div>
              {q.options.map((opt, idx) => (
                <label key={idx} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt.state}
                    checked={answers[q.id] === opt.state}
                    onChange={() => handleSelect(q.id, opt.state)}
                    className={styles.optionInput}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          ))}

          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!allAnswered}
            aria-disabled={!allAnswered}
          >
            View My State Profile
          </button>
        </>
      )}

      {submitted && profile && (
        <div className={styles.resultBox} role="region" aria-label="Assessment result">
          <h3 className={styles.resultTitle}>
            {profile.emoji} Your Dominant State Profile: {profile.title}
          </h3>
          <p>{profile.interpretation}</p>
          <p>
            <strong>Recommended next step:</strong>
          </p>
          <div className={styles.moduleLinks}>
            <Link to={profile.module.to} className={styles.moduleLink}>
              → {profile.module.label}
            </Link>
            <Link to={profile.secondary.to} className={styles.moduleLinkSecondary}>
              {profile.secondary.label}
            </Link>
          </div>
          <div className={styles.resultActions}>
            <button className={styles.submitBtn} onClick={handleReset}>
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
