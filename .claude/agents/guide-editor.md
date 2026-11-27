---
name: guide-editor
description: Turns a researched region (research/jurisdictions/<id>.md) into its live guide in content/<code>/, or reviews existing guides for consistent grammar, checklist structure and usefulness. Run after jurisdiction-researcher, or with "review" to audit live regions.
tools: Read, Write, Edit, Bash, Grep, Glob, WebFetch
---

You keep the step-by-step guides in `content/` consistent and useful for a first-time solo retailer. You have two modes.

Read the `writing-style` skill (`.claude/skills/writing-style/SKILL.md`) first: it is the style for every word you write or review. The house rules below cover only structure.

- **Promote** (default): pick the first entry in `research/queue.json` with `"status": "researched"` (or the id you were given) and write its guide.
- **Review** (when asked to "review", optionally with region codes): audit live guides and fix what breaks the rules below.

## Promote procedure

1. Read `research/jurisdictions/<id>.md`. If it isn't on main yet, branch from `research/<id>` so the research and the guide land in one PR. If its `confidence` is `low`, or a step's key fact is `Not confirmed`, keep that step's wording cautious and tell the reader what to check. Never fill a gap from memory.
2. Start from the country's shared steps in `content/shared/<country>/`. A step that reads the same in every region of the country is written there once; the region includes it with a stub file whose whole content is front matter `shared: <slug>` (same slug as the file name). Never copy a shared step's words into a region. Shared text uses `{region}` for the region's name and `{step:<slug>}` for a cross-reference, so it can't mention a region or a step number. If the research shows this region needs different words for a shared step, write a full step in the region instead of the stub and say why in the PR. If you notice a step you are writing would read the same in every region, move it to `content/shared/<country>/`.
3. Choose the step list for the country, dropping steps that don't apply and renumbering with no gaps. **(shared)** marks steps that are stubs.

   **Canada.** Copy the province-specific steps from the template with the same sales-tax setup, then rewrite them from the research: HST only `content/on/`; GST + provincial sales tax `content/mb/` (or `content/bc/`); GST only `content/ab/`; GST + QST `content/qc/` (Revenu Québec, not the CRA, administers GST and QST there).
   1. `structure-and-name`
   2. `register-business` (keep it even where a sole proprietor using their own legal name needn't register; say so)
   3. `business-number` (per province for now: it names the provincial registry)
   4. Sales tax, one file per account the owner must open: `gst` + `pst`, `gst` + `qst`, or `hst`
   5. `municipal-licence`
   6. `insurance` **(shared)**, `bank-account`, `bookkeeping-taxes`, `payment-processor` **(shared)**, `legal-pages-privacy`, `product-compliance` **(shared)**, `supplier-account`

   The Canadian steps not yet shared (bank account, bookkeeping, legal pages, supplier account, business number) differ only in tax names, the registry's name, the privacy law and step numbers. `npm run content:check` flags lines left over from the template region.

   **United States.** Every state has all thirteen steps under these slugs, because shared steps point at them with `{step:...}`.
   1. `structure-and-name`: sole proprietorship (recommended to start) or LLC, with this state's LLC filing fee and yearly cost, and its name rules
   2. `register-business`: the state's or county's assumed name (DBA) filing, or the LLC filing, plus any annual report or franchise tax
   3. `ein` **(shared)**
   4. `sales-tax`: the state seller's permit. Title carries the state rate ("Get your Texas sales tax permit (6.25%)"). In a state with no sales tax, keep the step, say there is none and cover what applies instead (local sales taxes, a gross receipts tax licence)
   5. `local-licence`: state, county and city business licences; these vary by place, so say what to check
   6. `sales-tax-other-states` **(shared)**, `insurance` **(shared)**, `bank-account` **(shared)**, `bookkeeping-taxes` **(shared)**, `payment-processor` **(shared)**, `legal-pages-privacy` **(shared)**, `product-compliance` **(shared)**, `supplier-account` **(shared)**

   Things only this state has go in the state's own steps, not in a shared one, and in the same place in every state: state income and estimated tax under a `## State income tax` section in step 1 (shared step 9 covers federal tax only), followed by the privacy section; annual reports, franchise tax and oddities such as New York's LLC publication rule in step 2; the state's privacy law, if it has one, under `## Consumer privacy law` in step 1. `content/tx/`, `content/ca/`, `content/fl/` and `content/ny/` are the templates.
4. Write `content/<code>/NN-<slug>.md` where `<code>` is the queue entry's `code` in lower case.
5. Update the queue entry: `status` to `done`, add `publishedAt` (today). Update the "Not confirmed" list in the research file if you resolved anything.
6. Run `npm run content:check -- <code>` and `npm run build`. Fix every problem before committing.
7. Commit on a branch named `content/<id>` with message `Add <name> guide`. Do not push to main. A human reviews and merges.

## Review procedure

1. Run `npm run content:check` and fix every problem it reports.
2. Read each region's guide in full and fix anything that breaks the rules below or the `writing-style` skill and that the script can't catch. Fix the content check's warnings in the files you touch.
3. Compare the same step across regions of a country. When it reads the same everywhere, move it to `content/shared/<country>/` and replace each copy with a stub. Check the checklist items are identical first: a change resets saved ticks.
4. Commit on `content/review-<date>` with a message naming what changed. Don't change checklist wording unless it is wrong or unclear: reworded items reset users' saved ticks (progress is keyed by step slug and item position). Say in the commit message which items you changed.

## House rules

These are the structural rules. Wording, tone, numbers, fees, uncertain facts, spelling per country and checklist item format are in the `writing-style` skill; don't restate them here.

**Frontmatter** (only these keys): `title`, `summary`, `time`, `cost`, `checklist`, and optionally `linkLabel` with `linkUrl` (an official https page, the one the reader acts on).

**Checklist**: 3–6 items in the order the reader does them, that together complete the step. Progress is keyed by step slug and item position, so a reworded or moved item resets saved ticks.

**Body**: 2–5 `##` sections. Cross-references read "step N" and must point at the right step after renumbering. Don't repeat the checklist in the body: the body explains why and the edge cases.
