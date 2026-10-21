// P10-01a: GoatCounter, production deploys only (analytics-decision.md). The
// tool loads only when GOATCOUNTER_CODE is set, and only the deploy build in
// .github/workflows/ci-quality.yml sets it, so PR and local builds never load it.
const code = process.env.GOATCOUNTER_CODE;

module.exports = {
  scripts: code
    ? [{ src: 'https://gc.zgo.at/count.js', async: true, 'data-goatcounter': `https://${code}.goatcounter.com/count` }]
    : [],
  clientModules: code ? [require.resolve('./src/clientModules/goatcounter.js')] : [],
  // Shown in every site's footer: what is counted and what is not.
  privacyNote:
    'Privacy: we count page views, referrers and two hub clicks, as totals only. No cookies, no stored visitor ID, and nothing you read, answer, rate or write is counted. Your progress stays in your browser.',
};
