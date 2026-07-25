#!/usr/bin/env node
/**
 * generate-content-graph.js — Generate content graph from module frontmatter
 *
 * Scans all module files, parses frontmatter, and produces a JSON graph with:
 * - Nodes: each module with id, title, stage, line, safety_tier, difficulty, format
 * - Edges: prerequisite relationships (from prerequisites field), QuickStart membership
 * - Stats: stage distribution, line coverage, safety tier counts, gold-standard compliance
 *
 * Usage: node scripts/generate-content-graph.js [--output docs/.content-graph.json]
 */

const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.join(__dirname, '..', 'docs', 'modules');
const QUICKSTARTS_DIR = path.join(__dirname, '..', 'docs', 'quickstarts');
const OUTPUT_FILE = process.argv[2] === '--output' && process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(__dirname, '..', 'docs', '.content-graph.json');

// Known stage labels in frontmatter
const STAGE_LABELS = [
  'Archaic', 'Magic', 'Magenta', 'Red', 'Amber', 'Orange', 'Green', 'Teal',
  'Integral',
];
const STAGE_TRANSITIONS = [
  'Amber → Rational', 'Rational → Pluralistic', 'Pluralistic → Integral',
  'Amber → Orange', 'Orange → Green', 'Green → Teal',
  'Rational', 'Amber',
];

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;

  const fm = {};
  const lines = match[1].split('\n');
  let currentKey = null;

  for (const line of lines) {
    const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const rawVal = keyMatch[2];
      const val = rawVal.replace(/^['"]|['"]$/g, '');
      if (val === 'true') fm[currentKey] = true;
      else if (val === 'false') fm[currentKey] = false;
      else if (!isNaN(val) && val !== '') fm[currentKey] = Number(val);
      else if (rawVal.trim().startsWith('[')) {
        // Inline YAML array: [item1, item2, ...]
        fm[currentKey] = rawVal
          .replace(/^\[|\]$/g, '')
          .split(',')
          .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean);
      } else {
        fm[currentKey] = val;
      }
    } else if (currentKey && (line.startsWith('  - ') || line.startsWith('  -'))) {
      if (!Array.isArray(fm[currentKey])) {
        fm[currentKey] = [];
      }
      const val = line.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '');
      if (val) fm[currentKey].push(val);
    }
  }

  // Parse lines and tags arrays that span multiple lines
  const linesMatch = content.match(/lines:\n([\s\S]*?)(?=\n\w|$)/);
  if (linesMatch) {
    const lineItems = linesMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    fm.linesArray = lineItems.map(l => l.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '')).filter(Boolean);
  }

  const tagsMatch = content.match(/tags:\n([\s\S]*?)(?=\n\w|$)/);
  if (tagsMatch) {
    const tagItems = tagsMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    fm.tags = tagItems.map(l => l.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '')).filter(Boolean);
  }

  const prereqMatch = content.match(/prerequisites:\n([\s\S]*?)(?=\n\w|$)/);
  if (prereqMatch) {
    const prereqItems = prereqMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    fm.prerequisites = prereqItems.map(l => l.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '')).filter(Boolean);
  }

  // Post-process: normalize fields that could be arrays or strings
  for (const key of ['prerequisites', 'tags']) {
    if (key in fm) {
      if (typeof fm[key] === 'string') {
        const s = fm[key].trim();
        if (!s || s.toLowerCase() === 'none') {
          fm[key] = [];
        } else if (s.startsWith('[')) {
          fm[key] = s.replace(/^\[|\]$/g, '').split(',').map(x => x.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
        } else {
          fm[key] = [s];
        }
      } else if (!Array.isArray(fm[key])) {
        fm[key] = [];
      }
    }
  }

  return { fm, content };
}

function extractSections(content) {
  const sections = [];
  const headingRegex = /^## (.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    sections.push(match[1].replace(/[🌀🧠⚓🔍🆘🌿🗺️🛡️📊📚⚠️⌛⏱️]/g, '').trim());
  }
  return sections;
}

