---
name: writing-style
description: The LaunchList writing style for every guide - region, shared, topic and translated - covering voice, reading level, titles, summaries, checklists, numbers, fees, dates, links, uncertain facts, terms, spelling per country and per-language notes. Use whenever you write, edit, review or translate guide content, captions or alt text.
---

# Writing style

One style for every guide: province, territory and state guides, the shared steps in `content/shared/`, topic guides in `content/topics/`, screenshot captions and alt text, and every translation. Where a file lives and how it is built is in the `new-guide` skill; this skill is only about the words. Agents and skills point here instead of repeating these rules, so change a rule here, once.

`npm run content:check` enforces the rules marked **(checked)**. The rest is for you and for review.

## Who we write for

A first-time owner starting a small shop, often alone, and often a customer of a client site who arrived from a link. They are not an accountant, a lawyer or a developer, they are reading on a phone between other jobs, and English or French may be their second language. They want to know what to do next, what it costs and how long it takes.

So every sentence either tells them what to do or explains why it matters. If it does neither, cut it.

## Voice and tone

- **Second person, active voice, present tense.** "You register online", not "Registration can be completed online" or "The owner will need to".
- **Plain and calm.** No hype, no jokes, no exclamation marks, no "simply", "just" (as in "just click"), "easy", "obviously" or "of course": what is easy for us may not be for the reader.
- **We** is LaunchList, and only for a recommendation: "We recommend registering from the start." Never "I".
- **Information, not advice.** Say what the rules are and what most small sellers do. Where the answer depends on the reader's situation, say who decides it: "Ask an accountant whether...", "Check with your city". Never "you should file as..." or "you must incorporate".
- **Direct about obligations.** If the law requires something, say so plainly and bold it once: "You **must register** once your sales pass $30,000."
- Keep the wording general where a guide may be read outside LaunchList's usual audience: "a service", "a provider", not only "your store".

## Reading level and sentences

- Aim for about grade 8 (a 13 to 14 year old reads it easily). Test a paragraph by reading it aloud.
- **Sentences: about 20 words or fewer**, one idea each. Split a sentence that has two "and"s or a semicolon.
- **Paragraphs: one to three sentences.** A section is a few short paragraphs, or a short list.
- **Common words** over formal ones: "use" not "utilize", "start" not "commence", "about" not "approximately", "if" not "in the event that", "before" not "prior to", "so" not "therefore".
- **No Latin abbreviations** (checked): write "for example", "that is", "and so on" instead of "e.g.", "i.e.", "etc."
- **Jargon gets explained the first time**: "a resale certificate, which lets you buy stock without paying sales tax". Acronyms are spelled out on first use in a step unless the reader meets them more often as letters than words (GST, HST, LLC, EIN, IP): "the Canada Revenue Agency (CRA)", then "the CRA".
- No em dashes (checked, in titles, summaries, checklists and body). Use a full stop, a comma or brackets. The only exception is the `linkLabel` button text, "CRA — GST/HST for businesses", where the dash separates the organization from the page.
- No hyphen standing in for a dash ("word - word").

## Titles

- **Sentence case, starting with a verb**, no full stop (checked): "Register for GST (5%)", "Get a municipal business licence", "Find your IP address".
- **Name the thing people search for**: the tax, registry, licence or tool, not a category. "Write your website's privacy policy and legal pages", not "Website legal pages and privacy".
- Sales tax titles carry the rate: "Register for HST (13%)", "Get your Texas sales and use tax permit (6.25%)".
- Don't add the region to a province step title; the page title adds it. (US sales tax permits name the state because the permit's official name does.)
- Topic titles are the search itself: "Check if a site is down for everyone or just you".

## Summaries

- **One sentence, 70 to 130 characters, ending with a full stop** (length is a checked warning, the full stop an error).
- It starts the search snippet, so it must make sense with nothing around it and include the main term. Say what the reader gets: "Get the free nine-digit number from the Canada Revenue Agency that every business account uses."
- Not: "The final step before you can order stock." (meaningless out of context) or "Protects you personally." (a fragment).

