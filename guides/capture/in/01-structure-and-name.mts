import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const FAQ = "https://www.in.gov/dor/i-am-a/business-corp/business-faq";
const RATES = "https://www.in.gov/dor/resources/tax-rates-and-reports/rates-fees-and-penalties";

await captureStep("in", "01-structure-and-name", [
  {
    n: 1,
    alt: "Indiana Department of Revenue business FAQ with the sentence that sole proprietorships need not register with the Secretary of State highlighted",
    caption: "A sole proprietorship does not register with the Indiana Secretary of State.",
    setup: async (page) => {
      await page.goto(FAQ);
      // The site scrolls smoothly, so the shot would be taken mid-scroll.
      await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
      await page
        .getByRole("button", { name: /What is the difference between LLC, LLP, LP, S Corporation/i })
        .first()
        .click();
      // The answer animates open: wait for it before marking, or the scroll lands short.
      const item = page.getByRole("listitem").filter({ hasText: "Sole proprietorships are not required" });
      await item.waitFor({ state: "visible" });
      await page.waitForTimeout(800);
      await markText(page, "Sole proprietorships are not required to register with the Indiana Secretary of State.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Indiana Department of Revenue rates page with the 2026 individual income tax rate highlighted",
    caption: "Indiana's individual income tax rate is 2.95% for 2026, plus your county's income tax.",
    setup: async (page) => {
      await page.goto(RATES);
      await markText(page, "The Indiana Individual adjusted gross income tax rate for 2026 is 2.95% and will adjust in 2027 to 2.90%.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
