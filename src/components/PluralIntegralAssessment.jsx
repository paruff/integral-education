import React, { useState } from 'react';
import Link from '@docusaurus/Link';

// ─── Section A: Late-Green Signals Recognition ────────────────────────────────
// 8 scenario-based questions. Each option is tagged:
//   EARLY_GREEN  = pluralistic worldview, still first-tier (pre-Teal)
//   LATE_GREEN   = genuine late-Green emergence signals
//   INTELLECTUAL = intellectually identifying with Teal, not embodying it
//   INTEGRAL     = early integral / 2nd-Tier indicators
//
// Options are presented in mixed order so stage labels are not obvious.

const SECTION_A = [
  {
    id: 'a1',
    title: 'When Consensus Fails',
    text: 'Your team reaches consensus on an approach you genuinely believe will harm a marginalized group. You:',
    options: [
      { value: 'a', label: 'Defer to the group — collective wisdom is usually more trustworthy than my individual view.', tag: 'EARLY_GREEN' },
      { value: 'b', label: 'Voice your concern clearly, name the specific harm you foresee, and stay in relationship even if overruled.', tag: 'LATE_GREEN' },
      { value: 'c', label: 'Frame the decision within a developmental hierarchy ("this group is operating from an earlier stage") to make sense of the disagreement.', tag: 'INTELLECTUAL' },
      { value: 'd', label: 'Hold the harm concern and the systemic context simultaneously — advocate clearly while remaining curious about what you might be missing.', tag: 'INTEGRAL' },
    ],
  },
  {
    id: 'a2',
    title: 'Emotional Activation',
    text: 'In a high-stakes meeting, you notice a wave of emotion (anger, grief, or fear) arising in you. You:',
    options: [
      { value: 'a', label: 'Express it — suppressing authentic emotion is part of what is wrong with conventional culture.', tag: 'EARLY_GREEN' },
      { value: 'b', label: 'Notice it, name it briefly if useful, and continue tracking the meeting\'s purpose.', tag: 'INTEGRAL' },
      { value: 'c', label: 'Feel it but observe it at the same time — you can notice the emotion without being run by it.', tag: 'LATE_GREEN' },
      { value: 'd', label: 'Reflect afterward — you are still learning how to be present to strong feeling without either suppressing or flooding.', tag: 'EARLY_GREEN' },
    ],
  },
  {
    id: 'a3',
    title: 'Framework Encounter',
    text: 'A colleague enthusiastically presents an elaborate new systems framework. You notice yourself:',
    options: [
      { value: 'a', label: 'Excited — this is exactly the kind of integral thinking the world needs more of.', tag: 'INTELLECTUAL' },
      { value: 'b', label: 'Curious but quietly noting where the framework\'s edges don\'t quite fit the complexity you see.', tag: 'LATE_GREEN' },
      { value: 'c', label: 'Wondering what it is actually asking you to do differently on the ground.', tag: 'INTEGRAL' },
      { value: 'd', label: 'Concerned — this kind of abstract hierarchy could sideline lived experience and marginalised voices.', tag: 'EARLY_GREEN' },
    ],
  },
  {
    id: 'a4',
    title: 'The Pluralism Paradox',
    text: 'You have long championed "all perspectives are valid," but you are confronted with a perspective that is actively harming others. You feel:',
    options: [
      { value: 'a', label: 'Confused — both commitments feel true and you are not sure how to reconcile them.', tag: 'EARLY_GREEN' },
      { value: 'b', label: 'Frustrated — relativism has limits, and you are ready to name them without abandoning pluralism.', tag: 'LATE_GREEN' },
      { value: 'c', label: 'Clear that some perspectives, while worthy of understanding, are not worthy of equal platform.', tag: 'INTEGRAL' },
      { value: 'd', label: 'You understand this intellectually but still feel an emotional pull toward inclusion even here.', tag: 'INTELLECTUAL' },
    ],
  },
  {
    id: 'a5',
    title: 'Effectiveness Question',
    text: 'A colleague suggests your community project would have more impact with tighter structure and clear metrics. You:',
    options: [
      { value: 'a', label: 'Resist — metrics and structure are often tools of the dominant culture.', tag: 'EARLY_GREEN' },
      { value: 'b', label: 'Feel the resistance and also the uncomfortable pull of truth in what they said.', tag: 'LATE_GREEN' },
      { value: 'c', label: 'Can hold the value of metrics and the value of emergent process without needing to choose.', tag: 'INTEGRAL' },
      { value: 'd', label: 'Agree in principle but notice you are not actually changing how you work.', tag: 'INTELLECTUAL' },
    ],
  },
  {
    id: 'a6',
    title: 'Personal Shadow',
    text: 'You catch yourself being subtly dismissive of someone whose worldview you consider less developed. You:',
    options: [
      { value: 'a', label: 'Feel embarrassed and quickly reframe them in a more charitable light.', tag: 'EARLY_GREEN' },
      { value: 'b', label: 'Note it as data — ranking impulses are real, and this is useful self-knowledge.', tag: 'LATE_GREEN' },
      { value: 'c', label: 'Take it seriously as a shadow pattern that may undercut your relationships and influence.', tag: 'INTEGRAL' },
      { value: 'd', label: 'Excuse it silently — you recognise that some perspectives genuinely are less developed.', tag: 'INTELLECTUAL' },
    ],
  },
  {
    id: 'a7',
    title: 'Complexity Tolerance',
    text: 'You are reading about a wicked social problem (e.g., urban poverty, addiction, climate displacement). Your felt sense is:',
    options: [
      { value: 'a', label: 'Overwhelmed — the complexity is paralysing. You are not sure where to begin.', tag: 'EARLY_GREEN' },
      { value: 'b', label: 'Engaged — the complexity is interesting without being destabilising.', tag: 'INTEGRAL' },
      { value: 'c', label: 'Holding many causal threads simultaneously, uncertain and alive to the task.', tag: 'LATE_GREEN' },
      { value: 'd', label: 'You can map it onto your favourite systems framework and feel better.', tag: 'INTELLECTUAL' },
    ],
  },
  {
    id: 'a8',
    title: 'Time Horizon',
    text: 'When planning a meaningful project, your natural time horizon is:',
    options: [
      { value: 'a', label: 'The present moment and near future — presence and emergence matter more than planning.', tag: 'EARLY_GREEN' },
      { value: 'b', label: 'Months to a few years — enough to act but not so far as to be unresponsive to emergence.', tag: 'LATE_GREEN' },
      { value: 'c', label: 'Decades — you are drawn to generational and civilisational timescales.', tag: 'INTEGRAL' },
      { value: 'd', label: 'You think in generational terms but your actual daily actions are still mainly short-horizon.', tag: 'INTELLECTUAL' },
    ],
  },
];

