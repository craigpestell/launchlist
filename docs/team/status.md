# Team status log

Every role adds an entry here when it finishes a piece of work. Newest first. Anything that needs the founder's approval starts with **Needs founder:**.

Entry format:

```
## YYYY-MM-DD · <agent> · <short title>
- Did: what was done
- Decided: calls made and assumptions taken, with the reason
- Blocked: what is stuck and on whom, or "nothing"
- Cost: tokens and $ at the role's grade price, or an estimate marked est.
- Links: PR, issue, or files
```

---

## 2026-11-03 · talent-lead · Refresh the project profile
- Did: brought `project.md` up to date: added the merge policy (the Code review and publishing thread reviews and merges once the deploy gate passes).
- Decided: wrote down how the project already runs rather than changing it.
- Blocked: **Needs founder:** set the monthly budget in `budget.md`. Fixed: the company agents weren't loading in cloud sessions because the private company-kit repo wasn't in the project's repositories, so the marketplace clone at session start failed. company-kit is now a project repository; new threads install the plugins from `.claude/settings.json` (checked with `claude plugin install company-full@company-kit`).
- Cost: est. 15k tokens, Standard.
- Links: this PR.

## 2026-10-29 · talent-lead (set up from company-kit) · Join the agent company
- Did: onboarded the repo to company-kit's Full team. Added the company-skills and company-full plugins to `.claude/settings.json` (kept the session-start hook), `docs/team/project.md`, this handbook with the three content agents in the roster, the status log and the budget. `CLAUDE.md` points here.
- Decided: Full size. The content agents stay as project specialists that own `research/`, `content/` and `guides/`.
- Blocked: **Needs founder:** set the monthly budget in `budget.md`. Next work: CI (build, lint, content check) with `ci-github-actions`, and Google Analytics consent mode with `google-analytics`.
- Cost: est. 30k tokens, Standard.
- Links: company-kit PR #1.
