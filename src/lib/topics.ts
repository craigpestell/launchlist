import fs from "node:fs";
import path from "node:path";
import { topicText } from "@/lib/i18n/content";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { hasGuide } from "@/lib/steps";

export type Topic = {
  /** URL slug and content folder name under content/topics/. */
  slug: string;
  title: string;
  summary: string;
  /**
   * Where the home page lists it: "business" for running a business or store
   * (phone number, donations, products), "help" for everyday tech and support
   * tasks (IP address, cache, screenshots).
   */
  group: TopicGroup;
};

export type TopicGroup = "business" | "help";

const TOPICS = path.join(process.cwd(), "content", "topics");

let cache: Topic[] | null = null;

/**
 * Guides that don't depend on where the business is based. Each lives in
 * content/topics/<slug>/ with a topic.json ({ title, summary, group }) beside its
 * numbered steps.
 */
export function getTopics(): Topic[] {
  if (cache) return cache;
  cache = fs.existsSync(TOPICS)
    ? fs
        .readdirSync(TOPICS)
        .filter((slug) => fs.existsSync(path.join(TOPICS, slug, "topic.json")))
        .sort()
        .map((slug) => {
          const meta = JSON.parse(
            fs.readFileSync(path.join(TOPICS, slug, "topic.json"), "utf8"),
          );
          return {
            slug,
            title: meta.title,
            summary: meta.summary,
            group: meta.group === "business" ? "business" : "help",
          } satisfies Topic;
        })
    : [];
  return cache;
}

export const getTopic = (slug: string) =>
  getTopics().find((t) => t.slug === slug);

/**
 * Topics offered in a language, with their translated title and summary.
 * English returns every topic; another language only those translated in full.
 */
export function getLocalizedTopics(locale: Locale): Topic[] {
  if (locale === DEFAULT_LOCALE) return getTopics();
  return getTopics().flatMap((topic) => {
    const text = topicText(topic.slug, locale);
    return text && hasGuide(topic.slug, locale)
      ? [{ ...topic, title: text.title, summary: text.summary }]
      : [];
  });
}

export const getLocalizedTopic = (slug: string, locale: Locale) =>
  getLocalizedTopics(locale).find((t) => t.slug === slug);
