<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue';

const route = useRoute();
const router = useRouter();

const navItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'projects', label: 'Projects', icon: 'projects' },
  { id: 'notes', label: 'Notes', icon: 'notes' },
  { id: 'about', label: 'About', icon: 'about' },
  { id: 'contact', label: 'Contact', icon: 'contact' },
] as const;

const activeSection = ref<(typeof navItems)[number]['id']>('home');
const headerRef = ref<HTMLElement | null>(null);
const navRef = ref<HTMLElement | null>(null);
const navLinkMap = new Map<
  (typeof navItems)[number]['id'],
  HTMLAnchorElement
>();
const sectionPositions = ref<
  Array<{ id: (typeof navItems)[number]['id']; top: number }>
>([]);
const indicatorStyle = ref<Record<string, string>>({
  opacity: '0',
  transform: 'translateX(0px)',
  width: '0px',
});
let scrollFrame = 0;
let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
let lockedSection: (typeof navItems)[number]['id'] | null = null;

const setActiveSectionFromHash = (hash: string) => {
  const sectionId = hash.replace('#', '');
  if (navItems.some((item) => item.id === sectionId)) {
    activeSection.value = sectionId as (typeof navItems)[number]['id'];
  }
};

const getScrollOffset = () => {
  const headerHeight = headerRef.value?.offsetHeight ?? 0;
  return headerHeight + 24;
};

const setNavLinkRef = (
  sectionId: (typeof navItems)[number]['id'],
  element: Element | ComponentPublicInstance | null,
) => {
  if (element instanceof HTMLAnchorElement) {
    navLinkMap.set(sectionId, element);
    return;
  }

  navLinkMap.delete(sectionId);
};

const updateNavIndicator = () => {
  if (route.path !== '/') {
    indicatorStyle.value = {
      opacity: '0',
      transform: 'translateX(0px)',
      width: '0px',
    };
    return;
  }

  const navElement = navRef.value;
  const activeLink = navLinkMap.get(activeSection.value);

  if (!navElement || !activeLink) {
    return;
  }

  indicatorStyle.value = {
    opacity: '1',
    width: `${activeLink.offsetWidth}px`,
    transform: `translateX(${activeLink.offsetLeft}px)`,
  };
};

const measureSections = () => {
  if (route.path !== '/') {
    return;
  }

  sectionPositions.value = navItems
    .map((item) => {
      const element = document.getElementById(item.id);
      if (!element) {
        return null;
      }

      return {
        id: item.id,
        top: element.getBoundingClientRect().top + window.scrollY,
      };
    })
    .filter((section): section is NonNullable<typeof section> => !!section);
};

const unlockSectionTracking = () => {
  lockedSection = null;
  if (scrollEndTimer) {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = null;
  }
  updateActiveSectionFromScroll();
};

const scheduleUnlockSectionTracking = () => {
  if (scrollEndTimer) {
    clearTimeout(scrollEndTimer);
  }

  scrollEndTimer = setTimeout(() => {
    unlockSectionTracking();
  }, 140);
};

const updateActiveSectionFromScroll = () => {
  if (route.path !== '/') {
    return;
  }

  if (lockedSection) {
    activeSection.value = lockedSection;
    return;
  }

  if (sectionPositions.value.length === 0) {
    measureSections();
  }

  if (sectionPositions.value.length === 0) {
    return;
  }

  const currentY = window.scrollY + getScrollOffset();
  const pageBottom = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (pageBottom >= documentHeight - 2) {
    activeSection.value = sectionPositions.value.at(-1)?.id ?? 'home';
    return;
  }

  let resolvedSection = sectionPositions.value[0]?.id ?? 'home';

  for (let index = 0; index < sectionPositions.value.length; index += 1) {
    const currentSection = sectionPositions.value[index];
    const nextSection = sectionPositions.value[index + 1];

    if (!currentSection) {
      continue;
    }

    if (!nextSection) {
      resolvedSection = currentSection.id;
      break;
    }

    const switchPoint =
      currentSection.top + (nextSection.top - currentSection.top) / 2;

    if (currentY < switchPoint) {
      resolvedSection = currentSection.id;
      break;
    }

    resolvedSection = nextSection.id;
  }

  activeSection.value = resolvedSection;
};

