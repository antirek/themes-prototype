<template>
  <div 
    class="avatar-icon"
    :style="iconStyles"
  >
    <component :is="currentIcon" class="avatar-icon-svg" />
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import type { AvatarIconType, AvatarIconProps } from './types'

const props = withDefaults(defineProps<AvatarIconProps>(), {
  color: 'currentColor',
  size: '24px'
})

// Вычисляем стили для иконки
const iconStyles = computed(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size
  console.log('AvatarIcon styles:', { size, color: props.color })
  return {
    width: size,
    height: size,
    color: props.color
  }
})

// SVG иконки как render функции
const DefaultIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: props.color,
  width: '100%',
  height: '100%'
}, [
  h('path', {
    d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  })
])

const StarWarsIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: props.color,
  width: '100%',
  height: '100%'
}, [
  h('path', {
    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
  }),
  h('path', {
    d: 'M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'
  }),
  h('path', {
    d: 'M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z'
  })
])

const UserIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: props.color,
  width: '100%',
  height: '100%'
}, [
  h('path', {
    d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  })
])

const AdminIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: props.color,
  width: '100%',
  height: '100%'
}, [
  h('path', {
    d: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l6 2.67v4.15c0 4.16-2.37 7.99-6 9.82-3.63-1.83-6-5.66-6-9.82V7.85l6-2.67z'
  }),
  h('path', {
    d: 'M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  })
])

const GuestIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: props.color,
  width: '100%',
  height: '100%'
}, [
  h('path', {
    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  })
])

// Реестр иконок
const iconRegistry = {
  default: DefaultIcon,
  starwars: StarWarsIcon,
  user: UserIcon,
  admin: AdminIcon,
  guest: GuestIcon
}

// Выбираем иконку
const currentIcon = computed(() => {
  return iconRegistry[props.iconType] || iconRegistry.default
})
</script>

<style lang="scss">
@use './styles/AvatarIcon.scss';
</style>
