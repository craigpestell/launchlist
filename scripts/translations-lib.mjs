// Shared by scripts/translations.mjs and scripts/check-content.mjs. The app
// reads translations in src/lib/i18n/content.ts with the same rules.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export const ROOT = process.cwd();
export const CONTENT = path.join(ROOT, "content");

export const loadLocales = () =>
  JSON.parse(fs.readFileSync(path.join(CONTENT, "locales.json"), "utf8"));

/** Short hash of a file's exact bytes: the version a translation was made from. */
export const hashFile = (file) =>
  crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").slice(0, 12);

/** A screenshot's version is its English alt text and caption. */
export const hashShot = (shot) =>
  crypto.createHash("sha256").update(`${shot.alt}\n${shot.caption}`).digest("hex").slice(0, 12);

/** content/bc/01-x.md -> content/translations/<locale>/bc/01-x.md */
export const translationPath = (locale, englishFile) =>
  path.join(CONTENT, "translations", locale, path.relative(CONTENT, englishFile));

const isStub = (file) =>
  /^---\s*\nshared:\s*\S+\s*\n---$/.test(fs.readFileSync(file, "utf8").trim());

const mdFiles = (dir) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".md"))
        .sort()
        .map((f) => path.join(dir, f))
    : [];

/**
 * The English files a locale covers: every published region of the countries
 * it lists, those countries' shared steps, and (when `topics` is set) every
 * topic guide with its topic.json. Region stubs (`shared: <slug>`) need no
 * translation. With { shots: true }, the manifest entries for the same guides.
 */
export function scope(locale, { shots = false } = {}) {
  const config = loadLocales()[locale];
  const countries = Object.keys(config.countries ?? {});
  const queue = JSON.parse(fs.readFileSync(path.join(ROOT, "research", "queue.json"), "utf8"));
  const regions = queue
    .filter((q) => countries.includes(q.country))
    .map((q) => q.code.toLowerCase())
    .filter((code) => fs.existsSync(path.join(CONTENT, code)));
  const topicsDir = path.join(CONTENT, "topics");
  const topics = config.topics
    ? fs.readdirSync(topicsDir).filter((t) => fs.existsSync(path.join(topicsDir, t, "topic.json")))
    : [];
  if (shots) {
    const keys = new Set([...regions, ...countries.map((c) => `shared-${c.toLowerCase()}`), ...topics]);
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "guides", "manifest.json"), "utf8"));
    return manifest.filter((s) => keys.has(s.region));
  }
  return [
    ...regions.flatMap((code) => mdFiles(path.join(CONTENT, code)).filter((f) => !isStub(f))),
    ...countries.flatMap((c) => mdFiles(path.join(CONTENT, "shared", c.toLowerCase()))),
    ...topics.flatMap((t) => [
      path.join(topicsDir, t, "topic.json"),
      ...mdFiles(path.join(topicsDir, t)),
    ]),
  ];
}

export function readShots(locale) {
  const file = path.join(CONTENT, "translations", locale, "shots.json");
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
}

/** The `source` a translation records, from front matter or topic.json. */
export function sourceOf(file) {
  const text = fs.readFileSync(file, "utf8");
  if (file.endsWith(".json")) return JSON.parse(text).source;
  return text.match(/^---\s*\n[\s\S]*?^source:\s*"?([0-9a-f]+)"?\s*$/m)?.[1];
}

export function setSource(file, hash) {
  const text = fs.readFileSync(file, "utf8");
  if (file.endsWith(".json")) {
    const data = JSON.parse(text);
    fs.writeFileSync(file, `${JSON.stringify({ source: hash, ...data, source: hash }, null, 2)}\n`);
    return;
  }
  const next = /^source:/m.test(text.split(/^---\s*$/m)[1] ?? "")
    ? text.replace(/^source:.*$/m, `source: ${hash}`)
    : text.replace(/^---\s*\n/, `---\nsource: ${hash}\n`);
  fs.writeFileSync(file, next);
}


/**
 * Canadian French spacing (Bureau de la traduction): a non-breaking space
 * before ":" and inside « », before "%" and "$", and as the thousands
 * separator. No space before ; ? ! in Canadian usage. Code spans, link targets
 * and front matter keys are left alone.
 */
export function frenchTypography(text) {
  const keep = [];
  const hold = (m) => `\u0000${keep.push(m) - 1}\u0000`;
  let out = text
    .replace(/`[^`\n]*`/g, hold)
    .replace(/\]\([^)\s]*\)/g, hold)
    .replace(/https?:\/\/\S+/g, hold)
    .replace(/^[A-Za-z]+:(?=\s)/gm, hold);
  out = out
    .replace(/(\S) +([:%»])/g, "$1 $2")
    .replace(/([^\s *])(\**)([:»])(?=[\s*]|$)/gm, "$1$2 $3")
    .replace(/« */g, "« ")
    .replace(/(\d) *\$/g, "$1 $")
    .replace(/(\d)%/g, "$1 %")
    .replace(/(\d) (?=\d{3}\b)/g, "$1 ");
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[Number(i)]);
}
