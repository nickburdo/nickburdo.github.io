# Notes: First Mini-Blog Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the first "Coming soon" placeholder in the home page Notes
section with a real, published mini-blog article ("Harness Engineering"),
rendered on its own page at `/notes/harness-engineering`, and establish the
reusable pattern (data registry + markdown rendering + detail page) that
future notes will follow.

**Architecture:** Mirrors the existing Projects pattern 1:1: a typed data
registry (`app/data/notes.ts`) holding per-note metadata plus the raw
Markdown body (statically imported via Vite's `?raw` suffix — no server,
no runtime file reads), a thin dynamic route
(`app/pages/notes/[slug].vue`) that resolves the slug and 404s, and a
presentational detail component (`NoteDetailPage.vue`) that renders the
Markdown body to HTML via `markdown-it` and injects it with `v-html`,
styled via scoped `:deep()` selectors against the site's existing design
tokens. The home page's featured card sources its title/category/excerpt
from the same registry instead of duplicating them, to avoid the
content-drift bug class already fixed once for `HomeProjectsSection.vue`.

**Tech Stack:** Nuxt 4 / Vue 3 / TypeScript (existing). New: `markdown-it`
+ `@types/markdown-it` (approved — see Decisions).

**Spec:** No separate spec file — this is a bounded task per
`superpowers:brainstorming`'s classification (an existing, directly
analogous flow — Projects — is being mirrored, not designed from
scratch). The short design was presented and approved in chat; the
decisions reached there are captured below.

## Decisions

- **Markdown library: `markdown-it`**, not `marked`. Verified against
  each library's own docs (via context7) before choosing, per
  `architecture-changes.md`: `markdown-it` supports GFM tables and fenced
  code blocks out of the box, and escapes HTML / validates link protocols
  by default. `marked`'s own docs state it does **not** sanitize output by
  default ("critical to use a sanitization library"). Our content is
  first-party and trusted, so this isn't a hard security requirement, but
  `markdown-it` gives safe defaults for free with less configuration.
- **Slug = filename without extension.** `app/data/notes/harness-engineering.md`
  → slug `harness-engineering`. No separately hand-picked slug, to avoid
  the file/URL naming from drifting apart. Applies to all future notes.
- **Page title = the Markdown's own top-level `# H1`.** The detail page
  does not render a separate title from metadata; the rendered body's H1
  is styled as the page heading. Consequence: every future note's `.md`
  file must start with exactly one `# H1`.
- **No syntax highlighting in v1.** Code blocks render as plain
  monospace `<pre><code>`. The first article has two short blocks; adding
  `highlight.js` now would be premature (YAGNI) — revisit if a future
  article needs it.
- **Featured home card sources data from `app/data/notes.ts`**, not
  hand-duplicated inline content, following the same fix already applied
  to `HomeProjectsSection.vue`. The two remaining "Coming soon" cards stay
  inline (no note behind them yet).
- **No `/notes` index page.** Out of scope — same as there being no
  `/projects` index; the home page section is the index.

## Global Constraints

