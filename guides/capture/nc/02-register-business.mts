import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";
import type { Page } from "playwright";

// sosnc.gov shows a site "Alerts" box over the page; close it first.
async function closeAlert(page: Page) {
  const x = page.locator("a.close-link").first();
  if (await x.isVisible().catch(() => false)) await x.click();
}

const FAQ = "https://www.sosnc.gov/frequently_asked_questions/by_title_direct/_Assumed_Business_Names";
const MAINTAIN = "https://www.sosnc.gov/manual/launching_a_business/maintaining_registration";

await captureStep("nc", "02-register-business", [
  {
    n: 1,
    alt: "NC Secretary of State Assumed Business Names FAQ with the answer on where to file highlighted",
    caption: "File your assumed business name certificate with your county register of deeds.",
    setup: async (page) => {
      await page.goto(FAQ);
      await closeAlert(page);
      await page.getByRole("button", { name: /Where do I file my assumed business name certificate/i }).first().click();
      await markText(page, "You can file an assumed business name certificate in your local register of deeds’ office.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "NC Secretary of State Maintaining Registration page with the LLC annual report due date highlighted",
    caption: "If you formed an LLC, note that its annual report is due by April 15 each year, starting the year after you form it.",
    setup: async (page) => {
      await page.goto(MAINTAIN);
      await closeAlert(page);
      await markText(page, "The first annual report is due on April 15th of the year following the creation year");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
