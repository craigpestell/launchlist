import { captureStep } from "../lib.mjs";
import { markText } from "../mark.mjs";

const RECORDER = "https://secure.in.gov/counties/monroe/Departments/recorder/assumed-business-names/";
const REPORTS = "https://www.in.gov/sos/business/business-entity-reports";

await captureStep("in", "02-register-business", [
  {
    n: 1,
    alt: "Monroe County Recorder assumed business names page with the $25 recording fee highlighted",
    caption: "Check your county recorder's fee for an assumed business name. Monroe County charges $25.",
    setup: async (page) => {
      await page.goto(RECORDER);
      // body is position: relative with a margin, which shifts the outline off the text.
      await page.addStyleTag({ content: "body { position: static !important; }" });
      await page.getByText(/recording fee to file a DBA/).first().scrollIntoViewIfNeeded();
    },
    highlight: (page) => [page.getByText(/recording fee to file a DBA/).first()],
  },
  {
    n: 2,
    alt: "Indiana Secretary of State business entity reports page with the every-other-year due date highlighted",
    caption: "If you formed an LLC, file a business entity report every other year in the month it was formed.",
    setup: async (page) => {
      await page.goto(REPORTS);
      await markText(page, "For-profit entities file every other year (biennial) in the anniversary month in which the entity was originally created");
    },
    highlight: (page) => [page.locator("[data-guide-mark]")],
  },
]);
