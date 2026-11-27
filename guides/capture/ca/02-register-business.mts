import { captureStep } from "../lib.mjs";

const LLC = "https://www.sos.ca.gov/business-programs/business-entities/forms/limited-liability-companies-california-domestic";
const FTB = "https://www.ftb.ca.gov/file/business/types/limited-liability-company/index.html";

await captureStep("ca", "02-register-business", [
  {
    n: 1,
    alt: "California Secretary of State LLC forms table with the Articles of Organization and Statement of Information rows highlighted",
    caption:
      "Forming an LLC costs $70 for the Articles of Organization. The Statement of Information costs $20 and is due within 90 days, then every two years.",
    setup: async (page) => {
      await page.goto(LLC);
      await page
        .getByRole("row", { name: /Formation - Articles of Organization/ })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByRole("row", { name: /Formation - Articles of Organization/ }).first(),
      page.getByRole("row", { name: /Statement of Information/ }).first(),
    ],
  },
  {
    n: 2,
    alt: "Franchise Tax Board LLC page with the Annual Tax section and the $800 annual tax sentence highlighted",
    caption:
      "Every California LLC also pays an $800 annual tax to the Franchise Tax Board, even in a year with no sales.",
    setup: async (page) => {
      await page.goto(FTB);
      await page
        .getByRole("heading", { name: "Annual Tax", exact: true })
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
    },
    highlight: (page) => [
      page.getByRole("heading", { name: "Annual Tax", exact: true }),
      page.getByText(/must pay an annual tax of \$800/).first(),
    ],
  },
]);
