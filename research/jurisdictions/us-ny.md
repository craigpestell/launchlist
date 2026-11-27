---
jurisdiction: New York
country: US
researchedAt: 2026-11-26
confidence: medium
---

State-specific steps for a solo retailer in New York State. Federal steps (EIN, Schedule C/SE, quarterly federal estimates, nexus in other states, insurance, banking, FTC, CPSC/FDA) are in `us-federal.md` and `content/shared/us/`. Researched from official pages only. dos.ny.gov and ny.gov sit behind a Cloudflare bot check that blocks curl; dos.ny.gov pages were read with WebFetch where it worked. tax.ny.gov, businessexpress.ny.gov and nyc.gov loaded with curl.

New York City (the five boroughs) has extra rules: a city income tax, the NYC unincorporated business tax, higher county clerk fees and city licenses for some industries. These are marked **NYC only** below and must never be presented as statewide.

## Business structure options

- **Sole proprietorship:** one owner, unlimited personal liability, income on the owner's return (NY Business Express, Sole Proprietorship). No state filing needed when trading under your own name. Recommended to start.
- **LLC (Department of State, Division of Corporations):**
  - Articles of Organization (DOS 1336): **$200** (Business Express LLC page and DOS "Forming a Limited Liability Company in New York", seen 2026-11-26). Online filing available; average processing 7 business days by mail. Expedited handling $25 (24 hours), $75 (same day), $150 (2 hours), not required for online filing.
  - Optional: name availability search $5, name reservation (60 days) $20.
  - **Publication requirement (LLC Law § 206):** within **120 days** after the articles take effect, publish a notice in **two newspapers** in the county of the LLC's office, once a week for **six consecutive weeks**. The county clerk designates the newspapers; one must be a daily and one a weekly. Then file a Certificate of Publication with the affidavits of publication: **$50** to DOS. Failure suspends the LLC's authority to do business in New York. Newspaper charges are set by the papers and vary by county: **Not confirmed** (no official figure).
  - **Biennial statement:** every two years, in the calendar month the articles were filed; **$9**; filed online via the e-Statement Filing Service; don't file before the due month; late filing shows as "past due" in DOS records (DOS biennial statements page, seen 2026-11-26).
  - **LLC filing fee to the Tax Department (Form IT-204-LL):** a single-member LLC that is a disregarded entity with any New York-source income, gain, loss or deduction pays **$25** a year, due the 15th day of the third month after its tax year ends (March 15 for a calendar year). No extension. (IT-204-LL instructions, seen 2026-11-26.)
  - Yearly cost for a single-member LLC: $25 IT-204-LL fee plus $9 every two years for the biennial statement.
  - Name rule: must include "Limited Liability Company", "LLC" or "L.L.C."; must be distinguishable from LLCs, corporations and limited partnerships on file; certain words are restricted (LLC Law § 204) (DOS LLC page).
- Partnerships and corporations: out of scope for a solo retailer.
- **Recommendation:** start as a sole proprietor. Weigh the LLC's publication cost before forming one.

## Name search and registration

- **Sole proprietor using a name other than their own** must complete, notarize and file an **assumed name certificate (DBA)** with the **county clerk** of each county where business is conducted (GBL § 130). Forms come from legal stationery stores; some county clerks offer online filing.
  - Fee: **$25** in all counties except the five NYC counties, where it is **$100**. Certified copy $4, or $10 in NYC (Business Express Sole Proprietorship page, seen 2026-11-26). Business Express says certified copies may be needed for banks and for display at the business premises.
  - Manhattan's clerk (nycourts.gov) lists $100 filing; reported in a search summary only, not re-read. **NYC only.**
  - No statewide search covers sole-proprietor DBAs; they are kept by each county clerk. The DOS Corporation & Business Entity Database covers LLCs and corporations (link seen on DOS pages; page blocks curl).
- **LLC using another name:** files a Certificate of Assumed Name (DOS-1338-f) with DOS, **$25** for an LLC (county fees apply only to corporations). Certified copy $10; GBL § 130(4) requires a certified copy displayed at the premises (Business Express DOS-1338-f page, seen 2026-11-26).

## Federal IDs

