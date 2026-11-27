import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const STEPS = "https://azcc.gov/corporations/10-steps-to-starting-a-business-in-arizona";

await captureStep("az", "05-local-licence", [
  {
    n: 1,
    alt: "Arizona Corporation Commission 10 steps page with the step on city or county taxes and business licensing opened and highlighted",
    caption: "Register with your city, or your county if you are outside city limits, for any local business license.",
    setup: async (page) => {
      await page.goto(STEPS);
      const sentence = "Register the business entity with the city in which the business is located";
      await page.getByRole("button", { name: /City or County Taxes and Business Licensing/i }).first().click();
      await page.getByText(sentence).first().waitFor({ state: "visible" });
      await markText(page, sentence);
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
