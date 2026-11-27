import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const SELLER = "https://www.revenue.wi.gov/Pages/FAQS/pcs-seller.aspx";
const BTR = "https://www.revenue.wi.gov/Pages/FAQS/pcs-btr.aspx";
const RATES = "https://www.revenue.wi.gov/Pages/FAQS/pcs-taxrates.aspx";

await captureStep("wi", "04-sales-tax", [
  {
    n: 1,
    alt: "Wisconsin DOR seller's permit FAQ page with the sentence about applying three weeks before opening highlighted",
    caption: "Apply for your seller's permit at least three weeks before you open.",
    setup: async (page) => {
      await page.goto(SELLER);
      await markText(page, "Apply for a seller's permit at least three weeks before you open your business.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Wisconsin DOR Business Tax Registration FAQ page with the $20 initial fee sentence highlighted",
    caption: "Pay the $20 registration fee, which covers two years.",
    setup: async (page) => {
      await page.goto(BTR);
      await markText(page, "The initial registration fee is $20 for new businesses and the renewal fee is $10.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "Wisconsin DOR tax rates FAQ page with the 5% sales tax sentence highlighted",
    caption: "Charge the 5% state rate plus any county or city tax where the buyer receives the goods.",
    setup: async (page) => {
      await page.goto(RATES);
      await markText(page, "The Wisconsin sales tax is a 5% tax imposed on the sales price of retailers");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
