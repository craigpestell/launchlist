import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("qc", "01-structure-and-name", [
  {
    n: 1,
    alt: "Qu\u00e9bec.ca legal forms of enterprise page with the sentence saying a sole proprietorship has no legal existence separate from its owner highlighted",
    caption:
      "Read Quebec's guide to legal forms. A sole proprietorship has no legal existence separate from you, so you are personally liable for its debts.",
    setup: async (page) => {
      await page.goto("https://www.quebec.ca/en/businesses-and-self-employed-workers/start-entreprise/legal-forms");
      await page
        .getByText(/does not have a legal existence separate from its owner/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/does not have a legal existence separate from its owner/).first()],
  },
]);
