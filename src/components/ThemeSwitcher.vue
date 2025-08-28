<template>
  <div class="theme-switcher">
    <label for="theme-select" class="theme-label">Выберите тему:</label>
    <select 
      id="theme-select"
      v-model="currentTheme" 
      @change="changeTheme"
      class="theme-select"
    >
      <option 
        v-for="theme in availableThemes" 
        :key="theme.name" 
        :value="theme.name"
      >
        {{ theme.displayName }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ThemeName } from '@/types/theme'
import { themes, defaultTheme } from '@/types/theme'

const currentTheme = ref<ThemeName>(defaultTheme)

const availableThemes = Object.keys(themes).map(key => themes[key as ThemeName])

const changeTheme = () => {
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  localStorage.setItem('selected-theme', currentTheme.value)
}

onMounted(() => {
  // Загружаем сохраненную тему или используем по умолчанию
  const savedTheme = localStorage.getItem('selected-theme') as ThemeName
  if (savedTheme && themes[savedTheme]) {
    currentTheme.value = savedTheme
  }
  
  // Применяем тему
  document.documentElement.setAttribute('data-theme', currentTheme.value)
})
</script>

<style scoped lang="scss">
.theme-switcher {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.75rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  margin-bottom: 1.5rem;
  
  .theme-label {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 1rem;
  }
  
  .theme-select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-primary);
    border-radius: 4px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px var(--focus-ring);
    }
    
    &:hover {
      border-color: var(--accent-primary);
    }
    
    option {
      background: var(--bg-primary);
      color: var(--text-primary);
    }
  }
}
</style>