## Checklists

- **3 to 6 items**, in the order the reader does them, that together finish the step.
- **Each item is one action starting with a capital verb**, no trailing punctuation, under 110 characters (checked): "Search the name in the BC Registry".
- The last item is usually what to keep: "Note your GST number and filing due dates".
- Mark the choice we recommend with **"(recommended)"**, lower case, in brackets, right after the choice (checked). A short qualifier may follow inside the brackets: "Choose Fongo Works (recommended) or TextNow", "Decide on a sole proprietorship (recommended to start)".
- The first item of a guide that sends the reader to a site says where to go: "Click the WhatIsMyIP.com button above, or go to www.whatismyip.com". The button alone isn't an instruction.
- **Reworded items reset saved ticks**, because progress is keyed by step and item position. Don't reword a live item for style alone, and say in the PR which items changed.

## Body

- Sections start at `##` (checked), with short plain headings: "When you must register", "Filing", "Selling outside BC". No `#`, and no skipped levels.
- **2 to 5 sections**, a few sentences each.
- **Open with one or two sentences of plain prose** that answer the title's question, before any list.
- Don't repeat the checklist. The body explains why, the thresholds, and the edge cases.
- **Bold one fact per section at most**: the threshold, the rate, the deadline, "must register". Not whole sentences, not for decoration.
- Lists are for three or more parallel items. Each item starts with a capital letter; no full stop unless it is a full sentence.
- Keep a guide's steps consistent with each other: what step 1 tells the reader to collect, the later steps tell them to use.
- Write for what the reader will do with the result, including the cases where it won't work (see "Write for how readers use it" in `new-guide`).

## Numbers, money, rates and dates

- **Numerals** for all numbers, except "one" where it reads as a word ("one permit for each place of business"). Thousands get a comma: "$30,000".
- **Money**: "$70", "$60.52", "$150–$300", "$30/month", "$800 a year". No "CAD" or "USD": the country is understood (Canadian dollars in Canadian guides, US dollars in US guides). Write "Free", not "$0", for a fee, but "$0–$30/month" is fine for a range of plans.
- **Percent**: "5%", no space (checked), "%" not "percent".
- **Ranges** use an en dash with no spaces: "1–2 hours", "$0–$30/month" (checked in `time` and `cost`). In prose, "between $50 and $100" also works.
- **Dates**: "January 31", "April 15, 2027", "the 20th of the month after the period ends". No numeric dates (05/06/2026 means different days in Canada and the US). Months are spelled out.
- **Durations**: "30 minutes", "2–3 weeks", "90 days". Say "business days" only when the source does.
- **Time of day** (rare): "9 am", "5:30 pm" in English.
- `time` and `cost` are short phrases, not sentences: "30 minutes", "Free (a security bond may be required)", "Varies by municipality".

## Facts we aren't sure of

Fees, rates, thresholds and deadlines change, and every guide cites official sources. Never invent one or fill a gap from memory.

- **Every specific government fee, rate or threshold carries when it was seen and a nudge**: "$60 for 5 years (seen October 2026; confirm current fee)". Use "confirm current fees", "confirm current amounts", "confirm current threshold" or "confirm current rates" to match. In `cost`, a dollar amount without "(seen ...)" is a checked warning.
- One note per sentence is enough; don't repeat it on every number in a list.
- **If the research marks a fact `Not confirmed`**, say so and send the reader to the source: "No fee listed (confirm when you apply)", "Check the current requirements with Service Nova Scotia or a lawyer before you publish your terms of sale." Never state an unconfirmed fact as settled.
- **Anything that varies by city, county or municipality says so** and tells the reader what to check. Never present one city's rule as the region's rule; name the city when you give an example ("In Saskatoon, a home-based business licence...").
- **Give the whole test, not half of it.** The PR #56 accuracy pass found guides that gave the $30,000 GST threshold over four quarters but not the single-quarter test. When a rule has several conditions or exceptions, state them all or say there are more.
- The same fact reads the same in every region of a country. If two provinces say different things about voluntary GST registration, one is wrong or one is missing context. Prefer moving such text into `content/shared/<country>/`.

