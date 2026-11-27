import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const REGISTER = "https://tax.illinois.gov/businesses/registration.html";
const RATE = "https://tax.illinois.gov/questionsandanswers/answer.139.html";

await captureStep("il", "04-sales-tax", [
  {
    n: 1,
    alt: "Illinois Department of Revenue Business Registration page with the MyTax Illinois link highlighted",
    caption: "Register online with MyTax Illinois using Register a New Business (Form REG-1).",
    setup: async (page) => {
      await page.goto(REGISTER);
      await page
        .getByRole("link", { name: /^MyTax Illinois/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /^MyTax Illinois/i }).first()],
  },
  {
    n: 2,
    alt: "Illinois Department of Revenue Business Registration page with the sentence about registering before any purchases or sales highlighted",
    caption: "Register before you buy stock to resell or make any sales.",
    setup: async (page) => {
      await page.goto(REGISTER);
      await markText(page, "before you make any purchases, sales, or hire an employee");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "Illinois Department of Revenue answer page with the 6.25 percent general merchandise rate highlighted",
    caption: "The state rate is 6.25% on general merchandise. Local rates add to it.",
    setup: async (page) => {
      await page.goto(RATE);
      await markText(page, "6.25 percent on general merchandise");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
