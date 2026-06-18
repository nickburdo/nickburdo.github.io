<template>
  <div class="cv-page">
    <section class="cv-hero">
      <div class="cv-container">
        <div class="cv-hero-card">
          <p class="cv-eyebrow cv-hero-eyebrow">Nick Burdo</p>
          <h1>Senior Front-End Developer</h1>
          <p class="cv-subtitle">
            React · Next.js · TypeScript · AI Integration
          </p>
          <p class="cv-summary">
            Portfolio-oriented resume focused on front-end architecture,
            scalable interfaces, performance, and practical product delivery.
          </p>
        </div>
      </div>
    </section>

    <section class="cv-section">
      <div class="cv-container">
        <article class="cv-panel cv-panel-stack">
          <p class="cv-eyebrow">Professional Summary</p>
          <div class="cv-copy">
            <p>
              Senior Front-End Developer with 10+ years of commercial experience
              building product interfaces, large-scale web applications, and
              maintainable front-end architecture for teams that need stability
              and speed.
            </p>
            <p>
              My focus is performance, scalability, clean technical decisions,
              and modern workflows including AI-assisted development and
              AI-powered product features.
            </p>
          </div>

          <p class="cv-eyebrow">Technical Skills</p>
          <div class="skill-groups">
            <section
              v-for="group in skillGroups"
              :key="group.title"
              class="skill-group"
            >
              <h2>{{ group.title }}</h2>
              <p>{{ group.items }}</p>
            </section>
          </div>
        </article>
      </div>
    </section>

    <section class="cv-section cv-section-soft">
      <div class="cv-container">
        <div class="section-heading">
          <p class="cv-eyebrow">Selected Projects</p>
          <h2>Experience presented through product work and delivery.</h2>
        </div>

        <div class="project-list">
          <article
            v-for="project in selectedProjects"
            :key="project.name"
            class="project-card"
          >
            <div class="project-card-top">
              <h3>{{ project.name }}</h3>
              <p class="project-meta">{{ project.company }}</p>
              <p class="project-stack">{{ project.stack }}</p>
            </div>

            <p class="project-description">{{ project.description }}</p>

            <ul class="detail-list">
              <li v-for="item in project.highlights" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="cv-section">
      <div class="cv-container">
        <div class="section-heading">
          <p class="cv-eyebrow">Experience</p>
          <h2>Commercial background across product, platform, and services.</h2>
        </div>

        <div class="experience-list">
          <article
            v-for="job in jobs"
            :key="job.company"
            class="experience-card"
          >
            <header class="experience-header">
              <div>
                <h3>{{ job.company }}</h3>
                <p class="experience-role">{{ job.role }}</p>
              </div>
              <p class="experience-period">{{ job.period }}</p>
            </header>

            <p class="experience-summary">{{ job.summary }}</p>

            <ul class="detail-list">
              <li v-for="item in job.contributions" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="cv-section">
      <div class="cv-container">
        <article class="cv-panel cv-panel-wide">
          <p class="cv-eyebrow">Languages & Additional</p>
          <div class="cv-grid cv-grid-info">
            <section>
              <h2>Languages</h2>
              <ul class="detail-list">
                <li>Ukrainian — Native</li>
                <li>Russian — Native</li>
                <li>English — B1 (Improving)</li>
              </ul>
            </section>

            <section>
              <h2>Additional</h2>
              <ul class="detail-list">
                <li>Experience working in distributed international teams</li>
                <li>Strong problem-solving and ownership mindset</li>
                <li>Available for remote opportunities</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const skillGroups = [
  {
    title: 'Front-End',
    items:
      'React, Next.js, TypeScript, JavaScript (ES6+), Angular (2+), Vue.js, Nuxt.js, HTML5, CSS3, Tailwind CSS, Material UI, Ant Design',
  },
  {
    title: 'Back-End & Databases',
    items:
      'Node.js, Express.js, NestJS, Prisma, Supabase, PostgreSQL, MongoDB, MySQL',
  },
  {
    title: 'APIs & Data',
    items: 'REST API, GraphQL, RESTful Services',
  },
  {
    title: 'AI & Modern Web',
    items:
      'OpenAI API, LLM Integration, Prompt Engineering, Embeddings, RAG Concepts, AI-powered Features, AI-assisted Development',
  },
  {
    title: 'Tools & Processes',
    items:
      'Git, Agile / Scrum, Nx Monorepo, TanStack Query, Axios, OAuth Authentication, CI/CD',
  },
];

const selectedProjects = [
  {
    name: 'The Hood Platform',
    company: 'Altamira Developers',
    description:
      'Large-scale social networking and recruitment platform for seafarers.',
    stack: 'React · Redux · Material UI',
    highlights: [
      'Built reusable UI components for core product flows.',
      'Integrated backend APIs and supported data-driven screens.',
      'Improved performance and overall user experience.',
      'Participated in technical planning and implementation decisions.',
    ],
  },
  {
    name: 'Educate',
    company: 'Altamira Developers',
    description:
      'Virtual education platform for teachers and students with interactive learning flows.',
    stack: 'React · Redux Toolkit · Material UI',
    highlights: [
      'Delivered responsive front-end functionality for product modules.',
      'Implemented maintainable state management patterns.',
      'Worked closely with design and backend teams on feature delivery.',
    ],
  },
  {
    name: 'General Pet Security',
    company: 'Altamira Developers',
    description:
      'Pet-tech platform for profile management, health records, and related services.',
    stack: 'Angular 17 · Vue 3 · Ant Design · Nx',
    highlights: [
      'Contributed to front-end architecture inside a large monorepo.',
      'Implemented UI across multiple branded themes.',
      'Connected applications with backend services and business flows.',
    ],
  },
];

