---
jurisdiction: Michigan
country: US
researchedAt: 2026-11-26
confidence: medium
---

State-specific steps for a solo retailer in Michigan. Federal steps (EIN, Schedule C/SE, quarterly federal estimates, nexus in other states, insurance, banking, FTC, CPSC/FDA) are in `us-federal.md` and `content/shared/us/`.

**Access note:** every michigan.gov page (LARA Corporations Division, Department of Treasury, including PDF forms under michigan.gov/-/media) returned an Akamai "Access Denied" (403) to curl and to WebFetch on 2026-11-26. The MiBusiness Registry Portal (mibusinessregistry.lara.state.mi.us) shows a bot-verification page. So fees, rates, thresholds and deadlines below were confirmed from the **Michigan Compiled Laws on legislature.mi.gov** (official, loaded with curl), the Streamlined Sales Tax state table, and one county clerk page. Treasury's administrative practice (license fee, filing frequency, annual return) comes only from search-result summaries of Treasury FAQ pages and is marked **Not confirmed**.

## Business structure options

- **Sole proprietorship:** one owner, unlimited personal liability, income on the owner's return. No state filing to set one up when trading under your own name. Recommended to start.
- **LLC (Department of Licensing and Regulatory Affairs, Corporations Division, "the administrator"):**
  - Articles of Organization: **$50** (MCL 450.5101(1)(b), seen 2026-11-26). Fee waived for initial articles if a majority of initial membership interests are held by veterans (MCL 450.5101(7)). A $50 extra fee may be charged for documents filed or sent by fax or other electronic transmission (MCL 450.5101(2)); whether LARA charges it for MiBusiness Registry online filing: **Not confirmed**. Fees are not refundable.
  - Name reservation: $25 (MCL 450.5101(1)(e)).
  - **Annual statement** (resident agent and registered office): **$25 through September 30, 2027, then $15** (MCL 450.5101(1)(g), amended 2023 PA 133). Due **February 15** each year; an LLC formed after September 30 skips the February 15 immediately after formation (MCL 450.4207(3)). Late penalty: **Not confirmed**.
  - Every LLC must keep a registered office and a resident agent in Michigan (an individual resident whose office or residence is the registered office, or a qualifying company) (MCL 450.4207(1)).
  - No state franchise tax or LLC minimum tax found for a single-member LLC. Michigan's corporate income tax and its treatment of a disregarded single-member LLC were not read: **Not confirmed** (guide points to an accountant).
  - Yearly cost for a single-member LLC: the annual statement ($25, falling to $15 after September 30, 2027).
  - Name rule (MCL 450.4204): must contain "limited liability company", "L.L.C." or "L.C." (with or without punctuation); must not contain "corporation", "incorporated", "corp." or "inc."; must be distinguishable from LLCs, corporations, limited partnerships and reserved or assumed names on file; must not imply an unpermitted purpose or use words restricted by other statutes. Compliance gives no substantive right to the name.
  - Online filing: LARA's MiBusiness Registry Portal (bot check; not read).
- Partnerships and corporations: out of scope.
- **Recommendation:** start as a sole proprietor; an LLC is cheap to form in Michigan if you want liability separation.

## Name search and registration

