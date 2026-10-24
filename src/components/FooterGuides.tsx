import Link from "next/link";
import { getAvailableRegions } from "@/lib/regions";
import { getTopics } from "@/lib/topics";

/** Every live checklist, read from content/ so new guides appear on their own. */
export function FooterGuides() {
  const groups = [
    {
      heading: "Guides for any store",
      wide: false,
      links: getTopics().map((t) => ({ href: `/topics/${t.slug}`, label: t.title })),
    },
    {
      heading: "Province and territory guides",
      wide: true,
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
        <div key={group.heading} className={group.wide ? "sm:col-span-2" : ""}>
          <h2 className="mb-2 font-semibold text-neutral-700 dark:text-neutral-300">
            {group.heading}
          </h2>
          <ul className={group.wide ? "columns-2 gap-6" : ""}>
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
