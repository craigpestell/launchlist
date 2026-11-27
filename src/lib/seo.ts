import type { Metadata } from "next";
import { getGuideShots } from "@/lib/guides";
import type { Region } from "@/lib/regions";
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
export function stepSeoTitle(step: Step, place?: string): string {
  if (!place || step.title.includes(place)) return step.title;
  return `${step.title} in ${place}`;
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

export const regionSeoTitle = (region: Region) =>
  `How to start a business in ${region.name}: step-by-step checklist`;

export function regionDescription(region: Region, steps: Step[]): string {
  const names = steps.slice(0, 4).map((s) => lowerFirst(s.title));
  return clip(
    `Free ${steps.length}-step checklist to start a business in ${region.name}: ${names.join(", ")} and more, with screenshots of each official site.`,
  );
}

/** Search keywords. Google ignores this tag and Bing barely uses it, so keep it short. */
export function regionKeywords(region: Region): string[] {
  return [
    `start a business in ${region.name}`,
    `register a business in ${region.name}`,
    `${region.name} business registration`,
    `${region.name} small business checklist`,
  ];
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
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  /** Country locale, "en-CA" or "en-US" (content/countries.json). */
  locale?: string;
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
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
}: {
  name: string;
  description: string;
  path: string;
  basePath: string;
  steps: Step[];
  crumbs: Crumb[];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      description,
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
}: {
  guide: string;
  step: Step;
  name: string;
  description: string;
  path: string;
  crumbs: Crumb[];
}) {
  const shots = getGuideShots(guide, step.slug);
  return [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      description,
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

export const siteJsonLd = (description: string) => [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description,
    publisher,
  },
];

export const regionCrumbs = (region: Region): Crumb[] => [
  { name: SITE_NAME, path: "/" },
  { name: `Start a business in ${region.name}`, path: `/${region.slug}` },
];

export const topicCrumbs = (topic: Topic): Crumb[] => [
  { name: SITE_NAME, path: "/" },
  { name: topic.title, path: `/topics/${topic.slug}` },
];
