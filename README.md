# @thepro/cards

Vue framework для создания настраиваемых карточных компонентов с системой тем.

## 🚀 Установка

```bash
npm install @thepro/cards
```

## 📦 Импорт

### Основные компоненты

```typescript
import { CardHeader, CardBody, CardFooter, CardPreview, CardWithTheme } from '@thepro/cards';
```

### Отдельные компоненты

```typescript
import CardHeader from '@thepro/cards/components/CardHeader';
import CardBody from '@thepro/cards/components/CardBody';
import CardFooter from '@thepro/cards/components/CardFooter';
import CardPreview from '@thepro/cards/components/CardPreview';
```

### Темы

```typescript
// Импорт CSS файлов тем
import '@thepro/cards/themes/light/light.css';
import '@thepro/cards/themes/dark/dark.css';
import '@thepro/cards/themes/green/green.css';
```

### Типы

```typescript
import type { 
  CardHeaderThemeCSSVariables,
  CardBodyThemeCSSVariables,
  CardFooterThemeCSSVariables,
  CardPreviewThemeCSSVariables,
  ThemeCSSVariables,
  ThemeName 
} from '@thepro/cards';
```

## 🎨 Использование

### Базовое использование

```vue
<template>
  <CardWithTheme>
    <CardHeader>Заголовок карточки</CardHeader>
    <CardBody>Содержимое карточки</CardBody>
    <CardFooter>Футер карточки</CardFooter>
  </CardWithTheme>
</template>

<script setup lang="ts">
import { CardWithTheme, CardHeader, CardBody, CardFooter } from '@thepro/cards';
</script>
```

### Управление темами

```vue
<template>
  <div>
    <button @click="switchTheme">Сменить тему</button>
    <CardWithTheme>
      <CardHeader>Карточка</CardHeader>
      <CardBody>Содержимое</CardBody>
    </CardWithTheme>
  </div>
</template>

<script setup lang="ts">
import { CardWithTheme, CardHeader, CardBody, applyTheme, toggleTheme } from '@thepro/cards';

const switchTheme = () => {
  toggleTheme(); // Переключение на следующую тему
  // или
  applyTheme('dark'); // Применение конкретной темы
};
</script>
```

### Vue плагин

```typescript
import { createApp } from 'vue';
import TheProCards from '@thepro/cards';
import '@thepro/cards/themes/light/light.css';

const app = createApp(App);
app.use(TheProCards);
app.mount('#app');
```

## 🎯 Компоненты

### CardHeader
Заголовок карточки с градиентным фоном.

**Props:**
- `title` (string) - Заголовок карточки

### CardBody
Основное содержимое карточки.

**Props:**
- `content` (string) - Текстовое содержимое

### CardFooter
Футер карточки с дополнительной информацией.

**Props:**
- `text` (string) - Текст футера

### CardPreview
Контейнер для предварительного просмотра карточки.

### CardWithTheme
Обертка для карточки с поддержкой тем.

## 🌈 Темы

### Доступные темы:
- **light** - Светлая тема с синими акцентами
- **dark** - Темная тема с фиолетовыми акцентами  
- **green** - Зеленая тема с экологическими акцентами

### Применение темы:

```typescript
import { applyTheme } from '@thepro/cards';

// Применение конкретной темы
applyTheme('dark');

// Получение текущей темы
const currentTheme = getCurrentTheme();

// Переключение на следующую тему
const nextTheme = toggleTheme();
```

## 🎨 Кастомизация

### CSS переменные

Все компоненты используют CSS переменные для стилизации:

```css
/* Глобальные переменные темы */
--thepro-theme-color-primary: #3498db;
--thepro-theme-color-secondary: #2c3e50;
--thepro-theme-color-bg: #ffffff;
--thepro-theme-color-text: #2c3e50;

/* Переменные компонентов */
--thepro-cardheader-bg: linear-gradient(...);
--thepro-cardheader-text: #ffffff;
--thepro-cardbody-bg: #f8f9fa;
--thepro-cardfooter-border: #dee2e6;
```

### Создание собственной темы

```scss
[data-theme="custom"] {
  --thepro-theme-color-primary: #your-color;
  --thepro-theme-color-secondary: #your-color;
  // ... другие переменные
}
```

## 🔧 Разработка

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

### Сборка библиотеки

```bash
npm run build:lib
```

### Валидация тем

```bash
npm run validate-themes
```

## 📄 Лицензия

MIT
