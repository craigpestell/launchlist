import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const GUIDE = "https://georgia.gov/starting-business-guide";
const LLC = "https://georgia.gov/register-llc";

await captureStep("ga", "01-structure-and-name", [
  {
    n: 1,
    alt: "Georgia.gov starting a business guide with the Sole Proprietorship answer open and the sentence saying sole proprietorships are not registered highlighted",
    caption: "Read Georgia.gov's note that a sole proprietorship is not registered with the Secretary of State.",
    setup: async (page) => {
      await page.goto(GUIDE);
      await page.locator("summary", { hasText: "Sole Proprietorship" }).first().click();
      await markText(page, "Sole proprietorships are not registered with the Georgia Secretary of State.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Georgia.gov Register an LLC page with the Register online section open and the $100 filing fee highlighted",
    caption: "If you are weighing an LLC, check the Secretary of State filing fee before you decide.",
    setup: async (page) => {
      await page.goto(LLC);
      await page.locator("summary", { hasText: "Register online" }).first().click();
      await markText(page, "Pay the $100 filing fee by approved credit card");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
