<template>
  <div class="user-avatar" ref="avatarRef">
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
import { computed, ref } from 'vue'
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
</script>

<style lang="scss">
@use './styles/UserAvatar.scss';
</style>
