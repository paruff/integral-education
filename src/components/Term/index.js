import React from 'react';
import styles from './styles.module.css';

/**
 * Term component — renders a term with a CSS-only tooltip showing its definition.
 *
 * Props:
 *   term        (string) — the term text to display
 *   definition  (string) — the definition shown in the tooltip
 *
 * Behaviour:
 *   - Desktop: tooltip appears on hover over the term
 *   - Keyboard: tooltip appears when the term receives focus (Tab)
 *   - Mobile: tooltip appears on tap (click)
 *   - Pure CSS: no JS-driven visibility, uses :hover and :focus-within
 *
 * Usage in .mdx:
 *   import Term from '@site/src/components/Term';
 *   <Term term="AQAL" definition="All Quadrants, All Levels..." />
 *
 * Usage in .md (via MDX import):
 *   import Term from '@site/src/components/Term';
 */
export default function Term({ term, definition }) {
  return (
    <span className={styles.wrapper} tabIndex={0} role="note" aria-label={`${term}: ${definition}`}>
      <span className={styles.term}>{term}</span>
      <span className={styles.tooltip} role="tooltip">{definition}</span>
    </span>
  );
}
