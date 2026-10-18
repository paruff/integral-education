import React, { useState } from 'react';
import styles from './styles.module.css';

// Calibration (FR-10): the learner writes an attempt, then sees the model
// answer (and criteria, if given) next to it before rating themselves.
// Learners overrate answers they can't compare against (Dunlosky & Rawson, 2012).

// stage: 'question' | 'revealed' | 'rated'
export function RetrievalCardView({
  question,
  answer,
  criteria,
  cardNumber,
  totalCards,
  stage,
  attempt = '',
  outcome,
  onAttemptChange,
  onReveal,
  onOutcome,
}) {
  const attemptId = `retrieval-attempt-${cardNumber}`;

  return (
    <div className={styles.card} role="region" aria-label={`Card ${cardNumber} of ${totalCards}`}>
      <div className={styles.progress}>
        Card {cardNumber} of {totalCards}
      </div>

      <div className={styles.question}>
        <span className={styles.label}>Q:</span> {question}
      </div>

      {stage === 'question' && (
        <>
          <label htmlFor={attemptId} className={styles.attemptLabel}>
            Write your answer from memory (optional, but it makes the comparison honest)
          </label>
          <textarea
            id={attemptId}
            className={styles.attempt}
            rows={3}
            value={attempt}
            onChange={(e) => onAttemptChange?.(e.target.value)}
          />
          <button className={styles.revealBtn} onClick={onReveal}>
            Show model answer ↓
          </button>
        </>
      )}

      {stage === 'revealed' && (
        <>
          {attempt.trim() && (
            <div className={styles.yourAnswer}>
              <span className={styles.label}>Your answer:</span> {attempt}
            </div>
          )}
          <div className={styles.answer}>
            <span className={styles.label}>Model answer:</span> {answer}
          </div>
          {criteria?.length > 0 && (
            <div className={styles.criteria}>
              <span className={styles.label}>A full answer:</span>
              <ul>
                {criteria.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
          <p className={styles.compareHint}>
            Compare before you rate. Count it as remembered only if your answer has the key points
            of the model answer, not just the gist.
          </p>
          <div className={styles.actions}>
            <button className={styles.rememberedBtn} onClick={() => onOutcome?.('remembered')}>
              I remembered
            </button>
            <button className={styles.reviewBtn} onClick={() => onOutcome?.('needs-review')}>
              Need to review
            </button>
          </div>
        </>
      )}

      {stage === 'rated' && (
        <div className={outcome === 'remembered' ? styles.correctBadge : styles.reviewBadge}>
          {outcome === 'remembered' ? '✓ Remembered' : '↻ Marked for review'}
        </div>
      )}
    </div>
  );
}

export default function RetrievalCard({ onComplete, ...props }) {
  const [revealed, setRevealed] = useState(false);
  const [attempt, setAttempt] = useState('');
  const [outcome, setOutcome] = useState(null); // 'remembered' | 'needs-review'

  function handleOutcome(result) {
    setOutcome(result);
    if (onComplete) onComplete(result);
  }

  const stage = outcome ? 'rated' : revealed ? 'revealed' : 'question';

  return (
    <RetrievalCardView
      {...props}
      stage={stage}
      attempt={attempt}
      outcome={outcome}
      onAttemptChange={setAttempt}
      onReveal={() => setRevealed(true)}
      onOutcome={handleOutcome}
    />
  );
}
