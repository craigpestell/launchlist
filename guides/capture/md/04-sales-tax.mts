import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const TAXES = "https://businessexpress.maryland.gov/start/taxes-and-insurance";

async function closeWelcome(page: Page) {
  // Late scripts reset the scroll position, and the site scrolls smoothly:
  // let the page settle first, then turn smooth scrolling off.
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
  const dismiss = page.locator("#videoDontShowDismiss");
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click();
}

await captureStep("md", "04-sales-tax", [
  {
    n: 1,
    alt: "Maryland Business Express tax accounts page with the Combined Registration Application explanation highlighted",
    caption: "Register for your sales and use tax license with the Combined Registration Application.",
    setup: async (page) => {
      await page.goto(TAXES);
      await closeWelcome(page);
      await markText(page, "You can register tax accounts using the Maryland Comptroller’s Combined");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Maryland Business Express tax accounts page with the Sales and Use Tax License entry highlighted",
    caption: "Check that the sales and use tax license is the account you need for selling goods in Maryland.",
    setup: async (page) => {
      await page.goto(TAXES);
      await closeWelcome(page);
      await markText(page, "This is required if you sell items in Maryland and collect sales tax.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
