<template>
  <component 
    :is="currentIcon" 
    class="avatar-icon"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DefaultAvatarIcon, StarWarsAvatarIcon, type AvatarIconType } from './icons'
import type { AvatarIconProps } from './types'

const props = defineProps<AvatarIconProps>()

// Реестр доступных иконок
const ICON_REGISTRY = {
  default: DefaultAvatarIcon,
  starwars: StarWarsAvatarIcon,
} as const

// Выбираем иконку на основе переданного типа
const currentIcon = computed(() => {
  return ICON_REGISTRY[props.iconType] || ICON_REGISTRY.default
})
</script>

<style lang="scss">
@use './styles/AvatarIcon.scss';
</style>
