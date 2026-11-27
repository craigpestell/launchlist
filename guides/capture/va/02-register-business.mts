import { captureStep } from "../lib.mjs";

const FN_FAQ = "https://www.scc.virginia.gov/businesses/business-faqs/fictitious-names/";
const FEE_FAQ = "https://www.scc.virginia.gov/businesses/business-faqs/annual-registration-fees/";

await captureStep("va", "02-register-business", [
  {
    n: 1,
    alt: "Virginia SCC Fictitious Names FAQ with the $10.00 filing fee highlighted",
    caption: "Check the SCC filing fee for a fictitious name certificate, which sole proprietors file with the SCC too.",
    setup: async (page) => {
      await page.goto(FN_FAQ);
      await page.getByRole("button", { name: /WHAT ARE THE REQUIREMENTS FOR FILING A FICTITIOUS NAME IN VIRGINIA/i }).first().click();
      const item = page.getByRole("listitem").filter({ hasText: /Pay the filing fee of \$10\.00/i }).first();
      await item.waitFor({ state: "visible" });
      await item.evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("listitem").filter({ hasText: /Pay the filing fee of \$10\.00/i }).first()],
  },
  {
    n: 2,
    alt: "Virginia SCC Annual Registration Fees FAQ with the Limited Liability Companies row showing the due date and $50.00 fee highlighted",
    caption: "If you formed an LLC, note the yearly registration fee and that it is due by the end of your formation month.",
    setup: async (page) => {
      await page.goto(FEE_FAQ);
      await page.getByRole("button", { name: /HOW MUCH IS MY ANNUAL REGISTRATION FEE AND WHEN IS IT DUE/i }).first().click();
      const row = page.getByRole("row").filter({ hasText: /Limited Liability Companies/i }).filter({ hasText: /\$50\.00/ }).first();
      await row.waitFor({ state: "visible" });
      await row.evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("row").filter({ hasText: /Limited Liability Companies/i }).filter({ hasText: /\$50\.00/ }).first()],
  },
]);
