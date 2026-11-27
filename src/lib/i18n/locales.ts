import config from "../../../content/locales.json";
import type { CountryCode } from "@/lib/countries";

/**
 * Languages the site is offered in, from content/locales.json. Each language
 * lists the countries whose guides it covers (with the locale tag used there,
 * such as "fr-CA") and whether topic guides are translated. English is the
 * default and keeps the unprefixed URLs (/bc, /topics/ip-address); every other
 * language lives under its code (/fr/bc). Client-safe: no fs.
 */
type LocaleConfig = {
  name: string;
  default?: boolean;
  countries: Partial<Record<CountryCode, string>>;
  /** Locale tag for topic guides, or absent if topics aren't translated. */
  topics?: string;
  /** "step" / "étape", for "{step:<slug>}" references. */
  stepWord: string;
};

const LOCALES = config as Record<string, LocaleConfig>;

export type Locale = string;

export const DEFAULT_LOCALE: Locale = Object.keys(LOCALES).find(
  (l) => LOCALES[l].default,
)!;

export const locales = (): Locale[] => Object.keys(LOCALES);

export const isLocale = (value: string): value is Locale => value in LOCALES;

export const localeConfig = (locale: Locale) => LOCALES[locale];

/** Locale tag for a page: "fr-CA" for a Canadian guide in French. */
export function localeTag(locale: Locale, country?: CountryCode): string {
  const c = LOCALES[locale];
  if (country) return c.countries[country] ?? locale;
  return c.topics ?? Object.values(c.countries)[0] ?? locale;
}

export const coversCountry = (locale: Locale, country: CountryCode) =>
  Boolean(LOCALES[locale].countries[country]);

export const coversTopics = (locale: Locale) => Boolean(LOCALES[locale].topics);

/** "/bc" in French is "/fr/bc"; English paths are unchanged. */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** The locale and unprefixed path of a URL path: "/fr/bc" -> ["fr", "/bc"]. */
export function splitLocale(path: string): [Locale, string] {
  const [, first, ...rest] = path.split("/");
  if (first && first !== DEFAULT_LOCALE && isLocale(first))
    return [first, `/${rest.join("/")}`];
  return [DEFAULT_LOCALE, path];
}
