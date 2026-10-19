import React, { useState, useEffect } from 'react';
import RetrievalCard from '@site/src/components/RetrievalCard';
import { cardId } from '@site/src/utils/retrieval';

// Runs an interleaved review (cards from interleaveDueCards). Calls
// onComplete(moduleIds, results) once, when the last card is rated; results is
// [{ moduleId, cardId, outcome }] for the FR-19 metrics.
export default function MixedReview({ cards, onComplete }) {
  const [scores, setScores] = useState([]);
  const done = scores.length === cards.length;

  useEffect(() => {
    if (done) {
      onComplete(
        [...new Set(cards.map((c) => c.moduleId))],
        cards.map((c, i) => ({ moduleId: c.moduleId, cardId: cardId(c.q), outcome: scores[i] }))
      );
    }
    // Fire once, when `done` flips true.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) {
    const remembered = scores.filter((s) => s === 'remembered').length;
    return (
      <p role="status">
        You remembered {remembered} of {cards.length}. Your next reviews are scheduled for each
        module you just covered.
      </p>
    );
  }

  const card = cards[scores.length];
  return (
    <RetrievalCard
      key={scores.length}
      question={card.q}
      answer={card.a}
      criteria={card.criteria}
      cardNumber={scores.length + 1}
      totalCards={cards.length}
      onComplete={(outcome) => setScores((prev) => [...prev, outcome])}
    />
  );
}
