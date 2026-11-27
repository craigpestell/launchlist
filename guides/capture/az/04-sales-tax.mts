// Captured by hand on 2026-11-27 in the owner's own Chrome (see the new-guide
// skill, section 5): the site blocks automated browsers. The image and its
// manifest entry were added by hand; this script is kept for the selectors.
import { captureStep } from "../lib.mjs";

const AZTAXES = "https://www.aztaxes.gov/";

await captureStep("az", "04-sales-tax", [
  {
    n: 1,
    alt: "AZTaxes.gov home page with the business registration link highlighted",
    caption: "Apply for your transaction privilege tax (TPT) license on AZTaxes.gov before your first sale.",
    setup: async (page) => {
      await page.goto(AZTAXES);
      await page
        .getByRole("link", { name: /Register/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /Register/i }).first()],
  },
]);
