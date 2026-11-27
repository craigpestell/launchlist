// Captured by hand on 2026-11-27 in the owner's own Chrome (see the new-guide
// skill, section 5): the site blocks automated browsers. The image and its
// manifest entry were added by hand; this script is kept for the selectors.
import { captureStep } from "../lib.mjs";

// Sunbiz sits behind a Cloudflare bot check that blocked curl and WebFetch
// on 2026-11-26, so these selectors could not be checked against the live
// page. They are kept loose on purpose; check them on the first run.
const NAME_SEARCH = "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName";

await captureStep("fl", "01-structure-and-name", [
  {
    n: 1,
    alt: "Florida Division of Corporations Sunbiz search by entity name with the name field highlighted",
    caption:
      "Search your name on Sunbiz before you settle on it. LLC names must be distinguishable from names already on record.",
    setup: async (page) => {
      await page.goto(NAME_SEARCH);
      await page
        .getByRole("textbox")
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByRole("textbox").first(),
      page.getByRole("button", { name: /search/i }).first(),
    ],
  },
]);
