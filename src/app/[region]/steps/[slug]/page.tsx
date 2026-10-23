import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StepArticle } from "@/components/StepArticle";
import { getSection } from "@/lib/profile";
import { getAvailableRegions, getRegion } from "@/lib/regions";
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
  const step = getStep(region, slug);
  return { title: step ? `${step.title} · Start Your Store` : "Not found" };
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

  return (
    <StepArticle
      guide={regionSlug}
      basePath={`/${regionSlug}`}
      backLabel={`All ${region.name} steps`}
      step={step}
      steps={getSteps(regionSlug)}
      section={section}
    />
  );
}
