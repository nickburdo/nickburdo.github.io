import harnessEngineeringContent from './notes/harness-engineering.md?raw';

// A published note has a real page at /notes/<slug> and a Markdown body.
export type PublishedNote = {
  slug: string;
  // Shown on the home card. Must match this note's own `.md` file's
  // top-level `# H1` (rendered as the article page's title) — nothing
  // enforces this automatically, keep them in sync by hand.
  title: string;
  category: string;
  excerpt: string;
  content: string;
};

// An upcoming note is a "Coming soon" card on the home page — no page
// or content yet, just a title/category placeholder.
export type UpcomingNote = {
  slug: null;
  title: string;
  category: string;
  excerpt: string;
  content: null;
};

export type NoteItem = PublishedNote | UpcomingNote;

export const notes: NoteItem[] = [
  {
    slug: 'harness-engineering',
    title: 'Harness Engineering',
    category: 'AI Agents',
    excerpt:
      'The practice of building the environment around an AI agent — context, constraints, tools, and feedback — so its work stays understandable, controllable, and verifiable.',
    content: harnessEngineeringContent,
  },
  {
    slug: null,
    category: 'AI Agents',
    title: 'Harness Engineering — Quick-Start Cheat Sheet',
    excerpt:
      'It is a practical model for designing and analyzing a harness, not a formal industry standard.',
    content: null,
  },
  {
    slug: null,
    category: 'AI Tools',
    title: 'MCP in simple words',
    excerpt:
      'Why Model Context Protocol matters for tool-connected applications.',
    content: null,
  },
];

export const getNoteBySlug = (slug: string): PublishedNote | undefined =>
  notes.find((note): note is PublishedNote => note.slug === slug);
