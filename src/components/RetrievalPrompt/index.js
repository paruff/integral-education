import React, { useState, useCallback } from 'react';
import RetrievalCard from '@site/src/components/RetrievalCard';
import Link from '@docusaurus/Link';
import useProgress from '@site/src/hooks/useProgress';
import { slugifyModuleName } from '@site/src/utils/retrieval';
import styles from './styles.module.css';

function formatDueDate(isoDateString) {
  return new Date(isoDateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function RetrievalPrompt({ moduleName, moduleId, cards = [] }) {
  const { data, recordRetrievalReview } = useProgress();
  const resolvedModuleId = moduleId || slugifyModuleName(moduleName);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState([]);

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

  // Persist the spaced-retrieval schedule once the review finishes.
  React.useEffect(() => {
    if (completed) {
      recordRetrievalReview(resolvedModuleId, moduleName);
    }
    // Only fire once, right when `completed` flips true.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  if (!cards.length) {
    return null;
  }

  if (completed) {
    const scheduleEntry = data.retrievalSchedule?.[resolvedModuleId];

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
          <h3>Next Review</h3>
          {scheduleEntry?.complete ? (
            <p>You've completed the full review sequence for this module — nice work, this one's consolidated.</p>
          ) : scheduleEntry?.nextDueDate ? (
            <p>
              Come back on <strong>{formatDueDate(scheduleEntry.nextDueDate)}</strong> for your next
              review. You'll find it listed under "Due for review" on your{' '}
              <Link to="/my-progress">progress page</Link>.
            </p>
          ) : (
            <p>Your next review date will be scheduled automatically.</p>
          )}
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
