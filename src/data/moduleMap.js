// Module → next module and parent QuickStart mapping
// Used by ModuleFooter component at end of every module

const QUICKSTARTS = {
  'amber-to-rational': { title: 'Clear Thinking Path', to: '/docs/quickstarts/amber-to-rational' },
  'personal-to-integral': { title: 'Personal to Integral', to: '/docs/quickstarts/personal-to-integral' },
  'rational-to-pluralistic': { title: 'Multiple Perspectives Path', to: '/docs/quickstarts/rational-to-pluralistic' },
  'pluralistic-to-integral': { title: 'Integrating Perspectives Path', to: '/docs/quickstarts/pluralistic-to-integral' },
  'self-line-development': { title: 'Understanding Yourself', to: '/docs/quickstarts/self-line-development' },
  'shadow-work': { title: 'Working with Shadow', to: '/docs/quickstarts/shadow-work' },
  'state-development': { title: 'State Development', to: '/docs/quickstarts/state-development' },
};

export default {
  // Stage Development — Amber→Rational
  'amber-mythic-orientation': { quickstart: 'amber-to-rational', next: { title: 'Cognitive Dissonance Bridge', to: '/docs/modules/cognitive-dissonance-bridge' } },
  'cognitive-dissonance-bridge': { quickstart: 'amber-to-rational', next: { title: 'Perspective-Taking Capacity', to: '/docs/modules/perspective-taking-capacity' } },
  'perspective-taking-capacity': { quickstart: 'amber-to-rational', next: { title: 'Authority & Autonomy Transition', to: '/docs/modules/authority-autonomy-transition' } },
  'authority-autonomy-transition': { quickstart: 'amber-to-rational', next: { title: 'Rational/Orange Stage Orientation', to: '/docs/modules/rational-orange-orientation' } },
  'rational-orange-orientation': { quickstart: 'amber-to-rational', next: { title: 'Cognitive Dissonance Bridge', to: '/docs/modules/cognitive-dissonance-bridge' } },

  // Stage Development — Rational→Pluralistic
  'late-orange-disillusionment': { quickstart: 'rational-to-pluralistic', next: { title: 'Empathy & Perspective-Plurality', to: '/docs/modules/empathy-perspective-plurality' } },
  'empathy-perspective-plurality': { quickstart: 'rational-to-pluralistic', next: { title: 'Emotional Intelligence & Somatic Line', to: '/docs/modules/emotional-intelligence-somatic-line' } },
  'emotional-intelligence-somatic-line': { quickstart: 'rational-to-pluralistic', next: { title: 'Contextual Ethics & Moral Complexity', to: '/docs/modules/contextual-ethics-moral-complexity' } },
  'contextual-ethics-moral-complexity': { quickstart: 'rational-to-pluralistic', next: { title: 'Ecological & Systems Consciousness', to: '/docs/modules/ecological-systems-consciousness' } },
  'ecological-systems-consciousness': { quickstart: 'rational-to-pluralistic', next: { title: 'Authentic Dialogue & Collaborative Meaning', to: '/docs/modules/authentic-dialogue-collaborative-meaning' } },
  'authentic-dialogue-collaborative-meaning': { quickstart: 'rational-to-pluralistic', next: { title: 'Community, Belonging & Collective Intelligence', to: '/docs/modules/community-belonging-collective-intelligence' } },
  'community-belonging-collective-intelligence': { quickstart: 'rational-to-pluralistic', next: { title: 'Relativism & Limits of Pluralism', to: '/docs/modules/relativism-limits-of-pluralism' } },
  'relativism-limits-of-pluralism': { quickstart: 'rational-to-pluralistic', next: { title: 'Pluralistic/Green Orientation', to: '/docs/modules/pluralistic-green-orientation' } },
  'pluralistic-green-orientation': { quickstart: 'rational-to-pluralistic', next: { title: 'Late-Green Emergence Signals', to: '/docs/modules/late-green-emergence-signals' } },

  // Stage Development — Pluralistic→Integral
  'late-green-emergence-signals': { quickstart: 'pluralistic-to-integral', next: { title: 'Integral/Teal Orientation', to: '/docs/modules/integral-teal-orientation' } },
  'integral-teal-orientation': { quickstart: 'pluralistic-to-integral', next: { title: 'Vision-Logic & Metasystematic Thinking', to: '/docs/modules/vision-logic-metasystematic-thinking' } },
  'vision-logic-metasystematic-thinking': { quickstart: 'pluralistic-to-integral', next: { title: 'Healthy Hierarchy & Actualization Gradient', to: '/docs/modules/healthy-hierarchy-actualization-gradient' } },
  'healthy-hierarchy-actualization-gradient': { quickstart: 'pluralistic-to-integral', next: { title: 'Integral Ethics Beyond Relativism', to: '/docs/modules/integral-ethics-beyond-relativism' } },
  'integral-ethics-beyond-relativism': { quickstart: 'pluralistic-to-integral', next: { title: 'Integral Shadow & Teal Trap', to: '/docs/modules/integral-shadow-teal-trap' } },
  'integral-shadow-teal-trap': { quickstart: 'pluralistic-to-integral', next: { title: 'Multiperspectival Leadership', to: '/docs/modules/multiperspectival-leadership-action' } },
  'multiperspectival-leadership-action': { quickstart: 'pluralistic-to-integral', next: { title: 'ILP — Embodying 2nd Tier', to: '/docs/modules/integral-life-practice-embodying-2nd-tier' } },
  'integral-life-practice-embodying-2nd-tier': { quickstart: 'pluralistic-to-integral', next: null },

  // Self Line
  'self-line-overview-psychograph': { quickstart: 'self-line-development', next: { title: 'Conventional Self', to: '/docs/modules/self-line-conventional-conformist-achiever' } },
  'self-line-conventional-conformist-achiever': { quickstart: 'self-line-development', next: { title: 'Postconventional Self', to: '/docs/modules/self-line-postconventional-individualist-strategist' } },
  'self-line-postconventional-individualist-strategist': { quickstart: 'self-line-development', next: { title: 'Postautonomous Self', to: '/docs/modules/self-line-postautonomous-construct-aware-unitive' } },
  'self-line-postautonomous-construct-aware-unitive': { quickstart: 'self-line-development', next: { title: 'Self Line Integration Practice', to: '/docs/modules/self-line-integration-practice' } },
  'self-line-integration-practice': { quickstart: 'self-line-development', next: null },

  // Emotional Line
  'emotional-line-overview-orientation': { quickstart: 'personal-to-integral', next: { title: 'Emotion Regulation Foundations', to: '/docs/modules/emotion-regulation-foundations' } },
  'emotion-regulation-foundations': { quickstart: 'personal-to-integral', next: { title: 'Emotional Appraisal', to: '/docs/modules/emotional-appraisal-meaning-making' } },
  'emotional-appraisal-meaning-making': { quickstart: 'personal-to-integral', next: { title: 'Emotional-Interpersonal Integration', to: '/docs/modules/emotional-interpersonal-integration' } },
  'emotional-interpersonal-integration': { quickstart: 'personal-to-integral', next: null },

  // Interpersonal Line
  'interpersonal-line-overview-orientation': { quickstart: 'personal-to-integral', next: { title: 'Relational Repair', to: '/docs/modules/relational-repair-conflict-navigation' } },
  'relational-repair-conflict-navigation': { quickstart: 'personal-to-integral', next: { title: 'Perspective-Taking & Empathic Accuracy', to: '/docs/modules/perspective-taking-empathic-accuracy' } },
  'perspective-taking-empathic-accuracy': { quickstart: 'personal-to-integral', next: { title: 'Emotional-Interpersonal Integration', to: '/docs/modules/emotional-interpersonal-integration' } },

  // Cognitive Line
  'cognitive-line-overview-orientation': { quickstart: 'personal-to-integral', next: { title: 'Concrete to Formal', to: '/docs/modules/cognitive-line-concrete-to-formal' } },
  'cognitive-line-concrete-to-formal': { quickstart: 'personal-to-integral', next: { title: 'Postformal Operations', to: '/docs/modules/cognitive-line-postformal-operations' } },
  'cognitive-line-postformal-operations': { quickstart: 'personal-to-integral', next: { title: 'Metasystematic/Vision-Logic', to: '/docs/modules/cognitive-line-metasystematic-vision-logic' } },
  'cognitive-line-metasystematic-vision-logic': { quickstart: 'personal-to-integral', next: { title: 'Cognitive Practice Architecture', to: '/docs/modules/cognitive-line-practice-architecture' } },
  'cognitive-line-practice-architecture': { quickstart: 'personal-to-integral', next: null },

  // Spiritual Line
  'spiritual-line-overview-orientation': { quickstart: 'personal-to-integral', next: { title: 'Mythic to Rational', to: '/docs/modules/spiritual-line-mythic-to-rational' } },
  'spiritual-line-mythic-to-rational': { quickstart: 'personal-to-integral', next: { title: 'Conjunctive & Universalizing', to: '/docs/modules/spiritual-line-conjunctive-universalizing' } },
  'spiritual-line-conjunctive-universalizing': { quickstart: 'personal-to-integral', next: { title: 'Post-Metaphysical Integral', to: '/docs/modules/spiritual-line-post-metaphysical-integral-religion' } },
  'spiritual-line-post-metaphysical-integral-religion': { quickstart: 'personal-to-integral', next: { title: 'Spiritual Shadow Integration', to: '/docs/modules/spiritual-line-shadow-integration' } },
  'spiritual-line-shadow-integration': { quickstart: 'personal-to-integral', next: null },

  // Moral Line
  'moral-line-overview-dual-track': { quickstart: 'personal-to-integral', next: { title: 'Conventional Reasoning', to: '/docs/modules/moral-line-conventional-reasoning' } },
  'moral-line-conventional-reasoning': { quickstart: 'personal-to-integral', next: { title: 'Postconventional Reasoning', to: '/docs/modules/moral-line-postconventional-reasoning' } },
  'moral-line-postconventional-reasoning': { quickstart: 'personal-to-integral', next: { title: 'Imagination & Integral Ethics', to: '/docs/modules/moral-line-imagination-integral-ethics' } },
  'moral-line-imagination-integral-ethics': { quickstart: 'personal-to-integral', next: { title: 'Shadow & Moral Injury', to: '/docs/modules/moral-line-shadow-moral-injury' } },
  'moral-line-shadow-moral-injury': { quickstart: 'personal-to-integral', next: null },

  // Shadow Work
  'shadow-work-foundation': { quickstart: 'shadow-work', next: { title: 'The 3-2-1 Shadow Process', to: '/docs/modules/shadow-321-process' } },
  'shadow-321-process': { quickstart: 'shadow-work', next: { title: 'Shadow — Positive Projection', to: '/docs/modules/shadow-positive-projection' } },
  'shadow-positive-projection': { quickstart: 'shadow-work', next: { title: 'Shadow — Persona & Mask', to: '/docs/modules/shadow-persona-mask' } },
  'shadow-persona-mask': { quickstart: 'shadow-work', next: { title: 'Shadow in Relationships', to: '/docs/modules/shadow-in-relationships' } },
  'shadow-in-relationships': { quickstart: 'shadow-work', next: { title: 'Collective & Cultural Shadow', to: '/docs/modules/shadow-collective-cultural' } },
  'shadow-collective-cultural': { quickstart: 'shadow-work', next: { title: 'Shadow — Immunity to Change', to: '/docs/modules/shadow-immunity-to-change' } },
  'shadow-immunity-to-change': { quickstart: 'shadow-work', next: { title: 'Shadow — Spiritual Bypassing', to: '/docs/modules/shadow-spiritual-bypassing' } },
  'shadow-spiritual-bypassing': { quickstart: 'shadow-work', next: null },

  // State Training
  'gross-state-awareness': { quickstart: 'state-development', next: { title: 'Subtle State Access', to: '/docs/modules/subtle-state-access' } },
  'subtle-state-access': { quickstart: 'state-development', next: { title: 'Causal / Witness State', to: '/docs/modules/causal-witness-state' } },
  'causal-witness-state': { quickstart: 'state-development', next: { title: 'Nondual Awareness', to: '/docs/modules/nondual-awareness-orientation' } },
  'nondual-awareness-orientation': { quickstart: 'state-development', next: { title: 'Flow & Peak Experience', to: '/docs/modules/flow-peak-experience' } },
  'flow-peak-experience': { quickstart: 'state-development', next: null },

  // Core Skills
  'cognitive-bias-101': { quickstart: 'amber-to-rational', next: { title: 'Critical Thinking Foundations', to: '/docs/modules/critical-thinking-foundations' } },
  'critical-thinking-foundations': { quickstart: 'amber-to-rational', next: { title: 'Evidence Evaluation', to: '/docs/modules/evidence-evaluation' } },
  'evidence-evaluation': { quickstart: 'amber-to-rational', next: { title: 'Systems Thinking 101', to: '/docs/modules/systems-thinking-101' } },
  'systems-thinking-101': { quickstart: 'amber-to-rational', next: null },
  'mindfulness-basics': { quickstart: 'personal-to-integral', next: { title: 'Mindfulness Deepening', to: '/docs/modules/mindfulness-deepening' } },
  'mindfulness-deepening': { quickstart: 'personal-to-integral', next: { title: 'Emotional Granularity', to: '/docs/modules/emotional-granularity' } },
  'emotional-granularity': { quickstart: 'personal-to-integral', next: { title: 'Shadow Integration 101', to: '/docs/modules/shadow-integration-101' } },
  'shadow-integration-101': { quickstart: 'shadow-work', next: { title: 'Systems Thinking 101', to: '/docs/modules/systems-thinking-101' } },
};

export { QUICKSTARTS };export const LINE_TAGS = {
  'affect-labelling-somatic-correlation': 'emotional',
  'co-regulation-relational-attunement': 'interpersonal',
  'cognitive-bias-101': 'cognitive',
  'cross-difference-dialogue-trust-building': 'interpersonal',
  'emotional-appraisal-meaning-making': 'emotional',
  'emotional-granularity': 'emotional',
  'emotional-interpersonal-integration': 'emotional',
  'emotional-line-overview-orientation': 'emotional',
  'interpersonal-line-overview-orientation': 'interpersonal',
  'mindfulness-basics': 'somatic',
  'perspective-taking-empathic-accuracy': 'interpersonal',
  'relational-repair-conflict-navigation': 'interpersonal',
  'shadow-integration-101': 'cross-cutting',
  'systems-thinking-101': 'cognitive',
};
