import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const REGISTER = "https://www.pa.gov/services/revenue/register-my-business-for-taxes";
const SUT =
  "https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax";

await captureStep("pa", "04-sales-tax", [
  {
    n: 1,
    alt: "Pennsylvania Department of Revenue Register My Business for Taxes page with the Register Now button highlighted",
    caption: "Register for your sales tax license through myPATH's online business tax registration.",
    setup: async (page) => {
      await page.goto(REGISTER);
      await page
        .getByRole("link", { name: /Register Now/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /Register Now/i }).first()],
  },
  {
    n: 2,
    alt: "Pennsylvania Department of Revenue sales tax page with the 6 percent rate and local Allegheny and Philadelphia taxes highlighted",
    caption: "The state rate is 6%, with 1% more in Allegheny County and 2% more in Philadelphia.",
    setup: async (page) => {
      await page.goto(SUT);
      await markText(page, "The Pennsylvania sales tax rate is 6 percent.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
