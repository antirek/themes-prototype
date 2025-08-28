# Скрипты валидации

## validate-themes.ts

Скрипт для валидации CSS переменных тем компонентов. Выполняет три проверки:

1. **Соответствие интерфейсам**: Проверяет, что CSS переменные соответствуют TypeScript интерфейсам
2. **Правильность префиксов**: Проверяет, что CSS переменные имеют правильные префиксы вида `--thepro-<имя компонента>-`
3. **Отсутствие глобальных переменных**: Проверяет, что в файлах стилей компонентов нет объявлений переменных с префиксом `--thepro-theme-`

### Назначение

Проверяет, что все SCSS файлы тем компонентов содержат CSS переменные, которые соответствуют интерфейсам вида `<ComponentName>ThemeCSSVariables` в файлах `types.ts`.

### Как работает

1. **Поиск компонентов**: Находит все директории в `src/components/`
2. **Парсинг интерфейсов**: Извлекает CSS переменные из файлов `types.ts`
3. **Парсинг тем**: Извлекает CSS переменные из SCSS файлов тем
4. **Валидация 1**: Сравнивает ожидаемые и фактические переменные
5. **Валидация 2**: Проверяет правильность префиксов CSS переменных
6. **Валидация 3**: Проверяет отсутствие глобальных переменных в компонентах
7. **Отчет**: Выводит результаты всех трех проверок

### Структура файлов

```
src/components/
├── ComponentName/
│   ├── types.ts                    # Интерфейс ComponentNameThemeCSSVariables
│   └── styles/
│       └── themes/
│           ├── light.scss          # CSS переменные для светлой темы
│           └── dark.scss           # CSS переменные для темной темы

src/themes/
├── types.ts                        # Интерфейс ThemeCSSVariables
├── light/
│   └── light.scss                  # Глобальные CSS переменные для светлой темы
├── dark/
│   └── dark.scss                   # Глобальные CSS переменные для темной темы
└── green/
    └── green.scss                  # Глобальные CSS переменные для зеленой темы
```

### Запуск

```bash
npm run validate-themes
```

### Пример вывода

```
🔍 Начинаю валидацию тем компонентов и глобальных тем...

📋 Проверяю компонент: CardHeader
   Ожидаемые переменные:
     • --thepro-cardheader-bg
     • --thepro-cardheader-text
     • --thepro-cardheader-border
     • --thepro-cardheader-overlay
   ✅ light: интерфейс OK, префиксы OK
   ✅ dark: интерфейс OK, префиксы OK
   ✅ green: интерфейс OK, префиксы OK

🌍 Проверяю глобальные темы...

📋 Проверяю глобальную тему: light
   Ожидаемые переменные:
     • --thepro-theme-color-primary
     • --thepro-theme-color-secondary
     • --thepro-theme-color-success
     • --thepro-theme-color-warning
     • --thepro-theme-color-danger
     • --thepro-theme-color-white
     • --thepro-theme-color-gray-100
     • --thepro-theme-color-gray-300
     • --thepro-theme-color-gray-600
     • --thepro-theme-color-black
     • --thepro-theme-color-text
     • --thepro-theme-color-text-muted
     • --thepro-theme-color-bg
     • --thepro-theme-color-bg-secondary
     • --thepro-theme-color-border
     • --thepro-theme-font-size-sm
     • --thepro-theme-font-size-base
     • --thepro-theme-font-size-lg
     • --thepro-theme-font-size-xl
     • --thepro-theme-font-weight-normal
     • --thepro-theme-font-weight-bold
     • --thepro-theme-line-height
     • --thepro-theme-spacing-0
     • --thepro-theme-spacing-1
     • --thepro-theme-spacing-2
     • --thepro-theme-spacing-3
     • --thepro-theme-spacing-4
     • --thepro-theme-spacing-6
     • --thepro-theme-spacing-8
     • --thepro-theme-radius-sm
     • --thepro-theme-radius-md
     • --thepro-theme-radius-lg
     • --thepro-theme-border-width
     • --thepro-theme-shadow-sm
     • --thepro-theme-shadow-md
     • --thepro-theme-shadow-lg
     • --thepro-theme-transition
     • --thepro-theme-transition-fast
     • --thepro-theme-breakpoint-sm
     • --thepro-theme-breakpoint-md
     • --thepro-theme-breakpoint-lg
   ✅ light: интерфейс OK, префиксы OK

📊 Итоговая статистика:
   Всего проверено: 15 тем (2 проверки на тему)
   ✅ Валидных проверок: 30
   ❌ Невалидных проверок: 0

🎉 Все темы валидны!
```

### Ошибки

Скрипт завершается с кодом ошибки (exit code 1), если найдены несоответствия:

**Валидация 1 - Соответствие интерфейсам:**
- **Отсутствующие переменные**: В теме нет переменных, которые есть в интерфейсе
- **Лишние переменные**: В теме есть переменные, которых нет в интерфейсе

**Валидация 2 - Правильность префиксов:**
- **Неправильные префиксы**: CSS переменные не начинаются с `--thepro-<имя компонента>-`

**Валидация 3 - Отсутствие глобальных переменных:**
- **Запрещенные глобальные переменные**: В файлах стилей компонентов найдены переменные с префиксом `--thepro-theme-`

### Требования к интерфейсам

Интерфейс должен иметь формат:

```typescript
export interface ComponentNameThemeCSSVariables {
  '--thepro-componentname-property': string;
  // ...
}
```

### Требования к SCSS файлам

CSS переменные должны иметь формат:

```scss
[data-theme="theme-name"] {
  --thepro-componentname-property: value;
  // ...
}
```
