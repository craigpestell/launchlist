import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("nt", "05-municipal-licence", [
  {
    n: 1,
    alt: "City of Yellowknife business licences page with the home based business application highlighted",
    caption:
      "Every business in the Northwest Territories needs a licence. In Yellowknife, a home-based business applies for a City licence and development permit together.",
    setup: async (page) => {
      await page.goto("https://www.yellowknife.ca/business-licences");
      // Close the information-only election banner so it doesn't cover the page.
      await page.getByRole("button", { name: /Dismiss/ }).first().click({ timeout: 5_000 }).catch(() => {});
      // Let the banner finish closing so the page stops shifting before scrolling.
      await page.waitForTimeout(1_000);
      // Late scripts reset the scroll position, so wait for them before scrolling.
      await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
      await page
        .getByText("Business Licence Application & Development Permit Application for Home Based Business")
        .filter({ visible: true })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    },
    highlight: (page) => [
      page.getByText("Business Licence Application & Development Permit Application for Home Based Business").filter({ visible: true }).first(),
    ],
  },
]);
