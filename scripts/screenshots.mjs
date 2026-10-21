#!/usr/bin/env node
// Screenshot every project's live app into public/project-shots/ and record the path.
// Uses your installed Google Chrome (no browser download).
//
//   npm run screenshots            # only projects missing a screenshot
//   npm run screenshots -- --all   # redo everything
//   npm run screenshots -- quad-eats mtd-ping   # just these slugs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "data/projects.json");
const SHOT_DIR = path.join(ROOT, "public/project-shots");

const args = process.argv.slice(2);
const all = args.includes("--all");
const only = args.filter((a) => !a.startsWith("--"));

const projects = JSON.parse(fs.readFileSync(DATA, "utf8"));
const todo = projects.filter((p) =>
  only.length ? only.includes(p.slug) : all || !p.screenshot,
);

if (!todo.length) {
  console.log("Nothing to screenshot.");
  process.exit(0);
}

fs.mkdirSync(SHOT_DIR, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const failed = [];
const notLive = [];

for (const p of todo) {
  process.stdout.write(`  ${p.slug} … `);
  try {
    // Replit apps can cold-start; give them time to wake up
    await page.goto(p.url, { waitUntil: "load", timeout: 60_000 });
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(2500);
    if (/this app isn.t live yet/i.test(await page.innerText("body").catch(() => ""))) {
      notLive.push(p.slug);
      console.log("NOT PUBLISHED (skipped)");
      continue;
    }
    const file = `${p.slug}.png`;
    await page.screenshot({ path: path.join(SHOT_DIR, file) });
    p.screenshot = `/project-shots/${file}`;
    console.log("ok");
  } catch (err) {
    failed.push(p.slug);
    console.log(`failed (${err.message.split("\n")[0]})`);
  }
}

await browser.close();
fs.writeFileSync(DATA, JSON.stringify(projects, null, 2) + "\n");
console.log(`\nDone. ${todo.length - failed.length - notLive.length}/${todo.length} captured.`);
if (notLive.length) console.log(`Not published on Replit yet (ask them to hit Publish): ${notLive.join(", ")}`);
if (failed.length) console.log(`Retry later: npm run screenshots -- ${failed.join(" ")}`);
