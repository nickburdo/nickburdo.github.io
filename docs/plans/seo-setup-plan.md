# SEO-настройка портфолио на Nuxt

## 1. Установить пакеты

```bash
npm i @nuxtjs/robots @nuxtjs/sitemap
```

---

## 2. Настроить `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://nickburdo.dev',
    name: 'Nick Burdo',
    description: 'Frontend developer portfolio: projects, notes, and contact information.',
  },

  robots: {
    allow: '/',
    sitemap: 'https://nickburdo.dev/sitemap.xml',
  },
})
```

### Что происходит

* `@nuxtjs/sitemap` автоматически генерирует `/sitemap.xml`.
* `@nuxtjs/robots` автоматически генерирует `/robots.txt`.
* Поисковые системы увидят карту сайта через `robots.txt`.

---

## 3. Удалить ручной `robots.txt`

Если есть файл:

```
public/robots.txt
```

его лучше удалить, чтобы настройки были только в одном месте.

---

## 4. Настроить description

В `app.vue` или `layouts/default.vue`:

```ts
useSeoMeta({
  title: 'Nick Burdo — Frontend Developer',
  description: 'Frontend developer portfolio: projects, notes, and contact information.',
  ogTitle: 'Nick Burdo — Frontend Developer',
  ogDescription: 'Frontend developer portfolio: projects, notes, and contact information.',
})
```

---

## 5. SEO для отдельных страниц

Например, для страницы Projects:

```ts
useSeoMeta({
  title: 'Projects — Nick Burdo',
  description: 'Selected frontend projects by Nick Burdo.',
})
```

---

## Когда обновлять

### robots.txt

Никогда. Настраивается один раз.

### sitemap.xml

Никогда вручную.

Обновляется автоматически при билде и деплое.

### description

Обновлять только если меняется содержание страницы.

Например:

* About
* Projects
* Notes
* Case Study
* отдельные страницы проектов

---

## Итог

Настраивается один раз:

* ✅ robots.txt
* ✅ sitemap.xml
* ✅ базовый description

После этого можно спокойно забыть про них и заниматься контентом.
