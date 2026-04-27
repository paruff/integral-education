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
      label: 'Shadow Work',
      items: [
        'modules/shadow-work-foundation',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        'modules/amber-mythic-orientation',
        'modules/rational-orange-orientation',
        {
          type: 'category',
          label: 'Rational → Pluralistic',
          items: [
            'modules/late-orange-disillusionment',
            'modules/pluralistic-green-orientation',
          ],
        },
        'modules/mindfulness-basics',
        'modules/emotional-granularity',
        'modules/shadow-integration-101',
        'modules/cognitive-bias-101',
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
