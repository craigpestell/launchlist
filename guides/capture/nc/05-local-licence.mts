import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const LICENSES = "https://edpnc.com/resources/publications/business-licenses-and-permits/";

await captureStep("nc", "05-local-licence", [
  {
    n: 1,
    alt: "EDPNC Business Licenses and Permits page with the note that North Carolina has no generic state business license highlighted",
    caption: "North Carolina has no single state business license, so check the license directory for what you sell.",
    setup: async (page) => {
      await page.goto(LICENSES);
      await markText(page, "North Carolina no longer has a state-issued generic business license");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
