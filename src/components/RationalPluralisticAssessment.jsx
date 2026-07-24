import React, { useState } from 'react';
import Link from '@docusaurus/Link';

// ═══════════════════════════════════════════════════════════════════════════════
// Section A: Late-Orange Recognition (8 scenario-based questions)
// Response options: o = Orange-default, t = transitional, p = Pluralistic-default
// ═══════════════════════════════════════════════════════════════════════════════

const QUESTIONS_A = [
  {
    id: 'a1',
    text: 'You have achieved most of the goals you set for your career a decade ago. By external measures, you are successful. But lately, you find yourself asking what it was all for — and the question does not go away when you set new goals. You:',
    options: [
      { value: 'o', label: 'Set more ambitious goals. I probably just need a new challenge to feel engaged again.' },
      { value: 't', label: 'Take some time to reflect. Something about the question feels important, even though I cannot name what is missing yet.' },
      { value: 'p', label: 'Recognize that achievement was never going to answer the meaning question — and begin exploring what might.' },
    ],
  },
  {
    id: 'a2',
    text: 'A younger colleague asks for career advice. They are talented and driven, but they also mention wanting work that "matters beyond the numbers." Your honest first thought is:',
    options: [
      { value: 'o', label: 'They need to build their skills and credibility first — impact follows competence. Meaning is something you earn.' },
      { value: 't', label: 'I understand the impulse, but I am not sure how to advise them. I have been asking myself similar questions lately.' },
      { value: 'p', label: 'That is a legitimate question at any career stage. Let us talk about what "mattering" looks like for them, not just what looks good on a résumé.' },
    ],
  },
  {
    id: 'a3',
    text: 'You are leading a project that requires coordination across departments with conflicting priorities. Your usual approach — analyzing tradeoffs and optimizing for the best aggregate outcome — is not working because different stakeholders define "best" differently. You:',
    options: [
      { value: 'o', label: 'Gather more data and build a stronger case. If the analysis is thorough enough, the right answer will become clear.' },
      { value: 't', label: 'Try to understand why different stakeholders see the situation differently. Maybe "best" is not a single answer.' },
      { value: 'p', label: 'Shift from optimizing to facilitating. The goal is not to find the one right answer but to create a process where multiple legitimate perspectives can shape the outcome.' },
    ],
  },
  {
    id: 'a4',
    text: 'You read an article arguing that many of society\'s most difficult problems cannot be solved by individual expertise alone — they require collective intelligence and relational trust. Your honest reaction is:',
    options: [
      { value: 'o', label: 'Skeptical. Collective decision-making often produces mediocre compromises. Real solutions come from capable individuals thinking clearly.' },
      { value: 't', label: 'Intrigued but cautious. I have seen groups fail, but I have also seen individuals miss things that others caught.' },
      { value: 'p', label: 'This resonates. The problems I care most about exist in a web of relationships, not a spreadsheet. Individual expertise is necessary but insufficient.' },
    ],
  },
  {
    id: 'a5',
    text: 'Someone describes your worldview as "rational" — not as a compliment or an insult, just an observation that you tend to privilege logic, evidence, and systematic thinking. You:',
    options: [
      { value: 'o', label: 'Accept it as accurate. Rationality is the most reliable way to understand reality — calling it a "worldview" rather than a method suggests false equivalence between reason and unreason.' },
      { value: 't', label: 'Pause. I have always assumed rationality was the baseline, not a perspective among others. The framing makes me curious about what I might be missing.' },
      { value: 'p', label: 'Appreciate the observation. I can see that my way of making sense is one valid approach among others, each with its own strengths and blind spots.' },
    ],
  },
  {
    id: 'a6',
    text: 'You are in a discussion where someone shares a perspective rooted in lived experience that contradicts data you have studied. The data is robust. Your first impulse is to:',
    options: [
      { value: 'o', label: 'Share the data. Lived experience is valuable but it is not evidence — one person\'s story does not overturn systematic research.' },
      { value: 't', label: 'Listen carefully first, then share the data. I want to honour the experience while also bringing in what the evidence shows.' },
      { value: 'p', label: 'Hold both. The data tells one part of the story; the lived experience tells another. Neither cancels the other — the question is how they illuminate different dimensions of the same situation.' },
    ],
  },
  {
    id: 'a7',
    text: 'You experience a personal setback that has no clear external cause — no one to blame, no process failure to fix. You just feel low. Your first response is:',
    options: [
      { value: 'o', label: 'Analyze what went wrong and make a plan. If I cannot find a cause, I will focus on actionable steps to feel better.' },
      { value: 't', label: 'Sit with it for a while. I usually try to fix things, but this feels like something that needs to be felt rather than solved.' },
      { value: 'p', label: 'Allow the feeling without needing to explain or fix it. Not everything has a solution — some things ask to be experienced.' },
    ],
  },
  {
    id: 'a8',
    text: 'You are invited to join a discussion group that uses collaborative dialogue practices — no debating, no persuading, just building understanding together. Your gut reaction is:',
    options: [
      { value: 'o', label: 'Skeptical. Without someone challenging bad ideas, how does truth emerge? Dialogue without debate sounds like a recipe for groupthink.' },
      { value: 't', label: 'Curious but cautious. I have seen debate shut people down, but I worry dialogue without critique might let unchallenged assumptions go unexamined.' },
      { value: 'p', label: 'Interested. I have learned that the best ideas often emerge from spaces where people feel safe enough to think out loud, not just defend positions.' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section B: Pluralistic Capacities (12 questions, 5 domains)
// ═══════════════════════════════════════════════════════════════════════════════

const QUESTIONS_B = [
  // ── Domain: Empathy & Multiple Perspectives ──
  {
    id: 'b1',
    domain: 'empathy',
    text: 'A colleague describes an experience of discrimination at work. The specific incident falls outside your own experience, and part of you wonders if they are overreacting. You:',
    options: [
      { value: 'o', label: 'Reserve judgment. Without having been there, I cannot assess whether the situation was genuinely discriminatory or misinterpreted.' },
      { value: 't', label: 'Listen and ask questions. I do not have their experience, but I can try to understand what this was like for them.' },
      { value: 'p', label: 'Trust their account. My role is not to adjudicate whether their experience qualifies — it is to understand how this affects them and what support they need.' },
    ],
  },
  {
    id: 'b2',
    domain: 'empathy',
    text: 'You are reading about a community whose values differ significantly from your own — not in ways that harm others, but in ways that feel unfamiliar and even uncomfortable to you. Your response is:',
    options: [
      { value: 'o', label: 'Note the differences and move on. I can respect their choices without needing to understand them deeply.' },
      { value: 't', label: 'Try to imagine what it would be like to see the world through their framework. I do not need to agree to understand.' },
      { value: 'p', label: 'Recognize that my discomfort is data about my own framework, not theirs. My inability to immediately relate does not mean their values are less coherent.' },
    ],
  },
  {
    id: 'b3',
    domain: 'empathy',
    text: 'During a team conflict, you notice that one person\'s perspective is being consistently dismissed — not because it is wrong, but because they express it differently than the dominant communication style. You:',
    options: [
      { value: 'o', label: 'Focus on the content of what they are saying. If their point is valid, communication style should not matter — the best ideas should win on their merits.' },
      { value: 't', label: 'Notice the pattern and feel unsettled by it. I want to make space for them, but I am not sure how to shift the dynamic without making it awkward.' },
      { value: 'p', label: 'Intervene. "I notice we have not fully heard this perspective. Can we create space for [name] to elaborate, and can we listen in a way that makes that easier?"' },
    ],
  },
  // ── Domain: Contextual Ethics ──
  {
    id: 'b4',
    domain: 'ethics',
    text: 'Your organization has a clear policy about a particular situation. A colleague wants to make an exception because the policy, applied here, would produce an outcome that feels unjust to everyone involved. You:',
    options: [
      { value: 'o', label: 'Apply the policy. Consistent application is what makes policies fair. Exceptions, even well-intentioned ones, undermine the system.' },
      { value: 't', label: 'Feel torn. The policy exists for good reasons, but this specific case makes me question whether the policy itself might need revisiting.' },
      { value: 'p', label: 'Ask: what principle is the policy trying to serve, and is that principle actually being served in this case? Good policy serves justice — when it does not, the policy needs to evolve.' },
    ],
  },
  {
    id: 'b5',
    domain: 'ethics',
    text: 'Two colleagues make compelling but opposing ethical arguments about the same decision. Both are well-reasoned. Both care deeply. You are asked to help resolve the impasse. You:',
    options: [
      { value: 'o', label: 'Analyze which argument has stronger logical support and evidence. Ethical reasoning should converge on the most justified position.' },
      { value: 't', label: 'Explore what values each person is prioritizing. Maybe they are not actually disagreeing about the facts but about what matters most.' },
      { value: 'p', label: 'Recognize that some ethical questions are genuinely ambiguous — not because the reasoning is flawed but because multiple legitimate frameworks can apply. The task is not to determine who is right but to make the wisest contextual decision possible.' },
    ],
  },
  // ── Domain: Ecological & Systems Awareness ──
  {
    id: 'b6',
    domain: 'ecology',
    text: 'Your team\'s project is successful by every internal metric. But an outside consultant points out that the project\'s success has come at a cost to another department that your team never considered. You:',
    options: [
      { value: 'o', label: 'Acknowledge the issue but note that optimizing across all departments is not our team\'s responsibility — each team is accountable for its own metrics.' },
      { value: 't', label: 'Take the feedback seriously. Our metrics should probably account for cross-team impacts, even if that was not originally in our scope.' },
      { value: 'p', label: 'Redefine success. A project that succeeds in isolation but damages the larger system has not actually succeeded. The next iteration should include cross-system impact from the start.' },
    ],
  },
  {
    id: 'b7',
    domain: 'ecology',
    text: 'You are making a personal decision — where to live, what to buy, how to travel — and you realize that the "best" choice for you personally has environmental costs that affect people you will never meet. You:',
    options: [
      { value: 'o', label: 'Make the choice that works best for me. Individual choices have negligible systemic impact — structural change requires policy, not personal sacrifice.' },
      { value: 't', label: 'Try to balance personal benefit with broader impact. I do not need to be perfect, but I do not want to ignore the consequences either.' },
      { value: 'p', label: 'Recognize that my wellbeing is inseparable from the systems I participate in. A choice that harms those systems ultimately harms me too — not metaphorically, but materially, over time.' },
    ],
  },
  // ── Domain: Inclusive Dialogue ──
  {
    id: 'b8',
    domain: 'dialogue',
    text: 'You are in a meeting where the conversation is lively but only three people are speaking. You notice several others who have not contributed, and you suspect they have valuable perspectives. You:',
    options: [
      { value: 'o', label: 'Assume they will speak up if they have something to add. It is not my responsibility to manage other people\'s participation.' },
      { value: 't', label: 'Feel uncomfortable about the dynamic but am not sure how to invite quieter voices without putting them on the spot.' },
      { value: 'p', label: 'Say: "I would love to hear from people who have not spoken yet. No pressure — just want to make sure we are not missing perspectives that might shift how we see this."' },
    ],
  },
  {
    id: 'b9',
    domain: 'dialogue',
    text: 'Someone makes a statement in a group discussion that you strongly believe is wrong — not offensive, just factually incorrect. The group seems to be accepting it uncritically. You:',
    options: [
      { value: 'o', label: 'Challenge it directly with evidence. If the statement is wrong, it needs to be corrected — letting it stand is intellectually dishonest.' },
      { value: 't', label: 'Acknowledge that I see it differently while trying to understand why others are not pushing back. Maybe I am missing context that makes the statement less wrong than it seems.' },
      { value: 'p', label: 'Ask: "I am hearing this differently — can you help me understand the basis for this claim?" Correction matters less than creating conditions where the group can examine its own assumptions together.' },
    ],
  },
  {
    id: 'b10',
    domain: 'dialogue',
    text: 'A decision needs to be made, and the group is divided. Some want to keep discussing until consensus emerges. Others want to vote and move on. You have a clear preference but also see value in both approaches. You:',
    options: [
      { value: 'o', label: 'Advocate for the most efficient process. Extended discussion has diminishing returns — at some point, a decision is better than more deliberation.' },
      { value: 't', label: 'Suggest a compromise: one more round of discussion with a time limit, then a vote. Best of both worlds.' },
      { value: 'p', label: 'Ask: "What kind of decision does this need to be?" Some decisions need consensus because they require ongoing commitment. Others can be made by vote and revised later. The process should match the decision\'s nature, not our default preference.' },
    ],
  },
  // ── Domain: Relativism Recognition ──
  {
    id: 'b11',
    domain: 'relativism',
    text: 'You are in a discussion where someone says: "Everyone\'s truth is valid. There is no objective standard — it is all just perspective." You:',
    options: [
      { value: 'o', label: 'Push back. That position is self-refuting — if all truth is relative, then the claim "all truth is relative" is itself just a perspective with no claim to truth.' },
      { value: 't', label: 'Acknowledge the value of recognizing multiple perspectives while noting that not all claims are equally well-supported. Some positions are more justified than others, even if no position is absolute.' },
      { value: 'p', label: 'Engage the tension. Yes, all knowing is perspectival — but that does not mean all perspectives are equally adequate. The challenge is to recognize both: the situatedness of all knowledge AND the real difference between better and worse justifications.' },
    ],
  },
  {
    id: 'b12',
    domain: 'relativism',
    text: 'You encounter a cultural practice that feels genuinely harmful to you — not just different, but causing real suffering. A colleague tells you: "We should not impose our values. It is their culture." You:',
    options: [
      { value: 'o', label: 'Reject the relativist framing. Harm is harm, and some values are universal enough that they apply across cultures — dignity, safety, consent.' },
      { value: 't', label: 'Struggle. I believe in cultural respect, but I also believe some things are wrong regardless of context. I am not sure where to draw the line.' },
      { value: 'p', label: 'Recognize this as a genuine developmental tension. Cultural humility is real — AND some practices cause harm that should be named. The task is not to resolve the tension by choosing one side but to hold it with enough care that neither cultural respect nor harm reduction is abandoned.' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section C: Green Shadow Awareness (6 questions)
// Response options reveal degree of shadow awareness
// ═══════════════════════════════════════════════════════════════════════════════

const QUESTIONS_C = [
  {
    id: 'c1',
    shadow: 'epistemic',
    text: 'During a group discussion about a sensitive topic, someone makes a claim you believe is both false and harmful. But saying so might make you seem "un-inclusive" or "judgmental." You:',
    options: [
      { value: 'b', label: 'Stay quiet. Challenging someone\'s belief in this space would violate the trust and inclusivity we have worked to build.' },
      { value: 'a', label: 'Feel uncomfortable staying quiet but am not sure how to challenge the claim without damaging the relational space.' },
      { value: 'i', label: 'Name the tension directly: "I value the inclusive space we have created, and I also believe some claims need to be examined, even — especially — in spaces that value inclusivity. Can we hold both?"' },
    ],
  },
  {
    id: 'c2',
    shadow: 'aggression',
    text: 'In a community you belong to that values progressive ideals, someone expresses a view that deviates from the group consensus — not bigoted, just different. The group\'s response is sharp and shaming. You:',
    options: [
      { value: 'b', label: 'Stay silent or join the group response. If the person is on the wrong side of this issue, the group\'s reaction is proportionate.' },
      { value: 'a', label: 'Feel uncomfortable with how harsh the response is, but I do not want to seem like I am defending a problematic position.' },
      { value: 'i', label: 'Speak to the dynamic, not the position: "I share the values behind this reaction, and I am also noticing that how we are responding might make it harder for people to think out loud here. Can we engage the idea without shaming the person?"' },
    ],
  },
  {
    id: 'c3',
    shadow: 'consensus',
    text: 'Your team needs to act, but one person disagrees with the proposed direction. The group has been trying to reach consensus for two meetings. You sense the discussion is looping. You:',
    options: [
      { value: 'b', label: 'Keep discussing until everyone is on board. Moving forward without full agreement would violate the principle that every voice matters.' },
      { value: 'a', label: 'Feel frustrated with the impasse but do not want to be the one who pushes a decision through over someone\'s objection.' },
      { value: 'i', label: 'Name the pattern: "I believe every voice matters. I also believe that indefinitely deferring action because we cannot reach unanimity is a different kind of harm. Can we agree on a process for making this decision — one that honours dissent while allowing us to move forward?"' },
    ],
  },
  {
    id: 'c4',
    shadow: 'paralysis',
    text: 'Two proposals are on the table, and you genuinely cannot determine which is better. Both have strong cases. Both have real tradeoffs. A decision is needed today. You:',
    options: [
      { value: 'b', label: 'Argue that if we cannot confidently determine which is better, we should not choose — making a decision under uncertainty risks privileging one perspective over another.' },
      { value: 'a', label: 'Want to defer the decision. I need more time to ensure I am not unconsciously favouring one framework over the other.' },
      { value: 'i', label: 'Recognize that some decisions must be made under uncertainty and that refusing to choose is itself a choice — with its own consequences. I will make the best judgment I can, document my reasoning, and stay open to revision.' },
    ],
  },
  {
    id: 'c5',
    shadow: 'performative',
    text: 'You post publicly in support of a social cause. Later, privately, you realize you have not actually done anything concrete — no donation, no volunteering, no changed behaviour. The post was the action. You:',
    options: [
      { value: 'b', label: 'Feel that the post itself is a form of action — raising awareness is meaningful, and not everyone has capacity for more.' },
      { value: 'a', label: 'Feel a twinge of discomfort but set it aside. I genuinely care about the cause; the post reflected that. The discomfort is probably just guilt I do not need to carry.' },
      { value: 'i', label: 'Name the gap honestly to myself: public expression and private action are not the same thing. If this cause matters to me, what is one concrete thing I can do that no one will see me do?' },
    ],
  },
  {
    id: 'c6',
    shadow: 'bypass',
    text: 'You are in conflict with someone. A part of you wants to resolve it, but another part wants to say: "At the deepest level, we are all one — this conflict is ultimately an illusion." You:',
    options: [
      { value: 'b', label: 'Share the oneness perspective. If both of us can see that our separateness is an illusion, the conflict dissolves — this is the most transformative resolution possible.' },
      { value: 'a', label: 'Feel the pull of the nondual perspective but also sense it might be avoiding something. I am not sure which instinct to trust.' },
      { value: 'i', label: 'Recognize the bypass. The fact that at the deepest level we are one does not mean the relational rupture at this level is not real and does not need repair. Transcendence that skips the human work of apology, accountability, and rebuilding trust is not transcendence — it is avoidance in spiritual language.' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Domain definitions for Section B
// ═══════════════════════════════════════════════════════════════════════════════

const DOMAINS = {
  empathy: { label: 'Empathy & Multiple Perspectives', indices: [0, 1, 2] },
  ethics: { label: 'Contextual Ethics', indices: [3, 4] },
  ecology: { label: 'Ecological & Systems Awareness', indices: [5, 6] },
  dialogue: { label: 'Inclusive Dialogue', indices: [7, 8, 9] },
  relativism: { label: 'Relativism Recognition', indices: [10, 11] },
};

// ═══════════════════════════════════════════════════════════════════════════════
// Results descriptions and module recommendations
// ═══════════════════════════════════════════════════════════════════════════════

function generateProfile(sectionA, sectionB) {
  const aCounts = { o: 0, t: 0, p: 0 };
  Object.values(sectionA).forEach((v) => { if (aCounts[v] !== undefined) aCounts[v]++; });

  const bCounts = { o: 0, t: 0, p: 0 };
  Object.values(sectionB).forEach((v) => { if (bCounts[v] !== undefined) bCounts[v]++; });

  const totalB = Object.keys(sectionB).length || 1;
  const emerging = [];   // domains where t dominates
  const consolidated = []; // domains where p dominates
  const growingEdges = []; // domains where o dominates

  Object.entries(DOMAINS).forEach(([key, domain]) => {
    const vals = domain.indices
      .map((i) => {
        const qId = QUESTIONS_B[i]?.id;
        return sectionB[qId];
      })
      .filter(Boolean);

    const o = vals.filter((v) => v === 'o').length;
    const t = vals.filter((v) => v === 't').length;
    const p = vals.filter((v) => v === 'p').length;

    if (p >= t && p >= o && p > 0) consolidated.push(domain.label);
    else if (t >= p && t >= o) emerging.push(domain.label);
    else growingEdges.push(domain.label);
  });

  // Facilitated support trigger: >=5 Orange in A AND <=4 Pluralistic in B
  const needsSupport = aCounts.o >= 5 && bCounts.p <= 4;

  return { aCounts, bCounts, totalB, emerging, consolidated, growingEdges, needsSupport };
}

function computeDomainScores(sectionB) {
  return Object.fromEntries(
    Object.entries(DOMAINS).map(([key, domain]) => {
      const vals = domain.indices
        .map((i) => {
          const qId = QUESTIONS_B[i]?.id;
          return sectionB[qId];
        })
        .filter(Boolean);
      const o = vals.filter((v) => v === 'o').length;
      const t = vals.filter((v) => v === 't').length;
      const p = vals.filter((v) => v === 'p').length;
      return [key, { label: domain.label, o, t, p }];
    })
  );
}

function getModuleRecommendations(sectionA, sectionB, sectionC) {
  const aCounts = { o: 0, t: 0, p: 0 };
  Object.values(sectionA).forEach((v) => { if (aCounts[v] !== undefined) aCounts[v]++; });

  const bCounts = { o: 0, t: 0, p: 0 };
  Object.values(sectionB).forEach((v) => { if (bCounts[v] !== undefined) bCounts[v]++; });

  // Count Section C 'b' responses (blind spots)
  const cShadow = Object.values(sectionC).filter((v) => v === 'b').length;

  if (aCounts.o >= 5 && bCounts.p <= 3) {
    return {
      title: 'Late Orange — Signs of Disillusionment',
      description: 'Your responses suggest you may be experiencing the characteristic signals of late-Orange development: achievement no longer fully satisfies, individual optimization has diminishing returns, and questions about meaning are becoming harder to dismiss. This is not a failure — it is a developmental signal.',
      rationale: 'These modules address the specific experience you are describing: the gap between external success and internal meaning, and the first steps toward a more pluralistic worldview.',
      modules: [
        { title: 'Late Orange Disillusionment', to: '/docs/modules/late-orange-disillusionment' },
        { title: 'Rational/Orange Stage Orientation', to: '/docs/modules/rational-orange-orientation' },
        { title: 'Cognitive Dissonance Bridge', to: '/docs/modules/cognitive-dissonance-bridge' },
      ],
    };
  }

  if (bCounts.t >= 5 && bCounts.p <= 5) {
    return {
      title: 'In Transition — Emerging Pluralistic Capacities',
      description: 'Your responses show genuine movement toward Pluralistic ways of making meaning. Several capacities are emerging but not yet consolidated — you are doing the developmental work. The discomfort of transition is the sensation of a worldview reorganizing.',
      rationale: 'These modules strengthen the specific domains where your Pluralistic capacities are developing and provide structured practice for consolidation.',
      modules: [
        { title: 'Empathy & Perspective-Plurality', to: '/docs/modules/empathy-perspective-plurality' },
        { title: 'Contextual Ethics & Moral Complexity', to: '/docs/modules/contextual-ethics-moral-complexity' },
        { title: 'Authentic Dialogue & Collaborative Meaning-Making', to: '/docs/modules/authentic-dialogue-collaborative-meaning' },
      ],
    };
  }

  if (bCounts.p >= 6 && cShadow >= 2) {
    return {
      title: 'Pluralistic Strengths — With Growing Shadow Awareness',
      description: 'Your responses indicate well-developed Pluralistic capacities across multiple domains. Your Green shadow awareness responses suggest you are also developing the capacity to see the characteristic blind spots of this stage — which is itself a developmental achievement.',
      rationale: 'These modules consolidate your Pluralistic strengths while deepening your awareness of Green shadow patterns — the combination that distinguishes mature Pluralistic from performative Green identity.',
      modules: [
        { title: 'Relativism, Pluralism & The Limits of "All Perspectives Are Valid"', to: '/docs/modules/relativism-limits-of-pluralism' },
        { title: 'Pluralistic/Green Stage Orientation', to: '/docs/modules/pluralistic-green-orientation' },
        { title: 'Community, Belonging & Collective Intelligence', to: '/docs/modules/community-belonging-collective-intelligence' },
      ],
    };
  }

  if (bCounts.p >= 6) {
    return {
      title: 'Consolidated Pluralistic Capacities',
      description: 'Your responses suggest well-developed capacities for perspective-taking, contextual ethics, and inclusive dialogue. Pluralistic ways of making meaning appear to be operating reliably across domains.',
      rationale: 'These modules support the natural developmental edge from consolidated Pluralistic capacities toward integral integration — holding multiple perspectives without losing the capacity for judgment and action.',
      modules: [
        { title: 'Pluralistic/Green Stage Orientation', to: '/docs/modules/pluralistic-green-orientation' },
        { title: 'Ecological & Systems Consciousness', to: '/docs/modules/ecological-systems-consciousness' },
        { title: 'Relativism, Pluralism & The Limits of "All Perspectives Are Valid"', to: '/docs/modules/relativism-limits-of-pluralism' },
      ],
    };
  }

  return {
    title: 'In Development',
    description: 'Your responses reflect a unique pattern that does not fit neatly into a single profile — which is itself developmentally normal. Most people are uneven across domains, and your specific configuration is worth reflecting on directly rather than fitting into a category.',
    rationale: 'These modules address foundational capacities across the Rational → Pluralistic transition and can be explored in any order based on your specific interests and growing edges.',
    modules: [
      { title: 'Empathy & Perspective-Plurality', to: '/docs/modules/empathy-perspective-plurality' },
      { title: 'Late Orange Disillusionment', to: '/docs/modules/late-orange-disillusionment' },
      { title: 'Rational → Pluralistic QuickStart', to: '/docs/quickstarts/rational-to-pluralistic' },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════════════

export default function RationalPluralisticAssessment() {
  const [answersA, setAnswersA] = useState({});
  const [answersB, setAnswersB] = useState({});
  const [answersC, setAnswersC] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answeredA = Object.keys(answersA).length;
  const answeredB = Object.keys(answersB).length;
  const answeredC = Object.keys(answersC).length;
  const totalAnswered = answeredA + answeredB + answeredC;
  const totalQuestions = QUESTIONS_A.length + QUESTIONS_B.length + QUESTIONS_C.length;

  function handleSelectA(id, value) {
    setAnswersA((prev) => ({ ...prev, [id]: value }));
  }
  function handleSelectB(id, value) {
    setAnswersB((prev) => ({ ...prev, [id]: value }));
  }
  function handleSelectC(id, value) {
    setAnswersC((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit() {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleReset() {
    setAnswersA({});
    setAnswersB({});
    setAnswersC({});
    setSubmitted(false);
  }

  function copyResults() {
    const profile = generateProfile(answersA, answersB);
    const domainScores = computeDomainScores(answersB);
    const recs = getModuleRecommendations(answersA, answersB, answersC);
    const lines = [];
    lines.push('═══ Rational → Pluralistic Stage Progress Self-Assessment ═══');
    lines.push(`Date: ${new Date().toLocaleDateString()}`);
    lines.push('');
    lines.push(`── Profile: ${recs.title} ──`);
    lines.push(recs.description);
    lines.push('');
    lines.push('── Domain Breakdown ──');
    Object.entries(domainScores).forEach(([key, s]) => {
      lines.push(`${s.label}: Orange=${s.o} Transitional=${s.t} Pluralistic=${s.p}`);
    });
    lines.push('');
    lines.push('── Recommended Modules ──');
    recs.modules.forEach((m) => lines.push(`  • ${m.title}`));
    lines.push('');
    lines.push('Developmental assessments are maps, not territories.');
    lines.push('Results reflect tendencies in this moment, not fixed identities.');

    const text = lines.join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
    const btn = document.getElementById('rp-copy-btn');
    if (btn) {
      btn.textContent = '✓ Copied to Clipboard';
      setTimeout(() => (btn.textContent = 'Export to Journal'), 2000);
    }
  }

  const profile = submitted ? generateProfile(answersA, answersB) : null;
  const domainScores = submitted ? computeDomainScores(answersB) : null;
  const recs = submitted ? getModuleRecommendations(answersA, answersB, answersC) : null;

  const containerStyle = { maxWidth: '700px', margin: '0 auto', fontFamily: 'inherit' };
  const framingStyle = { padding: '1rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: '0.75rem', marginBottom: '1.5rem' };
  const sectionStyle = { border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '0.75rem', padding: '1rem 1rem 0.5rem', marginBottom: '1.5rem' };
  const sectionTitleStyle = { fontSize: '1.1rem', marginBottom: '0.5rem', paddingBottom: '0.4rem', borderBottom: '2px solid var(--ifm-color-primary)', color: 'var(--ifm-color-primary)' };
  const fieldsetStyle = { border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '0.75rem' };
  const legendStyle = { fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', lineHeight: '1.5' };
  const optStyle = { display: 'block', marginBottom: '0.3rem', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1.5 };
  const headerStyle = { fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-500)', marginBottom: '0.5rem' };

  if (submitted && recs) {
    return (
      <div style={containerStyle}>
        <div style={{ padding: '1.5rem', background: 'var(--ifm-color-primary-lightest)', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>{recs.title}</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{recs.description}</p>
        </div>

        {/* Descriptive Profile */}
        <div style={{ padding: '1rem', background: 'var(--ifm-color-emphasis-0)', borderRadius: '0.75rem', marginBottom: '1.5rem', border: '1px solid var(--ifm-color-emphasis-200)' }}>
          <h3 style={{ marginTop: 0 }}>Your Developmental Profile</h3>

          {profile.consolidated.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--ifm-color-success-dark)' }}>Your consolidated strengths:</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {profile.consolidated.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          )}

          {profile.emerging.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--ifm-color-warning-dark)' }}>Your emerging capacities:</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {profile.emerging.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          )}

          {profile.growingEdges.length > 0 && (
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--ifm-color-emphasis-600)' }}>Your current growing edges:</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {profile.growingEdges.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Domain Breakdown */}
        <h3>Domain Breakdown</h3>
        {domainScores && Object.entries(domainScores).map(([key, s]) => {
          const total = s.o + s.t + s.p || 1;
          return (
            <div key={key} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600 }}>{s.label}</span>
                <span style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '0.85rem' }}>
                  {s.p >= s.t && s.p >= s.o ? 'Consolidated' : s.t >= s.o ? 'Emerging' : 'Growing edge'}
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--ifm-color-emphasis-200)', borderRadius: '4px', display: 'flex', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(s.p / total) * 100}%`, background: 'var(--ifm-color-success)', borderRadius: s.o === 0 && s.t === 0 ? '4px' : '4px 0 0 4px' }} />
                <div style={{ height: '100%', width: `${(s.t / total) * 100}%`, background: 'var(--ifm-color-warning)' }} />
                <div style={{ height: '100%', width: `${(s.o / total) * 100}%`, background: 'var(--ifm-color-emphasis-400)', borderRadius: '0 4px 4px 0' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-500)', marginTop: '0.2rem' }}>
                <span>Pluralistic: {s.p}</span>
                <span>Transitional: {s.t}</span>
                <span>Orange: {s.o}</span>
              </div>
            </div>
          );
        })}

        {/* Module Recommendations */}
        <h3 style={{ marginTop: '1.5rem' }}>Recommended Next Steps</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '0.75rem' }}>{recs.rationale}</p>
        {recs.modules.map((mod) => (
          <div key={mod.to} style={{ marginBottom: '0.5rem' }}>
            <Link className="button button--secondary button--block" to={mod.to}>
              {mod.title} →
            </Link>
          </div>
        ))}

        {/* Facilitated Support Callout */}
        {profile.needsSupport && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--ifm-color-warning-lightest)', borderRadius: '0.75rem', border: '1px solid var(--ifm-color-warning-dark)' }}>
            <h4 style={{ marginTop: 0, color: 'var(--ifm-color-warning-dark)' }}>Consider Facilitated Support</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Your responses suggest you may be experiencing significant late-Orange disillusionment — meaning-deficit, burnout signals, or a sense that the frameworks that used to work no longer do. This pattern can sometimes indicate developmental readiness, and it can sometimes indicate distress that would benefit from facilitated support rather than self-guided exploration alone.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Consider working with a developmental coach, therapist familiar with adult development, or a facilitated group. The modules recommended below are valuable, but they work best alongside relational support when you are navigating the kind of disorientation your responses suggest.
            </p>
          </div>
        )}

        {/* Prominent Framing */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--ifm-color-emphasis-0)', borderRadius: '0.75rem', border: '1px solid var(--ifm-color-emphasis-200)' }}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
            <strong>Developmental assessments are maps, not territories.</strong> They describe tendencies in meaning-making, not fixed identities. Scores can vary significantly by domain, life context, and the time of day you take this.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
            Revisit this assessment every 30–60 days to observe change. Self-assessment is most useful as a pattern over time, not a single snapshot.
          </p>
        </div>

        {/* Actions */}
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button id="rp-copy-btn" className="button button--primary" onClick={copyResults}>
            Export to Journal
          </button>
          <button className="button button--outline" onClick={handleReset}>
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  // ── Assessment Form View ──
  return (
    <div style={containerStyle}>
      {/* Framing */}
      <div style={framingStyle}>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          <strong>Each stage of development has its gifts.</strong> This tool helps you understand your current meaning-making patterns — not rank you against others or against an ideal. There is no &quot;better&quot; stage. There is only more accurate self-knowledge, which helps you choose what to explore next.
        </p>
      </div>

      {/* ── Section A: Late-Orange Recognition ── */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Section A: Where Are You Now?</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '1rem' }}>
          8 questions about your current experience — how you relate to achievement, meaning, autonomy, and your own worldview. These are not right-or-wrong questions. They are mirrors.
        </p>
        {QUESTIONS_A.map((q) => (
          <fieldset key={q.id} style={fieldsetStyle}>
            <legend style={legendStyle}>{q.text}</legend>
            {q.options.map((opt) => (
              <label key={opt.value} style={optStyle}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt.value}
                  checked={answersA[q.id] === opt.value}
                  onChange={() => handleSelectA(q.id, opt.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                {opt.label}
              </label>
            ))}
          </fieldset>
        ))}
        <p style={headerStyle}>Section A: {answeredA}/{QUESTIONS_A.length} answered</p>
      </div>

      {/* ── Section B: Pluralistic Capacities ── */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Section B: Exploring Pluralistic Capacities</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '1rem' }}>
          12 scenario-based questions across five domains: empathy, contextual ethics, ecological awareness, inclusive dialogue, and relativism recognition.
        </p>
        {QUESTIONS_B.map((q) => (
          <fieldset key={q.id} style={fieldsetStyle}>
            <legend style={legendStyle}>{q.text}</legend>
            {q.options.map((opt) => (
              <label key={opt.value} style={optStyle}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt.value}
                  checked={answersB[q.id] === opt.value}
                  onChange={() => handleSelectB(q.id, opt.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                {opt.label}
              </label>
            ))}
          </fieldset>
        ))}
        <p style={headerStyle}>Section B: {answeredB}/{QUESTIONS_B.length} answered</p>
      </div>

      {/* ── Section C: Green Shadow Awareness ── */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Section C: Shadow Awareness</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '1rem' }}>
          6 questions about the characteristic blind spots that can accompany pluralistic worldviews. Honest self-awareness here is itself a developmental capacity — and one of the hardest to develop.
        </p>
        {QUESTIONS_C.map((q) => (
          <fieldset key={q.id} style={fieldsetStyle}>
            <legend style={legendStyle}>{q.text}</legend>
            {q.options.map((opt) => (
              <label key={opt.value} style={optStyle}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt.value}
                  checked={answersC[q.id] === opt.value}
                  onChange={() => handleSelectC(q.id, opt.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                {opt.label}
              </label>
            ))}
          </fieldset>
        ))}
        <p style={headerStyle}>Section C: {answeredC}/{QUESTIONS_C.length} answered</p>
      </div>

      {/* Submit */}
      <button
        className="button button--primary button--lg"
        onClick={handleSubmit}
        style={{ width: '100%', marginBottom: '1rem' }}
      >
        See Your Profile ({totalAnswered}/{totalQuestions})
      </button>
      {totalAnswered < totalQuestions && (
        <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-500)', textAlign: 'center', marginBottom: '1rem' }}>
          You can submit at any time. Your profile will be based on the responses you have provided.
        </p>
      )}
    </div>
  );
}
