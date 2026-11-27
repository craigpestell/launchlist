import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const LLC =
  "https://www.sos.wa.gov/corporations-charities/business-entities/limited-liability-company-llc-professional-llc-pllc-filing-resource-page";
const BO = "https://dor.wa.gov/taxes-rates/business-occupation-tax";

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

await captureStep("wa", "01-structure-and-name", [
  {
    n: 1,
    alt: "Washington Secretary of State LLC filing page with the Certificate of Formation filing fee highlighted",
    caption: "If you are weighing an LLC, check the Certificate of Formation fee before you decide.",
    setup: async (page) => {
      await page.goto(LLC);
      await hideAlertBanner(page);
      await openAccordion(page, /^\s*Domestic LLC Certificate of Formation\s*$/);
      await markText(page, "Required Filing fees");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Washington Department of Revenue B&O tax page with the sentence describing the gross receipts tax highlighted",
    caption: "Washington has no state income tax, but most businesses pay the B&O tax on gross receipts.",
    setup: async (page) => {
      await page.goto(BO);
      await markText(page, "Most businesses in Washington are subject to a gross receipts tax known as business and occupation (B&O) tax.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
