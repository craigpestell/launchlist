import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const START = "https://www.sos.mo.gov/business/corporations/startBusiness";
const FAQ = "https://www.sos.mo.gov/business/corporations/faqs";

await captureStep("mo", "01-structure-and-name", [
  {
    n: 1,
    alt: "Missouri Secretary of State Starting a Business page with the sentence on sole proprietorships highlighted",
    caption: "A sole proprietorship needs no filing with the Secretary of State, the simplest way to start.",
    setup: async (page) => {
      await page.goto(START);
      await markText(
        page,
        "Sole proprietorships and general partnerships can be formed or created without the involvement of the Secretary of State.",
      );
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Missouri Secretary of State FAQ page with the online and paper LLC filing fees highlighted",
    caption: "If you are weighing an LLC, filing the articles online costs less than filing on paper.",
    setup: async (page) => {
      await page.goto(FAQ);
      await markText(page, "($50.00 online versus $105.00 by paper)");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
