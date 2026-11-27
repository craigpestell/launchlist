import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const FAQ = "https://dor.georgia.gov/taxes/business-taxes/sales-use-tax/sales-and-use-tax-registration-faq";
const NEED = "https://dor.georgia.gov/taxes/sales-use-tax/how-do-i-know-if-i-need-collect-sales-use-tax";
const RATES = "https://dor.georgia.gov/taxes/business-taxes/sales-use-tax/tax-rates";

await captureStep("ga", "04-sales-tax", [
  {
    n: 1,
    alt: "Georgia Department of Revenue sales and use tax registration FAQ with the answer on who must register highlighted",
    caption: "Every dealer registers for a sales and use tax number, even if all sales are online.",
    setup: async (page) => {
      await page.goto(FAQ);
      await page.locator("summary", { hasText: "Who is required to obtain a Georgia sales and use tax number?" }).first().click();
      await markText(page, "is required to register for a sales and use tax number regardless of whether all sales will be online");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Georgia Department of Revenue page on who needs to collect sales tax with the out-of-state sales threshold question highlighted",
    caption: "If you sell from outside Georgia, check the 200 sales or $100,000 threshold.",
    setup: async (page) => {
      await page.goto(NEED);
      await page
        .getByRole("heading", { name: /If located outside of Georgia/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("heading", { name: /If located outside of Georgia/i }).first()],
  },
  {
    n: 3,
    alt: "Georgia Department of Revenue tax rates page with the sentence on which rate applies highlighted",
    caption: "Charge the rate for the county where your customer takes delivery.",
    setup: async (page) => {
      await page.goto(RATES);
      await page.locator("summary", { hasText: "Which rate applies to my sale or purchase?" }).first().click();
      await markText(page, "In most instances, sales tax will be due at the rate of the county where the customer takes delivery of the property.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
