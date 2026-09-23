<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import type { NoteItem } from '~/data/notes';

const props = defineProps<{
  note: NoteItem;
}>();

// Content is our own trusted Markdown file, bundled at build time — not
// user input — so rendering it as HTML is not an XSS risk here.
const md = new MarkdownIt();
const renderedContent = md.render(props.note.content);
</script>

<template>
  <article class="note-page">
    <div class="note-container">
      <p class="eyebrow">{{ note.category }}</p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="note-body" v-html="renderedContent" />
    </div>
  </article>
</template>

<style scoped>
.note-page {
  padding: 3rem 0 4rem;
}

.note-container {
  width: min(100% - 32px, 760px);
  margin: 0 auto;
}

.eyebrow {
  margin-bottom: 14px;
}

.note-body :deep(h1) {
  margin: 0 0 20px;
  color: var(--color-heading);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.02;
  letter-spacing: -0.06em;
}

.note-body :deep(h2) {
  margin: 2.5rem 0 1rem;
  color: var(--color-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.note-body :deep(h3) {
  margin: 1.75rem 0 0.75rem;
  color: var(--color-heading);
  font-size: 1.2rem;
}

.note-body :deep(p) {
  margin: 0 0 1rem;
  color: var(--color-text);
  line-height: 1.7;
}

.note-body :deep(ul),
.note-body :deep(ol) {
  margin: 0 0 1rem;
  padding-left: 1.4rem;
  color: var(--color-text);
  line-height: 1.7;
}

.note-body :deep(li) {
  margin-bottom: 0.4rem;
}

.note-body :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.note-body :deep(hr) {
  margin: 2.5rem 0;
  border: 0;
  border-top: 1px solid var(--color-border);
}

.note-body :deep(strong) {
  color: var(--color-heading);
}

.note-body :deep(code) {
  padding: 0.15em 0.4em;
  border-radius: 6px;
  background: var(--color-surface-soft);
  font-size: 0.92em;
}

.note-body :deep(pre) {
  margin: 0 0 1.5rem;
  padding: 1.25rem;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface-soft);
}

.note-body :deep(pre code) {
  padding: 0;
  background: none;
}

.note-body :deep(table) {
  width: 100%;
  margin: 0 0 1.5rem;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.note-body :deep(th),
.note-body :deep(td) {
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--color-border);
  text-align: left;
}

.note-body :deep(th) {
  color: var(--color-heading);
  background: var(--color-surface-soft);
}

@media (max-width: 520px) {
  .note-page {
    padding: 2rem 0 3rem;
  }

  .note-container {
    width: min(100% - 24px, 760px);
  }

  .note-body :deep(table) {
    display: block;
    overflow-x: auto;
  }
}
</style>
