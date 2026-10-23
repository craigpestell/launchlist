import fs from "node:fs";
import path from "node:path";

export type Topic = {
  /** URL slug and content folder name under content/topics/. */
  slug: string;
  title: string;
  summary: string;
};

const TOPICS = path.join(process.cwd(), "content", "topics");

let cache: Topic[] | null = null;

/**
 * Guides that don't depend on where the business is based. Each lives in
 * content/topics/<slug>/ with a topic.json ({ title, summary }) beside its
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
          return { slug, title: meta.title, summary: meta.summary };
        })
    : [];
  return cache;
}

export const getTopic = (slug: string) =>
  getTopics().find((t) => t.slug === slug);