// ─── Section B: Vision-Logic & Metasystematic Thinking ───────────────────────
// 6 brief cognitive-task questions (not self-report).
// Each presents a scenario requiring metasystematic reasoning.
// Score: 0 (concrete/systemic), 1 (partial), 2 (metasystematic)

const SECTION_B = [
  {
    id: 'b1',
    title: 'Framework Collision',
    task: 'Two colleagues present competing frameworks for organisational change: one is Agile (emergence, iteration, self-organising teams), the other is Theory U (co-sensing, presencing, prototyping). Both claim strong evidence. What do you actually do with these two frameworks?',
    options: [
      { value: '0', label: 'Choose the one that fits the current situation best and apply it.', score: 0 },
      { value: '1', label: 'Notice where they overlap and where they differ, and use each where it applies.', score: 1 },
      { value: '2', label: 'Triangulate them — ask what each reveals that the other misses, what assumptions underlie each, and what a practitioner committed to both would need to hold simultaneously.', score: 2 },
    ],
  },
  {
    id: 'b2',
    title: 'Meta-Pattern Recognition',
    task: 'You notice the same conflict pattern appearing in three different contexts: your family system, a community organisation, and a national political dynamic. What is most accurate about how you respond?',
    options: [
      { value: '0', label: 'These are different situations; I address each on its own terms.', score: 0 },
      { value: '1', label: 'I notice the similarity and wonder if there is a shared cause.', score: 1 },
      { value: '2', label: 'I map the structural pattern — what is functionally equivalent across all three — and ask what a shift in that structure would require at each level.', score: 2 },
    ],
  },
  {
    id: 'b3',
    title: 'The Map–Territory Question',
    task: 'A highly regarded developmental model (e.g., Spiral Dynamics, AQAL) clearly describes someone you know well. But the description seems to flatten important nuances you observe in them. You:',
    options: [
      { value: '0', label: 'Trust the model — these nuances are probably variations within the stage.', score: 0 },
      { value: '1', label: 'Acknowledge the model\'s limits and hold the description loosely.', score: 1 },
      { value: '2', label: 'Use the tension as diagnostic information: what does the model fail to capture, and what would a more adequate map need to include?', score: 2 },
    ],
  },
  {
    id: 'b4',
    title: 'Nested Causality',
    task: 'An organisation is underperforming. You are offered three explanations: bad leadership (individual), poor team dynamics (relational), and misaligned incentive structure (systemic). Which do you find most satisfying?',
    options: [
      { value: '0', label: 'One of the three — the most immediately plausible one.', score: 0 },
      { value: '1', label: 'All three are relevant; I would weight them based on the data.', score: 1 },
      { value: '2', label: 'None of them alone — I want to understand how they co-constitute each other and which level of intervention has the highest leverage given this specific system.', score: 2 },
    ],
  },
  {
    id: 'b5',
    title: 'Developmental Stage Applied',
    task: 'You are advising someone whose meaning-making is strongly grounded in belonging, loyalty, and shared rules, and who is seeking personal growth. What is most accurate about your approach?',
    options: [
      { value: '0', label: 'Present the developmental map and help them see where they are.', score: 0 },
      { value: '1', label: 'Meet them where they are — use their existing framework, then gently introduce stretches.', score: 1 },
      { value: '2', label: 'Understand their functional center of gravity, the line variations within it, the proximal zone of development for this person specifically, and design the encounter to pull forward without threatening the existing structure.', score: 2 },
    ],
  },
  {
    id: 'b6',
    title: 'Own Framework Critique',
    task: 'You discover a rigorous critique of the developmental model you most rely on. The critique argues that the model\'s "higher stages" encode cultural biases. What is your honest response?',
    options: [
      { value: '0', label: 'The critique is probably partially right; I will file it and keep using the model.', score: 0 },
      { value: '1', label: 'I engage with the critique seriously — it changes how confidently I apply the model.', score: 1 },
      { value: '2', label: 'I trace exactly where the bias enters the model\'s structure, which conclusions are affected, which survive the critique, and what a corrected version would look like.', score: 2 },
    ],
  },
];

// ─── Section C: Integral Shadow Detection ────────────────────────────────────
// 10 questions probing known Teal shadow patterns (Issue #53):
//   1. Developmental ranking / status hierarchy
//   2. Map–territory confusion
//   3. Cognitive–emotional asynchrony
//   4. Premature Teal identity
//   5. Spiritual bypass via integral framing
//
// Each question has a "shadow indicator" answer (value 'shadow') and a
// "grown-edge aware" answer (value 'aware').

