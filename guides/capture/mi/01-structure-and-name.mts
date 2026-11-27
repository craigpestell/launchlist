// michigan.gov (LARA) blocks automated fetches (Akamai 403, checked 2026-11-26),
// so these captures use the official Michigan Compiled Laws on legislature.mi.gov.
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const FEES = "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-450-5101";
const NAME = "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-450-4204";

await captureStep("mi", "01-structure-and-name", [
  {
    n: 1,
    alt: "Michigan Legislature MCL 450.5101 LLC filing fees with the $50 articles of organization fee highlighted",
    caption: "If you are weighing an LLC, note the filing fee. Articles of Organization cost $50.",
    setup: async (page) => {
      await page.goto(FEES);
      await markText(page, "Articles of organization, $50.00.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Michigan Legislature MCL 450.4204 with the rule that an LLC name must contain limited liability company, L.L.C. or L.C. highlighted",
    caption: "Read the name rules before you form an LLC. The name must say it is a limited liability company.",
    setup: async (page) => {
      await page.goto(NAME);
      await markText(page, "the name of a domestic limited liability company shall contain the words");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
