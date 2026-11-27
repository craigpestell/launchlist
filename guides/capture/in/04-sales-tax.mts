import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const SALES = "https://www.in.gov/dor/business-tax/sales-tax/";
const REMOTE = "https://www.in.gov/dor/i-am-a/business-corp/remote-sellers";

await captureStep("in", "04-sales-tax", [
  {
    n: 1,
    alt: "Indiana Department of Revenue sales tax page with the seven percent registration sentence highlighted",
    caption: "Register with the Department of Revenue to collect Indiana's 7% sales tax.",
    setup: async (page) => {
      await page.goto(SALES);
      await markText(page, "register to collect a seven percent sales tax");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Indiana Department of Revenue remote sellers page with the $100,000 threshold highlighted",
    caption: "Out-of-state sellers register once sales into Indiana exceed $100,000 in a calendar year.",
    setup: async (page) => {
      await page.goto(REMOTE);
      await markText(page, "if its gross revenue from sales into Indiana exceeds $100,000 in the previous or current calendar year");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
