// Needs the Variation Converter demo site: in the plugin repo, harness/wp-harness up
// (or wp-harness reset to start from the seeded catalog again).
import { captureStep } from "../lib.mjs";
import { admin, login } from "./wp.mjs";

const group = "Classic Crew Tee";

await captureStep("products", "03-combine-into-variable", [
  {
    n: 1,
    alt: "Variation Converter Combine tab after searching for Tee, with the search box, the ticked Classic Crew Tee group and the Combine into one product button highlighted",
    caption:
      "Search for the product. Tick the groups and products that are one product, here the Classic Crew Tee group, and click Combine into one product. Pocket Tee Olive is a different shirt, so it stays unticked.",
    setup: async (page) => {
      await login(page);
      await admin(page, "edit.php?post_type=product&page=varconv");
      await page.locator("#varconv-search").fill("Tee");
      await Promise.all([
        page.waitForURL(/[?&]s=Tee/),
        page.locator(".varconv-find .button-primary").click(),
      ]);
      await page.locator("tr.varconv-group-row", { hasText: group }).locator(".varconv-pick").check();
    },
    highlight: (page) => [
      page.locator("#varconv-search"),
      page.locator("tr.varconv-group-row", { hasText: group }).locator(".varconv-pick"),
      page.locator('.varconv-do[value="combine"]').first(),
    ],
  },
  {
    n: 2,
    alt: "Classic Crew Tee opened for review, with the Black label and the Create variable product button highlighted",
    caption:
      "Check the new product: the label for each product, the attribute and the name. Untick any that don't belong, then click Create variable product.",
    setup: async (page) => {
      await Promise.all([
        page.waitForURL(/open=/),
        page.locator('.varconv-do[value="combine"]').first().click(),
      ]);
      await page.getByRole("button", { name: "Create variable product" }).waitFor();
    },
    highlight: (page) => [
      page.locator('input[value="Black"]'),
      page.getByRole("button", { name: "Create variable product" }),
    ],
  },
  {
    n: 3,
    alt: "Variation Converter after creating the Classic Crew Tee variable product, with the success message highlighted",
    caption:
      "The four tees are now one variable product with a Color option. The originals are hidden, not deleted, and Undo conversion puts them back.",
    setup: async (page) => {
      await page.getByRole("button", { name: "Create variable product" }).click();
      const done = page.getByText("Its simple products are now hidden.");
      await done.waitFor({ timeout: 30_000 });
      await done.scrollIntoViewIfNeeded();
    },
    highlight: (page) => [
      page.getByText("Its simple products are now hidden."),
      page.getByRole("button", { name: "Undo conversion" }),
    ],
  },
  {
    n: 4,
    alt: "Classic Crew Tee product page in the shop with the Color menu highlighted",
    caption:
      "In your shop, shoppers now see one Classic Crew Tee and pick a color from the menu.",
    setup: async (page) => {
      await page.getByRole("link", { name: "view", exact: true }).click();
      await page.locator("form.variations_form select").first().waitFor();
    },
    highlight: (page) => [page.locator("form.variations_form select").first()],
  },
]);
