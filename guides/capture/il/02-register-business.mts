import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

// Cook County is one example county; each county clerk runs its own filing.
const COOK = "https://www.cookcountyclerkil.gov/service/assumed-business-name-registration";

await captureStep("il", "02-register-business", [
  {
    n: 1,
    alt: "Cook County Clerk Assumed Business Name Registration page with the How to Apply text about the $50 fee highlighted",
    caption: "County clerks file assumed names. Cook County, for example, takes applications online.",
    setup: async (page) => {
      await page.goto(COOK);
      await markText(page, "Now you can apply online and our system will walk you through the steps.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 2,
    alt: "Cook County Clerk page with the sentence about publishing the notice once a week for three consecutive weeks highlighted",
    caption: "Publish the notice in a local newspaper once a week for three weeks, starting within 15 days.",
    setup: async (page) => {
      await page.goto(COOK);
      await page.locator("[id=\"2Publishthelegalnotice\"]").click();
      await page.waitForTimeout(600);
      await markText(page, "Publish the notice once a week for three consecutive weeks.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
  {
    n: 3,
    alt: "Cook County Clerk page with the sentence about submitting proof of publication within 50 days highlighted",
    caption: "Return the newspaper's proof of publication to the clerk within 50 days.",
    setup: async (page) => {
      await page.goto(COOK);
      await page.locator("[id=\"3Provideproofofpublication\"]").click();
      await page.waitForTimeout(600);
      await markText(page, "Proof of publication must be submitted to the Clerk’s office no later than 50 days from the original date of application.");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
