import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const TRADE = "https://dor.wa.gov/manage-business/grow-business/register-trade-names";
const LLC =
  "https://www.sos.wa.gov/corporations-charities/business-entities/limited-liability-company-llc-professional-llc-pllc-filing-resource-page";

// The SOS site shows an alert banner at the top of the page; hide it.
async function hideAlertBanner(page: Page) {
  await page.locator(".region-alert").evaluateAll((els) => {
    for (const el of els) (el as HTMLElement).style.display = "none";
  });
}

// SOS filing details sit in collapsed accordion entries; open one by its title.
async function openAccordion(page: Page, title: RegExp) {
  await page.getByRole("term").getByRole("link", { name: title }).first().click();
  await page.waitForTimeout(800);
}

await captureStep("wa", "02-register-business", [
  {
    n: 1,
    alt: "Washington Department of Revenue trade names page with the $5 trade name fee highlighted",
    caption: "Register a trade name with the Department of Revenue for $5 plus the license processing fee.",
    setup: async (page) => {
      await page.goto(TRADE);
      await markText(page, "Pay the $5 fee for each trade name registered");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Washington Secretary of State LLC filing page with the Annual Report filing fee highlighted",
    caption: "An LLC files an annual report with the Secretary of State every year.",
    setup: async (page) => {
      await page.goto(LLC);
      await hideAlertBanner(page);
      await openAccordion(page, /^\s*Annual Report\s*$/);
      await markText(page, "Required Filing fees");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
