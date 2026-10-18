import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("sk", "01-structure-and-name", [
  {
    n: 1,
    alt: "Saskatchewan Corporate Registry choose a business type page with the sole proprietorship option highlighted",
    caption:
      "Read the Corporate Registry's guide to business types. A sole proprietorship is the simplest way to start.",
    setup: async (page) => {
      await page.goto("https://www.saskregistries.ca/corporateregistry/registeringabusiness/chooseabusinesstype");
      // Decline the optional tracking cookies so the consent pop-up doesn't cover the page.
      await page.getByRole("button", { name: "Decline", exact: true }).click({ timeout: 5_000 }).catch(() => {});
      await page
        .getByRole("heading", { name: "Sole Proprietorship" })
        .evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    },
    highlight: (page) => [page.getByRole("heading", { name: "Sole Proprietorship" })],
  },
]);
