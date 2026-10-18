import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("sk", "06-municipal-licence", [
  {
    n: 1,
    alt: "City of Saskatoon home-based business licence page with the $135 new licence fee highlighted",
    caption:
      "Each municipality sets its own rules. Saskatoon, for example, charges $135 for a new home-based business licence and $95 a year to renew. Look up your own city or town in the same way.",
    setup: async (page) => {
      await page.goto("https://www.saskatoon.ca/business-development/business-licenses/business-licence-categories/home-based-business-licence");
      await page
        .getByText(/135/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/135/).first()],
  },
]);
