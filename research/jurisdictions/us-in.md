---
jurisdiction: Indiana
country: US
researchedAt: 2026-11-26
confidence: medium
---

State-specific steps for a solo retailer in Indiana. Federal steps (EIN, Schedule C/SE, quarterly federal estimates, nexus in other states, insurance, banking, FTC, CPSC/FDA) are in `us-federal.md` and `content/shared/us/`. Researched from official pages only. in.gov (Department of Revenue, Secretary of State, Attorney General, county pages) loaded with curl. **inbiz.in.gov** (the state business portal, where LLCs are formed and sales tax registration starts) returned a CloudFront 403 to both curl and WebFetch, so INBiz fee screens were not read. **forms.in.gov** shows a Cloudflare "Attention Required" page. iga.in.gov chapter URLs return a JavaScript app shell; the full Title 23 PDF (iga.in.gov/ic/2026/Title_23.pdf) downloaded and was read for fees and name rules.

## Business structure options

- **Sole proprietorship:** "Sole proprietorships are not required to register with the Indiana Secretary of State" (DOR Business FAQ, seen 2026-11-26). Income on the owner's return. Recommended to start.
- **LLC (Secretary of State, Business Services Division, filed through INBiz):**
  - Articles of Organization: statutory fee **$75 electronic, $100 non-electronic** (IC 23-0.5-9-19, Title 23 PDF, seen 2026-11-26).
  - Online filings also carry an "enhanced access" fee. SOS Regulatory Analysis for LSA 25-155 lists **$20** for Domestic LLC Articles of Organization, which gives about **$95 online**. The same document's state comparison table lists Indiana "LLC Registration Cost $96". Exact online total **Not confirmed** ($95 vs $96); INBiz, which shows the checkout fee, is blocked. Guide says "about $95 online, $100 by mail" and to confirm on INBiz.
  - **Business Entity Report:** for-profit entities file **every other year (biennial) in the anniversary month** the entity was created; may file up to 90 days before. Fee **$31 online, $50 by mail** (SOS Business Entity Reports page, seen 2026-11-26). Statute: $20 electronic, $50 paper (IC 23-0.5-9-34) plus $11 enhanced access fee (LSA 25-155). A search snippet of INBiz said $32 online and the LSA comparison table says $32: **Not confirmed** which is current; the SOS page says $31.
  - Failing to file: SOS sends at least four reminders, then administratively dissolves the entity after the report is five months overdue. Reinstatement possible within 5 years.
  - No franchise tax or LLC minimum tax found for a single-member LLC in Indiana.
  - Name reservation: $10 electronic (IC 23-0.5-9-36), renewable 120-day periods (IC 23-0.5-3-3).
  - Name rule: must contain "limited liability company", "L.L.C." or "LLC" (IC 23-0.5-3-2(d)); must be distinguishable on SOS records and must not imply a government connection (IC 23-0.5-3-1).
- Corporations and partnerships: out of scope.
- The old in.gov Business Owner's Guide (in.gov/core/business_guide.html) still says the biennial report is $30; it is outdated and not relied on for fees.

## Name search and registration

- **Sole proprietor using a name other than their own** files a certificate of assumed business name with the **recorder of each county** where they have a place of business or office (IC 23-0.5-3-4(a)). The certificate states the assumed name and the individual's full name and address.
  - **Indiana oddity:** the requirement does not apply if the name includes the individual's true surname (IC 23-0.5-3-4(i)(1)). So "Smith's Candles" needs no filing for a Jane Smith; "Lakeside Candles" does.
  - Fee: set by the county recorder fee schedule (IC 36-2-7-10). Monroe County: "the recording fee to file a DBA is $25.00, pursuant to the standard recording fee schedule" (Monroe County Recorder, seen 2026-11-26). Search snippets showed $25 and a notarized form for Montgomery, Tippecanoe and Rush counties (not re-read). Every county **Not confirmed**; guide says $25 in the counties checked and to check your recorder.
  - Violation is a Class B infraction (IC 23-0.5-3-4(j)). File a notice before you stop using the name.
  - No newspaper publication requirement found.
- **LLC using another name:** files with the Secretary of State, $20 electronic / $30 paper per name (IC 23-0.5-3-4(e); IC 23-0.5-9-40). Online enhanced access fee for this filing **Not confirmed**.
- Entity name search: SOS public business search (bsd.sos.in.gov/publicbusinesssearch). County DBAs are kept by each recorder.

## Federal IDs

Same as federal. DOR issues a Taxpayer Identification Number (TID) with the sales tax registration.

