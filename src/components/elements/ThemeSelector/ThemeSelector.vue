<template>
  <div class="theme-selector">
    <label for="theme-select" class="theme-label">Выберите тему:</label>
    <select
      id="theme-select"
      v-model="currentTheme"
      class="theme-select"
    >
      <option
        v-for="theme in availableThemes"
        :key="theme"
        :value="theme"
      >
        {{ getThemeDisplayName(theme) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import type { ThemeName } from '../../../types/theme'
import { Ref } from 'vue'

// Получаем тему из BaseContainer через inject
const themeContext = inject<{
  currentTheme: Ref<ThemeName>
  setTheme: (theme: ThemeName) => void
}>('theme')

if (!themeContext) {
  throw new Error('ThemeSelector должен использоваться внутри BaseContainer')
}

const { currentTheme, setTheme } = themeContext

// Список доступных тем
const availableThemes: ThemeName[] = ['light', 'dark', 'green', 'starwars']

// Отображаемые названия тем
const getThemeDisplayName = (theme: ThemeName): string => {
  const names = {
    light: 'Светлая',
    dark: 'Темная',
    green: 'Зеленая',
    starwars: 'Star Wars'
  }
  return names[theme] || theme
}
</script>

<style lang="scss">
@import './styles/ThemeSelector.scss';
</style>
