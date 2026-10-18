import { captureStep } from "../lib.mjs";

const WINNIPEG = "https://legacy.winnipeg.ca/ppd/permits/Residential/HomeBusiness.stm";

await captureStep("mb", "06-municipal-licence", [
  {
    n: 1,
    alt: "City of Winnipeg home-based business page with the sentence saying a home-based business development permit is required highlighted",
    caption:
      "Each municipality sets its own rules. Winnipeg, for example, needs a home-based business development permit if business mail comes to your home or you do the paperwork there. Look up your own municipality in the same way.",
    setup: async (page) => {
      await page.goto(WINNIPEG);
      await page
        .getByText(/home-based business development permit is required/i)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/home-based business development permit is required/i).first()],
  },
]);
