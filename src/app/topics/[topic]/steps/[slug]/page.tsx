import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StepArticle } from "@/components/StepArticle";
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
  const step = getTopic(topic) ? getStep(topic, slug) : undefined;
  return { title: step ? `${step.title} · LaunchList` : "Not found" };
}

export default async function TopicStepPage(
  props: PageProps<"/topics/[topic]/steps/[slug]">,
) {
  const { topic: topicSlug, slug } = await props.params;
  const topic = getTopic(topicSlug);
  const step = topic ? getStep(topicSlug, slug) : undefined;
  if (!topic || !step) notFound();

  return (
    <StepArticle
      guide={topicSlug}
      basePath={`/topics/${topicSlug}`}
      backLabel={topic.title}
      step={step}
      steps={getSteps(topicSlug)}
    />
  );
}
