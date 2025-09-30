# ThemeSelector

Компонент селектора тем с интеграцией в систему темизации.

## Реализовать

**Цель:** Создать элемент-компонент для выбора темы приложения.

**Структура:**
- Контейнер с классом `theme-selector`
- Label для доступности
- Select с опциями тем
- Интеграция с BaseContainer через inject

**Требования:**
- Поддержка всех тем (light, dark, green, starwars)
- TypeScript типизация
- CSS переменные для кастомизации
- Интеграция с системой темизации через inject
- Обязательное использование внутри BaseContainer
- Кастомизируемые названия тем

**Props:**
```typescript
interface Props {
  themes: Record<string, string>  // Объект с темами и их названиями
}

// По умолчанию:
{
  light: 'Светлая',
  dark: 'Темная', 
  green: 'Зеленая',
  starwars: 'Star Wars'
}
```

## Использование

```vue
<template>
  <BaseContainer>
    <ThemeSelector :themes="customThemes" />
  </BaseContainer>
</template>

<script setup>
const customThemes = {
  light: 'День',
  dark: 'Ночь',
  green: 'Природа'
}
</script>
```

## CSS переменные

```scss
--thepro-themeselector-radius-md: 0.5rem;
--thepro-themeselector-radius-sm: 0.25rem;
--thepro-themeselector-transition: all 0.2s ease;
--thepro-themeselector-font-size-base: 1rem;
--thepro-themeselector-font-size-sm: 0.875rem;
--thepro-themeselector-font-weight-bold: 600;
--thepro-themeselector-color-primary: var(--thepro-primary);
--thepro-themeselector-color-bg: var(--thepro-bg);
--thepro-themeselector-color-bg-secondary: var(--thepro-bg-secondary);
--thepro-themeselector-color-border: var(--thepro-border);
--thepro-themeselector-color-text: var(--thepro-text);
--thepro-themeselector-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
--thepro-themeselector-focus-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
```

## Storybook

Запуск: `npm run storybook`
