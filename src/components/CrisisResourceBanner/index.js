import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * CrisisResourceBanner — persistent, non-intrusive banner displayed at the top
 * of every shadow-adjacent and altered-state module page.
 *
 * Provides a direct link to crisis resources for learners who may become
 * overwhelmed during deep psychological or somatic practice.
 *
 * Styling uses Infima theme variables — no hardcoded colours.
 */
export default function CrisisResourceBanner() {
  return (
    <aside
      className={styles.banner}
      role="complementary"
      aria-label="Crisis resources"
    >
      <span className={styles.icon} aria-hidden="true">⚠️</span>
      <span className={styles.text}>
        If you feel overwhelmed or unsafe, stop the practice.{' '}
        <Link to="/docs/safety/crisis-resources">Crisis resources →</Link>
      </span>
    </aside>
  );
}