import { captureStep } from "../lib.mjs";

const NAMES = "https://www.sos.ca.gov/business-programs/business-entities/name-availability";

await captureStep("ca", "01-structure-and-name", [
  {
    n: 1,
    alt: "California Secretary of State Name Reservations page with the Reserving a Name heading and the Business Search link highlighted",
    caption:
      "Search your name in the Secretary of State Business Search first. It is only a preliminary check and does not cover county fictitious business names or trademarks.",
    setup: async (page) => {
      await page.goto(NAMES);
      await page
        .getByRole("heading", { name: "Reserving a Name" })
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByRole("heading", { name: "Reserving a Name" }),
      page.getByRole("link", { name: "Business Search" }).first(),
    ],
  },
]);
