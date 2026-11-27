import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const RENEW = "https://georgia.gov/renew-llc";

await captureStep("ga", "02-register-business", [
  {
    n: 1,
    alt: "Georgia.gov annual registration for an LLC page with the April 1 deadline sentence highlighted",
    caption: "If you formed an LLC, note the April 1 deadline for its annual registration.",
    setup: async (page) => {
      await page.goto(RENEW);
      await markText(page, "The annual deadline is April 1, unless you already filed for the current year via a multi-year registration.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
