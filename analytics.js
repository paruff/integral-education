// P10-01a: GoatCounter, production deploys only (analytics-decision.md). The
// tool loads only when GOATCOUNTER_CODE is set, and only the deploy build in
// .github/workflows/ci-quality.yml sets it, so PR and local builds never load it.
const code = process.env.GOATCOUNTER_CODE;

// Our own copy of GoatCounter's count.js (static/js/goatcounter-count.js), not gc.zgo.at: the
// script runs on the same origin as learners' stored journals, so it must not change under us.
const SCRIPT = '/integral-education/js/goatcounter-count.js';

module.exports = {
  scripts: code
    ? [{ src: SCRIPT, async: true, 'data-goatcounter': `https://${code}.goatcounter.com/count` }]
    : [],
  clientModules: code ? [require.resolve('./src/clientModules/goatcounter.js')] : [],
  // Shown in every site's footer: what is counted and what is not.
  privacyNote:
    'Privacy: we count page views, referrers and two hub clicks, as totals only. No cookies, no stored visitor ID, and nothing you read, answer, rate or write is counted. Your progress stays in your browser.',
};
