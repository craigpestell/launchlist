---
name: new-guide
description: Create or extend any LaunchList guide - a region guide (a province, territory or US state), a step shared by a whole country (federal IDs and taxes), or a topic guide (a how-to that isn't tied to a place, like "Find your IP address") - with steps, checklists and annotated screenshots. Use when asked for a new guide, a new state or province, or a guide on a tool, website or task.
---

# New guide

Every guide is the same thing: numbered Markdown steps with a checklist, shown with annotated screenshots. Only where the files live differs. Pick the kind first.

| Kind | Content | Screenshots (`region` in the manifest) | Listed in |
|---|---|---|---|
| Region guide: one province, territory or state | `content/<code>/NN-<slug>.md` | `guides/capture/<code>/` | `research/queue.json` |
| Shared step: the same for every region of a country | `content/shared/<country>/<slug>.md` | `guides/capture/shared-<country>/` | each region that uses it |
| Topic guide: not tied to a place | `content/topics/<slug>/` + `topic.json` | `guides/capture/<slug>/` | home page, by `group` |

Countries are data, not code: `content/countries.json` (name, what its regions are called, capture locale, screenshot aliases), the regions in `research/queue.json`, and a map in `src/lib/maps/`. The home page, map, metadata, content check and capture locale all read from those, so a new region needs no code change.

## Write it once

Before writing a step, ask who else needs the same words.

- **The same in every region of the country** (a federal ID, federal tax, insurance, payment processors, product safety): write it in `content/shared/<country>/<slug>.md`. Each region includes it with a stub file, `content/<code>/NN-<slug>.md`, whose whole content is front matter `shared: <slug>`. The stub sets the step's position and URL; the words come from the shared file.
- Shared text can't name a region or a step number. Use the tokens `{region}` ("Texas") and `{step:<slug>}` ("step 4", from that region's own numbering). If a step needs a sentence only one region has, it isn't shared: keep it in the region.
- **Shared screenshots**: a federal page looks the same from every region, so capture it once under `shared-<country>` with the step's slug as the step name. Regions without their own shots for that slug fall back to it. Never capture a federal page per region.
- A fix to a shared step is one edit. Changing its checklist resets saved ticks in every region that uses it, so say so in the PR.
- If you find yourself copying a step between regions, stop and move it to `content/shared/`. If you find country-specific logic in `src/` or `scripts/`, move it to `content/countries.json`.

## Region guides

