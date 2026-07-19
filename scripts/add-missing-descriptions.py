"""Add descriptive frontmatter to files missing it."""

import os
import re
import glob

# Module descriptions (for the 8 .md modules missing description)
MODULE_DESCRIPTIONS = {
    'mindfulness-basics.md': 'An introduction to foundational mindfulness practice — breath awareness, body scanning, and open monitoring — for developing cognitive and somatic attention across the Personal → Pluralistic stage range.',
    'cognitive-bias-101.md': 'A practical guide to recognizing and mitigating common cognitive biases, with stage-aware debiasing strategies and reflective practices for rational decision-making.',
    'emotional-granularity.md': 'Build emotional vocabulary and discrimination skills to name feelings with precision, moving from diffuse emotional states to differentiated, actionable self-awareness.',
    'affect-labelling-somatic-correlation.md': 'Develop the practice of linking emotional experiences to their somatic signatures, improving interoceptive awareness and emotional regulation capacity.',
    'emotional-appraisal-meaning-making.md': 'Explore how emotions encode meaning — a cognitive-emotional practice for decoding the evaluative judgments embedded in emotional responses.',
    'shadow-integration-101.md': 'An introduction to shadow work using Wilber\'s 3-2-1 Process — face, talk to, and be the disowned parts of self for greater wholeness and psychological integration.',
    'systems-thinking-101.md': 'Foundational systems thinking concepts — feedback loops, leverage points, emergence — applied to personal development, organizational dynamics, and social change.',
}

# Gross state awareness is an .mdx file
MODULE_DESCRIPTIONS_MDX = {
    'gross-state-awareness.mdx': 'A systematic exploration of the gross (waking) state of consciousness — sensory perception, body awareness, and the stabilization of attention in ordinary reality.',
}

QUICKSTART_DESCRIPTIONS = {
    'personal-to-integral.md': 'A structured 3–6 week path from conventional self-awareness to integral, multi-perspectival understanding — blending mindfulness, cognitive reframing, and shadow literacy.',
    'moral-line-development.mdx': 'A developmental path through the moral line — from pre-conventional to post-conventional ethical reasoning, with stage-specific practices and shadow awareness.',
    'shadow-work.mdx': 'A guided introduction to shadow integration — projection recognition, the 3-2-1 Process, and safe practices for engaging disowned aspects of self.',
    'state-development.mdx': 'Build deliberate access to the full spectrum of meditative states — gross, subtle, causal, and nondual — and integrate peak experiences into stable trait-level shifts.',
}

MAP_DESCRIPTIONS = {
    'aqal-overview.md': 'The complete reference for AQAL — All Quadrants, All Levels, All Lines, All States, All Types — Ken Wilber\'s comprehensive map of human experience and development.',
    'aqal-competency-map.md': 'A competency framework mapping measurable developmental capacities across all quadrants, levels, lines, states, and types — the canonical design reference for pathway and assessment decisions.',
    'aqal-label-crosswalk.md': 'A dual-layer language model and cross-reference table translating developmental stage labels across major theorists for learner accessibility and conceptual precision.',
    'ilp-practice-taxonomy.md': 'A taxonomy of Integral Life Practice categories, progression ladders, and safety constraints organized by quadrant, line, and stage for curriculum and pathway design.',
}

PILOT_DESCRIPTIONS = {
    'pilot-pathway-integral-foundations.md': 'A 4-week pilot pathway introducing adult learners to the Integral/AQAL framework with foundational competencies in all five AQAL dimensions.',
    'pilot-pathway-shadow-foundations.md': 'A 4-week pilot pathway for low-intensity shadow literacy and projection practices with explicit safety scaffolding for adult learners.',
    'pilot-revision-report-template.md': 'A structured template for reporting pilot pathway revisions, including feedback analysis, content changes, safety updates, and success metrics.',
    'pilot-runbook-20-40.md': 'The operational runbook for 20–40 minute pilot Pathways A and B — session plans, facilitator notes, materials checklists, and contingency protocols.',
}


def add_description(filepath, description):
    """Add description frontmatter field if not present."""
    with open(filepath) as f:
        content = f.read()

    # Check if description already exists
    if re.search(r'^description:', content, re.MULTILINE):
        print(f'  SKIP (already has description): {filepath}')
        return False

    # Parse frontmatter - find first --- ... ---
    m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not m:
        print(f'  SKIP (no frontmatter): {filepath}')
        return False

    frontmatter = m.group(1)

    # Find the right place to insert description.
    # Put it after 'title:' line (or sidebar_label if it comes right after title)
    lines = frontmatter.split('\n')
    insert_idx = None
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith('title:') or stripped.startswith('sidebar_label:'):
            insert_idx = i + 1

    # If we didn't find title, insert after id
    if insert_idx is None:
        for i, line in enumerate(lines):
            if line.strip().startswith('id:'):
                insert_idx = i + 1

    # If all else fails, insert after first line
    if insert_idx is None:
        insert_idx = 1

    # Wrap long descriptions (>80 chars) with indented continuation lines
    wrapped_desc = description
    # Insert description as a frontmatter field
    desc_line = f'description: {wrapped_desc}'
    lines.insert(insert_idx, desc_line)

    new_frontmatter = '\n'.join(lines)
    new_content = content.replace(frontmatter, new_frontmatter, 1)

    with open(filepath, 'w') as f:
        f.write(new_content)

    print(f'  ADDED description: {filepath}')
    return True


def main():
    changed = 0

    print('=== Modules ===')
    for filename, desc in MODULE_DESCRIPTIONS.items():
        filepath = os.path.join('docs/modules', filename)
        if add_description(filepath, desc):
            changed += 1

    for filename, desc in MODULE_DESCRIPTIONS_MDX.items():
        filepath = os.path.join('docs/modules', filename)
        if add_description(filepath, desc):
            changed += 1

    print('\n=== Quickstarts ===')
    for filename, desc in QUICKSTART_DESCRIPTIONS.items():
        filepath = os.path.join('docs/quickstarts', filename)
        if add_description(filepath, desc):
            changed += 1

    print('\n=== Maps ===')
    for filename, desc in MAP_DESCRIPTIONS.items():
        filepath = os.path.join('docs/maps', filename)
        if add_description(filepath, desc):
            changed += 1

    print('\n=== Pilots ===')
    for filename, desc in PILOT_DESCRIPTIONS.items():
        filepath = os.path.join('docs/pilots', filename)
        if add_description(filepath, desc):
            changed += 1

    print(f'\nTotal files updated: {changed}')


if __name__ == '__main__':
    main()
