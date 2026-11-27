import { captureStep } from "../lib.mjs";
import { markText } from "./mark.mjs";

const SOLE = "https://www.businessexpress.ny.gov/app/answers/cms/a_id/3050";
const LLC = "https://www.businessexpress.ny.gov/app/answers/cms/a_id/2443";

await captureStep("ny", "02-register-business", [
  {
    n: 1,
    alt: "NY Business Express Sole Proprietorship page with the assumed name filing fees highlighted",
    caption: "Check the county clerk filing fee for your assumed name certificate.",
    setup: async (page) => {
      await page.goto(SOLE);
      await markText(page, "The basic filing fee is $25 in all counties except for the five counties of New York City where the fee is $100.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "NY Business Express LLC Articles of Organization page with the newspaper publication requirement highlighted",
    caption: "If you formed an LLC, read the newspaper publication requirement and its 120-day deadline.",
    setup: async (page) => {
      await page.goto(LLC);
      await markText(page, "Limited liability companies, formed in New York, must within 120 days after the effectiveness");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
