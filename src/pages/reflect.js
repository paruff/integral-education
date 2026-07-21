import React, { useState, useCallback } from 'react';
import Layout from '@theme/Layout';
import styles from './reflect.module.css';

const PROMPTS = [
  {
    id: 'what-happened',
    label: 'What happened?',
    hint: 'Describe 1–3 significant events, interactions, or moments from today.',
    rows: 5,
  },
  {
    id: 'what-felt',
    label: 'What did I feel?',
    hint: 'Use specific emotion words — avoid "good/bad/stressed". Aim for 3+ distinct emotions.',
    rows: 4,
  },
  {
    id: 'what-thought',
    label: 'What did I think?',
    hint: 'What patterns of thought were most active? Any biases noticed?',
    rows: 4,
  },
  {
    id: 'what-did',
    label: 'What did I do?',
    hint: 'What actions did you take? Any reactive or consciously chosen behaviours?',
    rows: 4,
  },
  {
    id: 'what-learned',
    label: 'What did I learn?',
    hint: 'One insight, realisation, or shift in perspective from today.',
    rows: 3,
  },
  {
    id: 'aqal-tagging',
    label: 'AQAL Tagging',
    hint: 'Quadrants: I / We / It / Its · Lines: cognitive / emotional / somatic / interpersonal / moral / spiritual · Level · State · Type',
    rows: 3,
  },
  {
    id: 'tomorrow-intention',
    label: "Tomorrow's Intention",
    hint: 'One small, concrete action to embody what you learned today.',
    rows: 2,
  },
];

export default function ReflectPage() {
  const [values, setValues] = useState({});
  const [copied, setCopied] = useState(false);

  const handleChange = useCallback((id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleCopy = useCallback(async () => {
    const text = PROMPTS.map((p) => {
      const response = values[p.id] || '';
      return `## ${p.label}\n\n${response || '(not filled in)'}`;
    }).join('\n\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [values]);

  const allFilled = Object.values(values).some((v) => v?.trim());

  return (
    <Layout
      title="Daily Reflection"
      description="Interactive daily reflection — fill in your thoughts, feelings, actions, and insights."
    >
      <main className={styles.wrapper}>
        <div className={styles.noPrint}>
          <h1 className={styles.title}>🪞 Daily Reflection</h1>
          <p>
            Use this template daily to track your growth across all quadrants.
            Your responses stay in this browser tab — nothing is saved or sent anywhere.
          </p>

          <div className={styles.actions}>
            <button
              className={styles.primaryBtn}
              onClick={handleCopy}
              disabled={!allFilled}
              aria-disabled={!allFilled}
            >
              {copied ? '✓ Copied!' : 'Copy to clipboard'}
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => window.print()}
            >
              Print or save as PDF
            </button>
          </div>

          <p className={styles.note}>
            Prefer the static template?{' '}
            <a href="/integral-education/docs/reflections/daily-template">View the original →</a>
          </p>
        </div>

        {PROMPTS.map((prompt) => (
          <section key={prompt.id} className={styles.section}>
            <label htmlFor={prompt.id} className={styles.label}>
              {prompt.label}
            </label>
            <p className={styles.hint}>{prompt.hint}</p>
            <textarea
              id={prompt.id}
              className={styles.textarea}
              rows={prompt.rows}
              value={values[prompt.id] || ''}
              onChange={(e) => handleChange(prompt.id, e.target.value)}
              placeholder="Start typing..."
            />
          </section>
        ))}

        <div className={`${styles.section} ${styles.noPrint}`}>
          <h2 className={styles.label}>Module Progress Tracker</h2>
          <p className={styles.hint}>
            See the full list of available modules — over 60 learning units across
            stage development, developmental lines, shadow work, states, and core skills.
          </p>
          <a href="/integral-education/docs/modules" className={styles.primaryBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
            Browse all modules →
          </a>
        </div>
      </main>
    </Layout>
  );
}
