# AGENTS.md

Personal portfolio: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind + shadcn/ui. Path alias `@/*` maps to the repo root.

## Commands

- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint` — plain `eslint` (v9 flat config in `eslint.config.mjs`, TS parser + next/react rules), not `next lint`.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run format` — Prettier over the repo. Config in `.prettierrc` (semicolons on, `prettier-plugin-organize-imports`).
- No test runner exists.

## Required setup

- Copy `.env.copy` to `.env` before `dev`/`build`. `app/layout.tsx` **throws at build/dev time** if `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` is missing.
- `.env.copy` documents: `CONTACT_SUBMIT_URL` (contact form), `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_DISCORD_LINK` (`app/(root)/community/route.ts`), `NEXT_PUBLIC_RESUME_LINK`.
- Contact form (`app/api/contact/route.ts`) submits to a Google Apps Script web app (`CONTACT_SUBMIT_URL`) whose `doPost` appends each message to a `Contact` sheet of a Google Sheet; no email service is used. Apps Script relays its response only to browsers — for server-side POSTs it redirects to its echo host (`script.googleusercontent.com`) and answers `405` while still running `doPost`; `route.ts` recognises that signature (echo host in `res.url`, or status `405`) as delivered, and surfaces `404`/dead deployments as failures. Never recreate the deployment (that changes the URL): update it in place via Manage deployments → Edit → New version.

## Single source of content: `content/portfolio.json`

- **All displayable content lives in `content/portfolio.json`**: `site`, `socials`, `navigation`, `pages`, `skills`, `projects`, `experience`, `contributions`, `blog`. Edit JSON, not components.
- It is imported statically and validated at load time, so **deleting it breaks the build** (module not found) and **malformed/incomplete content throws** with field paths. Loader + schema: `config/content.ts` + `lib/portfolio-schema.ts` (Zod).
- Icons are stored as string keys (e.g. `"nextjs"`, `"gitHub"`); they resolve through `lib/resolve-icon.ts` against `components/common/icons.tsx`. Adding a new icon key requires adding it to that registry.
- Dates are ISO strings in JSON (`"2024-08-01"`, or `"Present"` for current experience); adapters convert them to `Date`.

## Architecture

- `config/*.ts` are thin **adapters** over `content/portfolio.json` that preserve the public export names components import (`siteConfig`, `Projects`, `featuredProjects`, `skills`, `skillsUnsorted`, `featuredSkills`, `experiences`, `contributionsUnsorted`, `featuredContributions`, `SocialLinks`, `pagesConfig`, `routesConfig`). Derived values (`skills` sort, `featured*` slices) are computed here.
- `config/constants.ts` stays code, not content: `ValidSkills`, `ValidCategory`, `ValidExpType`, `ValidPages` unions gate `skills` and the `pagesConfig` map; `projects` (`techStack`) and `experience` (`skills`) are GitHub/resume-sourced so `category`/`type` are still gated but tech lists are free-form (`string[]`). New categories must be added there or TS fails.
- Routes live under the `app/(root)` group; nav is driven by `portfolio.navigation.mainNav`. `app/(root)/community/route.ts` and `app/(root)/resume/page.tsx` are redirects, not normal pages.
- Adding a theme requires editing **both** `tailwind.config.js` (safelist) and `app/layout.tsx` (`ThemeProvider` `themes` array), plus CSS variables in `app/globals.css`.

## Blogs

- `lib/blogs.ts` aggregates **local markdown** (`content/blogs/*.md`, parsed with `gray-matter` + `remark`) and **external platforms** (dev.to REST, Hashnode RSS, Medium/Codedamn RSS via `fast-xml-parser`), configured under `content/portfolio.json` → `blog.sources`.
- Hashnode is read via its public RSS feed (`https://{username}.hashnode.dev/rss.xml`) — its GraphQL API is Pro-gated.
- Posts are deduplicated by canonical URL **or normalized title** using the `blog.priority` order (e.g. `local > hashnode > devto > medium > codedamn`) so cross-posts collapse to one card, with the higher-priority source winning. External posts **link out** to their source; local posts render at `/blogs/[slug]`.
- `blog.ignoreTitles` drops posts by title (used to hide throwaway/test posts) from the listing and auto-featured selection.
- External fetches fail gracefully (a broken/empty source just yields no posts), so builds work offline with empty handles.
- Local frontmatter requires `title`, `date`, `description`, `tags`; `featured: true` and `blog.featured` (canonical URL/title) control homepage features (fallback: latest 3).
- Local blog HTML is rendered with `remark-html` `sanitize: false`; trusted local markdown only.
