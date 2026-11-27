import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const GUIDE = "https://www.in.gov/core/business_guide.html";

await captureStep("in", "05-local-licence", [
  {
    n: 1,
    alt: "Indiana Business Owner's Guide with the sentence that Indiana has no single business license highlighted",
    caption: "Indiana has no single general business license. Check state, county and city rules for what you sell.",
    setup: async (page) => {
      await page.goto(GUIDE);
      await markText(page, "Indiana does not have any one single, comprehensive business license.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
