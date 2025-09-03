<template>
  <div class="user-avatar" ref="avatarRef">
    <img 
      v-if="!shouldShowDefaultIcon"
      :src="src" 
      :alt="alt || 'User avatar'"
      class="avatar-image"
      @error="handleImageError"
    />
    <AvatarIcon v-else :icon-type="currentIconType" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { UserAvatarProps } from './types'
import { AvatarIcon } from '../../atoms/AvatarIcon'
import type { AvatarIconType } from '../../atoms/AvatarIcon'
import { useTheme } from '../../../hooks'

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

// Используем хук для чтения CSS-переменных
const { getCssVariable, getCurrentTheme } = useTheme()

// Определяем тип иконки на основе CSS-переменной
const currentIconType = computed<AvatarIconType>(() => {
  const iconType = getCssVariable('--thepro-useravatar-icon-type', 'default')
  const currentTheme = getCurrentTheme()
  
  // Отладочная информация
  console.log('🔍 UserAvatar Debug:', {
    iconType,
    currentTheme,
    cssVariable: '--thepro-useravatar-icon-type'
  })
  
  return iconType as AvatarIconType || 'default'
})
</script>

<style lang="scss">
@use './styles/UserAvatar.scss';
</style>
