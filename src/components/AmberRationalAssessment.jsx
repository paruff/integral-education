import React, { useState } from 'react';
import Link from '@docusaurus/Link';

const QUESTIONS = [
  {
    text: 'Your manager announces a new policy that seems unfair to you. Your first instinct is to:',
    options: [
      { value: 'a', label: 'Trust that leadership knows what they are doing — there is probably a good reason I have not been told.' },
      { value: 'b', label: 'Feel conflicted. I want to trust the decision but I also want to understand the reasoning behind it.' },
      { value: 'c', label: 'Ask for the evidence and reasoning behind the decision before forming a judgment.' },
    ],
  },
  {
    text: 'A colleague challenges a long-standing team procedure and suggests a completely different approach. You:',
    options: [
      { value: 'a', label: 'Feel uneasy. The current procedure has worked for years — why change what is not broken?' },
      { value: 'b', label: 'Listen with curiosity but feel more comfortable if the new approach can be tested gradually.' },
      { value: 'c', label: 'Evaluate the proposal on its merits — if the evidence supports it, I am open to change regardless of tradition.' },
    ],
  },
  {
    text: 'You are put in charge of a project with no clear instructions from above. You:',
    options: [
      { value: 'a', label: 'Look for guidance from a senior colleague or existing policy to establish a clear framework.' },
      { value: 'b', label: 'Start with what has worked before, but adapt as I go based on what the situation demands.' },
      { value: 'c', label: 'Define the approach myself based on my own analysis of what the project needs.' },
    ],
  },
  {
    text: 'A teaching in your faith or belief system conflicts with something you have directly observed to be true. You:',
    options: [
      { value: 'a', label: 'Trust the teaching — my direct observation might be limited or I might be misunderstanding what I saw.' },
      { value: 'b', label: 'Hold both in tension. The teaching matters to me, but I cannot simply dismiss what I witnessed.' },
      { value: 'c', label: 'Revise my understanding. If direct observation contradicts a belief, the belief needs to be re-examined.' },
    ],
  },
  {
    text: 'Someone close to you leaves your shared faith tradition. You:',
    options: [
      { value: 'a', label: 'Feel deep concern — I worry about what this means for them and hope they return.' },
      { value: 'b', label: 'Struggle with it. I want to respect their choice but it also challenges something I hold dear about community.' },
      { value: 'c', label: 'Respect their autonomy. Their spiritual path is theirs to navigate, even if it differs from mine.' },
    ],
  },
  {
    text: 'You encounter someone whose moral beliefs are genuinely different from yours — not just different opinions, but a different framework for what "right" even means. You:',
    options: [
      { value: 'a', label: 'Feel that some moral truths are universal. I can respect the person without agreeing that their framework is equally valid.' },
      { value: 'b', label: 'Try to find common ground. I believe most moral frameworks share core values even if they express them differently.' },
      { value: 'c', label: 'Recognize that moral frameworks are shaped by culture and context. I can understand their position without adopting it.' },
    ],
  },
  {
    text: 'You read a study that challenges something you have long believed to be true. You:',
    options: [
      { value: 'a', label: 'Check who funded the study and whether it aligns with sources I trust before taking it seriously.' },
      { value: 'b', label: 'Read the study carefully. I want to understand the evidence, but I also consider how it fits with what I already know.' },
      { value: 'c', label: 'Evaluate the methodology and evidence quality. If the study is rigorous, I am willing to change my mind.' },
    ],
  },
  {
    text: 'A family member gives you health advice based on a tradition that has been passed down for generations. The advice conflicts with what recent medical research says. You:',
    options: [
      { value: 'a', label: 'Value the tradition — generations of practical wisdom should not be dismissed lightly.' },
      { value: 'b', label: 'Try to find a middle ground. Maybe both the tradition and the research have something useful to offer.' },
      { value: 'c', label: 'Follow the research. Tradition has value but medical decisions should be based on the best available evidence.' },
    ],
  },
  {
    text: 'You are deciding whether to trust a news story that confirms your existing views on a political issue. You:',
    options: [
      { value: 'a', label: 'Share it with like-minded people — if it comes from a source my community trusts, that carries weight.' },
      { value: 'b', label: 'Read it but seek out a different perspective as well before forming a firm opinion.' },
      { value: 'c', label: 'Verify the claims independently — check the original sources, look for consensus among experts, and weigh the evidence.' },
    ],
  },
  {
    text: 'You realize you have been unhappy in your career for a while, but changing would disappoint people who have invested in you. You:',
    options: [
      { value: 'a', label: 'Stay the course. My commitments and the expectations of people who matter to me are not something I take lightly.' },
      { value: 'b', label: 'Explore the possibility of change cautiously. I want to honour relationships while also being honest about what I need.' },
      { value: 'c', label: 'Make the decision based on what I genuinely believe is right for me. The disappointment of others is difficult, but it is not the deciding factor.' },
    ],
  },
  {
    text: 'You are asked to describe who you are — not your roles or relationships, but your core self. You:',
    options: [
      { value: 'a', label: 'Describe myself through my roles and relationships — parent, professional, member of my community. These are who I am.' },
      { value: 'b', label: 'Start with my roles but also mention values and beliefs that feel personal to me, not just inherited.' },
      { value: 'c', label: 'Describe my values, principles, and the internal compass I have developed through reflection and experience.' },
    ],
  },
  {
    text: 'A significant life decision is approaching. You are getting conflicting advice from people you respect. You:',
    options: [
      { value: 'a', label: 'Weigh the advice carefully — especially from those with more experience or authority in the relevant domain.' },
      { value: 'b', label: 'Consider multiple perspectives but ultimately feel the weight of making the "right" choice as defined by my community\'s standards.' },
      { value: 'c', label: 'Gather input as data points, but the final decision rests on my own judgment about what aligns with my values.' },
    ],
  },
];

