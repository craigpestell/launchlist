import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StepArticle } from "@/components/StepArticle";
import {
  pageMetadata,
  stepDescription,
  stepJsonLd,
  topicCrumbs,
} from "@/lib/seo";
import { getStep, getSteps } from "@/lib/steps";
import { getTopic, getTopics } from "@/lib/topics";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTopics().flatMap((topic) =>
    getSteps(topic.slug).map((step) => ({ topic: topic.slug, slug: step.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/topics/[topic]/steps/[slug]">,
): Promise<Metadata> {
  const { topic, slug } = await props.params;
  const found = getTopic(topic);
  const step = found ? getStep(topic, slug) : undefined;
  if (!found || !step) return { title: "Not found" };
  const single = getSteps(topic).length === 1;
  return pageMetadata({
    title: step.title === found.title ? step.title : `${step.title}: ${found.title}`,
    description: stepDescription(step),
    // A one-step topic's step is shown on the topic page, so point there.
    path: single ? `/topics/${topic}` : `/topics/${topic}/steps/${slug}`,
  });
}

export default async function TopicStepPage(
  props: PageProps<"/topics/[topic]/steps/[slug]">,
) {
  const { topic: topicSlug, slug } = await props.params;
  const topic = getTopic(topicSlug);
  const step = topic ? getStep(topicSlug, slug) : undefined;
  if (!topic || !step) notFound();

  const path = `/topics/${topicSlug}/steps/${slug}`;
  return (
    <>
      <JsonLd
        data={stepJsonLd({
          guide: topicSlug,
          step,
          name: step.title,
          description: stepDescription(step),
          path,
          crumbs: [...topicCrumbs(topic), { name: step.title, path }],
        })}
      />
      <StepArticle
        guide={topicSlug}
        basePath={`/topics/${topicSlug}`}
        backLabel={topic.title}
        guideLabel={topic.title}
        step={step}
        steps={getSteps(topicSlug)}
      />
    </>
  );
}
