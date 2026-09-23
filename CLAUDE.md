# CLAUDE.md

## Working agreements

- Reply briefly and clearly.
- User-facing text (questions, work reports) in Russian; internal notes in
  English.

## Project

Static portfolio site for Nick Burdo (Nuxt 4), deployed to GitHub Pages.
Goal and IA: `docs/plans/portfolio_plan.md`. Design source: `docs/model/`.

## Commands

`npm run dev` (port 2999) · `generate` · `format` · `format:check`
No tests, no lint script.

## Architecture

Full breakdown: `docs/architecture.md`. Quick map:

```
app.vue → layouts/default.vue (header + scroll-spy, most complex file)
  → pages/{index,cv,about}.vue, pages/projects/[slug].vue
```

Project data: `app/data/projects.ts` (types + `getProjectBySlug`). Home
cards / CV / notes content is inlined in components, not sourced from
`data/projects.ts` — keep them in sync manually when editing.

## Code style

- Hand-written scoped CSS + tokens from `app/styles.css`. `@nuxt/ui` and
  Tailwind are installed but unused — match the existing style, don't
  introduce them without discussion.
- Shared utility classes: `.container`, `.section`, `.section-soft`,
  `.section-heading`, `.eyebrow`.
- Breakpoints: 860 / 767 / 520px. Light theme only.
- Prettier: single quotes, semicolons, trailing commas. Site content is in
  English.

## Invariants

- Section anchors (`#home #projects #notes #about #contact`) are wired to
  `navItems` in `layouts/default.vue` — change both together.
- Fully static build (`nuxt generate`) — no `server/`, no SSR-only code.
- Project screenshots live in `public/data/projects/<slug>/`.

## Agent constraints

**Rules**
- Work in feature branches, never commit to `main` — a push there auto-deploys the live site (`.github/workflows/nuxtjs.yml`).
- No test suite. See Definition of Done before calling a change complete.
- Don't invent resume/project facts; ask instead of guessing.
- Don't silently "fix" the `data/projects.ts` vs. home-card content drift — flag it.

**Definition of Done**
- `npx eslint .` — 0 errors.
- `npx nuxi typecheck` — clean.
- `npm run generate` — succeeds, all routes prerender.
- `git diff` reviewed — no `docs/model/`, secrets, or unrelated files.
- Change matches the requested scope — no scope creep.

**On check failure**
- Don't commit/push — fix it, or stop and report the failure to the user.
- Pre-existing warnings unrelated to your change: flag, don't silently fix.

**Boundaries** (ask before touching)
- `.github/workflows/nuxtjs.yml`, `nuxt.config.ts` — deploy/build pipeline.
- Contact info and resume facts (`HomeContactSection.vue`, `cv.vue`, `docs/model/`) — real personal data.
- `package.json` deps — especially enabling the unused `@nuxt/ui`/Tailwind.
- `docs/plans/*.md` — historical decisions; add new files instead of rewriting.
- GitHub repo/Pages settings via API/MCP.

**Sandbox**
- Local repo + session scratchpad only; no backend, no secrets, no `.env`.
- `npm run dev` on port 2999, `build`/`generate`/`preview` — safe, no network side effects.
- Treat all tracked files as public: this is a static site, everything committed ships to the live page.

## Further context

- `docs/plans/` — feature/content plans (portfolio, CV redesign, SEO)
- `docs/projects-solution.md` — project detail page content structure
- `docs/model/` — original HTML/CSS prototype and full resume source
  (gitignored, local reference only)
