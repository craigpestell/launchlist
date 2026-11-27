import { captureStep } from "../lib.mjs";

const CALGOLD = "https://www.calgold.ca.gov/";

await captureStep("ca", "05-local-licence", [
  {
    n: 1,
    alt: "CalGold permit assistance page with the Select a City and Select a Business Type fields highlighted",
    caption:
      "Choose your city and type of business in CalGold to see the permits that may apply. Confirm each one with the agency listed.",
    setup: async (page) => {
      await page.goto(CALGOLD);
      await page
        .getByRole("combobox").nth(0)
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("combobox").nth(0), page.getByRole("combobox").nth(1)],
  },
]);
