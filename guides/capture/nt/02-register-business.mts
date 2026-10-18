import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("nt", "02-register-business", [
  {
    n: 1,
    alt: "NWT Corporate Registries business names forms tab with the sole proprietorship forms highlighted",
    caption:
      "Download the sole proprietorship forms and mail or deliver the signed originals. Reservation is $25 and registration $50.",
    setup: async (page) => {
      await page.goto("https://www.justice.gov.nt.ca/en/business-names/page/4/");
      await page
        .getByText(/Sole Proprietorship/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/Sole Proprietorship/).first()],
  },
]);
