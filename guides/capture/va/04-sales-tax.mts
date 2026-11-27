import { captureStep } from "../lib.mjs";

const SALES = "https://www.tax.virginia.gov/retail-sales-and-use-tax";

// The page groups sections in accordions ("Rates", "Register for sales tax").
// Open a section only if its content is hidden.
async function openSection(page, header, target) {
  if (!(await target.isVisible())) {
    await page.getByText(header, { exact: true }).first().click();
  }
  await target.waitFor({ state: "visible" });
  await target.evaluate((el) => el.scrollIntoView({ block: "center" }));
}

await captureStep("va", "04-sales-tax", [
  {
    n: 1,
    alt: "Virginia Tax Retail Sales and Use Tax page with the Register for sales tax online link highlighted",
    caption: "Register with Virginia Tax for your Sales Tax Certificate of Registration before your first sale.",
    setup: async (page) => {
      await page.goto(SALES);
      await openSection(page, "Register for sales tax", page.getByRole("link", { name: /Register for sales tax online/i }).first());
    },
    highlight: (page) => [page.getByRole("link", { name: /Register for sales tax online/i }).first()],
  },
  {
    n: 2,
    alt: "Virginia Tax sales tax rates table with the 5.3% Everywhere else row highlighted",
    caption: "Check the rate for where you sell: 5.3% in most of Virginia, higher in some regions.",
    setup: async (page) => {
      await page.goto(SALES);
      await openSection(page, "Rates", page.getByRole("row").filter({ hasText: /Everywhere else/i }).first());
    },
    highlight: (page) => [page.getByRole("row").filter({ hasText: /Everywhere else/i }).first()],
  },
]);
