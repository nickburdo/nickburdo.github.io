export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
  featured?: boolean;
};

export type ProjectItem = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  screenshots: ProjectScreenshot[];
  implemented: string[];
  technicalDecisions: string[];
  lessonsLearned: string;
  links: ProjectLink[];
};

export const projects: ProjectItem[] = [
  {
    slug: 'job-tracker',
    title: 'Job Tracker',
    summary:
      'A focused workflow tool for tracking applications, interviews, and hiring pipeline progress.',
    stack: [
      'Nuxt 4',
      'TypeScript',
      'Prisma',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    screenshots: [
      {
        src: '/project-placeholder.svg',
        alt: 'Job Tracker dashboard placeholder',
        featured: true,
        caption:
          'Dashboard overview with active vacancies and interview stages.',
      },
      {
        src: '/project-placeholder.svg',
        alt: 'Job Tracker candidate card placeholder',
        caption:
          'Detailed application card with notes, status history, and follow-ups.',
      },
      {
        src: '/project-placeholder.svg',
        alt: 'Job Tracker analytics placeholder',
        caption:
          'Lightweight reporting view for conversion and pipeline visibility.',
      },
    ],
    implemented: [
      'Structured vacancy and application management flows.',
      'Interview stage tracking with quick status updates.',
      'Notes, reminders, and contextual metadata for each opportunity.',
      'Dashboard views for progress, activity, and decision-making.',
    ],
    technicalDecisions: [
      'Split the UI into reusable, state-aware modules to keep growth manageable.',
      'Used schema-driven backend models to support future reporting features.',
      'Kept user interactions fast with optimistic updates for common actions.',
      'Designed the page hierarchy around quick scanning on both desktop and mobile.',
    ],
    lessonsLearned:
      'How small workflow tools benefit from sharp prioritization and simple information architecture. How to balance product polish with maintainable data modeling. How to keep CRUD-heavy interfaces feeling responsive and lightweight.',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/example/job-tracker',
      },
      { label: 'Live Demo', href: 'https://demo.example.com/job-tracker' },
    ],
  },
  {
    slug: 'health-monitor',
    title: 'Health Monitor',
    summary:
      'A compact health tracking app for daily metrics, personal routines, and simple trend visibility.',
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Supabase', 'Charting', 'PWA'],
    screenshots: [
      {
        src: '/project-placeholder.svg',
        alt: 'Health Monitor home screen placeholder',
        featured: true,
        caption: 'Daily summary with quick inputs for key health signals.',
      },
      {
        src: '/project-placeholder.svg',
        alt: 'Health Monitor charts placeholder',
        caption:
          'Weekly and monthly visual patterns for user-friendly reporting.',
      },
      {
        src: '/project-placeholder.svg',
        alt: 'Health Monitor settings placeholder',
        caption: 'Custom tracking preferences and lightweight personalization.',
      },
    ],
    implemented: [
      'Fast entry flows for recurring health metrics.',
      'Basic filtering and trend visualization across selected periods.',
      'PWA-ready structure for repeat mobile use.',
      'Clear separation between dashboard, history, and settings areas.',
    ],
    technicalDecisions: [
      'Used a lightweight component structure to keep the app fast on mobile devices.',
      'Designed chart rendering around readability instead of heavy configuration.',
      'Kept state transitions predictable to support future offline behavior.',
      'Optimized interactions for frequent repeat use rather than rare long sessions.',
    ],
    lessonsLearned:
      'Health-related products need calm UX and very clear hierarchy. Small data-entry interfaces become much stronger when friction is aggressively reduced. Consistency matters more than feature count in habit-based products.',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/example/health-monitor',
      },
      { label: 'Live Demo', href: 'https://demo.example.com/health-monitor' },
    ],
  },
  {
    slug: 'hood',
    title: 'The Hood',
    summary:
      'A social and recruitment platform built around community, profiles, matching, and platform-scale product flows.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Material UI',
      'REST API',
      'Product Analytics',
    ],
    screenshots: [
      {
        src: '/project-placeholder.svg',
        alt: 'The Hood feed placeholder',
        featured: true,
        caption:
          'Social feed and content discovery designed for high-frequency use.',
      },
      {
        src: '/project-placeholder.svg',
        alt: 'The Hood profile placeholder',
        caption:
          'Profile and recruitment surfaces combining identity and opportunity signals.',
      },
      {
        src: '/project-placeholder.svg',
        alt: 'The Hood messaging placeholder',
        caption:
          'Communication and workflow views inside a larger platform context.',
      },
    ],
    implemented: [
      'Reusable front-end modules for core platform experiences.',
      'Profile, messaging, and recruitment-oriented user flows.',
      'API-driven interfaces for dynamic content and account data.',
      'Product-facing improvements for usability and performance.',
    ],
    technicalDecisions: [
      'Favored reusable UI patterns to keep a large product surface consistent.',
      'Worked with modular state boundaries to reduce cross-feature coupling.',
      'Approached performance as an ongoing product concern rather than a final pass.',
      'Aligned implementation decisions with long-term maintainability in a growing platform.',
    ],
    lessonsLearned:
      'Large product ecosystems reward consistency more than isolated feature speed. Cross-functional communication is critical when a platform touches many user journeys. Scalable front-end architecture needs both code discipline and product context.',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/example/the-hood',
      },
      { label: 'Live Demo', href: 'https://demo.example.com/the-hood' },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
