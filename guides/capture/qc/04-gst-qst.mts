import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("qc", "04-gst-qst", [
  {
    n: 1,
    alt: "Revenu Qu\u00e9bec how to register for the GST and QST page with the Register a New Business online service highlighted",
    caption:
      "Register for the GST and QST together with Revenu Qu\u00e9bec. If you are new to Revenu Qu\u00e9bec, use the Register a New Business online service.",
    setup: async (page) => {
      await page.goto("https://www.revenuquebec.ca/en/businesses/consumption-taxes/gsthst-and-qst/registering-for-the-gst-and-qst/how-to-register/");
      await page
        .getByText(/Register a New Business/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/Register a New Business/).first()],
  },
]);
