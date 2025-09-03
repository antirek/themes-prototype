<template>
  <div :data-theme="currentTheme" class="base-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import type { ThemeName } from '../../types/theme'

interface Props {
  initialTheme?: ThemeName
}

const props = withDefaults(defineProps<Props>(), {
  initialTheme: 'light'
})

// Состояние текущей темы
const currentTheme = ref<ThemeName>(props.initialTheme)

// Предоставляем тему и функцию её изменения дочерним компонентам
provide('theme', {
  currentTheme,
  setTheme: (theme: ThemeName) => {
    currentTheme.value = theme
  }
})

// Экспортируем для внешнего использования
defineExpose({
  currentTheme,
  setTheme: (theme: ThemeName) => {
    currentTheme.value = theme
  }
})
</script>

<style lang="scss" scoped>
.base-container {
  min-height: 100vh;
  width: 100%;
  transition: all 0.3s ease;
}
</style>
