import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const LICENSES = "https://www.tn.gov/revenue/for-businesses/for-new-businesses/licenses-permits-registration.html";

await captureStep("tn", "05-local-licence", [
  {
    n: 1,
    alt: "Tennessee Department of Revenue licenses page with the sentence on where to get a business license highlighted",
    caption: "Get your business license from the county clerk and city clerk; each is $15.",
    setup: async (page) => {
      await page.goto(LICENSES);
      await markText(page, "Licenses are obtained from the city clerk and county clerk where the business is located.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Tennessee Department of Revenue licenses page with the gross sales thresholds list highlighted",
    caption: "Your yearly gross sales decide whether you need a minimum activity or standard license.",
    setup: async (page) => {
      await page.goto(LICENSES);
      await page
        .getByText(/Minimum activity license:/i)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.locator("ul", { hasText: /Minimum activity license:/i }).last()],
  },
]);
