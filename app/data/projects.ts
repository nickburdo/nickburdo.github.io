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
      'A personal application management tool designed to organize vacancies, track interview stages, and maintain a clear overview of the hiring pipeline.',
    stack: [
      'Nuxt 4',
      'TypeScript',
      'Prisma',
      'Supabase',
      'PostgreSQL',
      'RLS',
      'Tailwind CSS',
    ],
    screenshots: [
      {
        src: '/data/projects/job-tracker/dashboard.jpg',
        featured: true,
        alt: 'Job search overview dashboard',
        caption:
          'Overview dashboard with application statistics, follow-up queue, and recent activity.',
      },
      {
        src: '/data/projects/job-tracker/analytics.jpg',
        alt: 'Application stage analytics',
        caption:
          'Stage distribution and pipeline analytics showing progress across the hiring process.',
      },
      {
        src: '/data/projects/job-tracker/applications.jpg',
        alt: 'Applications list with filters and search',
        caption:
          'Applications table with search, status filters, interview stages, and follow-up dates.',
      },
    ],
    implemented: [
      'Created CRUD flows for managing job applications and interview stages.',
      'Added filtering, sorting, and search capabilities for fast navigation.',
      'Implemented notes, salary ranges, follow-up dates, and metadata for each application.',
      'Built dashboard widgets to visualize the current state of the job search process.',
      'Added demo mode and role-based access with Supabase authentication.',
    ],
    technicalDecisions: [
      'Chose Nuxt 4 and TypeScript for maintainability and type safety.',
      'Used Prisma with PostgreSQL to keep the data layer simple and scalable.',
      'Implemented Row Level Security policies in Supabase to separate demo and authenticated users.',
      'Structured API handlers and UI components to simplify future feature additions.',
      'Focused on responsive layouts and quick interactions for everyday use.',
    ],
    lessonsLearned:
      'Building productivity tools taught me how important information architecture is. I gained practical experience with Prisma migrations, Supabase authentication, Row Level Security, and designing CRUD-heavy interfaces that remain responsive and easy to navigate.',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/nickburdo/job-tracker',
      },
      { label: 'Live Demo', href: 'https://job-tracker-b86q.onrender.com/' },
    ],
  },
  {
    slug: 'health-monitor',
    title: 'Health Monitor',
    summary:
      'A personal health tracking application for monitoring blood glucose, blood pressure, weight, and symptoms with simple visual trends and quick daily data entry.',
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'IndexDB'],
    screenshots: [
      {
        src: '/data/projects/health-monitor/dashboard.jpg',
        featured: true,
        alt: 'Health summary dashboard',
        caption:
          'Dashboard showing recent readings, summary cards, and trend charts for key health metrics.',
      },
      {
        src: '/data/projects/health-monitor/glucose.jpg',
        alt: 'Blood glucose trends and history',
        caption:
          'Blood glucose tracking with fasting and post-meal measurements visualized over time.',
      },
      {
        src: '/data/projects/health-monitor/symptoms.jpg',
        alt: 'Symptoms history and frequency',
        caption:
          'Symptom frequency overview and detailed history for the selected period.',
      },
    ],
    implemented: [
      'Added separate tracking flows for glucose, blood pressure, weight, and symptoms.',
      'Built dashboards with charts and statistics for different periods.',
      'Implemented quick-entry forms optimized for frequent use.',
      'Added filtering and historical views for long-term tracking.',
      'Prepared the application as a Progressive Web App for mobile devices.',
    ],
    technicalDecisions: [
      'Used Nuxt 4 and TypeScript to keep the codebase simple and maintainable.',
      'Preferred lightweight SVG charts instead of heavy chart libraries.',
      'Organized features into independent modules to reduce coupling.',
      'Focused on mobile usability and fast repeat interactions.',
      'Designed data structures to support future extensions without major refactoring.',
    ],
    lessonsLearned:
      'This project reinforced the importance of calm UX and consistency in habit-oriented applications. I learned that reducing friction during data entry is often more valuable than adding more features.',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/nickburdo/health-monitor',
      },
      { label: 'Live Demo', href: 'https://health-monitor-new.pages.dev/' },
    ],
  },
  {
    slug: 'hood',
    title: 'The Hood',
    summary:
      'A large-scale social and recruitment platform serving maritime professionals with social networking, job management, and candidate matching features.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Material UI',
      'REST API',
      'TanStack Query',
    ],
    screenshots: [
      {
        src: '/data/projects/hood/dashboard.jpg',
        featured: true,
        alt: 'Recruitment dashboard for job portals',
        caption:
          'Recruitment dashboard with job statistics, applicant stages, and hiring performance metrics.',
      },
      {
        src: '/data/projects/hood/job-portal-overview.jpg',
        alt: 'Company portal overview',
        caption:
          'Portal overview with company information and recruitment team management.',
      },
      {
        src: '/data/projects/hood/career-hub-jobs-list.jpg',
        alt: 'Job management table',
        caption:
          'Job management workspace with search, filters, and configurable columns.',
      },
      {
        src: '/data/projects/hood/timeline.jpg',
        alt: 'Community timeline feed',
        caption:
          'Social timeline where members share updates, opportunities, and community posts.',
      },
      {
        src: '/data/projects/hood/social-media-jobs-list.jpg',
        alt: 'Candidate job feed',
        caption:
          'Candidate-facing job feed with search and quick access to open positions.',
      },
    ],
    implemented: [
      'Developed and maintained multiple front-end modules across the platform.',
      'Built interfaces for profiles, feeds, job management, and recruitment workflows.',
      'Integrated REST APIs and optimized data-driven pages.',
      'Improved usability and performance of existing features.',
      'Contributed to scalable UI patterns used across different parts of the product.',
    ],
    technicalDecisions: [
      'Relied on reusable React components and Material UI to maintain consistency.',
      'Used modular architecture to isolate features and reduce complexity.',
      'Treated performance optimization as an ongoing process rather than a final step.',
      'Collaborated closely with backend developers and product stakeholders.',
      'Focused on maintainability and scalability for a continuously evolving product.',
    ],
    lessonsLearned:
      'Working on a large product taught me the importance of consistency, communication, and long-term thinking. Large applications benefit more from predictable architecture and reusable patterns than from isolated optimizations.',
    links: [
      { label: 'Welcome aboard!', href: 'https://social.the-hood.com/auth' },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
