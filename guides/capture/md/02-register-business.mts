import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const REGISTER = "https://businessexpress.maryland.gov/start/register-a-business-in-maryland";
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

await captureStep("md", "02-register-business", [
  {
    n: 1,
    alt: "Maryland Business Express Register a Business page with the note that sole proprietors need an SDAT ID number highlighted",
    caption: "Note that a sole proprietor still needs an SDAT ID number to open a business bank account.",
    setup: async (page) => {
      await page.goto(REGISTER);
      await closeWelcome(page);
      await markText(page, "To open a business bank account, you must still get an SDAT ID number from");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Maryland Business Express Select a Business Name page with the Register a Trade Name link highlighted",
    caption: "If you use a name other than your own, register a trade name with your SDAT Department ID.",
    setup: async (page) => {
      await page.goto(NAME);
      await closeWelcome(page);
      await page
        .getByRole("link", { name: /Register a Trade Name/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /Register a Trade Name/i }).first()],
  },
]);
