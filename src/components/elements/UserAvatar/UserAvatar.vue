<template>
  <div class="user-avatar" ref="avatarRef">
    <img 
      v-if="!shouldShowDefaultIcon"
      :src="src" 
      :alt="alt || 'User avatar'"
      class="avatar-image"
      @error="handleImageError"
    />
    <AvatarIcon 
      v-else 
      :icon-type="currentIconType" 
      :size="avatarSize"
      :color="avatarIconColor"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from '../../../hooks'
import { AvatarIcon } from '../../atoms/AvatarIcon'
import type { AvatarIconType } from '../../atoms/AvatarIcon'

interface Props {
  src?: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: ''
})

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

const shouldShowDefaultIcon = computed(() => {
  return !props.src || imageError.value
})

// Используем хук для чтения CSS-переменных
const { getCssVariable } = useTheme()

// Определяем тип иконки на основе CSS-переменной
const currentIconType = computed<AvatarIconType>(() => {
  const iconType = getCssVariable('--thepro-useravatar-icon-type', 'default')
  return iconType as AvatarIconType || 'default'
})

// Вычисляем размер аватара для передачи в AvatarIcon
const avatarSize = computed(() => {
  // Получаем размер из CSS переменной или используем дефолтный
  const size = getCssVariable('--thepro-useravatar-size', '140px')
  return size
})

// Вычисляем цвет иконки
const avatarIconColor = computed(() => {
  return getCssVariable('--thepro-useravatar-icon-color', 'currentColor')
})
</script>

<style lang="scss">
@use './styles/UserAvatar.scss';
</style>
