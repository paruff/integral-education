#!/bin/sh
set -eu

REPO_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$REPO_ROOT"

PRICE_PER_1K_TOKENS=0.003
CREDIT_PRICE=0.01
WORK_DAYS=22
LIGHT_PER_DAY=10
MODERATE_PER_DAY=20
HEAVY_PER_DAY=50
TARGET_LINES=80
TARGET_TOKENS=320
SAVE=0

if [ "${1-}" = "--save" ]; then
  SAVE=1
fi

files="AGENTS.md .github/copilot-instructions.md CLAUDE.md"

line_count() {
  if [ -f "$1" ]; then
    wc -l < "$1" | tr -d ' '
  else
    echo 0
  fi
}

char_count() {
  if [ -f "$1" ]; then
    wc -c < "$1" | tr -d ' '
  else
    echo 0
  fi
}

token_estimate() {
  chars=$(char_count "$1")
  awk "BEGIN { printf \"%.0f\", $chars/4 }"
}

scenario_cost() {
  tokens_per_request=$1
  interactions_per_day=$2
  awk "BEGIN { printf \"%.4f\", ($tokens_per_request * $interactions_per_day * $WORK_DAYS / 1000) * $PRICE_PER_1K_TOKENS }"
}

scenario_credits() {
  cost=$1
  awk "BEGIN { printf \"%.2f\", $cost/$CREDIT_PRICE }"
}

total_lines=0
total_tokens=0
report=""

for file in $files; do
  lines=$(line_count "$file")
  tokens=$(token_estimate "$file")
  total_lines=$((total_lines + lines))
  total_tokens=$((total_tokens + tokens))
  report="$report\n$file|$lines|$tokens"
done

light_cost=$(scenario_cost "$total_tokens" "$LIGHT_PER_DAY")
moderate_cost=$(scenario_cost "$total_tokens" "$MODERATE_PER_DAY")
heavy_cost=$(scenario_cost "$total_tokens" "$HEAVY_PER_DAY")

light_credits=$(scenario_credits "$light_cost")
moderate_credits=$(scenario_credits "$moderate_cost")
heavy_credits=$(scenario_credits "$heavy_cost")

copilotignore_rule_count=0
if [ -f .copilotignore ]; then
  copilotignore_rule_count=$(grep -Ev '^[[:space:]]*(#|$)' .copilotignore | wc -l | tr -d ' ')
fi

agents_lines=$(line_count AGENTS.md)
agents_tokens=$(token_estimate AGENTS.md)

if [ "$agents_lines" -le "$TARGET_LINES" ] && [ "$agents_tokens" -le "$TARGET_TOKENS" ]; then
  agents_status="LEAN"
else
  agents_status="OVER-BUDGET"
fi

output_file=/tmp/token-audit-output-$$.txt
{
  echo "AI Assistant Always-On Token Audit"
  echo "Repo: $REPO_ROOT"
  echo "Date: $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
  echo
  echo "Always-on context files"
  echo "File|Lines|EstTokens"
  printf "%b\n" "$report" | sed '/^$/d'
  echo "TOTAL|$total_lines|$total_tokens"
  echo
  echo "Estimated monthly cost (input context only)"
  echo "Light ($LIGHT_PER_DAY/day):    \$$light_cost (~$light_credits credits)"
  echo "Moderate ($MODERATE_PER_DAY/day): \$$moderate_cost (~$moderate_credits credits)"
  echo "Heavy ($HEAVY_PER_DAY/day):    \$$heavy_cost (~$heavy_credits credits)"
  echo
  echo "Top 10 largest repository files"
  find . -type f \
    ! -path './.git/*' \
    ! -path './node_modules/*' \
    -exec wc -c {} + 2>/dev/null | sort -nr | head -n 10
  echo
  if [ -f .copilotignore ]; then
    echo ".copilotignore: present ($copilotignore_rule_count rules)"
  else
    echo ".copilotignore: MISSING"
  fi
  echo "AGENTS.md budget check: $agents_status (lines=$agents_lines target<=$TARGET_LINES, tokens=$agents_tokens target<=$TARGET_TOKENS)"
  echo
  echo "Recommendations"
  if [ "$agents_status" = "OVER-BUDGET" ]; then
    echo "- Trim AGENTS.md to <= $TARGET_LINES lines and <= $TARGET_TOKENS estimated tokens."
  else
    echo "- Keep AGENTS.md lean; move any new detail into skill files."
  fi
  if [ "$copilotignore_rule_count" -lt 20 ]; then
    echo "- Expand .copilotignore to exclude more generated/non-actionable files."
  else
    echo "- Review .copilotignore quarterly for new generated artifacts."
  fi
  if [ "$total_tokens" -gt 800 ]; then
    echo "- Reduce always-on tokens below 800 by trimming instruction files."
  else
    echo "- Always-on token footprint is within recommended range."
  fi
} > "$output_file"

cat "$output_file"

if [ "$SAVE" -eq 1 ]; then
  mkdir -p docs
  {
    echo
    echo "## Token Audit Snapshot ($(date -u '+%Y-%m-%d'))"
    echo
    echo '```text'
    cat "$output_file"
    echo '```'
  } >> docs/METRICS.md
  echo
  echo "Saved snapshot to docs/METRICS.md"
fi

rm -f "$output_file"
