import { captureStep } from "../lib.mjs";

const NAME_FAQ = "https://www.sos.state.tx.us/corp/namefilingsfaqs.shtml";
const FORM_205 = "https://www.sos.state.tx.us/corp/instructions/205.shtml";

await captureStep("tx", "02-register-business", [
  {
    n: 1,
    alt: "Texas Secretary of State name filings FAQ with the answer on filing an assumed name certificate with the county clerk highlighted",
    caption:
      "File your assumed name certificate with the county clerk in each county where you keep a business office. Ask the county clerk for the current fee.",
    setup: async (page) => {
      await page.goto(NAME_FAQ);
      await page
        .getByRole("heading", { name: "Where do I file my assumed name certificate?" })
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
    },
    highlight: (page) => [
      page.getByRole("heading", { name: "Where do I file my assumed name certificate?" }),
      page.getByText(/required to file an assumed name certificate with the/).first(),
    ],
  },
  {
    n: 2,
    alt: "Texas Secretary of State Form 205 instructions with the $300 LLC filing fee highlighted",
    caption:
      "Check the fee before you form an LLC. A certificate of formation costs $300.",
    setup: async (page) => {
      await page.goto(FORM_205);
      await page
        .getByRole("heading", { name: "Payment and Delivery Instructions" })
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
    },
    highlight: (page) => [
      page.getByText(/The filing fee for a certificate of formation for an LLC is/).first(),
    ],
  },
]);
