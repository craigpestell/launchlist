import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const CITY = "https://dor.wa.gov/manage-business/city-endorsements";

await captureStep("wa", "05-local-licence", [
  {
    n: 1,
    alt: "Washington Department of Revenue city endorsements page with the sentence explaining city endorsements highlighted",
    caption: "Check whether your city is on the list. If it is not, contact the city directly.",
    setup: async (page) => {
      await page.goto(CITY);
      await markText(page, "you can apply for their endorsements at the same time you file for your state licenses and registrations.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
