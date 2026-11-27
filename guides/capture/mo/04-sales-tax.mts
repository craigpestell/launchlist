import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const REGISTER = "https://dor.mo.gov/register-business";
const FAQ = "https://dor.mo.gov/faq/taxation/business/registration.html";
const SALES_USE = "https://dor.mo.gov/taxation/business/tax-types/sales-use/";

await captureStep("mo", "04-sales-tax", [
  {
    n: 1,
    alt: "Missouri Department of Revenue business registration page with the Start Registration Here button highlighted",
    caption: "Apply online for your retail sales tax license before you make your first sale.",
    setup: async (page) => {
      await page.goto(REGISTER);
      await page
        .getByRole("link", { name: /START REGISTRATION HERE/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /START REGISTRATION HERE/i }).first()],
  },
  {
    n: 2,
    alt: "Missouri Department of Revenue registration FAQ with the answer saying bonds are no longer required highlighted",
    caption: "Since 2018, a new seller does not post a bond unless the Department asks for one.",
    setup: async (page) => {
      await page.goto(FAQ);
      await page.getByRole("link", { name: /Do I have to post a bond to obtain a tax number/i }).first().click();
      await page.locator("#collapse5").waitFor({ state: "visible" });
      await page.waitForTimeout(500);
      await markText(
        page,
        "Effective August 28, 2018, bonds are no longer required for businesses that collect and pay sales or vendors use tax.",
      );
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "Missouri Department of Revenue Sales/Use Tax page with the sentence on the 4.225 percent state rate highlighted",
    caption: "The state rate is 4.225%, and cities, counties and districts add local tax.",
    setup: async (page) => {
      await page.goto(SALES_USE);
      await markText(page, "The 4.225 percent state sales and use tax is distributed into four funds");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
