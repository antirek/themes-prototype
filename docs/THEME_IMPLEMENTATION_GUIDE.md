# 🎨 Руководство по внедрению UI темы на основе CSS переменных в Vue проект

## 📋 Содержание

1. [Обзор архитектуры](#обзор-архитектуры)
2. [Структура файлов](#структура-файлов)
3. [Создание глобальных тем](#создание-глобальных-тем)
4. [Создание компонентных тем](#создание-компонентных-тем)
5. [Интеграция с Vue компонентами](#интеграция-с-vue-компонентами)
6. [TypeScript поддержка](#typescript-поддержка)
7. [Валидация тем](#валидация-тем)
8. [Лучшие практики](#лучшие-практики)
9. [Примеры использования](#примеры-использования)

## 🏗️ Обзор архитектуры

### Принципы дизайна

**1. Разделение ответственности:**
- **Глобальные темы**: Базовые CSS переменные (цвета, шрифты, отступы, тени)
- **Компонентные темы**: Специфичные для компонентов CSS переменные
- **Компоненты**: Используют CSS переменные, не содержат хардкода

**2. Централизованное управление:**
- Все темы импортируются через `src/themes/index.scss`
- Компонентные темы импортируются в соответствующие глобальные темы
- Нет прямых импортов тем в файлы стилей компонентов

**3. Типобезопасность:**
- TypeScript интерфейсы для всех CSS переменных
- Валидация соответствия SCSS и TypeScript
- Автоматическая проверка архитектурных правил

### Архитектурная схема

```
src/
├── themes/                          # Глобальные темы
│   ├── index.scss                   # Центральный импорт всех тем
│   ├── light/light.scss            # Светлая тема + импорты компонентов
│   ├── dark/dark.scss              # Темная тема + импорты компонентов
│   ├── green/green.scss            # Зеленая тема + импорты компонентов
│   └── starwars/starwars.scss      # Тема Star Wars + импорты компонентов
├── components/
│   └── ComponentName/
│       ├── types.ts                # TypeScript интерфейс
│       ├── ComponentName.vue       # Vue компонент
│       └── styles/
│           ├── ComponentName.scss  # Основные стили (без импортов тем)
│           └── themes/
│               ├── light.scss      # CSS переменные для светлой темы
│               ├── dark.scss       # CSS переменные для темной темы
│               ├── green.scss      # CSS переменные для зеленой темы
│               └── starwars.scss   # CSS переменные для темы Star Wars
```

## 📁 Структура файлов

### 1. Глобальные темы

**Файл: `src/themes/index.scss`**
```scss
// Импорт всех тем
@use './light/light.scss';
@use './dark/dark.scss';
@use './green/green.scss';
@use './starwars/starwars.scss';

// Глобальные CSS переменные для приложения
:root {
  // Базовые переменные по умолчанию
}
```

**Файл: `src/themes/light/light.scss`**
```scss
// Импорт стилей компонентов для светлой темы
@use '../../components/UserProfileCard/styles/themes/light.scss' as userprofilecard-light;
@use '../../components/UserAvatar/styles/themes/light.scss' as useravatar-light;

// Светлая тема
[data-theme="light"] {
  // Глобальные CSS переменные
  --thepro-theme-color-primary: #3498db;
  --thepro-theme-color-secondary: #2c3e50;
  --thepro-theme-font-family-primary: 'Roboto', sans-serif;
  --thepro-theme-spacing-4: 1rem;
  // ... другие переменные
}
```

### 2. Компонентные темы

**Файл: `src/components/ComponentName/types.ts`**
```typescript
export interface ComponentNameThemeCSSVariables {
  '--thepro-componentname-bg': string;
  '--thepro-componentname-text': string;
  '--thepro-componentname-border': string;
  '--thepro-componentname-shadow': string;
  // ... другие переменные
}
```

**Файл: `src/components/ComponentName/styles/themes/light.scss`**
```scss
[data-theme="light"] {
  --thepro-componentname-bg: var(--thepro-theme-color-bg-secondary);
  --thepro-componentname-text: var(--thepro-theme-color-text);
  --thepro-componentname-border: var(--thepro-theme-color-border);
  --thepro-componentname-shadow: var(--thepro-theme-shadow-md);
}
```

**Файл: `src/components/ComponentName/styles/ComponentName.scss`**
```scss
.component-name {
  background: var(--thepro-componentname-bg);
  color: var(--thepro-componentname-text);
  border: 1px solid var(--thepro-componentname-border);
  box-shadow: var(--thepro-componentname-shadow);
  padding: var(--thepro-theme-spacing-4);
  font-family: var(--thepro-theme-font-family-primary);
}
```

## 🌍 Создание глобальных тем

### Шаг 1: Создание структуры

```bash
mkdir -p src/themes/new-theme
```

### Шаг 2: Определение CSS переменных

**Файл: `src/themes/new-theme/new-theme.scss`**
```scss
// Импорт стилей компонентов для новой темы
@use '../../components/UserProfileCard/styles/themes/new-theme.scss' as userprofilecard-new-theme;
@use '../../components/UserAvatar/styles/themes/new-theme.scss' as useravatar-new-theme;

[data-theme="new-theme"] {
  /* Цветовая палитра */
  --thepro-theme-color-primary: #your-primary-color;
  --thepro-theme-color-secondary: #your-secondary-color;
  --thepro-theme-color-success: #your-success-color;
  --thepro-theme-color-warning: #your-warning-color;
  --thepro-theme-color-danger: #your-danger-color;
  
  /* Нейтральные цвета */
  --thepro-theme-color-white: #ffffff;
  --thepro-theme-color-gray-100: #f8f9fa;
  --thepro-theme-color-gray-300: #dee2e6;
  --thepro-theme-color-gray-600: #6c757d;
  --thepro-theme-color-black: #000000;
  
  /* Семантические цвета */
  --thepro-theme-color-text: #your-text-color;
  --thepro-theme-color-text-muted: #your-muted-color;
  --thepro-theme-color-bg: #your-bg-color;
  --thepro-theme-color-bg-secondary: #your-bg-secondary-color;
  --thepro-theme-color-border: #your-border-color;
  
  /* Типографика */
  --thepro-theme-font-family-primary: 'Your Font', sans-serif;
  --thepro-theme-font-family-secondary: 'Your Secondary Font', sans-serif;
  --thepro-theme-font-family-mono: 'Courier New', monospace;
  
  --thepro-theme-font-size-sm: 0.875rem;
  --thepro-theme-font-size-base: 1rem;
  --thepro-theme-font-size-lg: 1.25rem;
  --thepro-theme-font-size-xl: 1.5rem;
  
  --thepro-theme-font-weight-normal: 400;
  --thepro-theme-font-weight-bold: 700;
  
  --thepro-theme-line-height: 1.5;
  
  /* Spacing */
  --thepro-theme-spacing-0: 0;
  --thepro-theme-spacing-1: 0.25rem;
  --thepro-theme-spacing-2: 0.5rem;
  --thepro-theme-spacing-3: 0.75rem;
  --thepro-theme-spacing-4: 1rem;
  --thepro-theme-spacing-6: 1.5rem;
  --thepro-theme-spacing-8: 2rem;
  
  /* Border & Radius */
  --thepro-theme-radius-sm: 0.25rem;
  --thepro-theme-radius-md: 0.5rem;
  --thepro-theme-radius-lg: 0.75rem;
  
  --thepro-theme-border-width: 1px;
  
  /* Тени */
  --thepro-theme-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --thepro-theme-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --thepro-theme-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Переходы */
  --thepro-theme-transition: 0.3s ease;
  --thepro-theme-transition-fast: 0.15s ease;
  
  /* Breakpoints */
  --thepro-theme-breakpoint-sm: 576px;
  --thepro-theme-breakpoint-md: 768px;
  --thepro-theme-breakpoint-lg: 992px;
}
```

### Шаг 3: Добавление импорта

**Файл: `src/themes/index.scss`**
```scss
// Импорт всех тем
@use './light/light.scss';
@use './dark/dark.scss';
@use './green/green.scss';
@use './starwars/starwars.scss';
@use './new-theme/new-theme.scss'; // Добавить новую тему
```

## 🧩 Создание компонентных тем

### Шаг 1: Создание TypeScript интерфейса

**Файл: `src/components/ComponentName/types.ts`**
```typescript
export interface ComponentNameThemeCSSVariables {
  /** Фон компонента */
  '--thepro-componentname-bg': string;
  /** Цвет текста */
  '--thepro-componentname-text': string;
  /** Цвет границы */
  '--thepro-componentname-border': string;
  /** Тень компонента */
  '--thepro-componentname-shadow': string;
  /** Радиус скругления */
  '--thepro-componentname-border-radius': string;
  /** Отступы */
  '--thepro-componentname-padding': string;
  /** Размер шрифта */
  '--thepro-componentname-font-size': string;
  /** Семейство шрифтов */
  '--thepro-componentname-font-family': string;
}
```

### Шаг 2: Создание файлов тем

**Файл: `src/components/ComponentName/styles/themes/light.scss`**
```scss
[data-theme="light"] {
  --thepro-componentname-bg: var(--thepro-theme-color-bg-secondary);
  --thepro-componentname-text: var(--thepro-theme-color-text);
  --thepro-componentname-border: var(--thepro-theme-color-border);
  --thepro-componentname-shadow: var(--thepro-theme-shadow-md);
  --thepro-componentname-border-radius: var(--thepro-theme-radius-md);
  --thepro-componentname-padding: var(--thepro-theme-spacing-4);
  --thepro-componentname-font-size: var(--thepro-theme-font-size-base);
  --thepro-componentname-font-family: var(--thepro-theme-font-family-primary);
}
```

**Файл: `src/components/ComponentName/styles/themes/dark.scss`**
```scss
[data-theme="dark"] {
  --thepro-componentname-bg: var(--thepro-theme-color-bg-secondary);
  --thepro-componentname-text: var(--thepro-theme-color-text);
  --thepro-componentname-border: var(--thepro-theme-color-border);
  --thepro-componentname-shadow: var(--thepro-theme-shadow-lg);
  --thepro-componentname-border-radius: var(--thepro-theme-radius-md);
  --thepro-componentname-padding: var(--thepro-theme-spacing-4);
  --thepro-componentname-font-size: var(--thepro-theme-font-size-base);
  --thepro-componentname-font-family: var(--thepro-theme-font-family-primary);
}
```

### Шаг 3: Создание основных стилей

**Файл: `src/components/ComponentName/styles/ComponentName.scss`**
```scss
.component-name {
  background: var(--thepro-componentname-bg);
  color: var(--thepro-componentname-text);
  border: 1px solid var(--thepro-componentname-border);
  box-shadow: var(--thepro-componentname-shadow);
  border-radius: var(--thepro-componentname-border-radius);
  padding: var(--thepro-componentname-padding);
  font-size: var(--thepro-componentname-font-size);
  font-family: var(--thepro-componentname-font-family);
  transition: var(--thepro-theme-transition);
  
  &:hover {
    box-shadow: var(--thepro-theme-shadow-lg);
  }
  
  @media (max-width: var(--thepro-theme-breakpoint-md)) {
    padding: var(--thepro-theme-spacing-3);
  }
}
```

## ⚡ Интеграция с Vue компонентами

### Шаг 1: Создание Vue компонента

**Файл: `src/components/ComponentName/ComponentName.vue`**
```vue
<template>
  <div class="component-name">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Компонент не содержит логики тем - стили управляются через CSS
</script>

<style lang="scss">
@use './styles/ComponentName.scss';
</style>
```

### Шаг 2: Использование в приложении

**Файл: `src/App.vue`**
```vue
<template>
  <div class="app" :data-theme="currentTheme">
    <div class="theme-selector">
      <label>Выберите тему:</label>
      <select v-model="currentTheme">
        <option value="light">Светлая</option>
        <option value="dark">Темная</option>
        <option value="green">Зеленая</option>
        <option value="starwars">Star Wars</option>
      </select>
    </div>
    
    <ComponentName>
      Содержимое компонента
    </ComponentName>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ComponentName from './components/ComponentName/ComponentName.vue'

const currentTheme = ref<'light' | 'dark' | 'green' | 'starwars'>('light')
</script>
```

## 🔧 TypeScript поддержка

### Шаг 1: Создание типов для тем

**Файл: `src/types/theme.ts`**
```typescript
export type ThemeName = 'light' | 'dark' | 'green' | 'starwars' | 'new-theme'

export interface ThemeConfig {
  name: ThemeName
  label: string
  description?: string
}

export const AVAILABLE_THEMES: ThemeConfig[] = [
  { name: 'light', label: 'Светлая' },
  { name: 'dark', label: 'Темная' },
  { name: 'green', label: 'Зеленая' },
  { name: 'starwars', label: 'Star Wars' },
  { name: 'new-theme', label: 'Новая тема' }
]
```

### Шаг 2: Типизированные хуки

**Файл: `src/composables/useTheme.ts`**
```typescript
import { ref, watch } from 'vue'
import type { ThemeName } from '@/types/theme'

export function useTheme() {
  const currentTheme = ref<ThemeName>('light')
  
  const setTheme = (theme: ThemeName) => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    
    // Сохранение в localStorage
    localStorage.setItem('theme', theme)
  }
  
  const toggleTheme = () => {
    const themes: ThemeName[] = ['light', 'dark', 'green', 'starwars']
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }
  
  // Восстановление темы из localStorage
  const savedTheme = localStorage.getItem('theme') as ThemeName
  if (savedTheme) {
    setTheme(savedTheme)
  }
  
  return {
    currentTheme,
    setTheme,
    toggleTheme
  }
}
```

## ✅ Валидация тем

### Шаг 1: Создание валидатора

**Файл: `scripts/validate-themes.ts`**
```typescript
import fs from 'fs'
import path from 'path'

interface ValidationResult {
  component: string
  theme: string
  isValid: boolean
  errors: string[]
}

function validateTheme(componentName: string, themePath: string): ValidationResult {
  // Логика валидации
  return {
    component: componentName,
    theme: path.basename(themePath, '.scss'),
    isValid: true,
    errors: []
  }
}

// Основная функция валидации
function validateAllThemes() {
  // Сканирование и валидация всех тем
}
```

### Шаг 2: Добавление npm скрипта

**Файл: `package.json`**
```json
{
  "scripts": {
    "validate-themes": "tsx scripts/validate-themes.ts"
  }
}
```

## 📋 Лучшие практики

### 1. Именование CSS переменных

```scss
// ✅ Правильно - префикс компонента
--thepro-componentname-property: value;

// ❌ Неправильно - без префикса
--property: value;
```

### 2. Использование глобальных переменных

```scss
// ✅ Правильно - используем глобальные переменные
--thepro-componentname-bg: var(--thepro-theme-color-bg-secondary);

// ❌ Неправильно - хардкод
--thepro-componentname-bg: #f8f9fa;
```

### 3. Структура файлов

```
✅ Правильно:
src/components/ComponentName/
├── types.ts
├── ComponentName.vue
└── styles/
    ├── ComponentName.scss
    └── themes/
        ├── light.scss
        ├── dark.scss
        └── green.scss

❌ Неправильно:
src/components/ComponentName/
├── ComponentName.vue
└── ComponentName.scss (с импортами тем)
```

### 4. Архитектурные правила

- **НЕ** импортируйте темы в файлы стилей компонентов
- **НЕ** используйте `data-theme` селекторы в основных файлах стилей
- **НЕ** добавляйте CSS классы в файлы тем
- **ИСПОЛЬЗУЙТЕ** только CSS переменные в файлах тем
- **ИСПОЛЬЗУЙТЕ** TypeScript интерфейсы для всех переменных

## 🎯 Примеры использования

### Пример 1: Простой компонент

**Button.vue**
```vue
<template>
  <button class="button" :class="variant">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
}

defineProps<Props>()
</script>

<style lang="scss">
@use './styles/Button.scss';
</style>
```

**Button.scss**
```scss
.button {
  background: var(--thepro-button-bg);
  color: var(--thepro-button-text);
  border: 1px solid var(--thepro-button-border);
  border-radius: var(--thepro-button-border-radius);
  padding: var(--thepro-button-padding);
  font-family: var(--thepro-theme-font-family-primary);
  transition: var(--thepro-theme-transition);
  
  &.primary {
    background: var(--thepro-button-bg-primary);
    color: var(--thepro-button-text-primary);
  }
  
  &.secondary {
    background: var(--thepro-button-bg-secondary);
    color: var(--thepro-button-text-secondary);
  }
  
  &.danger {
    background: var(--thepro-button-bg-danger);
    color: var(--thepro-button-text-danger);
  }
}
```

### Пример 2: Сложный компонент с адаптивностью

**Card.vue**
```vue
<template>
  <div class="card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@use './styles/Card.scss';
</style>
```

**Card.scss**
```scss
.card {
  background: var(--thepro-card-bg);
  border: 1px solid var(--thepro-card-border);
  border-radius: var(--thepro-card-border-radius);
  box-shadow: var(--thepro-card-shadow);
  overflow: hidden;
  
  .card-header {
    background: var(--thepro-card-header-bg);
    padding: var(--thepro-card-header-padding);
    border-bottom: 1px solid var(--thepro-card-header-border);
  }
  
  .card-body {
    padding: var(--thepro-card-body-padding);
  }
  
  .card-footer {
    background: var(--thepro-card-footer-bg);
    padding: var(--thepro-card-footer-padding);
    border-top: 1px solid var(--thepro-card-footer-border);
  }
  
  @media (max-width: var(--thepro-theme-breakpoint-md)) {
    border-radius: var(--thepro-card-border-radius-mobile);
    
    .card-body {
      padding: var(--thepro-card-body-padding-mobile);
    }
  }
}
```

## 🚀 Заключение

Данная архитектура обеспечивает:

- **Масштабируемость**: Легко добавлять новые темы и компоненты
- **Типобезопасность**: TypeScript поддержка всех CSS переменных
- **Валидацию**: Автоматическая проверка архитектурных правил
- **Производительность**: CSS переменные работают нативно
- **Гибкость**: Возможность создания любых тем без изменения компонентов

Следуя этому руководству, вы сможете создать надежную и масштабируемую систему тем для вашего Vue проекта.
