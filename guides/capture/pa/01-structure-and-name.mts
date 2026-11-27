import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const FEES = "https://www.pa.gov/agencies/dos/programs/business/fees-and-payments";
const LLC =
  "https://www.pa.gov/agencies/dos/programs/business/types-of-filings-and-registrations/pennsylvania-limited-liability-company";

await captureStep("pa", "01-structure-and-name", [
  {
    n: 1,
    alt: "Pennsylvania Department of State Fees page with the $125 Certificate of Organization fee for an LLC highlighted",
    caption: "If you are weighing an LLC, check the Certificate of Organization fee before you decide.",
    setup: async (page) => {
      await page.goto(FEES);
      await page
        .getByRole("row")
        .filter({ hasText: "Certificate of Organization" })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("row").filter({ hasText: "Certificate of Organization" }).first()],
  },
  {
    n: 2,
    alt: "Pennsylvania Department of State LLC page with the sentence saying no advertising is required highlighted",
    caption: "Unlike a fictitious name, forming a Pennsylvania LLC needs no newspaper ad.",
    setup: async (page) => {
      await page.goto(LLC);
      await markText(page, "No advertising is required when forming a domestic limited liability company.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
