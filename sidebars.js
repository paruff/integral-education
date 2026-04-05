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
      items: ['maps/aqal-overview'],
    },
    {
      type: 'category',
      label: 'Reflection',
      items: ['reflections/daily-template'],
    },
  ],
};

module.exports = sidebars;
