---
jurisdiction: Massachusetts
country: US
researchedAt: 2026-11-26
confidence: medium
---

State-specific steps for a solo retailer in Massachusetts. Federal steps (EIN, Schedule C/SE, quarterly federal estimates, nexus in other states, insurance, banking, FTC, CPSC/FDA) are in `us-federal.md` and `content/shared/us/`. Researched from official sources only.

**Access:** mass.gov (DOR, OCABR, business pages) returns 403 (Akamai) to curl and to WebFetch. sec.state.ma.us (Corporations Division) and mtc.dor.state.ma.us (MassTaxConnect) sit behind Imperva Incapsula: curl gets the challenge page and WebFetch gets an empty page. The key fees, rates and thresholds were therefore confirmed in the **Massachusetts General Laws on malegislature.gov** (which loads), plus city and town clerk pages (boston.gov, plymouth-ma.gov). A few mass.gov and sec.state.ma.us facts come only from search-result summaries of those official pages and are marked as such.

## Business structure options

- **Sole proprietorship:** one owner, unlimited personal liability, profit on the owner's Massachusetts return. No state filing to set one up. Recommended to start.
- **LLC (Secretary of the Commonwealth, Corporations Division):**
  - Certificate of organization: **$500**. M.G.L. c. 156C § 12(d): "The fee for the filing of the certificate of organization required by subsection (a) shall be five hundred dollars." (malegislature.gov, seen 2026-11-26.) Search summaries of the Corporations Division fee schedule and the mass.gov "Starting a limited liability company" page give the same $500.
  - Certificate contents (§ 12(a)): name, Massachusetts office address, name and address of a **resident agent** (with written consent), any managers, at least one authorized signer, general character of the business. These become public record.
  - **Annual report:** every LLC files one with the state secretary (§ 12(c)); fee **$500** (§ 12(d)). Due date: on or before the anniversary of the original certificate of organization, per a search summary of the Secretary's LLC information page and 950 CMR 112 (both blocked to direct reading). **Due date Not confirmed on a page read directly.**
  - Yearly cost for a single-member LLC: $500 annual report. No state LLC minimum or franchise tax found for a single-member LLC treated as a disregarded entity (Not confirmed; DOR pages blocked).
  - Pending bill H.479 (194th session) would cut the annual report fee to $100 for LLCs under $50,000 revenue; it is a bill only (malegislature.gov bill summary in search results). Not law as far as found.
  - Name rule (c. 156C § 3): must contain "limited liability company", "limited company", "L.L.C.", "L.C.", "LLC" or "LC"; may not be the same as or deceptively similar to a name of an entity on file, except with written consent.
- Partnerships and corporations: out of scope for a solo retailer.
- **Recommendation:** start as a sole proprietor. An LLC costs $500 to form and $500 every year.

## Name search and registration

- **Business certificate (DBA)**, M.G.L. c. 110 § 5: anyone doing business under a title other than their real name files a certificate with the **clerk of every city or town** where they have an office. It states the full name and residence of each owner, the street address and the business name. It is executed **under oath** and signed in front of the clerk or a person authorized to take oaths (notary). It is **valid for four years** and must be renewed every four years, or it lapses. Changes of address, residence or discontinuance must be filed. Copies must be available at the business address to customers on request. Penalty: fine up to $300 for each month of violation. (malegislature.gov, seen 2026-11-26.)
- **Fee:** set by each city or town. The statute's default (c. 262 § 34 cl. 20) is $1, but it applies only "unless otherwise established" by the town meeting or city council, and towns set their own. Examples seen November 2026: **Boston $65** for a new filing or renewal (boston.gov business certificate page; also says the clerk notarizes on site for free, no virtual address or PO box, bring a lease or landlord letter); **Plymouth $50** new or renewal, after a zoning sign-off (plymouth-ma.gov). Search summary for Newton listed $35 (not read directly). No statewide fee.
- **No newspaper publication** for a business certificate found in c. 110 § 5.
- **LLC trading under another name** also files a business certificate with the city or town clerk: c. 110 § 6 exempts an LLC only when it does business under its true registered name. Boston's page says the same and that the entity must be registered with the Secretary first.
- Name search: each city or town keeps its own index (c. 110 § 5); no statewide DBA search. Boston has an online Business Certificate Database. Entity names are on the Corporations Division database (blocked to curl).

## Federal IDs

Same as federal. Massachusetts issues no separate business number; the sales tax registration has its own account in MassTaxConnect. Search summaries of mass.gov say businesses register with an EIN, and a sole proprietor with no employees may use a Social Security number.

