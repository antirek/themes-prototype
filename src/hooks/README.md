# Hooks (Vue Composables)

**Hooks** - это Vue composables, которые предоставляют общую логику для компонентов.

## useTheme

Простой и независимый хук для чтения CSS-переменных из тем.

### Функциональность

- **Чтение CSS-переменных**: Автоматически ищет CSS-переменные во всех элементах с темами
- **Определение текущей темы**: Может определить активную тему страницы
- **Полная независимость**: Не требует передачи элементов или настройки

### API

```typescript
const { 
  getCssVariable,    // Читать CSS-переменную
  getCurrentTheme     // Получить текущую тему
} = useTheme()
```

### Возвращаемые значения

- `getCssVariable: (variableName: string, defaultValue?: string) => string` - читать CSS-переменную
- `getCurrentTheme: () => ThemeName` - получить текущую активную тему

### Использование

#### Базовое использование

```vue
<template>
  <div data-theme="light">
    <p>CSS переменная: {{ cssValue }}</p>
    <p>Текущая тема: {{ currentTheme }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/hooks'

const { getCssVariable, getCurrentTheme } = useTheme()

// Читаем CSS-переменную
const cssValue = computed(() => {
  return getCssVariable('--my-css-variable', 'default')
})

// Получаем текущую тему
const currentTheme = computed(() => {
  return getCurrentTheme()
})
</script>
```

#### Чтение CSS-переменных для компонентов

```vue
<template>
  <div class="user-avatar">
    <AvatarIcon :icon-type="iconType" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/hooks'
import { AvatarIcon } from '@/components/atoms/AvatarIcon'

const { getCssVariable } = useTheme()

// Читаем CSS-переменную для определения типа иконки
const iconType = computed(() => {
  return getCssVariable('--thepro-useravatar-icon-type', 'default')
})
</script>
```

### Логика работы

1. **Поиск элементов с темами**: Ищет все элементы с атрибутом `data-theme`
2. **Чтение CSS-переменной**: Проходит по всем найденным элементам и ищет нужную переменную
3. **Fallback**: Если не нашел, проверяет `documentElement`
4. **Определение темы**: Ищет первый элемент с `data-theme` для определения активной темы

### Преимущества

- **Полная независимость**: Не нужно передавать элементы или настраивать
- **Простота**: Минимальный API, понятная логика
- **Производительность**: Читает переменные только при необходимости
- **Универсальность**: Работает с любыми компонентами без изменений

### Когда использовать

- **Чтение CSS-переменных** из любых тем
- **Определение конфигурации** на основе темы
- **Динамическое переключение** стилей и поведения
- **Любые случаи**, когда нужно читать CSS-переменные без привязки к конкретным элементам
