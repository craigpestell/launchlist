import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const GUIDE = "https://hub.business.pa.gov/Home/HelpCenterDetail/ClothingStoresandBoutiques";

await captureStep("pa", "05-local-licence", [
  {
    n: 1,
    alt: "PA Business One-Stop Shop Clothing Stores and Boutiques guide with the sentence saying there is no general business license highlighted",
    caption: "Pennsylvania has no general business license, so check the licenses for your activity and your municipality.",
    setup: async (page) => {
      await page.goto(GUIDE);
      await markText(
        page,
        "there is no general business license that all Pennsylvania businesses are required to obtain.",
      );
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
