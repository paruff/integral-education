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
        'modules/self-line-postconventional-individualist-strategist',
        'modules/self-line-postautonomous-construct-aware-unitive',
        'modules/self-line-integration-practice',
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
        'modules/spiritual-line-mythic-to-rational',
        'modules/spiritual-line-conjunctive-universalizing',
        'modules/spiritual-line-post-metaphysical-integral-religion',
        'modules/spiritual-line-shadow-integration',
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
      link: {
        type: 'generated-index',
        slug: '/modules',
        title: 'Modules',
        description: 'Browse standalone learning units across the integral curriculum.',
      },
      items: [
        {
          type: 'category',
          label: 'Stage Development',
          description:
            'Orientation and transition modules for navigating major developmental stages.',
          collapsible: true,
          collapsed: true,
          items: [
            'modules/amber-mythic-orientation',
            'modules/rational-orange-orientation',
            'modules/cognitive-dissonance-bridge',
            'modules/perspective-taking-capacity',
            'modules/authority-autonomy-transition',
            {
              type: 'category',
              label: 'Rational → Pluralistic',
              description:
                'Bridge modules for moving from achievement-centered to pluralistic meaning-making.',
              collapsible: true,
              collapsed: true,
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
              description:
                'Second-tier transition modules for late-Green to Integral/Teal development.',
              collapsible: true,
              collapsed: true,
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
          ],
        },
        {
          type: 'category',
          label: 'State Training',
          description:
            'Practices for recognizing, stabilizing, and integrating key contemplative states.',
          collapsible: true,
          collapsed: true,
          items: [
            'modules/gross-state-awareness',
            'modules/subtle-state-access',
            'modules/flow-peak-experience',
            'modules/causal-witness-state',
            'modules/nondual-awareness-orientation',
          ],
        },
        {
          type: 'category',
          label: 'Core Skills',
          description:
            'Foundational modules for attention, emotion, reasoning, evidence, and systems literacy.',
          collapsible: true,
          collapsed: true,
          items: [
            'modules/mindfulness-basics',
            'modules/mindfulness-deepening',
            'modules/emotional-granularity',
            'modules/cognitive-bias-101',
            'modules/evidence-evaluation',
            'modules/critical-thinking-foundations',
            'modules/systems-thinking-101',
          ],
        },
        {
          type: 'category',
          label: 'Shadow Work',
          description:
            'Foundational shadow curriculum for projection, disowned parts, and safe integration.',
          collapsible: true,
          collapsed: true,
          items: [
            'modules/shadow-work-foundation',
            'modules/shadow-integration-101',
            'modules/shadow-321-process',
            'modules/shadow-positive-projection',
            {
              type: 'category',
              label: 'Shadow Applications',
              description:
                'Applied shadow modules for relationships, spirituality, culture, and advanced integration.',
              collapsible: true,
              collapsed: true,
              items: [
                'modules/shadow-persona-mask',
                'modules/shadow-in-relationships',
                'modules/shadow-immunity-to-change',
                'modules/shadow-spiritual-bypassing',
                'modules/shadow-collective-cultural',
              ],
            },
          ],
        },
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
