import Link from "next/link";
import { CoverageMap } from "@/components/CoverageMap";
import { getRegions, type Region } from "@/lib/regions";
import { getTopics, type Topic } from "@/lib/topics";

const COUNTRIES: { code: Region["country"]; label: string; unit: string }[] = [
  { code: "CA", label: "Canada", unit: "provinces and territories" },
];

const UPCOMING_TOPICS: { title: string; summary: string }[] = [
  {
    title: "Hiring your first employee",
    summary:
      "Payroll account with CRA, workers' compensation, employment standards and records of employment.",
  },
  {
    title: "Selling to other provinces",
    summary:
      "When to collect GST/HST, PST or QST for customers outside your home province.",
  },
  {
    title: "Running a home-based business",
    summary: "Municipal home business licences, zoning and insurance.",
  },
  {
    title: "Selling food, liquor or cannabis",
    summary: "Food safety permits and the extra licences regulated products need.",
  },
];

const card =
  "block h-full rounded-xl border border-neutral-200 p-4 transition hover:border-emerald-600 dark:border-neutral-800";
const muted = "text-neutral-600 dark:text-neutral-400";

function TopicCards({ topics }: { topics: Topic[] }) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {topics.map((topic) => (
        <li key={topic.slug}>
          <Link href={`/topics/${topic.slug}`} className={card}>
            <span className="block font-medium">{topic.title}</span>
            <span className={`mt-1 block text-sm ${muted}`}>{topic.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  // Canada only for now; a US version may launch separately later.
  const regions = getRegions().filter((r) => r.country === "CA");
  const available = regions
    .filter((r) => r.available)
    .sort((a, b) => a.name.localeCompare(b.name));
  const topics = getTopics();
  const business = topics.filter((t) => t.group === "business");
  const help = topics.filter((t) => t.group === "help");

  const sections = [
    {
      id: "start",
      title: "Start a business",
      blurb: `Checklists for all ${available.length} provinces and territories`,
      show: available.length > 0,
    },
    {
      id: "run",
      title: "Run your business",
      blurb: "Phone number, payments and products",
      show: business.length > 0,
    },
    {
      id: "help",
      title: "Quick help",
      blurb: "Everyday tech and support tasks",
      show: help.length > 0,
    },
  ].filter((s) => s.show);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Step-by-step guides, one task at a time
      </h1>
      <p className={`mt-3 ${muted}`}>
        Checklists for starting and running a business in Canada, plus quick
        how-tos for the tech tasks a website or support team might ask of you.
        Each step has a guide with screenshots, and you can tick tasks off as
        you go.
      </p>

      <nav aria-label="Guide sections" className="mt-8">
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

      {available.length > 0 && (
        <section id="start" className="mt-14 scroll-mt-6" aria-labelledby="start-heading">
          <h2 id="start-heading" className="text-xl font-semibold">
            Start a business in Canada
          </h2>
          <p className={`mt-1 text-sm ${muted}`}>
            Register your business, sign up for tax accounts and get the
            licences you need. Rules differ by province and territory, so
            choose where your business will be based.
          </p>
          <CoverageMap regions={regions} />
          <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {available.map((region) => (
              <li key={region.slug}>
                <Link
                  href={`/${region.slug}`}
                  className="block h-full rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium transition hover:border-emerald-600 dark:border-neutral-800"
                >
                  {region.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {business.length > 0 && (
        <section id="run" className="mt-14 scroll-mt-6" aria-labelledby="run-heading">
          <h2 id="run-heading" className="text-xl font-semibold">
            Run your business
          </h2>
          <p className={`mt-1 text-sm ${muted}`}>
            Set up the tools your business needs, wherever it is based.
          </p>
          <TopicCards topics={business} />
        </section>
      )}

      {help.length > 0 && (
        <section id="help" className="mt-14 scroll-mt-6" aria-labelledby="help-heading">
          <h2 id="help-heading" className="text-xl font-semibold">
            Quick help
          </h2>
          <p className={`mt-1 text-sm ${muted}`}>
            Short how-tos for when a website or support team asks you to do
            something on your computer or phone.
          </p>
          <TopicCards topics={help} />
        </section>
      )}

      <section className="mt-14" aria-labelledby="soon-heading">
        <h2 id="soon-heading" className="text-xl font-semibold">
          Coming soon
        </h2>
        <p className={`mt-1 text-sm ${muted}`}>
          We research each business guide from official government sources and
          add it when it is ready.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {UPCOMING_TOPICS.map((topic) => (
            <li
              key={topic.title}
              className="rounded-xl border border-dashed border-neutral-300 p-4 dark:border-neutral-700"
            >
              <span className="block font-medium">{topic.title}</span>
              <span className={`mt-1 block text-sm ${muted}`}>{topic.summary}</span>
            </li>
          ))}
        </ul>
        {COUNTRIES.map((country) => {
          const soon = regions.filter(
            (r) => r.country === country.code && !r.available,
          );
          if (!soon.length) return null;
          return (
            <div key={country.code} className="mt-5">
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {country.label}: {country.unit}
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
