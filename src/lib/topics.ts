import fs from "node:fs";
import path from "node:path";

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
