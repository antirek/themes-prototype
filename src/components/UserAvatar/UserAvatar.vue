<template>
  <div 
    class="user-avatar" 
    :style="customSizeStyle"
  >
    <img 
      v-if="!shouldShowDefaultIcon"
      :src="src" 
      :alt="alt || 'User avatar'"
      class="avatar-image"
      @error="handleImageError"
    />
    <DefaultAvatarIcon 
      v-else
      class="avatar-image"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { UserAvatarProps } from './types'
import DefaultAvatarIcon from './DefaultAvatarIcon.vue'

interface Props extends UserAvatarProps {}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: undefined
})

const imageError = ref(false)

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

const handleImageError = () => {
  imageError.value = true
}

const shouldShowDefaultIcon = computed(() => {
  return !props.src || imageError.value
})
</script>

<style lang="scss">
@use './styles/UserAvatar.scss';
</style>
