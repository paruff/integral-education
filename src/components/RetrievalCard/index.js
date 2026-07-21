import React, { useState } from 'react';
import styles from './styles.module.css';

export default function RetrievalCard({ question, answer, cardNumber, totalCards, onComplete }) {
  const [revealed, setRevealed] = useState(false);
  const [outcome, setOutcome] = useState(null); // 'remembered' | 'needs-review'

  function handleReveal() {
    setRevealed(true);
  }

  function handleOutcome(result) {
    setOutcome(result);
    if (onComplete) onComplete(result);
  }

  return (
    <div className={styles.card} role="region" aria-label={`Card ${cardNumber} of ${totalCards}`}>
      <div className={styles.progress}>
        Card {cardNumber} of {totalCards}
      </div>

      <div className={styles.question}>
        <span className={styles.label}>Q:</span> {question}
      </div>

      {!revealed && (
        <button
          className={styles.revealBtn}
          onClick={handleReveal}
          aria-label="Show answer"
        >
          Show Answer ↓
        </button>
      )}

      {revealed && !outcome && (
        <>
          <div className={styles.answer}>
            <span className={styles.label}>A:</span> {answer}
          </div>
          <div className={styles.actions}>
            <button
              className={styles.rememberedBtn}
              onClick={() => handleOutcome('remembered')}
              aria-label="I remembered this"
            >
              I remembered
            </button>
            <button
              className={styles.reviewBtn}
              onClick={() => handleOutcome('needs-review')}
              aria-label="Need to review this"
            >
              Need to review
            </button>
          </div>
        </>
      )}

      {outcome && (
        <div className={outcome === 'remembered' ? styles.correctBadge : styles.reviewBadge}>
          {outcome === 'remembered' ? '✓ Remembered' : '↻ Marked for review'}
        </div>
      )}
    </div>
  );
}
