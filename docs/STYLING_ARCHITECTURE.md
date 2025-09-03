# 🎨 АРХИТЕКТУРА СТИЛЕЙ И СИСТЕМА ТЕМ

## 🎯 **ОБЩАЯ КОНЦЕПЦИЯ**

Система стилей в `@thepro/cards` построена на принципе **"CSS переменные + контекст контейнеров"**, что позволяет компонентам получать доступ к темам насквозь, без явной передачи пропсов.

---

## 🏗️ **АРХИТЕКТУРНАЯ СХЕМА**

```
┌─────────────────────────────────────────────────────────────┐
│                    BaseContainer                           │
│  data-theme="starwars"                                    │
│  data-container-id="profile-section"                      │
│  style="--thepro-useravatar-size: 200px"                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              UserProfileCard                        │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │              UserAvatar                     │   │   │
│  │  │  ┌─────────────────────────────────────┐   │   │   │
│  │  │  │            AvatarIcon                │   │   │   │
│  │  │  └─────────────────────────────────────┘   │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Ключевой принцип**: Каждый уровень может читать CSS переменные от родительского контейнера через `useTheme` хук.

---

## 🔧 **ХИТРОСТИ И ТЕХНИЧЕСКИЕ РЕШЕНИЯ**

### **1. MutationObserver для реактивности**

```typescript
// src/hooks/useTheme.ts
const startObserving = () => {
  if (!containerId) return
  
  const container = document.querySelector(`[data-container-id="${containerId}"]`)
  if (container) {
    observer = new MutationObserver((mutations) => {
      let shouldUpdate = false
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          shouldUpdate = true
        }
      })
      
      if (shouldUpdate) {
        updateThemeAndVariables()
      }
    })
    
    observer.observe(container, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })
  }
}
```

**Что это дает:**
- ✅ **Автоматическое обновление** при смене темы
- ✅ **Реактивность** без ручного управления
- ✅ **Отслеживание изменений** в реальном времени

### **2. Иерархический поиск CSS переменных**

```typescript
const getCssVariable = (variableName: string, defaultValue?: string): string => {
  if (!containerId) {
    return defaultValue || ''
  }
  
  // 1. Сначала ищем в кэшированных переменных
  if (cssVariables.value[variableName]) {
    return cssVariables.value[variableName]
  }
  
  // 2. Ищем в контейнере по data-container-id
  const container = document.querySelector(`[data-container-id="${containerId}"]`)
  if (container) {
    const value = getComputedStyle(container).getPropertyValue(variableName)
    if (value && value.trim()) {
      return value.trim()
    }
  }
  
  // 3. Fallback к documentElement (глобальные переменные)
  if (document.documentElement) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variableName)
    if (value && value.trim()) {
      return value.trim()
    }
  }
  
  return defaultValue || ''
}
```

**Иерархия поиска:**
1. **Кэш** - быстрый доступ к недавно прочитанным переменным
2. **Контейнер** - переменные, определенные в `BaseContainer`
3. **Глобальные** - переменные на уровне `:root`

### **3. Provide/Inject для контекста**

```typescript
// src/components/containers/BaseContainer.vue
const props = withDefaults(defineProps<Props>(), {
  initialTheme: 'light'
})

// Предоставляем ID контейнера и тему дочерним компонентам
provide('containerId', props.id)
provide('theme', {
  currentTheme,
  setTheme: (theme: ThemeName) => {
    currentTheme.value = theme
  }
})
```

```typescript
// src/hooks/useContainerId.ts
export function useContainerId(): string | null {
  return inject('containerId', null)
}
```

**Что это дает:**
- ✅ **Автоматическое получение** `containerId` без пропсов
- ✅ **Контекст темы** для всех вложенных компонентов
- ✅ **Чистый API** без загрязнения компонентов

---

## 🎨 **СИСТЕМА CSS ПЕРЕМЕННЫХ**

### **Структура именования**

```
--thepro-theme-*           # Глобальные переменные темы
├── --thepro-theme-color-primary
├── --thepro-theme-color-secondary
├── --thepro-theme-spacing-*
└── --thepro-theme-shadow-*

--thepro-{component}-*     # Компонентные переменные
├── --thepro-useravatar-size
├── --thepro-useravatar-icon-color
├── --thepro-cardheader-bg
└── --thepro-cardbody-text
```

### **Примеры использования**

```scss
// src/components/elements/UserAvatar/styles/themes/starwars.scss
[data-theme="starwars"] {
  --thepro-useravatar-size: 160px;
  --thepro-useravatar-icon-color: var(--thepro-theme-color-primary);
  --thepro-useravatar-border: var(--thepro-theme-color-primary);
  --thepro-useravatar-shadow: var(--thepro-theme-shadow-lg);
  --thepro-useravatar-icon-type: starwars;
}
```

```scss
// src/themes/starwars/starwars.scss
[data-theme="starwars"] {
  --thepro-theme-color-primary: #ffd700;
  --thepro-theme-color-secondary: #ff6b35;
  --thepro-theme-shadow-lg: 0 0 20px rgba(255, 215, 0, 0.4);
}
```

---

## 🚀 **КАК КОМПОНЕНТЫ ПОЛУЧАЮТ ДОСТУП К ТЕМАМ**

### **1. UserAvatar - чтение CSS переменных**

```vue
<!-- src/components/elements/UserAvatar/UserAvatar.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../../../hooks'

const { getCssVariable } = useTheme()

