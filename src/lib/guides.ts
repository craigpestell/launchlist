import fs from "node:fs";
import path from "node:path";
import { getCountry, sharedKey } from "@/lib/countries";
import { shotText } from "@/lib/i18n/content";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
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
 * Screenshots for one region's step slug, in capture order. Federal steps look
 * the same in every region of a country, so they are captured once under the
 * country's shared key and every region without its own shots falls back to them.
 */
export function getGuideShots(
  region: string,
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): GuideShot[] {
  // Translated alt text and captions (content/translations/<locale>/shots.json);
  // the images themselves are of the English pages.
  return findShots(region, slug).map((shot) => ({ ...shot, ...shotText(shot.file, locale) }));
}

function findShots(region: string, slug: string): GuideShot[] {
  const manifest = readManifest();
  const own = manifest.filter(
    (s) => s.region === region && s.step.replace(/^\d+-/, "") === slug,
  );
  if (own.length > 0) return own;
  const found = getRegion(region);
  if (!found) return [];
  const country = getCountry(found.country);
  const step = country.shotAliases[slug] ?? slug;
  return manifest.filter(
    (s) => s.region === sharedKey(country) && s.step === step,
  );
}