- No test suite in this project; no TDD. Verification is: `npx eslint .`,
  `npx nuxi typecheck`, `npm run generate` (project's Definition of Done).
- Only the two approved dependencies (`markdown-it`, `@types/markdown-it`)
  may be added to `package.json` — no other new deps.
- Site copy (headings, body text) is in English; chat/commit messages
  follow the usual split (English internal notes).
- Prettier formatting: single quotes, semicolons, trailing commas.
- Fully static build — no `server/`, no runtime file reads, no SSR-only
  code. Markdown content is bundled at build time via `?raw` import.
- Follow existing scoped-CSS conventions and design tokens
  (`--color-heading`, `--color-primary`, `--color-border`,
  `--color-muted`, `--color-surface-soft`) — no UI kit, no Tailwind.

## Review Focus

- **`v-html` + `vue/no-v-html` lint rule.** Nuxt's default ESLint config
  likely flags `v-html` as an XSS risk. Content here is our own trusted
  Markdown file, not user input — Task 3 disables the rule inline with a
  comment explaining why, rather than letting the first lint run fail.
- **`*.md?raw` import type resolution.** Vite's ambient client types
  (`vite/client`, which Nuxt references automatically) declare a generic
  `*?raw` module returning `string`, so this should typecheck without a
  custom shim — Task 7's `nuxi typecheck` run is the actual proof either
  way.
- **Unknown/mistyped note slug.** `/notes/does-not-exist` must 404, not
  render a blank page or throw an unhandled error — Task 4 mirrors the
  Projects page's `createError(404)` pattern exactly.
- **Wide Markdown tables on narrow viewports.** The article has one GFM
  table; at the 520px breakpoint it must not overflow the page — Task 3's
  CSS adds horizontal scroll on the table itself rather than letting it
  blow out the layout.
- **Home card content drift.** The featured card's title/category/excerpt
  must read from `app/data/notes.ts`, not be re-typed by hand — Task 5
  wires this through `getNoteBySlug` instead of a literal object.

---

### Task 1: Add the `markdown-it` dependency

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `markdown-it` importable as `import MarkdownIt from 'markdown-it'` with types from `@types/markdown-it`, available to later tasks.

- [ ] **Step 1: Install the dependency**

Run: `npm install markdown-it @types/markdown-it`

- [ ] **Step 2: Verify it landed in `package.json`**

Expected: `dependencies` now includes `"markdown-it": "^<version>"` and
`devDependencies` includes `"@types/markdown-it": "^<version>"`
(alphabetical order in each list, matching the file's existing style).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add markdown-it for rendering mini-blog note content"
```

---

### Task 2: Create the notes data registry

**Files:**
- Create: `app/data/notes.ts`

**Interfaces:**
- Consumes: `app/data/notes/harness-engineering.md` (raw file, via `?raw` import).
- Produces: `type NoteItem = { slug: string; title: string; category: string; excerpt: string; content: string }`, `notes: NoteItem[]`, `getNoteBySlug(slug: string): NoteItem | undefined`. Task 3, 4, and 5 all consume these exact names/types.

- [ ] **Step 1: Write the data registry**

```ts
import harnessEngineeringContent from './notes/harness-engineering.md?raw';

export type NoteItem = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
};

export const notes: NoteItem[] = [
  {
    slug: 'harness-engineering',
    title: 'Harness Engineering',
    category: 'AI Agents',
    excerpt:
      'The practice of building the environment around an AI agent — context, constraints, tools, and feedback — so its work stays understandable, controllable, and verifiable.',
    content: harnessEngineeringContent,
  },
];

export const getNoteBySlug = (slug: string) =>
  notes.find((note) => note.slug === slug);
```

- [ ] **Step 2: Verify the import resolves**

Run: `npx nuxi typecheck`
Expected: no errors referencing `notes.ts` or the `.md?raw` import (see
Review Focus — this is the actual proof the ambient Vite type applies).

- [ ] **Step 3: Commit**

```bash
git add app/data/notes.ts
git commit -m "Add notes data registry with the Harness Engineering article"
```

---

### Task 3: Create the note detail page component

**Files:**
- Create: `app/components/notes/NoteDetailPage.vue`

**Interfaces:**
- Consumes: `NoteItem` type from `app/data/notes.ts` (Task 2).
- Produces: a component accepting prop `note: NoteItem`, used by Task 4.

- [ ] **Step 1: Write the component**

```vue
<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import type { NoteItem } from '~/data/notes';

const props = defineProps<{
  note: NoteItem;
}>();

// Content is our own trusted Markdown file, bundled at build time — not
// user input — so rendering it as HTML is not an XSS risk here.
const md = new MarkdownIt();
const renderedContent = md.render(props.note.content);
</script>

<template>
  <article class="note-page">
    <div class="note-container">
      <p class="eyebrow">{{ note.category }}</p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="note-body" v-html="renderedContent" />
    </div>
  </article>
</template>

<style scoped>
.note-page {
  padding: 3rem 0 4rem;
}

.note-container {
  width: min(100% - 32px, 760px);
  margin: 0 auto;
}

.eyebrow {
  margin-bottom: 14px;
}

.note-body :deep(h1) {
  margin: 0 0 20px;
  color: var(--color-heading);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.02;
  letter-spacing: -0.06em;
}

.note-body :deep(h2) {
  margin: 2.5rem 0 1rem;
  color: var(--color-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.note-body :deep(h3) {
  margin: 1.75rem 0 0.75rem;
  color: var(--color-heading);
  font-size: 1.2rem;
}

.note-body :deep(p) {
  margin: 0 0 1rem;
  color: var(--color-text);
  line-height: 1.7;
}

.note-body :deep(ul),
.note-body :deep(ol) {
  margin: 0 0 1rem;
  padding-left: 1.4rem;
  color: var(--color-text);
  line-height: 1.7;
}

.note-body :deep(li) {
  margin-bottom: 0.4rem;
}

.note-body :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.note-body :deep(hr) {
  margin: 2.5rem 0;
  border: 0;
  border-top: 1px solid var(--color-border);
}

.note-body :deep(strong) {
  color: var(--color-heading);
}

.note-body :deep(code) {
  padding: 0.15em 0.4em;
  border-radius: 6px;
  background: var(--color-surface-soft);
  font-size: 0.92em;
}

.note-body :deep(pre) {
  margin: 0 0 1.5rem;
  padding: 1.25rem;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface-soft);
}

.note-body :deep(pre code) {
  padding: 0;
  background: none;
}

.note-body :deep(table) {
  width: 100%;
  margin: 0 0 1.5rem;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.note-body :deep(th),
.note-body :deep(td) {
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--color-border);
  text-align: left;
}

.note-body :deep(th) {
  color: var(--color-heading);
  background: var(--color-surface-soft);
}

@media (max-width: 520px) {
  .note-page {
    padding: 2rem 0 3rem;
  }

  .note-container {
    width: min(100% - 24px, 760px);
  }

  .note-body :deep(table) {
    display: block;
    overflow-x: auto;
  }
}
</style>
```

- [ ] **Step 2: Verify lint and types are clean**

Run: `npx eslint app/components/notes/NoteDetailPage.vue`
Expected: 0 errors (the `no-v-html` warning is suppressed by the inline
comment above).

Run: `npx nuxi typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/notes/NoteDetailPage.vue
git commit -m "Add NoteDetailPage component rendering Markdown notes"
```

---

### Task 4: Create the `/notes/:slug` route

**Files:**
- Create: `app/pages/notes/[slug].vue`

**Interfaces:**
- Consumes: `getNoteBySlug` from `app/data/notes.ts` (Task 2), `NoteDetailPage` from Task 3.

- [ ] **Step 1: Write the route, mirroring `pages/projects/[slug].vue` exactly**

```vue
<script setup lang="ts">
import { getNoteBySlug } from '~/data/notes';
import NoteDetailPage from '~/components/notes/NoteDetailPage.vue';

const route = useRoute();

const note = getNoteBySlug(String(route.params.slug ?? ''));

if (!note) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Note not found',
  });
}
</script>