const SECTION_C = [
  {
    id: 'c1',
    shadow: 'RANKING',
    title: 'Meeting Frustration',
    text: 'You are in a meeting where someone seems unable to grasp a systemic perspective you consider important. Your honest inner experience is most like:',
    options: [
      { value: 'shadow', label: 'A quiet frustration — "why can\'t they see this?" — mixed with a sense that the gap is developmental.' },
      { value: 'mixed', label: 'Some frustration, but also genuine curiosity about what they are seeing that you might be missing.' },
      { value: 'aware', label: 'Awareness that you are being pulled toward a ranking judgment, and deliberate redirection toward listening.' },
    ],
  },
  {
    id: 'c2',
    shadow: 'MAP_TERRITORY',
    title: 'Explaining Others',
    text: 'When you explain a difficult person\'s behaviour to a friend, how often do you use a developmental stage or typology label as the core explanation?',
    options: [
      { value: 'shadow', label: 'Often — it genuinely captures what is happening and is more useful than other explanations.' },
      { value: 'mixed', label: 'Sometimes, but I notice the label can become a way of stopping inquiry.' },
      { value: 'aware', label: 'Rarely as a core explanation — I use it as one angle, not the whole picture.' },
    ],
  },
  {
    id: 'c3',
    shadow: 'COGNITIVE_EMOTIONAL',
    title: 'Embodied Knowledge',
    text: 'You can articulate the importance of emotional and somatic intelligence. In a moment of genuine interpersonal conflict, your body and emotional responses are:',
    options: [
      { value: 'shadow', label: 'Still catching up to the theory — in practice, I often go cognitively abstract under pressure.' },
      { value: 'mixed', label: 'Variable — sometimes integrated, sometimes I notice the gap between what I know and what I do.' },
      { value: 'aware', label: 'A genuine resource I can draw on, even when imperfectly.' },
    ],
  },
  {
    id: 'c4',
    shadow: 'PREMATURE_IDENTITY',
    title: 'Sense of Arrival',
    text: 'How long have you considered yourself to be operating primarily from this stage of development?',
    options: [
      { value: 'shadow', label: 'Since I encountered the model — the description fit immediately and felt like recognition.' },
      { value: 'mixed', label: 'A few years — long enough that I have had the model challenged by real situations.' },
      { value: 'aware', label: 'I hold the identity loosely or provisionally — developmental stage is a question, not a settled answer.' },
    ],
  },
  {
    id: 'c5',
    shadow: 'RANKING',
    title: 'Teaching Others',
    text: 'When sharing developmental ideas with someone who seems to dismiss them, you:',
    options: [
      { value: 'shadow', label: 'Feel a pull toward persuasion — the ideas matter and the person\'s resistance feels like a developmental gap.' },
      { value: 'mixed', label: 'Can step back, though you still feel the pull toward wanting to "land" the insight.' },
      { value: 'aware', label: 'Treat their response as legitimate feedback — their perspective may reveal something your framing is missing.' },
    ],
  },
  {
    id: 'c6',
    shadow: 'MAP_TERRITORY',
    title: 'Framework Confidence',
    text: 'When a situation is genuinely ambiguous or distressing, how quickly do you reach for a developmental or systems framework to make sense of it?',
    options: [
      { value: 'shadow', label: 'Quickly and reliably — the framework is a genuine comfort and clarification tool.' },
      { value: 'mixed', label: 'Often, but I notice I sometimes use it to close down uncertainty rather than illuminate it.' },
      { value: 'aware', label: 'Sometimes, and I also deliberately stay with not-knowing longer before framing.' },
    ],
  },
  {
    id: 'c7',
    shadow: 'COGNITIVE_EMOTIONAL',
    title: 'Relational Impact',
    text: 'People who know you well and are honest with you would say that your intellectual sophistication:',
    options: [
      { value: 'shadow', label: 'Is one of your greatest strengths — it helps them see more clearly.' },
      { value: 'mixed', label: 'Is mostly a gift, but sometimes creates distance or can feel intimidating.' },
      { value: 'aware', label: 'Is something you actively work to keep in service of relationship, not a substitute for it.' },
    ],
  },
  {
    id: 'c8',
    shadow: 'SPIRITUAL_BYPASS',
    title: 'Equanimity Under Pressure',
    text: 'When you are in a situation that genuinely requires anger, confrontation, or holding a hard boundary, your authentic response is:',
    options: [
      { value: 'shadow', label: 'To return to a place of spacious equanimity — this is the more mature response.' },
      { value: 'mixed', label: 'Equanimity as a default, but with growing awareness that this is sometimes avoidance.' },
      { value: 'aware', label: 'Whatever the situation calls for, including conflict and confrontation when needed.' },
    ],
  },
  {
    id: 'c9',
    shadow: 'PREMATURE_IDENTITY',
    title: 'Disconfirmation',
    text: 'Someone you respect observes that, in a recent situation, you behaved in a more reactive, group-consensus-driven way than the more integrated way you like to think you operate. Your honest first response is:',
    options: [
      { value: 'shadow', label: 'Mild defensiveness — the observation feels unfair or over-simplified.' },
      { value: 'mixed', label: 'Some defensiveness followed by genuine curiosity about what they saw.' },
      { value: 'aware', label: 'Interest — this is exactly the kind of feedback that is most useful.' },
    ],
  },
  {
    id: 'c10',
    shadow: 'RANKING',
    title: 'Political Discourse',
    text: 'When engaging with people who hold politically conventional views (from any part of the spectrum), your usual felt sense is:',
    options: [
      { value: 'shadow', label: 'Some impatience or grief — you see what they cannot yet see.' },
      { value: 'mixed', label: 'You can hold respect for the person while feeling limited by the level of the conversation.' },
      { value: 'aware', label: 'Genuine curiosity about what first-tier commitments are protecting in this person, and what you might still learn.' },
    ],
  },
];

