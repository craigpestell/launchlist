// michigan.gov (Treasury) blocks automated fetches (Akamai 403, checked 2026-11-26),
// so these captures use the official Michigan Compiled Laws on legislature.mi.gov.
import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const RATE = "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-205-52";
const NEXUS = "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-205-52c";

await captureStep("mi", "04-sales-tax", [
  {
    n: 1,
    alt: "Michigan Legislature MCL 205.52 General Sales Tax Act with the 6% rate highlighted",
    caption: "Note the rate. Michigan sales tax is 6%, with no county or city sales taxes on top.",
    setup: async (page) => {
      await page.goto(RATE);
      await markText(page, "equal to 6% of the gross proceeds of the business");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Michigan Legislature MCL 205.52c with the $100,000 and 200 transactions thresholds for out-of-state sellers highlighted",
    caption: "Sellers outside Michigan register once they pass $100,000 in sales or 200 transactions into Michigan in the previous calendar year.",
    setup: async (page) => {
      await page.goto(NEXUS);
      await page
        .getByText(/exceed \$100,000\.00 in the previous calendar year/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByText(/exceed \$100,000\.00 in the previous calendar year/).first(),
      page.getByText(/200 or more separate transactions into this state/).first(),
    ],
  },
]);
