<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Featured work</p>
        <h2>Projects</h2>
      </div>

      <div class="cards-grid">
        <article v-for="project in projects" :key="project.title" class="card">
          <h3>{{ project.title }}</h3>
          <p class="card-stack">{{ project.stack }}</p>
          <p>{{ project.description }}</p>
          <NuxtLink :to="project.link" class="card-link">View project</NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    title: 'Job Tracker',
    stack: 'Nuxt 4 / Prisma / Supabase / PostgreSQL',
    description:
      'Application tracking tool with authentication, demo mode and row-level security.',
    link: '/projects/job-tracker',
  },
  {
    title: 'Health Monitor',
    stack: 'Nuxt 4 / SVG charts / PWA',
    description:
      'Personal health metrics tracker with quick input, filters and lightweight visual reports.',
    link: '/projects/health-monitor',
  },
  {
    title: 'The Hood',
    stack: 'Next.js / React / TypeScript',
    description:
      'Recruitment platform experience with research into AI-powered candidate matching.',
    link: '/projects/hood',
  },
];
</script>

<style scoped>
h2,
h3,
p {
  margin-top: 0;
}

h2 {
  color: var(--color-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.055em;
}

h3 {
  margin-bottom: 10px;
  color: var(--color-heading);
  font-size: 1.25rem;
  line-height: 1.25;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.card {
  display: flex;
  min-height: 260px;
  flex-direction: column;
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.card-stack {
  margin-bottom: 18px;
  color: var(--color-primary);
  font-size: 0.92rem;
  font-weight: 800;
}

.card p:not(.card-stack) {
  color: var(--color-muted);
}

.card-link {
  margin-top: auto;
  color: var(--color-heading);
  font-weight: 800;
  text-decoration: none;
}

.card-link:hover {
  color: var(--color-primary);
}

@media (max-width: 860px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .card {
    padding: 24px;
  }
}
</style>