## Sales tax

- **Registered Retail Merchant Certificate (RRMC)** from the **Indiana Department of Revenue (DOR)**. "If your business sells goods or tangible personal property, you'll need to register to collect a seven percent sales tax" (DOR Sales Tax page, seen 2026-11-26). Register through INBiz (Business Tax Application). One certificate displayed per business location.
- **Fee:** "a one-time $25 registration fee, per location" (DOR Business FAQ). Changing organization type (for example sole proprietor to LLC) needs a new application and another $25.
- **Renewal:** every two years, automatic if filings and payments are current (DOR Business FAQ).
- INTIME registrations can be submitted up to two months in advance (DOR Business FAQ).
- **Rate:** **7%** statewide; "The sales tax for the entire State of Indiana is 7%" (DOR County Tax Information). No local sales tax. Some counties and cities add a food and beverage tax (about 1%) on prepared food, and a county innkeeper's tax; neither applies to general retail goods.
- Odd FAQ item: DOR says the RRMC is not a vendor's license and to "contact your county clerk's office to apply for a vendor's license". No statewide county vendor's license rule found; noted in step 5 as something to ask locally.
- **Filing frequency:** DOR assigns it from average monthly liability and reviews it each November (DOR Business FAQ). DOR deadline calendar (seen in search snippet only) says filers under $1,000 average monthly liability file by the 30th and those $1,000 or more by the 20th. Quarterly/annual tiers come only from third-party sites. **Not confirmed.** EFT required over $5,000 average monthly. File $0 returns; late penalty up to 20%, minimum $5 (DOR Sales Tax page).
- **Resale / exemption certificate:** **Form ST-105, General Sales Tax Exemption Certificate**, a multiuse form including purchases for resale. ST-105D is the Dealer-to-Dealer Resale Certificate for out-of-state dealers (DOR Business FAQ).
- **Economic nexus:** remote sellers must register if gross revenue from sales into Indiana **exceeds $100,000** in the previous or current calendar year (IC 6-2.5-2-1(d)). The 200-transaction test was removed effective January 1, 2024 (DOR Remote Sellers page, seen 2026-11-26).
- Indiana is a Streamlined Sales Tax member state (DOR Remote Sellers page links SST guidance).
- Use tax 7%.

## State taxes on the business and owner

