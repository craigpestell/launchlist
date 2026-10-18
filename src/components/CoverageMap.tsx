import { MAP_HEIGHT, MAP_SHAPES, MAP_WIDTH } from "@/lib/map-shapes";
import type { Region } from "@/lib/regions";

/** Map of Canada; provinces and territories with a guide are shaded and link to it. */
export function CoverageMap({ regions }: { regions: Region[] }) {
  const shape = (r: Region) => MAP_SHAPES[`${r.country}-${r.slug.toUpperCase()}`];
  const shaped = regions.filter(shape);
  const available = shaped.filter((r) => r.available);

  return (
    <figure className="mt-8">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="h-auto w-full"
        role="group"
        aria-label="Map of Canada showing which provinces and territories have a guide"
      >
        {shaped
          .filter((r) => !r.available)
          .map((r) => (
            <path
              key={r.country + r.slug}
              d={shape(r).d}
              className="fill-neutral-200 stroke-white dark:fill-neutral-800 dark:stroke-neutral-950"
              strokeWidth={0.8}
            >
              <title>{`${r.name}: coming soon`}</title>
            </path>
          ))}
        {available.map((r) => (
          <a key={r.country + r.slug} href={`/${r.slug}`} aria-label={r.name} className="group outline-none">
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
            key={r.country + r.slug}
            x={shape(r).x}
            y={shape(r).y}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none fill-white text-[18px] font-semibold"
          >
            {r.slug.toUpperCase()}
          </text>
        ))}
      </svg>
      <figcaption className="mt-2 flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-emerald-600" />
          Guide available (select to open)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-neutral-200 dark:bg-neutral-800" />
          Coming soon
        </span>
      </figcaption>
    </figure>
  );
}
