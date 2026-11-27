import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SignupBanner } from "@/components/SignupBanner";
import { StepArticle } from "@/components/StepArticle";
import { StepList } from "@/components/StepList";
import { TranslationNotice } from "@/components/TranslationNotice";
import { getDictionary } from "@/lib/i18n/dictionary";
import { DEFAULT_LOCALE, localePath, localeTag, locales, type Locale } from "@/lib/i18n/locales";
import {
  clip,
  languageAlternates,
  overviewJsonLd,
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
    getLocalizedTopics(lang).map((topic) => ({ lang, topic: topic.slug })),
  );
}

function load(slug: string, locale: Locale) {
  const topic = getLocalizedTopic(slug, locale);
  const steps = topic && getLocalizedSteps(slug, locale);
  return topic && steps ? { topic, steps } : undefined;
}

export async function generateMetadata(
  props: PageProps<"/[lang]/topics/[topic]">,
): Promise<Metadata> {
  const { lang, topic: slug } = await props.params;
  const page = load(slug, lang);
  if (!page) return { title: "Not found" };
  const { topic, steps } = page;
  return pageMetadata({
    title: topic.title,
    // A one-step topic is that step's page, so describe it from the step.
    description: steps.length === 1 ? stepDescription(steps[0]) : clip(topic.summary),
    path: localePath(lang, `/topics/${slug}`),
    locale: localeTag(lang),
    languages: languageAlternates(`/topics/${slug}`, { slug }),
  });
}

export default async function TopicPage(props: PageProps<"/[lang]/topics/[topic]">) {
  const { lang, topic: slug } = await props.params;
  const page = load(slug, lang);
  if (!page) notFound();
  const { topic, steps: all } = page;
  const t = getDictionary(lang);

  const english = `/topics/${slug}`;
  const path = localePath(lang, english);
  // One-step topics skip the overview and show the step on this page.
  if (all.length === 1)
    return (
      <>
        <JsonLd
          data={stepJsonLd({
            guide: slug,
            step: all[0],
            name: topic.title,
            description: stepDescription(all[0]),
            path,
            crumbs: topicCrumbs(topic, lang),
            locale: lang,
            inLanguage: localeTag(lang),
          })}
        />
        <StepArticle
          guide={slug}
          locale={lang}
          englishPath={lang === DEFAULT_LOCALE ? undefined : english}
          basePath={localePath(lang, "/")}
          backLabel={t.topic.back}
          step={all[0]}
          steps={all}
        />
      </>
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
        href={localePath(lang, "/")}
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
      >
        ← {t.topic.back}
      </Link>
      <JsonLd
        data={overviewJsonLd({
          name: topic.title,
          description: topic.summary,
          path,
          basePath: path,
          steps: all,
          crumbs: topicCrumbs(topic, lang),
          inLanguage: localeTag(lang),
        })}
      />
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{topic.title}</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        {topic.summary} {t.topic.intro}
      </p>
      <TranslationNotice locale={lang} englishPath={english} stale={all.some((s) => s.stale)} />
      <div className="mt-10">
        <SignupBanner />
        <StepList region={slug} basePath={path} steps={steps} />
      </div>
    </>
  );
}
