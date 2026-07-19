// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Integral Education Platform',
  tagline: 'Mastery Across All Quadrants',
  url: 'https://paruff.github.io',
  baseUrl: '/integral-education/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  organizationName: 'paruff',
  projectName: 'integral-education',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Integral Education',
        items: [
          {
            to: '/start',
            position: 'left',
            label: 'Find Your Path',
            className: 'navbar-start-here',
          },
          {
            to: '/docs/modules',
            position: 'left',
            label: 'Modules',
          },
          {
            to: '/docs/maps/aqal-overview',
            label: 'Maps and Tools',
            position: 'left',
          },
          {
            to: '/prototype',
            label: 'Prototype',
            position: 'right',
          },
          {
            href: 'https://github.com/paruff/integral-education',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Integral Education Platform. Built with Docusaurus.`,
      },
    }),
};

module.exports = config;
