# Felicia Morales — Portfolio

Next.js (App Router) + Tailwind CSS v4. Deployed on Vercel.

## Editing content

Almost everything you'd want to change lives in `src/data/`:

| File | What's in it |
| --- | --- |
| `src/data/site.ts` | Hero intro, About copy, skills, tools, background, other clients, contact links |
| `src/data/caseStudies.ts` | Every case study: card summary, headline result, problem, what I did, deep dives, media, results |
| `src/data/writing.ts` | Writing samples (Entangled Insights #6) |

Images, videos, and PDFs go in `public/`. The résumé is `public/Felicia_Morales_Resume.pdf`; replace that file to update it.

A case study's `results` and `headline` are optional. Leave them out until a number is verified, and the page simply won't show that block.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying

Pushing to `main` deploys to production once the Vercel project is connected to this repository. Pushing any other branch creates a preview deployment.

Set `NEXT_PUBLIC_SITE_URL` in Vercel (for example `https://feliciamorales.com`) once a custom domain is connected, so search and share links use it.
