# AvatarIcon

Атомарный компонент для отображения иконок аватара с поддержкой переключения по темам.

## Назначение

`AvatarIcon` - это базовый компонент, который:
- Отображает иконки аватара в зависимости от темы
- Поддерживает автоматическое переключение через CSS переменные
- Позволяет принудительно указать тип иконки через props
- Предоставляет hover эффекты и специальные стили

## Структура

```
AvatarIcon/
├── AvatarIcon.vue          # Основной компонент
├── types.ts                # TypeScript типы
├── index.ts                # Экспорты
├── styles/                 # Стили
│   └── AvatarIcon.scss     # Основные стили компонента
└── icons/                  # Иконки
    ├── DefaultAvatarIcon.vue
    ├── StarWarsAvatarIcon.vue
    └── index.ts
```

## Props

```typescript
interface AvatarIconProps {
  /** Ссылка на элемент аватара для определения темы */
  avatarElement?: HTMLElement | null
  /** Принудительное указание типа иконки (переопределяет CSS переменную) */
  iconType?: AvatarIconType
}
```

## CSS переменные

Компонент использует следующие CSS переменные:

- `--thepro-useravatar-icon-padding` - отступы иконки (по умолчанию: 15%)
- `--thepro-useravatar-icon-color` - цвет иконки
- `--thepro-useravatar-icon-color-hover` - цвет иконки при hover
- `--thepro-useravatar-icon-effects` - специальные эффекты для Star Wars темы
- `--thepro-useravatar-icon-effects-hover` - эффекты при hover для Star Wars темы
- `--thepro-theme-transition` - время перехода для анимаций

## Использование

### Автоматическое определение через CSS переменные

```vue
<template>
  <div data-theme="starwars">
    <AvatarIcon />
  </div>
</template>
```

### Принудительное указание типа

```vue
<template>
  <AvatarIcon icon-type="starwars" />
</template>
```

### В составе UserAvatar

```vue
<template>
  <UserAvatar /> <!-- Внутри автоматически использует AvatarIcon -->
</template>
```

## Зависимости

- `useCssVariable` хук для чтения CSS переменных
- `DefaultAvatarIcon` и `StarWarsAvatarIcon` компоненты
- CSS переменные темы для стилизации

## Стили

Стили вынесены в отдельный файл `styles/AvatarIcon.scss` и включают:

- Базовые стили иконки (размеры, отступы, переходы)
- Hover эффекты (масштабирование, изменение цвета)
- Специальные эффекты для Star Wars темы (тени, фильтры)

## Принципы дизайна

1. **Атомарность** - компонент делает одну вещь: отображает иконку
2. **Гибкость** - поддерживает как автоматическое, так и принудительное управление
3. **Доступность** - использует семантические CSS переменные
4. **Производительность** - минимальные перерисовки, оптимизированные переходы
