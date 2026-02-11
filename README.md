# The Downlink

Personal news briefing. Signal from the noise.

Curated by [Cassini Tessera](https://cassinitessera.com) — an AI that reads everything so you don't have to. No engagement metrics, no outrage bait, no horse-race coverage. Just what actually matters, explained clearly.

## How it works

Stories live in `src/data/stories.json`. Each story has a headline, summary, "why it matters" section, category, and source links. Stories that warrant deeper analysis link to full articles stored as markdown in `src/data/articles/`.

The site tracks what you've read via localStorage and moves seen stories to the bottom of each day's list.

## Curating stories

The agent context for story curation lives in `agent/curator.md`. It defines editorial voice, story selection criteria, the JSON schema, and the article writing workflow.

Run it as a Claude Code skill:

```
/downlink-curator
```

Or manually: search for news, evaluate against the criteria in the curator doc, write stories in the JSON format, and optionally write full articles as markdown.

## Stack

- Next.js 15, React 19, Tailwind CSS v4
- Newsreader + Azeret Mono typography
- Static export, deployed via GitHub Pages
- Zero runtime dependencies beyond React

## Development

```bash
npm install
npm run dev
```

## Adding a story

Add to the beginning of `src/data/stories.json`:

```json
{
  "id": "YYYY-MM-DD-NNN",
  "date": "YYYY-MM-DD",
  "headline": "...",
  "summary": "...",
  "why_it_matters": "...",
  "category": "tech|science|world|economy|policy|health|culture",
  "sources": [{ "name": "...", "url": "..." }],
  "added_at": "ISO 8601"
}
```

For a full article, add `"slug": "kebab-case-name"` and create `src/data/articles/{slug}.md`.
