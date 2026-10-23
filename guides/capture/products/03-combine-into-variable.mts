// Needs the Variation Converter demo site: in the plugin repo, harness/wp-harness up
// (or wp-harness reset to start from the seeded catalog again).
import { captureStep } from "../lib.mjs";
import { admin, login } from "./wp.mjs";

const group = "Classic Crew Tee";

await captureStep("products", "03-combine-into-variable", [
  {
    n: 1,
    alt: "Variation Converter Combine tab listing suggested groups, with the Classic Crew Tee row and its Ready status highlighted",
    caption:
      "The Combine tab lists groups of simple products that look like one product. Ready means nothing needs a second look; otherwise the Status column says what to check.",
    setup: async (page) => {
      await login(page);
      await admin(page, "edit.php?post_type=product&page=variation-converter");
    },
    highlight: (page) => [
      page.locator("#wpbody-content").getByRole("link", { name: group, exact: true }),
      page.locator("tr", { hasText: group }).first().getByText("Ready", { exact: true }),
    ],
  },
  {
    n: 2,
    alt: "Classic Crew Tee group opened for review, with the Black label and the Create variable product button highlighted",
    caption:
      "Open a group to review it. Check the label for each product, untick any that don't belong, then click Create variable product.",
    setup: async (page) => {
      await page.locator("#wpbody-content").getByRole("link", { name: group, exact: true }).click();
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
