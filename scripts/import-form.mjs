#!/usr/bin/env node
// Turn a Google Form responses CSV into data/projects.json.
//
//   npm run import-form -- form-data/responses.csv
//   npm run import-form -- form-data/responses.csv --uploads form-data/uploads
//
// --uploads points at the unzipped Drive folder of headshot uploads. Google Forms
// names uploads "<original name> - <Respondent Name>.<ext>", which is how files
// get matched back to rows.
//
// Re-running is safe: award + screenshot fields already in projects.json are kept
// (matched by slug), so you can import, set winners, and import again.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "data/projects.json");
const AVATAR_DIR = path.join(ROOT, "public/avatars");

const args = process.argv.slice(2);
const csvPath = args.find((a) => !a.startsWith("--"));
const uploadsIdx = args.indexOf("--uploads");
const uploadsDir = uploadsIdx !== -1 ? args[uploadsIdx + 1] : null;

if (!csvPath) {
  console.error("usage: npm run import-form -- <responses.csv> [--uploads <dir>]");
  process.exit(1);
}

// --- CSV (RFC 4180: quoted fields, escaped quotes, newlines inside quotes) ---
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((f) => f.trim()));
}

// --- column matching: first header passing each test wins ---
const COLUMNS = {
  name: (h) => /name/i.test(h) && !/project|app/i.test(h),
  title: (h) => /project|app/i.test(h) && /name|title/i.test(h),
  description: (h) => /one[- ]?lin|description|tagline|what does/i.test(h),
  url: (h) => /replit|link|url/i.test(h) && !/linkedin/i.test(h),
  linkedin: (h) => /linkedin/i.test(h),
  avatar: (h) => /headshot|photo|picture|avatar/i.test(h),
};

const [header, ...body] = parseCsv(fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, ""));
const col = Object.fromEntries(
  Object.entries(COLUMNS).map(([key, test]) => [key, header.findIndex((h) => test(h.trim()))]),
);

for (const key of ["name", "title", "url"]) {
  if (col[key] === -1) {
    console.error(`Couldn't find a "${key}" column. Headers were:\n  ${header.join("\n  ")}`);
    process.exit(1);
  }
}
console.log("Column mapping:");
for (const [k, i] of Object.entries(col)) console.log(`  ${k.padEnd(12)} ← ${i === -1 ? "(none)" : header[i]}`);

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const withProtocol = (u) => {
  u = u.trim();
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
};

const cell = (row, key) => (col[key] === -1 ? "" : (row[col[key]] ?? "").trim());

// --- headshot uploads ---
const uploads = uploadsDir && fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
function findAvatar(name) {
  const needle = ` - ${name}`.toLowerCase();
  const hit = uploads.find((f) => path.parse(f).name.toLowerCase().endsWith(needle));
  if (!hit) return undefined;
  const dest = `${slugify(name)}${path.extname(hit).toLowerCase()}`;
  fs.mkdirSync(AVATAR_DIR, { recursive: true });
  fs.copyFileSync(path.join(uploadsDir, hit), path.join(AVATAR_DIR, dest));
  return `/avatars/${dest}`;
}

// --- build projects; a later submission with the same title replaces the earlier one ---
const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];
const prev = new Map(existing.map((p) => [p.slug, p]));
const bySlug = new Map();
const skipped = [];

for (const row of body) {
  const name = cell(row, "name");
  const title = cell(row, "title");
  const url = withProtocol(cell(row, "url"));
  if (!name || !title || !url) {
    skipped.push(name || title || "(blank row)");
    continue;
  }
  const slug = slugify(title);
  const old = prev.get(slug) ?? {};
  const linkedin = withProtocol(cell(row, "linkedin"));
  const avatar = findAvatar(name) ?? old.creator?.avatar;

  bySlug.set(slug, {
    slug,
    title,
    description: cell(row, "description"),
    url,
    ...(old.screenshot && { screenshot: old.screenshot }),
    creator: {
      name,
      ...(linkedin && { linkedin }),
      ...(avatar && { avatar }),
    },
    ...(old.award && { award: old.award }),
  });
}

const projects = [...bySlug.values()];
fs.writeFileSync(OUT, JSON.stringify(projects, null, 2) + "\n");

console.log(`\nWrote ${projects.length} projects to data/projects.json`);
const noAvatar = projects.filter((p) => !p.creator.avatar).length;
if (uploadsDir) console.log(`  ${projects.length - noAvatar} with headshots, ${noAvatar} without`);
if (skipped.length) console.log(`  Skipped ${skipped.length} incomplete row(s): ${skipped.join(", ")}`);
console.log("Next: npm run screenshots");
