<script setup lang="ts"></script>
<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">Nick Burdo</NuxtLink>
        <nav class="site-nav" aria-label="Main navigation">
          <NuxtLink to="/" class="site-link">Home</NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#projects' }" class="site-link">
            Projects
          </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#notes' }" class="site-link">
            Notes
          </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#about' }" class="site-link">
            About
          </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#contact' }" class="site-link">
            Contact
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="page-content">
      <slot />
    </main>
    <footer class="site-footer">
      <div class="footer-inner">
        <p>&copy; 2026 Nick Burdo. Built with HTML, CSS and later Vue.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(18px);
  background: var(--color-header-bg);
}

.header-inner,
.footer-inner {
  width: min(100% - 32px, 1120px);
  margin: 0 auto;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 72px;
}

.logo {
  color: var(--color-heading);
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-decoration: none;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.site-link {
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-link:hover,
.site-link.router-link-active {
  color: var(--color-primary);
}

.page-content {
  flex: 1;
}

.site-footer {
  padding: 2rem 0;
  color: var(--color-muted);
  font-size: 0.92rem;
  text-align: center;
}

@media (max-width: 860px) {
  .header-inner {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0;
  }

  .site-nav {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }
}

@media (max-width: 520px) {
  .header-inner,
  .footer-inner {
    width: min(100% - 24px, 1120px);
  }
}
</style>
