import React, { useState, useEffect, useCallback } from 'react';

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
  const [entries, setEntries] = useState({});
  const [lastSaved, setLastSaved] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('__iel_test__', '1');
      localStorage.removeItem('__iel_test__');
    } catch {
      setIsAvailable(false);
      return;
    }
    try {
      const raw = localStorage.getItem('iel_reflections_v1');
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  function saveReflections(data) {
    try {
      localStorage.setItem('iel_reflections_v1', JSON.stringify(data));
    } catch {}
  }

  const updateField = useCallback((field, value) => {
    setEntries((prev) => {
      const next = { ...prev, [field]: value, _lastUpdated: new Date().toISOString() };
      saveReflections(next);
      setLastSaved(new Date());
      return next;
    });
  }, []);

  if (!isAvailable) {
    return (
      <div className="alert alert--warning" role="alert">
        <strong>Private browsing detected.</strong> Your reflections will not be saved. Switch to normal browsing mode to persist your entries.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '1rem 0' }}>
      <Section label="What happened?" field="happened" value={entries.happened || ''} onChange={updateField} placeholder="Describe 1–3 significant events, interactions, or moments from today." />
      <Section label="What did I feel?" field="felt" value={entries.felt || ''} onChange={updateField} placeholder="Use specific emotion words (avoid 'good/bad/stressed'). Aim for 3+ distinct emotions." />
      <Section label="What did I think?" field="thought" value={entries.thought || ''} onChange={updateField} placeholder="What patterns of thought were most active? Any biases noticed?" />
      <Section label="What did I do?" field="did" value={entries.did || ''} onChange={updateField} placeholder="What actions did you take? Any reactive or consciously chosen behaviors?" />
      <Section label="What did I learn?" field="learned" value={entries.learned || ''} onChange={updateField} placeholder="One insight, realization, or shift in perspective from today." />
      <Section label="Tomorrow's Intention" field="intention" value={entries.intention || ''} onChange={updateField} placeholder="One small, concrete action to embody what you learned today." />
      {lastSaved && (
        <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '0.5rem' }}>
          Last saved: {lastSaved.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}