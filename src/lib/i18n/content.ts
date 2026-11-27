import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { getCountry, joinNames, type Country, type CountryCode } from "@/lib/countries";
import type { Region } from "@/lib/regions";
import {
  coversCountry,
  coversTopics,
  DEFAULT_LOCALE,
  localePath,
  type Locale,
} from "./locales";

/**
 * Translated guide content, from content/translations/<locale>/ (written by the
 * guide-translator agent; see .claude/agents/guide-translator.md). English is
 * the source: a translation mirrors its English file's path and records the
 * version it was made from (`source:`), so a page can tell when the English
 * has changed since.
 */
const CONTENT = path.join(process.cwd(), "content");
const dir = (locale: Locale) => path.join(CONTENT, "translations", locale);

const readJson = <T>(file: string, fallback: T): T => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
};

const cache = new Map<string, unknown>();
function cached<T>(key: string, load: () => T): T {
  if (!cache.has(key)) cache.set(key, load());
  return cache.get(key) as T;
}

/** Same hash as scripts/translations-lib.mjs: the English file's exact bytes. */
export const hashFile = (file: string) =>
  crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").slice(0, 12);

/** Where a translation of an English file under content/ lives. */
export const translationFile = (locale: Locale, englishFile: string) =>
  path.join(dir(locale), path.relative(CONTENT, englishFile));

type Names = {
  countries?: Partial<Record<CountryCode, { name: string; inName: string; unit: string }>>;
  regions?: Record<string, { name: string; in: string }>;
};
const names = (locale: Locale) =>
  cached(`names:${locale}`, () => readJson<Names>(path.join(dir(locale), "names.json"), {}));

/** A region's name, and its name as it reads after "in" ("in Ontario", "au Québec"). */
export function regionNames(region: Pick<Region, "slug" | "name">, locale: Locale) {
  const t = locale === DEFAULT_LOCALE ? undefined : names(locale).regions?.[region.slug];
  return { name: t?.name ?? region.name, in: t?.in ?? `in ${region.name}` };
}

/** A country's name, "in" form ("in the United States", "au Canada") and unit. */
export function countryNames(country: Country, locale: Locale) {
  const t = locale === DEFAULT_LOCALE ? undefined : names(locale).countries?.[country.code];
  return {
    name: t?.name ?? country.name,
    in: t?.inName ?? `in ${country.inName}`,
    unit: t?.unit ?? country.unit,
  };
}

/** "in Canada and the United States", "au Canada". */
export function coveragePhrase(countries: Country[], locale: Locale, and: string) {
  if (locale === DEFAULT_LOCALE)
    return `in ${joinNames(countries.map((c) => c.inName))}`;
  const parts = countries.map((c) => countryNames(c, locale).in);
  return parts.length <= 1
    ? (parts[0] ?? "")
    : `${parts.slice(0, -1).join(", ")} ${and} ${parts.at(-1)}`;
}

/** English official page -> its official version in this language (links.json). */
const links = (locale: Locale) =>
  cached(`links:${locale}`, () => {
    const map = readJson<Record<string, string>>(path.join(dir(locale), "links.json"), {});
    delete map._comment;
    return map;
  });

export const localizeUrl = (url: string | undefined, locale: Locale) =>
  url && locale !== DEFAULT_LOCALE ? (links(locale)[url] ?? url) : url;

/**
 * Body text for a language: official links swapped for their French pages, and
 * internal links (/topics/ip-address) given the language prefix.
 */
export function localizeBody(body: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE) return body;
  return body
    .replace(/\]\((https?:\/\/[^)\s]+)\)/g, (_, url) => `](${localizeUrl(url, locale)})`)
    .replace(/\]\((\/[^)\s]*)\)/g, (_, p) => `](${localePath(locale, p)})`);
}

export type TopicText = { title: string; summary: string; stale: boolean };

/** A topic's translated title and summary, or undefined if it isn't translated. */
export function topicText(slug: string, locale: Locale): TopicText | undefined {
  if (locale === DEFAULT_LOCALE || !coversTopics(locale)) return undefined;
  const english = path.join(CONTENT, "topics", slug, "topic.json");
  // A topic tied to some countries (topic.json "countries", e.g. a phone guide
  // naming Canadian providers) is offered only in languages covering one of them.
  const only = readJson<{ countries?: CountryCode[] }>(english, {}).countries;
  if (only && !only.some((c) => coversCountry(locale, c))) return undefined;
  const file = translationFile(locale, english);
  if (!fs.existsSync(file)) return undefined;
  const t = readJson<{ title: string; summary: string; source?: string }>(file, {
    title: "",
    summary: "",
  });
  return { title: t.title, summary: t.summary, stale: t.source !== hashFile(english) };
}

type ShotText = { alt: string; caption: string };
export const shotText = (file: string, locale: Locale): ShotText | undefined =>
  locale === DEFAULT_LOCALE
    ? undefined
    : cached(`shots:${locale}`, () =>
        readJson<Record<string, ShotText>>(path.join(dir(locale), "shots.json"), {}),
      )[file];

/** Whether a language covers this country's guides at all (content/locales.json). */
export const languageCovers = (locale: Locale, country: CountryCode) =>
  locale === DEFAULT_LOCALE || coversCountry(locale, country);

export { getCountry };
