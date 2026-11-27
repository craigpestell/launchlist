// Captured by hand on 2026-11-27 in the owner's own Chrome (see the new-guide
// skill, section 5): the site blocks automated browsers. The image and its
// manifest entry were added by hand; this script is kept for the selectors.
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const REGISTER = "https://business.nj.gov/pages/register-your-business";
const FILINGS = "https://business.nj.gov/pages/filings-and-accounting";

await captureStep("nj", "02-register-business", [
  {
    n: 1,
    alt: "Business.NJ.gov Register Your Business page with the sentence that all businesses must register for state taxes highlighted",
    caption: "Every business, including a sole proprietor, registers for state taxes with the Division of Revenue.",
    setup: async (page) => {
      await page.goto(REGISTER);
      await markText(page, "All businesses must register");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Business.NJ.gov Taxes and Annual Report page with the annual report requirement and $75 fee highlighted",
    caption: "If you formed an LLC, note the $75 annual report due in your formation month each year.",
    setup: async (page) => {
      await page.goto(FILINGS);
      await markText(page, "Every business in NJ must file an annual report.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
