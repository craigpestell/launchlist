import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StepArticle } from "@/components/StepArticle";
import { DEFAULT_LOCALE, localePath, localeTag, locales, type Locale } from "@/lib/i18n/locales";
import {
  languageAlternates,
  pageMetadata,
  stepDescription,
  stepJsonLd,
  topicCrumbs,
} from "@/lib/seo";
import { getLocalizedSteps } from "@/lib/steps";
import { getLocalizedTopic, getLocalizedTopics } from "@/lib/topics";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales().flatMap((lang) =>
    getLocalizedTopics(lang).flatMap((topic) =>
      (getLocalizedSteps(topic.slug, lang) ?? []).map((step) => ({
        lang,
        topic: topic.slug,
        slug: step.slug,
      })),
    ),
  );
}

function load(topicSlug: string, slug: string, locale: Locale) {
  const topic = getLocalizedTopic(topicSlug, locale);
  const steps = topic && getLocalizedSteps(topicSlug, locale);
  const step = steps?.find((s) => s.slug === slug);
  return topic && steps && step ? { topic, steps, step } : undefined;
}

export async function generateMetadata(
  props: PageProps<"/[lang]/topics/[topic]/steps/[slug]">,
): Promise<Metadata> {
  const { lang, topic: topicSlug, slug } = await props.params;
  const page = load(topicSlug, slug, lang);
  if (!page) return { title: "Not found" };
  const { topic, steps, step } = page;
  // A one-step topic's step is shown on the topic page, so point there.
  const english = steps.length === 1 ? `/topics/${topicSlug}` : `/topics/${topicSlug}/steps/${slug}`;
  return pageMetadata({
    title: step.title === topic.title ? step.title : `${step.title}: ${topic.title}`,
    description: stepDescription(step),
    path: localePath(lang, english),
    locale: localeTag(lang),
    languages: languageAlternates(english, { slug: topicSlug }),
  });
}

export default async function TopicStepPage(
  props: PageProps<"/[lang]/topics/[topic]/steps/[slug]">,
) {
  const { lang, topic: topicSlug, slug } = await props.params;
  const page = load(topicSlug, slug, lang);
  if (!page) notFound();
  const { topic, steps, step } = page;

  const english = `/topics/${topicSlug}/steps/${slug}`;
  const path = localePath(lang, english);
  return (
    <>
      <JsonLd
        data={stepJsonLd({
          guide: topicSlug,
          step,
          name: step.title,
          description: stepDescription(step),
          path,
          crumbs: [...topicCrumbs(topic, lang), { name: step.title, path }],
          locale: lang,
          inLanguage: localeTag(lang),
        })}
      />
      <StepArticle
        guide={topicSlug}
        locale={lang}
        englishPath={lang === DEFAULT_LOCALE ? undefined : english}
        basePath={localePath(lang, `/topics/${topicSlug}`)}
        backLabel={topic.title}
        guideLabel={topic.title}
        step={step}
        steps={steps}
      />
    </>
  );
}
