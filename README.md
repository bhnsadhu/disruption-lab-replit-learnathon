# Built with Replit — UIUC Learnathon Wall

Project wall for the **Disruption Lab × Replit Learnathon** (Sat, Nov 7 2026 · 12:00–2:45 PM · CIF Monumental Steps).
Live at **learnathon.bhanusadhu.com**.

Until projects are added, the wall shows six "your build here" slots. Once `data/projects.json` has entries, it switches to the real cards automatically.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Google Form

Make the form with these questions (wording can vary; the importer matches on keywords):

| Question | Type | Required |
| --- | --- | --- |
| Full name | Short answer | ✓ |
| LinkedIn profile URL | Short answer | |
| Project name | Short answer | ✓ |
| One-line description | Short answer | ✓ |
| Replit app link (published `.replit.app` URL) | Short answer | ✓ |
| Headshot | File upload (images) | |

Turn on "Collect email addresses" if you want it, since the importer ignores extra columns. Tell people to hit **Publish** in Replit first, because unpublished apps show a "This app isn't live yet" page.

## After the event

```bash
# 1. Responses tab → ⋮ → Download responses (.csv), save as form-data/responses.csv
#    (Optional) Download the headshot uploads folder from Drive, unzip to form-data/uploads
#    form-data/ is gitignored since it has emails in it.

npm run import-form -- form-data/responses.csv --uploads form-data/uploads

# 2. Screenshot every app (uses your installed Chrome). Flags apps that aren't published.
npm run screenshots

# 3. Check it, then commit + push. Vercel deploys from main.
npm run dev
```

If someone resubmits, re-run the import. The latest row per project title wins, and existing screenshots and awards are kept.

## Winners

1. List the prizes in `data/event.ts` → `prizes` (in display order). They show in the event popover.
2. Add `"award": "<prize name>"` to the winning projects in `data/projects.json`.

Winners get a 🏆 ribbon and move to the top of the wall.

## Logo

Drop the Disruption Lab logo in `public/brand/` and set `disruptionLabLogo` in `data/event.ts` (e.g. `"/brand/disruption-lab.svg"`). A light or white logo works best, since it sits on a dark chip.

## Editing by hand

Each entry in `data/projects.json`:

```json
{
  "slug": "quad-eats",
  "title": "Quad Eats",
  "description": "Finds the shortest dining hall line on campus.",
  "url": "https://quad-eats.replit.app",
  "screenshot": "/project-shots/quad-eats.png",
  "creator": {
    "name": "Priya Natarajan",
    "linkedin": "https://www.linkedin.com/in/priya",
    "avatar": "/avatars/priya-natarajan.jpg"
  },
  "award": "Grand Prize"
}
```

`screenshot`, `linkedin`, `avatar`, and `award` are optional. Missing screenshots fall back to the title on a dark screen, and missing avatars fall back to initials.
