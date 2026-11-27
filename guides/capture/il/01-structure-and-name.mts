import { captureStep } from "../lib.mjs";

const DCEO = "https://dceo.illinois.gov/smallbizassistance/beginhere.html";
const INCOME = "https://tax.illinois.gov/research/taxrates/income.html";

await captureStep("il", "01-structure-and-name", [
  {
    n: 1,
    alt: "Illinois DCEO Begin Here page with the Starting Your Business in Illinois Handbook link highlighted",
    caption: "Read DCEO's Starting Your Business in Illinois Handbook to compare a sole proprietorship and an LLC.",
    setup: async (page) => {
      await page.goto(DCEO);
      await page
        .getByText(/Starting Your Business in Illinois Handbook/i)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/Starting Your Business in Illinois Handbook/i).first()],
  },
  {
    n: 2,
    alt: "Illinois Department of Revenue Income Tax Rates page with the Individual Income Tax label highlighted",
    caption: "Illinois taxes your business profit at a flat individual income tax rate.",
    setup: async (page) => {
      await page.goto(INCOME);
      await page
        .locator("strong", { hasText: /^Individual Income Tax$/ })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.locator("strong", { hasText: /^Individual Income Tax$/ }).first()],
  },
]);
