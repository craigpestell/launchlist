// Not captured: azdor.gov and aztaxes.gov show a bot check to automated browsers
// (checked 2026-11-26). Kept for a run from a normal browser session.
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
