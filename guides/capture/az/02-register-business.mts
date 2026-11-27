import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const STEPS = "https://azcc.gov/corporations/10-steps-to-starting-a-business-in-arizona";
const FAQ = "https://azcc.gov/faqs/BusinessServicesFAQs";

// The ACC pages keep each answer in a collapsed accordion; open it before marking text.
async function openToggle(page: Page, name: RegExp, sentence: string): Promise<void> {
  const toggle = page.getByRole("button", { name }).first();
  if (!(await toggle.isVisible())) {
    // Later questions sit behind each section's "Show more" button.
    for (const more of await page.getByRole("button", { name: "Show more" }).all()) {
      if (await more.isVisible()) await more.click();
    }
  }
  await toggle.click();
  await page.getByText(sentence).filter({ visible: true }).first().waitFor({ state: "visible" });
}

await captureStep("az", "02-register-business", [
  {
    n: 1,
    alt: "Arizona Corporation Commission 10 steps page with the sentence saying a trade name lasts 5 years and is registered by the Secretary of State highlighted",
    caption: "Register a trade name with the Secretary of State, not the Corporation Commission. It lasts 5 years.",
    setup: async (page) => {
      await page.goto(STEPS);
      const sentence = "A trade name is effective for 5 years.";
      await openToggle(page, /Secure the Name or Form the Entity/i, sentence);
      await markText(page, sentence);
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Arizona Corporation Commission FAQ answer on publishing documents with the sentence about the publication letter highlighted",
    caption: "If you formed an LLC, watch for the Commission's letter saying whether you must publish a notice.",
    setup: async (page) => {
      await page.goto(FAQ);
      const sentence = "the A.C.C. will inform you by letter if your document is required to be published.";
      await openToggle(page, /Do I have to publish my document/i, sentence);
      await markText(page, sentence);
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "Arizona Corporation Commission FAQ answer saying LLCs are not required to file annual reports, highlighted",
    caption: "Arizona LLCs do not file an annual report.",
    setup: async (page) => {
      await page.goto(FAQ);
      const sentence = "No, LLCs are not required to file annual reports.";
      await openToggle(page, /Do LLCs file annual reports/i, sentence);
      await markText(page, sentence);
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
