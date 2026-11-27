import fs from "node:fs";
import path from "node:path";
import { getCountries, joinNames, type Country, type CountryCode } from "@/lib/countries";
import { getDictionary } from "@/lib/i18n/dictionary";
import { countryNames, coveragePhrase, languageCovers, regionNames } from "@/lib/i18n/content";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { hasGuide } from "@/lib/steps";

export type Region = {
  /** URL slug and content folder name, e.g. "bc" or "on". */
  slug: string;
  country: CountryCode;
  name: string;
  /** True once content/<slug>/ has guide steps. */
  available: boolean;
};

const ROOT = process.cwd();
const QUEUE = path.join(ROOT, "research", "queue.json");

let cache: Region[] | null = null;

/** Every province, territory and state, with whether its guide exists yet. */
export function getRegions(): Region[] {
  if (cache) return cache;
  const queue = JSON.parse(fs.readFileSync(QUEUE, "utf8")) as {
    country: CountryCode;
    code: string;
    name: string;
  }[];
  cache = queue.map((entry) => {
    const slug = entry.code.toLowerCase();
    return {
      slug,
      country: entry.country,
      name: entry.name,
      available: fs.existsSync(path.join(ROOT, "content", slug)),
    };
  });
  return cache;
}

export const getAvailableRegions = () => getRegions().filter((r) => r.available);

export const getRegion = (slug: string) =>
  getRegions().find((r) => r.slug === slug);

/** Countries with at least one guide, each with all of its regions. */
export const getCoverage = () =>
  getCountries()
    .map((country) => ({
      country,
      regions: getRegions().filter((r) => r.country === country.code),
    }))
    .filter(({ regions }) => regions.some((r) => r.available));

/** Where guides exist, as it reads after "in": "Canada and the United States". */
export const coverageNames = () =>
  joinNames(getCoverage().map(({ country }) => country.inName));

/** One-line description of the site, for page metadata and the web manifest. */
export const siteDescription = (locale: Locale = DEFAULT_LOCALE) =>
  getDictionary(locale).site.description(coveragePhrase(
    getLocalizedCoverage(locale).map((c) => c.country),
    locale,
    getDictionary(locale).site.and,
  ));

/** A region as a page in one language shows it: translated name, "in" form. */
export type LocalizedRegion = Region & { in: string };

export const localizeRegion = (region: Region, locale: Locale): LocalizedRegion => {
  const names = regionNames(region, locale);
  return {
    ...region,
    name: names.name,
    in: names.in,
    available: region.available && (locale === DEFAULT_LOCALE || hasGuide(region.slug, locale)),
  };
};

/**
 * getCoverage for one language: only the countries it covers
 * (content/locales.json), with each region available only once its guide is
 * translated, and names in that language.
 */
export const getLocalizedCoverage = (locale: Locale) =>
  getCoverage()
    .filter(({ country }) => languageCovers(locale, country.code))
    .map(({ country, regions }) => ({
      country,
      names: countryNames(country, locale),
      regions: regions.map((r) => localizeRegion(r, locale)),
    }))
    .filter(({ regions }) => regions.some((r) => r.available));

export type { Country };
