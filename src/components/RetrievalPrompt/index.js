import React, { useState, useCallback } from 'react';
import RetrievalCard from '@site/src/components/RetrievalCard';
import styles from './styles.module.css';

function formatDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function RetrievalPrompt({ moduleName, cards = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const [copied24h, setCopied24h] = useState(false);
  const [copied7d, setCopied7d] = useState(false);

  const totalCards = cards.length;
  const completed = scores.length === totalCards && totalCards > 0;
  const remembered = scores.filter((s) => s === 'remembered').length;

  const handleCardComplete = useCallback(
    (outcome) => {
      setScores((prev) => {
        const next = [...prev, outcome];
        // Advance to next card on next render
        return next;
      });
    },
    []
  );

  // Advance index when scores array grows
  React.useEffect(() => {
    if (scores.length > currentIndex && scores.length < totalCards) {
      setCurrentIndex(scores.length);
    }
  }, [scores.length, currentIndex, totalCards]);

  async function copyText(text, setter) {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setter(true);
      setTimeout(() => setter(false), 2000);
    }
  }

  if (!cards.length) {
    return null;
  }

  if (completed) {
    const date24h = formatDate(1);
    const date7d = formatDate(7);
    const text24h = `Review ${moduleName} — ${date24h}`;
    const text7d = `Review ${moduleName} — ${date7d}`;

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Retrieval Complete</h2>

        <div className={styles.scoreSummary}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreNumber}>{remembered}</span>
            <span className={styles.scoreTotal}>/ {totalCards}</span>
          </div>
          <p className={styles.scoreMessage}>
            {remembered === totalCards
              ? 'Great work — you remembered them all.'
              : `You remembered ${remembered} of ${totalCards} cards. Review the ones you missed later.`}
          </p>
        </div>

        <div className={styles.scheduleSection}>
          <h3>Schedule your follow-up</h3>
          <p>Copy these reminders to your calendar or to-do list. Spaced review is the most effective way to keep what you learned.</p>

          <div className={styles.copyBlock}>
            <code className={styles.copyText}>{text24h}</code>
            <button
              className={styles.copyBtn}
              onClick={() => copyText(text24h, setCopied24h)}
              aria-label={`Copy 24-hour reminder: ${text24h}`}
            >
              {copied24h ? 'Copied ✓' : 'Copy'}
            </button>
          </div>

          <div className={styles.copyBlock}>
            <code className={styles.copyText}>{text7d}</code>
            <button
              className={styles.copyBtn}
              onClick={() => copyText(text7d, setCopied7d)}
              aria-label={`Copy 7-day reminder: ${text7d}`}
            >
              {copied7d ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Retrieval Practice — {moduleName}</h2>

      <RetrievalCard
        key={currentIndex}
        question={currentCard.q}
        answer={currentCard.a}
        cardNumber={currentIndex + 1}
        totalCards={totalCards}
        onComplete={handleCardComplete}
      />
    </div>
  );
}
