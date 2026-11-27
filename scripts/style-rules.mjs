// Cheap, automatable rules from the writing-style skill
// (.claude/skills/writing-style/SKILL.md). Each check returns
// { level: "error" | "warning", msg }. Keep this list in step with the
// skill's "What content:check enforces" table.

// Spelling of the other country, as [wrong, right]. Matched as whole words,
// case-insensitive, outside inline code and link URLs.
const NOT_CANADIAN = [
  ["color", "colour"],
  ["colors", "colours"],
  ["favor", "favour"],
  ["favorite", "favourite"],
  ["behavior", "behaviour"],
  ["labor", "labour"],
  ["center", "centre"],
  ["centers", "centres"],
];
const NOT_AMERICAN = [
  ["licence", "license"],
  ["licences", "licenses"],
  ["licenced", "licensed"],
  ["cheque", "check"],
  ["cheques", "checks"],
  ["colour", "color"],
  ["colours", "colors"],
  ["favour", "favor"],
  ["favourite", "favorite"],
  ["behaviour", "behavior"],
  ["labour", "labor"],
  ["centre", "center"],
  ["centres", "centers"],
  ["catalogue", "catalog"],
  ["honour", "honor"],
  ["neighbour", "neighbor"],
  ["organisation", "organization"],
];

const BANNED = [
  [/\be\.g\./i, 'write "for example", not "e.g."'],
  [/\bi\.e\./i, 'write "that is", not "i.e."'],
  [/\betc\./i, 'write "and so on" or list the items, not "etc."'],
  [/\bclick here\b/i, 'name the link or button, not "click here"'],
  [/\bsimply\b/i, 'drop "simply"'],
  [/\bobviously\b/i, 'drop "obviously"'],
];

// Text a check reads: inline code and link targets are left out, since
// commands and URLs keep their own spelling.
const prose = (text) => text.replace(/`[^`]*`/g, "").replace(/\]\([^)]*\)/g, "]").replace(/https?:\/\/\S+/g, "");
// For spelling, quoted UI labels ("Color") keep the product's spelling too.
const unquoted = (text) => text.replace(/"[^"\n]*"/g, "");

/**
 * @param {object} step
 * @param {Record<string, unknown>} step.data front matter
 * @param {string} step.content Markdown body
 * @param {string | undefined} step.country "CA", "US", or undefined for a topic guide
 * @param {string} [step.lang] language of the text; only "en" rules exist so far
 */
export function styleProblems({ data, content, country, lang = "en" }) {
  const out = [];
  const error = (msg) => out.push({ level: "error", msg });
  const warning = (msg) => out.push({ level: "warning", msg });
  const checklist = Array.isArray(data.checklist) ? data.checklist.filter((i) => typeof i === "string") : [];
  const fields = [
    ["title", typeof data.title === "string" ? data.title : ""],
    ["summary", typeof data.summary === "string" ? data.summary : ""],
    ...checklist.map((item, n) => [`checklist ${n + 1}`, item]),
    ["body", content],
  ];

  for (const [name, text] of fields)
    if (text.includes("—")) error(`${name} uses an em dash; rewrite as two sentences or use a comma`);

  if (Array.isArray(data.checklist) && (data.checklist.length < 3 || data.checklist.length > 6))
    error(`checklist has ${data.checklist.length} items; use 3–6`);
  checklist.forEach((item, n) => {
    if (/recommended/i.test(item) && !/\(recommended\b[^)]*\)/.test(item))
      error(`checklist ${n + 1}: write "(recommended)" in brackets after the choice`);
  });

  if (typeof data.summary === "string" && (data.summary.length < 70 || data.summary.length > 130))
    warning(`summary is ${data.summary.length} characters; aim for 70–130 (it starts the search snippet)`);
  // Estimates ("about $150") aren't official fees and need no date.
  if (typeof data.cost === "string" && /\$\s?\d/.test(data.cost) && !/\b(seen|about)\b/i.test(data.cost))
    warning('cost has a fee without "(seen <Month YYYY>; confirm current fee)"');

  if (lang !== "en") return out;

  const all = prose(fields.map(([, text]) => text).join("\n"));
  for (const [pattern, msg] of BANNED) if (pattern.test(all)) error(msg);
  if (/\d %/.test(all)) error('no space before % in English ("5%")');

  const wrong = country === "US" ? NOT_AMERICAN : NOT_CANADIAN;
  const spelling = country === undefined ? warning : error;
  const seen = new Set();
  for (const [bad, good] of wrong) {
    const m = unquoted(all).match(new RegExp(`\\b${bad}\\b`, "i"));
    if (m && !seen.has(bad)) {
      seen.add(bad);
      spelling(`"${m[0]}": ${country === "US" ? "American" : "Canadian"} spelling is "${good}"`);
    }
  }
  return out;
}
