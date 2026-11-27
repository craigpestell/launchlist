import { getDictionary } from "@/lib/i18n/dictionary";
import { DEFAULT_LOCALE, localeTag, type Locale } from "@/lib/i18n/locales";

/**
 * Shown on every translated guide page: it was translated from English,
 * official French pages are linked where they exist, and (when the English
 * changed after the translation) that the English version is newer.
 */
export function TranslationNotice({
  locale,
  englishPath,
  stale,
}: {
  locale: Locale;
  englishPath: string;
  stale?: boolean;
}) {
  if (locale === DEFAULT_LOCALE) return null;
  const t = getDictionary(locale).translation;
  return (
    <aside
      className={`mt-6 rounded-xl border p-4 text-sm ${
        stale
          ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
          : "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
      }`}
    >
      <p>
        {stale ? t.stale : t.notice}{" "}
        <a href={englishPath} hrefLang={localeTag(DEFAULT_LOCALE)} className="font-medium underline">
          {t.english}
        </a>
      </p>
    </aside>
  );
}
