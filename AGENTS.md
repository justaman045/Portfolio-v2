# AGENTS.md

Personal portfolio: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind + shadcn/ui. Path alias `@/*` maps to the repo root. Single repo, no workspaces.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — plain ESLint v9 flat config (`eslint.config.mjs`), **not** `next lint`
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier (`.prettierrc`, semicolons on, `prettier-plugin-organize-imports`)
- No test runner exists; there is no `test` script.

## Required setup

- Copy `.env.copy` to `.env` before `dev`/`build`. `app/layout.tsx` **throws at build/dev time** if `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` is missing.
- `.env.copy` documents: `CONTACT_SUBMIT_URL` (contact form → Google Apps Script), `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` (required), `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_DISCORD_LINK` (community redirect), `NEXT_PUBLIC_RESUME_LINK` (Overleaf read-only link).
- `CONTACT_SUBMIT_URL` is required for the contact form; `app/api/contact/route.ts` returns 500 if unset.

## Single source of content: `content/portfolio.json`

- **All displayable content lives in `content/portfolio.json`**: `site`, `socials`, `navigation`, `pages`, `skills`, `projects`, `experience`, `contributions`, `blog`. Edit JSON, not components.
- It is imported statically and validated with Zod at load time (`config/content.ts` + `lib/portfolio-schema.ts`). **Deleting it breaks the build** (module not found); malformed/incomplete content throws with field paths.
- Icons are string keys (e.g. `"nextjs"`, `"gitHub"`). They resolve through `lib/resolve-icon.ts` against `components/common/icons.tsx`. **Adding a new icon key requires adding it to that registry** or content load throws `Unknown icon key`.
- Dates are ISO strings (`"2024-08-01"`) or `"Present"` for current roles; adapters convert to `Date`.
- The literal token `{yearsOfExperience}` in **any** content string is replaced at load time with whole years since `site.careerStartDate` (`lib/experience.ts`). Use it in copy instead of hardcoding a number; it recurses through the whole JSON tree.

## Architecture

- `config/*.ts` are thin adapters over `content/portfolio.json` that preserve the export names components import (`siteConfig`, `Projects`, `skills`, `experiences`, `SocialLinks`, `pagesConfig`, `routesConfig`, etc.). Derived values (sorted `skills`, `featured*` slices) are computed there.
- Routes live under the `app/(root)` group; nav is driven by `portfolio.navigation.mainNav`. `app/(root)/community/route.ts` and `app/(root)/resume/page.tsx` are redirects, not normal pages.
- `config/constants.ts` is code, not content. Only `ValidPages` actually gates anything — `pagesConfig` is a mapped type over its keys, so a page missing from JSON `pages` is a TS error. `ValidCategory`/`ValidExpType`/`ValidSkills` are only `as`-casts, so invalid skill/category strings in JSON are **not** caught by TS (Zod only checks `string`).
- Adding a theme requires editing **all three**: `tailwind.config.js` (safelist), `app/layout.tsx` (`ThemeProvider` `themes` array), and `app/globals.css` (CSS variables).

## Contact form

- `app/api/contact/route.ts` POSTs to a Google Apps Script web app (`CONTACT_SUBMIT_URL`) whose `doPost` appends to a `Contact` sheet; no email service is used. It sets DNS to `ipv4first`, retries once on transient failure (never on timeout, to avoid duplicate rows), and treats a `script.googleusercontent.com` redirect or status `405` as delivered; `404`/dead deployments are failures.
- **Never recreate the Apps Script deployment** (that changes the URL). Update it in place via Manage deployments → Edit → New version.

## Resume

- `/resume` is a server-side `redirect(process.env.NEXT_PUBLIC_RESUME_LINK || "/")`. Set `NEXT_PUBLIC_RESUME_LINK` in `.env` **and** Vercel, or production falls back to `/`.
- Overleaf cannot be embedded (`X-Frame-Options: SAMEORIGIN`) and has no public PDF endpoint (`/read/<token>/output/output.pdf` → 404; download URL is 403 without the owner's session and is ephemeral). Redirecting to the live Overleaf document is the only zero-maintenance option. Do not commit a `public/resume.pdf` snapshot or fetch server-side with stored credentials.

## Blogs

- `lib/blogs.ts` aggregates local markdown (`content/blogs/*.md`, `gray-matter` + `remark`) and external platforms (dev.to REST, Hashnode public RSS, Medium/Codedamn RSS via `fast-xml-parser`), configured under `blog.sources` in `content/portfolio.json`.
- Hashnode uses its public RSS feed (`https://{username}.hashnode.dev/rss.xml`); its GraphQL API is Pro-gated.
- Posts dedupe by canonical URL or normalized title using `blog.priority` order (`local > hashnode > devto > medium > codedamn`); higher priority wins. External posts link out; local posts render at `/blogs/[slug]`.
- `blog.ignoreTitles` drops posts by title from listing and auto-featured selection. External fetches fail gracefully (builds work offline with empty handles).
- Local frontmatter requires `title`, `date`, `description`, `tags`. `blog.featured` (canonical URL or title) and local `featured: true` control homepage features (fallback: latest 3). Local HTML rendered with `remark-html` `sanitize: false` — trusted local markdown only.

## Dependencies & auditing

- `npm audit --omit=dev` = 0. The full audit's remaining advisories are all `braces` (unpatched), pulled only through dev/build tooling (`tailwindcss@3`, `@next/eslint-plugin-next`). A clean full audit needs both a Tailwind v4 migration and replacing `eslint-config-next` — **don't attempt a naive dependency bump**.
- `package.json` `overrides`: `argparse ^2.0.1`, `postcss-selector-parser ^7.1.6`.
