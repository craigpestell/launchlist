import fs from "node:fs";
import path from "node:path";
import { getCountries, joinNames, type CountryCode } from "@/lib/countries";

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
export const siteDescription = () =>
  `Step-by-step checklists for starting a business in ${coverageNames()}, plus quick how-tos for everyday tech and support tasks.`;
