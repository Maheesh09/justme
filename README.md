# maheesh.me

My personal portfolio. Built with React, Vite and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Where things live

| What | Where |
|---|---|
| All text, projects, achievements, articles | `src/data/portfolioData.ts` |
| Profile photo | `public/images/profile.jpg` |
| Project screenshots | `public/images/projects/` |
| Achievement photos | `public/images/achievements/` |
| CV download | `public/cv/Maheesha_Pramuditha_CV.pdf` |
| GitHub contribution data | `public/contributions.json` (made by `scripts/fetch-contributions.mjs`) |

## Adding an image

1. Put the file in the right folder, for example `public/images/projects/synkron.png`.
2. In `src/data/portfolioData.ts`, set the path: `cover: '/images/projects/synkron.png'`.

Anything without an image shows a simple placeholder. The big image on a project page only appears once a real screenshot is set.

## GitHub contributions

The heatmap uses real data in two ways:

1. Every `npm run build` runs `scripts/fetch-contributions.mjs`, which saves your latest calendar from GitHub into `public/contributions.json`.
2. In the browser, the site shows that saved file straight away, then tries to load fresher numbers from a public contributions API. If that fails, the saved file stays.

To refresh the saved file by hand: `npm run contributions`
