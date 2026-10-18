import { captureStep } from "../lib.mjs";

const TAXATION = "https://www.gov.mb.ca/finance/taxation/";

await captureStep("mb", "05-pst", [
  {
    n: 1,
    alt: "Manitoba Finance taxation page with the Sign up for TAXcess link and the Do I Need to Register link highlighted",
    caption:
      "Check Do I Need to Register?, then sign up for TAXcess and register for a retail sales tax account. Registration is free.",
    setup: async (page) => {
      await page.goto(TAXATION);
      // The two links sit about 500px apart, so frame them both.
      await page
        .getByRole("link", { name: /Do I Need to Register/i })
        .first()
        .evaluate((el) => {
          el.scrollIntoView({ block: "start" });
          window.scrollBy(0, -150);
        });
    },
    highlight: (page) => [
      page.getByRole("link", { name: /Do I Need to Register/i }).first(),
      page.getByRole("link", { name: /Sign up.*TAXcess/i }).first(),
    ],
  },
]);
