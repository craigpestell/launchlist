// Captured by hand on 2026-11-27 in the owner's own Chrome (see the new-guide
// skill, section 5), after the owner passed dos.fl.gov's Cloudflare human check
// themselves. The images and manifest entries were added by hand; this script
// is kept for the selectors. The page lists $100 for Articles of Organization
// and $25 for the registered agent designation, $125 together.
import { captureStep } from "../lib.mjs";

// Sunbiz sits behind a Cloudflare bot check that blocked curl and WebFetch
// on 2026-11-26, so these selectors could not be checked against the live
// page. They are kept loose on purpose; check them on the first run.
const FICTITIOUS_NAME = "https://dos.fl.gov/sunbiz/start-business/efile/fl-fictitious-name-registration/";
const LLC = "https://dos.fl.gov/sunbiz/start-business/efile/fl-llc/";

await captureStep("fl", "02-register-business", [
  {
    n: 1,
    alt: "Sunbiz fictitious name registration page with the filing fee highlighted",
    caption:
      "Register your fictitious name on Sunbiz after you have advertised it in a local newspaper. The fee is $50.",
    setup: async (page) => {
      await page.goto(FICTITIOUS_NAME);
      await page
        .getByText(/\$50/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByRole("heading", { name: /fictitious name/i }).first(),
      page.getByText(/\$50/).first(),
    ],
  },
  {
    n: 2,
    alt: "Sunbiz Florida limited liability company e-filing page with the filing fee highlighted",
    caption:
      "Forming an LLC instead? Articles of Organization with a registered agent cost $125.",
    setup: async (page) => {
      await page.goto(LLC);
      await page
        .getByText(/\$125/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByRole("heading", { name: /limited liability/i }).first(),
      page.getByText(/\$125/).first(),
    ],
  },
]);
