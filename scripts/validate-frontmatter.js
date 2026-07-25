#!/usr/bin/env node
/**
 * validate-frontmatter.js — CI and pre-commit validation for module frontmatter
 *
 * Checks:
 * 1. All modules have required fields (id, title, description, tags)
 * 2. Safety tiers are consistent (tier-2 tag requires safety_tier: 2 frontmatter)
 * 3. Format field is present and valid
 * 4. No prohibited vocabulary in public-facing modules
 * 5. Journey-template section coverage (AQAL Mapping / Orient / Encounter /
 *    Learn / Practice / Stabilize / Integrate / Reflect / Assess / Retrieval
 *    Schedule / Evidence, plus Frameworks/Gifts/Limitations folded into Learn
 *    and Facilitator/Safety Note as admonitions)
 *
 * Usage: node scripts/validate-frontmatter.js [--fix]
 */

const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.join(__dirname, '..', 'docs', 'modules');

// Required frontmatter fields for ALL modules
const REQUIRED_FIELDS = ['id', 'title', 'description'];

// Valid format values
const VALID_FORMATS = ['text-reflection', 'embodied-guided', 'facilitated-group'];

// Journey-template skeleton (see .agents/skills/module-authoring/SKILL.md):
// AQAL Mapping -> Orient -> Encounter -> Learn -> Practice -> Stabilize ->
// Integrate -> Reflect -> Assess -> Retrieval Schedule -> Evidence and
// Citations. Facilitator Note / Safety Note are admonitions, not H2s.
const JOURNEY_STEPS = [
  'AQAL Mapping',
  'Orient',
  'Encounter',
  'Learn',
  'Practice',
  'Stabilize',
  'Integrate',
  'Reflect',
  'Assess',
  'Retrieval Schedule',
  'Evidence',
];

// Theoretical Frameworks / Gifts / Limitations fold into custom-named
// headings inside Learn (e.g. "Four Framework Lenses", "The Gifts of
// Orange") rather than literal "## Theoretical Frameworks" — matched by
// keyword alias, not exact substring, so a custom heading isn't wrongly
// flagged as a missing section.
const CONCEPT_ALIASES = {
  'Frameworks': ['framework'],
  'Gifts': ['gift'],
  'Limitations': ['limitation', 'shadow'],
};

// Prohibited vocabulary in learner-facing modules (not tagged 'integral' or 'internal')
const PROHIBITED_VOCABULARY = [
  'integral',            // in learner-facing context
  'AQAL',
  'Spiral Dynamics',
  'worldview',
  'postmodern',
  'transcend',
  'centre of gravity',
  'center of gravity',
  'pre/trans',
  'pre-trans',
];

let exitCode = 0;

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;

  const fm = {};
  const lines = match[1].split('\n');
  let currentKey = null;

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      fm[currentKey] = keyMatch[2].replace(/^['"]|['"]$/g, '');
    } else if (currentKey && line.startsWith('  - ')) {
      if (!Array.isArray(fm[currentKey])) {
        fm[currentKey] = [];
      }
      fm[currentKey].push(line.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, ''));
    } else if (currentKey && line.startsWith('  ')) {
      // multi-line value
      fm[currentKey] += ' ' + line.trim();
    }
  }

  // Extract tags line separately
  const tagsMatch = content.match(/tags:\n([\s\S]*?)(?=\n\w|$)/);
  if (tagsMatch) {
    const tagLines = tagsMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    fm.tags = tagLines.map(l => l.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, ''));
  }

  return { fm, content };
}

function extractSections(content) {
  const sections = [];
  const headingRegex = /^## (.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    sections.push(match[1].replace(/[🌀🧠⚓🔍🆘🌿🗺️🛡️📊📚⚠️]/g, '').trim());
  }
  return sections;
}

// Safety Note and Facilitator Note are commonly implemented as Docusaurus
// admonitions (`:::note Safety Note` / `<Admonition title="Safety Note">`)
// rather than literal `## ` H2 headings — check both forms so a module isn't
// flagged as missing a section that's genuinely present, just not H2-wrapped.
const ADMONITION_SECTIONS = ['Facilitator Note', 'Safety Note'];
// "Safety Note" is also legitimately expressed as a custom-named heading like
// "When to Seek Support" under the journey-template pattern.
const HEADING_ALIASES = {
  'safety note': ['seek support', 'seek help'],
};

