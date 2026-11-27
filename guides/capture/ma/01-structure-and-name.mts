// Shots use the General Laws on malegislature.gov: sec.state.ma.us (Imperva) and
// mass.gov (Akamai) block automated browsers (checked 2026-11-26).
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const LLC_CERT = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter156C/Section12";
const LLC_NAME = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter156C/Section3";

await captureStep("ma", "01-structure-and-name", [
  {
    n: 1,
    alt: "Massachusetts General Laws chapter 156C section 12 with the $500 certificate of organization and annual report fees highlighted",
    caption: "If you are weighing an LLC, note that the certificate of organization and each annual report cost $500.",
    setup: async (page) => {
      await page.goto(LLC_CERT);
      await markText(
        page,
        "The fee for the filing of the certificate of organization required by subsection (a) shall be five hundred dollars. The fee for the filing of the annual report required by subsection (c) shall be five hundred dollars.",
      );
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Massachusetts General Laws chapter 156C section 3 with the rule on words an LLC name must contain highlighted",
    caption: "Make sure an LLC name includes \"LLC\" or one of the other words the law lists.",
    setup: async (page) => {
      await page.goto(LLC_NAME);
      await markText(page, "(1) shall contain the words");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
