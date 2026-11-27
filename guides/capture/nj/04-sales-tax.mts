import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const SALES = "https://www.nj.gov/treasury/taxation/su_12.shtml";
const REMOTE = "https://www.nj.gov/treasury/taxation/remotesellers.shtml";

await captureStep("nj", "04-sales-tax", [
  {
    n: 1,
    alt: "NJ Division of Taxation sales tax page with the registration requirement for all sellers highlighted",
    caption: "Register to collect sales tax, even if you sell only at flea markets or craft shows.",
    setup: async (page) => {
      await page.goto(SALES);
      await markText(page, "All businesses that sell taxable goods and services in New Jersey must register");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "NJ Division of Taxation sales tax page with the quarterly filing requirement highlighted",
    caption: "File quarterly returns by the 20th of the month after each quarter.",
    setup: async (page) => {
      await page.goto(SALES);
      await markText(page, "Once your business is registered to collect Sales Tax, you will be required to file quarterly returns and make quarterly payments.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "NJ Division of Taxation remote sellers page with the $100,000 economic threshold highlighted",
    caption: "Out-of-state sellers register once they pass $100,000 or 200 sales into New Jersey.",
    setup: async (page) => {
      await page.goto(REMOTE);
      await markText(page, "exceeds $100,000");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
