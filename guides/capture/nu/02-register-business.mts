import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("nu", "02-register-business", [
  {
    n: 1,
    alt: "Nunavut Legal Registries partnerships and business names page with the 60-day registration rule and the fee schedule link highlighted",
    caption:
      "Register a business name with Nunavut Legal Registries within 60 days of first using it. The fee is $50.",
    setup: async (page) => {
      await page.goto("https://nunavutlegalregistries.ca/cr_partnerships_en.shtml");
      await page
        .getByText(/uses a business name other than their own/)
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByText(/uses a business name other than their own/),
      page.getByRole("link", { name: "Fee Schedule" }),
    ],
  },
]);
