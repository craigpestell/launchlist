import type { MetadataRoute } from "next";
import { getAvailableRegions } from "@/lib/regions";
import { absoluteUrl } from "@/lib/seo";
import { getSteps } from "@/lib/steps";
import { getTopics } from "@/lib/topics";

/** Every public guide page, read from content/ so new guides are listed on their own. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/privacy"), priority: 0.1 },
  ];
  for (const region of getAvailableRegions()) {
    pages.push({ url: absoluteUrl(`/${region.slug}`), priority: 0.9 });
    for (const step of getSteps(region.slug))
      pages.push({
        url: absoluteUrl(`/${region.slug}/steps/${step.slug}`),
        priority: 0.7,
      });
  }
  for (const topic of getTopics()) {
    pages.push({ url: absoluteUrl(`/topics/${topic.slug}`), priority: 0.8 });
    const steps = getSteps(topic.slug);
    // A one-step topic shows its step on the topic page itself.
    if (steps.length > 1)
      for (const step of steps)
        pages.push({
          url: absoluteUrl(`/topics/${topic.slug}/steps/${step.slug}`),
          priority: 0.6,
        });
  }
  return pages;
}
