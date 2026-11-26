---
name: new-topic-guide
description: Create a LaunchList topic guide (a how-to that isn't tied to a province, like "Find your IP address" or "Get a free business phone number") with steps, checklists and annotated screenshots of a third-party site. Use when asked for a new guide on a tool, website or task.
---

# New topic guide

Topic guides live in `content/topics/<slug>/` and show on the home page under the province map. They are not province steps: never add them to `content/<region>/`.

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

- `content/topics/<slug>/topic.json`: `{ "title", "summary" }`. Title starts with a verb; summary is one sentence ending with a full stop.
- Steps: `NN-kebab-slug.md`, numbered from 01 with no gaps. Two to five steps is right for a small guide.
- Follow the house rules in `.claude/agents/guide-editor.md` (frontmatter keys, 3–6 checklist items starting with a verb, `##` sections, no em dashes, Canadian spelling, bold one fact per section, `linkLabel`/`linkUrl` on the step where the reader acts).
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

- `npm run content:check`, `npm run lint` and `npm run build` pass.
- The owner checks UI in a browser themselves, so skip Playwright runs of the app; say in the PR that it wasn't checked in a browser.
- Mark the PR ready and turn on auto-merge (the owner's standing preference).
