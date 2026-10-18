import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("yt", "02-register-business", [
  {
    n: 1,
    alt: "Yukon file a declaration of business name page with the rule on who must register highlighted",
    caption:
      "Register your business name unless you trade under your own given name. A declaration costs $25 and lasts three years.",
    setup: async (page) => {
      await page.goto("https://yukon.ca/en/doing-business/starting-business-and-self-employment/file-declaration-business-name");
      await page
        .getByText(/given name|own name/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/given name|own name/).first()],
  },
]);
