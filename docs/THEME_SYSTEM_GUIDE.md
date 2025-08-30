# 🎨 Руководство по внедрению системы тем в UI фреймворк

## 📋 Содержание

1. [Обзор архитектуры](#обзор-архитектуры)
2. [Принципы проектирования](#принципы-проектирования)
3. [Структура файлов](#структура-файлов)
4. [Пошаговое внедрение](#пошаговое-внедрение)
5. [Валидация и контроль качества](#валидация-и-контроль-качества)
6. [Примеры реализации](#примеры-реализации)
7. [Лучшие практики](#лучшие-практики)
8. [Миграция существующих проектов](#миграция-существующих-проектов)

---

## 🏗️ Обзор архитектуры

### Основные концепции

**Система тем** - это архитектурный подход к управлению стилями компонентов, основанный на:

1. **CSS переменных (Custom Properties)** - для динамического изменения стилей
2. **Модульной структуре** - разделение на глобальные и компонентные темы
3. **Строгой типизации** - TypeScript интерфейсы для всех CSS переменных
4. **Автоматической валидации** - проверка соответствия архитектурным правилам

### Архитектурные слои

```
┌─────────────────────────────────────────────────────────────┐
│                    Приложение                               │
├─────────────────────────────────────────────────────────────┤
│                    Компоненты                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Button    │ │    Card     │ │   Input     │           │
│  │             │ │             │ │             │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                Компонентные темы                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ button/     │ │  card/      │ │  input/     │           │
│  │   themes/   │ │   themes/   │ │   themes/   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                  Глобальные темы                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   light     │ │    dark     │ │   custom    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                Базовые настройки                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   colors    │ │ typography  │ │   spacing   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Принципы проектирования

### 1. Принцип разделения ответственности

- **Глобальные темы** - базовые настройки (цвета, типографика, отступы)
- **Компонентные темы** - специфичные для компонента стили
- **Компоненты** - только логика, никаких жестко заданных стилей

### 2. Принцип именования

```
--<project>-theme-<category>-<property>     // Глобальные переменные
--<project>-<component>-<property>          // Компонентные переменные
```

**Примеры:**
```css
/* Глобальные */
--myapp-theme-color-primary: #007bff;
--myapp-theme-font-family-primary: 'Arial', sans-serif;
--myapp-theme-spacing-md: 1rem;

/* Компонентные */
--myapp-button-bg: var(--myapp-theme-color-primary);
--myapp-button-padding: var(--myapp-theme-spacing-md);
--myapp-button-font-family: var(--myapp-theme-font-family-primary);
```

### 3. Принцип каскадности

```css
/* Базовые настройки */
[data-theme="light"] {
  --myapp-theme-color-primary: #007bff;
  --myapp-theme-color-bg: #ffffff;
}

/* Компонентные настройки */
[data-theme="light"] {
  --myapp-button-bg: var(--myapp-theme-color-primary);
  --myapp-button-text: #ffffff;
}
```

---

## 📁 Структура файлов

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.scss
│   │   ├── types.ts
│   │   └── themes/
│   │       ├── light.scss
│   │       ├── dark.scss
│   │       └── custom.scss
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.scss
│   │   ├── types.ts
│   │   └── themes/
│   │       ├── light.scss
│   │       ├── dark.scss
│   │       └── custom.scss
│   └── ...
├── themes/
│   ├── index.scss
│   ├── types.ts
│   ├── light/
│   │   └── light.scss
│   ├── dark/
│   │   └── dark.scss
│   └── custom/
│       └── custom.scss
├── utils/
│   ├── theme-switcher.ts
│   └── theme-validator.ts
└── scripts/
    └── validate-themes.ts
```

---

## 🚀 Пошаговое внедрение

### Шаг 1: Настройка базовой структуры

1. **Создайте структуру папок:**
```bash
mkdir -p src/themes/{light,dark,custom}
mkdir -p src/components/{Button,Card,Input}/themes
mkdir -p src/utils src/scripts
```

2. **Установите зависимости:**
```bash
npm install sass typescript
npm install --save-dev @types/node glob tsx
```

### Шаг 2: Определение базовых настроек

**src/themes/types.ts:**
```typescript
export type ThemeName = 'light' | 'dark' | 'custom';

export interface ThemeCSSVariables {
  // Цвета
  '--myapp-theme-color-primary': string;
  '--myapp-theme-color-secondary': string;
  '--myapp-theme-color-success': string;
  '--myapp-theme-color-warning': string;
  '--myapp-theme-color-danger': string;
  '--myapp-theme-color-bg': string;
  '--myapp-theme-color-text': string;
  
  // Типографика
  '--myapp-theme-font-family-primary': string;
  '--myapp-theme-font-family-secondary': string;
  '--myapp-theme-font-size-sm': string;
  '--myapp-theme-font-size-base': string;
  '--myapp-theme-font-size-lg': string;
  
  // Отступы
  '--myapp-theme-spacing-xs': string;
  '--myapp-theme-spacing-sm': string;
  '--myapp-theme-spacing-md': string;
  '--myapp-theme-spacing-lg': string;
  '--myapp-theme-spacing-xl': string;
  
  // Скругления
  '--myapp-theme-radius-sm': string;
  '--myapp-theme-radius-md': string;
  '--myapp-theme-radius-lg': string;
  
  // Тени
  '--myapp-theme-shadow-sm': string;
  '--myapp-theme-shadow-md': string;
  '--myapp-theme-shadow-lg': string;
  
  // Переходы
  '--myapp-theme-transition': string;
  '--myapp-theme-transition-fast': string;
}
```

### Шаг 3: Создание глобальных тем

**src/themes/light/light.scss:**
```scss
// Импорт компонентных тем
@use '../../components/Button/themes/light.scss' as button-light;
@use '../../components/Card/themes/light.scss' as card-light;

// Светлая тема
[data-theme="light"] {
  // Цвета
  --myapp-theme-color-primary: #007bff;
  --myapp-theme-color-secondary: #6c757d;
  --myapp-theme-color-success: #28a745;
  --myapp-theme-color-warning: #ffc107;
  --myapp-theme-color-danger: #dc3545;
  --myapp-theme-color-bg: #ffffff;
  --myapp-theme-color-text: #212529;
  
  // Типографика
  --myapp-theme-font-family-primary: 'Arial', sans-serif;
  --myapp-theme-font-family-secondary: 'Georgia', serif;
  --myapp-theme-font-size-sm: 0.875rem;
  --myapp-theme-font-size-base: 1rem;
  --myapp-theme-font-size-lg: 1.25rem;
  
  // Отступы
  --myapp-theme-spacing-xs: 0.25rem;
  --myapp-theme-spacing-sm: 0.5rem;
  --myapp-theme-spacing-md: 1rem;
  --myapp-theme-spacing-lg: 1.5rem;
  --myapp-theme-spacing-xl: 3rem;
  
  // Скругления
  --myapp-theme-radius-sm: 0.25rem;
  --myapp-theme-radius-md: 0.5rem;
  --myapp-theme-radius-lg: 1rem;
  
  // Тени
  --myapp-theme-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --myapp-theme-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --myapp-theme-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
  
  // Переходы
  --myapp-theme-transition: 0.3s ease;
  --myapp-theme-transition-fast: 0.15s ease;
}
```

### Шаг 4: Создание компонентных типов

**src/components/Button/types.ts:**
```typescript
export interface ButtonThemeCSSVariables {
  '--myapp-button-bg': string;
  '--myapp-button-text': string;
  '--myapp-button-border': string;
  '--myapp-button-padding': string;
  '--myapp-button-font-size': string;
  '--myapp-button-border-radius': string;
  '--myapp-button-shadow': string;
  '--myapp-button-hover-bg': string;
  '--myapp-button-hover-shadow': string;
}
```

### Шаг 5: Создание компонентных тем

**src/components/Button/themes/light.scss:**
```scss
[data-theme="light"] {
  --myapp-button-bg: var(--myapp-theme-color-primary);
  --myapp-button-text: #ffffff;
  --myapp-button-border: transparent;
  --myapp-button-padding: var(--myapp-theme-spacing-sm) var(--myapp-theme-spacing-md);
  --myapp-button-font-size: var(--myapp-theme-font-size-base);
  --myapp-button-border-radius: var(--myapp-theme-radius-sm);
  --myapp-button-shadow: var(--myapp-theme-shadow-sm);
  --myapp-button-hover-bg: #0056b3;
  --myapp-button-hover-shadow: var(--myapp-theme-shadow-md);
}
```

### Шаг 6: Создание компонента

**src/components/Button/Button.scss:**
```scss
.button {
  background: var(--myapp-button-bg);
  color: var(--myapp-button-text);
  border: 1px solid var(--myapp-button-border);
  padding: var(--myapp-button-padding);
  font-size: var(--myapp-button-font-size);
  border-radius: var(--myapp-button-border-radius);
  box-shadow: var(--myapp-button-shadow);
  transition: var(--myapp-theme-transition);
  cursor: pointer;
  
  &:hover {
    background: var(--myapp-button-hover-bg);
    box-shadow: var(--myapp-button-hover-shadow);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
}
```

**src/components/Button/Button.tsx:**
```typescript
import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary'
}) => {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### Шаг 7: Создание переключателя тем

**src/utils/theme-switcher.ts:**
```typescript
import { ThemeName } from '../themes/types';

export class ThemeSwitcher {
  private static instance: ThemeSwitcher;
  private currentTheme: ThemeName = 'light';
  
  private constructor() {
    this.loadTheme();
  }
  
  static getInstance(): ThemeSwitcher {
    if (!ThemeSwitcher.instance) {
      ThemeSwitcher.instance = new ThemeSwitcher();
    }
    return ThemeSwitcher.instance;
  }
  
  setTheme(theme: ThemeName): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  
  getTheme(): ThemeName {
    return this.currentTheme;
  }
  
  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('light');
    }
  }
}
```

### Шаг 8: Создание валидатора

**src/scripts/validate-themes.ts:**
```typescript
#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ThemeValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
}

function validateComponentTheme(
  componentName: string,
  themePath: string,
  expectedVariables: string[]
): ThemeValidationResult {
  const content = fs.readFileSync(themePath, 'utf-8');
  const actualVariables: string[] = [];
  
  // Извлекаем CSS переменные
  const variableRegex = /--myapp-([^:]+):/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    actualVariables.push(`--myapp-${match[1]}`);
  }
  
  const missingVariables = expectedVariables.filter(
    expected => !actualVariables.includes(expected)
  );
  
  const extraVariables = actualVariables.filter(
    actual => !expectedVariables.includes(actual)
  );
  
  const isValid = missingVariables.length === 0 && extraVariables.length === 0;
  const errors: string[] = [];
  
  if (missingVariables.length > 0) {
    errors.push(`Отсутствуют: ${missingVariables.join(', ')}`);
  }
  
  if (extraVariables.length > 0) {
    errors.push(`Лишние: ${extraVariables.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: path.basename(themePath, '.scss'),
    isValid,
    errors
  };
}

async function validateAllThemes(): Promise<void> {
  console.log('🔍 Валидация тем...\n');
  
  // Находим все компоненты
  const componentPaths = await glob('src/components/*');
  const results: ThemeValidationResult[] = [];
  
  for (const componentPath of componentPaths) {
    const componentName = path.basename(componentPath);
    const typesPath = path.join(componentPath, 'types.ts');
    
    if (!fs.existsSync(typesPath)) {
      console.log(`⚠️  ${componentName}: types.ts не найден`);
      continue;
    }
    
    // Получаем ожидаемые переменные из интерфейса
    const content = fs.readFileSync(typesPath, 'utf-8');
    const interfaceRegex = /export interface (\w*ThemeCSSVariables)\s*{([^}]+)}/s;
    const match = content.match(interfaceRegex);
    
    if (!match) {
      console.log(`⚠️  ${componentName}: интерфейс не найден`);
      continue;
    }
    
    const interfaceContent = match[2];
    const expectedVariables: string[] = [];
    
    const variableRegex = /'([^']+)':\s*string;/g;
    let varMatch;
    
    while ((varMatch = variableRegex.exec(interfaceContent)) !== null) {
      expectedVariables.push(varMatch[1]);
    }
    
    // Находим все темы компонента
    const themePaths = await glob(path.join(componentPath, 'themes/*.scss'));
    
    for (const themePath of themePaths) {
      const result = validateComponentTheme(componentName, themePath, expectedVariables);
      results.push(result);
      
      if (result.isValid) {
        console.log(`✅ ${componentName}/${result.theme}: OK`);
      } else {
        console.log(`❌ ${componentName}/${result.theme}: ${result.errors.join('; ')}`);
      }
    }
  }
  
  const validResults = results.filter(r => r.isValid);
  const invalidResults = results.filter(r => !r.isValid);
  
  console.log(`\n📊 Результаты: ${validResults.length} валидных, ${invalidResults.length} невалидных`);
  
  if (invalidResults.length > 0) {
    process.exit(1);
  }
}

validateAllThemes().catch(error => {
  console.error('❌ Ошибка валидации:', error);
  process.exit(1);
});
```

### Шаг 9: Настройка сборки

**package.json:**
```json
{
  "scripts": {
    "validate-themes": "tsx src/scripts/validate-themes.ts",
    "build": "npm run validate-themes && vite build",
    "dev": "vite"
  }
}
```

---

## 🔍 Валидация и контроль качества

### Автоматические проверки

1. **Соответствие интерфейсам** - все CSS переменные должны быть определены в TypeScript
2. **Правильность префиксов** - строгое соблюдение схемы именования
3. **Отсутствие глобальных переменных в компонентах** - разделение ответственности
4. **Использование базовых настроек** - никаких жестко заданных значений

### Запуск валидации

```bash
npm run validate-themes
```

### Интеграция в CI/CD

```yaml
# .github/workflows/validate.yml
name: Validate Themes
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run validate-themes
```

---

## 💡 Примеры реализации

### React + TypeScript

```typescript
// src/components/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeSwitcher } from '../utils/theme-switcher';
import { ThemeName } from '../themes/types';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>('light');
  const themeSwitcher = ThemeSwitcher.getInstance();
  
  const setTheme = (newTheme: ThemeName) => {
    themeSwitcher.setTheme(newTheme);
    setThemeState(newTheme);
  };
  
  useEffect(() => {
    setThemeState(themeSwitcher.getTheme());
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Vue 3 + TypeScript

```typescript
// src/composables/useTheme.ts
import { ref, watch } from 'vue';
import { ThemeSwitcher } from '../utils/theme-switcher';
import { ThemeName } from '../themes/types';

export function useTheme() {
  const theme = ref<ThemeName>('light');
  const themeSwitcher = ThemeSwitcher.getInstance();
  
  const setTheme = (newTheme: ThemeName) => {
    themeSwitcher.setTheme(newTheme);
    theme.value = newTheme;
  };
  
  // Инициализация
  theme.value = themeSwitcher.getTheme();
  
  return {
    theme,
    setTheme
  };
}
```

### Angular

```typescript
// src/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeName } from '../themes/types';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<ThemeName>('light');
  public theme$ = this.themeSubject.asObservable();
  
  setTheme(theme: ThemeName): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.themeSubject.next(theme);
  }
  
  getTheme(): ThemeName {
    return this.themeSubject.value;
  }
  
  constructor() {
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
}
```

---

## 🎯 Лучшие практики

### 1. Именование

- ✅ Используйте префикс проекта: `--myapp-theme-...`
- ✅ Группируйте по категориям: `color-`, `font-`, `spacing-`
- ✅ Используйте семантические имена: `primary`, `secondary`, `success`

### 2. Организация файлов

- ✅ Разделяйте глобальные и компонентные темы
- ✅ Используйте TypeScript для типизации
- ✅ Создавайте отдельные файлы для каждой темы

### 3. Производительность

- ✅ Используйте CSS переменные для динамических изменений
- ✅ Избегайте JavaScript-манипуляций с DOM
- ✅ Кэшируйте темы в localStorage

### 4. Доступность

- ✅ Поддерживайте высокий контраст
- ✅ Учитывайте цветовую слепоту
- ✅ Тестируйте с screen readers

### 5. Масштабируемость

- ✅ Создавайте базовые темы
- ✅ Используйте наследование
- ✅ Поддерживайте кастомизацию

---

## 🔄 Миграция существующих проектов

### Этап 1: Анализ

1. **Инвентаризация компонентов**
```bash
find src/components -name "*.scss" -o -name "*.css"
```

2. **Выявление жестко заданных значений**
```bash
grep -r "color:\|background:\|font-size:\|padding:\|margin:" src/
```

3. **Создание плана миграции**
```markdown
- [ ] Создать базовые темы
- [ ] Определить CSS переменные
- [ ] Мигрировать компоненты
- [ ] Настроить валидацию
- [ ] Обновить документацию
```

### Этап 2: Постепенная миграция

1. **Начните с одного компонента**
2. **Создайте базовую тему**
3. **Мигрируйте стили**
4. **Протестируйте**
5. **Повторите для других компонентов**

### Этап 3: Валидация

1. **Настройте автоматические проверки**
2. **Интегрируйте в CI/CD**
3. **Обучите команду**

---

## 📚 Дополнительные ресурсы

### Документация

- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Sass Documentation](https://sass-lang.com/documentation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Инструменты

- [Sass](https://sass-lang.com/) - CSS препроцессор
- [Vite](https://vitejs.dev/) - Сборщик
- [TypeScript](https://www.typescriptlang.org/) - Типизация

### Примеры проектов

- [Material-UI](https://mui.com/material-ui/customization/theming/)
- [Ant Design](https://ant.design/docs/react/customize-theme)
- [Chakra UI](https://chakra-ui.com/docs/styled-system/theme)

---

## 🎉 Заключение

Система тем, описанная в этом руководстве, обеспечивает:

- **Гибкость** - легкое создание новых тем
- **Консистентность** - единообразный подход к стилизации
- **Типобезопасность** - TypeScript интерфейсы для всех переменных
- **Автоматизацию** - валидация и контроль качества
- **Масштабируемость** - поддержка больших проектов

Следуя этому руководству, вы сможете создать мощную и гибкую систему тем для любого UI фреймворка, которая будет расти вместе с вашим проектом.

---

*Создано с ❤️ для сообщества разработчиков*