- **Sole proprietor using any name other than their real name** must file an **assumed name certificate** ("Certificate of Persons Conducting Business Under Assumed Name") **in duplicate with the county clerk** of each county where they do business or keep an office, **before** starting business, on the county's form, signed and acknowledged (notarized) (MCL 445.1, 445.2).
  - Statutory fees: $6 filing fee (MCL 445.1(1)) plus $10 indexing and filing fee, which includes 2 certified copies (MCL 445.3(1)). A charter county over 2,000,000 people (Wayne) may set its own fee by ordinance (MCL 445.1(5)).
  - County fees actually charged vary: Mason County **$16 new, $14 renewal**, valid 5 years, filed in person, notarized (Mason County clerk page, read 2026-11-26). Search summaries of other county pages: Kent $10, Newaygo $10, Alpena $15 (not read directly; Kent's site blocked curl with Cloudflare).
  - Valid **5 years**; renewal certificate before expiry, statutory renewal fee $4 (counties' actual renewal charges vary); the clerk mails a renewal notice 60–30 days before expiry (MCL 445.1a).
  - The clerk may reject a name likely to mislead or the same as or confusingly similar to one already filed **in that county** (MCL 445.2). No statewide index of sole-proprietor assumed names.
  - Moving the business: file a change-of-location certificate; moving to another county means filing there before doing business (MCL 445.2a).
  - Penalty: misdemeanor, $25–$100 fine, and you can't sue on contracts made under the name until you comply (MCL 445.5).
  - Exception: "The selling of goods by sample or through a traveling agent or traveling salesperson, or by means of orders forwarded by the purchaser through the mails" is not treated as conducting business for the act (MCL 445.1(2)). How this applies to an online store: **Not confirmed**; guide says ask the county clerk and not to rely on it.
- **LLC using another name:** files a Certificate of Assumed Name with LARA, **$25** (MCL 450.5101(1)(f)). Effective until December 31 of the fifth full calendar year after the year filed; renew for further 5-year periods no earlier than 90 days before expiry; LARA sends notice 90 days before (MCL 450.4206(2)–(3)). LLCs do not file with county clerks (Mason County page).

## Federal IDs

Same as federal. Michigan issues no separate business number for this purpose; Treasury registration (Form 518 / Michigan Treasury Online) gives the sales tax account.

## Sales tax

- **Sales tax license** from the **Michigan Department of Treasury**, required before engaging in a business taxable under the General Sales Tax Act, issued for the tax year (MCL 205.53(1)). Doing business without one is a misdemeanor, fine up to $1,000 and/or up to 1 year (MCL 205.53(3)). Treasury may require a surety bond of $1,000–$25,000 (or a deposit) in some cases, mainly prior non-payment (MCL 205.53(1)).
- Register online through **Michigan Treasury Online (MTO)** (mto.treasury.michigan.gov loads, but content is a JavaScript app) or on paper with **Form 518, Registration for Michigan Taxes**. Search summary of Treasury pages: paper takes 4–6 weeks.
- **Fee:** search summary of Treasury's sales tax license FAQ says there is no fee; **Not confirmed** by a direct read. Guide says no fee listed, confirm. License renewal: search summary of Treasury pages says the license is valid for a calendar year and renews automatically; **Not confirmed**.
- **Rate:** **6%** of gross proceeds (MCL 205.52(1)). **No local sales taxes** ("Has Local Jurisdiction Taxes: No", Streamlined Sales Tax state table, read 2026-11-26). Use tax is also 6% (not re-read).
- **Filing:** statute default is a monthly return due the **20th** of the following month (MCL 205.56(1)); Treasury may require other periods (MCL 205.56(4)). Search summary of Treasury pages: Treasury assigns monthly, quarterly or annual filing, for new filers based on estimated activity; all filers also file an **annual return by February 28**. Assignment rules and the annual return: **Not confirmed** by a direct read.
- **Resale:** **Form 3372, Michigan Sales and Use Tax Certificate of Exemption** (Treasury PDF; blocked, known from search results and RAB 2021-18 summaries). Michigan also accepts the Streamlined Sales Tax certificate (search summary). A seller making both retail and resale sales must hold a license (MCL 205.52c(6)).
- **Economic nexus (out-of-state sellers):** gross receipts from sales to Michigan purchasers **over $100,000**, **or 200 or more** separate transactions into Michigan, in the **previous calendar year**; applies to transactions on or after October 1, 2018; marketplace sellers count marketplace and direct sales together (MCL 205.52c). Treasury FAQ example (search summary): a seller passing the threshold in one year registers and collects from January 1 of the next.
- Michigan is a full **Streamlined Sales Tax** member since October 1, 2005 (SST state page).

## State taxes on the business and owner

- **State income tax:** flat rate on individuals' taxable income; **4.25%** from October 1, 2012, subject to a one-year reduction when a general fund revenue trigger applies (MCL 206.51(1)(b)–(c)). The rate for tax year 2026: **Not confirmed** (Treasury blocked; whether the trigger applies for 2026 was not found on an official page). Guide gives the statutory 4.25% and tells the reader to confirm the current year's rate.
- **Estimated tax:** required if the annual Michigan tax is expected to exceed withholding and credits by **more than $500**; installments April 15, June 15, September 15 and January 15 (MCL 206.301(1)).
- **City income tax (local):** Treasury page (search summary): "Twenty-four Michigan cities" levy income taxes; Treasury administers Detroit's; other cities administer their own. City rates: **Not confirmed** (secondary sources only). Guide says about two dozen cities, including Detroit, and to check with the city.
- No franchise tax, gross receipts tax or LLC minimum tax found for a sole proprietor or disregarded LLC.

## Licenses and permits

- No general statewide business license found on an official page (michigan.gov blocked). **Not confirmed**. Guide says Michigan does not appear to have one, and to check product licenses and local rules.
- City, township, village and county licenses, zoning and home-occupation rules: local, not researched.

## Registered agent / address privacy

- An LLC must keep a registered office and resident agent in Michigan (MCL 450.4207); the annual statement reports them. Public visibility of these on LARA's records: **Not confirmed** (portal blocked), but the annual statement exists to keep them on record.
- A county assumed name certificate records the owner's full name and address, meaning residence or principal business address (MCL 445.1(1), (4)(b)).

## Privacy law

- **Identity Theft Protection Act (MCL 445.72):** a person or agency that owns or licenses data in a database and discovers a security breach must notify affected Michigan residents, unless it determines the breach is not likely to cause substantial loss or injury or identity theft. Applies regardless of size.
- **No comprehensive consumer privacy law in force.** 2025 SB 359 (Personal Data Privacy Act) was reported from committee and referred to the Committee of the Whole in June 2025, with no later action shown (legislature.mi.gov bill page, read 2026-11-26).

## Employer registrations (brief)

Out of scope for a solo retailer (unemployment insurance and withholding registration also go through Form 518 / MTO).

## Ordered checklist

1. structure-and-name (sole proprietor vs LLC $50 + $25 annual statement, name rules, 4.25% income tax, city income tax, breach law)
2. register-business (county clerk assumed name, about $10–$16, 5 years; or LLC articles $50, annual statement Feb 15; LLC assumed name $25)
3. ein (shared)
4. sales-tax (sales tax license from Treasury via MTO, 6%, no local, Form 3372, $100,000 or 200 transactions)
5. local-licence (no general state license found; check city/township and product licenses)
6. sales-tax-other-states (shared)
7. insurance (shared)
8. bank-account (shared)
9. bookkeeping-taxes (shared)
10. payment-processor (shared)
11. legal-pages-privacy (shared)
12. product-compliance (shared)
13. supplier-account (shared)

## Not confirmed

- Sales tax license fee (search summary of Treasury FAQ says none; not read directly).
- Sales tax license annual validity and automatic renewal.
- How Treasury assigns filing frequency to a new seller, and the February 28 annual return.
- Form 3372 current version and SST certificate acceptance (Treasury pages blocked).
- Michigan income tax rate for tax year 2026 (statute says 4.25% subject to a revenue trigger).
- City income tax list and rates.
- Whether the $50 electronic-transmission fee applies to MiBusiness Registry online filings.
- Annual statement late penalty.
- No general state business license (michigan.gov blocked).
- How the mail-order exception in MCL 445.1(2) applies to online sellers.
- County assumed name fees in most counties (only Mason read directly; Kent, Newaygo, Alpena from search summaries).
- Corporate income tax treatment of a single-member LLC.

## Sources (fetched 2026-11-26)

- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-450-5101 (LLC fees)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-450-4204 (LLC name)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-450-4206 (LLC assumed name)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-450-4207 (registered office, annual statement)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-445-1 (assumed name certificate)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-445-1a (5 years, renewal)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-445-2 (before commencing, rejection)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-445-2a (change of location)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-445-3 ($10 indexing fee, certified copies)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-445-5 (penalty)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-205-52 (6%)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-205-52c (economic nexus)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-205-53 (license, bond, penalty)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-205-56 (returns due the 20th)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-206-51 (income tax rate)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-206-301 (estimated tax)
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-445-72 (breach notice)
- https://www.legislature.mi.gov/Bills/Bill?ObjectName=2025-SB-0359 (privacy bill status)
- https://www.streamlinedsalestax.org/state-tables/michigan (6%, no local taxes, SST member)
- https://masoncountymi.gov/departments/clerk/dba.php (county DBA fee example)
- Search-result summaries only (pages blocked): https://www.michigan.gov/taxes/business-taxes/sales-use-tax/information/sales-tax-license-faq, https://www.michigan.gov/taxes/business-taxes/new-biz/registration-faqs, https://www.michigan.gov/taxes/business-taxes/sales-use-tax/information/remote-seller-faq, https://www.michigan.gov/taxes/citytax/what-cities-impose-an-income-tax, https://www.michigan.gov/documents/taxes/3372_216612_7.pdf

Blocked: all of www.michigan.gov (LARA and Treasury, HTML and PDFs) returns Akamai 403 to curl and WebFetch; mibusinessregistry.lara.state.mi.us shows a bot-verification page; accesskent.com (Kent County) returns a Cloudflare block.

This is general information, not legal or tax advice.
