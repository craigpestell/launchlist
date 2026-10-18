import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("ns", "01-structure-and-name", [
  {
    n: 1,
    alt: "Nova Scotia choose a legal structure page with the sole proprietorship description highlighted",
    caption:
      "Read Nova Scotia's guide to legal structures. A sole proprietorship is a business owned by one person and not incorporated.",
    setup: async (page) => {
      await page.goto("https://www.novascotia.ca/choose-legal-structure-your-business-or-non-profit");
      await page
        .getByText(/owned by only 1 person/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/owned by only 1 person/).first()],
  },
]);
