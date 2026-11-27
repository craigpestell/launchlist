import Link from "next/link";
import { getCoverage } from "@/lib/regions";
import { getTopics, type TopicGroup } from "@/lib/topics";

/** How many guides a topic column lists before it links to the full section. */
const TOPIC_LIMIT = 3;

type FooterLink = { href: string; label: string; note?: string };
type Column = { heading: string; href: string; links: FooterLink[] };

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

function topicColumn(group: TopicGroup, heading: string, anchor: string): Column {
  const topics = getTopics().filter((t) => t.group === group);
  const links: FooterLink[] = topics
    .slice(0, TOPIC_LIMIT)
    .map((t) => ({ href: `/topics/${t.slug}`, label: t.title }));
  if (topics.length > TOPIC_LIMIT) {
    links.push({ href: `/#${anchor}`, label: `All ${plural(topics.length, "guide")}` });
  }
  return { heading, href: `/#${anchor}`, links };
}

const link =
  "rounded-sm text-neutral-600 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100";

/**
 * Site footer, built from content/ so it stays short as guides are added: one
 * link per country rather than per region, and a few guides per topic section
 * with a link to the rest.
 */
export function SiteFooter() {
  const columns: Column[] = [
    {
      heading: "Start a business",
      href: "/#start",
      links: getCoverage().map(({ country, regions }) => ({
        href: `/#start-${country.slug}`,
        label: country.name,
        note: plural(regions.filter((r) => r.available).length, "guide"),
      })),
    },
    topicColumn("business", "Run your business", "run"),
    topicColumn("help", "Quick help", "help"),
    {
      heading: "LaunchList",
      href: "/",
      links: [
        { href: "/", label: "Home" },
        { href: "/account", label: "Your account" },
        { href: "/privacy", label: "Privacy" },
      ],
    },
  ].filter((c) => c.links.length > 0);

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
        >
          {columns.map((col) => (
            <div key={col.heading}>
              <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                <Link href={col.href} className="rounded-sm hover:underline">
                  {col.heading}
                </Link>
              </h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                    {l.note && (
                      <span className="block text-xs text-neutral-600 dark:text-neutral-400">
                        {l.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="mt-8 border-t border-neutral-200 pt-6 text-xs leading-relaxed text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          General guidance, not legal or accounting advice. Rules and fees
          change, so confirm details on each official site.
        </p>
      </div>
    </footer>
  );
}
