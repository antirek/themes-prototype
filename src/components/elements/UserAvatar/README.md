# UserAvatar

**UserAvatar** - это базовый элемент для отображения аватара пользователя с поддержкой изображений и fallback иконок.

## Характеристики

- **Изображения**: Поддерживает загрузку изображений профиля
- **Fallback иконки**: Автоматически показывает иконку при отсутствии изображения
- **Темы**: Поддерживает все темы проекта через CSS-переменные
- **Адаптивность**: Различные размеры для разных экранов
- **Динамические иконки**: Автоматически переключает тип иконки на основе темы

## Архитектура

### Принцип работы

`UserAvatar` **НЕ знает о темах напрямую**. Вместо этого он:

1. **Использует `useTheme` хук** для определения контекста темы
2. **Читает CSS-переменную** `--thepro-useravatar-icon-type` для определения типа иконки
3. **Передает тип иконки** в `AvatarIcon` компонент

### Разделение ответственности

- **UserAvatar** - отвечает за отображение аватара и определение типа иконки
- **AvatarIcon** - отвечает за рендеринг конкретной иконки
- **CSS-переменные** - определяют, какой тип иконки использовать в каждой теме
- **useTheme** - предоставляет универсальный способ чтения CSS-переменных

## CSS-переменные

### Основные переменные

```scss
--thepro-useravatar-size: 140px;                    // Размер аватара
--thepro-useravatar-border: var(--thepro-theme-color-primary); // Цвет границы
--thepro-useravatar-border-radius: 50%;              // Радиус скругления
--thepro-useravatar-shadow: var(--thepro-theme-shadow-sm); // Тень
--thepro-useravatar-icon-type: default;              // Тип иконки по умолчанию
```

### Переменные для разных размеров

```scss
--thepro-useravatar-size-large: 130px;      // Большой размер
--thepro-useravatar-size-medium: 120px;     // Средний размер
--thepro-useravatar-size-mobile: 110px;     // Мобильный размер
--thethepro-useravatar-size-small: 100px;   // Маленький размер
```

### Переменные для иконок

```scss
--thepro-useravatar-icon-color: var(--thepro-theme-color-gray-600); // Цвет иконки
--thepro-useravatar-icon-color-hover: var(--thepro-theme-color-gray-600); // Цвет при наведении
--thepro-useravatar-icon-padding: var(--thepro-theme-spacing-3); // Отступы иконки
--thepro-useravatar-icon-type: default; // Тип иконки (default, starwars)
```

## Темы

### Light Theme
- **Иконка**: `default` (стандартная иконка пользователя)
- **Цвет**: Серый (`--thepro-theme-color-gray-600`)
- **Тень**: Легкая (`--thepro-theme-shadow-sm`)

### Dark Theme
- **Иконка**: `default` (стандартная иконка пользователя)
- **Цвет**: Серый (`--thepro-theme-color-gray-600`)
- **Тень**: Средняя (`--thepro-theme-shadow-md`)

### Green Theme
- **Иконка**: `default` (стандартная иконка пользователя)
- **Цвет**: Зеленый (`--thepro-theme-color-success`)
- **Тень**: Легкая (`--thepro-theme-shadow-sm`)

### Star Wars Theme
- **Иконка**: `starwars` (шлем Дарта Вейдера)
- **Цвет**: Основной цвет темы (`--thepro-theme-color-primary`)
- **Тень**: Сильная (`--thepro-theme-shadow-lg`)
- **Размер**: Увеличенный (160px)

## Использование

### Базовое использование

```vue
<template>
  <UserAvatar 
    src="path/to/avatar.jpg"
    alt="User avatar"
  />
</template>

<script setup lang="ts">
import { UserAvatar } from '@/components/elements'
</script>
```

### С указанием размера

```vue
<template>
  <UserAvatar 
    src="path/to/avatar.jpg"
    alt="User avatar"
    size="large"
  />
</template>
```

### Без изображения (только иконка)

```vue
<template>
  <UserAvatar alt="User avatar" />
</template>
```

## Логика отображения

1. **Если есть `src` и изображение загружено успешно** → показываем изображение
2. **Если нет `src` или произошла ошибка загрузки** → показываем иконку
3. **Тип иконки определяется автоматически** через CSS-переменную `--thepro-useravatar-icon-type`
4. **Иконка передается в `AvatarIcon`** как проп `icon-type`

## Преимущества архитектуры

- **🎯 Разделение ответственности**: UserAvatar не знает о конкретных темах
- **🔧 Гибкость**: Легко добавлять новые типы иконок через CSS-переменные
- **♻️ Переиспользование**: AvatarIcon может использоваться независимо
- **🎨 Темы**: Полная поддержка темизации без хардкода
- **📱 Адаптивность**: Автоматическое изменение размеров для разных экранов
