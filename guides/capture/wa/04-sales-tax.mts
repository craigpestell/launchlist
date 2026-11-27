import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const FEES = "https://dor.wa.gov/open-business/apply-business-license/variable-business-license-processing-fees";
const RATE = "https://dor.wa.gov/taxes-rates/retail-sales-tax";
const RESELLER = "https://dor.wa.gov/taxes-rates/retail-sales-tax/reseller-permits";

await captureStep("wa", "04-sales-tax", [
  {
    n: 1,
    alt: "Washington Department of Revenue processing fees page with the $50 fee to open a business highlighted",
    caption: "A new business pays a $50 processing fee on the Business License Application.",
    setup: async (page) => {
      await page.goto(FEES);
      await markText(page, "Open/reopen a business - $50");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Washington Department of Revenue retail sales tax page with the 6.5% state rate highlighted",
    caption: "The state rate is 6.5%, and a local rate is added based on where the customer receives the goods.",
    setup: async (page) => {
      await page.goto(RATE);
      await markText(page, "The state tax rate is 6.5%.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "Washington Department of Revenue reseller permits page with the permit validity sentence highlighted",
    caption: "Apply for a reseller permit so you do not pay sales tax on stock you resell.",
    setup: async (page) => {
      await page.goto(RESELLER);
      await markText(page, "Reseller permits are generally valid for four years.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
