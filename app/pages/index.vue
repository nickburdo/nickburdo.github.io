<template>
  <div class="home-page">
    <section id="home" class="hero section">
      <div class="container hero-grid">
        <div class="hero-content">
          <p class="eyebrow">Frontend Developer</p>
          <h1>10+ years building web applications</h1>
          <p class="hero-text">
            Frontend Development • Product Engineering • AI Integration
          </p>
          <p class="hero-description">
            I build responsive, user-friendly interfaces and explore practical
            AI-powered product features.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" href="#contact">View Resume</a>
            <a class="button button-secondary" href="#projects">Projects</a>
            <a class="button button-link" href="#contact">Contact</a>
          </div>
        </div>

        <div class="hero-avatar-wrap">
          <img
            class="hero-avatar"
            src="/avatar.png"
            alt="Illustrated portrait of Nick Burdo"
          />
        </div>
      </div>
    </section>

    <section id="projects" class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Featured work</p>
          <h2>Projects</h2>
        </div>

        <div class="cards-grid">
          <article
            v-for="project in projects"
            :key="project.title"
            class="card"
          >
            <h3>{{ project.title }}</h3>
            <p class="card-stack">{{ project.stack }}</p>
            <p>{{ project.description }}</p>
            <a :href="project.link" class="card-link">View project</a>
          </article>
        </div>
      </div>
    </section>

    <section id="notes" class="section section-soft">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Small blog</p>
          <h2>Notes</h2>
        </div>

        <div class="notes-list">
          <article v-for="note in notes" :key="note.title" class="note-card">
            <span class="note-date">{{ note.category }}</span>
            <h3>{{ note.title }}</h3>
            <p>{{ note.description }}</p>
            <a :href="note.link">Read note</a>
          </article>
        </div>
      </div>
    </section>

    <section id="about" class="section">
      <div class="container about-card">
        <div>
          <p class="eyebrow">About</p>
          <h2>
            Experienced frontend developer focused on practical product work.
          </h2>
        </div>

        <div class="about-text">
          <p>
            Frontend developer with 10+ years of experience building web
            applications for startups and enterprise teams.
          </p>
          <p>
            Currently focused on modern React/Nuxt ecosystems and practical AI
            integration into web products.
          </p>
        </div>
      </div>
    </section>

    <section id="contact" class="section contact-section">
      <div class="container contact-card">
        <p class="eyebrow">Contact</p>
        <h2>Let's talk.</h2>
        <p>The fastest way to reach me is by email or LinkedIn.</p>

        <div class="contact-links">
          <a href="mailto:your-email@example.com">Email</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    title: 'Job Tracker',
    stack: 'Nuxt 4 • Prisma • Supabase • PostgreSQL',
    description:
      'Application tracking tool with authentication, demo mode and row-level security.',
    link: '#',
  },
  {
    title: 'Health Monitor',
    stack: 'Nuxt 4 • SVG charts • PWA',
    description:
      'Personal health metrics tracker with quick input, filters and lightweight visual reports.',
    link: '#',
  },
  {
    title: 'The Hood',
    stack: 'Next.js • React • TypeScript',
    description:
      'Recruitment platform experience with research into AI-powered candidate matching.',
    link: '#',
  },
];

const notes = [
  {
    category: 'AI Basics',
    title: 'What is RAG?',
    description:
      'A short explanation of retrieval-augmented generation in simple words.',
    link: '#',
  },
  {
    category: 'AI Agents',
    title: 'AI agents vs workflows',
    description: 'Where fixed workflows end and agentic behavior begins.',
    link: '#',
  },
  {
    category: 'AI Tools',
    title: 'MCP in simple words',
    description:
      'Why Model Context Protocol matters for tool-connected applications.',
    link: '#',
  },
];
</script>

<style scoped>
.home-page {
  padding-bottom: 1.5rem;
}

.container {
  width: min(100% - 32px, 1120px);
  margin: 0 auto;
}

.section {
  padding: 88px 0;
}

.section-soft {
  background: var(--color-surface-tint);
}

.hero {
  padding-top: 96px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.72fr);
  align-items: center;
  gap: 56px;
}

.eyebrow {
  margin-bottom: 14px;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 800;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 760px;
  margin-bottom: 20px;
  color: var(--color-heading);
  font-size: clamp(2.8rem, 7vw, 5.8rem);
  line-height: 0.96;
  letter-spacing: -0.075em;
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

.hero-text {
  margin-bottom: 16px;
  color: var(--color-heading);
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  font-weight: 700;
}

.hero-description {
  max-width: 620px;
  margin-bottom: 32px;
  color: var(--color-muted);
  font-size: 1.12rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  font-weight: 800;
  text-decoration: none;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease,
    color 160ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  color: var(--color-white);
  background: var(--color-primary);
  box-shadow: 0 14px 34px var(--color-primary-shadow);
}

.button-secondary {
  color: var(--color-heading);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.button-link {
  color: var(--color-primary);
}

.hero-avatar-wrap {
  display: grid;
  place-items: center;
  min-height: 420px;
}

.hero-avatar {
  width: 100%;
  filter: drop-shadow(0 22px 46px var(--color-avatar-shadow));
}

.section-heading {
  max-width: 720px;
  margin-bottom: 32px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.card,
.note-card,
.about-card,
.contact-card {
  border: 1px solid var(--color-border);
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.card {
  display: flex;
  min-height: 260px;
  flex-direction: column;
  padding: 28px;
  border-radius: 28px;
}

.card-stack {
  margin-bottom: 18px;
  color: var(--color-primary);
  font-size: 0.92rem;
  font-weight: 800;
}

.card p:not(.card-stack),
.about-text,
.contact-card > p,
.note-card p {
  color: var(--color-muted);
}

.card-link {
  margin-top: auto;
  color: var(--color-heading);
  font-weight: 800;
  text-decoration: none;
}

.card-link:hover,
.note-card a:hover,
.contact-links a:hover {
  color: var(--color-primary);
}

.notes-list {
  display: grid;
  gap: 16px;
}

.note-card {
  padding: 24px 28px;
  border-radius: 18px;
}

.note-card a {
  color: var(--color-primary);
  font-weight: 800;
  text-decoration: none;
}

.note-date {
  display: inline-block;
  margin-bottom: 8px;
  color: var(--color-accent);
  font-size: 0.84rem;
  font-weight: 800;
}

.about-card {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: 44px;
  padding: 42px;
  border-radius: 28px;
}

.about-text {
  display: grid;
  gap: 1rem;
  font-size: 1.05rem;
}

.contact-section {
  padding-top: 24px;
}

.contact-card {
  max-width: 760px;
  margin: 0 auto;
  padding: 42px;
  border-radius: 28px;
  text-align: center;
}

.contact-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 26px;
}

.contact-links a {
  padding: 12px 18px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-bg);
  color: var(--color-heading);
  font-weight: 800;
  text-decoration: none;
}

@media (max-width: 860px) {
  .section {
    padding: 68px 0;
  }

  .hero {
    padding-top: 64px;
  }

  .hero-grid,
  .about-card {
    grid-template-columns: 1fr;
  }

  .hero-avatar-wrap {
    order: -1;
    min-height: auto;
  }

  .hero-avatar {
    width: min(100%, 320px);
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .container {
    width: min(100% - 24px, 1120px);
  }

  h1 {
    font-size: 3rem;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .button {
    width: 100%;
  }

  .card,
  .note-card,
  .about-card,
  .contact-card {
    padding: 24px;
  }
}
</style>
