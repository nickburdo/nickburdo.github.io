<template>
  <section id="about" class="section">
    <div class="container about-card">
      <div>
        <p class="eyebrow">About</p>
        <h2>
          10+ years building web products for startups and enterprise teams.
        </h2>
      </div>

      <div class="about-text">
        <h3>Experience</h3>
        <p>
          10+ years of experience building scalable web applications for
          startups and enterprise teams.
        </p>
        <h3>Stack</h3>
        <p>
          React, Next.js, TypeScript, TanStack Query, Material UI, and modern
          Vue/Nuxt ecosystems.
        </p>
        <h3>Focus</h3>
        <p>
          Building maintainable products with a focus on performance, user
          experience, and practical AI integration.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
h2,
p {
  margin-top: 0;
}

h2 {
  color: var(--color-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.055em;
}

.about-card {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: 44px;
  padding: 42px;
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.about-text {
  display: grid;
  gap: 1rem;
  font-size: 1.05rem;
}

.about-text p {
  color: var(--color-muted);
}

@media (max-width: 860px) {
  .about-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .about-card {
    padding: 24px;
  }
}
</style>
