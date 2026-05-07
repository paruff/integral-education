// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'QuickStarts',
      items: [
        'quickstarts/personal-to-integral',
        'quickstarts/amber-to-rational',
        'quickstarts/state-development',
      ],
    },
    {
      type: 'category',
      label: 'Self Line',
      items: [
        'modules/self-line-overview-psychograph',
        'modules/self-line-conventional-conformist-achiever',
      ],
    },
    {
      type: 'category',
      label: 'Cognitive Line',
      items: [
        'modules/cognitive-line-overview-orientation',
      ],
    },
    {
      type: 'category',
      label: 'Spiritual Line',
      items: [
        'modules/spiritual-line-overview-orientation',
      ],
    },
    {
      type: 'category',
      label: 'Moral Line',
      items: [
        'modules/moral-line-overview-dual-track',
      ],
    },
    {
      type: 'category',
      label: 'Shadow Work',
      items: [
        'modules/shadow-work-foundation',
        'modules/shadow-321-process',
        'modules/shadow-positive-projection',
        'modules/shadow-persona-mask',
        'modules/shadow-in-relationships',
        'modules/shadow-immunity-to-change',
        'modules/shadow-spiritual-bypassing',
        'modules/shadow-collective-cultural',
        'modules/integral-shadow-teal-trap',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        'modules/amber-mythic-orientation',
        'modules/rational-orange-orientation',
        'modules/cognitive-dissonance-bridge',
        'modules/perspective-taking-capacity',
        'modules/authority-autonomy-transition',
        {
          type: 'category',
          label: 'Rational → Pluralistic',
          items: [
            'modules/late-orange-disillusionment',
            'modules/empathy-perspective-plurality',
            'modules/emotional-intelligence-somatic-line',
            'modules/contextual-ethics-moral-complexity',
            'modules/ecological-systems-consciousness',
            'modules/authentic-dialogue-collaborative-meaning',
            'modules/community-belonging-collective-intelligence',
            'modules/relativism-limits-of-pluralism',
            'modules/pluralistic-green-orientation',
          ],
        },
        {
          type: 'category',
          label: 'Pluralistic → Integral',
          items: [
            'modules/integral-teal-orientation',
            'modules/late-green-emergence-signals',
            'modules/vision-logic-metasystematic-thinking',
            'modules/healthy-hierarchy-actualization-gradient',
            'modules/integral-ethics-beyond-relativism',
            'modules/integral-shadow-teal-trap',
            'modules/multiperspectival-leadership-action',
            'modules/integral-life-practice-embodying-2nd-tier',
          ],
        },
        'modules/mindfulness-basics',
        'modules/mindfulness-deepening',
        'modules/emotional-granularity',
        'modules/shadow-integration-101',
        'modules/cognitive-bias-101',
        'modules/evidence-evaluation',
        'modules/critical-thinking-foundations',
        'modules/systems-thinking-101',
        'modules/gross-state-awareness',
        'modules/subtle-state-access',
        'modules/flow-peak-experience',
        'modules/causal-witness-state',
        'modules/nondual-awareness-orientation',
      ],
    },
    {
      type: 'category',
      label: 'Maps',
      items: [
        'maps/aqal-overview',
        'maps/aqal-label-crosswalk',
        'maps/aqal-competency-map',
        'maps/ilp-practice-taxonomy',
        'maps/state-identification-assessment',
        'maps/state-stage-integration-map',
        'maps/shadow-developmental-lines-map',
      ],
    },
    {
      type: 'category',
      label: 'Implementation',
      items: [
        'implementation/product-charter',
        'implementation/raci',
        'implementation/backlog',
        'implementation/integral-aqal-protocol-template',
        'implementation/permaculture-implementation-protocol',
        {
          type: 'category',
          label: 'Guides',
          items: [
            'implementation/shadow-work-facilitation-guide',
            'implementation/amber-rational-facilitator-guide',
            'implementation/rational-pluralistic-facilitator-guide',
            'implementation/pluralistic-integral-facilitator-guide',
            'implementation/self-line-facilitation-guide',
            'implementation/spiritual-line-facilitation-guide',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Quality',
      items: [
        'quality/instructional-design-protocol',
        'quality/evidence-vetting-checklist',
        'quality/peer-review-sop',
      ],
    },
    {
      type: 'category',
      label: 'Safety',
      items: [
        'safety/shadowwork-safety-standard',
        'safety/state-development-safety-standard',
        'safety/facilitator-qualification-standard',
      ],
    },
    {
      type: 'category',
      label: 'Pilots',
      items: [
        'pilots/pilot-pathway-integral-foundations',
        'pilots/pilot-pathway-shadow-foundations',
        'pilots/pilot-runbook-20-40',
        'pilots/pilot-revision-report-template',
      ],
    },
    {
      type: 'category',
      label: 'Reflection',
      items: ['reflections/daily-template'],
    },
    {
      type: 'link',
      label: '🖱️ Interactive Prototype',
      href: '/prototype',
    },
  ],
};

module.exports = sidebars;
