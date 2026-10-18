import { captureStep } from "../lib.mjs";

const STRUCTURES = "https://www.gov.mb.ca/jec/busdev/business/business_structures.html";
const NAMES = "https://companiesoffice.gov.mb.ca/starting_business_name.html";

await captureStep("mb", "01-structure-and-name", [
  {
    n: 1,
    alt: "Manitoba choose your business structure page with the sole proprietorship section and the personal liability point highlighted",
    caption:
      "Read Manitoba's guide to business structures. A sole proprietorship is the simplest way to start, but the owner is personally liable for all business debts.",
    setup: async (page) => {
      await page.goto(STRUCTURES);
      await page
        .getByText(/personally liable for all business debts/i)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/personally liable for all business debts/i).first()],
  },
  {
    n: 2,
    alt: "Manitoba Companies Office business names page with the link to information on choosing a business name highlighted",
    caption:
      "Read the Companies Office guidelines for choosing a business name before you request a name reservation.",
    setup: async (page) => {
      await page.goto(NAMES);
      await page
        .getByText(/help you choose your business name/i)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/help you choose your business name/i).first()],
  },
]);
