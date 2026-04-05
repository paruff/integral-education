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
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        'modules/mindfulness-basics',
        'modules/emotional-granularity',
        'modules/shadow-integration-101',
        'modules/cognitive-bias-101',
        'modules/systems-thinking-101',
      ],
    },
    {
      type: 'category',
      label: 'Maps',
      items: [
        'maps/aqal-overview',
        'maps/aqal-competency-map',
        'maps/ilp-practice-taxonomy',
      ],
    },
    {
      type: 'category',
      label: 'Implementation',
      items: ['implementation/backlog'],
    },
    {
      type: 'category',
      label: 'Quality',
      items: [
        'quality/evidence-vetting-checklist',
        'quality/peer-review-sop',
      ],
    },
    {
      type: 'category',
      label: 'Safety',
      items: ['safety/shadowwork-safety-standard'],
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
  ],
};

module.exports = sidebars;
