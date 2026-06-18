<template>
  <div class="home-page">
    <section id="home" class="hero section">
      <div class="container hero-grid">
        <div class="hero-content">
          <p class="eyebrow hero-eyebrow">Nick Burdo</p>
          <h1>10+ years building web applications</h1>
          <p class="hero-text">
            Frontend Development / Product Engineering / AI Integration
          </p>
          <p class="hero-description">
            I build responsive, user-friendly interfaces and explore practical
            AI-powered product features.
          </p>
          <div class="hero-actions">
            <NuxtLink class="button button-primary" to="/cv">Viev CV</NuxtLink>
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
    <HomeProjectsSection />
    <HomeNotesSection />
    <HomeAboutSection />
    <HomeContactSection />
  </div>
</template>

<style scoped>
.home-page {
  padding-bottom: 1.5rem;
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

h1,
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

.hero-eyebrow {
  font-size: clamp(1.56rem, 3vw, 2.1rem);
  text-transform: none;
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

@media (max-width: 860px) {
  .hero {
    padding-top: 64px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-avatar-wrap {
    order: -1;
    min-height: auto;
  }

  .hero-avatar {
    width: min(100%, 320px);
  }
}

@media (max-width: 520px) {
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
}
</style>
