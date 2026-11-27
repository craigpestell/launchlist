import { captureStep } from "../lib.mjs";
import type { Page } from "playwright";

// sosnc.gov shows a site "Alerts" box over the page; close it first.
async function closeAlert(page: Page) {
  const x = page.locator("a.close-link").first();
  if (await x.isVisible().catch(() => false)) await x.click();
}

const STRUCTURE = "https://edpnc.com/resources/publications/business-structure/";
const FEES = "https://www.sosnc.gov/fees/by_title/_Business_Registration_limited_liability_companies";

await captureStep("nc", "01-structure-and-name", [
  {
    n: 1,
    alt: "EDPNC Business Structure page with the Sole Proprietorship heading highlighted",
    caption: "Read how a sole proprietorship works, the simplest way to start.",
    setup: async (page) => {
      await page.goto(STRUCTURE);
      await page
        .getByRole("heading", { name: "Sole Proprietorship", exact: true })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("heading", { name: "Sole Proprietorship", exact: true }).first()],
  },
  {
    n: 2,
    alt: "NC Secretary of State limited liability company fees page with the Articles of Organization fee highlighted",
    caption: "If you are weighing an LLC, note the $125 filing fee for Articles of Organization.",
    setup: async (page) => {
      await page.goto(FEES);
      await closeAlert(page);
      await page
        .getByRole("heading", { name: "Articles of Organization", exact: true })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("heading", { name: "Articles of Organization", exact: true }).first()],
  },
]);
