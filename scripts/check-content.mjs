// Checks every region's and topic's guide content and screenshot manifest for the house
// rules in .claude/agents/guide-editor.md. Prints each problem and exits 1 if
// any are found. Usage: npm run content:check [-- <code> ...]
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const queue = JSON.parse(
  fs.readFileSync(path.join(ROOT, "research", "queue.json"), "utf8"),
);
const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "guides", "manifest.json"), "utf8"),
);

const only = process.argv.slice(2).map((c) => c.toLowerCase());
const subdirs = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((d) => fs.statSync(path.join(dir, d)).isDirectory())
    : [];
// Topics (content/topics/<slug>/) aren't tied to a region; their slug takes the
// region's place in progress ids and the screenshot manifest.
const TOPICS = path.join(CONTENT, "topics");
const topics = new Set(subdirs(TOPICS));
const regions = [...subdirs(CONTENT).filter((d) => d !== "topics"), ...topics]
  .filter((d) => only.length === 0 || only.includes(d));
const dirOf = (code) => (topics.has(code) ? path.join(TOPICS, code) : path.join(CONTENT, code));
const relDir = (code) => path.relative(ROOT, dirOf(code));

const problems = [];
const report = (where, msg) => problems.push(`${where}: ${msg}`);

const REQUIRED = ["title", "summary", "time", "cost", "checklist"];

// Steps copied word for word from a template region (see guide-editor.md).
// Text left over from that region shows up as another region's name or the
// wrong sales tax.
const COPIED = new Set([
  "business-number",
  "insurance",
  "bank-account",
  "bookkeeping-taxes",
  "payment-processor",
  "legal-pages-privacy",
  "product-compliance",
  "supplier-account",
]);
const PROVINCIAL_TAXES = ["PST", "RST", "QST"];
const regionNames = (code) =>
  queue
    .filter((q) => q.country === "CA" && q.code.toLowerCase() !== code)
    .flatMap((q) => (q.code === "BC" ? [q.name, "BC"] : [q.name]));
const ALLOWED = new Set([...REQUIRED, "linkLabel", "linkUrl"]);

