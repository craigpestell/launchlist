import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("nu", "05-municipal-licence", [
  {
    n: 1,
    alt: "Government of Nunavut get a business licence page with the territorial business licence information highlighted",
    caption:
      "Nunavut requires a territorial business licence, renewed every fiscal year. Your community, such as Iqaluit, may need its own licence too.",
    setup: async (page) => {
      await page.goto("https://www.gov.nu.ca/en/business-and-entrepreneurship/get-business-licence");
      await page
        .getByText(/[Bb]usiness [Ll]icen[cs]e/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/[Bb]usiness [Ll]icen[cs]e/).first()],
  },
]);
