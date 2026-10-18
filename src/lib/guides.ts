import fs from "node:fs";
import path from "node:path";
import { getRegion } from "@/lib/regions";

export type GuideShot = {
  region: string;
  step: string;
  file: string;
  url: string;
  alt: string;
  caption: string;
  capturedAt: string;
};

const MANIFEST = path.join(process.cwd(), "guides", "manifest.json");

function readManifest(): GuideShot[] {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    return [];
  }
}

/**
 * Federal steps look the same in every region of a country, so they are
 * captured once under the country code and shared. Maps a content step slug
 * to the shared step name in the manifest.
 */
export const SHARED_STEPS: Record<string, Record<string, string>> = {
  ca: { "business-number": "business-number", gst: "gst-hst", hst: "gst-hst" },
};

/** Screenshots for one region's step slug, in capture order. */
export function getGuideShots(region: string, slug: string): GuideShot[] {
  const manifest = readManifest();
  const own = manifest.filter(
    (s) => s.region === region && s.step.replace(/^\d+-/, "") === slug,
  );
  if (own.length > 0) return own;
  const country = getRegion(region)?.country.toLowerCase();
  const shared = country && SHARED_STEPS[country]?.[slug];
  if (!shared) return [];
  return manifest.filter((s) => s.region === country && s.step === shared);
}
