<template>
  <section class="project-page">
    <div class="project-wrap">
      <p class="project-kicker">Project</p>
      <h1>The Hood</h1>
      <p class="project-text">
        Social and recruitment platform focused on product features, matching,
        and user experience.
      </p>
    </div>
  </section>
</template>

<style scoped>
.project-page {
  padding: 96px 0 120px;
}

.project-wrap {
  width: min(100% - 32px, 820px);
  margin: 0 auto;
  padding: 42px;
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.project-kicker {
  margin: 0 0 14px;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 800;
}

h1,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 20px;
  color: var(--color-heading);
  font-size: clamp(2.5rem, 6vw, 4.2rem);
  line-height: 0.98;
  letter-spacing: -0.06em;
}

.project-text {
  max-width: 42rem;
  color: var(--color-muted);
  font-size: 1.08rem;
}

@media (max-width: 520px) {
  .project-page {
    padding: 72px 0 96px;
  }

  .project-wrap {
    width: min(100% - 24px, 820px);
    padding: 24px;
  }
}
</style>
