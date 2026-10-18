import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("nt", "01-structure-and-name", [
  {
    n: 1,
    alt: "NWT Corporate Registries business names page on the entity types tab with the proprietorship description highlighted",
    caption:
      "A proprietorship is owned by one person, with no legal distinction between you and the business, so you are personally liable.",
    setup: async (page) => {
      await page.goto("https://www.justice.gov.nt.ca/en/business-names/page/2/");
      await page
        .getByText(/personally liable/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/personally liable/).first()],
  },
]);
