<template>
  <div class="avatar-icon" :class="`avatar-icon--${iconType}`">
    <img 
      :src="svgPath" 
      :alt="`${iconType} icon`"
      class="avatar-icon-svg"
      @error="handleSvgError"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AvatarIconType } from './types'
import { getSvgIconPath } from './utils/svgLoader'

interface Props {
  /** Тип иконки для отображения */
  iconType: AvatarIconType
}

const props = defineProps<Props>()

// Получаем путь к SVG файлу
const svgPath = computed(() => getSvgIconPath(props.iconType))

// Обработка ошибки загрузки SVG
const handleSvgError = () => {
  console.warn(`Failed to load SVG icon: ${props.iconType}`)
}
</script>

<style lang="scss">
@use './styles/AvatarIcon.scss';
</style>
