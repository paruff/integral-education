import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

const DEFAULT_REFLECT_LINK = '/docs/reflections/daily-template';

const MODULE_NEXT_STEPS = {
  'affect-labelling-somatic-correlation': {
    nextTitle: 'Emotional Appraisal & Meaning-Making',
    nextLink: '/docs/modules/emotional-appraisal-meaning-making',
  },
  'amber-mythic-orientation': {
    nextTitle: 'Reason, Achievement, and Effectiveness',
    nextLink: '/docs/modules/rational-orange-orientation',
  },
  'authentic-dialogue-collaborative-meaning': {
    nextTitle: 'Community, Belonging & Collective Intelligence',
    nextLink: '/docs/modules/community-belonging-collective-intelligence',
  },
  'authority-autonomy-transition': {
    nextTitle: 'Critical Thinking Foundations',
    nextLink: '/docs/modules/critical-thinking-foundations',
  },
  'causal-witness-state': {
    nextTitle: 'Nondual Awareness Orientation',
    nextLink: '/docs/modules/nondual-awareness-orientation',
  },
  'co-regulation-relational-attunement': {
    nextTitle: 'Emotional Intelligence & Somatic Development',
    nextLink: '/docs/modules/emotional-intelligence-somatic-line',
  },
  'cognitive-bias-101': {
    nextTitle: 'Critical Thinking Foundations',
    nextLink: '/docs/modules/critical-thinking-foundations',
  },
  'cognitive-dissonance-bridge': {
    nextTitle: 'Perspective-Taking Capacity',
    nextLink: '/docs/modules/perspective-taking-capacity',
  },
  'cognitive-line-concrete-to-formal': {
    nextTitle: 'Cognitive Line — Postformal Operations',
    nextLink: '/docs/modules/cognitive-line-postformal-operations',
  },
  'cognitive-line-metasystematic-vision-logic': {
    nextTitle: 'Cognitive Line — Practice Architecture',
    nextLink: '/docs/modules/cognitive-line-practice-architecture',
  },
  'cognitive-line-overview-orientation': {
    nextTitle: 'Cognitive Line — Concrete to Formal',
    nextLink: '/docs/modules/cognitive-line-concrete-to-formal',
  },
  'cognitive-line-postformal-operations': {
    nextTitle: 'Cognitive Line — Metasystematic / Vision-Logic',
    nextLink: '/docs/modules/cognitive-line-metasystematic-vision-logic',
  },
  'cognitive-line-practice-architecture': {
    nextTitle: 'Reason, Achievement, and Effectiveness',
    nextLink: '/docs/modules/rational-orange-orientation',
  },
  'community-belonging-collective-intelligence': {
    nextTitle: 'Relativism & the Limits of Pluralism',
    nextLink: '/docs/modules/relativism-limits-of-pluralism',
  },
  'contextual-ethics-moral-complexity': {
    nextTitle: 'Ecological & Systems Consciousness',
    nextLink: '/docs/modules/ecological-systems-consciousness',
  },
  'critical-thinking-foundations': {
    nextTitle: 'Evidence Evaluation',
    nextLink: '/docs/modules/evidence-evaluation',
  },
  'ecological-systems-consciousness': {
    nextTitle: 'Authentic Dialogue & Collaborative Meaning',
    nextLink: '/docs/modules/authentic-dialogue-collaborative-meaning',
  },
  'emotion-regulation-foundations': {
    nextTitle: 'Affect Labelling & Somatic Correlation',
    nextLink: '/docs/modules/affect-labelling-somatic-correlation',
  },
  'emotional-appraisal-meaning-making': {
    nextTitle: 'Co-Regulation & Relational Attunement',
    nextLink: '/docs/modules/co-regulation-relational-attunement',
  },
  'emotional-granularity': {
    nextTitle: 'Shadow Integration 101',
    nextLink: '/docs/modules/shadow-integration-101',
  },
  'emotional-intelligence-somatic-line': {
    nextTitle: 'Contextual Ethics & Moral Complexity',
    nextLink: '/docs/modules/contextual-ethics-moral-complexity',
  },
  'emotional-line-overview-orientation': {
    nextTitle: 'Emotion Regulation Foundations',
    nextLink: '/docs/modules/emotion-regulation-foundations',
  },
  'empathy-perspective-plurality': {
    nextTitle: 'Emotional Intelligence & Somatic Development',
    nextLink: '/docs/modules/emotional-intelligence-somatic-line',
  },
  'evidence-evaluation': {
    nextTitle: 'Navigating the Crack',
    nextLink: '/docs/modules/late-orange-disillusionment',
  },
  'flow-peak-experience': {
    nextTitle: 'State Development (QuickStart)',
    nextLink: '/docs/quickstarts/state-development',
  },
  'gross-state-awareness': {
    nextTitle: 'Subtle State Access',
    nextLink: '/docs/modules/subtle-state-access',
  },
  'healthy-hierarchy-actualization-gradient': {
    nextTitle: 'Ethics Beyond Relativism',
    nextLink: '/docs/modules/integral-ethics-beyond-relativism',
  },
  'integral-ethics-beyond-relativism': {
    nextTitle: 'The Trap of Having Arrived',
    nextLink: '/docs/modules/integral-shadow-teal-trap',
  },
  'integral-life-practice-embodying-2nd-tier': {
    nextTitle: 'State Development (QuickStart)',
    nextLink: '/docs/quickstarts/state-development',
  },
  'integral-shadow-teal-trap': {
    nextTitle: 'Multiperspectival Leadership in Action',
    nextLink: '/docs/modules/multiperspectival-leadership-action',
  },
  'integral-teal-orientation': {
    nextTitle: 'Vision-Logic & Metasystematic Thinking',
    nextLink: '/docs/modules/vision-logic-metasystematic-thinking',
  },
  'late-green-emergence-signals': {
    nextTitle: 'Systems, Complexity, and Integration',
    nextLink: '/docs/modules/integral-teal-orientation',
  },
  'late-orange-disillusionment': {
    nextTitle: 'Empathy, Perspective-Taking & Plurality',
    nextLink: '/docs/modules/empathy-perspective-plurality',
  },
  'mindfulness-basics': {
    nextTitle: 'Emotional Granularity',
    nextLink: '/docs/modules/emotional-granularity',
  },
  'mindfulness-deepening': {
    nextTitle: 'Emotional Granularity',
    nextLink: '/docs/modules/emotional-granularity',
  },
  'moral-line-conventional-reasoning': {
    nextTitle: 'Moral Line — Postconventional Reasoning',
    nextLink: '/docs/modules/moral-line-postconventional-reasoning',
  },
  'moral-line-imagination-integral-ethics': {
    nextTitle: 'Moral Line — Shadow & Moral Injury',
    nextLink: '/docs/modules/moral-line-shadow-moral-injury',
  },
  'moral-line-overview-dual-track': {
    nextTitle: 'Moral Line — Conventional Reasoning',
    nextLink: '/docs/modules/moral-line-conventional-reasoning',
  },
  'moral-line-postconventional-reasoning': {
    nextTitle: 'Moral Line — Imagination and Ethics',
    nextLink: '/docs/modules/moral-line-imagination-integral-ethics',
  },
  'moral-line-shadow-moral-injury': {
    nextTitle: 'Spiritual Line Overview & Orientation',
    nextLink: '/docs/modules/spiritual-line-overview-orientation',
  },
  'multiperspectival-leadership-action': {
    nextTitle: 'Whole-Person Practice',
    nextLink: '/docs/modules/integral-life-practice-embodying-2nd-tier',
  },
  'nondual-awareness-orientation': {
    nextTitle: 'Flow / Peak Experience',
    nextLink: '/docs/modules/flow-peak-experience',
  },
  'perspective-taking-capacity': {
    nextTitle: 'Authority and Autonomy',
    nextLink: '/docs/modules/authority-autonomy-transition',
  },
  'pluralistic-green-orientation': {
    nextTitle: 'Signs You\'re Ready for More Complexity',
    nextLink: '/docs/modules/late-green-emergence-signals',
  },
  'rational-orange-orientation': {
    nextTitle: 'Cognitive Dissonance Bridge',
    nextLink: '/docs/modules/cognitive-dissonance-bridge',
  },
  'relativism-limits-of-pluralism': {
    nextTitle: 'Pluralism, Empathy, and Belonging',
    nextLink: '/docs/modules/pluralistic-green-orientation',
  },
  'self-line-conventional-conformist-achiever': {
    nextTitle: 'Postconventional Self — Individualist to Strategist',
    nextLink: '/docs/modules/self-line-postconventional-individualist-strategist',
  },
  'self-line-integration-practice': {
    nextTitle: 'Mindfulness Basics',
    nextLink: '/docs/modules/mindfulness-basics',
  },
  'self-line-overview-psychograph': {
    nextTitle: 'Conventional Self — Conformist to Achiever',
    nextLink: '/docs/modules/self-line-conventional-conformist-achiever',
  },
  'self-line-postautonomous-construct-aware-unitive': {
    nextTitle: 'Self Line Integration Practice',
    nextLink: '/docs/modules/self-line-integration-practice',
  },
  'self-line-postconventional-individualist-strategist': {
    nextTitle: 'Postautonomous Self — Construct-Aware to Unitive',
    nextLink: '/docs/modules/self-line-postautonomous-construct-aware-unitive',
  },
  'shadow-321-process': {
    nextTitle: 'Shadow — Positive Projection',
    nextLink: '/docs/modules/shadow-positive-projection',
  },
  'shadow-collective-cultural': {
    nextTitle: 'Shadow Immunity to Change',
    nextLink: '/docs/modules/shadow-immunity-to-change',
  },
  'shadow-immunity-to-change': {
    nextTitle: 'Shadow and Spiritual Bypassing',
    nextLink: '/docs/modules/shadow-spiritual-bypassing',
  },
  'shadow-in-relationships': {
    nextTitle: 'Collective and Cultural Shadow',
    nextLink: '/docs/modules/shadow-collective-cultural',
  },
  'shadow-integration-101': {
    nextTitle: 'Systems Thinking 101',
    nextLink: '/docs/modules/systems-thinking-101',
  },
  'shadow-persona-mask': {
    nextTitle: 'Shadow in Relationships',
    nextLink: '/docs/modules/shadow-in-relationships',
  },
  'shadow-positive-projection': {
    nextTitle: 'Shadow — Persona and Mask',
    nextLink: '/docs/modules/shadow-persona-mask',
  },
  'shadow-spiritual-bypassing': {
    nextTitle: 'The Trap of Having Arrived',
    nextLink: '/docs/modules/integral-shadow-teal-trap',
  },
  'shadow-work-foundation': {
    nextTitle: 'The 3-2-1 Shadow Process',
    nextLink: '/docs/modules/shadow-321-process',
  },
  'spiritual-line-conjunctive-universalizing': {
    nextTitle: 'Post-Metaphysical Spirituality',
    nextLink: '/docs/modules/spiritual-line-post-metaphysical-integral-religion',
  },
  'spiritual-line-mythic-to-rational': {
    nextTitle: 'Spiritual Line — Conjunctive & Universalizing',
    nextLink: '/docs/modules/spiritual-line-conjunctive-universalizing',
  },
  'spiritual-line-overview-orientation': {
    nextTitle: 'Spiritual Line — Literal to Reasoned Faith',
    nextLink: '/docs/modules/spiritual-line-mythic-to-rational',
  },
  'spiritual-line-post-metaphysical-integral-religion': {
    nextTitle: 'Spiritual Line — Shadow Integration',
    nextLink: '/docs/modules/spiritual-line-shadow-integration',
  },
  'spiritual-line-shadow-integration': {
    nextTitle: 'State Development (QuickStart)',
    nextLink: '/docs/quickstarts/state-development',
  },
  'subtle-state-access': {
    nextTitle: 'Causal / Witness State',
    nextLink: '/docs/modules/causal-witness-state',
  },
  'systems-thinking-101': {
    nextTitle: 'Values, Belonging, and Structure',
    nextLink: '/docs/modules/amber-mythic-orientation',
  },
  'vision-logic-metasystematic-thinking': {
    nextTitle: 'Healthy Hierarchy & the Actualization Gradient',
    nextLink: '/docs/modules/healthy-hierarchy-actualization-gradient',
  },
};

