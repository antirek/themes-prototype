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
import type { ThemeName } from '../../types/theme'
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

<style lang="scss" scoped>
.theme-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--thepro-theme-color-bg-secondary);
  border: 1px solid var(--thepro-theme-color-border);
  border-radius: var(--thepro-theme-radius-md);
  margin-bottom: 1rem;

  .theme-label {
    margin: 0;
    color: var(--thepro-theme-color-text);
    font-size: var(--thepro-theme-font-size-base);
    font-weight: var(--thepro-theme-font-weight-bold);
    white-space: nowrap;
  }

  .theme-select {
    padding: 0.5rem 1rem;
    border: 1px solid var(--thepro-theme-color-border);
    border-radius: var(--thepro-theme-radius-sm);
    background: var(--thepro-theme-color-bg);
    color: var(--thepro-theme-color-text);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: var(--thepro-theme-font-size-sm);
    min-width: 150px;

    &:hover {
      border-color: var(--thepro-theme-color-primary);
    }

    &:focus {
      outline: none;
      border-color: var(--thepro-theme-color-primary);
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }

    option {
      background: var(--thepro-theme-color-bg);
      color: var(--thepro-theme-color-text);
      padding: 0.5rem;
    }
  }
}
</style>