// ─── Section D: Cross-Line Embodiment Profile ────────────────────────────────
// 8 questions assessing emotional, somatic, relational, and moral line development
// relative to cognitive development. Each is rated on a 4-point scale.

const SECTION_D = [
  {
    id: 'd1',
    line: 'Emotional',
    text: 'When strong emotion arises in you, you can:',
    options: [
      { value: '1', label: 'Mostly suppress or discharge it.' },
      { value: '2', label: 'Name it and reflect on it afterward.' },
      { value: '3', label: 'Be present to it in the moment without losing function.' },
      { value: '4', label: 'Use it as live information while staying relationally present.' },
    ],
  },
  {
    id: 'd2',
    line: 'Somatic',
    text: 'Right now, reading this assessment, you have:',
    options: [
      { value: '1', label: 'No particular awareness of your body.' },
      { value: '2', label: 'A general sense of whether you are comfortable or not.' },
      { value: '3', label: 'Awareness of specific sensations — tension, breathing pattern, energy.' },
      { value: '4', label: 'A felt sense that gives you information about your engagement with the material.' },
    ],
  },
  {
    id: 'd3',
    line: 'Relational',
    text: 'People in your life would say that in a difficult conversation you:',
    options: [
      { value: '1', label: 'Often withdraw, get defensive, or seek to resolve conflict quickly.' },
      { value: '2', label: 'Can stay present, though you sometimes move to abstraction or problem-solving prematurely.' },
      { value: '3', label: 'Can remain relationally present and curious even when emotionally activated.' },
      { value: '4', label: 'Bring your whole self — including emotional truth — while tracking the other person\'s experience.' },
    ],
  },
  {
    id: 'd4',
    line: 'Moral',
    text: 'When you face a genuine moral dilemma — where competing goods or competing harms are real — you:',
    options: [
      { value: '1', label: 'Look for the rule or principle that applies.' },
      { value: '2', label: 'Think through consequences and principles, sometimes feeling torn.' },
      { value: '3', label: 'Hold the competing claims with genuine discomfort, and act from your best current judgment without certainty.' },
      { value: '4', label: 'Engage the dilemma as a developmental opportunity — what would the most expanded moral perspective require of you here?' },
    ],
  },
  {
    id: 'd5',
    line: 'Emotional',
    text: 'Your emotional range in day-to-day life — the variety and subtlety of feelings you notice and can name — is:',
    options: [
      { value: '1', label: 'Limited to primary emotions (happy, sad, angry, afraid).' },
      { value: '2', label: 'Moderate — I can name nuanced states when I slow down.' },
      { value: '3', label: 'Rich — I track emotional texture, including mixed and contradictory states.' },
      { value: '4', label: 'A developed capacity I actively cultivate and draw on.' },
    ],
  },
  {
    id: 'd6',
    line: 'Somatic',
    text: 'In situations of interpersonal stress, your somatic awareness (body signals, breathing, tension) serves as:',
    options: [
      { value: '1', label: 'A distraction or source of discomfort.' },
      { value: '2', label: 'A signal I notice afterward.' },
      { value: '3', label: 'A live signal I can track in real time.' },
      { value: '4', label: 'A resource that gives me information about the relational field, not only my own state.' },
    ],
  },
  {
    id: 'd7',
    line: 'Relational',
    text: 'Your capacity for genuine repair — returning to connection after rupture in a relationship — is:',
    options: [
      { value: '1', label: 'Uncomfortable; I tend to either avoid or move on quickly.' },
      { value: '2', label: 'Something I can do, though it takes time and often feels awkward.' },
      { value: '3', label: 'A practiced capacity — I can initiate repair even when I am not the one who "caused" the rupture.' },
      { value: '4', label: 'A relational gift — I can hold both parties\' reality without needing to assign blame.' },
    ],
  },
  {
    id: 'd8',
    line: 'Moral',
    text: 'Your capacity for genuine accountability — acknowledging harm you have caused without collapsing into shame or defensiveness — is:',
    options: [
      { value: '1', label: 'Difficult; I tend toward either over-explaining or harsh self-criticism.' },
      { value: '2', label: 'Developing; I can do it but it is uncomfortable and sometimes reactive.' },
      { value: '3', label: 'Reasonably solid; I can acknowledge harm, make repair, and stay present.' },
      { value: '4', label: 'A practiced capacity that I can access even in high-stakes situations.' },
    ],
  },
];

// ─── Scoring & Profile Generation ─────────────────────────────────────────────

function scoreA(answers) {
  const counts = { EARLY_GREEN: 0, LATE_GREEN: 0, INTELLECTUAL: 0, INTEGRAL: 0 };
  SECTION_A.forEach(({ id, options }) => {
    const val = answers[id];
    if (!val) return;
    const opt = options.find((o) => o.value === val);
    if (opt) counts[opt.tag]++;
  });
  return counts;
}

function scoreB(answers) {
  let total = 0;
  let max = 0;
  SECTION_B.forEach(({ id, options }) => {
    const val = answers[id];
    if (!val) return;
    const opt = options.find((o) => o.value === val);
    if (opt) total += opt.score;
    max += 2;
  });
  return { total, max, pct: max > 0 ? Math.round((total / max) * 100) : 0 };
}

function scoreC(answers) {
  const shadowCount = { RANKING: 0, MAP_TERRITORY: 0, COGNITIVE_EMOTIONAL: 0, PREMATURE_IDENTITY: 0, SPIRITUAL_BYPASS: 0 };
  const awareCount = { RANKING: 0, MAP_TERRITORY: 0, COGNITIVE_EMOTIONAL: 0, PREMATURE_IDENTITY: 0, SPIRITUAL_BYPASS: 0 };
  SECTION_C.forEach(({ id, shadow: pattern, options }) => {
    const val = answers[id];
    if (!val) return;
    const opt = options.find((o) => o.value === val);
    if (!opt) return;
    if (opt.value === 'shadow') shadowCount[pattern]++;
    else if (opt.value === 'aware') awareCount[pattern]++;
  });
  return { shadowCount, awareCount };
}

