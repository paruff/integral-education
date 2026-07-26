> Load with: "gitops skill" in your prompt
> Example: "Use the gitops skill to implement this feature."

# GitOps Skill

## Core Principle
`main` is the single source of truth. Nothing is deployed, configured, or
considered "live" unless it is a committed, merged change in git — no
hand-edited deploy artifacts, no manual GitHub Pages uploads, no config
changed by clicking in the GitHub UI without a matching PR.

## Reconciliation Path
```
PR opened → ci-quality.yml (build + validate) → human/CODEOWNERS review
   → merge to main → deploy-gh-pages.yml (auto build + publish)
```
- `deploy-gh-pages.yml` triggers only on push to `main` (or manual
  `workflow_dispatch`). It is the *only* path that publishes to GitHub
  Pages — never push directly to the `gh-pages` output.
- `ci-quality.yml` runs on every PR and every push to `main`; treat a red
  run as blocking, not advisory.

## Non-Negotiables
- No direct commits to `main` — every change lands via PR (see the
  `pr-contract` skill for review/size rules).
- No force-push, no history rewrite, on `main` or any shared branch.
- No skipped hooks (`--no-verify`) and no bypassed CI checks to land a change faster.
- Roll forward, don't hand-patch: fix a bad `main` with a revert commit or a
  new PR, never by editing deployed output or repo state out-of-band.
- Config-as-code: workflow, dependency (`dependabot.yml`), and repo-policy
  changes go through the same PR + review path as content changes — never
  edited only in repo settings.
- Commits stay small and mapped to one intent (see `pr-contract` skill);
  this keeps `git revert` safe and reconciliation diffs legible.

## Known Gap (flag, don't silently fix)
- `main` currently has no branch protection rule (confirmed via
  `gh api repos/<owner>/<repo>/branches/main/protection` → 404). This means
  direct pushes and force-pushes are technically possible even though this
  skill says not to do them. Enabling protection (required PR reviews,
  required status checks, block force-push) is a repo-settings change with
  real blast radius — surface it to a human, don't toggle it unasked.
