# @thepro/cards - Vue Framework для карточек с системой тем

Современный Vue 3 + TypeScript фреймворк для создания красивых карточек с гибкой системой тем.

## 🚀 Особенности

- **Vue 3 + TypeScript** - современный стек разработки
- **SCSS с @use** - современный подход к стилизации (мигрирован с @import)
- **CSS переменные** - динамическое переключение тем
- **Модульная архитектура** - компоненты и темы независимы
- **Валидация типов** - автоматическая проверка соответствия SCSS и TypeScript
- **NPM пакет** - готов к публикации и использованию

## 📦 Установка

```bash
npm install @thepro/cards
```

## 🎨 Компоненты

### CardHeader
Заголовок карточки с градиентным фоном и оверлеем.

```vue
<CardHeader text="Заголовок карточки" />
```

### CardBody
Основное содержимое карточки.

```vue
<CardBody text="Содержимое карточки" />
```

### CardFooter
Подвал карточки с выравниванием, определяемым темой.

```vue
<CardFooter text="Подвал карточки" />
```

### CardPreview
Полная карточка, объединяющая все компоненты.

```vue
<CardPreview :card-data="cardData" />
```

### CardWithTheme
Карточка с собственным селектором темы.

```vue
<CardWithTheme id="unique-id" :card-data="cardData" />
```

## 🎯 Система тем

### Доступные темы
- **light** - светлая тема (по умолчанию)
- **dark** - темная тема
- **green** - зеленая тема

### Применение темы

```typescript
import { applyTheme } from '@thepro/cards'

// Применить тему глобально
applyTheme('dark')

// Получить текущую тему
const currentTheme = getCurrentTheme()

// Переключить тему
const nextTheme = toggleTheme()
```

### CSS переменные

Все темы используют префикс `--thepro-theme-` для глобальных переменных и `--thepro-<componentname>-` для компонентных переменных.

## 🏗️ Архитектура

### Структура компонента
```
src/components/CardHeader/
├── CardHeader.vue          # Vue компонент
├── types.ts               # TypeScript интерфейсы
└── styles/
    ├── CardHeader.scss    # Основные стили
    └── themes/            # Тематические стили
        ├── light.scss
        ├── dark.scss
        └── green.scss
```

### Правила именования CSS переменных

1. **Глобальные темы**: `--thepro-theme-<property>`
   ```scss
   --thepro-theme-color-primary: #3498db;
   --thepro-theme-color-bg: #ffffff;
   ```

2. **Компонентные темы**: `--thepro-<componentname>-<property>`
   ```scss
   --thepro-cardheader-bg: var(--thepro-theme-color-primary);
   --thepro-cardheader-text: var(--thepro-theme-color-white);
   ```

### SCSS @use вместо @import

Проект использует современный подход `@use` вместо устаревшего `@import`:

```scss
// ✅ Современный подход
@use './styles/CardHeader.scss';

// ❌ Устаревший подход
@import './styles/CardHeader.scss';
```

**Преимущества @use:**
- Изолированное пространство имен
- Предотвращение конфликтов
- Лучшая производительность
- Tree-shaking поддержка

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

### Сборка Storybook
```bash
npm run build-storybook
```

### Валидация тем
```bash
npm run validate-themes
```

### Storybook
```bash
npm run storybook
```

Storybook доступен по адресу: http://localhost:6006

Подробное руководство по Storybook: [docs/STORYBOOK_GUIDE.md](docs/STORYBOOK_GUIDE.md)

## 📋 Валидация

Проект включает автоматический валидатор, который проверяет:

1. **Соответствие интерфейсов** - CSS переменные в SCSS соответствуют TypeScript интерфейсам
2. **Правильность префиксов** - все переменные используют правильные префиксы
3. **Отсутствие глобальных переменных** - компонентные темы не объявляют глобальные переменные

## 📦 Публикация

### Подготовка к публикации
```bash
npm run prepublishOnly
```

Этот скрипт:
- Запускает валидацию тем
- Собирает библиотеку
- Проверяет готовность к публикации

### Публикация
```bash
npm publish
```

## 🎯 Использование в проектах

### Импорт компонентов
```typescript
import { CardHeader, CardBody, CardFooter, applyTheme } from '@thepro/cards'
```

### Импорт стилей
```typescript
import '@thepro/cards/style.css'
```

### Vue плагин
```typescript
import TheProCards from '@thepro/cards'

app.use(TheProCards)
```

## 📄 Лицензия

MIT

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Запустите валидацию: `npm run validate-themes`
5. Создайте Pull Request

## 🔄 Миграция с @import на @use

Проект был успешно мигрирован с устаревшего `@import` на современный `@use`. Это обеспечивает:

- ✅ Отсутствие предупреждений о deprecated API
- ✅ Лучшую производительность компиляции
- ✅ Изолированные пространства имен
- ✅ Совместимость с будущими версиями Sass

Все SCSS файлы теперь используют `@use` вместо `@import`, что делает код более надежным и современным.
