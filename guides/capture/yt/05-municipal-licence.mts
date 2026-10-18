import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("yt", "05-municipal-licence", [
  {
    n: 1,
    alt: "City of Whitehorse business licence page with the business licence information highlighted",
    caption:
      "Each community sets its own rules. Whitehorse, for example, licenses every business and needs a development permit for a home business. Look up your own community in the same way.",
    setup: async (page) => {
      await page.goto("https://www.whitehorse.ca/business-in-whitehorse/doing-business/business-license/");
      await page
        .getByText(/[Bb]usiness [Ll]icen[cs]e/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/[Bb]usiness [Ll]icen[cs]e/).first()],
  },
]);
