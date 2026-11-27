import { captureStep } from "../lib.mjs";
import { markText } from "./mark.mjs";

const SOLE = "https://www.businessexpress.ny.gov/app/answers/cms/a_id/3050";
const LLC = "https://www.businessexpress.ny.gov/app/answers/cms/a_id/2443";

await captureStep("ny", "01-structure-and-name", [
  {
    n: 1,
    alt: "NY Business Express Sole Proprietorship page with the sentence describing a sole proprietorship highlighted",
    caption: "Read the Business Express overview of a sole proprietorship, the simplest way to start.",
    setup: async (page) => {
      await page.goto(SOLE);
      await markText(page, "The simplest form of a business structure owned by one individual is a sole proprietorship.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "NY Business Express LLC Articles of Organization page with the Required Fees section highlighted",
    caption: "If you are weighing an LLC, check the filing and publication fees before you decide.",
    setup: async (page) => {
      await page.goto(LLC);
      await page
        .getByRole("heading", { name: /Required Fees/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("heading", { name: /Required Fees/i }).first()],
  },
]);
