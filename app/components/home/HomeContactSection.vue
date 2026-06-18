<template>
  <section id="contact" class="section contact-section">
    <div class="container contact-card">
      <p class="eyebrow">Contact</p>
      <h2>Let's talk.</h2>
      <p>The fastest way to reach me is by email or LinkedIn.</p>

      <div class="contact-links">
        <a href="mailto:nikburdo@gmail.com">Email</a>
        <a href="https://t.me/nickburdo" target="_blank" rel="noreferrer">
          Telegram
        </a>
        <a
          href="https://www.linkedin.com/in/nick-burdo-98a1ab258"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a href="https://github.com/nickburdo" target="_blank" rel="noreferrer">
          GitHub
        </a>
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

.contact-section {
  padding-top: 24px;
}

.contact-card {
  max-width: 760px;
  margin: 0 auto;
  padding: 42px;
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--color-surface-soft);
  box-shadow: 0 24px 70px var(--color-shadow);
  text-align: center;
}

.contact-card > p {
  color: var(--color-muted);
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

.contact-links a:hover {
  color: var(--color-primary);
}

@media (max-width: 579px) {
  .contact-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .contact-card {
    padding: 24px;
  }
}
</style>
