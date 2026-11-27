// michigan.gov (LARA) blocks automated fetches (Akamai 403, checked 2026-11-26),
// so these captures use the official Michigan Compiled Laws on legislature.mi.gov.
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const DBA = "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-445-1";
const ANNUAL = "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-450-4207";

await captureStep("mi", "02-register-business", [
  {
    n: 1,
    alt: "Michigan Legislature MCL 445.1 with the requirement to file an assumed name certificate with the county clerk highlighted",
    caption: "File your assumed name certificate with the clerk of each county where you do business. Ask the clerk for the current fee.",
    setup: async (page) => {
      await page.goto(DBA);
      await markText(page, "files in duplicate in the office of the clerk of the county or counties");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Michigan Legislature MCL 450.4207 with the February 15 annual statement deadline highlighted",
    caption: "If you formed an LLC, file its annual statement with LARA by February 15 each year.",
    setup: async (page) => {
      await page.goto(ANNUAL);
      await markText(page, "The statement shall be filed not later than February 15 of each year");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
