import fs from "node:fs";
import path from "node:path";

export type CountryCode = "CA" | "US";

export type Country = {
  code: CountryCode;
  /** Lower-case code: the folder under content/shared/. */
  slug: string;
  /** "United States" */
  name: string;
  /** As it reads after "in": "the United States". */
  inName: string;
  /** What its regions are called: "provinces and territories", "states". */
  unit: string;
  /** Browser locale for screenshot captures. */
  locale: string;
  /**
   * Step slugs whose shared screenshots are filed under another step name,
   * e.g. Canada's "gst" and "hst" steps both use the "gst-hst" shots.
   */
  shotAliases: Record<string, string>;
};

/**
 * Everything that differs by country lives in content/countries.json, which
 * the content check and capture scripts read too. A new country is an entry
 * there, its regions in research/queue.json and a map in src/lib/maps/.
 */
const FILE = path.join(process.cwd(), "content", "countries.json");

let cache: Country[] | null = null;

export function getCountries(): Country[] {
  if (cache) return cache;
  const raw = JSON.parse(fs.readFileSync(FILE, "utf8")) as Record<
    CountryCode,
    Omit<Country, "code" | "slug">
  >;
  cache = (Object.keys(raw) as CountryCode[]).map((code) => ({
    code,
    slug: code.toLowerCase(),
    ...raw[code],
  }));
  return cache;
}

export const getCountry = (code: CountryCode) =>
  getCountries().find((c) => c.code === code)!;

/**
 * Where a country's shared material lives: steps in content/shared/<slug>/ and
 * screenshots under this key in the manifest. Prefixed so it can't collide
 * with a region slug (California is "ca" too).
 */
export const sharedKey = (country: Country) => `shared-${country.slug}`;

/** "Canada", "Canada and the United States", "A, B and C". */
export function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}
