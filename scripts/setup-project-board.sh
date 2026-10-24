#!/usr/bin/env bash
# One-shot setup of the existing "Integral Education core" board (Project #6) for the
# workflow in AGENTS.md § Workflow and docs/product/review.md.
# Review, then run once from the repo root:  bash scripts/setup-project-board.sh
# Needs gh logged in with the `project` scope (check: gh auth status).
#
# Safe to re-run: it skips Status options and fields that already exist, issues that already
# exist (matched by exact title) and comments already posted (matched by marker text).
# Sections 6-8 are a proposed triage of today's open items: edit them before running.
set -euo pipefail

OWNER=paruff
REPO=paruff/integral-education
P=6
PROJECT_TITLE="Integral Education core"

log() { echo "$*" >&2; }
url_of() { echo "https://github.com/$REPO/issues/$1"; }
set_field() { # <issue url> <field> <value>
  gh project item-edit "$P" --owner "$OWNER" --url "$1" --field "$2" --value "$3" >/dev/null
  log "  $2=$3 <- $1"
}
set_status() { set_field "$1" Status "$2"; }
needs_human() { # <issue number> <gate>
  set_status "$(url_of "$1")" "Needs human review"
  set_field "$(url_of "$1")" Gate "$2"
}
existing_url() { # <exact title> -> URL of an issue with that title, or nothing
  gh issue list --repo "$REPO" --state all --limit 1000 --json title,url \
    --template '{{range .}}{{.title}}{{"\t"}}{{.url}}{{"\n"}}{{end}}' |
    awk -F'\t' -v t="$1" '$1 == t { print $2; exit }'
}
new_issue() { # <title> <labels> <parent> <status> <body> [blocked-by] -> prints the issue URL
  local url
  url=$(existing_url "$1")
  if [ -n "$url" ]; then
    log "  exists: $url"
  else
    url=$(gh issue create --repo "$REPO" --title "$1" --label "$2" --parent "$3" \
      --project "$PROJECT_TITLE" --body "$5" ${6:+--blocked-by "$6"})
    log "  created: $url"
  fi
  gh project item-add "$P" --owner "$OWNER" --url "$url" >/dev/null 2>&1 || true
  set_status "$url" "$4"
  echo "$url"
}
comment_once() { # <issue number> <marker text> <body>
  if gh issue view "$1" --repo "$REPO" --json comments --jq '.comments[].body' | grep -qF "$2"; then
    log "  comment already on #$1"
  else
    gh issue comment "$1" --repo "$REPO" --body "$3" >/dev/null
  fi
}
close_once() { # <issue number> <reason> <comment> [duplicate-of url]
  if [ "$(gh issue view "$1" --repo "$REPO" --json state --jq .state)" = CLOSED ]; then
    log "  #$1 already closed"
  elif [ -n "${4:-}" ]; then
    gh issue close "$1" --repo "$REPO" --duplicate-of "$4" --comment "$3" >/dev/null
  else
    gh issue close "$1" --repo "$REPO" --reason "$2" --comment "$3" >/dev/null
  fi
}
status_counts() { # <file of url<TAB>status> -> "status count" lines, sorted
  awk -F'\t' '{ c[$2]++ } END { for (s in c) print s "\t" c[s] }' "$1" | sort
}

gh project view "$P" --owner "$OWNER" >/dev/null
gh project edit "$P" --owner "$OWNER" \
  --description "Status for paruff/integral-education. How it works: AGENTS.md § Workflow." >/dev/null

# --- 1. Status options: rename Ready and In review in place, add Blocked -------
# Existing option IDs are passed back so every item keeps its value. A backup is taken
# first and checked afterwards; if any count changed, every item is restored from it.
BACKUP="${TMPDIR:-/tmp}/project-$P-status-$(date +%Y%m%d%H%M%S).tsv"
gh project item-list "$P" --owner "$OWNER" --limit 1000 --format json \
  --jq '.items[] | select(.content.url) | [.content.url, (.status // "")] | @tsv' >"$BACKUP"
log "Backed up $(wc -l <"$BACKUP" | tr -d ' ') item statuses to $BACKUP"

FIELD=$(gh project field-list "$P" --owner "$OWNER" --format json \
  --jq '.fields[] | select(.name=="Status") | .id')
opt() { # <option name> -> its id, or nothing
  gh project field-list "$P" --owner "$OWNER" --format json \
    --jq ".fields[] | select(.name==\"Status\") | .options[] | select(.name==\"$1\") | .id"
}
if [ -n "$(opt "Ready for agent")" ]; then
  log "Status options already set"
