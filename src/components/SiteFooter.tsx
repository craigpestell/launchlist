import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionary";
import { DEFAULT_LOCALE, localePath, type Locale } from "@/lib/i18n/locales";
import { getLocalizedCoverage } from "@/lib/regions";
import { getLocalizedTopics, type TopicGroup } from "@/lib/topics";

/** How many guides a topic column lists before it links to the full section. */
const TOPIC_LIMIT = 3;

type FooterLink = { href: string; label: string; note?: string };
type Column = { heading: string; href: string; links: FooterLink[] };

function topicColumn(
  locale: Locale,
  group: TopicGroup,
  heading: string,
  anchor: string,
): Column {
  const home = localePath(locale, "/");
  const topics = getLocalizedTopics(locale).filter((t) => t.group === group);
  const links: FooterLink[] = topics
    .slice(0, TOPIC_LIMIT)
    .map((t) => ({ href: localePath(locale, `/topics/${t.slug}`), label: t.title }));
  if (topics.length > TOPIC_LIMIT) {
    links.push({
      href: `${home}#${anchor}`,
      label: getDictionary(locale).footer.allGuides(topics.length),
    });
  }
  return { heading, href: `${home}#${anchor}`, links };
}

const link =
  "rounded-sm text-neutral-600 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100";

/**
 * Site footer, built from content/ so it stays short as guides are added: one
 * link per country rather than per region, and a few guides per topic section
 * with a link to the rest.
 */
export function SiteFooter({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const home = localePath(locale, "/");
  const columns: Column[] = [
    {
      heading: t.home.start,
      href: `${home}#start`,
      links: getLocalizedCoverage(locale).map(({ country, names, regions }) => ({
        href: `${home}#start-${country.slug}`,
        label: names.name,
        note: t.footer.guides(regions.filter((r) => r.available).length),
      })),
    },
    topicColumn(locale, "business", t.home.run, "run"),
    topicColumn(locale, "help", t.home.help, "help"),
    {
      heading: t.footer.site,
      href: home,
      links: [
        { href: home, label: t.footer.home },
        { href: "/account", label: t.footer.account },
        { href: "/privacy", label: t.footer.privacy },
      ],
    },
  ].filter((c) => c.links.length > 0);

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <nav
          aria-label={t.footer.label}
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
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
