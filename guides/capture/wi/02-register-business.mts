import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const TRADEMARKS = "https://dfi.wi.gov/Pages/BusinessServices/Trademarks/GeneralInformation.aspx";
const FAQ = "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/FAQ.aspx";

await captureStep("wi", "02-register-business", [
  {
    n: 1,
    alt: "Wisconsin DFI trademark general information page with the sentence saying registration is not required highlighted",
    caption: "Decide whether to register your trade name with DFI, which is optional and costs $15.",
    setup: async (page) => {
      await page.goto(TRADEMARKS);
      await markText(page, "Trademark registration is not required but is a good way to notify the public of the use of a certain name or mark.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Wisconsin DFI business entity FAQ page with the annual report due date sentence highlighted",
    caption: "If you formed an LLC, file its annual report in the quarter of its formation anniversary.",
    setup: async (page) => {
      await page.goto(FAQ);
      await markText(page, "during the calendar year quarter in which the anniversary date of the registration occurs.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
