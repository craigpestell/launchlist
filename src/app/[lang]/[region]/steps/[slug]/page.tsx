import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StepArticle } from "@/components/StepArticle";
import { getDictionary } from "@/lib/i18n/dictionary";
import { DEFAULT_LOCALE, localePath, localeTag, locales, type Locale } from "@/lib/i18n/locales";
import { getSection } from "@/lib/profile";
import { getAvailableRegions, getRegion, localizeRegion } from "@/lib/regions";
import {
  languageAlternates,
  pageMetadata,
  regionCrumbs,
  stepDescription,
  stepJsonLd,
  stepSeoTitle,
} from "@/lib/seo";
import { getLocalizedSteps } from "@/lib/steps";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales().flatMap((lang) =>
    getAvailableRegions().flatMap((region) =>
      (getLocalizedSteps(region.slug, lang) ?? []).map((step) => ({
        lang,
        region: region.slug,
        slug: step.slug,
      })),
    ),
  );
}

function load(regionSlug: string, slug: string, locale: Locale) {
  const found = getRegion(regionSlug);
  const steps = found?.available ? getLocalizedSteps(regionSlug, locale) : undefined;
  const step = steps?.find((s) => s.slug === slug);
  if (!found || !steps || !step) return undefined;
  return { region: localizeRegion(found, locale), steps, step };
}

export async function generateMetadata(
  props: PageProps<"/[lang]/[region]/steps/[slug]">,
): Promise<Metadata> {
  const { lang, region, slug } = await props.params;
  const page = load(region, slug, lang);
  if (!page) return { title: "Not found" };
  const english = `/${region}/steps/${slug}`;
  return pageMetadata({
    title: stepSeoTitle(page.step, page.region, lang),
    description: stepDescription(page.step),
    path: localePath(lang, english),
    locale: localeTag(lang, page.region.country),
    languages: languageAlternates(english, page.region),
  });
}

export default async function StepPage(
  props: PageProps<"/[lang]/[region]/steps/[slug]">,
) {
  const { lang, region: regionSlug, slug } = await props.params;
  const page = load(regionSlug, slug, lang);
  if (!page) notFound();
  const { region, steps, step } = page;
  const t = getDictionary(lang);

  // Profile sections are written for BC's steps only (and in English only).
  const section =
    regionSlug === "bc" && lang === DEFAULT_LOCALE ? getSection(step.slug) : undefined;

  const english = `/${regionSlug}/steps/${slug}`;
  const path = localePath(lang, english);
  const name = stepSeoTitle(step, region, lang);
  return (
    <>
      <JsonLd
        data={stepJsonLd({
          guide: regionSlug,
          step,
          name,
          description: stepDescription(step),
          path,
          crumbs: [...regionCrumbs(region, lang), { name: step.title, path }],
          locale: lang,
          inLanguage: localeTag(lang, region.country),
        })}
      />
      <StepArticle
        guide={regionSlug}
        locale={lang}
        basePath={localePath(lang, `/${regionSlug}`)}
        englishPath={lang === DEFAULT_LOCALE ? undefined : english}
        backLabel={t.region.allSteps(region.name)}
        guideLabel={t.region.guideLabel(region.in)}
        step={step}
        steps={steps}
        section={section}
      />
    </>
  );
}