else
  # shellcheck disable=SC2016  # $f, $b... are GraphQL variables, not shell ones
  gh api graphql -f f="$FIELD" -f b="$(opt Backlog)" -f r="$(opt Ready)" -f i="$(opt "In progress")" \
    -f v="$(opt "In review")" -f d="$(opt Done)" -f query='
mutation($f: ID!, $b: String!, $r: String!, $i: String!, $v: String!, $d: String!) {
  updateProjectV2Field(input: {fieldId: $f, singleSelectOptions: [
    {id: $b, name: "Backlog",            color: GRAY,   description: "Not ready: dependencies open or not prioritised"},
    {id: $r, name: "Ready for agent",    color: BLUE,   description: "Only a human moves items here; agents pick from here"},
    {id: $i, name: "In progress",        color: YELLOW, description: "Claimed and being worked on"},
    {id: $v, name: "Needs human review", color: PURPLE, description: "Waiting on a human decision; the Gate field names it"},
    {name: "Blocked",                    color: RED,    description: "Waiting on something named in the issue"},
    {id: $d, name: "Done",               color: GREEN,  description: "Closed"}
  ]}) { projectV2Field { ... on ProjectV2SingleSelectField { options { name } } } }
}' --jq '"Status options: " + ([.data.updateProjectV2Field.projectV2Field.options[].name] | join(", "))' >&2

  AFTER="$BACKUP.after"
  gh project item-list "$P" --owner "$OWNER" --limit 1000 --format json \
    --jq '.items[] | select(.content.url) | [.content.url, (.status // "")] | @tsv' >"$AFTER"
  EXPECTED="$BACKUP.expected"
  awk -F'\t' -v OFS='\t' '$2=="Ready"{$2="Ready for agent"} $2=="In review"{$2="Needs human review"} 1' \
    "$BACKUP" >"$EXPECTED"
  if [ "$(status_counts "$EXPECTED")" = "$(status_counts "$AFTER")" ]; then
    log "Item statuses unchanged by the rename"
  else
    log "Status counts changed. Restoring every item from $EXPECTED"
    while IFS=$'\t' read -r url status; do
      [ -n "$status" ] && set_status "$url" "$status"
    done <"$EXPECTED"
  fi
fi

# --- 2. Gate field: which human decision an item in Needs human review waits on --
if gh project field-list "$P" --owner "$OWNER" --format json --jq '.fields[].name' | grep -qx Gate; then
  log "Gate field already exists"
else
  gh project field-create "$P" --owner "$OWNER" --name Gate --data-type SINGLE_SELECT \
    --single-select-options "Intent,Spec,Design,Plan,PR,Release,Human step" >/dev/null
  log "Created the Gate field"
fi

# --- 3. Labels: who or what, never status ----------------------------------------
gh label edit human-required --repo "$REPO" \
  --description "Has a human-only step (a property, never a status)"