function normalizeDocId(id) {
  if (!id) {
    return undefined;
  }

  if (id.startsWith('modules/')) {
    return id.slice('modules/'.length);
  }

  return id;
}

export default function NextStep({ nextTitle, nextLink, reflectLink = DEFAULT_REFLECT_LINK, message }) {
  const { metadata } = useDoc();
  const moduleId = normalizeDocId(metadata?.id);
  const mapped = moduleId ? MODULE_NEXT_STEPS[moduleId] : undefined;

  const resolvedNextTitle = nextTitle ?? mapped?.nextTitle ?? 'Explore the modules index';
  const resolvedNextLink = nextLink ?? mapped?.nextLink ?? '/docs/modules';
  const resolvedMessage =
    message ??
    (moduleId
      ? 'You completed this module. Keep your momentum with the next step in your learning path.'
      : 'Keep your momentum with the next step in your learning path.');

  return (
    <aside className={styles.nextStepBox} aria-label="Next learning step">
      <p className={styles.message}>{resolvedMessage}</p>
      <Link className={styles.primaryCta} to={resolvedNextLink}>
        Next: {resolvedNextTitle}
      </Link>
      <Link className={styles.secondaryCta} to={reflectLink}>
        Log in your Daily Reflection
      </Link>
    </aside>
  );
}
