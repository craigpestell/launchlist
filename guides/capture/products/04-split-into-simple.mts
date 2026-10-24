// Needs the Variation Converter demo site: in the plugin repo, harness/wp-harness up.
import { captureStep } from "../lib.mjs";
import { admin, login } from "./wp.mjs";

const product = "Canvas Apron";
const split = (page: import("playwright").Page) =>
  page.getByRole("button", { name: /^Split into \d+ simple products?$/ });

await captureStep("products", "04-split-into-simple", [
  {
    n: 1,
    alt: "Variation Converter Split tab with the Canvas Apron variable product opened, its new product names and the Split button highlighted",
    caption:
      "On the Split tab, open a variable product. Check the name each new product will get, untick any you don't want, then click Split.",
    setup: async (page) => {
      await login(page);
      await admin(page, "edit.php?post_type=product&page=varconv&tab=split");
      await page.locator("#wpbody-content").getByRole("link", { name: product, exact: true }).click();
      await split(page).waitFor();
    },
    highlight: (page) => [
      page.getByRole("textbox", { name: /^New product name/ }).first(),
      split(page),
    ],
  },
  {
    n: 2,
    alt: "All Products list with the new Canvas Apron Sand and Canvas Apron Charcoal simple products highlighted",
    caption:
      "Each variation is now its own simple product with its SKU, price and stock. The variable product stays in your list but is hidden from the shop.",
    setup: async (page) => {
      await split(page).click();
      await page.getByText(/hidden/i).first().waitFor({ timeout: 30_000 });
      await admin(page, "edit.php?post_type=product&s=Canvas+Apron");
    },
    highlight: (page) => [
      page.locator("#the-list").getByRole("link", { name: "Canvas Apron Sand", exact: true }),
      page.locator("#the-list").getByRole("link", { name: "Canvas Apron Charcoal", exact: true }),
    ],
  },
]);
