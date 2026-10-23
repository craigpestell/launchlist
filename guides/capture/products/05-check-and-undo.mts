// Run after 03 and 04 so History has a combine and a split to show.
import { captureStep } from "../lib.mjs";
import { admin, login } from "./wp.mjs";

await captureStep("products", "05-check-and-undo", [
  {
    n: 1,
    alt: "Variation Converter History tab listing a combine and a split, with an Undo button highlighted",
    caption:
      "History lists every conversion, newest first. Undo puts the products back the way they were.",
    setup: async (page) => {
      await login(page);
      await admin(page, "edit.php?post_type=product&page=variation-converter&tab=history");
    },
    highlight: (page) => [page.locator("#wpbody-content").getByRole("button", { name: "Undo" }).first()],
  },
]);
