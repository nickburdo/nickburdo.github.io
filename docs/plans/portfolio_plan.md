# Лендинг-портфолио Nick Burdo

## Цель сайта

Сайт должен быстро отвечать на 4 вопроса рекрутера или потенциального клиента:

1. Кто я.
2. Что я умею.
3. Какие проекты делал.
4. Как со мной связаться.

Основная идея: не делать «портфолио фронтендера образца 2018 года» со списком технологий и десятками карточек. Лучше показать опытного инженера, который умеет делать продукты, объяснять технические вещи и сейчас осознанно изучает AI-интеграции.

---

## Общая структура сайта

```text
/
├─ Home
├─ Resume
├─ Projects
├─ Notes
└─ Contact
```

Для первой версии достаточно одной главной страницы с якорями:

```text
#home
#projects
#notes
#about
#contact
```

Позже можно вынести Resume, Projects и Notes на отдельные страницы.

---

## Главная страница

```text
┌────────────────────────────────────────────┐
│ Header                                     │
│ Nick Burdo        Resume Projects Notes    │
├────────────────────────────────────────────┤
│ Hero                                       │
│                                            │
│ Frontend Developer                         │
│ React • Next.js • Vue • Nuxt • TypeScript │
│                                            │
│ Building responsive, maintainable web      │
│ applications and exploring practical       │
│ AI-powered product features.               │
│                                            │
│ [View Resume] [Projects] [Contact]         │
│                              [Avatar]      │
├────────────────────────────────────────────┤
│ Featured Projects                          │
│ [Job Tracker] [Health Monitor] [The Hood]  │
├────────────────────────────────────────────┤
│ Notes                                      │
│ [What is RAG?] [MCP in simple words]       │
├────────────────────────────────────────────┤
│ About                                      │
│ 10+ years frontend experience...           │
├────────────────────────────────────────────┤
│ Contact                                    │
│ GitHub • LinkedIn • Email                  │
└────────────────────────────────────────────┘
```

---

## Hero-текст

```text
Nick Burdo

Frontend Developer

React • Next.js • Vue • Nuxt • TypeScript

Building responsive, maintainable web applications
and exploring practical AI-powered product features.
```

---

## Рекомендуемые блоки

### 1. Hero

Короткий главный экран:

- имя;
- роль;
- основной стек;
- короткое позиционирование;
- кнопки Resume / Projects / Contact;
- аватар справа.

### 2. Featured Projects

Только 3–5 проектов.

Пример:

#### Job Tracker

Nuxt 4, Prisma, Supabase, PostgreSQL

- Application tracking
- Authentication
- Demo mode
- RLS security

#### Health Monitor

Nuxt 4

- Health metrics tracking
- SVG charts
- PWA

#### The Hood

Next.js

- Recruitment platform
- AI shortlist research
- Candidate matching

### 3. Notes / Mini Blog

Не полноценный блог на старте, а небольшие заметки по 300–800 слов.

Идеи первых заметок:

- What is RAG?
- MCP in simple words
- AI agents vs workflows
- How embeddings actually work
- Why prompt engineering is overrated

### 4. About

Коротко, без воды:

```text
Frontend developer with 10+ years of experience building web applications
for startups and enterprise teams.

Currently focused on modern React/Nuxt ecosystems and practical AI integration
into web products.
```

### 5. Contact

Просто ссылки:

- GitHub
- LinkedIn
- Email

Форму обратной связи лучше не делать на первой версии. Она чаще собирает спам, чем реальные предложения.

---

## Дизайн

### Общий стиль

- светло-голубой фон;
- белые карточки;
- темно-синий текст;
- оранжевый акцент;
- много воздуха;
- минимум теней;
- мягкие скругления;
- без визуального шума.

### Палитра

```css
:root {
  --color-bg: #eef7ff;
  --color-surface: #ffffff;
  --color-primary: #5b8def;
  --color-text: #2d3748;
  --color-muted: #718096;
  --color-accent: #f4a261;
}
```

### Образ

Не «молодой стартапер» и не «корпоративный робот».

Лучше образ:

```text
Спокойный опытный инженер, который умеет делать продукты
и аккуратно разбирается в новых технологиях.
```

---

## Рекомендация по аватару

Для первой версии можно использовать сгенерированный портрет №3 / modern illustration.

Лучше всего он подходит для hero-блока:

- выглядит профессионально;
- не похож на паспортное фото;
- хорошо сочетается со светло-голубым фоном;
- не выглядит слишком мультяшно.

---

## Технология

Для GitHub Pages можно начать с обычного HTML + CSS, а потом спокойно натянуть это на Vue/Nuxt.

Такой подход хорош тем, что сначала фиксируется структура и визуальный стиль, а уже потом начинается компонентная разработка.
