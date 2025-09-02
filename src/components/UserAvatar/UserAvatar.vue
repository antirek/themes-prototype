<template>
  <div class="user-avatar" ref="avatarRef" :style="avatarStyle">
    <img 
      v-if="!shouldShowDefaultIcon"
      :src="src" 
      :alt="alt || 'User avatar'"
      class="avatar-image"
      @error="handleImageError"
    />
    <DynamicAvatarIcon v-else :avatar-element="avatarRef" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { UserAvatarProps } from './types'
import DynamicAvatarIcon from './DynamicAvatarIcon.vue'

interface Props extends UserAvatarProps {
  /** Дополнительные CSS классы */
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: undefined,
  class: undefined
})

const imageError = ref(false)
const avatarRef = ref<HTMLElement>()

const handleImageError = () => {
  imageError.value = true
}

const shouldShowDefaultIcon = computed(() => {
  return !props.src || imageError.value
})

// Определяем текущую тему из родительского элемента
const currentTheme = ref<string>('light')

const detectTheme = () => {
  if (avatarRef.value) {
    const parentTheme = avatarRef.value.closest('[data-theme]')
    if (parentTheme) {
      currentTheme.value = parentTheme.getAttribute('data-theme') || 'light'
    }
  }
}

// CSS стили для аватара с типом иконки
const avatarStyle = computed(() => {
  const iconType = currentTheme.value === 'starwars' ? 'starwars' : 'default'
  return {
    '--thepro-useravatar-icon-type': iconType
  }
})

onMounted(() => {
  detectTheme()
  
  // Наблюдаем за изменениями темы
  const observer = new MutationObserver(() => {
    detectTheme()
  })
  
  // Наблюдаем за documentElement для глобальных изменений
  observer.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['data-theme'] 
  })
  
  // Наблюдаем за всеми элементами с data-theme
  const themeElements = document.querySelectorAll('[data-theme]')
  themeElements.forEach(themeElement => {
    observer.observe(themeElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })
  })
})
</script>

<style lang="scss">
@use './styles/UserAvatar.scss';
</style>
