import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("sk", "01-structure-and-name", [
  {
    n: 1,
    alt: "Saskatchewan Corporate Registry choose a business type page with the sole proprietorship option highlighted",
    caption:
      "Read the Corporate Registry's guide to business types. A sole proprietorship is the simplest way to start.",
    setup: async (page) => {
      await page.goto("https://www.saskregistries.ca/corporateregistry/registeringabusiness/chooseabusinesstype");
      await page
        .getByText(/[Ss]ole [Pp]roprietor/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/[Ss]ole [Pp]roprietor/).first()],
  },
]);