const handleScroll = () => {
  if (lockedSection) {
    scheduleUnlockSectionTracking();
  }

  if (scrollFrame) {
    return;
  }

  scrollFrame = window.requestAnimationFrame(() => {
    updateActiveSectionFromScroll();
    scrollFrame = 0;
  });
};

const handleResize = () => {
  measureSections();
  updateNavIndicator();
  updateActiveSectionFromScroll();
};

const scrollToSection = async (sectionId: string, updateHash = true) => {
  if (route.path !== '/') {
    await router.push({ path: '/', hash: `#${sectionId}` });
    return;
  }

  const target = document.getElementById(sectionId);
  if (!target) {
    return;
  }

  lockedSection = sectionId as (typeof navItems)[number]['id'];
  if (scrollEndTimer) {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = null;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - getScrollOffset();

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth',
  });
  activeSection.value = sectionId as (typeof navItems)[number]['id'];

  if (updateHash && route.hash !== `#${sectionId}`) {
    await router.replace({ path: '/', hash: `#${sectionId}` });
  }
};

const handleNavClick = async (event: MouseEvent, sectionId: string) => {
  event.preventDefault();
  await scrollToSection(sectionId);
};

const iconPathMap = {
  home: 'M4.75 10.5 12 4.75l7.25 5.75v7a1.75 1.75 0 0 1-1.75 1.75h-3.25v-5h-4.5v5H6.5A1.75 1.75 0 0 1 4.75 17.5z',
  projects:
    'M4.75 8.5A1.75 1.75 0 0 1 6.5 6.75h4l1.5 1.75h5.5a1.75 1.75 0 0 1 1.75 1.75v7.25a1.75 1.75 0 0 1-1.75 1.75h-11A1.75 1.75 0 0 1 4.75 17.5z',
  notes:
    'M7 5.75h7.25a1.75 1.75 0 0 1 1.75 1.75v9l-3-2.25-3 2.25-3-2.25-3 2.25v-9A1.75 1.75 0 0 1 7 5.75m1 3v1.5h5.5v-1.5zm0 3v1.5h4v-1.5z',
  about:
    'M12 4.75a7.25 7.25 0 1 1 0 14.5 7.25 7.25 0 0 1 0-14.5m0 3a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25m-1.25 4v4.5h2.5v-4.5z',
  contact:
    'M5.5 6.75h13A1.75 1.75 0 0 1 20.25 8.5v7A1.75 1.75 0 0 1 18.5 17.25h-13A1.75 1.75 0 0 1 3.75 15.5v-7A1.75 1.75 0 0 1 5.5 6.75m0 1.5v.32L12 12.5l6.5-3.93v-.32zm13 7.5v-5.43l-6.11 3.69a.75.75 0 0 1-.78 0L5.5 10.32v5.43z',
} as const;

onMounted(async () => {
  await nextTick();

  if (route.path === '/') {
    measureSections();
    if (route.hash) {
      setActiveSectionFromHash(route.hash);
    }
    updateActiveSectionFromScroll();
    updateNavIndicator();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
  }
});

watch(activeSection, async () => {
  await nextTick();
  updateNavIndicator();
});

watch(
  () => route.fullPath,
  async () => {
    await nextTick();

    if (route.path !== '/') {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      unlockSectionTracking();
      updateNavIndicator();
      return;
    }

    measureSections();

    if (route.hash) {
      setActiveSectionFromHash(route.hash);
      const sectionId = route.hash.replace('#', '');
      requestAnimationFrame(() => {
        scrollToSection(sectionId, false);
      });
    } else {
      activeSection.value = 'home';
      updateActiveSectionFromScroll();
    }

    updateNavIndicator();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
  },
);