// Safety Note is commonly implemented as a Docusaurus admonition
// (`:::note Safety Note` / `<Admonition title="Safety Note">`), or under a
// custom-named heading like "When to Seek Support" — a deliberate journey-
// template pattern, not a gap. Detect all forms so modules aren't flagged as
// missing a section that's genuinely present, just not literally H2 "Safety".
const SAFETY_HEADING_ALIASES = ['safety', 'seek support', 'seek help'];

function hasAdmonitionSection(content, sections, label) {
  const labelLower = label.toLowerCase();
  const aliases = labelLower === 'safety' ? SAFETY_HEADING_ALIASES : [labelLower];
  if (sections.some(s => aliases.some(a => s.toLowerCase().includes(a)))) return true;
  const fencedRegex = new RegExp(`^:::\\w+.*${labelLower}`, 'im');
  if (fencedRegex.test(content)) return true;
  const componentRegex = new RegExp(`<Admonition[^>]*title=["'][^"']*${labelLower}`, 'i');
  if (componentRegex.test(content)) return true;
  return false;
}

function inferStage(fm) {
  if (fm.level && STAGE_TRANSITIONS.some(t => fm.level.includes(t))) {
    return fm.level;
  }
  if (fm.level && STAGE_LABELS.includes(fm.level)) {
    return fm.level;
  }
  if (fm.tags) {
    const stageTag = fm.tags.find(t =>
      ['archaic', 'magenta', 'red', 'amber', 'orange', 'green', 'teal', 'integral'].includes(t)
    );
    if (stageTag) return stageTag.charAt(0).toUpperCase() + stageTag.slice(1);
  }
  return 'Unknown';
}

function inferLines(fm) {
  if (fm.linesArray && fm.linesArray.length > 0) return fm.linesArray;
  if (fm.line) return [fm.line];
  if (fm.lines) {
    if (Array.isArray(fm.lines)) return fm.lines;
    return [fm.lines];
  }
  return [];
}

function inferSafetyTier(fm) {
  if (fm.safety_tier) return `tier-${fm.safety_tier}`;
  if (fm.tags && fm.tags.includes('tier-2')) return 'tier-2';
  return 'tier-1';
}

function inferDifficulty(fm) {
  if (fm.difficulty) return fm.difficulty;
  const stage = inferStage(fm);
  if (['Archaic', 'Magic', 'Magenta', 'Red', 'Amber'].includes(stage)) return 'Beginner';
  if (['Orange', 'Rational'].includes(stage)) return 'Intermediate';
  if (['Green', 'Teal', 'Integral'].includes(stage)) return 'Advanced';
  return 'Unknown';
}

function inferFormat(fm) {
  if (fm.format) return fm.format;
  // Default based on stage and tags
  const isSomatic = (fm.tags && fm.tags.some(t => t.includes('somatic'))) ||
    (fm.line && fm.line.includes('somatic')) ||
    (fm.linesArray && fm.linesArray.includes('somatic'));
  if (isSomatic) return 'embodied-guided';
  return 'text-reflection';
}