function scoreD(answers) {
  const byLine = { Emotional: [], Somatic: [], Relational: [], Moral: [] };
  SECTION_D.forEach(({ id, line }) => {
    const val = answers[id];
    if (!val) return;
    byLine[line].push(parseInt(val, 10));
  });
  const avg = {};
  Object.entries(byLine).forEach(([line, vals]) => {
    avg[line] = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  });
  return avg;
}

const SHADOW_LABELS = {
  RANKING: 'Developmental Ranking',
  MAP_TERRITORY: 'Map–Territory Confusion',
  COGNITIVE_EMOTIONAL: 'Cognitive–Emotional Asynchrony',
  PREMATURE_IDENTITY: 'Premature Sense of Having Arrived',
  SPIRITUAL_BYPASS: 'Spiritual Bypass via Developmental Framing',
};

function getGrowingEdges(cScores, dScores) {
  const edges = [];
  // Shadow edges
  Object.entries(cScores.shadowCount).forEach(([pattern, count]) => {
    if (count >= 1) {
      edges.push({ area: SHADOW_LABELS[pattern], detail: shadowEdgeDetail(pattern) });
    }
  });
  // Line edges
  Object.entries(dScores).forEach(([line, avg]) => {
    if (avg < 2.5) {
      edges.push({ area: `${line} Line Development`, detail: lineEdgeDetail(line) });
    }
  });
  return edges;
}

function shadowEdgeDetail(pattern) {
  const details = {
    RANKING: 'Awareness of hierarchy-of-worth assumptions embedded in developmental thinking. Practice: notice ranking impulses without suppression — bring them into inquiry.',
    MAP_TERRITORY: 'Distinguishing developmental maps from lived reality. Practice: for one week, notice every time a framework label closes rather than opens inquiry.',
    COGNITIVE_EMOTIONAL: 'Closing the gap between intellectual understanding of emotional/somatic intelligence and its embodied use. Practice: somatic check-in at the start of each conversation.',
    PREMATURE_IDENTITY: 'Holding this identity as a working hypothesis rather than a settled fact. Practice: seek disconfirming feedback from trusted others monthly.',
    SPIRITUAL_BYPASS: 'Recognising when equanimity is avoiding rather than transcending. Practice: identify one situation in the past month where anger or confrontation was the more mature response.',
  };
  return details[pattern] || '';
}

function lineEdgeDetail(line) {
  const details = {
    Emotional: 'Develop emotional range and present-moment access. Recommended: somatic practices, emotion-tracking journal, working with a therapist or embodiment coach.',
    Somatic: 'Develop body-based awareness as a live information source. Recommended: embodied movement practice, body-scan meditation, somatic coaching.',
    Relational: 'Develop capacity for full presence in interpersonal challenge. Recommended: Nonviolent Communication practice, relational repair work, peer accountability.',
    Moral: 'Develop moral reasoning capacity and comfort with dilemma. Recommended: ethical case discussion, moral philosophy reading, action inquiry practices.',
  };
  return details[line] || '';
}

function getModuleRecommendations(aScores, bScore, cScores, dScores) {
  const mods = [];

  if (aScores.INTELLECTUAL >= 3) {
    mods.push({ title: 'The Trap of Believing You\'ve Arrived', to: '/docs/modules/integral-shadow-teal-trap' });
  }
  if (aScores.LATE_GREEN >= 4) {
    mods.push({ title: 'Signs You\'re Ready for More Complexity', to: '/docs/modules/late-green-emergence-signals' });
  }
  if (aScores.INTEGRAL >= 3) {
    mods.push({ title: 'Integrating Perspectives Path', to: '/docs/quickstarts/pluralistic-to-integral' });
  }
  if (bScore.pct < 50) {
    mods.push({ title: 'Vision-Logic & Metasystematic Thinking', to: '/docs/modules/vision-logic-metasystematic-thinking' });
  }
  const shadowPatterns = Object.entries(cScores.shadowCount).filter(([, c]) => c >= 1).map(([p]) => p);
  if (shadowPatterns.includes('RANKING')) {
    mods.push({ title: 'The Trap of Believing You\'ve Arrived', to: '/docs/modules/integral-shadow-teal-trap' });
  }
  if (shadowPatterns.includes('COGNITIVE_EMOTIONAL')) {
    mods.push({ title: 'Emotional Intelligence & Somatic Line', to: '/docs/modules/emotional-intelligence-somatic-line' });
  }
  if (dScores.Somatic < 2.5 || dScores.Emotional < 2.5) {
    mods.push({ title: 'Emotional Intelligence & Somatic Line', to: '/docs/modules/emotional-intelligence-somatic-line' });
  }
  if (dScores.Relational < 2.5) {
    mods.push({ title: 'Relational Repair & Conflict Navigation', to: '/docs/modules/relational-repair-conflict-navigation' });
  }
  // Always include integral orientation
  mods.push({ title: 'Orientation: Systems, Complexity, and Integration', to: '/docs/modules/integral-teal-orientation' });

  // dedupe by to
  const seen = new Set();
  return mods.filter(({ to }) => {
    if (seen.has(to)) return false;
    seen.add(to);
    return true;
  });
}

