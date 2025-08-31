<template>
  <svg 
    class="default-avatar-icon" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :style="{ color: iconColor }"
  >
    <!-- Фоновая окружность -->
    <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.1"/>
    
    <!-- Голова -->
    <circle cx="12" cy="9" r="3.5" fill="currentColor" opacity="0.4"/>
    
    <!-- Тело -->
    <path 
      d="M12 13.5c-3.5 0-6.5 2.5-6.5 6.5v2h13v-2c0-4-3-6.5-6.5-6.5z" 
      fill="currentColor" 
      opacity="0.4"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  theme?: 'light' | 'dark' | 'green'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const iconColor = computed(() => {
  const colors = {
    light: 'var(--thepro-theme-color-text-muted)',
    dark: 'var(--thepro-theme-color-text-muted)',
    green: 'var(--thepro-theme-color-text-muted)'
  }
  return colors[props.theme]
})
</script>

<style scoped>
.default-avatar-icon {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
