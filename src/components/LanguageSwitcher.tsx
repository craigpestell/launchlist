"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n/dictionary";
import {
  DEFAULT_LOCALE,
  localePath,
  localeTag,
  locales,
  splitLocale,
  type Locale,
} from "@/lib/i18n/locales";

/**
 * Links to this page in the other languages. A guide's page links only to the
 * languages it is translated into (`available`: guide slugs per language), so
 * a US state page shows no French link; the home page always does.
 */
export function LanguageSwitcher({
  available,
}: {
  available: Record<Locale, string[]>;
}) {
  const current = useLocale();
  const [, rest] = splitLocale(usePathname() ?? "/");
  const parts = rest.split("/").filter(Boolean);
  const guide = parts[0] === "topics" ? parts[1] : parts[0];
  const targets = locales().filter(
    (l) =>
      l !== current &&
      (rest === "/" || l === DEFAULT_LOCALE || (guide && available[l]?.includes(guide))),
  );
  if (!targets.length) return null;
  return (
    <nav aria-label={getDictionary(current).header.language}>
      <ul className="flex gap-2 text-sm">
        {targets.map((l) => (
          <li key={l}>
            {/* A plain link: each language has its own root layout and <html lang>. */}
            <a
              href={localePath(l, rest)}
              hrefLang={localeTag(l)}
              lang={localeTag(l)}
              className="font-medium text-neutral-600 hover:underline dark:text-neutral-400"
            >
              {getDictionary(l).languageName}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
