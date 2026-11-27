import { captureStep } from "../lib.mjs";

const FEES = "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/Fees.aspx";
const FAQ = "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/FAQ.aspx";

// Fee cells on the DFI page contain zero-width spaces, so match rows loosely.
const ONLINE_ROW = /Organization via[\s​]+Online/i;

await captureStep("wi", "01-structure-and-name", [
  {
    n: 1,
    alt: "Wisconsin DFI business entity fees page with the online organization filing row highlighted",
    caption: "If you are weighing an LLC, note the $130 online filing fee in the LLC column.",
    setup: async (page) => {
      await page.goto(FEES);
      await page
        .getByRole("row", { name: ONLINE_ROW })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
    },
    highlight: (page) => [page.getByRole("row", { name: ONLINE_ROW }).first()],
  },
  {
    n: 2,
    alt: "Wisconsin DFI business entity FAQ page with the question on checking name availability highlighted",
    caption: "Check that your LLC name is available on DFI's records before you file.",
    setup: async (page) => {
      await page.goto(FAQ);
      await page
        .getByRole("heading", { name: /How do I check name availability/i })
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
    },
    highlight: (page) => [page.getByRole("heading", { name: /How do I check name availability/i }).first()],
  },
]);