## Sales tax

- **Registration:** c. 64H § 7: no one may do business as a vendor without a registration for **each place of business**, issued under c. 62C § 67. Apply through **MassTaxConnect** (Massachusetts Department of Revenue). The certificate is **Form ST-1, Sales and Use Tax Registration**, and must be posted (search summary of mass.gov "Register your business with MassTaxConnect"; page blocked).
- **Fee:** c. 62C § 67 says "The fee for each registration shall be determined annually by the commissioner of administration"; registrations may be issued for terms of at least three years and renewed without an additional fee. The current fee amount: **Not confirmed** (no DOR page readable). Guide says no fee listed, confirm when applying.
- **Rate:** **6.25%** of gross receipts on retail sales of tangible personal property (c. 64H § 2). Use tax at the same rate (search summary of DOR page). **No local sales tax on goods:** local options exist only for restaurant meals (c. 64L § 2, 0.75%) and room occupancy; none for general retail found.
- **Clothing:** sales of clothing and footwear are exempt up to $175 of the sales price per article; athletic or protective gear excluded (c. 64H § 6(k)).
- **Filing frequency:** c. 62C § 16(h): each vendor files a return for each calendar month, due within 30 days after the period ends; the commissioner may by regulation require quarterly or other periods for different groups of vendors. The DOR's thresholds for annual or quarterly filing (830 CMR 62C.16.2): **Not confirmed** (blocked). Guide says DOR tells you your schedule.
- **Resale certificate:** **Form ST-4, Sales Tax Resale Certificate** (listed on the DOR sales and use tax forms page, search summary). c. 64H § 8: the certificate is taken in good faith from a registered buyer who resells the same kind of property, bears the buyer's name, address and registration number, and must be produced within 60 days of DOR's notice.
- **Economic nexus for out-of-state sellers:** a remote retailer must register, collect and remit if its sales in Massachusetts in the **prior or current taxable year exceed $100,000** (c. 64H § 34(a), seen 2026-11-26). Marketplace facilitators: same $100,000 test (§ 34(b)–(c)). No transaction-count test in the statute. Search summary of DOR FAQ: remote sellers file monthly, due the 30th day after the month.

## State taxes on the business and owner

- **Personal income tax:** c. 62 § 4(b): Part B income (which includes business profit) taxed at a rate the statute sets at not less than 5%; the current rate is 5% (statute floor; the DOR rate page could not be read: **current rate Not confirmed on a DOR page**). Short-term capital gains 8.5%, other Part A rates differ.
- **4% surtax:** c. 62 § 4(d): taxable income above **$1,000,000**, adjusted each year for inflation, is taxed an additional 4%. The inflation-adjusted figure for 2026: **Not confirmed**.
- **Estimated tax:** c. 62B § 13: required if the estimated Massachusetts tax on income not subject to withholding is **more than $400**. Due dates not read (DOR blocked).
- **Local income tax:** none found. Not confirmed on an official page.
- **LLC:** $500 annual report (above). No separate state entity tax for a disregarded single-member LLC found (Not confirmed).

## Licenses and permits

