import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SignupBanner } from "@/components/SignupBanner";
import { StepList } from "@/components/StepList";
import { getCountry } from "@/lib/countries";
import { getAvailableRegions, getRegion } from "@/lib/regions";
import {
  overviewJsonLd,
  pageMetadata,
  regionCrumbs,
  regionDescription,
  regionKeywords,
  regionSeoTitle,
} from "@/lib/seo";
import { getSteps } from "@/lib/steps";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAvailableRegions().map((region) => ({ region: region.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[region]">,
): Promise<Metadata> {
  const { region } = await props.params;
  const found = getRegion(region);
  if (!found?.available) return { title: "Not found" };
  return pageMetadata({
    title: regionSeoTitle(found),
    description: regionDescription(found, getSteps(region)),
    path: `/${region}`,
    keywords: regionKeywords(found),
    locale: getCountry(found.country).locale,
  });
}

export default async function RegionPage(props: PageProps<"/[region]">) {
  const { region: slug } = await props.params;
  const region = getRegion(slug);
  if (!region?.available) notFound();

  const all = getSteps(slug);
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
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
      >
        ← Choose a different region
      </Link>
      <JsonLd
        data={overviewJsonLd({
          name: `How to start a business in ${region.name}`,
          description: regionDescription(region, all),
          path: `/${slug}`,
          basePath: `/${slug}`,
          steps: all,
          crumbs: regionCrumbs(region),
        })}
      />
      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        How to start a business in {region.name}
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        Everything you need to register and launch a small retail business or
        online store in {region.name}, in order: {all.length} steps from
        choosing a name to placing your first stock order, each with links to
        the official sites. Work through them at your own pace. Your progress
        is saved in this browser, or to your account if you sign in.
      </p>
      <div className="mt-10">
        <SignupBanner />
        <StepList region={slug} steps={steps} />
      </div>
    </>
  );
}