<template>
  <NoteDetailPage :note="note" />
</template>
```

- [ ] **Step 2: Verify the route builds and 404s correctly**

Run: `npm run generate`
Expected: `/notes/harness-engineering` prerenders successfully as a new
route alongside the existing ones.

Manually confirm in the plan (no test runner in this project): a request
for `/notes/does-not-exist` throws the 404 error above, not a blank page
— same mechanism already proven by the Projects route, so no separate
test is needed here.

- [ ] **Step 3: Commit**

```bash
git add "app/pages/notes/[slug].vue"
git commit -m "Add /notes/:slug route"
```

---

### Task 5: Wire the featured home card to the new article

**Files:**
- Modify: `app/components/home/HomeNotesSection.vue`

**Interfaces:**
- Consumes: `getNoteBySlug` from `app/data/notes.ts` (Task 2).

- [ ] **Step 1: Replace the script block**

```vue
<script setup lang="ts">
import { getNoteBySlug } from '~/data/notes';

const featuredNote = getNoteBySlug('harness-engineering')!;

const comingSoonNotes = [
  {
    category: 'AI Agents',
    title: 'AI agents vs workflows',
    description: 'Where fixed workflows end and agentic behavior begins.',
  },
  {
    category: 'AI Tools',
    title: 'MCP in simple words',
    description:
      'Why Model Context Protocol matters for tool-connected applications.',
  },
];
</script>
```

- [ ] **Step 2: Replace the template's `notes-list` block**

```vue
<div class="notes-list">
  <article class="note-card">
    <span class="note-date">{{ featuredNote.category }}</span>
    <h3>{{ featuredNote.title }}</h3>
    <p>{{ featuredNote.excerpt }}</p>
    <NuxtLink :to="`/notes/${featuredNote.slug}`" class="note-link">
      Read note
    </NuxtLink>
  </article>
  <article v-for="note in comingSoonNotes" :key="note.title" class="note-card">
    <span class="note-badge">Coming soon</span>
    <span class="note-date">{{ note.category }}</span>
    <h3>{{ note.title }}</h3>
    <p>{{ note.description }}</p>
  </article>
