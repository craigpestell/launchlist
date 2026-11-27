// sos.tn.gov FAQ shots dropped: the site returns a CloudFront 403 to automated browsers
// (checked 2026-11-26). The guide cites those FAQ answers as text.
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const FAE = "https://www.tn.gov/revenue/taxes/franchise---excise-tax.html";

await captureStep("tn", "02-register-business", [
  {
    n: 1,
    alt: "Tennessee Department of Revenue franchise and excise tax page with the minimum franchise tax sentence highlighted",
    caption: "An LLC also pays at least $100 a year in franchise tax.",
    setup: async (page) => {
      await page.goto(FAE);
      await markText(page, "The minimum franchise tax is $100");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
