import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("nl", "05-municipal-licence", [
  {
    n: 1,
    alt: "City of St. John's starting a business page with the starting a business guide highlighted",
    caption:
      "Each municipality sets its own rules. St. John's, for example, has home occupation rules that limit retail sales from home. Look up your own city or town in the same way.",
    setup: async (page) => {
      await page.goto("https://www.stjohns.ca/business-development/business-supports/starting-a-business/");
      await page
        .getByText(/Starting a Business/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/Starting a Business/).first()],
  },
]);
