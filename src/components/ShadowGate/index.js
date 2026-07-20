import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import CrisisResourceBanner from '@site/src/components/CrisisResourceBanner';
import styles from './styles.module.css';

const STORAGE_KEY = 'shadow-gate-acknowledged';

/**
 * ShadowGate — Tier 1 entry gate for shadow work modules.
 *
 * Renders a pre-module consent and readiness check. Uses sessionStorage
 * so the gate does not re-fire on page reload within a browser session.
 *
 * Blocks entry when:
 *   - Self-reported distress ≥ 7 (show grounding + crisis banner)
 *   - Any contraindication checked (show "not suitable" message)
 */
export default function ShadowGate({ children }) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [blockReason, setBlockReason] = useState(null); // 'distress' | 'contraindication'
  const [distress, setDistress] = useState(null);
  const [contraindications, setContraindications] = useState({
    trauma: false,
    ptsd: false,
    crisis: false,
  });
  const [mindfulnessDone, setMindfulnessDone] = useState(false);
  const [override, setOverride] = useState(false);

  // On mount: check sessionStorage for prior acknowledgment
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
        setAcknowledged(true);
      }
    } catch {
      // sessionStorage unavailable (rare) — show gate
    }
  }, []);

  const hasContraindication =
    contraindications.trauma || contraindications.ptsd || contraindications.crisis;

  const handleProceed = () => {
    const dist = parseInt(distress, 10);

    if (dist >= 7) {
      setBlocked(true);
      setBlockReason('distress');
      return;
    }

    if (hasContraindication) {
      setBlocked(true);
      setBlockReason('contraindication');
      return;
    }

    // Gate passes
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // sessionStorage unavailable — gate will re-fire on reload (acceptable)
    }
    setAcknowledged(true);
  };

  const handleDistressChange = (value) => {
    setDistress(value);
  };

  const handleContraindicationChange = (key) => {
    setContraindications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOverrideProceed = () => {
    setOverride(true);
  };

  // ── Gate already passed ──────────────────────────────────────────────────
  if (acknowledged || override) {
    return <>{children}</>;
  }

  // ── Blocked: distress ≥ 7 ────────────────────────────────────────────────
  if (blocked && blockReason === 'distress') {
    return (
      <div className={styles.gate}>
        <h2 className={styles.heading}>Take a moment to ground</h2>
        <p>
          Your current distress level is high. We strongly recommend grounding
          before beginning shadow work, which can intensify distress when
          you're already activated.
        </p>
        <div className={styles.groundingBox}>
          <strong>Grounding practice</strong>
          <ul>
            <li>Place both feet flat on the floor</li>
            <li>Take several slow, natural breaths at whatever pace feels settling</li>
            <li>Name five things you can see in the room</li>
          </ul>
        </div>
        <CrisisResourceBanner />
        <div className={styles.actions}>
          <button
            className={styles.secondaryButton}
            onClick={handleOverrideProceed}
          >
            I've grounded and still want to proceed
          </button>
          <Link className={styles.secondaryLink} to="/docs/safety/crisis-resources">
            Return to safety resources
          </Link>
        </div>
      </div>
    );
  }

  // ── Blocked: contraindication ────────────────────────────────────────────
  if (blocked && blockReason === 'contraindication') {
    return (
      <div className={styles.gate}>
        <h2 className={styles.heading}>This practice is not suitable right now</h2>
        <p>
          Shadow work can intensify distress when you're already in a vulnerable
          state. Based on what you've shared, this may not be the right moment
          for this material.
        </p>
        <p>Consider these alternatives:</p>
        <ul>
          <li>
            <Link to="/docs/modules/mindfulness-basics">
              Mindfulness Basics →
            </Link>{' '}
            — a gentler starting point for self-regulation
          </li>
          <li>
            <Link to="/docs/safety/crisis-resources">
              Crisis resources →
            </Link>{' '}
            — free, confidential support available now
          </li>
        </ul>
        <p>Return to this module when you feel more settled.</p>
        <div className={styles.actions}>
          <Link className={styles.secondaryLink} to="/docs/intro">
            Return to module list
          </Link>
        </div>
      </div>
    );
  }

  // ── Gate: consent + readiness check ──────────────────────────────────────
  return (
    <div className={styles.gate} role="dialog" aria-label="Module entry check">
      <h2 className={styles.heading}>Before you begin</h2>

      {/* Consent */}
      <div className={styles.section}>
        <p className={styles.consent}>
          This module involves shadow work — practices that explore aspects of
          your experience you may not usually pay direct attention to. You may
          pause or stop at any time. This is educational material, not therapy.
        </p>
      </div>

      {/* Mindfulness Basics */}
      <div className={styles.section}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={mindfulnessDone}
            onChange={(e) => setMindfulnessDone(e.target.checked)}
          />
          <span>
            I have completed or attempted{' '}
            <Link to="/docs/modules/mindfulness-basics">Mindfulness Basics</Link>
          </span>
        </label>
      </div>

      {/* Contraindications */}
      <div className={styles.section}>
        <p className={styles.label}>Check any that apply to you right now:</p>
        {[
          { key: 'trauma', label: 'I am experiencing an acute trauma response' },
          { key: 'ptsd', label: 'I have active PTSD and am not currently working with a professional' },
          { key: 'crisis', label: 'I am in a current crisis state' },
        ].map(({ key, label }) => (
          <label key={key} className={styles.checkbox}>
            <input
              type="checkbox"
              checked={contraindications[key]}
              onChange={() => handleContraindicationChange(key)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* Distress */}
      <div className={styles.section}>
        <p className={styles.label}>
          Current distress level (1 = calm, 10 = highest distress):
        </p>
        <div className={styles.distressRow}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <label key={n} className={styles.radioLabel}>
              <input
                type="radio"
                name="distress"
                value={n}
                checked={distress === String(n)}
                onChange={() => handleDistressChange(String(n))}
              />
              <span className={n >= 7 ? styles.distressHigh : ''}>{n}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Proceed */}
      <button className={styles.primaryButton} onClick={handleProceed}>
        I'm ready to proceed →
      </button>
    </div>
  );
}