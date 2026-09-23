import harnessEngineeringContent from './notes/harness-engineering.md?raw';

export type NoteItem = {
  slug: string;
  // Shown on the home card. Must match the note's own `.md` file's
  // top-level `# H1` (rendered as the article page's title) — nothing
  // enforces this automatically, keep them in sync by hand.
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
