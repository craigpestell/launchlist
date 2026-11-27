import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const STRUCTURE = "https://businessexpress.maryland.gov/plan/choose-business-structure";
const NAME = "https://businessexpress.maryland.gov/plan/select-business-name";

async function closeWelcome(page: Page) {
  // Late scripts reset the scroll position, and the site scrolls smoothly:
  // let the page settle first, then turn smooth scrolling off.
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
  const dismiss = page.locator("#videoDontShowDismiss");
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click();
}

await captureStep("md", "01-structure-and-name", [
  {
    n: 1,
    alt: "Maryland Business Express Choose a Business Structure page with the sole proprietorship description highlighted",
    caption: "Read the Business Express description of a sole proprietorship, the simplest way to start.",
    setup: async (page) => {
      await page.goto(STRUCTURE);
      await closeWelcome(page);
      await markText(page, "The simplest way to start a business as a solo owner.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Maryland Business Express Select a Business Name page with the name search link highlighted",
    caption: "Search your business name on Maryland Business Express before you commit to it.",
    setup: async (page) => {
      await page.goto(NAME);
      await closeWelcome(page);
      await page
        .getByRole("link", { name: /Maryland Business Express Name Search/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /Maryland Business Express Name Search/i }).first()],
  },
]);
