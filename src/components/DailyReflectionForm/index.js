import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { migrateLegacyData, siteKeys } from '@site/src/utils/learnerData';
import { localDay } from '@site/src/utils/metrics';
import { daysToShow, readDays, setField, toStored } from '@site/src/utils/reflections';

function Section({ label, field, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{label}</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        rows={4}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '0.5rem',
          fontSize: '0.95rem',
          fontFamily: 'inherit',
          lineHeight: '1.5',
          resize: 'vertical',
          backgroundColor: 'var(--ifm-background-color)',
          color: 'var(--ifm-font-color-base)',
        }}
        aria-label={label}
      />
    </div>
  );
}

export default function DailyReflectionForm() {
  const { siteConfig } = useDocusaurusContext();
  const siteId = siteConfig.projectName;
  const keys = useMemo(() => siteKeys(siteId), [siteId]);
  // One entry per local day; the day shown starts as today, so yesterday's writing is never replaced.
  const [days, setDays] = useState({});
  const [day, setDay] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // The server cannot know the learner's date or storage, so both are set after mount.
  useEffect(() => {
    setDay(localDay());
    try {
      localStorage.setItem('__iel_test__', '1');
      localStorage.removeItem('__iel_test__');
    } catch {
      setIsAvailable(false);
      return;
    }
    try {
      migrateLegacyData(localStorage, siteId);
      const raw = localStorage.getItem(keys.reflections);
      if (raw) setDays(readDays(JSON.parse(raw)));
    } catch {}
  }, []);

  // Returns true only if the write worked.
  function saveReflections(next) {
    try {
      localStorage.setItem(keys.reflections, JSON.stringify(toStored(next)));
      return true;
    } catch {
      return false;
    }
  }

  const updateField = useCallback((field, value) => {
    const next = setField(days, day, field, value);
    const ok = saveReflections(next);
    setDays(next);
    setSaveFailed(!ok);
    if (ok) setLastSaved(new Date());
  }, [days, day]);

  if (!isAvailable) {
    return (
      <div className="alert alert--warning" role="alert">
        <strong>Private browsing detected.</strong> Your reflections will not be saved. Switch to normal browsing mode to persist your entries.
      </div>
    );
  }

  if (!day) return null;
  const entries = days[day] || {};
  const choices = daysToShow(days, localDay());

  return (
    <div style={{ maxWidth: '600px', margin: '1rem 0' }}>
      <label style={{ display: 'block', marginBottom: '1rem' }}>
        Entry for{' '}
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {choices.map((d) => (
            <option key={d} value={d}>{d === localDay() ? `${d} (today)` : d}</option>
          ))}
        </select>
      </label>
      <Section label="What happened?" field="happened" value={entries.happened || ''} onChange={updateField} placeholder="Describe 1–3 significant events, interactions, or moments from today." />
      <Section label="What did I feel?" field="felt" value={entries.felt || ''} onChange={updateField} placeholder="Use specific emotion words (avoid 'good/bad/stressed'). Aim for 3+ distinct emotions." />
      <Section label="What did I think?" field="thought" value={entries.thought || ''} onChange={updateField} placeholder="What patterns of thought were most active? Any biases noticed?" />
      <Section label="What did I do?" field="did" value={entries.did || ''} onChange={updateField} placeholder="What actions did you take? Any reactive or consciously chosen behaviors?" />
      <Section label="What did I learn?" field="learned" value={entries.learned || ''} onChange={updateField} placeholder="One insight, realization, or shift in perspective from today." />
      <Section label="Tomorrow's Intention" field="intention" value={entries.intention || ''} onChange={updateField} placeholder="One small, concrete action to embody what you learned today." />
      {saveFailed && (
        <p className="alert alert--danger" role="alert">
          Could not save. Your browser's storage may be full or blocked, so what you just wrote is not stored. Copy it somewhere safe.
        </p>
      )}
      {lastSaved && !saveFailed && (
        <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '0.5rem' }}>
          Last saved: {lastSaved.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}