import { captureStep } from "../lib.mjs";

const BPO = "https://gov.texas.gov/business/page/business-permits-office";

await captureStep("tx", "05-local-licence", [
  {
    n: 1,
    alt: "Texas Business Permit Office page with the General Business License section highlighted",
    caption:
      "Read the General Business License section. Texas has no general license, so check the licenses guide and your city and county instead.",
    setup: async (page) => {
      await page.goto(BPO);
      await page
        .getByRole("heading", { name: "General Business License" })
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
    },
    highlight: (page) => [
      page.getByRole("heading", { name: "General Business License" }),
      page.getByText(/does not require a general license/).first(),
    ],
  },
]);