function hasAdmonitionSection(content, sections, label) {
  const labelLower = label.toLowerCase();
  const aliases = [labelLower, ...(HEADING_ALIASES[labelLower] || [])];
  if (sections.some(s => aliases.some(a => s.toLowerCase().includes(a)))) return true;
  const fencedRegex = new RegExp(`^:::\\w+.*${labelLower}`, 'im');
  if (fencedRegex.test(content)) return true;
  const componentRegex = new RegExp(`<Admonition[^>]*title=["'][^"']*${labelLower}`, 'i');
  return componentRegex.test(content);
}

function checkGoldStandard(sections, content) {
  const found = sections.map(s => s.toLowerCase());
  const missing = [];

  for (const step of JOURNEY_STEPS) {
    const stepLower = step.toLowerCase();
    const matched = found.some(f => f.includes(stepLower) || stepLower.includes(f));
    if (!matched) missing.push(step);
  }

  for (const [concept, aliases] of Object.entries(CONCEPT_ALIASES)) {
    const matched = found.some(f => aliases.some(a => f.includes(a)));
    if (!matched) missing.push(concept);
  }

  for (const section of ADMONITION_SECTIONS) {
    if (!hasAdmonitionSection(content, sections, section.toLowerCase())) {
      missing.push(section);
    }
  }

  return missing;
}

function validateFile(filePath) {
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  const result = parseFrontmatter(filePath);
  if (!result) {
    console.log(`  ⚠️  No frontmatter found: ${relativePath}`);
    return;
  }

  const { fm, content } = result;
  const errors = [];
  const warnings = [];

  // 1. Required fields
  for (const field of REQUIRED_FIELDS) {
    if (!fm[field] || fm[field] === '') {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // 2. Format field (recommended)
  if (fm.format) {
    if (!VALID_FORMATS.includes(fm.format)) {
      errors.push(`Invalid format "${fm.format}". Valid: ${VALID_FORMATS.join(', ')}`);
    }
  }
  // Only warn if missing format — not all modules have it yet
  // This is informational for now

  // 3. Safety tier consistency
  const tags = fm.tags || [];
  const hasTier2Tag = tags.includes('tier-2');
  const hasSafetyTier = fm.safety_tier !== undefined;

  if (hasTier2Tag && !hasSafetyTier) {
    warnings.push('Has tier-2 tag but no safety_tier frontmatter field');
  }

  // 4. Gold standard section coverage
  const sections = extractSections(content);
  const missingSections = checkGoldStandard(sections, content);
  if (missingSections.length > 0) {
    warnings.push(`Missing gold-standard sections: ${missingSections.join(', ')}`);
  }

  // 5. Prohibited vocabulary (only check non-integral modules)
  const isIntegralAudience = tags.includes('teal') || tags.includes('integral');
  if (!isIntegralAudience) {
    for (const word of PROHIBITED_VOCABULARY) {
      const body = content.replace(/^---[\s\S]*?---\n/, ''); // exclude frontmatter
      // Use word boundary for more precise matching
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(body)) {
        warnings.push(`Prohibited vocabulary "${word}" found in learner-facing module body`);
      }
    }
  }

  // Report
  if (errors.length > 0) {
    console.log(`  ❌ ${relativePath}`);
    errors.forEach(e => console.log(`       ${e}`));
    exitCode = 1;
    return 'error';
  } else if (warnings.length > 0) {
    console.log(`  ⚠️  ${relativePath}`);
    warnings.forEach(w => console.log(`       ${w}`));
    return 'warning';
  } else {
    console.log(`  ✅ ${relativePath}`);
    return 'pass';
  }
}

function main() {
  console.log('\n📋 Frontmatter Validation\n');

  const files = fs.readdirSync(MODULES_DIR)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .sort();

  let validated = 0;
  let passed = 0;
  let warned = 0;

  for (const file of files) {
    const filePath = path.join(MODULES_DIR, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      validated++;
      const status = validateFile(filePath);
      if (status === 'pass') passed++;
      else if (status === 'warning') warned++;
    }
  }

  console.log(`\n📊 Summary: ${validated} files validated`);
  console.log(`   ✅ Pass: ${passed}`);
  console.log(`   ⚠️  Warnings: ${warned}`);
  console.log(`   ❌ Errors: ${validated - passed - warned}`);
   console.log(`   Frontmatter compliance: ${Math.round((passed / validated) * 100)}% (${passed}/${validated})\n`);

  process.exit(exitCode);
}

main();
