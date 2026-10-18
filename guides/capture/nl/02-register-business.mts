import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("nl", "02-register-business", [
  {
    n: 1,
    alt: "Newfoundland and Labrador Registry of Companies about page with the sentence saying the province has no business name registry highlighted",
    caption:
      "Newfoundland and Labrador has no business name registry, so a sole proprietor has nothing to register or renew.",
    setup: async (page) => {
      await page.goto("https://www.gov.nl.ca/dgsnl/registries/companies/corp-about/");
      await page
        .getByText(/does not have legislation governing a Business Name Registry/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/does not have legislation governing a Business Name Registry/).first()],
  },
]);
