import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("sk", "02-register-business", [
  {
    n: 1,
    alt: "Saskatchewan Corporate Registry search and reserve a business name page with the name reservation requirement highlighted",
    caption:
      "Reserve your business name before you register it. A reservation costs $50 and is held for 90 days.",
    setup: async (page) => {
      await page.goto("https://www.saskregistries.ca/corporateregistry/registeringabusiness/searchandreserveabusinessname");
      await page
        .getByText(/name reservation number/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/name reservation number/).first()],
  },
]);
