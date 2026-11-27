// Not captured: business.nj.gov shows an Imperva block to automated browsers
// (checked 2026-11-26). Kept for a run from a normal browser session.
import { captureStep } from "../lib.mjs";

const GUIDE = "https://business.nj.gov/pages/licensing-and-certification-guide";

await captureStep("nj", "05-local-licence", [
  {
    n: 1,
    alt: "Business.NJ.gov Licensing and Certification Guide with its search heading highlighted",
    caption: "Search the state's licensing guide for the licenses that fit what you sell.",
    setup: async (page) => {
      await page.goto(GUIDE);
      await page
        .getByRole("heading", { name: /Licensing and Certification Guide/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("heading", { name: /Licensing and Certification Guide/i }).first()],
  },
]);
