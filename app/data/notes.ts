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
