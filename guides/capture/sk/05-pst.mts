import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("sk", "05-pst", [
  {
    n: 1,
    alt: "Government of Saskatchewan apply for a PST number page with the online new business registration through SETS highlighted",
    caption:
      "Register for a PST vendor's licence online through Saskatchewan eTax Services (SETS).",
    setup: async (page) => {
      await page.goto("https://www.saskatchewan.ca/business/taxes-licensing-and-reporting/provincial-taxes-policies-and-bulletins/provincial-sales-tax/apply-for-a-pst-number");
      await page
        .getByText(/New Businesses may submit their application/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    },
    highlight: (page) => [page.getByText(/New Businesses may submit their application/).first()],
  },
]);
