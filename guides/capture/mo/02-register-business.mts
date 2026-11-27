import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const FICTITIOUS = "https://www.sos.mo.gov/business/corporations/fictitious_faq";
const FAQ = "https://www.sos.mo.gov/business/corporations/faqs";

await captureStep("mo", "02-register-business", [
  {
    n: 1,
    alt: "Missouri Secretary of State fictitious name FAQ with the answer on the filing fee highlighted",
    caption: "Register your fictitious name with the Secretary of State online or by mail with Form Corp. 56.",
    setup: async (page) => {
      await page.goto(FICTITIOUS);
      await markText(page, "together with the filing fee of $7.00");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Missouri Secretary of State fictitious name FAQ with the sentence on the five-year registration period highlighted",
    caption: "The registration lasts five years. Renew it in the six months before it expires.",
    setup: async (page) => {
      await page.goto(FICTITIOUS);
      await markText(page, "A fictitious registration is good for five years and may be renewed at the end of that period.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "Missouri Secretary of State FAQ page with the question on LLC annual reports highlighted",
    caption: "If you formed an LLC, Missouri does not require an annual report.",
    setup: async (page) => {
      await page.goto(FAQ);
      await markText(page, "Do limited liability companies have to file an annual report?");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
