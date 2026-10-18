import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("yt", "01-structure-and-name", [
  {
    n: 1,
    alt: "Yukon start a business page with the sole proprietorship information highlighted",
    caption:
      "Read Yukon's guide to starting a business. A sole proprietorship is the simplest way to start.",
    setup: async (page) => {
      await page.goto("https://yukon.ca/en/doing-business/businesses-societies-and-securities/start-business");
      await page
        .getByText(/[Ss]ole proprietor/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/[Ss]ole proprietor/).first()],
  },
]);
