import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("qc", "02-register-business", [
  {
    n: 1,
    alt: "Qu\u00e9bec.ca about registration page with the rule on sole proprietorships that must register highlighted",
    caption:
      "Register with the Registraire des entreprises if your business name doesn't include your first and last names. Registration costs $41.",
    setup: async (page) => {
      await page.goto("https://www.quebec.ca/en/businesses-and-self-employed-workers/start-entreprise/register-constitute-enterprise/learn-about-registration/about-registration");
      await page
        .getByText(/does not include their first and last names/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/does not include their first and last names/).first()],
  },
]);
