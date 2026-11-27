import type { Country } from "@/lib/countries";
import { MAPS } from "@/lib/maps";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localePath, type Locale } from "@/lib/i18n/locales";
import type { LocalizedRegion } from "@/lib/regions";

type Region = LocalizedRegion;

/** Map of one country; regions with a guide are shaded and link to it. */
export function CoverageMap({
  country,
  names,
  regions,
  locale,
}: {
  country: Country;
  /** The country's names in this language (countryNames()). */
  names: { in: string; unit: string };
  regions: Region[];
  locale: Locale;
}) {
  const t = getDictionary(locale).map;
  const map = MAPS[country.code];
  const shape = (r: Region) => map.shapes[r.slug.toUpperCase()];
  const shaped = regions.filter(shape);
  const available = shaped.filter((r) => r.available);

  return (
    <figure className="mt-8">
      <svg
        viewBox={`0 0 ${map.width} ${map.height}`}
        className="h-auto w-full"
        role="group"
        aria-label={t.label(names.in, names.unit)}
      >
        {shaped
          .filter((r) => !r.available)
          .map((r) => (
            <path
              key={r.slug}
              d={shape(r).d}
              className="fill-neutral-200 stroke-white dark:fill-neutral-800 dark:stroke-neutral-950"
              strokeWidth={0.8}
            >
              <title>{t.comingSoon(r.name)}</title>
            </path>
          ))}
        {available.map((r) => (
          <a key={r.slug} href={localePath(locale, `/${r.slug}`)} aria-label={r.name} className="group outline-none">
            <path
              d={shape(r).d}
              className="fill-emerald-600 stroke-white transition-colors group-hover:fill-emerald-700 group-focus-visible:fill-emerald-800 dark:stroke-neutral-950"
              strokeWidth={0.8}
            >
              <title>{r.name}</title>
            </path>
          </a>
        ))}
        {available.map((r) => (
          <text
            key={r.slug}
            x={shape(r).x}
            y={shape(r).y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={map.label}
            className="pointer-events-none fill-white font-semibold"
          >
            {r.slug.toUpperCase()}
          </text>
        ))}
      </svg>
      <figcaption className="mt-2 flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-emerald-600" />
          {t.available}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-neutral-200 dark:bg-neutral-800" />
          {t.soon}
        </span>
      </figcaption>
    </figure>
  );
}
