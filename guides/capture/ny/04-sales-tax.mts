import { captureStep } from "../lib.mjs";

const REGISTER = "https://www.tax.ny.gov/bus/st/register.htm";
const RATES = "https://www.tax.ny.gov/bus/st/rates.htm";

await captureStep("ny", "04-sales-tax", [
  {
    n: 1,
    alt: "New York Tax Department Register as a sales tax vendor page with the Apply online button highlighted",
    caption: "Apply online for a Certificate of Authority at least 20 days before you start selling.",
    setup: async (page) => {
      await page.goto(REGISTER);
      await page
        .getByRole("link", { name: /^Apply online/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("link", { name: /^Apply online/i }).first()],
  },
  {
    n: 2,
    alt: "New York Tax Department Find sales tax rates page with the rate lookup by address button highlighted",
    caption: "Look up the combined state and local rate for each delivery address.",
    setup: async (page) => {
      await page.goto(RATES);
      await page
        .getByRole("link", { name: /Jurisdiction\/Rate Lookup By Address/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByText(/currently 4%/i).first(),
      page.getByRole("link", { name: /Jurisdiction\/Rate Lookup By Address/i }).first(),
    ],
  },
]);
