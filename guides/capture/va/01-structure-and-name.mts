import { captureStep } from "../lib.mjs";

const LLC_FORMS = "https://www.scc.virginia.gov/businesses/forms-and-fees/virginia-limited-liability-companies/";
const NAMES_FAQ = "https://www.scc.virginia.gov/businesses/business-faqs/business-entity-names/";

await captureStep("va", "01-structure-and-name", [
  {
    n: 1,
    alt: "Virginia SCC LLC forms and fees page with the Form a new Virginia LLC (LLC1011) row and its $100 fee highlighted",
    caption: "If you are weighing an LLC, check the SCC filing fee for Articles of Organization before you decide.",
    setup: async (page) => {
      await page.goto(LLC_FORMS);
      await page
        .getByRole("row", { name: /Form a new Virginia LLC \(LLC1011\)/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("row", { name: /Form a new Virginia LLC \(LLC1011\)/i }).first()],
  },
  {
    n: 2,
    alt: "Virginia SCC Business Entity Names FAQ with the rule on words an LLC name must include highlighted",
    caption: "An LLC name must include \"LLC\" or a similar word, so check the SCC rule before you pick one.",
    setup: async (page) => {
      await page.goto(NAMES_FAQ);
      await page.getByRole("button", { name: /ARE THERE ANY WORD REQUIREMENTS FOR BUSINESS ENTITY NAMES/i }).first().click();
      const item = page.getByRole("listitem").filter({ hasText: /Limited Liability Company\s+names\s+must include/i }).first();
      await item.waitFor({ state: "visible" });
      await item.evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("listitem").filter({ hasText: /Limited Liability Company\s+names\s+must include/i }).first()],
  },
]);
