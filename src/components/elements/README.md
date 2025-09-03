# Elements (Элементы)

**Elements** - это базовые, атомарные компоненты, которые представляют собой простые UI элементы с минимальной логикой.

## Характеристики

- **Простота**: Минимальная логика, фокус на представлении
- **Переиспользование**: Могут использоваться в любом контексте
- **Темы**: Поддерживают все темы проекта
- **Типизация**: Имеют четко определенные TypeScript интерфейсы
- **Стили**: Используют CSS переменные для темизации

## Компоненты

### CardPreview
- **Описание**: Предварительный просмотр карточки
- **Темы**: light, green, dark
- **CSS переменные**: `--thepro-cardpreview-*`

### CardHeader
- **Описание**: Заголовок карточки
- **Темы**: light, green, dark
- **CSS переменные**: `--thepro-cardheader-*`

### CardFooter
- **Описание**: Подвал карточки
- **Темы**: light, green, dark
- **CSS переменные**: `--thepro-cardfooter-*`

### CardBody
- **Описание**: Основное содержимое карточки
- **Темы**: light, green, dark
- **CSS переменные**: `--thepro-cardbody-*`

### UserAvatar
- **Описание**: Аватар пользователя с поддержкой изображений и иконок
- **Темы**: light, green, dark, starwars
- **CSS переменные**: `--thepro-useravatar-*`
- **Особенности**: Динамическое переключение иконок на основе темы

## Структура файлов

```
elements/
├── CardPreview/
│   ├── CardPreview.vue
│   ├── types.ts
│   └── styles/
│       ├── CardPreview.scss
│       └── themes/
│           ├── light.scss
│           ├── green.scss
│           └── dark.scss
├── CardHeader/
│   ├── CardHeader.vue
│   ├── types.ts
│   └── styles/
│       ├── CardHeader.scss
│       └── themes/
│           ├── light.scss
│           ├── green.scss
│           └── dark.scss
├── CardFooter/
│   ├── CardFooter.vue
│   ├── types.ts
│   └── styles/
│       ├── CardFooter.scss
│       └── themes/
│           ├── light.scss
│           ├── green.scss
│           └── dark.scss
├── CardBody/
│   ├── CardBody.vue
│   ├── types.ts
│   └── styles/
│       ├── CardBody.scss
│       └── themes/
│           ├── light.scss
│           ├── green.scss
│           └── dark.scss
└── UserAvatar/
    ├── UserAvatar.vue
    ├── types.ts
    └── styles/
        ├── UserAvatar.scss
        └── themes/
            ├── light.scss
            ├── green.scss
            ├── dark.scss
            └── starwars.scss
```

## Использование

```vue
<template>
  <!-- Базовые элементы -->
  <CardHeader text="Заголовок" />
  <CardBody text="Содержимое" />
  <CardFooter text="Подвал" />
  
  <!-- Аватар пользователя -->
  <UserAvatar 
    :avatar="userAvatar" 
    :size="'large'"
  />
</template>

<script setup lang="ts">
import { CardHeader, CardBody, CardFooter, UserAvatar } from '@/components/elements'
</script>
```

## Принципы разработки

1. **Единая ответственность**: Каждый элемент отвечает за одну конкретную функцию
2. **Темы**: Все элементы должны поддерживать все доступные темы
3. **CSS переменные**: Использовать только CSS переменные для стилизации
4. **Типизация**: Четко определять все пропсы и события
5. **Документация**: Каждый элемент должен иметь понятное описание
