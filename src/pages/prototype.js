import React, {useState, useMemo} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ShadowGate from '@site/src/components/ShadowGate';
import RetrievalPrompt from '@site/src/components/RetrievalPrompt';
import styles from './prototype.module.css';

const pathways = [
  { id: 'integral-foundations', title: 'Integral Foundations', weeks: 4, focus: 'AQAL literacy, systems perspective' },
  { id: 'shadow-foundations', title: 'Shadow Foundations', weeks: 4, focus: 'Low-risk shadow integration with safety scaffolds' },
];

const readinessLevels = ['New to Integral', 'Some Experience', 'Facilitator Track'];

const SAMPLE_CARDS = [
  { q: 'What is the difference between attention and awareness?', a: 'Attention is focused; awareness is the open space in which experience occurs' },
  { q: 'What is meta-cognition?', a: 'Awareness of your own awareness — observing the observer rather than being caught in thought' },
  { q: 'What is confirmation bias?', a: 'The tendency to seek information that confirms existing beliefs' },
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
  const [gatePassed, setGatePassed] = useState(false);

  const selected = useMemo(
    () => pathways.find((p) => p.id === selectedPathway) || pathways[0],
    [selectedPathway]
  );

  const avg = ((aqalScore + evidenceScore + transferScore) / 3).toFixed(2);

  return (
    <Layout
      title="Interactive Demo"
      description="Step through a guided practice, try the retrieval loop, and see how your progress is tracked.">
      <main className={styles.wrapper}>
        <section className={styles.hero}>
          <h1>Interactive Demo</h1>
          <p>
            This is a live demo of the actual platform components — the consent gate,
            retrieval practice, and progress tracking that every module uses. Choose
            a path, step through a guided practice, and see how learner progress works.
          </p>
        </section>

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
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <div className={styles.infoBox}>
              <strong>{selected.title}</strong>
              <p>{selected.focus}</p>
              <p>Planned length: {selected.weeks} weeks</p>
            </div>

            <p style={{marginTop: '1rem', fontSize: '0.9rem'}}>
              Your pathway: <strong>{readiness} → {selected.title}</strong>. Each
              module in this path builds on the previous one — start with the first
              module and work through in sequence.
            </p>
          </article>

          <article className={styles.card}>
            <h2>Begin Your Practice</h2>

            <ShadowGate>
              <div style={{padding: '1rem 0'}}>
                <h3>Practice unlocked ✓</h3>
                <p>Safety gate passed. Here is your practice flow:</p>
                <ol className={styles.stepList}>
                  <li>Consent and readiness check — completed</li>
                  <li>Practice briefing: 3-minute body scan</li>
                  <li>Timed practice: follow the breath for 3 minutes</li>
                  <li>Grounding: notice your feet on the floor, three slow breaths</li>
                  <li>Reflection: what did you notice during the practice?</li>
                </ol>
                {gatePassed ? (
                  <div className={styles.infoBox}>
                    <strong>✓ Practice completed</strong>
                    <p>In a real module, your progress would now be saved to your dashboard.</p>
                  </div>
                ) : (
                  <button
                    className="button button--primary"
                    onClick={() => setGatePassed(true)}
                    style={{marginTop: '0.5rem'}}>
                    Complete Practice
                  </button>
                )}
              </div>
            </ShadowGate>
          </article>

          <article className={styles.card}>
            <h2>Try the Retrieval Loop</h2>
            <RetrievalPrompt moduleName="Mindfulness Basics" cards={SAMPLE_CARDS} />
          </article>

          <article className={styles.card}>
            <h2>How You Are Assessed</h2>
            <p style={{fontSize: '0.9rem', marginBottom: '1rem'}}>
              Move the sliders to see how your self-assessment maps to a developmental band.
              In real modules, these are replaced by the rubric at the end of each module.
            </p>

            <div className={styles.sliderGroup}>
              <label id="aqalLabel">AQAL completeness</label>
              <input type="range" min="1" max="5" step="0.5" value={aqalScore}
                onChange={(e) => setAqalScore(Number(e.target.value))}
                aria-labelledby="aqalLabel" aria-valuetext={`${aqalScore} out of 5`} />
            </div>
            <div className={styles.sliderGroup}>
              <label id="evidenceLabel">Evidence quality</label>
              <input type="range" min="1" max="5" step="0.5" value={evidenceScore}
                onChange={(e) => setEvidenceScore(Number(e.target.value))}
                aria-labelledby="evidenceLabel" aria-valuetext={`${evidenceScore} out of 5`} />
            </div>
            <div className={styles.sliderGroup}>
              <label id="transferLabel">Transfer feasibility</label>
              <input type="range" min="1" max="5" step="0.5" value={transferScore}
                onChange={(e) => setTransferScore(Number(e.target.value))}
                aria-labelledby="transferLabel" aria-valuetext={`${transferScore} out of 5`} />
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
          </ul>
        </details>
      </main>
    </Layout>
  );
}