- **Individual income tax:** "The Indiana Individual adjusted gross income tax rate for 2026 is 2.95% and will adjust in 2027 to 2.90%" (DOR Rates, Fees & Penalties, seen 2026-11-26). Form IT-40, due April 15.
- **County income tax (Local Income Tax):** every county has one, filed on the same IT-40; rates differ by county (examples on DOR county page roughly 0.9%–2.7%) and may change in January and October (Departmental Notice #1).
- **Estimated tax:** generally required if you expect to owe $1,000 or more of state and county tax not covered by withholding; due April 15, June 15, September 15 and January 15; pay in INTIME or with Form ES-40; underpayment penalty 10% (DOR Estimated Payments page, seen 2026-11-26).
- A single-member LLC taxed as a disregarded entity: no separate state entity tax found.

## Licenses and permits

- "Indiana does not have any one single, comprehensive business license" (in.gov Business Owner's Guide, General Requirements; older page, fees on it are out of date).
- Local: "Zoning regulations and signage issues are almost always local issues"; some areas have a "transient merchant" license (Business Owner's Guide, Local Regulation).
- DOR points to the county clerk for a "vendor's license" (see above).
- Specific county or city license rules: not researched individually.

## Registered agent / address privacy

- An LLC needs a registered agent with an Indiana address (IC 23-0.5-4; referenced from the Business Entity Report page). Entity records are public.
- HB 1593 and HB 1666 (SOS page, effective 01/01/2026): entities that do all business remotely can keep a residential address off the public record; new rules on disclosing commercial mail receiving agency (CMRA) addresses. Details beyond the SOS summary **Not confirmed**.
- County assumed name certificates are public and include the owner's full name and address (IC 23-0.5-3-4(a)).

## Privacy law

- **Indiana Consumer Data Protection Act (IC 24-15)**, enforced by the Attorney General from **January 1, 2026**. Applies to businesses that operate in Indiana or target Indiana residents and that control or process personal data of **100,000 or more** Indiana residents in a year, or **25,000 or more** and get over **50% of gross revenue** from selling personal data. Exemptions include financial institutions, HIPAA entities, nonprofits, higher education and utilities (AG Consumer Bill of Rights PDF, seen 2026-11-26). AG enforcement, 30-day cure, $7,500 per violation and no private right of action from search summaries only: **Not confirmed** on the statute text.
- **Breach notice law (IC 24-4.9):** AG page: "This law requires Indiana businesses to inform their customers about security breaches"; disclosure "without unreasonable delay"; AG can seek up to $150,000 for breaches not properly disclosed; AG has a business notification form (AG Security Breaches pages, seen 2026-11-26). The 45-day outer limit is from search snippets only: **Not confirmed**.

## Employer registrations (brief)

DWD unemployment insurance (via INBiz / Employer Self Service) and DOR withholding if you hire. Out of scope for a solo retailer.

## Ordered checklist

1. structure-and-name (sole proprietor vs LLC $100 mail / about $95 online, name rules and surname exemption, 2.95% + county income tax, CDPA thresholds, breach law)
2. register-business (county recorder assumed name about $25 if not using your surname; or LLC articles; $31 online / $50 mail business entity report every two years)
3. ein (shared)
4. sales-tax (RRMC from DOR via INBiz, $25 per location, 7% with no local sales tax, ST-105, $100,000 remote seller threshold)
5. local-licence (no general state license; ask county clerk, city and county about vendor, transient merchant and zoning rules)
6. sales-tax-other-states (shared)
7. insurance (shared)
8. bank-account (shared)
9. bookkeeping-taxes (shared)
10. payment-processor (shared)
11. legal-pages-privacy (shared)
12. product-compliance (shared)
13. supplier-account (shared)

## Not confirmed

- Exact online LLC formation total ($95 from statute plus enhanced access fee, $96 in the LSA comparison table). INBiz blocked.
- Business entity report online fee: SOS page says $31; INBiz snippet and LSA table say $32.
- Assumed name recording fee in every county ($25 confirmed for Monroe County only on a page read directly).
- Sales tax filing frequency tiers for a new small seller (monthly vs quarterly vs annual thresholds).
- CDPA enforcement details (cure period, penalty amount) from the statute text.
- Breach notice 45-day limit.
- Enhanced access fee for an LLC's assumed name filing.
- Details of the HB 1593 residential address option.

## Sources (fetched 2026-11-26)

- DOR Sales Tax: https://www.in.gov/dor/business-tax/sales-tax/
- DOR Business FAQ: https://www.in.gov/dor/i-am-a/business-corp/business-faq
- DOR Remote Sellers: https://www.in.gov/dor/i-am-a/business-corp/remote-sellers
- DOR County Tax Information: https://www.in.gov/dor/i-am-a/business-corp/county-tax-information
- DOR Rates, Fees & Penalties: https://www.in.gov/dor/resources/tax-rates-and-reports/rates-fees-and-penalties
- DOR Estimated Payments: https://www.in.gov/dor/i-need-to/make-a-payment/estimated-payments
- DOR New & Small Business Education: https://www.in.gov/dor/i-am-a/business-corp/business-education
- SOS Business Entity Reports: https://www.in.gov/sos/business/business-entity-reports
- SOS HB 1593 and HB 1666 filing changes: https://www.in.gov/sos/business/hb-1593-and-hb-1666-filing-process-changes
- SOS Regulatory Analysis LSA 25-155: https://www.in.gov/sos/business/files/Regulatory-Analysis-Business-Entity-LSA-25-155-OMB-2024-73R.pdf
- Indiana Code Title 23 (2026): https://iga.in.gov/ic/2026/Title_23.pdf (IC 23-0.5-3, 23-0.5-9)
- Monroe County Recorder, Assumed Business Names: https://secure.in.gov/counties/monroe/Departments/recorder/assumed-business-names/
- in.gov Business Owner's Guide: https://www.in.gov/core/business_guide.html
- AG CDPA Consumer Bill of Rights: https://www.in.gov/attorneygeneral/files/Indiana-Consumer-Data-Protection_Consumer-Bill-of-Rights_CDPCBOR.pdf
- AG Security Breaches: https://www.in.gov/attorneygeneral/consumer-protection-division/id-theft-prevention/security-breaches/
- AG Security Breach FAQs for Businesses: https://www.in.gov/attorneygeneral/consumer-protection-division/id-theft-prevention/security-breaches/security-breach-faqs-and-notification-form-for-businesses

Blocked: inbiz.in.gov (CloudFront 403 to curl and WebFetch), forms.in.gov (Cloudflare check), iga.in.gov chapter pages (app shell only; full title PDF worked).

This is general information, not legal or tax advice.