Same as federal. New York issues no separate business number; the sales tax ID comes with the Certificate of Authority. IT-204-LL lets a disregarded LLC with no EIN use the owner's SSN.

## Sales tax

- **Certificate of Authority** from the **New York State Department of Taxation and Finance**, applied for through **New York Business Express** (needs a NY.gov Business account; Form DTF-17 instructions; DTF-17.1 questionnaire). Required for anyone selling taxable goods, including from home or once a year. Apply **at least 20 days before** you begin business; you can't legally make taxable sales until you receive it. Penalty for selling without one up to $10,000. Must be displayed at the place of business ($50 penalty if not). (TB-ST-360; Register as a sales tax vendor, updated July 25, 2025; Selling products or services.)
- **Fee:** no fee is mentioned on any Tax Department page read. **Not confirmed** that it is free (third-party sites say no fee). Guide says no fee is listed and to confirm.
- **Rates:** state **4%** plus local rates set by counties, cities and school districts; an extra **0.375%** in the Metropolitan Commuter Transportation District. Destination-based: rate where the goods are delivered; sales delivered outside New York are exempt. Rate lookup by address tool. (Sales tax rates page, seen 2026-11-26.) Combined rates for specific places: not quoted.
- **Clothing and footwear** under $110 per item are exempt from the 4% state tax; local tax applies unless the county or city elects the exemption (TB-ST-122).
- **Filing frequency:** most new vendors file **quarterly** (quarters March–May, June–August, September–November, December–February), due 20 days after the quarter ends. Annual if $3,000 or less tax due a year (due March 20). Monthly (part-quarterly) once taxable sales are $300,000 or more in a quarter. File even with no sales. Most vendors must Web File. (TB-ST-275.)
- **Resale certificate:** **Form ST-120, Resale Certificate** (current form 1/26), given to the supplier within 90 days of the purchase; generally requires a Certificate of Authority (TB-ST-240).
- **Economic nexus for out-of-state sellers:** more than **$500,000** of sales of tangible personal property delivered into New York **and** more than **100 sales**, in the immediately preceding four sales tax quarters (Registration requirement for businesses with no physical presence; threshold raised from $300,000 on June 24, 2019). Marketplace providers have the same test.
- New York is not a Streamlined Sales Tax member (us-federal.md).

## State taxes on the business and owner

- **State personal income tax:** New York taxes residents' income, including sole-proprietor and single-member-LLC profit, on Form IT-201 (IT-203 for nonresidents with NY income). No separate registration for a sole proprietor. Estimated tax required unless you expect to owe less than $300 of NYS (and $300 NYC, $300 Yonkers) tax after withholding and credits (Who must make estimated tax payments, updated November 19, 2025). Rates not quoted.
- **NYC only:** New York City residents pay NYC resident income tax on the state return; Yonkers residents pay a surcharge (NYC, Yonkers, and MCTMT page, updated June 30, 2026).
- **NYC only:** Unincorporated Business Tax, 4% of taxable income allocated to NYC, with a full credit for a liability of $3,400 or less and partial credit to $5,400 (NYC Department of Finance UBT page, seen 2026-11-26).
- **MCTMT (MCTD counties: the five boroughs plus Rockland, Nassau, Suffolk, Orange, Putnam, Dutchess, Westchester):** self-employed individuals with net earnings in a zone over **$150,000 for tax year 2026 and after** ($50,000 for 2025 and earlier) report it on the income tax return.
- LLC: $25 IT-204-LL fee and $9 biennial statement, above. No franchise tax for a disregarded LLC found.

## Licenses and permits

- No general statewide business license found. Business Express: "Many counties, cities, towns, and villages also require local permits and licenses"; the Business Wizard lists state licenses by business type (How to Start a Business in New York page). Statement that there is no general state license: secondary sources only, **Not confirmed** on an official page.
- **NYC only:** DCWP licenses businesses in over 45 industries (for example electronics stores, secondhand dealers, tobacco and e-cigarette retail dealers, general vendors). Check whether your product is one.
- Local zoning and home-occupation rules: local, not researched.

## Registered agent / address privacy

- An LLC's articles designate the Secretary of State as agent for service of process and give an address for mail; entity records are public in the DOS database. Details of the articles' address fields not re-read (DOS pages block curl): **Not confirmed**.
- A DBA certificate filed with the county clerk is public record and includes the business address.

