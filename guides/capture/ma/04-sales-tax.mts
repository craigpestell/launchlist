// Shots use the General Laws on malegislature.gov: mass.gov (Akamai) and
// MassTaxConnect (Imperva) block automated browsers (checked 2026-11-26).
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const RATE = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section2";
const REMOTE = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section34";

await captureStep("ma", "04-sales-tax", [
  {
    n: 1,
    alt: "Massachusetts General Laws chapter 64H section 2 with the 6.25 percent sales tax rate highlighted",
    caption: "Charge the statewide 6.25% rate on taxable sales delivered in Massachusetts.",
    setup: async (page) => {
      await page.goto(RATE);
      await markText(page, "at the rate of 6.25 per cent of the gross receipts of the vendor");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Massachusetts General Laws chapter 64H section 34 with the $100,000 remote retailer threshold highlighted",
    caption: "Sellers based outside Massachusetts must register once their sales into the state exceed $100,000 in the current or prior year.",
    setup: async (page) => {
      await page.goto(REMOTE);
      await markText(page, "if its sales within the commonwealth in the prior taxable year or the current taxable year exceed $100,000.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
