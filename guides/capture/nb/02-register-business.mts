import { captureStep } from "../lib.mjs";

const SERVICE =
  "https://www2.gnb.ca/content/gnb/en/services/services_renderer.201450.Register__Renewal_of_a_Business_Name.html";

// The service page builds its tabs with script, so wait for the tab before clicking.
await captureStep("nb", "02-register-business", [
  {
    n: 1,
    alt: "Service New Brunswick register or renew a business name page with the sentence on who must register highlighted",
    caption:
      "Register your business name if you trade under any name other than your own. File within two months of starting.",
    setup: async (page) => {
      await page.goto(SERVICE);
      await page
        .getByText(/uses a business name other than/i)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/uses a business name other than/i).first()],
  },
  {
    n: 2,
    alt: "Service New Brunswick register or renew a business name page on the Fees tab with the Certificate of Business Name fee highlighted",
    caption:
      "A Certificate of Business Name costs $112, including the $12 Royal Gazette fee. Renewing it every five years costs $62.",
    setup: async (page) => {
      await page.goto(SERVICE);
      await page.getByRole("tab", { name: /Fees/i }).or(page.getByRole("link", { name: /^Fees$/i })).first().click();
      await page
        .getByText(/Certificate of Business Name/i)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("row", { name: /Certificate of Business Name/i }).first()],
  },
]);