## Privacy law

- **SHIELD Act** (2019, amends the 2005 breach notification law): any person or business that maintains New York residents' private information must keep reasonable administrative, technical and physical safeguards and notify affected consumers and the Attorney General, Department of State and State Police after a breach (AG SHIELD Act page). Applies regardless of size; small-business sizing of safeguards not read on the official page.
- **No comprehensive consumer privacy law in force found** (the New York Privacy Act remains a bill; the Health Information Privacy Act was vetoed December 19, 2025 and reintroduced in 2026). Source: news and law-firm summaries only. **Not confirmed** on an official page.

## Employer registrations (brief)

Employers need unemployment insurance, workers' compensation, and disability benefits insurance for employees over 30 days in a calendar year (Business Express). Out of scope for a solo retailer.

## Ordered checklist

1. structure-and-name (sole proprietor vs LLC, $200 + publication, name rules, state income tax, SHIELD Act)
2. register-business (county clerk DBA $25 / $100 NYC; or LLC articles, publication, $50 certificate, $9 biennial, $25 IT-204-LL)
3. ein (shared)
4. sales-tax (Certificate of Authority, 4% + local, ST-120, $500,000 and 100 sales)
5. local-licence (Business Wizard, local offices, NYC DCWP)
6. sales-tax-other-states (shared)
7. insurance (shared)
8. bank-account (shared)
9. bookkeeping-taxes (shared)
10. payment-processor (shared)
11. legal-pages-privacy (shared)
12. product-compliance (shared)
13. supplier-account (shared)

## Not confirmed

- Whether the Certificate of Authority is free (no fee stated on any Tax Department page read).
- Newspaper publication costs for an LLC (set by the papers; vary by county).
- That New York has no general state business license (secondary sources only; ny.gov blocked).
- No comprehensive consumer privacy law in force (secondary sources only).
- LLC articles' address fields and what appears publicly (DOS pages block curl).
- County-by-county DBA fees beyond Business Express's $25 / $100 statement (some counties may add charges).

## Sources (fetched 2026-11-26)

- https://www.businessexpress.ny.gov/app/answers/cms/a_id/3050 (Sole Proprietorship)
- https://www.businessexpress.ny.gov/app/answers/cms/a_id/2443 (LLC Articles of Organization)
- https://www.businessexpress.ny.gov/app/answers/cms/a_id/1939 (Certificate of Assumed Name, DOS-1338-f)
- https://www.businessexpress.ny.gov/app/portal/content/start_a_business
- https://dos.ny.gov/forming-limited-liability-company-new-york (WebFetch)
- https://dos.ny.gov/biennial-statements-business-corporations-and-limited-liability-companies (WebFetch)
- https://www.tax.ny.gov/bus/st/register.htm
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/how_to_register_for_nys_sales_tax.htm
- https://www.tax.ny.gov/bus/doingbus/sell.htm
- https://www.tax.ny.gov/bus/st/rates.htm
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/filing_requirements_for_sales_and_use_tax_returns.htm
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/exemption_certificates_for_sales_tax.htm
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/clothing_and_footwear.htm
- https://www.tax.ny.gov/pubs_and_bulls/publications/sales/nexus.htm
- https://www.tax.ny.gov/pdf/current_forms/st/dtf17i.pdf
- https://www.tax.ny.gov/pdf/publications/sales/pub750.pdf (11/15 edition)
- https://www.tax.ny.gov/forms/current-forms/it/it204lli.htm
- https://www.tax.ny.gov/pit/estimated_tax/who_must_make.htm
- https://www.tax.ny.gov/pit/file/nyc_yonkers_residents.htm
- https://www.tax.ny.gov/bus/mctmt/
- https://www.nyc.gov/site/finance/business/business-unincorporated-business-tax-ubt.page
- https://www.nyc.gov/site/dca/businesses/licenses.page
- https://ag.ny.gov/resources/organizations/data-breach-reporting/shield-act

Blocked: dos.ny.gov and ny.gov return a Cloudflare challenge to curl (dos.ny.gov/form-limited-liability-company and ny.gov/services/how-start-business-new-york-state also failed in WebFetch, 404 and 503).

This is general information, not legal or tax advice.
