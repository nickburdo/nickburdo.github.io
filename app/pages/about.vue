<template>
  <section class="about-page">
    <div class="about-wrap">
      <p class="eyebrow">About page</p>
      <h1>Frontend developer focused on practical, maintainable products.</h1>
      <p class="lead">
        I work with modern Vue, Nuxt, React and TypeScript stacks to build
        interfaces that stay clean as products grow.
      </p>
      <div class="about-copy">
        <p>
          My background is in shipping real product features, improving UX and
          keeping frontend codebases understandable over time.
        </p>
        <p>
          Right now I am especially interested in AI-assisted workflows and
          thoughtful integration of model-powered features into web apps.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-page {
  padding: 96px 0 120px;
}

.about-wrap {
  width: min(100% - 32px, 820px);
  margin: 0 auto;
  padding: 42px;
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.eyebrow {
  margin-bottom: 14px;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  font-weight: 800;
}

h1 {
  margin: 0 0 20px;
  color: var(--color-heading);
  font-size: clamp(2.5rem, 6vw, 4.6rem);
  line-height: 0.98;
  letter-spacing: -0.065em;
}

.lead {
  max-width: 44rem;
  margin-bottom: 28px;
  color: var(--color-heading);
  font-size: 1.15rem;
  font-weight: 700;
}

.about-copy {
  display: grid;
  gap: 1rem;
  max-width: 42rem;
  color: var(--color-muted);
  font-size: 1.05rem;
}

@media (max-width: 520px) {
  .about-page {
    padding: 72px 0 96px;
  }

  .about-wrap {
    width: min(100% - 24px, 820px);
    padding: 24px;
  }
}
</style>
