// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  learnerSidebar: [
    'quickstarts/amber-to-rational',
    {
      type: 'category',
      label: 'The path',
      collapsible: false,
      items: [
        'modules/amber-mythic-orientation',
        'modules/rational-orange-orientation',
        'modules/cognitive-dissonance-bridge',
        'modules/perspective-taking-capacity',
        'modules/authority-autonomy-transition',
        'modules/critical-thinking-foundations',
        'modules/evidence-evaluation',
      ],
    },
    'my-progress',
    'reflections/daily-template',
  ],
};