// ─── Progress Bar Helper ──────────────────────────────────────────────────────
function MiniBar({ value, max = 4, color = 'var(--ifm-color-primary)' }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ height: '8px', background: 'var(--ifm-color-emphasis-200)', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '4px', transition: 'width 0.4s ease' }} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PluralIntegralAssessment() {
  const [secA, setSecA] = useState({});
  const [secB, setSecB] = useState({});
  const [secC, setSecC] = useState({});
  const [secD, setSecD] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const aTotal = SECTION_A.length;
  const bTotal = SECTION_B.length;
  const cTotal = SECTION_C.length;
  const dTotal = SECTION_D.length;
  const grandTotal = aTotal + bTotal + cTotal + dTotal;

  const aAnswered = Object.keys(secA).length;
  const bAnswered = Object.keys(secB).length;
  const cAnswered = Object.keys(secC).length;
  const dAnswered = Object.keys(secD).length;
  const totalAnswered = aAnswered + bAnswered + cAnswered + dAnswered;
  const allAnswered = totalAnswered === grandTotal;

  function handleA(id, val) { setSecA((p) => ({ ...p, [id]: val })); }
  function handleB(id, val) { setSecB((p) => ({ ...p, [id]: val })); }
  function handleC(id, val) { setSecC((p) => ({ ...p, [id]: val })); }
  function handleD(id, val) { setSecD((p) => ({ ...p, [id]: val })); }

  function handleSubmit() { if (allAnswered) setSubmitted(true); }
  function handleReset() { setSecA({}); setSecB({}); setSecC({}); setSecD({}); setSubmitted(false); setCopied(false); }

  const aScores = submitted ? scoreA(secA) : null;
  const bScore  = submitted ? scoreB(secB) : null;
  const cScores = submitted ? scoreC(secC) : null;
  const dScores = submitted ? scoreD(secD) : null;

  const growingEdges   = submitted ? getGrowingEdges(cScores, dScores) : [];
  const recommendations = submitted ? getModuleRecommendations(aScores, bScore, cScores, dScores) : [];

  function handleCopy() {
    if (!submitted) return;
    const lines = [
      'Self-Assessment Results',
      `Date: ${new Date().toLocaleDateString()}`,
      '',
      '── Section A: Readiness Signals ──',
      `Readiness signals: ${aScores.LATE_GREEN} / ${aTotal}  |  Broader integration: ${aScores.INTEGRAL} / ${aTotal}  |  Intellectual identification: ${aScores.INTELLECTUAL} / ${aTotal}`,
      '',
      '── Section B: Vision-Logic Thinking ──',
      `Metasystematic score: ${bScore.total} / ${bScore.max} (${bScore.pct}%)`,
      '',
      '── Section C: Shadow Patterns Detected ──',
      ...Object.entries(cScores.shadowCount).filter(([, c]) => c > 0).map(([p, c]) => `${SHADOW_LABELS[p]}: ${c} indicator(s)`),
      '',
      '── Section D: Cross-Line Profile ──',
      ...Object.entries(dScores).map(([line, avg]) => `${line}: ${avg.toFixed(1)} / 4`),
      '',
      '── Growing Edges ──',
      ...growingEdges.map((e) => `• ${e.area}`),
      '',
      '── Recommended Modules ──',
      ...recommendations.map((m) => `• ${m.title}`),
      '',
      'Note: Developmental self-assessments are least reliable at the level one is transitioning toward.',
      'Treat these results as one data point among many, and seek feedback from people who know you well.',
    ];
    navigator.clipboard.writeText(lines.join('\n')).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // Colours for line bars
  const LINE_COLORS = {
    Emotional: 'var(--ifm-color-warning)',
    Somatic: 'var(--ifm-color-success)',
    Relational: 'var(--ifm-color-info)',
    Moral: 'var(--ifm-color-danger)',
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', fontFamily: 'inherit' }}>

      {/* ── Ethical framing ── */}
      <div style={{ padding: '1.25rem 1.5rem', background: 'var(--ifm-color-warning-lightest, #fffbeb)', border: '2px solid var(--ifm-color-warning)', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
          ⚠️ This assessment is designed for learners who are already well into this transition.
        </p>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', lineHeight: 1.6 }}>
          If you are earlier in your developmental journey, the{' '}
          <Link to="/docs/maps/amber-rational-progress-assessment">Amber → Rational</Link>{' '}
          or Rational → Pluralistic assessments will be more appropriate starting points. Completing this
          assessment before reaching this stage of development is likely to produce misleading results.
        </p>
      </div>

      {/* ── Self-report reliability caution ── */}
      <div style={{ padding: '1rem 1.25rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
        <strong>On the reliability of self-assessment at this level:</strong> Cook-Greuter's research
        consistently shows that self-report is least reliable at the stage one is transitioning{' '}
        <em>toward</em>. Sophisticated developmental frameworks make it easy to identify intellectually
        with higher stages without yet embodying them. This assessment is structured around
        behavioural and phenomenological scenarios rather than belief-statements to reduce (but not
        eliminate) that distortion. Treat your results as one data point among many, and actively
        seek feedback from people who know you well.
      </div>

      {/* ── Facilitation callout ── */}
      <div style={{ padding: '1rem 1.25rem', background: 'var(--ifm-color-primary-lightest, #eff6ff)', border: '1px solid var(--ifm-color-primary-light)', borderRadius: '0.75rem', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
        <strong>Consider Facilitated Support:</strong> For anyone seriously exploring this stage of
        development, working with a trained developmental coach is strongly recommended. Self-directed
        inquiry at this level has a high rate of shadow-reinforcing rather than shadow-illuminating
        outcomes. See the Facilitation Guide for Developmental Coaches (forthcoming, Issue #57) for
        how to find and work with a qualified practitioner.
      </div>

      {!submitted && (
        <>
          {/* Progress indicator */}
          <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)' }}>
            Progress: {totalAnswered} / {grandTotal} questions answered
            <MiniBar value={totalAnswered} max={grandTotal} />
          </div>

          {/* ── Section A ── */}
          <h2 style={{ borderBottom: '2px solid var(--ifm-color-emphasis-200)', paddingBottom: '0.5rem' }}>
            Section A — Readiness Signals Recognition
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.25rem' }}>
            These 8 scenarios explore whether you are genuinely experiencing this readiness or
            primarily identifying with it intellectually. Answer based on what you actually notice
            yourself doing, not what you aspire to do.
          </p>

          {SECTION_A.map((q, idx) => (
            <fieldset key={q.id} style={{ border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
              <legend style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                A{idx + 1}. {q.title}
              </legend>
              <p style={{ marginTop: '0.25rem', marginBottom: '0.75rem', fontSize: '0.9rem', lineHeight: 1.5 }}>{q.text}</p>
              {q.options.map((opt) => (
                <label key={opt.value} style={{ display: 'block', marginBottom: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <input
                    type="radio"
                    name={`secA-${q.id}`}
                    value={opt.value}
                    checked={secA[q.id] === opt.value}
                    onChange={() => handleA(q.id, opt.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {opt.label}
                </label>
              ))}
            </fieldset>
          ))}

          {/* ── Section B ── */}
          <h2 style={{ borderBottom: '2px solid var(--ifm-color-emphasis-200)', paddingBottom: '0.5rem', marginTop: '2rem' }}>
            Section B — Vision-Logic &amp; Metasystematic Thinking
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.25rem' }}>
            These 6 questions present brief cognitive tasks — framework triangulation exercises — rather
            than self-report. Choose the response that most accurately describes how you would actually
            engage with the situation.
          </p>

          {SECTION_B.map((q, idx) => (
            <fieldset key={q.id} style={{ border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
              <legend style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                B{idx + 1}. {q.title}
              </legend>
              <p style={{ marginTop: '0.25rem', marginBottom: '0.75rem', fontSize: '0.9rem', lineHeight: 1.5, fontStyle: 'italic' }}>{q.task}</p>
              {q.options.map((opt) => (
                <label key={opt.value} style={{ display: 'block', marginBottom: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <input
                    type="radio"
                    name={`secB-${q.id}`}
                    value={opt.value}
                    checked={secB[q.id] === opt.value}
                    onChange={() => handleB(q.id, opt.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {opt.label}
                </label>
              ))}
            </fieldset>
          ))}

          {/* ── Section C ── */}
          <h2 style={{ borderBottom: '2px solid var(--ifm-color-emphasis-200)', paddingBottom: '0.5rem', marginTop: '2rem' }}>
            Section C — Shadow Pattern Detection
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.25rem' }}>
            These 10 questions specifically probe known shadow patterns at this stage. Honest responses here are
            more useful than aspirational ones. There are no "bad" answers — shadow awareness is itself
            a sign of development.
          </p>

          {SECTION_C.map((q, idx) => (
            <fieldset key={q.id} style={{ border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
              <legend style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                C{idx + 1}. {q.title}
              </legend>
              <p style={{ marginTop: '0.25rem', marginBottom: '0.75rem', fontSize: '0.9rem', lineHeight: 1.5 }}>{q.text}</p>
              {q.options.map((opt) => (
                <label key={opt.value} style={{ display: 'block', marginBottom: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <input
                    type="radio"
                    name={`secC-${q.id}`}
                    value={opt.value}
                    checked={secC[q.id] === opt.value}
                    onChange={() => handleC(q.id, opt.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {opt.label}
                </label>
              ))}
            </fieldset>
          ))}

          {/* ── Section D ── */}
          <h2 style={{ borderBottom: '2px solid var(--ifm-color-emphasis-200)', paddingBottom: '0.5rem', marginTop: '2rem' }}>
            Section D — Cross-Line Embodiment Profile
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.25rem' }}>
            These 8 questions assess emotional, somatic, relational, and moral line development
            alongside cognitive development. Cognitive development frequently outpaces other lines
            at this stage — this section helps identify where integration work is most needed.
          </p>

          {SECTION_D.map((q, idx) => (
            <fieldset key={q.id} style={{ border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
              <legend style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                D{idx + 1}. <em style={{ fontWeight: 400 }}>[{q.line}]</em> {q.text}
              </legend>
              {q.options.map((opt) => (
                <label key={opt.value} style={{ display: 'block', marginBottom: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <input
                    type="radio"
                    name={`secD-${q.id}`}
                    value={opt.value}
                    checked={secD[q.id] === opt.value}
                    onChange={() => handleD(q.id, opt.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {opt.label}
                </label>
              ))}
            </fieldset>
          ))}

          <button
            className="button button--primary button--lg"
            onClick={handleSubmit}
            disabled={!allAnswered}
            style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}
          >
            See My Results ({totalAnswered}/{grandTotal})
          </button>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          RESULTS PAGE
      ══════════════════════════════════════════════════════════════ */}
      {submitted && aScores && bScore && cScores && dScores && (
        <>
          {/* ── Self-report reliability caution (repeated on results) ── */}
          <div style={{ padding: '1rem 1.25rem', background: 'var(--ifm-color-warning-lightest, #fffbeb)', border: '2px solid var(--ifm-color-warning)', borderRadius: '0.75rem', marginBottom: '1.75rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
            <strong>Important:</strong> "Developmental self-assessments are least reliable at the level
            one is transitioning toward. Treat these results as one data point among many, and seek
            feedback from people who know you well." — after Cook-Greuter
          </div>

          {/* ── Section A Results ── */}
          <h2>Section A — Readiness Signals Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Genuine readiness signals', key: 'LATE_GREEN', color: 'var(--ifm-color-success)' },
              { label: 'Signs of broader integration', key: 'INTEGRAL', color: 'var(--ifm-color-primary)' },
              { label: 'Intellectual identification', key: 'INTELLECTUAL', color: 'var(--ifm-color-warning)' },
              { label: 'Earlier-pattern responses', key: 'EARLY_GREEN', color: 'var(--ifm-color-emphasis-500)' },
            ].map(({ label, key, color }) => (
              <div key={key} style={{ padding: '0.75rem', border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color }}>{aScores[key]}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--ifm-color-emphasis-500)' }}> / {aTotal}</span></div>
                <MiniBar value={aScores[key]} max={aTotal} color={color} />
              </div>
            ))}
          </div>

          {aScores.INTELLECTUAL >= 3 && (
            <div style={{ padding: '0.75rem 1rem', background: 'var(--ifm-color-warning-lightest, #fffbeb)', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
              ⚠️ <strong>Note:</strong> A notable proportion of your Section A responses indicate intellectual identification rather than embodied readiness. This is a common and important signal — the ideas are understood, but the embodied reorganisation that marks genuine development may still be in progress.
            </div>
          )}

          {/* ── Section B Results ── */}
          <h2 style={{ marginTop: '1.75rem' }}>Section B — Vision-Logic Capacity</h2>
          <div style={{ padding: '1rem 1.25rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
              Metasystematic score: <strong>{bScore.total} / {bScore.max}</strong> ({bScore.pct}%)
            </div>
            <MiniBar value={bScore.pct} max={100} color={bScore.pct >= 67 ? 'var(--ifm-color-success)' : bScore.pct >= 33 ? 'var(--ifm-color-warning)' : 'var(--ifm-color-danger)'} />
            <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--ifm-color-emphasis-700)' }}>
              {bScore.pct >= 67
                ? 'Your responses suggest genuine metasystematic reasoning capacity — you can triangulate frameworks, identify structural patterns across levels, and use tension between maps as diagnostic information.'
                : bScore.pct >= 33
                ? 'Your responses suggest emerging metasystematic capacity. You can identify cross-system patterns but may still rely on single-framework explanations under pressure.'
                : 'Your responses suggest systemic (rather than metasystematic) reasoning as the current centre of gravity. This is an important growing edge for this stage of development. The Vision-Logic & Metasystematic Reasoning module is recommended.'}
            </p>
          </div>

          {/* ── Section C Results ── */}
          <h2 style={{ marginTop: '1.75rem' }}>Section C — Shadow Pattern Profile</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1rem' }}>
            Shadow patterns are not failures — they are predictable developmental challenges at this
            stage. Naming them is the first move of integration.
          </p>
          <div style={{ marginBottom: '1.25rem' }}>
            {Object.entries(SHADOW_LABELS).map(([pattern, label]) => {
              const sc = cScores.shadowCount[pattern];
              const aw = cScores.awareCount[pattern];
              const total_q = SECTION_C.filter((q) => q.shadow === pattern).length;
              return (
                <div key={pattern} style={{ marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                      {sc > 0 ? `${sc} indicator${sc > 1 ? 's' : ''}` : aw > 0 ? 'aware' : 'mixed'}
                    </span>
                  </div>
                  <MiniBar
                    value={sc}
                    max={total_q}
                    color={sc === 0 ? 'var(--ifm-color-success)' : sc >= 2 ? 'var(--ifm-color-danger)' : 'var(--ifm-color-warning)'}
                  />
                </div>
              );
            })}
          </div>

          {/* ── Section D Results ── */}
          <h2 style={{ marginTop: '1.75rem' }}>Section D — Cross-Line Embodiment Profile</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1rem' }}>
            Scores below 2.5 indicate a meaningful gap between cognitive development and embodiment on
            that line — a common and important growing edge at this transition.
          </p>
          {Object.entries(dScores).map(([line, avg]) => (
            <div key={line} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600 }}>{line} Line</span>
                <span style={{ color: avg >= 3 ? 'var(--ifm-color-success)' : avg >= 2 ? 'var(--ifm-color-warning)' : 'var(--ifm-color-danger)', fontWeight: 600 }}>
                  {avg.toFixed(1)} / 4
                </span>
              </div>
              <MiniBar value={avg} max={4} color={LINE_COLORS[line] || 'var(--ifm-color-primary)'} />
            </div>
          ))}

          {/* ── Growing Edges ── */}
          {growingEdges.length > 0 && (
            <>
              <h2 style={{ marginTop: '1.75rem' }}>Named Growing Edges</h2>
              {growingEdges.map((edge, i) => (
                <div key={i} style={{ padding: '0.85rem 1rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.65rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.95rem' }}>{edge.area}</div>
                  <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--ifm-color-emphasis-700)' }}>{edge.detail}</div>
                </div>
              ))}
            </>
          )}

          {/* ── Module Recommendations ── */}
          <h2 style={{ marginTop: '1.75rem' }}>Personalised Module Recommendations</h2>
          {recommendations.map((mod) => (
            <div key={mod.to} style={{ marginBottom: '0.5rem' }}>
              <Link className="button button--secondary button--block" to={mod.to}>
                {mod.title} →
              </Link>
            </div>
          ))}

          {/* ── Export & Reset ── */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="button button--primary" onClick={handleCopy}>
              {copied ? 'Copied ✓' : 'Export to Journal'}
            </button>
            <button className="button button--outline" onClick={handleReset}>
              Retake Assessment
            </button>
          </div>

          <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', lineHeight: 1.6 }}>
            Revisit this assessment every 30–60 days. Developmental change is slow and uneven — a
            pattern across multiple data points is more reliable than any single result. Share your
            results with someone who knows you well and ask for their honest response.
          </p>
        </>
      )}
    </div>
  );
}
