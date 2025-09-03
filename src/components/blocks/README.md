# Blocks (Блоки)

**Blocks** - это составные компоненты, которые объединяют несколько elements и atoms в логические блоки с более сложной функциональностью.

## Характеристики

- **Композиция**: Объединяют несколько elements и atoms
- **Логика**: Содержат бизнес-логику среднего уровня
- **Переиспользование**: Могут использоваться в разных контекстах
- **Темы**: Поддерживают все темы проекта
- **Типизация**: Имеют четко определенные TypeScript интерфейсы

## Компоненты

### UserProfileCard
- **Описание**: Карточка профиля пользователя с аватаром, информацией и возможностью смены темы
- **Темы**: light, green, dark, starwars
- **CSS переменные**: `--thepro-userprofilecard-*`
- **Зависимости**: 
  - `CardHeader` (element)
  - `CardBody` (element)
  - `CardFooter` (element)
  - `UserAvatar` (element)
- **Особенности**: 
  - Динамическое переключение тем
  - Адаптивный дизайн
  - Поддержка различных размеров аватара

## Структура файлов

```
blocks/
└── UserProfileCard/
    ├── UserProfileCard.vue
    ├── types.ts
    └── styles/
        ├── UserProfileCard.scss
        └── themes/
            ├── light.scss
            ├── green.scss
            ├── dark.scss
            └── starwars.scss
```

## Использование

```vue
<template>
  <UserProfileCard 
    :user-data="userData"
    :theme="currentTheme"
    @theme-change="handleThemeChange"
  />
</template>

<script setup lang="ts">
import { UserProfileCard } from '@/components/blocks'
import type { UserData, ThemeName } from '@/types'

const userData: UserData = {
  name: 'Иван Иванов',
  phone: '+7 (999) 123-45-67',
  description: 'Frontend разработчик',
  avatar: 'path/to/avatar.jpg'
}

const currentTheme = ref<ThemeName>('light')
</script>
```

## Принципы разработки

1. **Композиция**: Блоки должны состоять из elements и atoms
2. **Логика**: Могут содержать бизнес-логику, но не должны быть слишком сложными
3. **Темы**: Все блоки должны поддерживать все доступные темы
4. **CSS переменные**: Использовать только CSS переменные для стилизации
5. **Типизация**: Четко определять все пропсы и события
6. **Документация**: Каждый блок должен иметь понятное описание

## Отличие от других уровней

- **Atoms** - самые базовые компоненты (иконки, кнопки)
- **Elements** - базовые элементы (заголовки, тела, подвалы, аватары)
- **Blocks** - составные блоки (карточки профиля, формы)
- **Compounds** - сложные составные компоненты (полные страницы, сложные виджеты)
