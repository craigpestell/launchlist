import type { MetadataRoute } from "next";
import { localePath, locales } from "@/lib/i18n/locales";
import { getAvailableRegions } from "@/lib/regions";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { getLocalizedSteps, getSteps, hasGuide } from "@/lib/steps";
import { getTopics } from "@/lib/topics";
import type { CountryCode } from "@/lib/countries";

/**
 * Every public guide page in every language it exists in, read from content/
 * so new guides and translations are listed on their own. Each entry lists its
 * other languages (hreflang) too.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];
  /** One English path, in each language that has `guide` (or every language). */
  const add = (
    path: string,
    priority: number,
    guide?: { slug: string; country?: CountryCode },
  ) => {
    const languages = languageAlternates(path, guide);
    const alternates = languages && {
      languages: Object.fromEntries(
        Object.entries(languages).map(([tag, p]) => [tag, absoluteUrl(p)]),
      ),
    };
    for (const lang of locales())
      if (!guide || hasGuide(guide.slug, lang))
        pages.push({
          url: absoluteUrl(localePath(lang, path)),
          priority,
          ...(alternates && { alternates }),
        });
  };

  add("/", 1);
  pages.push({ url: absoluteUrl("/privacy"), priority: 0.1 });
  for (const region of getAvailableRegions()) {
    add(`/${region.slug}`, 0.9, region);
    for (const step of getSteps(region.slug))
      add(`/${region.slug}/steps/${step.slug}`, 0.7, region);
  }
  for (const topic of getTopics()) {
    const guide = { slug: topic.slug };
    add(`/topics/${topic.slug}`, 0.8, guide);
    // A one-step topic shows its step on the topic page itself.
    const steps = getLocalizedSteps(topic.slug, "en") ?? [];
    if (steps.length > 1)
      for (const step of steps) add(`/topics/${topic.slug}/steps/${step.slug}`, 0.6, guide);
  }
  return pages;
}
