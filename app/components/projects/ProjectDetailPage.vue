<script setup lang="ts">
import type { ProjectItem, ProjectScreenshot } from '~/data/projects';

const props = defineProps<{
  project: ProjectItem;
}>();
const project = props.project;

const activeScreenshot = ref<ProjectScreenshot | null>(null);
const featuredScreenshot = computed(
  () =>
    project.screenshots.find((shot) => shot.featured) ?? project.screenshots[0],
);
const galleryScreenshots = computed(() =>
  project.screenshots.filter((shot) => shot !== featuredScreenshot.value),
);

const openLightbox = (shot: ProjectScreenshot) => {
  activeScreenshot.value = shot;
};

const closeLightbox = () => {
  activeScreenshot.value = null;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="project-page">
    <section class="project-hero">
      <div class="project-container">
        <div class="project-hero-card">
          <p class="project-eyebrow">Project</p>
          <h1>{{ project.title }}</h1>
          <p class="project-summary">{{ project.summary }}</p>

          <div class="project-actions">
            <a
              v-for="link in project.links"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="project-action"
            >
              {{ link.label }}
            </a>
          </div>

          <div class="project-stack-block">
            <p class="project-eyebrow">Technology Stack</p>
            <div class="project-stack-list">
              <span
                v-for="item in project.stack"
                :key="item"
                class="project-stack-item"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="project-section project-section-soft">
      <div class="project-container">
        <div class="project-heading">
          <p class="project-eyebrow">Screenshots</p>
        </div>

        <figure
          v-if="featuredScreenshot"
          class="project-shot project-shot-featured"
        >
          <button
            class="project-shot-button"
            :class="{ 'project-shot-button-featured': true }"
            type="button"
            @click="openLightbox(featuredScreenshot)"
          >
            <img :src="featuredScreenshot.src" :alt="featuredScreenshot.alt" />
          </button>
          <figcaption class="project-shot-caption">
            <span class="project-shot-title">{{ featuredScreenshot.alt }}</span>
            <span>{{ featuredScreenshot.caption }}</span>
          </figcaption>
        </figure>

        <div class="project-gallery project-gallery-secondary">
          <figure
            v-for="shot in galleryScreenshots"
            :key="shot.alt"
            class="project-shot"
          >
            <button
              class="project-shot-button"
              type="button"
              @click="openLightbox(shot)"
            >
              <img :src="shot.src" :alt="shot.alt" />
            </button>
          </figure>
        </div>
      </div>
    </section>

    <section class="project-section">
      <div class="project-container project-grid">
        <article class="project-card">
          <p class="project-eyebrow">Features</p>
          <ul class="project-list project-list-check">
            <li v-for="item in project.implemented" :key="item">
              <svg
                class="project-list-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="m9.2 16.2-4.2-4.2 1.4-1.4 2.8 2.8 8.1-8.1 1.4 1.4z" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </article>

        <article class="project-card">
          <p class="project-eyebrow">Engineering</p>
          <ul class="project-list project-list-arrow">
            <li v-for="item in project.technicalDecisions" :key="item">
              <svg
                class="project-list-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M5 11h11.2L13 7.8 14.4 6.4 20.4 12.4 14.4 18.4 13 17l3.2-3.2H5z"
                />
              </svg>
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="project-section">
      <div class="project-container">
        <article class="project-card project-card-wide">
          <p class="project-eyebrow">Lessons Learned</p>
          <p class="project-lessons">{{ project.lessonsLearned }}</p>
        </article>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="activeScreenshot"
          class="project-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="activeScreenshot.alt"
          @click.self="closeLightbox"
        >
          <div class="project-lightbox-panel">
            <button
              class="project-lightbox-close"
              type="button"
              @click="closeLightbox"
            >
              Close
            </button>
            <img :src="activeScreenshot.src" :alt="activeScreenshot.alt" />
            <figcaption class="project-lightbox-caption">
              <span class="project-shot-title">{{ activeScreenshot.alt }}</span>
              <span>{{ activeScreenshot.caption }}</span>
            </figcaption>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.project-page {
  padding: 3rem 0 4rem;
}

.project-container {
  width: min(100% - 32px, 1120px);
  margin: 0 auto;
}

.project-hero {
  padding: 3rem 0 2rem;
}

.project-hero-card,
.project-card,
.project-shot {
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.project-hero-card,
.project-card {
  padding: 36px;
}

.project-eyebrow {
  margin: 0 0 14px;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 800;
}

h1,
h2,
p,
ul,
figure {
  margin-top: 0;
}

h1 {
  max-width: 900px;
  margin-bottom: 18px;
  color: var(--color-heading);
  font-size: clamp(2.8rem, 6vw, 5rem);
  line-height: 0.96;
  letter-spacing: -0.07em;
}

h2 {
  color: var(--color-heading);
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  line-height: 1.08;
  letter-spacing: -0.055em;
}

.project-summary {
  max-width: 42rem;
  margin-bottom: 0.85rem;
  color: var(--color-heading);
  font-size: clamp(1.12rem, 2vw, 1.4rem);
  font-weight: 700;
}

.project-shot figcaption,
.project-list,
.project-lessons {
  color: var(--color-muted);
}

.project-shot-caption,
.project-lightbox-caption {
  display: grid;
  gap: 0.35rem;
}

.project-shot-title {
  color: var(--color-text);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.project-lessons {
  max-width: 60rem;
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.7;
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.project-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-bg);
  color: var(--color-heading);
  font-weight: 800;
  text-decoration: none;
  transition:
    transform 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;
}

.project-action:hover {
  transform: translateY(-2px);
  color: var(--color-primary);
}

.project-section {
  padding: 1rem 0 2rem;
}

.project-section-soft {
  background: var(--color-surface-tint);
}

.project-stack-block {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.project-stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.9rem;
}

.project-stack-item {
  position: relative;
  color: var(--color-muted);
  font-size: 0.98rem;
}

.project-stack-item:not(:last-child)::after {
  content: '•';
  margin-left: 0.9rem;
  color: var(--color-muted);
}

.project-heading {
  max-width: 760px;
  margin-bottom: 32px;
}

.project-gallery {
  display: grid;
  gap: 24px;
}

.project-gallery-secondary {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 24px;
}

.project-shot {
  overflow: hidden;
}

.project-shot-featured {
  background: var(--color-surface-soft);
}

.project-shot-button {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.project-shot-button-featured {
  cursor: default;
}

.project-shot img {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.project-shot figcaption {
  padding: 18px 20px 20px;
  font-size: 0.96rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.project-card-wide {
  width: 100%;
  max-width: none;
}

.project-list {
  display: grid;
  gap: 0.8rem;
  padding-left: 1.25rem;
}

.project-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
}

.project-list-icon {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 0.15rem;
  fill: currentColor;
  color: var(--color-primary);
}

.project-list-arrow .project-list-icon {
  color: var(--color-muted);
}

.project-lightbox {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(20px);
}

.project-lightbox-panel {
  position: relative;
  width: min(96vw, 1280px);
  max-height: 92vh;
  padding: 18px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 28px 80px rgba(23, 35, 60, 0.28);
}

.project-lightbox-panel img {
  display: block;
  width: 100%;
  max-height: calc(92vh - 84px);
  object-fit: contain;
  border-radius: 20px;
}

.project-lightbox-caption {
  margin: 14px 4px 0;
  color: var(--color-muted);
}

.project-lightbox-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
  border: 0;
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(23, 35, 60, 0.9);
  color: var(--color-white);
  font-weight: 800;
  cursor: pointer;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

@media (max-width: 980px) {
  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-gallery-secondary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 580px) {
  .project-container {
    width: min(100% - 24px, 1120px);
  }

  .project-page {
    padding: 2rem 0 3rem;
  }

  .project-hero-card,
  .project-card {
    padding: 24px;
  }

  .project-actions {
    flex-direction: column;
  }

  .project-action {
    width: 100%;
  }

  .project-lightbox {
    padding: 0;
  }

  .project-lightbox-panel {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    padding: 16px;
    border-radius: 0;
  }

  .project-lightbox-panel img {
    max-height: calc(100vh - 72px);
  }
}
</style>
