// sos.tn.gov Forms and Fees shot dropped: the site returns a CloudFront 403 to automated
// browsers (checked 2026-11-26). The guide cites the LLC fee as text.
import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const SETUP = "https://www.tn.gov/revenue/for-businesses/for-new-businesses/general-business-set-up-information.html";

// The Sole Proprietorship answer sits in a collapsed accordion.
async function openSoleProprietorship(page: Page) {
  const button = page.getByRole("button", { name: /Sole Proprietorship$/i }).first();
  const panel = page.locator(`#${await button.getAttribute("aria-controls")}`);
  if ((await button.getAttribute("aria-expanded")) !== "true") await button.click();
  // The panel animates open: wait for it before marking.
  await panel.waitFor({ state: "visible" });
  await page.waitForTimeout(800);
}

await captureStep("tn", "01-structure-and-name", [
  {
    n: 1,
    alt: "Tennessee Department of Revenue business set-up page with the sentence on sole proprietorship registration highlighted",
    caption: "A sole proprietorship is registered under your own legal name, with your trade name added.",
    setup: async (page) => {
      await page.goto(SETUP);
      await openSoleProprietorship(page);
      await markText(page, "Registration for a sole proprietorship will be under the owner's legal name.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