## Links and names

- `linkUrl` is the official https page the reader acts on (checked: https). `linkLabel` names the organization and the page: "CRA — business registration", "Texas Comptroller sales tax permit application".
- In the body, **name the place, don't say "click here"** (checked): "Use the Comptroller's Sales Tax Rate Locator". Body links are rare; the step's button is the main link.
- Refer to the step's button as "the X button above" when the reader should click it.
- **Cross-references**: "step 4" (lower case) in a region guide, `{step:<slug>}` in shared text, and a link to `/topics/<slug>` for a topic guide. Check they still point at the right step after renumbering (step numbers are checked).
- **Use official names, exactly**, then a short form: "Canada Revenue Agency (CRA)", "Revenu Québec" (never "Revenue Quebec"), "Texas Comptroller of Public Accounts", then "the Comptroller". Keep accents in names: Québec, Revenu Québec.
- **Name the region's own law or office**, not a neighbour's. BC and Alberta have their own private-sector privacy law (PIPA), Quebec has Law 25; elsewhere in Canada it's PIPEDA. Quebec's GST and QST go to Revenu Québec, not the CRA.
- **UI labels exactly as the screen shows them**, in bold when the reader must find them: "Click **Copy**", "**2-step verification**". Keep the product's own spelling even when it differs from ours ("Color" in a US plugin).
- **Example data** is from documentation ranges: IPv4 `203.0.113.x`, IPv6 `2001:db8::`, phone `555-01xx`, the persona in `guides/persona.ts`. Never real people's details.

## Terms

Use one word for one thing across all guides.

