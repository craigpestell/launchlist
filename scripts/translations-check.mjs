// Structural checks for content/translations/<locale>/, run by
// scripts/check-content.mjs. A translation must line up with its English file:
// the same checklist length (saved ticks are keyed by item position), the same
// links, tokens, step references and sections. Whether a translation is up to
// date is `npm run translations`'s job, not this one's.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CONTENT, ROOT, loadLocales, readShots } from "./translations-lib.mjs";

const urls = (text) => new Set(text.match(/https?:\/\/[^\s)>"]+|\]\((\/[^)\s]*)\)/g) ?? []);
const steps = (text) => [...text.matchAll(/\{step:[a-z0-9-]+\}/g)].map((m) => m[0]).sort().join(" ");
const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

export function checkTranslations(report) {
  const locales = loadLocales();
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "guides", "manifest.json"), "utf8"));
  const shotFiles = new Set(manifest.map((s) => s.file));

  for (const [locale, config] of Object.entries(locales)) {
    if (config.default) continue;
    const base = path.join(CONTENT, "translations", locale);
    if (!fs.existsSync(base)) continue;
    const stepWord = config.stepWord ?? "step";

    for (const rel of fs.readdirSync(base, { recursive: true }).sort()) {
      const file = path.join(base, rel);
      const where = path.relative(ROOT, file);
      if (!/\.md$|topic\.json$/.test(rel) || rel === "glossary.md") continue;
      const english = path.join(CONTENT, rel);
      if (!fs.existsSync(english)) {
        report(where, `no English ${path.relative(ROOT, english)}; delete or move this translation`);
        continue;
      }

      if (rel.endsWith("topic.json")) {
        const t = JSON.parse(fs.readFileSync(file, "utf8"));
        if (!t.source) report(where, "not stamped; run npm run translations -- stamp");
        if (!t.title) report(where, "missing title");
        if (typeof t.summary !== "string" || !/[.!?]$/.test(t.summary))
          report(where, "summary should be a sentence ending with a full stop");
        continue;
      }

      const en = matter(fs.readFileSync(english, "utf8"));
      if (en.data.shared) {
        report(where, "region stubs aren't translated; translate the shared step instead");
        continue;
      }
      const tr = matter(fs.readFileSync(file, "utf8"));
      const { source, ...data } = tr.data;
      if (!source) report(where, "not stamped; run npm run translations -- stamp");

      const keys = Object.keys(en.data).sort().join(",");
      if (Object.keys(data).sort().join(",") !== keys)
        report(where, `front matter keys should match the English (${keys})`);
      if (data.linkUrl !== en.data.linkUrl)
        report(where, "linkUrl must stay the English URL (links.json swaps in the French page)");

      const enList = en.data.checklist ?? [];
      const list = Array.isArray(data.checklist) ? data.checklist : [];
      if (list.length !== enList.length)
        report(where, `checklist has ${list.length} items, the English has ${enList.length}; they must line up item for item`);
      list.forEach((item, n) => {
        const at = `${where} checklist ${n + 1}`;
        if (typeof item !== "string") return report(at, "must be plain text");
        if (!/^[\p{Lu}{]/u.test(item)) report(at, "start with a capital letter");
        if (/[.;:]$/.test(item)) report(at, "no trailing punctuation");
        if (item.length > 130) report(at, "too long (keep under 130 characters)");
      });
      if (typeof data.title === "string" && /[.!?]$/.test(data.title))
        report(where, "title should not end with punctuation");
      if (typeof data.summary === "string" && !/[.!?]$/.test(data.summary))
        report(where, "summary should be a sentence ending with a full stop");

      const enText = [JSON.stringify(en.data), en.content].join("\n");
      const text = [JSON.stringify(data), tr.content].join("\n");
      if (!sameSet(urls(enText), urls(text))) report(where, "links differ from the English; keep every URL as it is");
      if (steps(enText) !== steps(text)) report(where, "{step:...} tokens differ from the English");
      for (const [token] of text.matchAll(/\{[^}]*\}/g))
        if (!["{region}", "{in-region}"].includes(token) && !/^\{step:[a-z0-9-]+\}$/.test(token))
          report(where, `unknown token ${token}`);
      const enRefs = [...en.content.matchAll(/\bstep (\d+)\b/gi)].map((m) => m[1]).sort().join(",");
      const refs = [...tr.content.matchAll(new RegExp(`(?<!\\p{L})${stepWord} (\\d+)\\b`, "giu"))].map((m) => m[1]).sort().join(",");
      if (enRefs !== refs) report(where, `step references differ from the English (${enRefs || "none"} vs ${refs || "none"})`);
      const sections = (c) => (c.match(/^## /gm) ?? []).length;
      if (sections(tr.content) !== sections(en.content)) report(where, "number of ## sections differs from the English");
      if (/^# /m.test(tr.content)) report(where, "body uses an H1; start sections at ##");
      if (tr.content.includes("—")) report(where, "body uses an em dash");
    }

    const shots = readShots(locale);
    for (const [file, shot] of Object.entries(shots)) {
      const where = `content/translations/${locale}/shots.json ${file}`;
      if (!shotFiles.has(file)) report(where, "no such screenshot in guides/manifest.json");
      if (!shot.source) report(where, "not stamped");
      if (!shot.alt || shot.alt.length < 20) report(where, "alt text missing or too short");
      if (!/[.!?]$/.test(shot.caption ?? "")) report(where, "caption should end with a full stop");
    }
  }
}
