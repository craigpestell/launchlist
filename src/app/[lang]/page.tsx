import type { Metadata } from "next";
import Link from "next/link";
import { CoverageMap } from "@/components/CoverageMap";
import { getDictionary } from "@/lib/i18n/dictionary";
import { coveragePhrase } from "@/lib/i18n/content";
import { localePath, type Locale } from "@/lib/i18n/locales";
import { getLocalizedCoverage } from "@/lib/regions";
import { languageAlternates } from "@/lib/seo";
import { getLocalizedTopics, type Topic } from "@/lib/topics";

export async function generateMetadata(props: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    alternates: { canonical: localePath(lang, "/"), languages: languageAlternates("/") },
  };
}

const card =
  "block h-full rounded-xl border border-neutral-200 p-4 transition hover:border-emerald-600 dark:border-neutral-800";
const muted = "text-neutral-600 dark:text-neutral-400";

function TopicCards({ topics, locale }: { topics: Topic[]; locale: Locale }) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {topics.map((topic) => (
        <li key={topic.slug}>
          <Link href={localePath(locale, `/topics/${topic.slug}`)} className={card}>
            <span className="block font-medium">{topic.title}</span>
            <span className={`mt-1 block text-sm ${muted}`}>{topic.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function Home(props: PageProps<"/[lang]">) {
  const { lang: locale } = await props.params;
  const t = getDictionary(locale);
  // One block per country that has a guide in this language; a country shows
  // up here, with its map and its coming-soon list, once its first region is
  // published (and, in another language, translated).
  const coverage = getLocalizedCoverage(locale).map((c) => ({
    ...c,
    available: c.regions
      .filter((r) => r.available)
      .sort((a, b) => a.name.localeCompare(b.name, locale)),
  }));
  const guideCount = coverage.reduce((n, c) => n + c.available.length, 0);
  const unitWords = [...new Set(coverage.flatMap((c) => c.names.unit.split(` ${t.site.and} `)))];
  const units =
    unitWords.length <= 1
      ? (unitWords[0] ?? "")
      : `${unitWords.slice(0, -1).join(", ")} ${t.site.and} ${unitWords.at(-1)}`;
  const topics = getLocalizedTopics(locale);
  const business = topics.filter((topic) => topic.group === "business");
  const help = topics.filter((topic) => topic.group === "help");
  const where = coveragePhrase(
    coverage.map((c) => c.country),
    locale,
    t.site.and,
  );

  const sections = [
    { id: "start", title: t.home.start, blurb: t.home.startBlurb(guideCount, units), show: guideCount > 0 },
    { id: "run", title: t.home.run, blurb: t.home.runBlurb, show: business.length > 0 },
    { id: "help", title: t.home.help, blurb: t.home.helpBlurb, show: help.length > 0 },
  ].filter((s) => s.show);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">{t.home.h1}</h1>
      <p className={`mt-3 ${muted}`}>{t.home.intro(where)}</p>

      <nav aria-label={t.home.sectionsLabel} className="mt-8">
        <ul className="grid gap-3 sm:grid-cols-3">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={card}>
                <span className="block font-medium">{s.title}</span>
                <span className={`mt-1 block text-sm ${muted}`}>{s.blurb}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div id="start" className="scroll-mt-6">
        {coverage.map(({ country, names, regions, available }) => (
          <section
            key={country.code}
            id={`start-${country.slug}`}
            className="mt-14 scroll-mt-6"
            aria-labelledby={`start-${country.slug}-heading`}
          >
            <h2 id={`start-${country.slug}-heading`} className="text-xl font-semibold">
              {t.home.startIn(names.in)}
            </h2>
            <p className={`mt-1 text-sm ${muted}`}>{t.home.startIntro(names.unit)}</p>
            <CoverageMap country={country} names={names} regions={regions} locale={locale} />
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {available.map((region) => (
                <li key={region.slug}>
                  <Link
                    href={localePath(locale, `/${region.slug}`)}
                    className="block h-full rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium transition hover:border-emerald-600 dark:border-neutral-800"
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {business.length > 0 && (
        <section id="run" className="mt-14 scroll-mt-6" aria-labelledby="run-heading">
          <h2 id="run-heading" className="text-xl font-semibold">
            {t.home.run}
          </h2>
          <p className={`mt-1 text-sm ${muted}`}>{t.home.runIntro}</p>
          <TopicCards topics={business} locale={locale} />
        </section>
      )}

      {help.length > 0 && (
        <section id="help" className="mt-14 scroll-mt-6" aria-labelledby="help-heading">
          <h2 id="help-heading" className="text-xl font-semibold">
            {t.home.help}
          </h2>
          <p className={`mt-1 text-sm ${muted}`}>{t.home.helpIntro}</p>
          <TopicCards topics={help} locale={locale} />
        </section>
      )}

      <section className="mt-14" aria-labelledby="soon-heading">
        <h2 id="soon-heading" className="text-xl font-semibold">
          {t.home.soon}
        </h2>
        <p className={`mt-1 text-sm ${muted}`}>{t.home.soonIntro}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {t.home.upcoming.map((topic) => (
            <li
              key={topic.title}
              className="rounded-xl border border-dashed border-neutral-300 p-4 dark:border-neutral-700"
            >
              <span className="block font-medium">{topic.title}</span>
              <span className={`mt-1 block text-sm ${muted}`}>{topic.summary}</span>
            </li>
          ))}
        </ul>
        {coverage.map(({ country, names, regions }) => {
          const soon = regions.filter((r) => !r.available);
          if (!soon.length) return null;
          return (
            <div key={country.code} className="mt-5">
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {t.home.soonIn(names.name, names.unit)}
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {soon.map((region) => (
                  <li
                    key={region.slug}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                  >
                    {region.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </>
  );
}
