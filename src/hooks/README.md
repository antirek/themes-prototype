# Hooks (Vue Composables)

**Hooks** - это Vue composables, которые предоставляют общую логику для компонентов.

## useTheme

Хук для определения текущей темы и чтения CSS-переменных.

### Функциональность

- **Определение темы**: Автоматически определяет текущую тему через `data-theme` атрибут
- **Наблюдение за изменениями**: Использует `MutationObserver` для отслеживания изменений темы
- **Чтение CSS-переменных**: Может читать CSS-переменные из целевого элемента и его родителей
- **Fallback логика**: Автоматически ищет ближайший элемент с темой, если целевой элемент не передан

### API

```typescript
const { 
  currentTheme,           // Реактивная ссылка на текущую тему
  detectTheme,            // Функция для принудительного определения темы
  startObserving,         // Начать наблюдение за изменениями
  stopObserving,          // Остановить наблюдение
  updateTargetElement,    // Обновить целевой элемент
  getCssVariable          // Читать CSS-переменную
} = useTheme(element?)
```

### Параметры

- `element?: HTMLElement | null` - целевой элемент для определения темы (опционально)

### Возвращаемые значения

- `currentTheme: Ref<ThemeName>` - текущая тема ('light', 'dark', 'green', 'starwars')
- `detectTheme: () => void` - функция для принудительного определения темы
- `startObserving: () => void` - начать наблюдение за изменениями темы
- `stopObserving: () => void` - остановить наблюдение за изменениями темы
- `updateTargetElement: (element: HTMLElement | null) => void` - обновить целевой элемент
- `getCssVariable: (variableName: string, defaultValue?: string) => string` - читать CSS-переменную

### Использование

#### Базовое использование

```vue
<template>
  <div ref="elementRef" data-theme="light">
    <p>Текущая тема: {{ currentTheme }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/hooks'

const elementRef = ref<HTMLElement>()
const { currentTheme, updateTargetElement } = useTheme()

// Обновляем целевой элемент при изменении ref
watch(elementRef, (newElement) => {
  updateTargetElement(newElement || null)
}, { immediate: true })
</script>
```

#### Чтение CSS-переменных

```vue
<template>
  <div ref="avatarRef" class="user-avatar">
    <AvatarIcon :icon-type="iconType" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTheme } from '@/hooks'
import { AvatarIcon } from '@/components/atoms/AvatarIcon'

const avatarRef = ref<HTMLElement>()
const { getCssVariable, updateTargetElement } = useTheme()

// Следим за изменениями ref и обновляем целевой элемент
watch(avatarRef, (newElement) => {
  updateTargetElement(newElement || null)
}, { immediate: true })

// Читаем CSS-переменную для определения типа иконки
const iconType = computed(() => {
  return getCssVariable('--thepro-useravatar-icon-type', 'default')
})
</script>
```

### Логика работы

1. **Определение темы**: Хук ищет ближайший родительский элемент с атрибутом `data-theme`
2. **Наблюдение**: Использует `MutationObserver` для отслеживания изменений атрибутов
3. **CSS-переменные**: Читает переменные из элемента с темой или из `documentElement` как fallback
4. **Реактивность**: Автоматически обновляет `currentTheme` при изменении темы

### Fallback логика

Если целевой элемент не передан или не найден:

1. Ищет элемент с классом `.user-avatar` (специальный случай для аватаров)
2. Ищет ближайший родительский элемент с `data-theme`
3. Использует `documentElement` как последний fallback

### Преимущества

- **Автоматическое определение**: Не нужно вручную передавать тему
- **Реактивность**: Автоматически обновляется при изменении темы
- **Гибкость**: Может работать с любым элементом или глобально
- **CSS-переменные**: Может читать любые CSS-переменные из тем
- **Производительность**: Использует эффективное наблюдение за DOM изменениями