- No general state business license found (mass.gov blocked, **Not confirmed**). The business certificate is filed locally and is a public record, not a license (Plymouth's page: certificates "do not function as name protection or trademarking nor do they serve as legal permission for a business to operate").
- Local: zoning or home business approval may come first (Plymouth requires a zoning sign-off before it issues a business certificate). Boston requires a lease or landlord letter and lists extra documents for food trucks and other regulated businesses. Rules vary by city and town; check with the clerk and the building or zoning office.
- Some activities need their own licenses (food, alcohol, selling on the street or door to door). Not researched in detail.

## Registered agent / address privacy

- An LLC's certificate of organization lists a Massachusetts office address and a resident agent with their address (c. 156C § 12(a)); public record.
- A business certificate lists each owner's full name and **residence** plus the business address (c. 110 § 5), and copies must be given to customers on request. Boston does not accept a virtual address or PO box for the business address.

## Privacy law

- **Data security, M.G.L. c. 93H and 201 CMR 17.00:** c. 93H § 2 directs the Office of Consumer Affairs and Business Regulation to adopt regulations for "any person that owns or licenses personal information about a resident of the commonwealth", taking into account size, scope and resources. 201 CMR 17.00 (mass.gov, read via search summary only) requires a **written information security program** with administrative, technical and physical safeguards scaled to the business, plus computer security steps such as encryption of personal information sent over public networks and stored on laptops. Personal information means a name plus a Social Security number, driver's license or state ID number, or financial account or card number. OCABR publishes a 201 CMR 17.00 compliance checklist.
- **Breach notice, c. 93H § 3:** any person that owns or licenses Massachusetts residents' personal information must give notice "as soon as practicable and without unreasonable delay" after a breach (to the Attorney General, OCABR and affected residents per search summaries).
- **No comprehensive consumer privacy law in force.** The Massachusetts Data Privacy Act (S.2619): Senate passed 40–0 on 9/25/2025; House passed its version (H5479) 146–0 on 6/4/2026; Senate non-concurred 6/11/2026; conference committee appointed 6/17/2026; no later action on the bill history (malegislature.gov bill history, seen 2026-11-26). Not law.

## Employer registrations (brief)

Out of scope for a solo retailer: withholding, unemployment insurance and paid family and medical leave apply once you hire.

## Ordered checklist

1. structure-and-name (sole proprietor vs LLC $500 + $500 a year, name rules, income tax 5% + 4% surtax, c. 93H / 201 CMR 17.00)
2. register-business (business certificate with the city or town clerk, fee set locally, four-year renewal; or LLC certificate of organization and annual report)
3. ein (shared)
4. sales-tax (MassTaxConnect, Sales and Use Tax Registration, 6.25%, no local tax on goods, ST-4, $100,000 remote seller threshold)
5. local-licence (city or town clerk, zoning, activity licenses)
6. sales-tax-other-states (shared)
7. insurance (shared)
8. bank-account (shared)
9. bookkeeping-taxes (shared)
10. payment-processor (shared)
11. legal-pages-privacy (shared)
12. product-compliance (shared)
13. supplier-account (shared)

## Not confirmed

- Sales and use tax registration fee (statute leaves it to the commissioner of administration; no DOR page readable).
- DOR's thresholds for annual, quarterly or monthly filing for an in-state vendor.
- LLC annual report due date (search summary only: anniversary of the certificate of organization).
- Current Part B income tax rate on a DOR page (5% is the statute's floor and the known current rate).
- The 2026 inflation-adjusted surtax threshold.
- Estimated tax due dates.
- No general state business license (mass.gov blocked).
- No local income tax (no official page read).
- No state entity tax for a disregarded single-member LLC.
- 201 CMR 17.00 details (read through search summaries of mass.gov only; statute c. 93H read directly).
- Form ST-1 and Form ST-4 names (search summaries of mass.gov; ST-4 is the long-standing form name).

## Sources (fetched 2026-11-26)

- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter156C/Section12 (LLC certificate and annual report, $500 each)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter156C/Section3 (LLC name)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter110/Section5 (business certificate)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter110/Section6 (exemptions)
- https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleVI/Chapter262/Section34 (clerk fee default)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section2 (6.25%)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section6 (clothing $175)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section7 (registration required)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section8 (resale certificate)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section34 (remote retailers, $100,000)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64L/Section2 (local meals tax)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter62C/Section67 (registration fee and term)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter62C/Section16 (return frequency)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter62/Section4 (income tax rates, surtax)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter62B/Section13 (estimated tax)
- https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93H/Section2 and Section3 (data security, breach notice)
- https://malegislature.gov/Bills/194/S2619/BillHistory (Data Privacy Act status)
- https://www.boston.gov/permitting/permits/business-certificate (Boston, $65)
- https://plymouth-ma.gov/742/Business-Certificates (Plymouth, $50)
- Search summaries only (blocked to direct reading): https://www.sec.state.ma.us/divisions/corporations/filing-by-subject/limited-liability/corporations-limited-liability-company.htm, https://www.sec.state.ma.us/divisions/corporations/download/Fee_Schedule.pdf, https://www.mass.gov/info-details/starting-a-limited-liability-company-llc-in-massachusetts, https://www.mass.gov/info-details/register-your-business-with-masstaxconnect, https://www.mass.gov/lists/ma-dor-sales-and-use-tax-forms, https://www.mass.gov/info-details/remote-seller-and-marketplace-facilitator-faqs, https://www.mass.gov/regulations/201-CMR-1700-standards-for-the-protection-of-personal-information-of-ma-residents, https://www.mass.gov/info-details/201-cmr-1700-compliance-checklist

Blocked: mass.gov (403, Akamai) to curl and WebFetch; sec.state.ma.us, corp.sec.state.ma.us and mtc.dor.state.ma.us (Imperva Incapsula challenge) to curl and WebFetch.

This is general information, not legal or tax advice.