# --- 4. New issues: P5-03 and P12 -------------------------------------------------
log "Creating plan issues"
P503=$(new_issue "P5-03 · Run the self-paced retention study and write the report (FR-15)" \
  "documentation,pilot,human-required,agent:claude-code" 554 Backlog "**Goal:** #554
**Plan:** \`P5-03\` in \`docs/product/plan.md\`
**Design:** \`docs/product/design.md\` §9
**Type:** docs
**Agent:** Claude Code
**Model:** Opus 5.5 (analysis); a human interprets sensitive outcomes
**Wave:** see #557
**Depends on:** #531 (P5-02)

## Done when

- [ ] Report in \`internal/pilots/\`: effect sizes with intervals, labelled preliminary, no efficacy claim from one study

Details, files and evidence: see \`P5-03\` in \`docs/product/plan.md\`. Replaces #21 (facilitated-pilot revision report)." 531)

P1202=$(new_issue "P12-02 · Land nomenclature steps 2–3 on main: new stage names alongside the old, level and tag values migrated" \
  "enhancement,agent:claude-code" 555 "Ready for agent" "**Goal:** #555
**Plan:** \`P12-02\` in \`docs/product/plan.md\`
**Design:** \`docs/product/design.md\` §8
**Type:** feat
**Agent:** Claude Code
**Model:** Sonnet 5.5
**Wave:** see #557
**Depends on:** P12-01 (PR #620, merged)

## Done when

- [ ] Commit \`99a00d7\` (branch \`feat/stage-names-steps-2-3\`) lands on \`main\` in a PR whose base is \`main\`
- [ ] Validators and build pass on \`main\`

PR #621 merged into \`docs/stage-nomenclature\`, not \`main\`, so this work is not live yet.")

P1203=$(new_issue "P12-03 · Rename docs, components and URLs per stage, with redirects (nomenclature step 4)" \
  "enhancement,agent:claude-code" 555 Backlog "**Goal:** #555
**Plan:** \`P12-03\` in \`docs/product/plan.md\`
**Design:** \`docs/product/design.md\` §8
**Type:** feat
**Agent:** Claude Code
**Model:** Sonnet 5.5
**Wave:** see #557
**Depends on:** $P1202

## Done when

- [ ] One PR per stage, each based on \`main\`, in the original order: Traditional, Rational, Pluralistic, Integral, Magical, Egocentric (branches \`feat/rename-*\`; PRs #622–#627 merged into each other, not into \`main\`)
- [ ] Every old URL redirects; build passes" "$P1202")

new_issue "P12-04 · Remove the old stage values and aliases (nomenclature step 5)" \
  "enhancement,agent:claude-code" 555 Backlog "**Goal:** #555
**Plan:** \`P12-04\` in \`docs/product/plan.md\`
**Design:** \`docs/product/design.md\` §8
**Type:** chore
**Agent:** Claude Code
**Model:** Sonnet 5.5
**Wave:** see #557
**Depends on:** $P1203

## Done when

- [ ] No old stage value left outside the \`developmental-vocabulary\` crosswalk and citations; validators and build pass" "$P1203" >/dev/null

# --- 5. Close out-of-scope facilitated-pilot issues -------------------------------
log "Closing legacy pilot issues"
close_once 20 "not planned" "Not planned: facilitated pilots are out of scope (intent.md: self-paced only; charter v0.2, #509). The self-paced retention study replaces this: #530 (P5-01)."
close_once 363 "not planned" "Not planned: facilitated participant pilots are out of scope (intent.md: self-paced only; charter v0.2, #509). Retention is measured by the self-paced study (P5, #530)."
close_once 21 "" "Superseded by $P503 (P5-03): the self-paced study report replaces the facilitated-pilot revision report." "$P503"

# --- 6. Board drift ---------------------------------------------------------------
set_status "$(url_of 539)" Done # closed on GitHub, still "In progress" on the board

# --- 7. Proposed triage of open plan items (edit before running) -------------------
log "Triage"
needs_human 586 "Human step" # GoatCounter live (#603, #604); devtools check of cookies/storage still open
needs_human 531 "Human step" # AI-drafted items merged (#602); a human validates them
needs_human 530 "Human step" # protocol merged (#601); Proof is "Protocol reviewed"
needs_human 519 "Human step" # citation worklist merged (#599) for human verification
needs_human 528 "Human step" # site published (#619); three audience readers outstanding
set_status "$(url_of 527)" "Ready for agent" # P9-03: nothing merged yet, no open dependency
set_status "$(url_of 529)" Blocked
comment_once 529 "8-week comparison window" "Blocked: the 8-week comparison window started when Clear Thinking was published (PR #619, 2026-10-21). Earliest analysis: 2026-12-16."

# --- 8. Routing table moves to AGENTS.md; #557 keeps the release order --------------
BODY=$(gh issue view 557 --repo "$REPO" --json body --jq .body)
if grep -q '^## Routing rules' <<<"$BODY"; then
  NEW_BODY="$(awk '/^## Routing rules/ { exit } { print }' <<<"$BODY")
## Routing rules

Moved to \`AGENTS.md\` § Workflow."
  gh issue edit 557 --repo "$REPO" --body "$NEW_BODY" >/dev/null
  log "Moved #557 routing rules to a pointer"
else
  log "#557 already points to AGENTS.md"
fi

# --- 9. Manual steps --------------------------------------------------------------
cat >&2 <<EOF

Done. Project: https://github.com/users/$OWNER/projects/$P
Status backup: $BACKUP

Manual step (built-in workflows can only be set in the web UI):
  Project → ⋯ → Workflows → "Pull request linked to issue": turn it off.
  It sets linked issues to "In progress", which would undo "Needs human review".
  Keep "Item closed" and "Pull request merged" on (they set Done).

Fill the new issue numbers into docs/product/plan.md (the rows that say
"issue from setup-project-board.sh"):
  P5-03  → $P503
  P12-02 → $P1202
  P12-03 → $P1203
  P12-04 → $(existing_url "P12-04 · Remove the old stage values and aliases (nomenclature step 5)")

Check both AGENTS.md § Workflow commands return items.
EOF