const DOMAINS = {
  'Workplace Authority': [0, 1, 2],
  'Belief & Moral Reasoning': [3, 4, 5],
  'Evidence & Knowledge': [6, 7, 8],
  'Self-Identity & Decision-Making': [9, 10, 11],
};

const RESULTS = {
  'amber-dominant': {
    title: 'Grounded in Tradition',
    description: 'Your answers suggest you draw significant strength from established structures, trusted authorities, and shared values. You have a clear sense of what is right and where you belong — these are genuine developmental achievements, not limitations. Many of the capacities you rely on — loyalty, consistency, reliability — are ones the world deeply needs.',
    modules: [
      { title: 'Amber/Mythic Stage Orientation', to: '/docs/modules/amber-mythic-orientation' },
      { title: 'Cognitive Dissonance Bridge', to: '/docs/modules/cognitive-dissonance-bridge' },
      { title: 'Authority & Autonomy Transition', to: '/docs/modules/authority-autonomy-transition' },
    ],
  },
  'amber-rational-transitional': {
    title: 'In Transition',
    description: 'Your answers reflect a mind actively navigating between two different ways of making sense of the world. You are asking the questions that drive growth — without yet having settled into new answers. This is the most generative developmental space. The discomfort you may feel is not a sign that something is wrong; it is the sensation of a worldview expanding.',
    modules: [
      { title: 'Cognitive Dissonance Bridge', to: '/docs/modules/cognitive-dissonance-bridge' },
      { title: 'Perspective-Taking Capacity', to: '/docs/modules/perspective-taking-capacity' },
      { title: 'Critical Thinking Foundations', to: '/docs/modules/critical-thinking-foundations' },
      { title: 'Evidence Evaluation', to: '/docs/modules/evidence-evaluation' },
    ],
  },
  'rational-emerging': {
    title: 'Thinking for Yourself',
    description: 'Your answers suggest you have developed a strong internal compass — you evaluate claims on their evidence, make decisions based on your own reasoning, and can hold your own perspective alongside others without losing yourself. These are the foundational capacities of self-authorship. The next growth edges involve integrating emotional and interpersonal dimensions with this cognitive strength.',
    modules: [
      { title: 'Rational/Orange Stage Orientation', to: '/docs/modules/rational-orange-orientation' },
      { title: 'Evidence Evaluation', to: '/docs/modules/evidence-evaluation' },
      { title: 'Late Orange Disillusionment', to: '/docs/modules/late-orange-disillusionment' },
    ],
  },
  'rational-stable': {
    title: 'Self-Authored',
    description: 'Your answers suggest you operate from a stable internal framework — you can think independently, evaluate evidence on its own terms, and navigate complexity without outsourcing your judgment. This capacity is a significant developmental achievement. From here, the natural growth edge is toward perspective-plurality: the ability to hold multiple frameworks simultaneously, including ones that challenge your own.',
    modules: [
      { title: 'Empathy & Perspective-Plurality', to: '/docs/modules/empathy-perspective-plurality' },
      { title: 'Emotional Intelligence & Somatic Line', to: '/docs/modules/emotional-intelligence-somatic-line' },
      { title: 'Late Orange Disillusionment', to: '/docs/modules/late-orange-disillusionment' },
      { title: 'Rational → Pluralistic QuickStart', to: '/docs/quickstarts/rational-to-pluralistic' },
    ],
  },
};

