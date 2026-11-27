import { en, type Dictionary } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import { DEFAULT_LOCALE, type Locale } from "./locales";

/**
 * Interface text per language. A new language adds a file in dictionaries/
 * (TypeScript makes it match en.ts) and an entry here and in
 * content/locales.json. Client-safe.
 */
const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

export const getDictionary = (locale: Locale): Dictionary =>
  DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];

export type { Dictionary };
