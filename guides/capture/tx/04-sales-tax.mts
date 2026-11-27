import { captureStep } from "../lib.mjs";

const PERMIT = "https://comptroller.texas.gov/taxes/permit/";
const PERMIT_FAQ = "https://comptroller.texas.gov/taxes/sales/faq/permit.php";

await captureStep("tx", "04-sales-tax", [
  {
    n: 1,
    alt: "Texas Online Tax Registration Application page with the Apply for Permit via eSystems link highlighted",
    caption:
      "Apply for your sales and use tax permit through eSystems. Allow 2–3 weeks to receive it.",
    setup: async (page) => {
      await page.goto(PERMIT);
      await page
        .getByRole("link", { name: /Apply for Permit via eSystems/ })
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [
      page.getByRole("link", { name: /Apply for Permit via eSystems/ }),
      page.getByText("Allow 2-3 weeks to receive your permit.").first(),
    ],
  },
  {
    n: 2,
    alt: "Texas Comptroller sales tax permit FAQ with the answer that there is no fee for the permit highlighted",
    caption:
      "Note that the permit itself is free. You may be asked to post a security bond.",
    setup: async (page) => {
      await page.goto(PERMIT_FAQ);
      // Answers are collapsed until opened.
      await page.getByRole("button", { name: "Open All" }).first().click();
      await page
        .getByText(/There is no fee for the permit/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/There is no fee for the permit/).first()],
  },
]);
