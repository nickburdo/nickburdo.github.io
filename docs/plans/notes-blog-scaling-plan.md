# Mini-Blog Scaling Plan

**Trigger:** start this once `app/data/notes.ts` has more than 3
`PublishedNote` entries. Below that, the current home-page-only list is
enough; building an index/filter UI for 2-3 cards is premature.

**Status:** roadmap, not an execution-ready plan. Unlike
`docs/plans/notes-first-article-plan.md`, this doesn't lock in exact code
yet — several UX/design questions below are genuinely open and need a
short discussion at kickoff, once there's enough real content to judge
against. Treat each numbered section as its own future `brainstorming` →
short design → implementation pass, not one big task list.

## Current state (context for whoever picks this up)

- `app/data/notes.ts`: `NoteItem = PublishedNote | UpcomingNote`
  discriminated union. `PublishedNote` has `slug`, `title`, `category`,
  `excerpt`, `content`. No date field yet.
- `HomeNotesSection.vue` renders **every** entry in `notes` via one
  `v-for` — published notes get a `/notes/:slug` link, upcoming ones get
  a "Coming soon" badge. No pagination, filtering, or sorting; array
  order in `notes.ts` is display order.
- `.note-card` markup currently has exactly one text slot above the
  title (`.note-date`) — and it displays `note.category`, not a date.
  This matters for section 3 below: adding a real publish date needs a
  place to put it that doesn't collide with category.
- No `/notes` index route exists — `app/pages/notes/[slug].vue` is the
  only route under `/notes`.
- See `docs/architecture.md` (Data / Presentation sections) and
  `docs/notes/how-to-add-an-article.md` for the full current model.

---

## 1. `/notes` index page

**Goal:** a page listing all notes, visually consistent with the current
home Notes section, plus a link to it from that section.

**Builds on:** the existing `.note-card`/`.note-badge`/`.note-link`
styles and the `notes` array — no new data shape needed for this part
alone.

**Open questions to resolve before starting:**
- Does `/notes` list `UpcomingNote` "Coming soon" cards too, or only
  published ones? (Showing them keeps parity with the home section;
  hiding them makes `/notes` a pure article archive.)
- Does the home Notes section keep showing *every* note once `/notes`
  exists, or shrink to a "recent N" teaser (e.g. latest 3) with a
  "View all notes" link doing the rest of the work? This overlaps with
  section 3 (needs a defined sort order to pick "recent N" from) — worth
  deciding together with that section rather than first.
- This is the site's first "view all X" link pattern (Projects and CV
  don't have one) — worth a quick look at whether the link/button style
  should introduce a new convention or reuse something existing (e.g.
  `.button-secondary` from the hero).

**Rough scope:**
- [ ] Extract the card markup (badge/title/excerpt/link) out of
      `HomeNotesSection.vue` into a small presentational `NoteCard.vue`
      (`app/components/notes/`), taking a `note: NoteItem` prop — avoids
      duplicating the same template/CSS once both the home section and
      the index page render cards.
- [ ] Add `app/pages/notes/index.vue`, using `NoteCard.vue` in a
      `v-for` over `notes` (or a filtered subset, per the open question
      above).
- [ ] Add a link from `HomeNotesSection.vue` to `/notes`.
- [ ] Update `docs/architecture.md`'s routing table and
      `docs/notes/how-to-add-an-article.md` if the home section's
      behavior changes (e.g. "recent N" teaser).

## 2. Category filter

**Goal:** filter the note list (on `/notes`) by `category`.

**Builds on:** section 1 existing — filtering a single home-page teaser
list isn't worth it at that scale.

**Open questions to resolve before starting:**
- Categories are free-text strings today (`'AI Agents'`, `'AI Tools'`,
  …) — typo-prone as more notes are added. Worth deciding: keep them
  free-text and derive the filter's options dynamically from whatever's
  actually used in `notes.ts` (simplest, no new source of truth), or
  introduce a fixed `category` union/enum to catch typos at compile
  time? Recommend starting with the dynamic-derive approach (YAGNI) and
  only introducing an enum if categories actually start drifting in
  practice.
- No filter-control UI pattern exists anywhere in this codebase yet
  (pills? tabs? a `<select>`?) — this is a real design decision, not
  just an engineering one; worth a short `frontend-design`-style pass
  once there's enough real category variety to design against.

**Rough scope:**
- [ ] Decide the filter control's visual pattern (see above).
- [ ] Client-side only (`ref` + `computed` on the index page) — the
      site is fully static, no server-side filtering possible or needed
      at this content scale.
- [ ] Empty-state: what the page shows when a filter matches zero notes.

## 3. Publication date: field, sort, filter

**Goal:** add a real publish date to notes, default-sort the list by it
(newest first is the presumed default — confirm), and allow narrowing by
date.

**Builds on:** section 1's index page — sorting affects card order
there and (if the home section becomes a "recent N" teaser) on the home
page too.

**Open questions to resolve before starting:**
- **"Filter by publication date" needs a concrete UX, not just the
  word "filter."** Options: a year/month grouping (e.g. an "Archive"
  sidebar), a date-range picker, or just confirming that "filter" here
  actually means "sort" and no separate filter control is wanted. Don't
  guess — clarify with the user before building anything here.
- Where does the date live visually on the card? `.note-date` currently
  shows `category` (see Current state above) — adding a real date needs
  either a second text slot on the card or repurposing that one and
  moving category elsewhere (e.g. as a small tag near the badge).
- Date format for `PublishedNote.publishedAt`: plain ISO string
  (`'2026-09-23'`) is simplest and sorts correctly with plain string
  comparison — no date library needed for that alone. Confirm no
  fancier display (relative dates like "3 days ago", localization) is
  wanted, which would change this answer.

**Rough scope:**
- [ ] Add `publishedAt: string` to `PublishedNote` (not `UpcomingNote`
      — it has no publish date yet). Backfill a real date for
      `harness-engineering` and any other published notes at that point.
- [ ] Sort: `[...notes].filter(isPublished).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))`
      — no new dependency needed for ISO-string dates.
- [ ] Resolve the card-layout question above and update
      `NoteCard.vue`/`.note-date` accordingly.
- [ ] Build whatever the clarified "filter by date" UX turns out to be.

---

## Suggested order

1 → 3 → 2. Reasoning: the index page (1) is what makes filtering and
sorting meaningful UI features in the first place. Chronological sort
(3) is a baseline expectation for any article list and is small in
scope once the date field exists, so it's worth doing before the
category filter (2), which is more design-work-heavy (new control
pattern) and easiest to slot in last without disturbing 1 or 3. This is
a suggestion, not a constraint — resequence if it stops making sense
once there's real content to look at.
