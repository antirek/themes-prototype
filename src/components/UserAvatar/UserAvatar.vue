<template>
  <div 
    class="user-avatar" 
    :data-theme="theme"
    :style="customSizeStyle"
  >
    <img 
      :src="src" 
      :alt="alt"
      class="avatar-image"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { UserAvatarProps } from './types'

interface Props extends UserAvatarProps {}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const customSizeStyle = computed(() => {
  if (props.size) {
    return {
      '--thepro-useravatar-size': props.size,
      '--thepro-useravatar-size-large': props.size,
      '--thepro-useravatar-size-medium': props.size,
      '--thepro-useravatar-size-mobile': props.size,
      '--thepro-useravatar-size-small': props.size
    }
  }
  return {}
})
</script>

<style lang="scss">
@use './styles/UserAvatar.scss';
</style>
