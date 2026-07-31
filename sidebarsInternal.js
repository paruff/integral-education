// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const internalSidebar = {
  internalSidebar: [
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
            'implementation/magic-red-facilitator-guide',
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
      label: 'Safety Standards',
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
  ],
};

module.exports = internalSidebar;