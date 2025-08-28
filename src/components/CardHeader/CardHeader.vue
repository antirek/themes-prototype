<template>
  <div 
    class="card-header"
    :style="headerStyles"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  textColor?: string
  fontSize?: number
  bold?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Заголовок карточки',
  textColor: '#2c3e50',
  fontSize: 24,
  bold: true
})

const headerStyles = computed(() => ({
  color: props.textColor,
  fontSize: `${props.fontSize}px`,
  fontWeight: props.bold ? 'bold' : 'normal'
}))
</script>

<style scoped lang="scss">
@import './styles/CardHeader.scss';
</style>
