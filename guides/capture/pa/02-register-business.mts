import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const NAMES =
  "https://www.pa.gov/agencies/dos/programs/business/types-of-filings-and-registrations/fictitious-names";
const FEES = "https://www.pa.gov/agencies/dos/programs/business/fees-and-payments";
const ANNUAL =
  "https://www.pa.gov/agencies/dos/programs/business/types-of-filings-and-registrations/annual-reports";

await captureStep("pa", "02-register-business", [
  {
    n: 1,
    alt: "Pennsylvania Department of State Fictitious Names page with the sentence requiring registration with the Department of State highlighted",
    caption: "A fictitious name is registered with the Pennsylvania Department of State, not your county.",
    setup: async (page) => {
      await page.goto(NAMES);
      await markText(page, "must register this name with the Pennsylvania Department of State.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Pennsylvania Department of State Fees page with the $70 fictitious name registration fee highlighted",
    caption: "Check the current fictitious name registration fee.",
    setup: async (page) => {
      await page.goto(FEES);
      await page
        .locator("table")
        .filter({ hasText: "Fictitious Name" })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.locator("table").filter({ hasText: "Fictitious Name" }).first()],
  },
  {
    n: 3,
    alt: "Pennsylvania Department of State Fictitious Names page with the two-newspaper advertising rule highlighted",
    caption: "Advertise the name in two newspapers in your county, one of them a legal newspaper.",
    setup: async (page) => {
      await page.goto(NAMES);
      await markText(
        page,
        "The advertisement should be placed in two newspapers of general circulation in the county in which the business will be located, one of which must be legal newspaper.",
      );
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 4,
    alt: "Pennsylvania Department of State Annual Reports page with the LLC filing dates row highlighted",
    caption: "If you formed an LLC, file its annual report between January 1 and September 30.",
    setup: async (page) => {
      await page.goto(ANNUAL);
      await page
        .getByRole("row")
        .filter({ hasText: "Limited liability companies" })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("row").filter({ hasText: "Limited liability companies" }).first()],
  },
]);