</div>
```

- [ ] **Step 3: Add the `.note-link` style, matching `HomeProjectsSection.vue`'s `.card-link` convention**

```css
.note-link {
  display: inline-block;
  margin-top: 12px;
  color: var(--color-heading);
  font-weight: 800;
  text-decoration: none;
}

.note-link:hover {
  color: var(--color-primary);
}
```

- [ ] **Step 4: Verify**

Run: `npx eslint app/components/home/HomeNotesSection.vue`
Expected: 0 errors.

Run: `npx nuxi typecheck`
Expected: no errors (confirms `getNoteBySlug('harness-engineering')!` is
valid against the `NoteItem` type).

- [ ] **Step 5: Commit**

```bash
git add app/components/home/HomeNotesSection.vue
git commit -m "Link the featured Notes card to the Harness Engineering article"
```

---

### Task 6: Update the architecture doc

**Files:**
- Modify: `docs/architecture.md`

- [ ] **Step 1: Add `/notes/:slug` to the Routing table**

Add a row: `| \`/notes/:slug\` | \`app/pages/notes/[slug].vue\` | Resolves slug via \`getNoteBySlug\`, throws 404 if missing |`

- [ ] **Step 2: Add `app/data/notes.ts` to the Data section**

Add a bullet under the existing `### 2. Data` section describing
`app/data/notes.ts`: types, `getNoteBySlug`, and that each note's body is
a statically-imported (`?raw`) Markdown file under `app/data/notes/`.

- [ ] **Step 3: Correct the now-stale "notes are entirely self-contained" line**

Replace the existing sentence in the Data section ("Same applies to CV
content (`pages/cv.vue`) and notes (`HomeNotesSection.vue`), which are
entirely self-contained and not backed by `data/`.") with:

```markdown
CV content (`pages/cv.vue`) stays fully self-contained. Notes
(`HomeNotesSection.vue`) source the featured note's title, category, and
excerpt from `app/data/notes.ts`; the remaining placeholder cards stay
inline until they get their own articles.
```

- [ ] **Step 4: Add `notes/NoteDetailPage.vue` to the Presentation section**

Add a bullet under `### 3. Presentation` describing
`notes/NoteDetailPage.vue`: renders a note's Markdown body via
`markdown-it` into `v-html`, styled with scoped `:deep()` selectors.

- [ ] **Step 5: Commit**

```bash
git add docs/architecture.md
git commit -m "Document the notes data flow and /notes/:slug route"
```

---

### Task 7: Full Definition of Done and branch review

**Files:** none (verification only)

- [ ] **Step 1: Lint the whole project**

Run: `npx eslint .`
Expected: 0 errors; only the same pre-existing `vue/html-self-closing`
warnings as before this branch (see `CLAUDE.md` — flag any new warning,
don't silently fix pre-existing ones).

- [ ] **Step 2: Typecheck the whole project**

Run: `npx nuxi typecheck`
Expected: 0 errors.

- [ ] **Step 3: Full static build**

Run: `npm run generate`
Expected: all routes prerender, including the new
`/notes/harness-engineering`, with no new warnings beyond the existing
`nitro-server`/cache-driver one already present before this branch.

- [ ] **Step 4: Review the diff**

Run: `git diff main --stat`
Expected: only the files listed in Tasks 1–6 — no `docs/model/`, no
secrets, no unrelated files.

- [ ] **Step 5: Push the branch**

```bash
git push -u origin feature/notes-first-article
```
