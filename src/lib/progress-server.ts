import { getAvailableRegions } from "@/lib/regions";
import { getSteps } from "@/lib/steps";
import { getTopics } from "@/lib/topics";

export function validItemIds(): Set<string> {
  const ids = new Set<string>();
  for (const region of getAvailableRegions()) {
    const prefix = region.slug === "bc" ? "" : `${region.slug}:`;
    for (const step of getSteps(region.slug)) {
      step.checklist.forEach((_, i) => ids.add(`${prefix}${step.slug}:${i}`));
    }
  }
  for (const topic of getTopics()) {
    for (const step of getSteps(topic.slug)) {
      step.checklist.forEach((_, i) => ids.add(`${topic.slug}:${step.slug}:${i}`));
    }
  }
  return ids;
}

/**
 * Region or topic slug of a checklist item id: "on:hst:1" → "on",
 * "products:combine:0" → "products", "pst:2" → "bc".
 */
export function regionOfItem(itemId: string): string {
  const parts = itemId.split(":");
  return parts.length === 3 ? parts[0] : "bc";
}
