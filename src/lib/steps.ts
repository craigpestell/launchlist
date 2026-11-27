import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getCountry } from "@/lib/countries";
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
};

const CONTENT = path.join(process.cwd(), "content");
const cache = new Map<string, Step[]>();

/**
 * Steps for a region ("bc") or a topic ("products"). Topic slugs are words and
 * region slugs are two-letter codes, so the two never collide.
 *
 * A region step whose front matter is only `shared: <slug>` is written once for
 * the whole country in content/shared/<country>/<slug>.md. Shared text can't
 * know a region's step numbers or name, so it uses the tokens `{step:<slug>}`
 * ("step 4") and `{region}` ("Texas"), filled in here.
 */
export function getSteps(region: string): Step[] {
  const cached = cache.get(region);
  if (cached) return cached;
  const found = getTopic(region) ? undefined : getRegion(region);
  const dir = found
    ? path.join(CONTENT, region)
    : path.join(CONTENT, "topics", region);
  const sharedDir =
    found && path.join(CONTENT, "shared", getCountry(found.country).slug);
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort();
  const slugs = files.map((file) => file.replace(/^\d+-/, "").replace(/\.md$/, ""));
  const fill = (text: string) =>
    text
      .replace(/\{step:([a-z0-9-]+)\}/g, (_, slug) => `step ${slugs.indexOf(slug) + 1}`)
      .replace(/\{region\}/g, found?.name ?? "");

  const steps = files.map((file, index) => {
    let { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
    if (data.shared && sharedDir) {
      const shared = matter(
        fs.readFileSync(path.join(sharedDir, `${data.shared}.md`), "utf8"),
      );
      data = JSON.parse(fill(JSON.stringify(shared.data)));
      content = fill(shared.content);
    }
    return {
      slug: slugs[index],
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
