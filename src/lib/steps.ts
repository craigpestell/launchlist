import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
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
};

const cache = new Map<string, Step[]>();

/**
 * Steps for a region ("bc") or a topic ("products"). Topic slugs are words and
 * region slugs are two-letter codes, so the two never collide.
 */
export function getSteps(region: string): Step[] {
  const cached = cache.get(region);
  if (cached) return cached;
  const dir = getTopic(region)
    ? path.join(process.cwd(), "content", "topics", region)
    : path.join(process.cwd(), "content", region);
  const steps = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file, index) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, file), "utf8"),
      );
      return {
        slug: file.replace(/^\d+-/, "").replace(/\.md$/, ""),
        order: index + 1,
        title: data.title,
        summary: data.summary,
        time: data.time,
        cost: data.cost,
        linkLabel: data.linkLabel,
        linkUrl: data.linkUrl,
        checklist: data.checklist ?? [],
        body: content,
      };
    });
  cache.set(region, steps);
  return steps;
}

export function getStep(region: string, slug: string): Step | undefined {
  return getSteps(region).find((step) => step.slug === slug);
}
