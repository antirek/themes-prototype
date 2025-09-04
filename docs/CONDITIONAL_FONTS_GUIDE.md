# Отдельные темы - Руководство по использованию

## Обзор

Система отдельных тем позволяет пользователям импортировать только те темы, которые им нужны. Каждая тема включает в себя свои шрифты и стили, что значительно уменьшает размер финального CSS файла и улучшает производительность.

## Структура файлов

```
dist/themes/
├── light.css      # Светлая тема + Roboto, Open Sans, Fira Code (91.97 kB)
├── dark.css       # Темная тема + Inter, Source Sans Pro, JetBrains Mono (42.55 kB)
├── green.css      # Зеленая тема + Poppins, Nunito, Cascadia Code (33.51 kB)
└── starwars.css   # Star Wars тема + Orbitron, Rajdhani (10.59 kB)
```

## Способы импорта

### 1. Импорт отдельных тем

```css
/* Импортируем только светлую тему */
@import '@thepro/cards/themes/light.css';

/* Импортируем только темную тему */
@import '@thepro/cards/themes/dark.css';

/* Импортируем несколько тем */
@import '@thepro/cards/themes/light.css';
@import '@thepro/cards/themes/dark.css';
```

### 2. Импорт через JavaScript/TypeScript

```typescript
// Динамический импорт тем
async function loadTheme(theme: string) {
  switch (theme) {
    case 'light':
      await import('@thepro/cards/themes/light.css');
      break;
    case 'dark':
      await import('@thepro/cards/themes/dark.css');
      break;
    case 'green':
      await import('@thepro/cards/themes/green.css');
      break;
    case 'starwars':
      await import('@thepro/cards/themes/starwars.css');
      break;
  }
}

// Использование
loadTheme('dark');
```

### 3. Импорт через HTML

```html
<!-- Импорт светлой темы -->
<link rel="stylesheet" href="@thepro/cards/themes/light.css">

<!-- Импорт темной темы -->
<link rel="stylesheet" href="@thepro/cards/themes/dark.css">
```

## Примеры использования

### Базовое использование

```css
/* 1. Импортируем тему (включает шрифты) */
@import '@thepro/cards/themes/light.css';

/* 2. Используем компоненты */
.my-card {
  font-family: var(--thepro-theme-font-family-primary);
}
```

### Множественные темы

```css
/* Импортируем несколько тем */
@import '@thepro/cards/themes/light.css';
@import '@thepro/cards/themes/dark.css';
@import '@thepro/cards/themes/green.css';
```

### Динамическое переключение тем

```typescript
class ThemeManager {
  private currentTheme = 'light';
  
  async switchTheme(theme: string) {
    // Загружаем шрифты для новой темы
    await this.loadFonts(theme);
    
    // Применяем тему
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
  }
  
  private async loadFonts(theme: string) {
    const fontMap = {
      light: '@thepro/cards/themes/fonts/light-fonts.css',
      dark: '@thepro/cards/themes/fonts/dark-fonts.css',
      green: '@thepro/cards/themes/fonts/green-fonts.css',
      starwars: '@thepro/cards/themes/fonts/starwars-fonts.css'
    };
    
    const fontUrl = fontMap[theme];
    if (fontUrl && !this.isFontLoaded(fontUrl)) {
      await import(fontUrl);
    }
  }
  
  private isFontLoaded(url: string): boolean {
    return document.querySelector(`link[href="${url}"]`) !== null;
  }
}
```

## Оптимизация размера

### До оптимизации
- **Все шрифты**: ~50-100KB
- **Все темы**: ~15-20KB
- **Общий размер**: ~65-120KB

### После оптимизации
- **Одна тема + шрифты**: ~15-25KB
- **Две темы + шрифты**: ~25-40KB
- **Экономия**: 60-80% размера

## Рекомендации

### 1. Импортируйте только нужные шрифты
```css
/* ❌ Плохо - импортируем все шрифты */
@import '@thepro/cards/themes/fonts/light-fonts.css';
@import '@thepro/cards/themes/fonts/dark-fonts.css';
@import '@thepro/cards/themes/fonts/green-fonts.css';
@import '@thepro/cards/themes/fonts/starwars-fonts.css';

/* ✅ Хорошо - импортируем только нужные */
@import '@thepro/cards/themes/fonts/light-fonts.css';
```

### 2. Используйте динамический импорт для SPA
```typescript
// Загружаем шрифты только при переключении темы
const loadTheme = async (theme: string) => {
  await import(`@thepro/cards/themes/fonts/${theme}-fonts.css`);
  document.documentElement.setAttribute('data-theme', theme);
};
```

### 3. Предзагружайте критические шрифты
```html
<!-- Предзагружаем шрифты для основной темы -->
<link rel="preload" href="@thepro/cards/themes/fonts/light-fonts.css" as="style">
```

## Миграция

### С автоматических шрифтов на условные

**Было:**
```css
@import '@thepro/cards/themes/light/light.css';
/* Шрифты загружались автоматически */
```

**Стало:**
```css
@import '@thepro/cards/themes/fonts/light-fonts.css';
@import '@thepro/cards/themes/light/light.css';
```

## Поддержка

Если у вас есть вопросы по использованию условных шрифтов, создайте issue в репозитории или обратитесь к документации по темам.
