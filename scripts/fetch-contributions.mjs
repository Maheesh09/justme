// Pulls the public GitHub contribution calendar for one user and saves it as
// public/contributions.json. Runs automatically before every build, so the
// numbers on the site always match GitHub at the time of the last deploy.
//
// Usage: node scripts/fetch-contributions.mjs [username]

import { writeFile, readFile } from 'node:fs/promises';

const USERNAME = process.argv[2] || 'Maheesh09';
const OUT_FILE = new URL('../public/contributions.json', import.meta.url);

async function main() {
  const res = await fetch(`https://github.com/users/${USERNAME}/contributions`, {
    headers: { 'User-Agent': 'maheesh.me build script' },
  });
  if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
  const html = await res.text();

  // Each day is a <td data-date=".." id=".." data-level="..">
  const cellRe = /data-date="(\d{4}-\d{2}-\d{2})"\s+id="([^"]+)"\s+data-level="(\d)"/g;
  // The real count for each day lives in a matching <tool-tip for="..">
  const tipRe = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)</g;

  const tips = new Map();
  for (const [, id, text] of html.matchAll(tipRe)) tips.set(id, text);

  const days = [];
  for (const [, date, id, level] of html.matchAll(cellRe)) {
    const match = /^(\d+) contribution/.exec(tips.get(id) || '');
    days.push({ date, count: match ? Number(match[1]) : 0, level: Number(level) });
  }
  if (days.length < 300) throw new Error(`Only found ${days.length} days, GitHub's page format may have changed`);

  days.sort((a, b) => a.date.localeCompare(b.date));
  const total = days.reduce((sum, d) => sum + d.count, 0);

  const data = { username: USERNAME, fetchedAt: new Date().toISOString(), total, days };
  await writeFile(OUT_FILE, JSON.stringify(data));
  console.log(`Saved ${total} contributions over ${days.length} days for ${USERNAME}`);
}

main().catch(async (err) => {
  // Never break the build over this. Keep the last saved file if there is one.
  try {
    await readFile(OUT_FILE);
    console.warn(`Could not refresh contributions (${err.message}). Keeping the existing file.`);
  } catch {
    console.warn(`Could not fetch contributions (${err.message}). The heatmap will load live data instead.`);
  }
});