Run the three content agents in order, one region each: `jurisdiction-researcher` (official sources into `research/jurisdictions/<id>.md`), `guide-editor` (writes `content/<code>/`, using shared steps), `guide-screenshotter` (captures the region's own official pages). Their files in `.claude/agents/` hold the step lists per country and the house rules. Regions are independent, so several can run side by side; shared steps must exist first, and only one run at a time edits `content/shared/`, `research/queue.json` entries other than its own, or `guides/manifest.json` entries other than its own region's.

Government sites block the cloud container, so research and capture run on the owner's Mac (sections 2 and 5 below apply to government pages as much as to third-party sites).

## Topic guides

Topic guides live in `content/topics/<slug>/` and show on the home page under the maps. They are not region steps: never add them to `content/<region>/`. Sections 1 to 6 below were written for topics; 2, 4, 5 and 6 apply to every kind.

## 1. Pin down the exact site

Get the exact URL before writing anything. Similar names are easy to mix up (whatsmyip.com and whatismyip.com are different sites with different layouts). If the request names a site without a URL, use the most likely one and say which in your first reply, so the person can correct it early.

## 2. Look at the real page first

The cloud container's proxy blocks most third-party sites (`curl` gets 000 / 403). Read the page on the person's Mac instead, with Claude in Chrome (`mcp__claude-in-chrome__*`):

- `get_page_text` for the wording, then a screenshot for the layout.
- `javascript_tool` to find stable selectors: ids and semantic class names (`.ip-card-ipv4`, `a.ip-link-ipv4`), not Tailwind utility classes.
- Note what a first-time visitor meets: cookie or consent banners (choose the privacy-preserving option, e.g. Disagree), ad interstitials, links that look like buttons (on whatismyip.com, clicking the address opens a lookup page; the Copy button copies).
- Check what differs by visitor (IPv4 only vs both, logged-in vs not) and cover it in the body.
- Check every claim you make about the site against the page (link targets, button labels). Don't write from memory.

## 3. Write the content

- `content/topics/<slug>/topic.json`: `{ "title", "summary", "group" }`. Title starts with a verb; summary is one sentence ending with a full stop. `group` picks the home page section: `"business"` (Run your business: phone number, donations, products) or `"help"` (Quick help: everyday tech and support tasks like IP address, cache, screenshots).
- Steps: `NN-kebab-slug.md`, numbered from 01 with no gaps. Two to five steps is right for a small guide.
- Follow the house rules in `.claude/agents/guide-editor.md` (frontmatter keys, 3–6 checklist items starting with a verb, `##` sections, no em dashes, spelling of the country the guide is for, bold one fact per section, `linkLabel`/`linkUrl` on the step where the reader acts).
- Use documentation examples for any address or number shown in text: IPv4 `203.0.113.x` (RFC 5737), IPv6 `2001:db8::` (RFC 3849), phone `555-01xx`.
- Run `npm run content:check -- <slug>` (needs `npm ci` first in a fresh container).

### Write for how readers use it

Ask what the reader will do with the result, and check the guide against that. The IP guide was first written for "support asked for my IP"; a client then linked it for customers adding addresses to an allow list, and it needed these fixes:

- **Don't pick one variant for the reader** when the service may use either. If a page shows several values (IPv4 and IPv6), say to copy all of them, and say what to do when only one shows.
- **Cover the reader without a browser** when the task often happens on servers or office machines: give a one-line command (`curl https://ifconfig.me`), and the Windows quirk (`curl.exe` in PowerShell).
- **Name the right machine**: the computer that runs the tool or script, not the reader's laptop.
- **Cover the cases where the result won't hold** (mobile data, shared carrier-grade NAT addresses, values that change) and what to do instead.
- **Say where to go first.** The first checklist item and the first body section tell the reader to open the site ("Click the X button above, or go to x.com"). The `linkUrl` button alone isn't an instruction.
- **Keep steps consistent**: anything step 1 says to collect, the later steps say to use or send.

Linked guides get read by people outside LaunchList's usual audience, so keep the wording general ("a service", "a provider"), not only "your store".

## 4. Capture script

Write `guides/capture/<slug>/<NN-step>.mts` with `captureStep("<slug>", "<NN-step>", [...])` from `guides/capture/lib.mts`. Copy the shape of `guides/capture/ip-address/01-look-up-your-ip.mts`.

- **Mask personal data before the shot.** Sites like IP checkers show the capturer's real IP, city, postal code, ISP and map. In `setup`, overwrite those with documentation examples via `page.evaluate`, hide maps, and say in the caption that the shot uses example values. Nothing from the owner's own connection or accounts goes into `public/`.
- Highlights are numbered in order; refer to them as (1), (2), (3) in the caption. Captions end with a full stop; alt text describes what is highlighted.
- Scroll the target into view in `setup`; the viewport is 1280×800.

## 5. Run the capture on the Mac

The cloud can't reach most sites, so:

1. Commit and push the branch (`claude/...`), then open a draft PR.
2. Start Remote Control in `/Users/craig/work` with instructions to: fetch the branch into a worktree (not the main checkout, which has untracked files), `npm ci`, run `npm run guides:capture guides/capture/<slug>/<step>.mts`, open each image in `public/guides/<slug>/` and check it matches its caption and shows no real personal data, fix selectors from `guides/capture/.debug/` if a capture fails, then commit the images and `guides/manifest.json` and push.
3. On the Mac, Playwright 1.63 may not find its headless shell. Set `CHROMIUM_PATH` to the installed one (e.g. `~/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell`) rather than downloading another.
4. Many consumer sites block automated browsers (whatismyip.com serves a Cloudflare block page to Playwright). Don't try to get around the block. Instead take the shot in the owner's own Chrome with Claude in Chrome, the way a person would:
   - Open the page, run the script's masking code and the outline/badge code from `annotate()` in `lib.mts` with `javascript_tool`. Also hide ads, iframes, floating video players and any map that loaded (maps load late and pin the owner's real area).
   - Move the mouse off the content, then `screenshot` with `save_to_disk: true`. The file lands in the session's `tool-results/` folder.
   - Crop out ad remnants and the cursor with `sharp(...).extract(...).webp({ quality: 85 })` into `public/guides/<slug>/<step>/NN.webp`, and add the manifest entry by hand (same fields `captureStep` writes), with a comment in the capture script saying it was captured by hand.
   - Read the final image and check for any real IP, city, postal code, ISP or map before committing.
5. If neither route works, ship text-only and say so in the PR.

## 6. Ship

- `npm run content:check`, `npm run lint` and `npm run build` pass. Run the full content check, not only `-- <code>`: shared steps are checked on a full run.
- The owner checks UI in a browser themselves, so skip Playwright runs of the app; say in the PR that it wasn't checked in a browser.
- Mark the PR ready and turn on auto-merge (the owner's standing preference).
