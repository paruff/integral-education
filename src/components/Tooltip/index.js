import React, { useState } from 'react';
import styles from './styles.module.css';

export default function Tooltip({ term, definition, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible(!visible)}
      role="tooltip"
      aria-label={`${term}: ${definition}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setVisible(!visible);
        }
      }}
    >
      <span className={styles.term}>{children || term}</span>
      {visible && (
        <span className={styles.tooltip} role="status">
          <span className={styles.tooltipTerm}>{term}</span>
          <span className={styles.tooltipDef}>{definition}</span>
        </span>
      )}
    </span>
  );
}