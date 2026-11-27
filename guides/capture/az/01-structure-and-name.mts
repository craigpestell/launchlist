import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const STEPS = "https://azcc.gov/corporations/10-steps-to-starting-a-business-in-arizona";
const FAQ = "https://azcc.gov/faqs/BusinessServicesFAQs";

// The ACC pages keep each answer in a collapsed accordion; open it before marking text.
async function openToggle(page: Page, name: RegExp, sentence: string): Promise<void> {
  await page.getByRole("button", { name }).first().click();
  await page.getByText(sentence).first().waitFor({ state: "visible" });
}

await captureStep("az", "01-structure-and-name", [
  {
    n: 1,
    alt: "Arizona Corporation Commission business services FAQ with the sentence giving the $85 online LLC filing fee highlighted",
    caption: "If you are weighing an LLC, check the Articles of Organization fee with the Corporation Commission.",
    setup: async (page) => {
      await page.goto(FAQ);
      const sentence = "You can file Articles of Organization online for $85.";
      await openToggle(page, /How do I form a limited liability company/i, sentence);
      await markText(page, sentence);
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Arizona Corporation Commission 10 steps page with the step on checking name availability opened and highlighted",
    caption: "Check your business name against corporations, LLCs and trade names on the Corporation Commission's search.",
    setup: async (page) => {
      await page.goto(STEPS);
      const sentence = "Check the entity name on the A.C.C. website to see if it is available";
      await openToggle(page, /Check Name Availability With the Arizona Corporation Commission/i, sentence);
      await markText(page, sentence);
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
