import { captureStep } from "../lib.mjs";

const FEES = "https://companiesoffice.gov.mb.ca/forms_business.html";

await captureStep("mb", "02-register-business", [
  {
    n: 1,
    alt: "Manitoba Companies Office business name forms and fees page with the Request for Name Reservation row highlighted",
    caption:
      "Start with a Request for Name Reservation. It costs $45, and an approved name is held for 90 days.",
    setup: async (page) => {
      await page.goto(FEES);
      await page
        .getByRole("row", { name: /Name Reservation/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("row", { name: /Name Reservation/i }).first()],
  },
  {
    n: 2,
    alt: "Manitoba Companies Office business name forms and fees page with the Business Name Registration row highlighted",
    caption:
      "Then file the Business Name Registration. Filing online is fastest, and it costs $60 for three years.",
    setup: async (page) => {
      await page.goto(FEES);
      await page
        .getByRole("row", { name: /Business Name Registration/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("row", { name: /Business Name Registration/i }).first()],
  },
]);
