import { captureStep } from "../lib.mjs";

const SALES_TAX = "https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx";
const REGISTRATION = "https://floridarevenue.com/taxes/eservices/Pages/registration.aspx";

await captureStep("fl", "04-sales-tax", [
  {
    n: 1,
    alt: "Florida Department of Revenue account registration page with the Register Online to Collect and Pay Taxes or Fees link highlighted",
    caption:
      "Register online with the Florida Business Tax Application. You receive your certificate of registration and annual resale certificate.",
    setup: async (page) => {
      await page.goto(REGISTRATION);
      await page
        .getByRole("link", { name: "Register Online to Collect and Pay Taxes or Fees" })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByRole("link", { name: "Register Online to Collect and Pay Taxes or Fees" }).first(),
    ],
  },
  {
    n: 2,
    alt: "Florida Department of Revenue sales and use tax page with the 6% state rate and the Discretionary Sales Surtax heading highlighted",
    caption:
      "Charge the 6% state rate plus the surtax for the county where the item is delivered.",
    setup: async (page) => {
      await page.goto(SALES_TAX);
      await page
        .getByRole("link", { name: /general state sales tax rate is 6%/ })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByRole("link", { name: /general state sales tax rate is 6%/ }).first(),
      page.getByRole("heading", { name: "Discretionary Sales Surtax" }).first(),
    ],
  },
]);
