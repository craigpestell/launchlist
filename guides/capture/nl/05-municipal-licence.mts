import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("nl", "05-municipal-licence", [
  {
    n: 1,
    alt: "City of St. John's starting a business page with the link to its guide to municipal regulations for business highlighted",
    caption:
      "Each municipality sets its own rules. St. John's, for example, publishes a guide to the municipal regulations and permits that apply to businesses. Look up your own city or town in the same way.",
    setup: async (page) => {
      await page.goto("https://www.stjohns.ca/business-development/business-supports/starting-a-business/");
      await page
        .getByText(/Guide to Municipal Regulations for Business provides/)
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/Guide to Municipal Regulations for Business provides/)],
  },
]);
