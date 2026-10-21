// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  learnerSidebar: [
    'quickstarts/traditional-to-rational',
    {
      type: 'category',
      label: 'The path',
      collapsible: false,
      items: [
        'modules/traditional-orientation',
        'modules/rational-orientation',
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
