import { captureStep } from "../lib.mjs";

const EIN =
  "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number";

await captureStep("shared-us", "ein", [
  {
    n: 1,
    alt: "IRS Get an employer identification number page with the Apply for an EIN button highlighted",
    caption: "On the IRS EIN page, choose Apply for an EIN. Applying is free and takes one session.",
    setup: async (page) => {
      await page.goto(EIN);
      await page
        .getByRole("button", { name: "Apply for an EIN" })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("button", { name: "Apply for an EIN" }).first()],
  },
  {
    n: 2,
    alt: "IRS Get an employer identification number page with the warning about sites that charge for an EIN highlighted",
    caption: "Apply only on irs.gov. The IRS never charges for an EIN, so skip any site that asks for a fee.",
    setup: async (page) => {
      await page.goto(EIN);
    },
    highlight: (page) => [page.getByText(/Beware of websites that charge for an EIN/).first()],
  },
]);