const jobs = [
  {
    company: 'Altamira Developers',
    role: 'Senior Front-End Developer',
    period: 'October 2017 – Present',
    summary:
      'Delivered product work across social networking, education, recruitment, and pet-tech domains.',
    contributions: [
      'Delivered production features for multiple applications.',
      'Mentored junior developers and supported code review workflows.',
      'Participated in architecture discussions and technical planning.',
      'Collaborated with product, design, QA, and backend teams.',
      'Improved maintainability and performance through refactoring.',
    ],
  },
  {
    company: 'Iterios',
    role: 'Software Engineer',
    period: 'April 2014 – October 2017',
    summary:
      'Built commercial web applications for tourism business process automation.',
    contributions: [
      'Developed responsive interfaces for production systems.',
      'Integrated front-end applications with backend services.',
      'Worked inside Agile teams on delivery and support.',
      'Built strong foundations in React and modern front-end engineering.',
    ],
  },
];
</script>

<style scoped>
.cv-page {
  padding: 3rem 0 4rem;
}

.cv-container {
  width: min(100% - 32px, 1120px);
  margin: 0 auto;
}

.cv-hero {
  padding: 3rem 0 2rem;
}

.cv-hero-card,
.cv-panel,
.experience-card,
.project-card {
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.cv-hero-card {
  padding: 42px;
}

.cv-eyebrow {
  margin: 0 0 14px;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 800;
}

.cv-hero-eyebrow {
  letter-spacing: 0.08em;
  text-transform: none;
  font-size: clamp(1.17rem, 2.2vw, 1.5rem);
}

h1,
h2,
h3,
p,
ul {
  margin-top: 0;
}

h1 {
  max-width: 980px;
  margin-bottom: 16px;
  color: var(--color-heading);
  font-size: clamp(2.7rem, 5vw, 4.9rem);
  line-height: 0.98;
  letter-spacing: -0.065em;
}

h2 {
  color: var(--color-heading);
  font-size: clamp(1.55rem, 3vw, 2.35rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
}

h3 {
  margin-bottom: 0.35rem;
  color: var(--color-heading);
  font-size: 1.4rem;
  line-height: 1.2;
}

.cv-subtitle {
  margin-bottom: 1.25rem;
  color: var(--color-heading);
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 700;
}

.cv-summary,
.cv-copy,
.skill-group p,
.experience-summary,
.experience-period,
.experience-role,
.project-description,
.project-meta,
.detail-list {
  color: var(--color-muted);
}

.cv-summary {
  max-width: 46rem;
  font-size: 1.08rem;
}

.cv-section {
  padding: 1rem 0 2rem;
}

.cv-section-soft {
  background: var(--color-surface-tint);
}

.cv-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 24px;
}

.cv-grid-info {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.cv-grid-info h2 {
  margin-bottom: 1rem;
}

.cv-panel {
  padding: 32px;
}

.cv-panel-wide {
  padding: 32px;
}

.cv-panel-stack {
  display: grid;
  gap: 0;
}

.cv-panel-stack .cv-eyebrow + .cv-copy + .cv-eyebrow {
  margin-top: 2.5rem;
}

.cv-copy,
.skill-groups,
.experience-list,
.project-list {
  display: grid;
  gap: 1rem;
}

.skill-group + .skill-group {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.section-heading {
  max-width: 800px;
  margin-bottom: 32px;
}

.project-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.project-card,
.experience-card {
  padding: 32px;
}

.project-card-top,
.experience-header {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
}

.project-card-top {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.experience-header {
  margin-bottom: 1rem;
}

.project-meta {
  font-size: 0.95rem;
  color: var(--color-muted);
  font-weight: 500;
  margin-bottom: 0;
}

.project-stack {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0;
}

.project-description,
.experience-summary {
  margin-bottom: 1.25rem;
}

.experience-role {
  font-weight: 700;
}

.detail-list {
  display: grid;
  gap: 0.65rem;
  padding-left: 1.25rem;
}

@media (max-width: 980px) {
  .project-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .cv-grid,
  .cv-grid-info {
    grid-template-columns: 1fr;
  }

  .project-card-top,
  .experience-header {
    flex-direction: column;
    gap: 0.4rem;
  }
}

@media (max-width: 520px) {
  .cv-container {
    width: min(100% - 24px, 1120px);
  }

  .cv-page {
    padding: 2rem 0 3rem;
  }

  .cv-hero-card,
  .cv-panel,
  .cv-panel-wide,
  .project-card,
  .experience-card {
    padding: 24px;
  }
}
</style>
