import React, { useState } from 'react';
import Link from '@docusaurus/Link';

// ═══════════════════════════════════════════════════════════════════════════════
// Section A: Primary Shadow Pattern (10 scenario-based questions)
// 5 mechanisms × 2 questions each: projection, repression, splitting,
// reaction formation, introjection
// ═══════════════════════════════════════════════════════════════════════════════

const QUESTIONS_A = [
  // ── Projection ──
  {
    id: 'a1',
    mechanism: 'projection',
    traumaAdjacent: false,
    text: 'You find yourself unusually irritated by a colleague\'s behaviour — more than the situation seems to warrant. When you try to articulate what bothers you, the words come easily but feel oddly personal. Your first honest thought is:',
    options: [
      { value: 'p', label: 'They are clearly insecure and overcompensating — it is uncomfortable to watch.' },
      { value: 'o', label: 'Something about them triggers me, but I am not sure what. I should pay attention to that.' },
      { value: 'n', label: 'I am probably just tired or stressed. The irritation is about me, not them.' },
    ],
  },
  {
    id: 'a2',
    mechanism: 'projection',
    traumaAdjacent: false,
    text: 'You admire someone intensely — the way they speak, their confidence, their clarity. When you are around them, you feel smaller. This pattern has happened before with other people. You:',
    options: [
      { value: 'p', label: 'Assume they simply have qualities I lack. Some people are just more gifted.' },
      { value: 'o', label: 'Recognize that intense admiration often signals disowned qualities. What am I seeing in them that I have not claimed in myself?' },
      { value: 'n', label: 'Try not to think about it. Comparison is unhelpful and I should focus on my own path.' },
    ],
  },
  // ── Repression ──
  {
    id: 'a3',
    mechanism: 'repression',
    traumaAdjacent: true,
    text: 'Someone close to you mentions a memory from years ago that involves you — a difficult event you have no recollection of. They describe it in detail. You genuinely do not remember it. You:',
    options: [
      { value: 'p', label: 'Trust your own memory. If you do not remember it, it probably did not happen the way they describe.' },
      { value: 'o', label: 'Feel unsettled. The absence of memory where there should be one is itself information. Something may have been too difficult to hold.' },
      { value: 'n', label: 'Assume they are mistaken or conflating events. Memory is unreliable for everyone.' },
    ],
  },
  {
    id: 'a4',
    mechanism: 'repression',
    traumaAdjacent: true,
    text: 'You notice that you have a strong physical reaction to certain topics — your body tenses, your breathing changes — before you even have a conscious thought about them. You:',
    options: [
      { value: 'p', label: 'Ignore the physical response. The body reacts to many things; it does not mean anything significant.' },
      { value: 'o', label: 'Pay attention. The body often knows something before the mind does. This reaction is data.' },
      { value: 'n', label: 'Try to analyze what triggered it so I can avoid that topic in the future.' },
    ],
  },
  // ── Splitting ──
  {
    id: 'a5',
    mechanism: 'splitting',
    traumaAdjacent: false,
    text: 'A person you respected does something that disappoints you. Your view of them shifts dramatically — from "good person" to "not who I thought they were." You notice the shift happened fast. You:',
    options: [
      { value: 'p', label: 'Trust the revised judgment. People reveal who they really are through their actions.' },
      { value: 'o', label: 'Notice the speed of the shift. Real people are complex — if my view flipped instantly, the original view may have been idealized rather than accurate.' },
      { value: 'n', label: 'Distance myself. If someone disappoints me this deeply, the relationship was probably not what I thought.' },
    ],
  },
  {
    id: 'a6',
    mechanism: 'splitting',
    traumaAdjacent: false,
    text: 'You are part of a group that is in conflict with another group. People in your group describe the other side in uniformly negative terms. No one in your group seems to see anything legitimate in the other position. You:',
    options: [
      { value: 'p', label: 'Agree with your group. The other side\'s position is clearly wrong — that is why the conflict exists.' },
      { value: 'o', label: 'Feel uneasy about the uniformity. Real conflicts almost never have all the legitimacy on one side. We are probably splitting — seeing only bad in them and only good in us.' },
      { value: 'n', label: 'Stay out of it. Group dynamics are not my responsibility to manage.' },
    ],
  },
  // ── Reaction Formation ──
  {
    id: 'a7',
    mechanism: 'reaction-formation',
    traumaAdjacent: false,
    text: 'You find yourself being unusually kind and solicitous toward someone you actually resent. You notice the discrepancy — the behavior does not match the feeling — but you keep doing it. You:',
    options: [
      { value: 'p', label: 'Continue being kind. Whatever I feel privately, my behavior should be decent. Feelings do not need to be expressed.' },
      { value: 'o', label: 'Recognize the pattern. Excessive kindness toward someone I resent may be covering the very feeling I do not want to acknowledge — even to myself.' },
      { value: 'n', label: 'Reduce contact with them. If I resent someone, the healthiest thing is to create distance.' },
    ],
  },
  {
    id: 'a8',
    mechanism: 'reaction-formation',
    traumaAdjacent: false,
    text: 'You have strong opinions about a particular moral issue — so strong that you find yourself thinking about it frequently, posting about it, and feeling intense anger toward people on the other side. A friend gently suggests that the intensity might indicate something personal. You:',
    options: [
      { value: 'p', label: 'Dismiss the suggestion. My position is based on principle, not psychology. The intensity reflects the importance of the issue.' },
      { value: 'o', label: 'Consider it. Strong moral conviction is real — and when it is accompanied by disproportionate emotional charge, it is worth asking what personal material might be entangled with the principle.' },
      { value: 'n', label: 'Feel offended. My friend is minimizing a legitimate moral position by psychologizing it.' },
    ],
  },
  // ── Introjection ──
  {
    id: 'a9',
    mechanism: 'introjection',
    traumaAdjacent: true,
    text: 'You receive criticism from someone whose opinion matters to you. Later, you notice you are saying the same critical things to yourself — in their voice, almost verbatim. The criticism has become your own inner monologue. You:',
    options: [
      { value: 'p', label: 'Accept the criticism as probably accurate. If someone I respect sees this in me, they are likely right.' },
      { value: 'o', label: 'Notice the internalization. The criticism may or may not be valid — but the fact that I have taken it in as my own voice without examination is worth investigating.' },
      { value: 'n', label: 'Try to dismiss it. Ruminating on criticism is unhealthy; I should move on.' },
    ],
  },
  {
    id: 'a10',
    mechanism: 'introjection',
    traumaAdjacent: false,
    text: 'You realize that a belief you have held for years — about what you should want, what success looks like, what matters — actually came from a parent or mentor, not from your own reflection. You:',
    options: [
      { value: 'p', label: 'That is normal. We all inherit values from people who shaped us. It does not make them less authentic.' },
      { value: 'o', label: 'Examine it. Not all inherited values are wrong, but I want to know which of my "shoulds" are actually mine and which I swallowed whole without ever choosing them.' },
      { value: 'n', label: 'Feel destabilized. If this belief is not mine, what else have I been carrying that is not really me?' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section B: Developmental Line Shadow Profile (8 questions)
// ═══════════════════════════════════════════════════════════════════════════════

const QUESTIONS_B = [
  {
    id: 'b1',
    line: 'Emotional',
    text: 'When you experience a strong emotion, which pattern is most familiar to you?',
    options: [
      { value: 'avoid', label: 'I tend to push it down or distract myself until it passes.' },
      { value: 'express', label: 'I express it openly — sometimes more intensely than I intend.' },
      { value: 'analyze', label: 'I analyze why I am feeling it rather than fully experiencing it.' },
      { value: 'body', label: 'I feel it physically but have difficulty naming or articulating it.' },
    ],
  },
  {
    id: 'b2',
    line: 'Interpersonal',
    text: 'In close relationships, which of these causes you the most recurring difficulty?',
    options: [
      { value: 'conflict', label: 'I avoid conflict and let resentments build until they erupt or I withdraw.' },
      { value: 'boundaries', label: 'I struggle to maintain boundaries — I give too much and then feel depleted or resentful.' },
      { value: 'trust', label: 'I have difficulty trusting that people will stay — I expect relationships to end.' },
      { value: 'visibility', label: 'I hide parts of myself and then feel unseen or unknown by people close to me.' },
    ],
  },
  {
    id: 'b3',
    line: 'Cognitive',
    text: 'When your beliefs are challenged, which is most true of your internal experience?',
    options: [
      { value: 'defend', label: 'I defend my position vigorously — being wrong feels threatening.' },
      { value: 'collapse', label: 'I immediately doubt myself and assume the other person must be right.' },
      { value: 'dismiss', label: 'I dismiss challenges that do not fit my existing framework without really examining them.' },
      { value: 'perform', label: 'I perform openness to critique while privately dismissing it — I appear to consider but do not actually reconsider.' },
    ],
  },
  {
    id: 'b4',
    line: 'Moral',
    text: 'When you encounter someone whose moral framework genuinely differs from yours, your strongest reaction is:',
    options: [
      { value: 'judgment', label: 'Moral clarity — I know what is right, and their framework is wrong.' },
      { value: 'superiority', label: 'A quiet sense that my framework is more evolved or sophisticated than theirs.' },
      { value: 'avoidance', label: 'I avoid moral disagreement because it makes me uncomfortable and I do not want to seem judgmental.' },
      { value: 'confusion', label: 'I feel genuinely destabilized — if different frameworks can both feel right, how do I know what to trust?' },
    ],
  },
  {
    id: 'b5',
    line: 'Spiritual',
    text: 'In your spiritual or contemplative life, which of these feels most familiar?',
    options: [
      { value: 'bypass', label: 'I sometimes use spiritual practice or language to avoid difficult emotions or relational conflict.' },
      { value: 'doubt', label: 'I experience persistent doubt about whether my practice is "working" or whether I am doing it right.' },
      { value: 'comparison', label: 'I compare my practice or spiritual development to others and feel I am behind — or ahead.' },
      { value: 'disconnect', label: 'My spiritual life feels separate from my daily life — elevated during practice, absent in ordinary moments.' },
    ],
  },
  {
    id: 'b6',
    line: 'Self',
    text: 'When you think about who you "really" are, beneath roles and relationships, which is closest to your experience?',
    options: [
      { value: 'unknown', label: 'I am not sure there is a stable self beneath the roles — and that thought is unsettling.' },
      { value: 'construction', label: 'I suspect the self I present is largely constructed to meet others\' expectations, but I am not sure what is underneath.' },
      { value: 'fixed', label: 'I have worked hard to become who I am, and challenges to that identity feel like threats.' },
      { value: 'fragmented', label: 'I feel like different people in different contexts, and the inconsistency bothers me.' },
    ],
  },
  {
    id: 'b7',
    line: 'Somatic',
    text: 'Your relationship to your body is best described as:',
    options: [
      { value: 'disconnected', label: 'I live mostly in my head — my body is something I notice when it hurts or when I am exercising.' },
      { value: 'critical', label: 'I am frequently critical of my body — it does not look or perform the way I want it to.' },
      { value: 'ignored', label: 'I ignore my body\'s signals (hunger, fatigue, tension) until they become impossible to ignore.' },
      { value: 'unsafe', label: 'My body does not feel like a safe place to be — I would rather be anywhere else.' },
    ],
  },
  {
    id: 'b8',
    line: 'Shadow',
    text: 'When someone suggests you might have a blind spot — something about yourself you cannot see — your first internal reaction is:',
    options: [
      { value: 'defensive', label: 'Resistance. I do not think they are right, and I feel a need to defend myself.' },
      { value: 'curious', label: 'Curiosity mixed with discomfort. I want to know what they see, even if it is hard to hear.' },
      { value: 'shame', label: 'Shame. The suggestion that I am not fully self-aware feels like a personal failure.' },
      { value: 'dismissive', label: 'I dismiss it. Everyone has blind spots — pointing mine out does not make theirs any less real.' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section C: Spiritual Bypassing Tendencies (12 items, Likert 1–5)
// ═══════════════════════════════════════════════════════════════════════════════

const QUESTIONS_C = [
  { id: 'c1', text: 'When I feel angry or hurt, I try to rise above it rather than feel it fully.' },
  { id: 'c2', text: 'I have used spiritual concepts (oneness, impermanence, non-attachment) to avoid dealing with a difficult relationship.' },
  { id: 'c3', text: 'I believe that if I were more spiritually developed, I would not experience strong negative emotions.' },
  { id: 'c4', text: 'I sometimes feel superior to people who seem "less conscious" or "less evolved" than I am.' },
  { id: 'c5', text: 'When someone shares a problem, I offer spiritual reframing rather than sitting with their actual experience.' },
  { id: 'c6', text: 'I use meditation or contemplative practice to escape from stress rather than engage with its source.' },
  { id: 'c7', text: 'I believe that "everything happens for a reason" — including genuinely harmful events.' },
  { id: 'c8', text: 'I have avoided necessary conflict by telling myself it is "not spiritual" to argue.' },
  { id: 'c9', text: 'I feel I should be grateful for everything, and when I am not, I feel like I am failing spiritually.' },
  { id: 'c10', text: 'I sometimes use the idea of "acceptance" to tolerate situations I should actually change or leave.' },
  { id: 'c11', text: 'I feel uncomfortable when spiritual companions express doubt, anger, or grief — I want to guide them back to "higher" states.' },
  { id: 'c12', text: 'Looking honestly, my spiritual practice has sometimes been a way to feel special or chosen rather than a way to serve.' },
];

const LIKERT_LABELS = {
  1: 'Strongly disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly agree',
};

// ═══════════════════════════════════════════════════════════════════════════════
// Scoring
// ═══════════════════════════════════════════════════════════════════════════════

const MECHANISM_LABELS = {
  projection: 'Projection — seeing in others what you cannot see in yourself',
  repression: 'Repression — pushing difficult material out of conscious awareness',
  splitting: 'Splitting — seeing people or situations as all-good or all-bad',
  'reaction-formation': 'Reaction Formation — expressing the opposite of what you feel',
  introjection: 'Introjection — internalizing others\' voices as your own',
};

const MECHANISM_DESCRIPTIONS = {
  projection: 'Your responses suggest that projection may be a significant shadow mechanism for you. Projection involves seeing in others qualities — usually negative, sometimes positive — that actually belong to you. The irritation you feel toward certain people or the intense admiration you feel for others may be signals pointing inward. The developmental task is not to stop projecting — everyone does — but to learn to recognize projection when it is happening and to ask: what is this telling me about myself?',
  repression: 'Your responses suggest that repression — the automatic pushing of difficult material out of conscious awareness — may be operating significantly in your psychology. This is not a failure; repression is a protective mechanism. Your body may hold what your mind has set aside. The developmental task is to gently build capacity to feel what has been repressed, at a pace that is sustainable, with adequate support.',
  splitting: 'Your responses suggest splitting — seeing people, groups, or situations in black-and-white terms — may be a significant pattern. Splitting protects against the anxiety of ambivalence: it is easier to see someone as all-good or all-bad than to hold the complexity of a real person who is both. The developmental task is to practice holding contradictory qualities in the same person or situation without needing to resolve the tension.',
  'reaction-formation': 'Your responses suggest reaction formation — expressing the opposite of what you unconsciously feel — may be operating. Excessive kindness toward someone you resent, or intense moral conviction that seems disproportionate to the issue, can signal that an unacceptable feeling is being transformed into its opposite. The developmental task is to notice the gap between expressed behavior and underlying feeling, and to allow the feeling into awareness without acting on it impulsively.',
  introjection: 'Your responses suggest introjection — internalizing external voices as your own — may be a significant pattern. The critical inner voice you hear may not be yours. The "shoulds" that organize your life may have been absorbed from parents, mentors, or culture without ever being consciously chosen. The developmental task is to audit your inner voices: which of these are actually mine, and which did I swallow whole?',
};

const LINE_LABELS = {
  Emotional: 'Emotional line — difficulty fully experiencing or regulating emotions without avoidance or overwhelm',
  Interpersonal: 'Interpersonal line — recurring patterns in relationships: boundaries, trust, visibility, conflict',
  Cognitive: 'Cognitive line — defensiveness or rigidity when beliefs are challenged',
  Moral: 'Moral line — discomfort with genuine moral difference; tendency to judge, avoid, or feel destabilized',
  Spiritual: 'Spiritual line — spiritual bypass, doubt, comparison, or disconnection between practice and daily life',
  Self: 'Self line — uncertainty, fragmentation, or defensiveness about who you are beneath roles',
  Somatic: 'Somatic line — disconnection from, criticism of, or disregard for body experience',
  Shadow: 'Shadow awareness — resistance, defensiveness, or shame when blind spots are pointed out',
};

const MODULE_RECOMMENDATIONS = {
  projection: [
    { title: 'Shadow Work Foundation', to: '/docs/modules/shadow-work-foundation' },
    { title: '3-2-1 Shadow Process', to: '/docs/modules/shadow-321-process' },
    { title: 'Shadow in Relationships', to: '/docs/modules/shadow-in-relationships' },
  ],
  repression: [
    { title: 'Shadow Work Foundation', to: '/docs/modules/shadow-work-foundation' },
    { title: 'Immunity to Change (ITC)', to: '/docs/modules/shadow-immunity-to-change' },
    { title: 'Shadow in Relationships', to: '/docs/modules/shadow-in-relationships' },
  ],
  splitting: [
    { title: 'Shadow Work Foundation', to: '/docs/modules/shadow-work-foundation' },
    { title: 'Positive Projection (Golden Shadow)', to: '/docs/modules/shadow-positive-projection' },
    { title: 'Collective & Cultural Shadow', to: '/docs/modules/shadow-collective-cultural' },
  ],
  'reaction-formation': [
    { title: 'Shadow Work Foundation', to: '/docs/modules/shadow-work-foundation' },
    { title: 'Persona & Mask', to: '/docs/modules/shadow-persona-mask' },
    { title: 'Shadow in Relationships', to: '/docs/modules/shadow-in-relationships' },
  ],
  introjection: [
    { title: 'Shadow Work Foundation', to: '/docs/modules/shadow-work-foundation' },
    { title: 'Immunity to Change (ITC)', to: '/docs/modules/shadow-immunity-to-change' },
    { title: 'Persona & Mask', to: '/docs/modules/shadow-persona-mask' },
  ],
};

function analyzeMechanisms(answers) {
  const counts = {};
  Object.values(answers).forEach((val) => {
    const q = QUESTIONS_A.find((q) => q.id === Object.keys(answers).find((k) => answers[k] === val));
    // Reconstruct: find mechanism for each answer
  });
  // Simpler approach: iterate answered questions
  QUESTIONS_A.forEach((q) => {
    const ans = answers[q.id];
    if (!ans) return;
    if (ans === 'p') counts[q.mechanism] = (counts[q.mechanism] || 0) + 1;
    if (ans === 'o') counts[q.mechanism] = (counts[q.mechanism] || 0) + 0.5;
  });
  let dominant = 'projection';
  let max = 0;
  Object.entries(counts).forEach(([k, v]) => { if (v > max) { max = v; dominant = k; } });
  const traumaCount = QUESTIONS_A.filter((q) => q.traumaAdjacent && answers[q.id] === 'p').length;
  return { counts, dominant, traumaCount };
}

function analyzeBypassing(answers) {
  const vals = Object.values(answers).filter((v) => typeof v === 'number');
  if (vals.length === 0) return { average: 0, band: 'low' };
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  const band = avg >= 3.5 ? 'high' : avg >= 2.5 ? 'moderate' : 'low';
  return { average: avg.toFixed(1), band };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════════════

export default function ShadowAssessment() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [answersA, setAnswersA] = useState({});
  const [answersB, setAnswersB] = useState({});
  const [answersC, setAnswersC] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const totalA = Object.keys(answersA).length;
  const totalB = Object.keys(answersB).length;
  const totalC = Object.keys(answersC).length;
  const totalAnswered = totalA + totalB + totalC;
  const totalQuestions = QUESTIONS_A.length + QUESTIONS_B.length + QUESTIONS_C.length;

  function handleCopy() {
    const analysis = submitted ? analyzeMechanisms(answersA) : null;
    const bypass = submitted ? analyzeBypassing(answersC) : null;
    const dominantLine = submitted
      ? QUESTIONS_B.reduce((max, q) => {
          const ans = answersB[q.id];
          // Just pick the first answered as indicative
          return ans ? q.line : max;
        }, 'Self')
      : '';
    const lines = [];
    lines.push('═══ Shadow Work Self-Assessment ═══');
    lines.push(`Date: ${new Date().toLocaleDateString()}`);
    if (analysis) {
      lines.push(`\nPrimary Mechanism: ${MECHANISM_LABELS[analysis.dominant]}`);
    }
    if (bypass) {
      lines.push(`Bypassing Tendency: ${bypass.average}/5 (${bypass.band} band)`);
    }
    lines.push('\n── IMPORTANT ──');
    lines.push('Shadow work involves encountering disowned parts of yourself.');
    lines.push('This tool is a map for self-reflection, not a clinical assessment.');
    navigator.clipboard.writeText(lines.join('\n')).catch(() => {});
    const btn = document.getElementById('sw-copy-btn');
    if (btn) { btn.textContent = '✓ Copied'; setTimeout(() => (btn.textContent = 'Export to Journal'), 2000); }
  }

  const cs = { maxWidth: '700px', margin: '0 auto', fontFamily: 'inherit' };
  const framing = { padding: '2rem', textAlign: 'center', maxWidth: '600px', margin: '4rem auto' };
  const sectionStyle = { border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.75rem', padding: '1rem 1rem 0.5rem', marginBottom: '1.5rem' };
  const stitle = { fontSize: '1.1rem', marginBottom: '0.5rem', paddingBottom: '0.4rem', borderBottom: '2px solid var(--ifm-color-primary)', color: 'var(--ifm-color-primary)' };
  const fieldset = { border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '0.75rem' };
  const legend = { fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', lineHeight: 1.5 };
  const opt = { display: 'block', marginBottom: '0.3rem', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1.5 };

  // ── Ethical framing gate ──
  if (!acknowledged) {
    return (
      <div style={framing}>
        <h2 style={{ color: 'var(--ifm-color-primary)', marginBottom: '1.5rem' }}>Before You Begin</h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          <strong>Shadow work involves encountering disowned parts of yourself.</strong> This tool is a map for self-reflection, not a clinical assessment. If anything activated feels overwhelming, please stop and seek support.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '2rem' }}>
          No data is stored or transmitted. Your responses exist only in this browser session. You can stop at any time.
        </p>
        <button className="button button--primary button--lg" onClick={() => setAcknowledged(true)} style={{ padding: '0.75rem 2rem' }}>
          I understand — begin assessment
        </button>
      </div>
    );
  }

  // ── Results view ──
  if (submitted) {
    const analysis = analyzeMechanisms(answersA);
    const bypass = analyzeBypassing(answersC);
    const recs = MODULE_RECOMMENDATIONS[analysis.dominant] || MODULE_RECOMMENDATIONS.projection;

    return (
      <div style={cs}>
        <div style={{ padding: '1.5rem', background: 'var(--ifm-color-primary-lightest)', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Your Shadow Profile</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{MECHANISM_DESCRIPTIONS[analysis.dominant]}</p>
        </div>

        <div style={{ padding: '1rem', background: 'var(--ifm-color-emphasis-0)', borderRadius: '0.75rem', marginBottom: '1rem', border: '1px solid var(--ifm-color-emphasis-200)' }}>
          <h4>Primary Shadow Mechanism</h4>
          <p style={{ fontWeight: 600 }}>{MECHANISM_LABELS[analysis.dominant]}</p>
        </div>

        <div style={{ padding: '1rem', background: 'var(--ifm-color-emphasis-0)', borderRadius: '0.75rem', marginBottom: '1rem', border: '1px solid var(--ifm-color-emphasis-200)' }}>
          <h4>Spiritual Bypassing Tendency</h4>
          <p>Average: <strong>{bypass.average} / 5</strong> — {bypass.band === 'high' ? 'Significant bypass patterns detected' : bypass.band === 'moderate' ? 'Moderate bypass awareness' : 'Low bypass tendency'}</p>
          {bypass.band === 'high' && <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)' }}>High bypass scores often indicate that spiritual practice is being used to manage emotional material rather than integrate it. The Spiritual Bypassing module is recommended below.</p>}
        </div>

        <h3 style={{ marginTop: '1.5rem' }}>Recommended Modules</h3>
        {recs.map((m, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }}>
            <Link className="button button--secondary button--block" to={m.to}>{m.title} →</Link>
          </div>
        ))}
        {bypass.band === 'high' && (
          <div style={{ marginBottom: '0.5rem' }}>
            <Link className="button button--secondary button--block" to="/docs/modules/shadow-spiritual-bypassing">Spiritual Bypassing →</Link>
          </div>
        )}

        {analysis.traumaCount >= 3 && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--ifm-color-warning-lightest)', borderRadius: '0.75rem', border: '1px solid var(--ifm-color-warning-dark)' }}>
            <h4 style={{ marginTop: 0, color: 'var(--ifm-color-warning-dark)' }}>Consider Facilitated Support</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Some of your responses suggest that shadow material may be entangled with experiences that benefit from facilitated support — working with a therapist, coach, or shadow work facilitator — rather than self-guided exploration alone. This is not a diagnosis. It is a recognition that some material is best approached with another person present.
            </p>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--ifm-color-emphasis-0)', borderRadius: '0.75rem' }}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            <strong>Shadow is not a defect.</strong> Everyone has shadow material — it is inherent to human psychology. The capacity to recognize it is a developmental achievement, not evidence of damage.
          </p>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button id="sw-copy-btn" className="button button--primary" onClick={handleCopy}>Export to Journal</button>
          <button className="button button--outline" onClick={() => { setAnswersA({}); setAnswersB({}); setAnswersC({}); setSubmitted(false); }}>Retake Assessment</button>
        </div>
      </div>
    );
  }

  // ── Assessment form ──
  return (
    <div style={cs}>
      {/* Section A */}
      <div style={sectionStyle} role="region" aria-labelledby="sec-a-title">
        <h3 id="sec-a-title" style={stitle}>Section A: Shadow Mechanisms</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '1rem' }}>10 scenario-based questions. Each explores a different shadow mechanism. There are no right answers — honest self-observation is the goal.</p>
        {QUESTIONS_A.map((q) => (
          <fieldset key={q.id} style={fieldset}>
            <legend style={legend}>{q.text}</legend>
            <div role="radiogroup" aria-label={q.text.substring(0, 60)}>
              {q.options.map((opt) => (
                <label key={opt.value} style={opt}>
                  <input type="radio" name={q.id} value={opt.value} checked={answersA[q.id] === opt.value} onChange={() => setAnswersA((p) => ({ ...p, [q.id]: opt.value }))} style={{ marginRight: '0.5rem' }} />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-500)' }}>{totalA}/{QUESTIONS_A.length} answered</p>
      </div>

      {/* Section B */}
      <div style={sectionStyle} role="region" aria-labelledby="sec-b-title">
        <h3 id="sec-b-title" style={stitle}>Section B: Developmental Line Shadow</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '1rem' }}>8 questions exploring which developmental lines carry the strongest shadow charge.</p>
        {QUESTIONS_B.map((q) => (
          <fieldset key={q.id} style={fieldset}>
            <legend style={legend}>{q.text}</legend>
            <div role="radiogroup" aria-label={q.text.substring(0, 60)}>
              {q.options.map((opt) => (
                <label key={opt.value} style={opt}>
                  <input type="radio" name={q.id} value={opt.value} checked={answersB[q.id] === opt.value} onChange={() => setAnswersB((p) => ({ ...p, [q.id]: opt.value }))} style={{ marginRight: '0.5rem' }} />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-500)' }}>{totalB}/{QUESTIONS_B.length} answered</p>
      </div>

      {/* Section C */}
      <div style={sectionStyle} role="region" aria-labelledby="sec-c-title">
        <h3 id="sec-c-title" style={stitle}>Section C: Spiritual Bypassing Tendencies</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '1rem' }}>12 statements about spiritual practice and bypass. Rate your honest agreement (1 = strongly disagree, 5 = strongly agree).</p>
        {QUESTIONS_C.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--ifm-color-emphasis-100)' }}>
            <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}><strong>{idx + 1}.</strong> {q.text}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} role="radiogroup" aria-label={q.text.substring(0, 60)}>
              {[1, 2, 3, 4, 5].map((val) => (
                <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input type="radio" name={q.id} value={val} checked={answersC[q.id] === val} onChange={() => setAnswersC((p) => ({ ...p, [q.id]: val }))} />
                  {val}
                </label>
              ))}
            </div>
          </div>
        ))}
        <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-500)' }}>{totalC}/{QUESTIONS_C.length} answered</p>
      </div>

      {/* Submit */}
      <button className="button button--primary button--lg" onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ width: '100%', marginBottom: '1rem' }}>
        View Your Shadow Profile ({totalAnswered}/{totalQuestions})
      </button>
    </div>
  );
}
