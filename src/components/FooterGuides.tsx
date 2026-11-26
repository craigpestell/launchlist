import Link from "next/link";
import { getAvailableRegions } from "@/lib/regions";
import { getTopics, type TopicGroup } from "@/lib/topics";

const topicLinks = (group: TopicGroup) =>
  getTopics()
    .filter((t) => t.group === group)
    .map((t) => ({ href: `/topics/${t.slug}`, label: t.title }));

/** Every live checklist, read from content/ so new guides appear on their own. */
export function FooterGuides() {
  const groups = [
    {
      heading: "Run your business",
      links: topicLinks("business"),
    },
    {
      heading: "Quick help",
      links: topicLinks("help"),
    },
    {
      heading: "Start a business in",
      links: getAvailableRegions()
        .map((r) => ({ href: `/${r.slug}`, label: r.name }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  ].filter((g) => g.links.length > 0);

  return (
    <nav
      aria-label="All guides"
      className="mx-auto grid max-w-2xl gap-6 px-4 pb-6 text-left text-sm sm:grid-cols-3"
    >
      {groups.map((group) => (
        <div key={group.heading}>
          <h2 className="mb-2 font-semibold text-neutral-700 dark:text-neutral-300">
            {group.heading}
          </h2>
          <ul>
            {group.links.map((link) => (
              <li key={link.href} className="mb-1 break-inside-avoid">
                <Link
                  href={link.href}
                  className="hover:text-neutral-800 hover:underline dark:hover:text-neutral-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