// Определяем тип иконки на основе CSS-переменной
const currentIconType = computed<AvatarIconType>(() => {
  const iconType = getCssVariable('--thepro-useravatar-icon-type', 'default')
  return iconType as AvatarIconType || 'default'
})

// Вычисляем размер аватара
const avatarSize = computed(() => {
  const size = getCssVariable('--thepro-useravatar-size', '140px')
  return size
})

// Вычисляем цвет иконки
const avatarIconColor = computed(() => {
  return getCssVariable('--thepro-useravatar-icon-color', 'currentColor')
})
</script>
```

**Что происходит:**
1. `useTheme()` автоматически получает `containerId` через inject
2. `getCssVariable()` ищет переменную в контейнере
3. Компонент получает актуальные значения без явной передачи

### **2. AvatarIcon - применение стилей**

```vue
<!-- src/components/atoms/AvatarIcon/AvatarIcon.vue -->
<script setup lang="ts">
const props = withDefaults(defineProps<AvatarIconProps>(), {
  color: 'currentColor',
  size: '24px'
})

// SVG иконки получают цвет напрямую
const StarWarsIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: props.color, // Цвет передается как prop
  width: '100%',
  height: '100%'
}, [
  // ... SVG paths
])
</script>
```

---

## 🔄 **ПРОЦЕСС ОБНОВЛЕНИЯ ТЕМЫ**

### **Последовательность действий**

1. **Пользователь меняет тему** в `ThemeSelector`
2. **BaseContainer обновляет** `data-theme` атрибут
3. **MutationObserver срабатывает** и вызывает `updateThemeAndVariables()`
4. **CSS переменные перечитываются** из контейнера
5. **Все компоненты автоматически обновляются** через реактивные computed свойства

### **Пример обновления**

```typescript
// Пользователь выбирает тему "starwars"
themeSelector.setTheme('starwars')

// BaseContainer обновляется
container.setAttribute('data-theme', 'starwars')

// MutationObserver срабатывает
updateThemeAndVariables()

// CSS переменные обновляются
cssVariables.value = {
  '--thepro-useravatar-icon-type': 'starwars',
  '--thepro-useravatar-icon-color': '#ffd700',
  '--thepro-useravatar-size': '160px'
}

// UserAvatar автоматически обновляется
currentIconType.value = 'starwars'  // ✅
avatarIconColor.value = '#ffd700'   // ✅
avatarSize.value = '160px'          // ✅
```

---

## 🎭 **ПРЕИМУЩЕСТВА АРХИТЕКТУРЫ**

### **✅ Для разработчиков**
- **Нет необходимости передавать темы** через пропсы
- **Автоматическое обновление** при смене темы
- **Чистый API** компонентов
- **Легкая кастомизация** через CSS переменные

### **✅ Для производительности**
- **Кэширование CSS переменных** в `useTheme`
- **Реактивные обновления** только при необходимости
- **Минимальные перерисовки** DOM

### **✅ Для гибкости**
- **Любое количество контейнеров** с разными темами
- **Переопределение переменных** на любом уровне
- **Динамическое переключение** тем

---

## 🧪 **ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ**

### **Множественные контейнеры**

```vue
<template>
  <!-- Профиль пользователя в Star Wars теме -->
  <BaseContainer id="profile" initial-theme="starwars">
    <UserProfileCard :user="user" />
  </BaseContainer>

  <!-- Настройки в светлой теме -->
  <BaseContainer id="settings" initial-theme="light">
    <CardHeader text="Настройки" />
    <CardBody text="Конфигурация" />
  </BaseContainer>

  <!-- Статистика в темной теме -->
  <BaseContainer id="stats" initial-theme="dark">
    <CardPreview :data="statsData" />
  </BaseContainer>
</template>
```

### **Кастомизация через CSS переменные**

```vue
<template>
  <BaseContainer 
    id="custom" 
    initial-theme="light"
    :css-variables="{
      '--thepro-useravatar-size': '300px',
      '--thepro-useravatar-icon-color': '#e74c3c',
      '--thepro-cardheader-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }"
  >
    <UserAvatar />
    <CardHeader text="Кастомный заголовок" />
  </BaseContainer>
</template>
```

---

## 🔍 **ОТЛАДКА И ВАЛИДАЦИЯ**

### **Валидатор тем**

```bash
npm run validate-themes
```

**Проверяет:**
- Соответствие TypeScript интерфейсов и SCSS переменных
- Правильность префиксов CSS переменных
- Отсутствие глобальных переменных в компонентных темах

### **DevTools для отладки**

```javascript
// В консоли браузера
const container = document.querySelector('[data-container-id="profile"]')
const computedStyle = getComputedStyle(container)

// Посмотреть все CSS переменные
for (let i = 0; i < computedStyle.length; i++) {
  const property = computedStyle[i]
  if (property.indexOf('--') === 0) {
    console.log(property, computedStyle.getPropertyValue(property))
  }
}
```

---

## 📚 **ЗАКЛЮЧЕНИЕ**

Архитектура стилей в `@thepro/cards` представляет собой **элегантное решение** для управления темами:

- **CSS переменные** обеспечивают гибкость и производительность
- **BaseContainer** создает изолированный контекст тем
- **useTheme хук** автоматически получает доступ к переменным
- **MutationObserver** обеспечивает реактивность
- **Provide/Inject** передает контекст без загрязнения API

**Результат**: Компоненты могут получать доступ к темам насквозь, автоматически обновляться и легко кастомизироваться, сохраняя при этом чистый и понятный API.
