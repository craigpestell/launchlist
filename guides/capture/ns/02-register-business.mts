import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("ns", "02-register-business", [
  {
    n: 1,
    alt: "Nova Scotia register a sole proprietorship page with the $68.55 registration fee highlighted",
    caption:
      "Reserve your name first, then register the sole proprietorship. Registration costs $68.55 and must be renewed every year for the same fee.",
    setup: async (page) => {
      await page.goto("https://www.novascotia.ca/register-sole-proprietorship");
      await page
        .getByText(/68\.55/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/68\.55/).first()],
  },
]);