function categorize(aCount, bCount, cCount) {
  if (aCount >= 7) return 'amber-dominant';
  if (cCount >= 7) return 'rational-stable';
  if (cCount >= 5 && aCount <= 3) return 'rational-emerging';
  return 'amber-rational-transitional';
}

export default function AmberRationalAssessment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === QUESTIONS.length;

  function handleSelect(qIndex, value) {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  }

  function handleSubmit() {
    if (allAnswered) setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  const scores = submitted
    ? Object.values(answers).reduce(
        (acc, val) => {
          if (val === 'a') acc.a++;
          else if (val === 'b') acc.b++;
          else acc.c++;
          return acc;
        },
        { a: 0, b: 0, c: 0 }
      )
    : null;

  const category = scores ? categorize(scores.a, scores.b, scores.c) : null;
  const result = category ? RESULTS[category] : null;

  // Domain breakdown
  const domainScores = submitted
    ? Object.fromEntries(
        Object.entries(DOMAINS).map(([domain, indices]) => {
          const vals = indices.map((i) => answers[i]).filter(Boolean);
          const a = vals.filter((v) => v === 'a').length;
          const c = vals.filter((v) => v === 'c').length;
          return [domain, { a, c, dominant: a > c ? 'Amber' : c > a ? 'Rational' : 'Mixed' }];
        })
      )
    : null;

  function copyResults() {
    const domainText = domainScores
      ? Object.entries(domainScores)
          .map(([d, s]) => `${d}: ${s.dominant} (Amber answers: ${s.a}, Rational answers: ${s.c})`)
          .join('\n')
      : '';
    const text = `Amber → Rational Self-Assessment\nDate: ${new Date().toLocaleDateString()}\nResult: ${result?.title}\n\nDomain Breakdown:\n${domainText}\n\nRecommended Modules:\n${result?.modules.map((m) => `- ${m.title}`).join('\n')}`;
    navigator.clipboard.writeText(text).catch(() => {});
    const btn = document.getElementById('copy-btn');
    if (btn) {
      btn.textContent = 'Copied ✓';
      setTimeout(() => (btn.textContent = 'Save my results to journal'), 2000);
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'inherit' }}>
      <div style={{ padding: '1rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          <strong>Each stage of development has its gifts.</strong> This tool helps you understand where you are right now — not rank you against others or against some ideal. There is no "better" stage. There is only more accurate self-knowledge, which helps you choose what to work on next.
        </p>
      </div>

      {!submitted && (
        <>
          {QUESTIONS.map((q, idx) => (
            <fieldset key={idx} style={{ border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
              <legend style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                {idx + 1}. {q.text}
              </legend>
              {q.options.map((opt) => (
                <label key={opt.value} style={{ display: 'block', marginBottom: '0.3rem', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={opt.value}
                    checked={answers[idx] === opt.value}
                    onChange={() => handleSelect(idx, opt.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {opt.label}
                </label>
              ))}
            </fieldset>
          ))}

          <button className="button button--primary button--lg" onClick={handleSubmit} disabled={!allAnswered} style={{ width: '100%', marginBottom: '1rem' }}>
            See My Results ({answered}/{QUESTIONS.length})
          </button>
        </>
      )}

      {submitted && result && (
        <>
          <div style={{ padding: '1.5rem', background: 'var(--ifm-color-primary-lightest)', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>{result.title}</h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{result.description}</p>
          </div>

          <h3>Domain Profile</h3>
          {domainScores &&
            Object.entries(domainScores).map(([domain, s]) => (
              <div key={domain} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600 }}>{domain}</span>
                  <span style={{ color: 'var(--ifm-color-emphasis-600)' }}>{s.dominant}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--ifm-color-emphasis-200)', borderRadius: '3px', display: 'flex', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(s.a / 3) * 100}%`, background: 'var(--ifm-color-warning)', borderRadius: '3px 0 0 3px' }} />
                  <div style={{ height: '100%', width: `${(s.c / 3) * 100}%`, background: 'var(--ifm-color-success)', borderRadius: '0 3px 3px 0' }} />
                </div>
              </div>
            ))}

          <h3 style={{ marginTop: '1.5rem' }}>Recommended Next Steps</h3>
          {result.modules.map((mod) => (
            <div key={mod.to} style={{ marginBottom: '0.5rem' }}>
              <Link className="button button--secondary button--block" to={mod.to}>
                {mod.title} →
              </Link>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button id="copy-btn" className="button button--primary" onClick={copyResults}>
              Save my results to journal
            </button>
            <button className="button button--outline" onClick={handleReset}>
              Retake Assessment
            </button>
          </div>

          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)' }}>
            Revisit this assessment every 30–60 days to observe change. Self-assessment is most useful as a pattern over time, not a single snapshot.
          </p>
        </>
      )}
    </div>
  );
}