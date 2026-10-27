import Link from "next/link";
import { CoverageMap } from "@/components/CoverageMap";
import { getRegions, type Region } from "@/lib/regions";
import { getTopics } from "@/lib/topics";

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

export default function Home() {
  // Canada only for now; a US version may launch separately later.
  const regions = getRegions().filter((r) => r.country === "CA");
  const available = regions.filter((r) => r.available);
  const topics = getTopics();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Get your online store up and running
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        Step-by-step checklists for launching and running an online store, with
        a guide at each step for when you need help. Tick tasks off as you go.
      </p>

      {topics.length > 0 && (
        <section className="mt-10" aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-lg font-semibold">
            Guides for any store
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Tasks that work the same wherever your business is based.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/topics/${topic.slug}`}
                  className="block rounded-xl border border-neutral-200 p-4 transition hover:border-emerald-600 dark:border-neutral-800"
                >
                  <span className="block font-medium">{topic.title}</span>
                  <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
                    {topic.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12" aria-labelledby="available-heading">
        <h2 id="available-heading" className="text-lg font-semibold">
          Register your business
        </h2>
        <p className="mt-1 mb-3 text-sm text-neutral-600 dark:text-neutral-400">
          Rules differ by province and territory, so choose where your business
          will be based.
        </p>
        <CoverageMap regions={regions} />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {available.map((region) => (
            <li key={region.slug}>
              <Link
                href={`/${region.slug}`}
                className="block rounded-xl border border-neutral-200 p-4 transition hover:border-emerald-600 dark:border-neutral-800"
              >
                <span className="block font-medium">{region.name}</span>
                <span className="block text-sm text-neutral-500">
                  {region.country === "CA" ? "Canada" : "United States"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>


      <section className="mt-12" aria-labelledby="soon-heading">
        <h2 id="soon-heading" className="text-lg font-semibold">
          Coming soon
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          We research each guide from official government sources and add it
          when it is ready.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {UPCOMING_TOPICS.map((topic) => (
            <li
              key={topic.title}
              className="rounded-xl border border-dashed border-neutral-300 p-4 dark:border-neutral-700"
            >
              <span className="block font-medium">{topic.title}</span>
              <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
                {topic.summary}
              </span>
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
              <h3 className="text-sm font-medium text-neutral-500">
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
