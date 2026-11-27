// Translation bookkeeping. Every translated file records the version of the
// English file it was made from (`source:`, a short hash of that file), so a
// change to the English guide shows up here as "stale".
//
//   npm run translations                  status of every locale
//   npm run translations -- status fr     one locale; --strict exits 1 on missing or stale
//   npm run translations -- todo fr       just the English files to (re)translate
//   npm run translations -- stamp fr <translation file>...   record the current
//       English version in each file (run right after translating it); --all
//       stamps every translation, shots.json included
//
// Which guides a locale covers is data: content/locales.json lists the
// countries (and whether topic guides) each language is offered for.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CONTENT,
  ROOT,
  frenchTypography,
  hashFile,
  hashShot,
  loadLocales,
  readShots,
  scope,
  setSource,
  sourceOf,
  translationPath,
} from "./translations-lib.mjs";

const [command = "status", ...rest] = process.argv.slice(2);
const flags = new Set(rest.filter((a) => a.startsWith("--")));
const args = rest.filter((a) => !a.startsWith("--"));
const locales = loadLocales();
const targets = Object.keys(locales).filter((l) => !locales[l].default);

function status(locale) {
  const rows = [];
  for (const file of scope(locale)) {
    const target = translationPath(locale, file);
    const state = !fs.existsSync(target)
      ? "missing"
      : sourceOf(target) === hashFile(file)
        ? "ok"
        : "stale";
    rows.push({ state, file: path.relative(ROOT, file), target: path.relative(ROOT, target) });
  }
  const shots = readShots(locale);
  for (const shot of scope(locale, { shots: true })) {
    const t = shots[shot.file];
    rows.push({
      state: !t ? "missing" : t.source === hashShot(shot) ? "ok" : "stale",
      file: `guides/manifest.json ${shot.file}`,
      target: `content/translations/${locale}/shots.json`,
    });
  }
  return rows;
}

if (command === "status" || command === "todo") {
  let bad = 0;
  for (const locale of args.length ? args : targets) {
    if (!locales[locale]) throw new Error(`unknown locale ${locale}`);
    const rows = status(locale);
    const count = (s) => rows.filter((r) => r.state === s).length;
    if (command === "todo") {
      for (const r of rows) if (r.state !== "ok") console.log(`${r.state}\t${r.file}`);
      continue;
    }
    console.log(
      `${locale}: ${count("ok")} up to date, ${count("stale")} stale, ${count("missing")} missing`,
    );
    for (const r of rows.filter((r) => r.state === "stale"))
      console.log(`  stale  ${r.file} (English changed since ${r.target} was translated)`);
    if (flags.has("--verbose"))
      for (const r of rows.filter((r) => r.state === "missing")) console.log(`  missing  ${r.file}`);
    bad += count("stale") + count("missing");
  }
  if (flags.has("--strict") && bad) process.exit(1);
} else if (command === "stamp") {
  const [locale, ...files] = args;
  if (!locales[locale]) throw new Error(`usage: stamp <locale> <file>... | --all`);
  const base = path.join(CONTENT, "translations", locale);
  const all = flags.has("--all")
    ? fs
        .readdirSync(base, { recursive: true })
        .map((f) => path.join(base, f))
        .filter((f) => /\.md$|topic\.json$/.test(f))
    : files.map((f) => path.resolve(f));
  for (const target of all) {
    const english = path.join(CONTENT, path.relative(base, target));
    if (!fs.existsSync(english)) {
      console.log(`skip ${path.relative(ROOT, target)}: no English ${path.relative(ROOT, english)}`);
      continue;
    }
    if (target.endsWith(".md") && locale === "fr")
      fs.writeFileSync(target, frenchTypography(fs.readFileSync(target, "utf8")));
    setSource(target, hashFile(english));
    console.log(`stamped ${path.relative(ROOT, target)}`);
  }
  if (flags.has("--all") || files.some((f) => f.endsWith("shots.json"))) {
    const shotsFile = path.join(base, "shots.json");
    if (fs.existsSync(shotsFile)) {
      const shots = readShots(locale);
      const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "guides", "manifest.json"), "utf8"));
      for (const shot of manifest)
        if (shots[shot.file]) {
          if (locale === "fr") {
            shots[shot.file].alt = frenchTypography(shots[shot.file].alt);
            shots[shot.file].caption = frenchTypography(shots[shot.file].caption);
          }
          shots[shot.file].source = hashShot(shot);
        }
      fs.writeFileSync(shotsFile, `${JSON.stringify(shots, null, 2)}\n`);
      console.log(`stamped ${path.relative(ROOT, shotsFile)}`);
    }
  }
} else {
  console.log(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("\nimport")[0]);
  process.exit(1);
}
