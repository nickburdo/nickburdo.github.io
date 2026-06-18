<template>
  <section id="notes" class="section section-soft">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Small blog</p>
        <h2>Notes</h2>
      </div>

      <div class="notes-list">
        <article v-for="note in notes" :key="note.title" class="note-card">
          <span class="note-badge">Coming soon</span>
          <span class="note-date">{{ note.category }}</span>
          <h3>{{ note.title }}</h3>
          <p>{{ note.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const notes = [
  {
    category: 'AI Basics',
    title: 'What is RAG?',
    description:
      'A short explanation of retrieval-augmented generation in simple words.',
  },
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

.notes-list {
  display: grid;
  gap: 16px;
}

.note-card {
  position: relative;
  padding: 24px 28px;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.note-card p {
  color: var(--color-muted);
}

.note-badge {
  position: absolute;
  top: 24px;
  right: 28px;
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.note-date {
  display: inline-block;
  margin-bottom: 8px;
  color: var(--color-accent);
  font-size: 0.84rem;
  font-weight: 800;
}

@media (max-width: 520px) {
  .note-card {
    padding: 24px;
  }

  .note-badge {
    top: 20px;
    right: 24px;
  }
}
</style>
