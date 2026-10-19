#!/usr/bin/env node
// Builds the main site, then every stage site in sites/sites.json into
// build/<id>/, so one Pages artifact holds them all (FR-18). Each stage site is
// vocabulary- and link-checked. A site is only deployed when "published" is true,
// so building a site in CI never publishes it.
// Usage: node scripts/build-sites.mjs [--published-only] [--only <id>] [--strict]
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const publishedOnly = args.includes('--published-only');
const strict = args.includes('--strict');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

function run(cmd, cmdArgs) {
  console.log(`\n$ ${cmd} ${cmdArgs.join(' ')}`);
  const r = spawnSync(cmd, cmdArgs, { stdio: 'inherit' });
  if (r.status !== 0) {
    console.error(`❌ failed: ${cmd} ${cmdArgs.join(' ')}`);
    process.exit(r.status ?? 1);
  }
}

const sites = JSON.parse(readFileSync('sites/sites.json', 'utf8'))
  .filter((s) => !publishedOnly || s.published)
  .filter((s) => !only || s.id === only);

// The main site first: it empties build/, and the stage sites then go inside it.
if (!only) run('npx', ['docusaurus', 'build']);
for (const site of sites) {
  const outDir = `build/${site.id}`;
  run('node', ['scripts/prepare-site.mjs', site.id]);
  run('npx', ['docusaurus', 'build', '--config', site.config, '--out-dir', outDir]);
  const { baseUrl } = require(`../${site.config}`);
  run('node', ['scripts/check-site-vocabulary.mjs', site.id, ...(strict ? ['--strict'] : [])]);
  run('node', ['scripts/check-site-links.mjs', outDir, baseUrl, '--baseline', site.linkBaseline, ...(strict ? ['--strict'] : [])]);
}
console.log(`\n✅ built main site${sites.length ? ` and ${sites.map((s) => s.id).join(', ')}` : ''}`);
