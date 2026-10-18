import { captureStep } from "../lib.mjs";

const REGISTRY = "https://www2.snb.ca/content/snb/en/sites/corporate-registry.html";

await captureStep("nb", "01-structure-and-name", [
  {
    n: 1,
    alt: "Service New Brunswick Corporate Registry page with the Register a business name link highlighted",
    caption:
      "Service New Brunswick's Corporate Registry registers the business names sole proprietors trade under. You only need it if you use a name other than your own.",
    setup: async (page) => {
      await page.goto(REGISTRY);
      await page
        .getByRole("link", { name: /Register a business name/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /Register a business name/i }).first()],
  },
]);
