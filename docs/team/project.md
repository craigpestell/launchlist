# Project profile

Every role reads this file first. It holds everything specific to Launchlist, so the shared role agents from [company-kit](https://github.com/craigpestell/company-kit) stay generic. `talent-lead` keeps it current, with `engineering-lead` for the technical sections.

## Product

- **Name:** LaunchList.
- **What it is:** step-by-step checklists for launching and running an online store: a setup guide per Canadian province and territory (US states queued), plus topic guides for any store, with annotated screenshots. Anonymous progress stays in the browser; an optional magic-link account syncs it to Postgres.
- **Owner:** the founder's own product.
- **Stage:** pre-launch. The site is set to `noindex`, and the README's "Before sharing" warns that fees and links haven't been verified against official sites yet.

## Stack

- Next.js (App Router, TypeScript; a newer Next than most training data, so read `node_modules/next/dist/docs/` first, per `AGENTS.md`), Tailwind CSS, Drizzle ORM on Postgres (Neon in production), Resend for sign-in email, Cloudflare Turnstile, Playwright for guide captures.
- Code map: `content/<code>/` and `content/topics/<slug>/` (guide steps as Markdown with frontmatter), `research/` (`queue.json` and per-region research), `guides/` (capture scripts and `manifest.json`), `public/guides/` (screenshots), `src/app/` (routes: `[region]`, `topics`, `account`, `admin`, `api`, `privacy`), `src/lib/` (`steps.ts`, `guides.ts`, `progress*.ts`, `auth.ts`, `request-guard.ts`, `turnstile.ts`), `src/db/` and `drizzle/` (schema and migrations), `scripts/`.

## Project specialists

The content pipeline has its own agents in `.claude/agents/`, run in order per region: `jurisdiction-researcher`, `guide-editor` (also "review" mode), `guide-screenshotter`. They own `research/`, `content/` and `guides/`. `product-lead` decides which regions and topics come next; `engineering-lead` owns everything in `src/`, `scripts/` and the database.

## Commands

| What | Command |
| --- | --- |
| Install | `npm ci` (the cloud session hook does this and starts a local Postgres) |
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Content checks | `npm run content:check` (or `-- <code>`) |
| Migrations | `npm run db:generate`, `npm run db:migrate` |
| Capture a guide's screenshots | `npm run guides:capture guides/capture/<code>/<step>.mts` (most government sites need a local machine) |

## Hosting and deploys

- **Host:** Vercel, with Neon Postgres from the Vercel Marketplace. Company skill: `vercel-hosting`.
- **How a change reaches production:** merge to `main`; Vercel deploys it. PRs get preview URLs. Run `npm run db:migrate` against production before merging a change that needs a new migration.
- **Rollback:** promote the previous deployment in Vercel, then revert on `main`. Migrations aren't rolled back.
- **Where secrets live:** Vercel environment variables (`DATABASE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`, Turnstile keys, `ADMIN_EMAIL`, `APP_URL`, `NEXT_PUBLIC_GA_ID`); names in `.env.example`.

## Rules every role keeps

- Guides cite official sources. Never invent a fee, form, link or deadline; mark anything unverified.
- Anonymous visitors' progress never leaves the browser.
- Sign-in tokens stay hashed, single use, short-lived; sign-in requests stay rate limited; state-changing API calls keep the same-origin check; production fails closed without Turnstile.
- Editing or reordering checklist items resets saved ticks; avoid it on live regions unless the content needs it, and say so in the PR.
- Content passes `npm run content:check`.

## Deploy gate

- `npm run build`, `npm run lint` and `npm run content:check` pass on the exact commit (there is no CI yet; adding it with the `ci-github-actions` skill is planned).
- `qa-engineer` has checked the Vercel preview.
- `security-compliance` has reviewed changes to auth, sessions, the request guard, Turnstile, the admin page or the database schema.
- No role approves its own work.

## What only the founder approves

- Removing `noindex`, launching, or sharing the site publicly
- Spending money and contacting anyone outside the company
- Production migrations that drop or rewrite data

## Analytics

Google Analytics 4 via `NEXT_PUBLIC_GA_ID` (production only), loaded in `src/app/layout.tsx` without consent mode. Moving it onto the `google-analytics` skill's consent pattern is planned, with the privacy page updated to match.
