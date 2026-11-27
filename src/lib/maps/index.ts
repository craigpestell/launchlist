import type { CountryCode } from "@/lib/countries";
import { map as ca } from "./ca";
import { map as us } from "./us";

export type CountryMap = {
  width: number;
  height: number;
  /** Font size of the region code drawn on a shaded region, in map units. */
  label: number;
  /** Outline and label position per region code ("BC", "TX"). */
  shapes: Record<string, { d: string; x: number; y: number }>;
};

export const MAPS: Record<CountryCode, CountryMap> = { CA: ca, US: us };