onBeforeUnmount(() => {
  if (scrollFrame) {
    window.cancelAnimationFrame(scrollFrame);
  }
  if (scrollEndTimer) {
    clearTimeout(scrollEndTimer);
  }
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});
</script>
<template>
  <div class="app-shell">
    <header ref="headerRef" class="site-header">
      <div class="header-inner">
        <a
          href="#home"
          class="logo-link"
          @click="handleNavClick($event, 'home')"
        >
          <img src="/nb-logo.svg" alt="Nick Burdo" class="logo-image" />
        </a>
        <nav ref="navRef" class="site-nav" aria-label="Main navigation">
          <span
            class="nav-indicator"
            :style="indicatorStyle"
            aria-hidden="true"
          />
          <a
            v-for="item in navItems"
            :key="item.id"
            :ref="(element) => setNavLinkRef(item.id, element)"
            :href="`#${item.id}`"
            class="site-link"
            :class="{
              'site-link-active':
                route.path === '/' && activeSection === item.id,
            }"
            @click="handleNavClick($event, item.id)"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </header>
    <a
      href="#home"
      class="mobile-logo"
      aria-label="Go to home section"
      @click="handleNavClick($event, 'home')"
    >
      <img src="/nb-logo.svg" alt="Nick Burdo" class="mobile-logo-image" />
    </a>
    <main class="page-content">
      <slot />
    </main>
    <footer class="site-footer">
      <div class="footer-inner">
        <p>&copy; 2026 Nick Burdo. Built with HTML, CSS and later Vue.</p>
      </div>
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <a
          v-for="item in navItems"
          :key="`mobile-${item.id}`"
          :href="`#${item.id}`"
          class="mobile-nav-link"
          :class="{
            'mobile-nav-link-active':
              route.path === '/' && activeSection === item.id,
          }"
          @click="handleNavClick($event, item.id)"
        >
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path :d="iconPathMap[item.icon]" />
          </svg>
          <span class="sr-only">{{ item.label }}</span>
        </a>
      </nav>
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

.logo-link,
.mobile-logo {
  display: inline-flex;
  align-items: center;
}

.logo-image {
  width: 52px;
  height: 52px;
}

.mobile-logo {
  display: none;
}

.site-nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.nav-indicator {
  position: absolute;
  inset: auto auto 0 0;
  height: calc(100% - 0.1rem);
  border-radius: 999px;
  background: var(--color-primary-soft);
  box-shadow: inset 0 0 0 1px var(--color-border);
  transition:
    transform 0.28s ease,
    width 0.28s ease,
    opacity 0.2s ease;
  pointer-events: none;
}

.site-link {
  position: relative;
  z-index: 1;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-link:hover,
.site-link-active {
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

.mobile-nav {
  display: none;
}

.mobile-nav-icon {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 767px) {
  .site-header {
    display: none;
  }

  .mobile-logo {
    display: block;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 20;
    width: 52px;
    height: 52px;
    border-radius: 999px;
    backdrop-filter: blur(16px);
    box-shadow: 0 12px 28px rgba(23, 35, 60, 0.12);
  }

  .mobile-logo-image {
    width: 100%;
    height: 100%;
  }

  .page-content {
    padding-bottom: 92px;
  }

  .site-footer {
    padding: 1.25rem 0 5.75rem;
  }

  .mobile-nav {
    position: fixed;
    right: 12px;
    bottom: 12px;
    left: 12px;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.7rem 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    backdrop-filter: blur(18px);
    background: rgba(255, 255, 255, 0.78);
    box-shadow: 0 16px 40px rgba(23, 35, 60, 0.14);
  }

  .mobile-nav-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    color: var(--color-muted);
    transition:
      color 0.2s ease,
      background-color 0.2s ease;
  }

  .mobile-nav-link-active {
    color: var(--color-primary);
    background: var(--color-primary-soft);
  }
}

@media (max-width: 520px) {
  .header-inner,
  .footer-inner {
    width: min(100% - 24px, 1120px);
  }

  .mobile-logo {
    top: 12px;
    left: 12px;
    width: 48px;
    height: 48px;
  }
}
</style>
