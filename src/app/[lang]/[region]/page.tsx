import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SignupBanner } from "@/components/SignupBanner";
import { StepList } from "@/components/StepList";
import { TranslationNotice } from "@/components/TranslationNotice";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localePath, localeTag, locales, type Locale } from "@/lib/i18n/locales";
import { getAvailableRegions, getRegion, localizeRegion } from "@/lib/regions";
import {
  languageAlternates,
  overviewJsonLd,
  pageMetadata,
  regionCrumbs,
  regionDescription,
  regionKeywords,
  regionSeoTitle,
} from "@/lib/seo";
import { getLocalizedSteps, hasGuide } from "@/lib/steps";

export const dynamicParams = false;

/** Each region in every language it is translated into. */
export function generateStaticParams() {
  return locales().flatMap((lang) =>
    getAvailableRegions()
      .filter((region) => hasGuide(region.slug, lang))
      .map((region) => ({ lang, region: region.slug })),
  );
}

/** The region, in this language, with its steps; undefined if not offered. */
function load(slug: string, locale: Locale) {
  const found = getRegion(slug);
  const steps = found?.available ? getLocalizedSteps(slug, locale) : undefined;
  if (!found || !steps) return undefined;
  return { region: localizeRegion(found, locale), steps };
}

export async function generateMetadata(
  props: PageProps<"/[lang]/[region]">,
): Promise<Metadata> {
  const { lang, region: slug } = await props.params;
  const page = load(slug, lang);
  if (!page) return { title: "Not found" };
  const { region, steps } = page;
  return pageMetadata({
    title: regionSeoTitle(region, lang),
    description: regionDescription(region, steps, lang),
    path: localePath(lang, `/${slug}`),
    keywords: regionKeywords(region, lang),
    locale: localeTag(lang, region.country),
    languages: languageAlternates(`/${slug}`, region),
  });
}

export default async function RegionPage(props: PageProps<"/[lang]/[region]">) {
  const { lang, region: slug } = await props.params;
  const page = load(slug, lang);
  if (!page) notFound();
  const { region, steps: all } = page;
  const t = getDictionary(lang);
  const path = localePath(lang, `/${slug}`);

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
        ← {t.region.back}
      </Link>
      <JsonLd
        data={overviewJsonLd({
          name: t.region.h1(region.in),
          description: regionDescription(region, all, lang),
          path,
          basePath: path,
          steps: all,
          crumbs: regionCrumbs(region, lang),
          inLanguage: localeTag(lang, region.country),
        })}
      />
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{t.region.h1(region.in)}</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        {t.region.intro(region.in, all.length)}
      </p>
      <TranslationNotice locale={lang} englishPath={`/${slug}`} stale={all.some((s) => s.stale)} />
      <div className="mt-10">
        <SignupBanner />
        <StepList region={slug} basePath={path} steps={steps} />
      </div>
    </>
  );
}
