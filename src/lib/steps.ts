import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getCountry } from "@/lib/countries";
import {
  hashFile,
  languageCovers,
  localizeBody,
  localizeUrl,
  regionNames,
  topicText,
  translationFile,
} from "@/lib/i18n/content";
import { DEFAULT_LOCALE, coversTopics, localeConfig, type Locale } from "@/lib/i18n/locales";
import { getRegion } from "@/lib/regions";
import { getTopic } from "@/lib/topics";

export type Step = {
  slug: string;
  order: number;
  title: string;
  summary: string;
  time?: string;
  cost?: string;
  linkLabel?: string;
  linkUrl?: string;
  checklist: string[];
  body: string;
  /** Translated pages only: the English file changed after this was translated. */
  stale?: boolean;
};

const CONTENT = path.join(process.cwd(), "content");
const cache = new Map<string, Step[] | null>();

/**
 * Steps for a region ("bc") or a topic ("products"), in English or a
 * translation. Topic slugs are words and region slugs are two-letter codes, so
 * the two never collide.
 *
 * A region step whose front matter is only `shared: <slug>` is written once for
 * the whole country in content/shared/<country>/<slug>.md. Shared text can't
 * know a region's step numbers or name, so it uses the tokens `{step:<slug>}`
 * ("step 4"), `{region}` ("Texas") and `{in-region}` ("in Texas", "au
 * Québec"), filled in here.
 *
 * In another language each English file is replaced by its translation in
 * content/translations/<locale>/ (same relative path). If any step of the guide
 * has no translation, the guide isn't offered in that language: this returns
 * undefined for it, and getSteps falls back to English.
 */
function loadSteps(slug: string, locale: Locale): Step[] | null {
  const region = getTopic(slug) ? undefined : getRegion(slug);
  if (locale !== DEFAULT_LOCALE) {
    if (region ? !languageCovers(locale, region.country) : !coversTopics(locale)) return null;
    if (!region && !topicText(slug, locale)) return null;
  }
  const dir = region ? path.join(CONTENT, slug) : path.join(CONTENT, "topics", slug);
  const sharedDir = region && path.join(CONTENT, "shared", getCountry(region.country).slug);
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort();
  const slugs = files.map((file) => file.replace(/^\d+-/, "").replace(/\.md$/, ""));
  const placeNames = region ? regionNames(region, locale) : { name: "", in: "" };
  const stepWord = localeConfig(locale).stepWord;
  const fill = (text: string) =>
    text
      .replace(/\{step:([a-z0-9-]+)\}/g, (_, s) => `${stepWord} ${slugs.indexOf(s) + 1}`)
      .replace(/\{in-region\}/g, placeNames.in)
      .replace(/\{region\}/g, placeNames.name);

  const steps: Step[] = [];
  for (const [index, file] of files.entries()) {
    let source = path.join(dir, file);
    let { data } = matter(fs.readFileSync(source, "utf8"));
    if (data.shared && sharedDir) source = path.join(sharedDir, `${data.shared}.md`);
    let stale = false;
    let target = source;
    if (locale !== DEFAULT_LOCALE) {
      target = translationFile(locale, source);
      if (!fs.existsSync(target)) return null;
    }
    const parsed = matter(fs.readFileSync(target, "utf8"));
    data = JSON.parse(fill(JSON.stringify(parsed.data)));
    if (locale !== DEFAULT_LOCALE) stale = data.source !== hashFile(source);
    steps.push({
      slug: slugs[index],
      order: index + 1,
      title: data.title,
      summary: data.summary,
      time: data.time,
      cost: data.cost,
      linkLabel: data.linkLabel,
      linkUrl: localizeUrl(data.linkUrl, locale),
      checklist: data.checklist ?? [],
      body: localizeBody(fill(parsed.content), locale),
      ...(locale !== DEFAULT_LOCALE && { stale }),
    });
  }
  return steps;
}

/** A guide's steps in a language, or undefined if it isn't translated into it. */
export function getLocalizedSteps(slug: string, locale: Locale): Step[] | undefined {
  const key = `${locale}:${slug}`;
  if (!cache.has(key)) cache.set(key, loadSteps(slug, locale));
  return cache.get(key) ?? undefined;
}

/** A guide's English steps. */
export const getSteps = (slug: string): Step[] => getLocalizedSteps(slug, DEFAULT_LOCALE)!;

/** Whether a region or topic guide exists in this language. */
export const hasGuide = (slug: string, locale: Locale) =>
  Boolean(getLocalizedSteps(slug, locale));

export function getStep(slug: string, step: string, locale: Locale = DEFAULT_LOCALE) {
  return getLocalizedSteps(slug, locale)?.find((s) => s.slug === step);
}
