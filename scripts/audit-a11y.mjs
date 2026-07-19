/**
 * WCAG 2.1 AA Accessibility Audit Script
 * Uses Puppeteer + axe-core to audit key pages.
 * Usage: node scripts/audit-a11y.mjs [--serve]
 */

import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

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

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const results = [];

  for (const target of TARGETS) {
    const url = `${BASE_URL}${target.path}`;
    console.log(`\n=== Auditing: ${target.name} (${url}) ===`);
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    } catch (e) {
      console.log(`  ⚠️  Could not load ${url}: ${e.message}`);
      await page.close();
      continue;
    }
    
    // Inject axe-core from CDN (bundled approach)
    const AXE_SOURCE = 'https://cdn.jsdelivr.net/npm/axe-core@4.12.1/axe.min.js';
    await page.addScriptTag({ url: AXE_SOURCE });
    
    // Run axe
    const axeResult = await page.evaluate(async () => {
      return await axe.run({
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      });
    });
    
    const violations = axeResult.violations || [];
    const passes = axeResult.passes || [];
    const incomplete = axeResult.incomplete || [];
    
    console.log(`  Violations: ${violations.length}`);
    console.log(`  Passes: ${passes.length}`);
    console.log(`  Incomplete: ${incomplete.length}`);
    
    for (const v of violations) {
      console.log(`  ❌ [${v.id}] ${v.help} (${v.nodes.length} nodes)`);
      console.log(`     ${v.helpUrl}`);
      for (const node of v.nodes.slice(0, 3)) {
        console.log(`     - ${node.target.join(', ')}`);
      }
    }
    
    const result = {
      url,
      violations: violations.map(v => ({
        id: v.id,
        impact: v.impact,
        tags: v.tags,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.map(n => ({
          target: n.target,
          html: n.html,
          failureSummary: n.failureSummary,
        })),
      })),
      passes: passes.length,
      incomplete: incomplete.map(i => ({
        id: i.id,
        description: i.description,
        nodes: i.nodes.length,
      })),
    };
    
    results.push(result);
    
    // Save per-page result
    writeFileSync(
      resolve(OUTPUT_DIR, `axe-${target.name}.json`),
      JSON.stringify(result, null, 2)
    );
    
    await page.close();
  }
  
  await browser.close();
  
  // Summary
  console.log('\n═══════════════════════════════════════');
  console.log('           AUDIT SUMMARY');
  console.log('═══════════════════════════════════════');
  
  let totalViolations = 0;
  for (const r of results) {
    const name = TARGETS.find(t => r.url.endsWith(t.path))?.name || 'unknown';
    console.log(`\n${name}: ${r.violations.length} violations`);
    totalViolations += r.violations.length;
    for (const v of r.violations) {
      console.log(`  ${v.id} (${v.impact}): ${v.help}`);
    }
  }
  
  console.log(`\nTotal violations across all pages: ${totalViolations}`);
  
  // Save complete report
  const report = {
    timestamp: new Date().toISOString(),
    tool: 'axe-core 4.12.1 via Puppeteer',
    targets: TARGETS.map(t => ({ name: t.name, path: t.path })),
    results,
    summary: {
      totalPages: results.length,
      totalViolations,
    },
  };
  
  writeFileSync(
    resolve(OUTPUT_DIR, 'axe-report.json'),
    JSON.stringify(report, null, 2)
  );
  console.log(`\nFull report saved to artifacts/axe-report.json`);
}

run().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
