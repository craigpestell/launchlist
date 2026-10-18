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
      await page
        .getByText(/[Hh]ome [Bb]ased [Bb]usiness/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/[Hh]ome [Bb]ased [Bb]usiness/).first()],
  },
]);
