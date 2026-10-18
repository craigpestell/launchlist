import { captureStep } from "../lib.mjs";

const FREDERICTON = "https://www.fredericton.ca/business-development/planning-development/zoning-land-use";

await captureStep("nb", "05-municipal-licence", [
  {
    n: 1,
    alt: "City of Fredericton zoning and land use page with the question about having a home based business highlighted",
    caption:
      "Each municipality sets its own rules. Fredericton, for example, allows a home occupation in a single detached house or mini-home, under its zoning by-law. Look up your own city or town in the same way.",
    setup: async (page) => {
      await page.goto(FREDERICTON);
      // The FAQ answer may sit in a collapsed accordion.
      const question = page.getByText(/home based business in my residence/i).first();
      await question.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await question.click().catch(() => {});
    },
    highlight: (page) => [page.getByText(/home based business in my residence/i).first()],
  },
]);
