<template>
  <div 
    class="card-footer"
    :style="footerStyles"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AlignType = 'left' | 'center' | 'right'

interface Props {
  text?: string
  textColor?: string
  fontSize?: number
  align?: AlignType
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Подпись или дополнительная информация',
  textColor: '#7f8c8d',
  fontSize: 14,
  align: 'left'
})

const footerStyles = computed(() => ({
  color: props.textColor,
  fontSize: `${props.fontSize}px`,
  textAlign: props.align
}))
</script>

<style scoped lang="scss">
@import './styles/CardFooter.scss';
</style>
