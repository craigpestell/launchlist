import { captureStep } from "../lib.mjs";

// Written blind from the cloud; fix selectors from guides/capture/.debug/ if a capture fails.
await captureStep("sk", "02-register-business", [
  {
    n: 1,
    alt: "Saskatchewan Corporate Registry search and reserve a business name page with the name reservation expiry rule highlighted",
    caption:
      "Reserve your business name before you register it. A reservation costs $50 and is held for 90 days.",
    setup: async (page) => {
      await page.goto("https://www.saskregistries.ca/corporateregistry/registeringabusiness/searchandreserveabusinessname");
      // Decline the optional tracking cookies so the consent pop-up doesn't cover the page.
      await page.getByRole("button", { name: "Decline", exact: true }).click({ timeout: 5_000 }).catch(() => {});
      await page
        .getByText("Name Reservations Expire!")
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    },
    highlight: (page) => [page.getByText("Name Reservations Expire!").first()],
  },
]);
