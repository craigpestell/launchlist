// whatismyip.com serves Cloudflare's block page to Playwright, so the live shot
// (2026-11-26) was taken by hand in a normal Chrome window with this same
// masking and the outlines from lib.mts, then cropped to drop ads. See the
// new-guide skill. This script is kept for the selectors and masking.
import type { Page } from "playwright";
import { captureStep } from "../lib.mjs";

const SITE = "https://www.whatismyip.com/";

// The page shows the real address and location of whoever runs the capture.
// Swap them for documentation examples (RFC 5737, RFC 3849) before the shot
// so nobody's own connection ends up in the repo.
async function maskConnection(page: Page) {
  await page.evaluate(() => {
    const set = (selector: string, text: string) =>
      document.querySelectorAll(selector).forEach((el) => (el.textContent = text));
    set("a.ip-link-ipv4", "203.0.113.25");
    set("a.ip-link-ipv6", "2001:db8::25");
    const values: Record<string, string> = {
      "City:": "Vancouver",
      "State/Region:": "British Columbia",
      "Country:": "Canada",
      "Postal Code:": "V6B",
      "Time Zone:": "UTC -08:00",
      "ISP:": "Your internet provider",
      "ASN:": "64500",
    };
    for (const label of document.querySelectorAll(".ip-detail-label")) {
      const value = label.parentElement?.querySelector(".ip-detail-value");
      if (value) value.textContent = values[label.textContent?.trim() ?? ""] ?? "";
    }
    // The map pins the capturer's area; hide it rather than fake it.
    document
      .querySelectorAll<HTMLElement>(".map-loading-placeholder")
      .forEach((el) => (el.style.visibility = "hidden"));
  });
}

await captureStep("ip-address", "01-look-up-your-ip", [
  {
    n: 1,
    alt: "WhatIsMyIP.com home page with an example IPv4 address, its Copy button and the IPv6 address row highlighted",
    caption:
      "Your IPv4 address is at the top (1). Click Copy beside it (2) to copy it. The row below (3) is your IPv6 address. If you see both, send both. This shot uses example addresses and hides the map.",
    setup: async (page) => {
      await page.goto(SITE);
      await page.locator("a.ip-link-ipv4").waitFor();
      await maskConnection(page);
      await page
        .locator(".ip-card-ipv4")
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
      await page.mouse.wheel(0, -120);
    },
    highlight: (page) => [
      page.locator("a.ip-link-ipv4"),
      page.locator(".ip-card-ipv4 .ip-copy-btn"),
      page.locator(".ip-card-ipv6"),
    ],
  },
]);
