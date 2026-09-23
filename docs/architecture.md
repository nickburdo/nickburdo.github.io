# Architecture

Static portfolio site built with Nuxt 4 (`app/` source directory), generated
to plain HTML via `nuxt generate` and deployed to GitHub Pages. There is no
backend, no API routes, no runtime state store, and no SSR-dependent code —
everything must work as a static export.

## Routing

| Route | File | Notes |
|---|---|---|
| `/` | `app/pages/index.vue` | One-page landing with anchor sections |
| `/cv` | `app/pages/cv.vue` | Resume, content hardcoded in the component |
| `/projects/:slug` | `app/pages/projects/[slug].vue` | Resolves slug via `getProjectBySlug`, throws 404 if missing |
| `/about` | `app/pages/about.vue` | Standalone page; **not linked from navigation** (nav points to `#about` anchor on `/` instead) |

The landing page anchors (`#home #projects #notes #about #contact`) are the
primary in-page navigation, not the router.

## Layers

### 1. Shell — `app/app.vue` → `app/layouts/default.vue`

`app.vue` is a thin wrapper (`NuxtRouteAnnouncer` + `NuxtLayout` + `NuxtPage`).

`layouts/default.vue` is the most complex file in the project (~575 lines) and
owns:

- Sticky header with animated nav indicator that tracks the active section.
- Mobile bottom nav (icons only, shown under 767px) mirroring the same
  `navItems` list.
- A hand-rolled **scroll-spy**: on mount it measures each section's offset
  (`measureSections`), then on scroll picks the active section as the
  midpoint between consecutive section tops (`updateActiveSectionFromScroll`).
- A `lockedSection` mechanism: clicking a nav link scrolls smoothly and
  "locks" the active section for the duration of the scroll so the spy
  doesn't flicker mid-animation; it unlocks ~140ms after scrolling stops.
- Route-change handling: scroll listeners are only attached on `/` and are
  torn down/re-attached on every `route.fullPath` change, since the spy logic
  only makes sense on the single-page landing.

Any change to section anchors, nav labels, or nav order must update
`navItems` in this file — it is the single source of truth for the nav.

### 2. Data — `app/data/projects.ts`

The only real data module in the project:

- Types: `ProjectItem`, `ProjectScreenshot`, `ProjectLink`.
- `projects: ProjectItem[]` — full content for each project (summary, stack,
  screenshots, implemented/technicalDecisions lists, lessons learned, links).
- `getProjectBySlug(slug)` — used by `pages/projects/[slug].vue`.

**Known duplication:** the project cards on the home page
(`HomeProjectsSection.vue`) define their own inline array (title, stack,
short description) rather than reading from `data/projects.ts`. The two lists
have drifted (e.g. stack strings differ). Editing project stack/summary text
currently means updating both places. Same applies to CV content
(`pages/cv.vue`) and notes (`HomeNotesSection.vue`), which are entirely
self-contained and not backed by `data/`.

### 3. Presentation — `app/components/`

- `home/HomeAboutSection.vue`, `HomeContactSection.vue`,
  `HomeNotesSection.vue`, `HomeProjectsSection.vue` — one component per
  landing-page section, each declares its own anchor `id` and inline content
  array.
- `projects/ProjectDetailPage.vue` — purely presentational, takes a
  `project: ProjectItem` prop. Renders a featured screenshot, a gallery, and a
  lightbox (click to open, `Escape` to close via a `keydown` listener added
  in `onMounted`/removed in `onBeforeUnmount`).
- `HomeNotesSection.vue` notes are placeholders (all marked "Coming soon");
  there is no notes/blog content or routing yet, despite being part of the
  original plan (see `docs/plans/portfolio_plan.md`).

## Styling system

- Global tokens and utilities live in `app/styles.css`: CSS custom properties
  under `:root` (`--color-primary`, `--color-bg`, `--color-accent`, etc.),
  plus shared utility classes `.container`, `.section`, `.section-soft`,
  `.section-heading`, `.eyebrow`.
- Every component/page adds its own `<style scoped>` block on top of those
  tokens/utilities. There is no CSS-in-JS, no CSS modules, no Tailwind usage.
- `@nuxt/ui` and Tailwind CSS are installed and the module is registered in
  `nuxt.config.ts`, but **nothing in `app/` uses either** — no `<U*>`
  component, no Tailwind utility class. Treat them as currently dormant; new
  UI should follow the existing hand-written scoped-CSS convention unless a
  decision is made to adopt `@nuxt/ui` project-wide.
- Breakpoints used throughout: `860px`, `767px` (mobile nav switch), `520px`.
- Light theme only (`color-scheme: light` in `styles.css`).

## Build & deploy

- `npm run generate` → static export to `.output/public` (see `dist` symlink
  for local convenience).
- `.github/workflows/nuxtjs.yml`: on push to `main`, installs deps, runs
  `nuxt generate`, uploads `.output/public` as a Pages artifact, deploys to
  GitHub Pages. No test or lint step in CI.
- No environment variables, no server-side secrets, no API integration.

## Content sources not reflected in code

- SEO (`useSeoMeta`/`useHead`, sitemap, robots module) is planned in
  `docs/plans/seo-setup-plan.md` but not implemented; `public/robots.txt` is
  still the manual file the plan says to remove once the modules are added.
- CV/resume full source text lives in
  `docs/model/Nick_Burdo_Senior_Frontend_Developer.md`; `app/pages/cv.vue` is
  a trimmed/restructured version per `docs/plans/cv-redesign-plan.md`.
- The original static HTML/CSS prototype (`docs/model/portfolio_template.html`
  + `portfolio_styles.css`) is the design source of truth the current Vue
  components were built from.
