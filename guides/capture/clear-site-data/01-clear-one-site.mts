// Chrome's own Site settings page for an example shop. Run in the cloud
// container: no third-party site is visited, because requests to the example
// domain are answered locally.
import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";

const SITE = "https://shop.example.com";

// Give the example site some stored data, so Chrome shows its usage and the
// Delete data button, as it does for a site the reader has used.
async function visitExampleShop(page: Page) {
  await page.context().route(`${SITE}/**`, (route) =>
    route.fulfill({
      contentType: "text/html",
      headers: { "set-cookie": "session=example; Max-Age=3600; Path=/; Secure" },
      body: `<!doctype html><title>Example shop</title><script>
        localStorage.setItem("cart", "x".repeat(20000));
      </script>`,
    }),
  );
  await page.goto(`${SITE}/`);
  await page.waitForFunction(() => localStorage.getItem("cart"));
}

// The test build of Chrome labels itself "Chrome for Testing"; hide that so
// the shot reads like the Chrome readers have.
async function hideTestBranding(page: Page) {
  // A string, because tsx wraps named functions in a helper the page lacks.
  await page.evaluate(`(() => {
    const walk = (root) => {
      for (const el of root.querySelectorAll("*")) {
        if (el.shadowRoot) walk(el.shadowRoot);
        if (el.id === "about-menu" || el.getAttribute("href") === "/help")
          el.style.visibility = "hidden";
      }
    };
    walk(document);
  })()`);
}

await captureStep(
  "clear-site-data",
  "01-clear-one-site",
  [
    {
      n: 1,
      alt: "Chrome's Site settings page for an example site, with the site name and the Delete data button highlighted",
      caption:
        "In Chrome, Site settings opens a page for the site you were on (1). Click Delete data (2), then confirm. This shot uses an example site.",
      setup: async (page) => {
        await visitExampleShop(page);
        await page.goto(
          `chrome://settings/content/siteDetails?site=${encodeURIComponent(SITE)}`,
        );
        await page.getByRole("button", { name: "Delete data" }).waitFor();
        await hideTestBranding(page);
      },
      highlight: (page) => [
        page.getByText("shop.example.com", { exact: true }),
        page.getByRole("button", { name: "Delete data" }),
      ],
    },
  ],
  { profile: true },
);
