import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("ns", "05-municipal-licence", [
  {
    n: 1,
    alt: "Halifax home improvement permits page on the Home Based Business tab with the development permit requirement highlighted",
    caption:
      "Each municipality sets its own rules. Halifax, for example, needs a development permit for a home-based business. Look up your own municipality in the same way.",
    setup: async (page) => {
      await page.goto("https://www.halifax.ca/home-property/building-development-permits/house-home-permits/home-improvement-permits#homebusiness");
      // Each section is a collapsed accordion; open Getting Started under the Home Based Business heading.
      await page
        .getByRole("heading", { name: "Home Based Business", level: 3 })
        .locator("xpath=following-sibling::div[1]")
        .getByRole("button", { name: "Getting Started" })
        .click();
      // Let the accordion finish opening before measuring the outline.
      await page.waitForTimeout(1_000);
      // Late scripts reset the scroll position, so wait for them before scrolling.
      await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
      await page
        .getByText(/A Development Permit . basic and land use is required/)
        .filter({ visible: true })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    },
    highlight: (page) => [page.getByText(/A Development Permit . basic and land use is required/).filter({ visible: true }).first()],
  },
]);
