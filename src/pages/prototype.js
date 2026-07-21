import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './prototype.module.css';

const pathways = [
  {
    id: 'integral-foundations',
    title: 'Pathway A: Integral Foundations',
    weeks: 4,
    focus: 'AQAL literacy, systems perspective, transfer'
  },
  {
    id: 'shadow-foundations',
    title: 'Pathway B: Shadow Foundations',
    weeks: 4,
    focus: 'Low-risk shadow integration with safety scaffolds'
  }
];

const readinessLevels = ['New to Integral', 'Some Experience', 'Facilitator Track'];

const practiceSteps = [
  'Consent and readiness check',
  'Practice briefing and contraindications',
  'Timed practice (3-10 min)',
  'Grounding and de-escalation options',
  'Reflection capture and retrieval prompt'
];

function scoreLabel(score) {
  if (score < 2) return 'Emerging';
  if (score < 3.5) return 'Developing';
  if (score < 4.5) return 'Proficient';
  return 'Advanced';
}

export default function PrototypePage() {
  const [selectedPathway, setSelectedPathway] = useState(pathways[0].id);
  const [readiness, setReadiness] = useState(readinessLevels[0]);
  const [aqalScore, setAqalScore] = useState(3);
  const [evidenceScore, setEvidenceScore] = useState(3);
  const [transferScore, setTransferScore] = useState(3);
  const [safetyAck, setSafetyAck] = useState(false);

  const selected = useMemo(
    () => pathways.find((p) => p.id === selectedPathway) || pathways[0],
    [selectedPathway]
  );

  const avg = ((aqalScore + evidenceScore + transferScore) / 3).toFixed(2);

  return (
    <Layout
      title="Try a Practice Session"
      description="Explore how a guided learning practice works, choose a path, and see how your progress is tracked.">
      <main className={styles.wrapper}>
        <section className={styles.hero}>
          <h1>Try a Practice Session</h1>
          <p>
            Choose a learning path, step through a guided practice, and see how
            your progress is tracked.
          </p>
        </section>

        <div className={styles.callout}>
          <strong>This is a demo — not a full session.</strong>
          <br />
          Explore how a guided practice works before you begin. No progress is saved.
        </div>

        <section className={styles.grid}>
          <article className={styles.card}>
            <h2>Choose Your Path</h2>
            <label htmlFor="pathway">Pathway</label>
            <select
              id="pathway"
              value={selectedPathway}
              onChange={(e) => setSelectedPathway(e.target.value)}>
              {pathways.map((pathway) => (
                <option key={pathway.id} value={pathway.id}>
                  {pathway.title}
                </option>
              ))}
            </select>

            <label htmlFor="readiness">Readiness</label>
            <select
              id="readiness"
              value={readiness}
              onChange={(e) => setReadiness(e.target.value)}>
              {readinessLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <div className={styles.infoBox}>
              <strong>{selected.title}</strong>
              <p>{selected.focus}</p>
              <p>Planned length: {selected.weeks} weeks</p>
            </div>
          </article>

          <article className={styles.card}>
            <h2>Begin Your Practice</h2>
            <ol className={styles.stepList}>
              {practiceSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={safetyAck}
                onChange={(e) => setSafetyAck(e.target.checked)}
                aria-label="I have read the consent language and stop rules"
              />
              I have read consent language and stop rules.
            </label>
            <div aria-live="polite" aria-atomic="true" className={styles.note}>
              {safetyAck
                ? 'Safety gate passed: practice can proceed.'
                : 'Safety gate pending: review consent and safety instructions before practice.'}
            </div>
          </article>

          <article className={styles.card}>
            <h2>How Review Works</h2>
            <ul className={styles.retrievalList}>
              <li>24h: 5-question mixed recall check</li>
              <li>72h: short scenario application prompt</li>
              <li>7d: reflective transfer task</li>
            </ul>
            <p>
              Interleaving progression: <strong>AABBCC</strong> in early modules,
              then <strong>ABCABC</strong> for advanced transfer.
            </p>
          </article>

          <article className={styles.card}>
            <h2>How You Are Assessed</h2>
            <div className={styles.sliderGroup}>
              <label id="aqalLabel">AQAL completeness</label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={aqalScore}
                onChange={(e) => setAqalScore(Number(e.target.value))}
                aria-labelledby="aqalLabel"
                aria-valuetext={`${aqalScore} out of 5`}
              />
            </div>
            <div className={styles.sliderGroup}>
              <label id="evidenceLabel">Evidence quality</label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={evidenceScore}
                onChange={(e) => setEvidenceScore(Number(e.target.value))}
                aria-labelledby="evidenceLabel"
                aria-valuetext={`${evidenceScore} out of 5`}
              />
            </div>
            <div className={styles.sliderGroup}>
              <label id="transferLabel">Transfer feasibility</label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={transferScore}
                onChange={(e) => setTransferScore(Number(e.target.value))}
                aria-labelledby="transferLabel"
                aria-valuetext={`${transferScore} out of 5`}
              />
            </div>
            <div className={styles.infoBox}>
              <p>Average score: <strong>{avg}</strong></p>
              <p>Band: <strong>{scoreLabel(Number(avg))}</strong></p>
            </div>
          </article>
        </section>

        <details className={styles.links}>
          <summary><strong>Implementation Docs (for developers)</strong></summary>
          <ul>
            <li><Link to="/internal/implementation/backlog">Backlog</Link></li>
            <li><Link to="/docs/maps/aqal-competency-map">AQAL Competency Map</Link></li>
            <li><Link to="/docs/maps/ilp-practice-taxonomy">ILP Practice Taxonomy</Link></li>
            <li><Link to="/internal/quality/evidence-vetting-checklist">Evidence Checklist</Link></li>
            <li><Link to="/internal/safety/shadowwork-safety-standard">Shadowwork Safety Standard</Link></li>
            <li><Link to="/internal/pilots/pilot-runbook-20-40">Pilot Runbook</Link></li>
          </ul>
        </details>
      </main>
    </Layout>
  );
}
