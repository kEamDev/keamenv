export type Lang = "ru" | "en";

const translations = {
  // Header
  "header.nickname": {
    ru: "kEam",
    en: "kEam",
  },
  "header.role": {
    ru: "Художник по окружению",
    en: "Environment Artist",
  },
  "header.description": {
    ru: "Занимаюсь Созданием визуальной части уровней. Специализируюсь на Движке Source 1/2 и Unreal Engine 4/5.",
    en: "I making visual parts of game levels. I specialize in Source 1/2 and Unreal Engine 4/5.",
  },
  "header.contact": {
    ru: "Связаться",
    en: "Contact",
  },
  "contact.title": {
    ru: "Связаться со мной",
    en: "Get in touch",
  },
  "contact.copy": {
    ru: "Скопировано!",
    en: "Copied!",
  },

  // Sort
  "sort.label": {
    ru: "Сортировка",
    en: "Sort",
  },
  "sort.date": {
    ru: "По дате",
    en: "By date",
  },
  "sort.subscribers": {
    ru: "По подписчикам",
    en: "By subscribers",
  },
  "sort.likes": {
    ru: "По лайкам",
    en: "By likes",
  },
  
  // Filter
  "filter.tags": {
    ru: "Теги",
    en: "Tags",
  },
  "filter.all": {
    ru: "Все",
    en: "All",
  },
  "filter.clear": {
    ru: "Сбросить",
    en: "Clear",
  },

  // Steam stats
  "steam.workshop": {
    ru: "Steam Workshop",
    en: "Steam Workshop",
  },
  "steam.loading": {
    ru: "Загрузка...",
    en: "Loading...",
  },
  "steam.unavailable": {
    ru: "Статистика недоступна",
    en: "Stats unavailable",
  },
  "stats.retry": {
    ru: "Повторить",
    en: "Retry",
  },
  "steam.openWorkshop": {
    ru: "Открыть в мастерской Steam",
    en: "Open in Steam Workshop",
  },
  

  // Footer
  "footer.rights": {
    ru: "© 2026",
    en: "© 2026",
  },
  "footer.status": {
    ru: "Открыт для фриланса и постоянной работы",
    en: "Open for freelance and full-time opportunities",
  },

  // Tabs
  "tab.levels": {
    ru: "Карты",
    en: "Levels",
  },
  "tab.models": {
    ru: "3D Модели",
    en: "3D Models",
  },

  // Sketchfab
  "sketchfab.view": {
    ru: "Смотреть на Sketchfab",
    en: "View on Sketchfab",
  },
  "sketchfab.loading": {
    ru: "Загрузка модели...",
    en: "Loading model...",
  },

  // View mode
  "view.list": {
    ru: "Список",
    en: "List",
  },
  "view.grid": {
    ru: "Сетка",
    en: "Grid",
  },
  // Date locale
  "dateLocale": {
    ru: "ru-RU",
    en: "en-US",
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}

// Проектные переводы (title, description) хранятся в данных проекта
export default translations;
