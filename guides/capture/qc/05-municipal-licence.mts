import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("qc", "05-municipal-licence", [
  {
    n: 1,
    alt: "Montr\u00e9al get an occupancy permit page for Le Plateau-Mont-Royal with the sentence about using part of your home for professional purposes highlighted",
    caption:
      "Each municipality sets its own rules. In Montr\u00e9al, a certificate of occupancy is needed to use part of your home for professional purposes, and fees vary by borough. Check with your own municipality or borough.",
    setup: async (page) => {
      await page.goto("https://montreal.ca/en/how-to/get-occupancy-permit-commercial-industrial-or-professional-activity?arrondissement=PMR");
      await page
        .getByText(/home office/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/home office/).first()],
  },
]);
