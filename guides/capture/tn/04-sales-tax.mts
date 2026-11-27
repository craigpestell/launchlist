import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const RATES = "https://www.tn.gov/revenue/taxes/sales-and-use-tax/due-dates-and-tax-rates.html";
const RESALE = "https://www.tn.gov/revenue/taxes/sales-and-use-tax/exemptions-certificates-credits/resale-certificate.html";

await captureStep("tn", "04-sales-tax", [
  {
    n: 1,
    alt: "Tennessee Department of Revenue sales tax rates page with the 7% general rate sentence highlighted",
    caption: "The state rate is 7% on most goods, and local rates add to it.",
    setup: async (page) => {
      await page.goto(RATES);
      await markText(page, "The general sale tax rate for most tangible personal property and taxable services is 7%.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Tennessee Department of Revenue resale certificate page with the sentence on automatic issue highlighted",
    caption: "Your Certificate of Resale is issued automatically when you register.",
    setup: async (page) => {
      await page.goto(RESALE);
      await markText(page, "they are automatically issued a Tennessee Sales and Use Tax Certificate of Resale");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
