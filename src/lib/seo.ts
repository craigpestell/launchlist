import type { Metadata } from "next";
import { getGuideShots } from "@/lib/guides";
import { getDictionary } from "@/lib/i18n/dictionary";
import {
  DEFAULT_LOCALE,
  localePath,
  localeTag,
  locales,
  type Locale,
} from "@/lib/i18n/locales";
import type { CountryCode } from "@/lib/countries";
import type { LocalizedRegion } from "@/lib/regions";
import { hasGuide } from "@/lib/steps";
import type { Step } from "@/lib/steps";
import type { Topic } from "@/lib/topics";

/**
 * Search metadata, built from each guide's own front matter and body so a new
 * guide gets its description, canonical URL, social tags and structured data
 * without any code change. The SEO rules for writing guides are in the
 * new-guide skill (.claude/skills/new-guide/SKILL.md).
 */

export const SITE_NAME = "LaunchList";
export const SITE_URL = (
  process.env.APP_URL ?? "https://launchlist.bizrocket.ca"
).replace(/\/$/, "");

/** Search results cut descriptions at about 155 to 160 characters. */
const MAX_DESCRIPTION = 158;

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path === "/" ? "" : path}`;

/** Markdown to plain text: no links, emphasis, headings or list markers. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s.*$/gm, " ")
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, "")
    .replace(/[*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Cut at a word boundary under the limit, ending with a full stop or "…". */
export function clip(text: string, max = MAX_DESCRIPTION): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:(]+$/, "")}…`;
}

/** "Register the business" → "register the business"; leaves "CRA…" alone. */
const lowerFirst = (s: string) =>
  /^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;

/**
 * A step's search title. Region steps add the region when the title doesn't
 * name it, because people search "register for HST Ontario", not
 * "register for HST".
 */
export function stepSeoTitle(
  step: Step,
  region?: LocalizedRegion,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (!region || step.title.includes(region.name)) return step.title;
  return getDictionary(locale).seo.stepTitle(step.title, region.in);
}

/**
 * The step's summary, then its first body paragraphs (not headings or lists,
 * which read as fragments), to about 155 characters.
 */
export function stepDescription(step: Step): string {
  const paragraphs = step.body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block && !/^(#|[-*+]\s|\d+\.\s|\||>|```)/.test(block))
    .map(plainText);
  return clip([step.summary.trim(), ...paragraphs].join(" "));
}

export const regionSeoTitle = (region: LocalizedRegion, locale: Locale = DEFAULT_LOCALE) =>
  getDictionary(locale).seo.regionTitle(region.in);

export function regionDescription(
  region: LocalizedRegion,
  steps: Step[],
  locale: Locale = DEFAULT_LOCALE,
): string {
  const names = steps.slice(0, 4).map((s) => lowerFirst(s.title));
  return clip(
    getDictionary(locale).seo.regionDescription(region.in, steps.length, names.join(", ")),
  );
}

/** Search keywords. Google ignores this tag and Bing barely uses it, so keep it short. */
export const regionKeywords = (region: LocalizedRegion, locale: Locale = DEFAULT_LOCALE) =>
  getDictionary(locale).seo.regionKeywords(locale === DEFAULT_LOCALE ? region.name : region.in);

/**
 * hreflang alternates for a page: one entry per language the page exists in
 * (a guide counts only once it is translated in full), plus x-default (English).
 * `path` is the English path; `guide` is the region or topic slug, or absent
 * for pages every language has (the home page).
 */
export function languageAlternates(
  path: string,
  guide?: { slug: string; country?: CountryCode },
): Record<string, string> | undefined {
  const available = locales().filter((l) => !guide || hasGuide(guide.slug, l));
  if (available.length < 2) return undefined;
  const languages: Record<string, string> = {};
  for (const l of available) languages[localeTag(l, guide?.country)] = localePath(l, path);
  languages["x-default"] = path;
  return languages;
}

/**
 * Title, description, canonical URL, Open Graph and Twitter tags for one page.
 * Open Graph and Twitter images come from src/app/opengraph-image.png, which
 * Next.js adds to every page.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "article",
  locale = "en-CA",
  languages,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  /** Locale tag, "en-CA", "en-US" or "fr-CA" (content/locales.json). */
  locale?: string;
  /** hreflang alternates, from languageAlternates(). */
  languages?: Record<string, string>;
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path, ...(languages && { languages }) },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: locale.replace("-", "_"),
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

type Crumb = { name: string; path: string };

const breadcrumbList = (crumbs: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

const publisher = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/icon-512.png"),
};

/** An overview page: a HowTo whose steps are the guide's step pages. */
export function overviewJsonLd({
  name,
  description,
  path,
  basePath,
  steps,
  crumbs,
  inLanguage,
}: {
  name: string;
  description: string;
  path: string;
  basePath: string;
  steps: Step[];
  crumbs: Crumb[];
  /** Locale tag of the page, "fr-CA". */
  inLanguage: string;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      description,
      inLanguage,
      url: absoluteUrl(path),
      publisher,
      step: steps.map((s) => ({
        "@type": "HowToStep",
        position: s.order,
        name: s.title,
        text: s.summary,
        url: absoluteUrl(`${basePath}/steps/${s.slug}`),
      })),
    },
    { "@context": "https://schema.org", ...breadcrumbList(crumbs) },
  ];
}

/** One step page: a HowTo whose steps are its checklist items. */
export function stepJsonLd({
  guide,
  step,
  name,
  description,
  path,
  crumbs,
  locale,
  inLanguage,
}: {
  guide: string;
  step: Step;
  name: string;
  description: string;
  path: string;
  crumbs: Crumb[];
  locale: Locale;
  inLanguage: string;
}) {
  const shots = getGuideShots(guide, step.slug, locale);
  return [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      description,
      inLanguage,
      url: absoluteUrl(path),
      publisher,
      ...(shots.length && {
        image: shots.map((s) => absoluteUrl(`/${s.file}`)),
        dateModified: shots.map((s) => s.capturedAt).sort().at(-1),
      }),
      step: step.checklist.map((item, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: item,
        text: item,
      })),
    },
    { "@context": "https://schema.org", ...breadcrumbList(crumbs) },
  ];
}

export const siteJsonLd = (description: string, locale: Locale) => [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl(localePath(locale, "/")),
    description,
    inLanguage: localeTag(locale),
    publisher,
  },
];

export const regionCrumbs = (region: LocalizedRegion, locale: Locale): Crumb[] => [
  { name: SITE_NAME, path: localePath(locale, "/") },
  {
    name: getDictionary(locale).seo.regionCrumb(region.in),
    path: localePath(locale, `/${region.slug}`),
  },
];

export const topicCrumbs = (topic: Topic, locale: Locale): Crumb[] => [
  { name: SITE_NAME, path: localePath(locale, "/") },
  { name: topic.title, path: localePath(locale, `/topics/${topic.slug}`) },
];
