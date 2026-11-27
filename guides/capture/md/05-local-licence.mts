import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const LICENSES = "https://businessexpress.maryland.gov/start/licenses-and-permits";

async function closeWelcome(page: Page) {
  // Late scripts reset the scroll position, and the site scrolls smoothly:
  // let the page settle first, then turn smooth scrolling off.
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
  const dismiss = page.locator("#videoDontShowDismiss");
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click();
}

await captureStep("md", "05-local-licence", [
  {
    n: 1,
    alt: "Maryland Business Express licenses page with the trader's license description highlighted",
    caption: "Read when Maryland requires a trader's license for selling goods.",
    setup: async (page) => {
      await page.goto(LICENSES);
      await closeWelcome(page);
      await markText(page, "You need a trader’s license if you buy goods from other businesses and sell those goods to customers.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Maryland Business Express licenses page with the List of Circuit Court Clerks link highlighted",
    caption: "Find your county's Clerk of the Circuit Court for the trader's license and local license questions.",
    setup: async (page) => {
      await page.goto(LICENSES);
      await closeWelcome(page);
      await page
        .getByRole("link", { name: /List of Circuit Court Clerks/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /List of Circuit Court Clerks/i }).first()],
  },
]);
