<template>
  <div class="theme-selector">
    <label for="theme-select" class="theme-label">Выберите тему:</label>
    <select
      id="theme-select"
      v-model="currentTheme"
      class="theme-select"
    >
      <option
        v-for="(label, theme) in props.themes"
        :key="theme"
        :value="theme"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { Ref } from 'vue'

interface Props {
  themes: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  themes: () => ({
    light: 'Светлая',
    dark: 'Темная',
    green: 'Зеленая',
    starwars: 'Star Wars'
  })
})

// Получаем тему из BaseContainer через inject
const themeContext = inject<{
  currentTheme: Ref<string>
  setTheme: (theme: string) => void
}>('theme')

if (!themeContext) {
  throw new Error('ThemeSelector должен использоваться внутри BaseContainer')
}

const { currentTheme, setTheme } = themeContext
</script>

<style lang="scss">
@use 'src/components/elements/ThemeSelector/styles/ThemeSelector.scss';
</style>
