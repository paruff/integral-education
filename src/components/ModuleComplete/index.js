import React, { useState, useEffect } from 'react';
import useProgress from '@site/src/hooks/useProgress';
import styles from './styles.module.css';

const LEVELS = [1, 2, 3, 4];

const LEVEL_LABELS = {
  1: 'Beginning — I have basic awareness of this topic',
  2: 'Developing — I can apply the core ideas with guidance',
  3: 'Competent — I can apply this independently in real situations',
  4: 'Mastery — I can teach this to others',
};

export default function ModuleComplete({ moduleId, moduleTitle }) {
  const { data, isAvailable, updateModule, getModule } = useProgress();
  const [saved, setSaved] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const moduleData = getModule(moduleId);
  const currentLevel = moduleData?.level || null;
  const isCompleted = moduleData?.completed || false;
  // completedAt is set when the button is pressed; lastVisited changes on every visit, so it is not a completion date.
  const completedDate = moduleData?.completedAt || null;

  useEffect(() => {
    // Mark visited on mount
    updateModule(moduleId, {});
  }, []);

  // "Saved" is only shown when the write worked; otherwise the learner is told it was not stored.
  function save(updates) {
    const ok = updateModule(moduleId, updates);
    setSaveFailed(!ok);
    setSaved(ok);
    if (ok) setTimeout(() => setSaved(false), 2000);
  }

  function handleLevelChange(level) {
    save({ level });
  }

  function handleToggleComplete() {
    save({ completed: !isCompleted, completedAt: isCompleted ? null : new Date().toISOString() });
  }

  if (!isAvailable) {
    return (
      <div className={styles.wrapper} role="region" aria-label="Module progress">
        <p className={styles.unavailable}>
          Progress tracking is unavailable in private browsing mode. Your progress will not be saved.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper} role="region" aria-label="Module progress">
      <h3 className={styles.heading}>Module Progress — {moduleTitle}</h3>

      <div className={styles.levelSection}>
        <p className={styles.levelLabel}>Your current level of understanding:</p>
        <div className={styles.levelRadios}>
          {LEVELS.map((level) => (
            <label key={level} className={styles.levelRadio}>
              <input
                type="radio"
                name={`level-${moduleId}`}
                value={level}
                checked={currentLevel === level}
                onChange={() => handleLevelChange(level)}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                <strong>Level {level}</strong>
                <span className={styles.radioDesc}>{LEVEL_LABELS[level]}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.completeSection}>
        <button
          className={isCompleted ? styles.completedBtn : styles.completeBtn}
          onClick={handleToggleComplete}
          aria-pressed={isCompleted}
        >
          {isCompleted ? '✓ Completed' : 'Mark as Complete'}
        </button>
      </div>

      {saved && <p className={styles.savedNotice}>Progress saved ✓</p>}
      {saveFailed && (
        <p className={styles.unavailable} role="alert">
          Could not save your progress. Your browser's storage may be full or blocked.
        </p>
      )}

      {completedDate && isCompleted && (
        <p className={styles.completedDate}>
          Completed on {new Date(completedDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}