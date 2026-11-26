import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SignupBanner } from "@/components/SignupBanner";
import { StepArticle } from "@/components/StepArticle";
import { StepList } from "@/components/StepList";
import { getSteps } from "@/lib/steps";
import { getTopic, getTopics } from "@/lib/topics";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata(
  props: PageProps<"/topics/[topic]">,
): Promise<Metadata> {
  const { topic } = await props.params;
  const found = getTopic(topic);
  return { title: found ? `${found.title} · LaunchList` : "Not found" };
}

export default async function TopicPage(props: PageProps<"/topics/[topic]">) {
  const { topic: slug } = await props.params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const all = getSteps(slug);
  // One-step topics skip the overview and show the step on this page.
  if (all.length === 1)
    return (
      <StepArticle
        guide={slug}
        basePath="/"
        backLabel="All guides"
        step={all[0]}
        steps={all}
      />
    );

  const steps = all.map((step) => ({
    slug: step.slug,
    order: step.order,
    title: step.title,
    summary: step.summary,
    time: step.time,
    itemCount: step.checklist.length,
  }));

  return (
    <>
      <Link
        href="/"
        className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
      >
        ← All guides
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{topic.title}</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        {topic.summary} Work through the steps at your own pace. Your progress
        is saved in this browser, or to your account if you sign in.
      </p>
      <div className="mt-10">
        <SignupBanner />
        <StepList region={slug} basePath={`/topics/${slug}`} steps={steps} />
      </div>
    </>
  );
}
