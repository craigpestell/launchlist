// Needs the Variation Converter demo site: in the plugin repo, harness/wp-harness up.
import { captureStep } from "../lib.mjs";
import { admin, login } from "./wp.mjs";

await captureStep("products", "02-install-variation-converter", [
  {
    n: 1,
    alt: "WordPress admin Products menu with Variation Converter and its Combine, Split and History tabs highlighted",
    caption:
      "After you activate the plugin, open Products > Variation Converter. It has three tabs: Combine, Split and History.",
    setup: async (page) => {
      await login(page);
      await admin(page, "edit.php?post_type=product&page=variation-converter");
    },
    highlight: (page) => [
      page.locator("#adminmenu").getByRole("link", { name: "Variation Converter" }),
      page.locator("#wpbody-content nav").first(),
    ],
  },
]);
