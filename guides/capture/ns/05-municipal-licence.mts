import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("ns", "05-municipal-licence", [
  {
    n: 1,
    alt: "Halifax home improvement permits page on the Home Based Business tab with the development permit requirement highlighted",
    caption:
      "Each municipality sets its own rules. Halifax, for example, needs a development permit for a home-based business. Look up your own municipality in the same way.",
    setup: async (page) => {
      await page.goto("https://www.halifax.ca/home-property/building-development-permits/house-home-permits/home-improvement-permits");
      await page.getByRole("tab", { name: /Home Based Business/i }).or(page.getByRole("button", { name: /Home Based Business/i })).or(page.getByRole("link", { name: /^Home Based Business$/i })).first().click();
      await page
        .getByText(/Development Permit/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/Development Permit/).first()],
  },
]);