function main() {
  console.log('🔗 Generating content graph...\n');

  const nodes = [];
  const edges = [];
  const modules = {};

  // --- Scan modules ---
  const moduleFiles = fs.readdirSync(MODULES_DIR)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .sort();

  for (const file of moduleFiles) {
    const filePath = path.join(MODULES_DIR, file);
    const result = parseFrontmatter(filePath);
    if (!result) continue;

    const { fm, content } = result;
    const sections = extractSections(content);

    const node = {
      id: fm.id || path.basename(file, path.extname(file)),
      title: fm.title || path.basename(file, path.extname(file)),
      file: `docs/modules/${file}`,
      stage: inferStage(fm),
      stageTarget: fm.level || null,
      lines: inferLines(fm),
      safetyTier: inferSafetyTier(fm),
      difficulty: inferDifficulty(fm),
      format: inferFormat(fm),
      prerequisites: fm.prerequisites || [],
      readingTime: fm.readingTime || null,
      practiceTime: fm.practiceTime || null,
      tags: fm.tags || [],
      goldStandardSections: sections.length,
      hasAQAL: sections.some(s => s.toLowerCase().includes('aqal')),
      hasPractice: sections.some(s => s.toLowerCase().includes('practice')),
      hasEvidence: sections.some(s => s.toLowerCase().includes('evidence')),
      hasSafetyNote: hasAdmonitionSection(content, sections, 'safety'),
      hasFacilitatorNote: hasAdmonitionSection(content, sections, 'facilitator'),
    };

    modules[node.id] = node;
    nodes.push(node);
  }

  // --- Create prerequisite edges ---
  for (const node of nodes) {
    for (const prereqId of node.prerequisites) {
      if (modules[prereqId]) {
        edges.push({
          source: prereqId,
          target: node.id,
          type: 'prerequisite',
        });
      }
    }
  }

  // --- Scan QuickStarts for membership edges ---
  if (fs.existsSync(QUICKSTARTS_DIR)) {
    const quickstartFiles = fs.readdirSync(QUICKSTARTS_DIR)
      .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
      .sort();

    for (const file of quickstartFiles) {
      const filePath = path.join(QUICKSTARTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Extract module references from links
      const moduleRefs = [];
      const linkRegex = /\.\.\/modules\/([\w-]+)/g;
      let match;
      while ((match = linkRegex.exec(content)) !== null) {
        moduleRefs.push(match[1]);
      }

      const qsId = path.basename(file, path.extname(file));
      for (const ref of moduleRefs) {
        if (modules[ref]) {
          edges.push({
            source: ref,
            target: qsId,
            type: 'quickstart-member',
          });
        }
      }
    }
  }

  // --- Stats ---
  const stageDistribution = {};
  const lineCoverage = {};
  const safetyCounts = { 'tier-1': 0, 'tier-2': 0 };
  const formatCounts = {};
  const difficultyCounts = {};

  for (const node of nodes) {
    const stage = node.stage;
    stageDistribution[stage] = (stageDistribution[stage] || 0) + 1;

    for (const line of node.lines) {
      lineCoverage[line] = (lineCoverage[line] || 0) + 1;
    }

    safetyCounts[node.safetyTier] = (safetyCounts[node.safetyTier] || 0) + 1;
    formatCounts[node.format] = (formatCounts[node.format] || 0) + 1;
    difficultyCounts[node.difficulty] = (difficultyCounts[node.difficulty] || 0) + 1;
  }

  // Gold-standard compliance
  const fullGoldStandard = nodes.filter(n =>
    n.hasAQAL && n.hasPractice && n.hasEvidence && n.hasSafetyNote
  ).length;

  const orphanModules = nodes.filter(n =>
    n.prerequisites.length > 0 &&
    !n.prerequisites.every(p => modules[p])
  );

  const graph = {
    generated: new Date().toISOString(),
    totalModules: nodes.length,
    totalEdges: edges.length,
    stats: {
      stageDistribution,
      lineCoverage,
      safetyTiers: safetyCounts,
      formats: formatCounts,
      difficulties: difficultyCounts,
      goldStandardCompliance: {
        full: fullGoldStandard,
        total: nodes.length,
        percentage: Math.round((fullGoldStandard / nodes.length) * 100),
      },
      orphanModules: orphanModules.length,
      avgSectionsPerModule: Math.round(
        nodes.reduce((sum, n) => sum + n.goldStandardSections, 0) / nodes.length
      ),
    },
    nodes,
    edges,
  };

  // Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(graph, null, 2));
  console.log(`✅ Content graph written to ${path.relative(path.join(__dirname, '..'), OUTPUT_FILE)}`);
  console.log(`   ${nodes.length} modules, ${edges.length} edges`);
  console.log(`   Gold-standard: ${graph.stats.goldStandardCompliance.percentage}%`);
  console.log(`   Orphan modules (unresolved prerequisites): ${orphanModules.length}`);

  // Output summary stats as JSON for CI capture
  const statsPath = path.join(path.dirname(OUTPUT_FILE), '.content-graph-stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(graph.stats, null, 2));
  console.log(`   Stats also written to ${path.relative(path.join(__dirname, '..'), statsPath)}`);

  // Return stats as JSON string to stdout for CI capture
  console.log(`\n---METRICS:${JSON.stringify(graph.stats)}:METRICS---`);
}

main();