for (const region of regions) {
  const isTopic = topics.has(region);
  if (isTopic) {
    const meta = path.join(dirOf(region), "topic.json");
    if (!fs.existsSync(meta)) report(relDir(region), "missing topic.json");
    else {
      const { title, summary } = JSON.parse(fs.readFileSync(meta, "utf8"));
      if (!title) report(`${relDir(region)}/topic.json`, "missing title");
      if (typeof summary !== "string" || !/[.!?]$/.test(summary))
        report(`${relDir(region)}/topic.json`, "summary should be a sentence ending with a full stop");
    }
  } else {
    const entry = queue.find((q) => q.code.toLowerCase() === region);
    if (!entry) report(`content/${region}`, "no matching entry in research/queue.json");
    else if (entry.status !== "done")
      report(`content/${region}`, `queue status is "${entry.status}", expected "done"`);
  }

  const files = fs
    .readdirSync(dirOf(region))
    .filter((f) => f.endsWith(".md"))
    .sort();
  const slugs = new Set();

  const titles = files.map(
    (f) => matter(fs.readFileSync(path.join(dirOf(region), f), "utf8")).data.title ?? "",
  );
  const hasHst = files.some((f) => /-hst\.md$/.test(f));
  const ownTax = titles.map((t) => PROVINCIAL_TAXES.find((x) => new RegExp(`\\b${x}\\b`).test(t))).find(Boolean);
  const wrongTaxes = [
    ...(hasHst ? ["GST(?!/HST)"] : ["(?<!GST/)HST"]),
    ...PROVINCIAL_TAXES.filter((x) => x !== ownTax),
  ];
  const otherRegions = regionNames(region);

  files.forEach((file, i) => {
    const where = `${relDir(region)}/${file}`;
    const m = file.match(/^(\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/);
    if (!m) {
      report(where, "filename must be NN-kebab-slug.md");
      return;
    }
    if (Number(m[1]) !== i + 1)
      report(where, `numbered ${m[1]}, expected ${String(i + 1).padStart(2, "0")} (no gaps)`);
    slugs.add(m[2]);

    const { data, content } = matter(fs.readFileSync(path.join(dirOf(region), file), "utf8"));

    for (const key of REQUIRED) if (data[key] === undefined) report(where, `missing ${key}`);
    for (const key of Object.keys(data))
      if (!ALLOWED.has(key)) report(where, `unknown frontmatter key ${key}`);
    if (Boolean(data.linkLabel) !== Boolean(data.linkUrl))
      report(where, "linkLabel and linkUrl go together");
    if (data.linkUrl && !/^https:\/\//.test(data.linkUrl))
      report(where, "linkUrl must be https");

    if (typeof data.title === "string" && /[.!?]$/.test(data.title))
      report(where, "title should not end with punctuation");
    if (typeof data.summary === "string" && !/[.!?]$/.test(data.summary))
      report(where, "summary should be a sentence ending with a full stop");
    for (const key of ["time", "cost"])
      if (typeof data[key] === "string" && /\d-\d/.test(data[key]))
        report(where, `${key}: use an en dash for ranges (1–2, not 1-2)`);

    if (!Array.isArray(data.checklist) || data.checklist.length === 0)
      report(where, "checklist must be a non-empty list");
    else {
      const seen = new Set();
      data.checklist.forEach((item, n) => {
        const at = `${where} checklist ${n + 1}`;
        if (typeof item !== "string") return report(at, "must be plain text");
        if (!/^[A-Z]/.test(item)) report(at, "start with a capitalised verb");
        if (/[.;:]$/.test(item)) report(at, "no trailing punctuation");
        if (item.length > 110) report(at, "too long (keep under 110 characters)");
        if (seen.has(item)) report(at, "duplicate item");
        seen.add(item);
      });
    }

    if (/^# /m.test(content)) report(where, "body uses an H1; start sections at ##");
    if (!/^## /m.test(content)) report(where, "body needs at least one ## section");
    if (content.includes("—")) report(where, "body uses an em dash; rewrite as two sentences or use a comma");
    if (!isTopic && COPIED.has(m[2])) {
      const text = [data.title, data.summary, ...(data.checklist ?? []), content].join("\n");
      for (const name of otherRegions)
        if (new RegExp(`\\b${name}\\b`).test(text))
          report(where, `mentions ${name}; left over from the template region?`);
      for (const tax of wrongTaxes)
        if (new RegExp(`\\b${tax}\\b`).test(text))
          report(where, `mentions ${tax.replace(/\(.*\)/, "")}, which this region doesn't use`);
    }
    for (const [, n] of content.matchAll(/\bstep (\d+)\b/gi))
      if (Number(n) < 1 || Number(n) > files.length)
        report(where, `refers to step ${n}, but the guide has ${files.length} steps`);
  });

  const stepNames = new Set(files.map((f) => f.replace(/\.md$/, "")));
  for (const shot of manifest.filter((s) => s.region === region)) {
    const where = `guides/manifest.json ${shot.file}`;
    if (!stepNames.has(shot.step)) report(where, `step ${shot.step} has no content file`);
    if (!fs.existsSync(path.join(ROOT, "public", shot.file))) report(where, "image file missing");
    if (!/[.!?]$/.test(shot.caption)) report(where, "caption should end with a full stop");
    if (!shot.alt || shot.alt.length < 20) report(where, "alt text missing or too short");
  }
}

// Country-level shots shared by every region (see SHARED_STEPS in src/lib/guides.ts).
const countries = new Set(queue.map((q) => q.country.toLowerCase()));
for (const shot of manifest.filter((s) => countries.has(s.region))) {
  if (only.length > 0) break;
  const where = `guides/manifest.json ${shot.file}`;
  if (!fs.existsSync(path.join(ROOT, "public", shot.file))) report(where, "image file missing");
  if (!/[.!?]$/.test(shot.caption)) report(where, "caption should end with a full stop");
  if (!shot.alt || shot.alt.length < 20) report(where, "alt text missing or too short");
}

if (problems.length) {
  console.log(problems.join("\n"));
  console.log(`\n${problems.length} problem(s) in ${regions.join(", ")}`);
  process.exit(1);
}
console.log(`Content OK: ${regions.join(", ")}`);