| Use | Not |
|---|---|
| sign in (verb), sign-in (noun or adjective) | log in, login (except a product's own label, like "Ontario.ca Login") |
| email | e-mail |
| website, online store | web site, webstore, e-shop |
| sole proprietor, sole proprietorship | sole trader, sole-proprietor |
| business name (Canada), assumed name / DBA, fictitious name (US: use the state's own term) | trade name, unless it is the official term |
| business licence (Canada), business license (US) | permit, unless the official name is permit |
| sales tax permit / seller's permit (US: use the state's official name) | resale licence, tax ID |
| accountant | tax professional, CPA (unless a CPA specifically is meant) |
| customer | client, consumer (except in a law's name) |
| stock, inventory | goods for resale |
| bylaw | by-law |
| Wi-Fi | WiFi, wifi |
| the CRA, the IRS | CRA (without "the") in a sentence |

## Spelling by country

The guide's country decides the spelling. Slugs never change (a US step is still `local-licence`). Proper names and UI labels keep their own spelling; put a label the reader must find in bold, or in double quotes when you only name it ("Color"), and the spelling check skips quoted text.

| | Canada and topic guides | United States |
|---|---|---|
| Rule | Canadian spelling: -our, -re, licence (noun) / license (verb), cheque, -ize (organize, recognize) | American spelling: -or, -er, license, check |
| Checked | color, favor, behavior, labor, center (outside names) | licence, cheque, colour, favour, behaviour, labour, centre, catalogue, honour, neighbour, organisation |

Topic guides use Canadian spelling, since they serve the same Canadian sites and are translated for Canada first. In topics the spelling check is a warning, because products' UI labels often use US spelling.

## Captions and alt text

- **Caption**: one or two imperative sentences, ending with a full stop (checked), that tell the reader what to do on that screen and refer to highlights as (1), (2), (3). Fees and thresholds match the step's text exactly. If the shot uses example values, say so.
- **Alt text**: what the screenshot shows and what is highlighted, starting with the page's name: "Ontario Business Registry sign-in page with the Register a business button highlighted". Never "screenshot of" or empty (checked: at least 20 characters).

## Translations

A translation says the same thing as the English, in natural writing for that language's readers, not word for word. Everything above applies (voice, structure, uncertain-fact notes, no invented facts) unless the language notes below say otherwise.

- Translate a whole guide at a time, so terms stay consistent across its steps.
- Use the official term in that language for every tax, agency and form: look it up on the agency's own site in that language. The glossary of terms lives with the translations (`content/translations/<lang>/glossary.md`); this skill holds the style, the glossary only the terms.
- Link to the official page in that language when one exists, and keep the English page when none does.
- Keep the checklist's item count and order identical to the English, so the steps line up.
- Keep numbers, fees and dates the same values; only their format changes.
- Keep the "(seen ...; confirm ...)" note, translated.

### Canadian French (fr-CA)

French covers the Canadian guides and the topic guides. US state guides are not translated into French.

- **Titles, headings and checklist items use the infinitive**, as Canada.ca and Québec.ca write task titles and lists: "S'inscrire à la TPS (5 %)", "Noter votre numéro d'entreprise".
- **Body text uses vous, always, with the imperative** for actions: "Inscrivez-vous en ligne", "Notez votre numéro".
- Follow Canadian usage (Office québécois de la langue française and the federal Translation Bureau), not France's: "courriel" (not "e-mail"), "entreprise individuelle", "numéro d'entreprise (NE)", "en ligne", "site Web", "magasin en ligne".
- **Taxes**: TPS (GST), TVH (HST), TVQ (QST), TVP (PST in BC and Saskatchewan), and taxe de vente au détail (TVD) for Manitoba's RST. Agencies: Agence du revenu du Canada (ARC), Revenu Québec, Registraire des entreprises.
- **Typography** (the translation stamp script applies the spacing; check it is there):
  - a non-breaking space before the colon only, not before `;`, `?` or `!` (that is France's convention);
  - a non-breaking space before `%` and `$`: "5 %", "30 000 $", "60 $ pour 5 ans";
  - a space as the thousands separator, a comma as the decimal mark: "60,52 $";
  - guillemets with non-breaking spaces inside: « Copier »;
  - 24-hour time: "9 h", "17 h 30";
  - dates: "31 janvier", "le 15 avril 2027"; months and days in lower case.
- **Titles and headings in sentence case**, as in English ("S'inscrire à la TPS (5 %)").
- Gender-neutral where it reads naturally ("la personne propriétaire", "votre entreprise"), without dotted forms like "propriétaire.s".
- The rule of about 20 words a sentence stretches a little in French; still split anything over 25.
- The em dash rule holds; French uses the same commas and full stops instead.

### Spanish (es, planned)

Spanish is planned next, for the general topic guides and the US state guides. Before the first Spanish round, settle and write here:

- usted or tú (default: **usted**, as US government sites do);
- neutral US Spanish vocabulary, matching the IRS and state agencies' Spanish pages;
- the official Spanish names of US taxes and agencies (most state sites have none, so keep the English official name with a Spanish explanation the first time);
- number format (US Spanish usually keeps "$1,000.50" and "5%").

## What content:check enforces

`scripts/style-rules.mjs` holds the style checks that are cheap to automate; `scripts/check-content.mjs` runs them on every step. **Errors** fail the check; **warnings** are printed but don't.

| Rule | Level |
|---|---|
| No em dash in title, summary, checklist or body | error |
| Title has no trailing punctuation; summary ends with a full stop | error |
| Checklist: 3–6 items, capital first letter, no trailing punctuation, under 110 characters, no duplicates | error |
| "recommended" in a checklist only as "(recommended" in brackets | error |
| Body sections start at `##` | error |
| No e.g., i.e., etc., "click here", "simply", "obviously" | error |
| No space before % ("5 %") in English | error |
| En dash in `time` and `cost` ranges | error |
| Spelling of the guide's country, in region and shared guides | error |
| Spelling in topic guides | warning |
| Summary 70–130 characters | warning |
| A `cost` with a dollar amount has a "(seen ...)" note, unless it is an estimate ("about $150") | warning |

When you add a check, add its row here, and keep it cheap and free of false alarms on proper names. A rule that needs judgement stays a written rule.
