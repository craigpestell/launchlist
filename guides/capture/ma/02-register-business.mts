// Shots use the General Laws on malegislature.gov: mass.gov (Akamai) blocks
// automated browsers (checked 2026-11-26), and clerk pages differ by town.
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const CERT = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter110/Section5";

await captureStep("ma", "02-register-business", [
  {
    n: 1,
    alt: "Massachusetts General Laws chapter 110 section 5 with the rule to file a business certificate with the city or town clerk highlighted",
    caption: "File your business certificate with the clerk of each city or town where you have a business office. Ask the clerk for the current fee.",
    setup: async (page) => {
      await page.goto(CERT);
      await markText(page, "shall file in the office of the clerk of every city or town where an office of any such person or partnership may be situated");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Massachusetts General Laws chapter 110 section 5 with the four-year renewal rule highlighted",
    caption: "Renew your business certificate every four years, or it lapses.",
    setup: async (page) => {
      await page.goto(CERT);
      await markText(page, "shall be in force and effect for four years from the date of issue and shall be renewed each four years thereafter");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
