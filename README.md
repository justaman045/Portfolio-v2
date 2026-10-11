# Portfolio

A personal portfolio built with **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

All displayable content lives in a single file — [`content/portfolio.json`](./content/portfolio.json) — so you can update the whole site without touching component code.

## Getting started

```bash
cp .env.copy .env   # then fill in the values (see below)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

`.env.copy` documents every variable. The app **throws at build/dev time** if `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` is missing.

| Variable | Purpose |
| --- | --- |
| `CONTACT_SUBMIT_URL` | Contact form → Google Apps Script web app (appends to a Google Sheet) |
| `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` | Google Analytics (required) |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console verification |
| `NEXT_PUBLIC_DISCORD_LINK` | Community page redirect |
| `NEXT_PUBLIC_RESUME_LINK` | Resume page redirect |

## Editing content

Everything is in `content/portfolio.json`:

- `site` — name, role, tagline, URLs, social links, SEO images, keywords
- `socials` — footer/social links (icons are string keys, e.g. `"gitHub"`)
- `navigation` — the main nav items
- `pages` — page titles/descriptions/metadata
- `skills`, `projects`, `experience`, `contributions`
- `blog` — external platform handles, dedup priority, and featured posts

The file is validated with Zod at load time. **Deleting it fails the build**, and malformed/missing fields throw with the exact field path so you never ship incomplete content.

Dates are ISO strings (`"2024-08-01"`), or `"Present"` for current roles. Icons resolve through `lib/resolve-icon.ts` against `components/common/icons.tsx` — add new icon keys there first.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier |

## Blogs

Local posts live in `content/blogs/*.md` and render at `/blogs/[slug]`. External posts are pulled from dev.to, Hashnode (via its public RSS feed), Medium, and Codedamn (configured under `blog.sources`) and link out to their source. Posts are deduplicated by canonical URL **or** normalized title using the `blog.priority` order, and `blog.ignoreTitles` drops posts by title from both the listing and auto-featured selection.
