import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

// A shot of business.nj.gov/pages/business-names was dropped: that site shows an
// Imperva block to automated browsers (checked 2026-11-26).
const REGISTERED = "https://www.nj.gov/treasury/revenue/gettingregistered.shtml";

await captureStep("nj", "01-structure-and-name", [
  {
    n: 1,
    alt: "NJ Division of Revenue Getting Registered page with the $100 formation fee highlighted",
    caption: "If you are weighing an LLC, check the Certificate of Formation fee before you decide.",
    setup: async (page) => {
      await page.goto(REGISTERED);
      await page.getByRole("link", { name: /Limited Liability Companies and Limited Liability Partnerships/i }).first().click();
      await page.waitForTimeout(800);
      await markText(page, "The fee is $100 for all for-profit entities");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
