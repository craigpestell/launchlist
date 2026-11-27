import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StepArticle } from "@/components/StepArticle";
import { getCountry } from "@/lib/countries";
import { getSection } from "@/lib/profile";
import { getAvailableRegions, getRegion } from "@/lib/regions";
import {
  pageMetadata,
  regionCrumbs,
  stepDescription,
  stepJsonLd,
  stepSeoTitle,
} from "@/lib/seo";
import { getStep, getSteps } from "@/lib/steps";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAvailableRegions().flatMap((region) =>
    getSteps(region.slug).map((step) => ({
      region: region.slug,
      slug: step.slug,
    })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[region]/steps/[slug]">,
): Promise<Metadata> {
  const { region, slug } = await props.params;
  const found = getRegion(region);
  const step = found?.available ? getStep(region, slug) : undefined;
  if (!found || !step) return { title: "Not found" };
  return pageMetadata({
    title: stepSeoTitle(step, found.name),
    description: stepDescription(step),
    path: `/${region}/steps/${slug}`,
    locale: getCountry(found.country).locale,
  });
}

export default async function StepPage(
  props: PageProps<"/[region]/steps/[slug]">,
) {
  const { region: regionSlug, slug } = await props.params;
  const region = getRegion(regionSlug);
  const step = region?.available ? getStep(regionSlug, slug) : undefined;
  if (!region || !step) notFound();

  // Profile sections are written for BC's steps only.
  const section = regionSlug === "bc" ? getSection(step.slug) : undefined;

  const path = `/${regionSlug}/steps/${slug}`;
  const name = stepSeoTitle(step, region.name);
  return (
    <>
      <JsonLd
        data={stepJsonLd({
          guide: regionSlug,
          step,
          name,
          description: stepDescription(step),
          path,
          crumbs: [...regionCrumbs(region), { name: step.title, path }],
        })}
      />
      <StepArticle
        guide={regionSlug}
        basePath={`/${regionSlug}`}
        backLabel={`All ${region.name} steps`}
        guideLabel={`Start a business in ${region.name}`}
        step={step}
        steps={getSteps(regionSlug)}
        section={section}
      />
    </>
  );
}
