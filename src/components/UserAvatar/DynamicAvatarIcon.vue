<template>
  <component 
    :is="currentIcon" 
    class="avatar-icon"
    :style="iconStyle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DefaultAvatarIcon, StarWarsAvatarIcon, type AvatarIconType } from './icons'
import { useCssVariable } from './useCssVariable'

interface Props {
  /** Ссылка на элемент аватара для определения темы */
  avatarElement?: HTMLElement | null
}

const props = withDefaults(defineProps<Props>(), {
  avatarElement: null
})

// Реестр доступных иконок
const ICON_REGISTRY = {
  default: DefaultAvatarIcon,
  starwars: StarWarsAvatarIcon,
} as const

// Получаем текущий тип иконки из CSS переменной на элементе аватара
const { value: iconType } = useCssVariable(
  '--thepro-useravatar-icon-type', 
  'default',
  props.avatarElement
)

// Выбираем иконку на основе текущего типа
const currentIcon = computed(() => {
  const type = iconType.value as AvatarIconType
  return ICON_REGISTRY[type] || ICON_REGISTRY.default
})

// CSS стили для иконки
const iconStyle = computed(() => {
  return {
    '--current-icon-type': iconType.value
  }
})
</script>

<style scoped lang="scss">
.avatar-icon {
  width: 100%;
  height: 100%;
  padding: var(--thepro-useravatar-icon-padding, 15%);
  box-sizing: border-box;
  transition: all var(--thepro-theme-transition);
  color: var(--thepro-useravatar-icon-color, var(--thepro-theme-color-text-muted));
}

// Hover эффекты
.avatar-icon:hover {
  transform: scale(1.05);
  color: var(--thepro-useravatar-icon-color-hover, var(--thepro-theme-color-text-muted));
}

// Специальные эффекты для Star Wars иконки
.avatar-icon[style*="--current-icon-type: starwars"] {
  filter: var(--thepro-useravatar-icon-effects, drop-shadow(0 0 4px rgba(255, 215, 0, 0.3)));
  
  &:hover {
    filter: var(--thepro-useravatar-icon-effects-hover, drop-shadow(0 0 8px rgba(255, 215, 0, 0.5)));
  }
}
</style>
