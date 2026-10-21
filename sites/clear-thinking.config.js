// First stage site (FR-18, P9-01a): the Amber → Rational transition, built from
// this repo. The site name and URL slug are working names and stay neutral on
// purpose: a stage site must not name another stage (FR-17). The owner confirms
// the audience-facing name before launch (P9-05).
const main = require('../docusaurus.config.js');

const analytics = require('../analytics.js');

const slug = 'clear-thinking';

const search = main.plugins.find((p) => Array.isArray(p) && String(p[0]).includes('docusaurus-search-local'));

// The docs come from .sites-cache/clear-thinking/docs, assembled by scripts/prepare-site.mjs:
// the doc list in sites/sites.json, with any rewrite in sites/clear-thinking/overrides/docs on top.
// scripts/build-sites.mjs runs it first; run it by hand before `docusaurus start --config`.

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  ...main,
  title: 'Clear Thinking Path',
  tagline: 'A step-by-step path, one module at a time',
  baseUrl: `/integral-education/${slug}/`,
  // NFR-06: the projectName is the learner-data key, so each site keeps its own progress.
  projectName: `integral-education-${slug}`,
  // Links out of this site are tracked by scripts/check-site-links.mjs and its baseline.
  onBrokenLinks: 'warn',
  plugins: search ? [search] : [],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./clear-thinking.sidebars.js'),
          path: '.sites-cache/clear-thinking/docs',
        },
        pages: { path: `sites/${slug}/pages` },
        blog: false,
        theme: { customCss: require.resolve('../src/css/custom.css') },
      },
    ],
  ],
  themeConfig: {
    metadata: [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Clear Thinking Path' },
    ],
    navbar: {
      title: 'Clear Thinking Path',
      items: [
        { to: '/docs/quickstarts/amber-to-rational', position: 'left', label: 'Start' },
        { to: '/docs/my-progress', position: 'left', label: 'My Progress' },
        // FR-18: the only way out of a stage site is the hub's "choose again" route.
        { href: 'https://paruff.github.io/integral-education/start', position: 'right', label: 'Not the right fit? Choose again', 'data-goatcounter-click': 'choose-again' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Content licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. Built with Docusaurus.<br/>${analytics.privacyNote}`,
    },
  },
};
