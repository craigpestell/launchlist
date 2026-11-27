import { captureStep } from "../lib.mjs";

const START = "https://www.businessexpress.ny.gov/app/portal/content/start_a_business";

await captureStep("ny", "05-local-licence", [
  {
    n: 1,
    alt: "NY Business Express How to Start a Business page with the note on local permits and licenses highlighted",
    caption: "Check with the local offices where you are based and where you sell for any local permits.",
    setup: async (page) => {
      await page.goto(START);
      await page
        .getByText(/Many counties, cities, towns, and villages also require local permits/i)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByText(/Many counties, cities, towns, and villages also require local permits/i).first(),
    ],
  },
]);
