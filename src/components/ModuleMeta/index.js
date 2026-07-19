import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

// ─── Difficulty → colour + label ──────────────────────────────────────────────

const DIFFICULTY_CONFIG = {
  Beginner: { colour: '#2e7dce', bg: '#e8f0fe', label: 'Beginner' },
  Intermediate: { colour: '#e37400', bg: '#fef7e0', label: 'Intermediate' },
  Advanced: { colour: '#c5221f', bg: '#fce8e6', label: 'Advanced' },
};

function difficultyLabel(difficulty) {
  return DIFFICULTY_CONFIG[difficulty]?.label ?? difficulty ?? '—';
}

function difficultyColour(difficulty) {
  return DIFFICULTY_CONFIG[difficulty]?.colour ?? '#666';
}

function difficultyBg(difficulty) {
  return DIFFICULTY_CONFIG[difficulty]?.bg ?? '#f0f0f0';
}

// ─── Prerequisite slug → title map ───────────────────────────────────────────
// Minimal map for the most common prerequisites. Build-time static.
// If a prereq slug isn't in this map, it's still rendered as a link.

const KNOWN_MODULES = {
  'amber-mythic-orientation': 'Amber/Mythic Orientation',
  'rational-orange-orientation': 'Rational/Orange Orientation',
  'pluralistic-green-orientation': 'Pluralistic/Green Orientation',
  'integral-teal-orientation': 'Integral/Teal Orientation',
  'mindfulness-basics': 'Mindfulness Basics',
  'shadow-work-foundation': 'Shadow Work Foundation',
  'shadow-integration-101': 'Shadow Integration',
  'cognitive-line-overview-orientation': 'Cognitive Line Overview',
  'emotional-line-overview-orientation': 'Emotional Line Overview',
  'moral-line-overview-dual-track': 'Moral Line Overview',
  'self-line-overview-psychograph': 'Self Line Overview',
  'spiritual-line-overview-orientation': 'Spiritual Line Overview',
  'gross-state-awareness': 'Gross State Awareness',
  'subtle-state-access': 'Subtle State Access',
  'causal-witness-state': 'Causal Witness State',
  'nondual-awareness-orientation': 'Nondual Awareness Orientation',
  'cognitive-bias-101': 'Cognitive Bias Basics',
  'critical-thinking-foundations': 'Critical Thinking Foundations',
  'evidence-evaluation': 'Evidence Evaluation',
  'emotional-granularity': 'Emotional Granularity',
  'emotion-regulation-foundations': 'Emotion Regulation Foundations',
  'systems-thinking-101': 'Systems Thinking 101',
};

function prereqTitle(slug) {
  return KNOWN_MODULES[slug] ?? slug;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ModuleMeta() {
  const { metadata } = useDoc();
  const fm = metadata?.frontMatter ?? {};

  const readingTime = fm.readingTime;
  const practiceTime = fm.practiceTime;
  const difficulty = fm.difficulty;
  const stage = fm.level;           // existing frontmatter field
  const prerequisites = fm.prerequisites;

  // Compute total time
  const totalTime =
    readingTime || practiceTime
      ? (Number(readingTime) || 0) + (Number(practiceTime) || 0)
      : null;

  // Bail if no metadata at all
  if (!readingTime && !practiceTime && !difficulty && !stage && !prerequisites) {
    return null;
  }

  return (
    <div className={styles.metaBar} aria-label="Module metadata">
      {totalTime !== null && (
        <span className={styles.badge} title="Total estimated time">
          <span className={styles.icon}>⏱️</span>
          <span className={styles.label}>Time</span>
          <span className={styles.value}>{totalTime} min</span>
        </span>
      )}

      {difficulty && (
        <span
          className={styles.badge}
          style={{
            '--meta-badge-colour': difficultyColour(difficulty),
            '--meta-badge-bg': difficultyBg(difficulty),
          }}
          title="Difficulty level"
        >
          <span className={styles.icon}>📊</span>
          <span className={styles.label}>Level</span>
          <span className={styles.value}>{difficultyLabel(difficulty)}</span>
        </span>
      )}

      {stage && (
        <span className={styles.badge} title="Developmental stage range">
          <span className={styles.icon}>🧭</span>
          <span className={styles.label}>Stage</span>
          <span className={styles.value}>{stage}</span>
        </span>
      )}

      {prerequisites && prerequisites !== 'None' && (
        <span className={styles.badge} title="Prerequisites">
          <span className={styles.icon}>📋</span>
          <span className={styles.label}>Prerequisites</span>
          <span className={styles.prereqList}>
            {Array.isArray(prerequisites)
              ? prerequisites.map((slug, idx) => (
                  <span key={slug}>
                    {idx > 0 && ', '}
                    <Link to={`/docs/modules/${slug}`} className={styles.prereqLink}>
                      {prereqTitle(slug)}
                    </Link>
                  </span>
                ))
              : prerequisites}
          </span>
        </span>
      )}
    </div>
  );
}
