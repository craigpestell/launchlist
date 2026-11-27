import { captureStep } from "../lib.mjs";

const APPLY = "https://cdtfa.ca.gov/formspubs/pub107/applying-for-a-sellers-permit.htm";
const RATES = "https://www.cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm";

await captureStep("ca", "04-sales-tax", [
  {
    n: 1,
    alt: "CDTFA Publication 107 Applying for a Seller's Permit page with the no charge sentence highlighted",
    caption:
      "The seller's permit is free. The CDTFA may ask for a security deposit depending on your type of business and expected sales.",
    setup: async (page) => {
      await page.goto(APPLY);
      await page
        .getByText(/There is no charge for a seller.s permit/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/There is no charge for a seller.s permit/).first()],
  },
  {
    n: 2,
    alt: "CDTFA sales and use tax rates page with the Tax Districts heading and the statewide rate sentence highlighted",
    caption:
      "The statewide rate is 7.25%. Most areas add district taxes, so look up the rate for your address with the CDTFA tool on this page.",
    setup: async (page) => {
      await page.goto(RATES);
      await page
        .getByRole("heading", { name: "Tax Districts" })
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
    },
    highlight: (page) => [
      page.getByRole("heading", { name: "Tax Districts" }),
      page.getByText(/The statewide tax rate is 7\.25%/).first(),
    ],
  },
]);
