# CLAUDE.md

## Working agreements

- Reply briefly and clearly.
- User-facing text (questions, work reports) in Russian; internal notes and
  code comments in English.
- Do not start the dev server unless explicitly asked.
- `prepare-next` ("Prepare for a new chat"): write `docs/project-state.md`
  with a handoff summary.
- `continue-last` ("Continue the previous chat"): read this file and
  `docs/project-state.md`, then continue from there.
- Warn briefly when the conversation is getting too large.

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

## Further context

- `docs/plans/` — feature/content plans (portfolio, CV redesign, SEO)
- `docs/projects-solution.md` — project detail page content structure
- `docs/model/` — original HTML/CSS prototype and full resume source
- `docs/project-state.md` — handoff notes between chats (created on demand)
