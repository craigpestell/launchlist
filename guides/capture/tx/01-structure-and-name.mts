import { captureStep } from "../lib.mjs";

const SOSPORTAL = "https://www.sos.state.tx.us/corp/sosda/index.shtml";
const FORM_205 = "https://www.sos.state.tx.us/corp/instructions/205.shtml";

await captureStep("tx", "01-structure-and-name", [
  {
    n: 1,
    alt: "Texas Secretary of State SOSPortal page with the $1.00 search fee highlighted",
    caption:
      "Search business names on SOSPortal before you settle on one. Each search costs $1.",
    setup: async (page) => {
      await page.goto(SOSPORTAL);
      await page
        .getByText(/SOSPortal is available 24\/7/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/SOSPortal is available 24\/7/).first()],
  },
  {
    n: 2,
    alt: "Texas Secretary of State Form 205 instructions with the entity name and organizational designation rule highlighted",
    caption:
      "Read the name rules before you form an LLC. The name needs an organizational designation that shows it is an LLC.",
    setup: async (page) => {
      await page.goto(FORM_205);
      await page
        .getByText(/Article 1.Entity Name and Type/)
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByText(/Provide a company name and organizational designation/).first()],
  },
]);
