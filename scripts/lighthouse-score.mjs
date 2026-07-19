/**
 * Run Lighthouse accessibility audit using Puppeteer's bundled Chromium.
 */
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { spawn } from 'child_process';

const BASE_URL = 'http://localhost:3099/integral-education';
const OUTPUT_DIR = resolve(import.meta.dirname, '../artifacts');

const TARGETS = [
  { name: 'homepage', path: '/' },
  { name: 'intro', path: '/docs/intro' },
  { name: 'module-mindfulness', path: '/docs/modules/mindfulness-basics' },
  { name: 'quickstart', path: '/docs/quickstarts/personal-to-integral' },
  { name: 'prototype', path: '/prototype' },
  { name: 'start-here', path: '/start' },
  { name: '404-page', path: '/nonexistent-page' },
];

async function run() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const chromePath = await puppeteer.executablePath();
  console.log(`Chrome: ${chromePath}`);

  // Start Chrome with remote debugging port
  const debugPort = 9222;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${debugPort}`,
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
  ], { stdio: 'ignore' });

  // Wait for Chrome to be ready
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log(`Chrome started on port ${debugPort}`);

  // Import lighthouse
  const { default: lighthouse } = await import('lighthouse');

  const results = [];

  for (const target of TARGETS) {
    const url = `${BASE_URL}${target.path}`;
    console.log(`\n=== Lighthouse: ${target.name} (${url}) ===`);

    try {
      const runnerResult = await lighthouse(url, {
        port: debugPort,
        onlyCategories: ['accessibility'],
        output: ['json'],
        logLevel: 'silent',
      });

      const lhr = runnerResult.lhr;
      const score = Math.round(lhr.categories.accessibility.score * 100);
      console.log(`  Accessibility score: ${score}/100`);
      
      // Check audit details
      const audits = lhr.audits;
      const failedAudits = Object.entries(audits)
        .filter(([, a]) => a.score !== null && a.score < 1)
        .map(([id, a]) => ({ id, title: a.title, score: a.score }));

      if (failedAudits.length > 0) {
        console.log(`  Failed audits: ${failedAudits.length}`);
        for (const fa of failedAudits) {
          console.log(`    - ${fa.title} (score: ${fa.score})`);
        }
      } else {
        console.log('  ✅ All audits passed');
      }

      results.push({ name: target.name, url, score, failedAudits });

      writeFileSync(
        resolve(OUTPUT_DIR, `lighthouse-${target.name}.json`),
        JSON.stringify(lhr, null, 2)
      );
    } catch (e) {
      console.log(`  ⚠️  Error: ${e.message}`);
      results.push({ name: target.name, url, score: null, error: e.message });
    }
  }

  // Cleanup
  chrome.kill();
  console.log('\nChrome closed.');

  // Summary
  console.log('\n═══════════════════════════════════════');
  console.log('   LIGHTHOUSE ACCESSIBILITY SCORES');
  console.log('═══════════════════════════════════════');
  let allPass = true;
  let scoredResults = 0;
  for (const r of results) {
    if (r.score !== null) {
      scoredResults++;
      const status = r.score >= 90 ? '✅' : '❌';
      if (r.score < 90) allPass = false;
      console.log(`  ${status} ${r.name}: ${r.score}`);
    } else {
      console.log(`  ⚠️  ${r.name}: ${r.error}`);
    }
  }
  
  const passCount = results.filter(r => r.score !== null && r.score >= 90).length;
  console.log(`\nPages scored: ${scoredResults}`);
  console.log(`Pages >= 90: ${passCount}`);
  console.log(`All pass: ${scoredResults > 0 && passCount === scoredResults ? '✅ YES' : '⚠️ NO'}`);

  writeFileSync(
    resolve(OUTPUT_DIR, 'lighthouse-scores.json'),
    JSON.stringify(results, null, 2)
  );
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
