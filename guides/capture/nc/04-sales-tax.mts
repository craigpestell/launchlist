import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const REGISTER = "https://www.ncdor.gov/taxes-forms/sales-and-use-tax/sales-and-use-tax-registration";
const RATES = "https://www.ncdor.gov/taxes-forms/sales-and-use-tax/sales-and-use-tax-rates/current-sales-and-use-tax-rates";
const REMOTE = "https://www.ncdor.gov/taxes-forms/sales-and-use-tax/remote-sales";

await captureStep("nc", "04-sales-tax", [
  {
    n: 1,
    alt: "NC Department of Revenue Sales and Use Tax Registration page with the Register Online link and the no fee notice highlighted",
    caption: "Register online for a Certificate of Registration. There is no fee.",
    setup: async (page) => {
      await page.goto(REGISTER);
      await page
        .getByRole("link", { name: /Register Online/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
    },
    highlight: (page) => [
      page.getByRole("link", { name: /Register Online/i }).first(),
      page.getByRole("heading", { name: /There is No Fee to Apply/i }).first(),
    ],
  },
  {
    n: 2,
    alt: "NC Department of Revenue Current Sales and Use Tax Rates page with the note on the 4.75% state rate highlighted",
    caption: "Look up the total state and local rate for each county you sell into.",
    setup: async (page) => {
      await page.goto(RATES);
      await markText(page, "Listed below by county are the total (4.75% state rate plus applicable local and transit rates) sales and use tax rates.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "NC Department of Revenue Remote Sales page with the $100,000 remote seller threshold highlighted",
    caption: "Sellers based outside North Carolina must register once their sales into the state pass $100,000 a year.",
    setup: async (page) => {
      await page.goto(REMOTE);
      await markText(page, "gross sales in excess of one hundred thousand dollars ($100,000) sourced to North Carolina");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
