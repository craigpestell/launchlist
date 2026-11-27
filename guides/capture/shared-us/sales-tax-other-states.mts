import { captureStep } from "../lib.mjs";

const SSTRS = "https://www.streamlinedsalestax.org/for-businesses/sales-tax-registration-sstrs";

await captureStep("shared-us", "sales-tax-other-states", [
  {
    n: 1,
    alt: "Streamlined Sales Tax Registration System page listing the member states, with the no-fee note highlighted",
    caption:
      "If you reach a threshold in a Streamlined member state, you can register for several states at once here. The system itself is free.",
    setup: async (page) => {
      await page.goto(SSTRS);
    },
    highlight: (page) => [page.getByText(/There is no fee to register through the SSTRS/).first()],
  },
]);
