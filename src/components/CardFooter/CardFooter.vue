<template>
  <div 
    class="card-footer"
    :style="{ textAlign: align }"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
type AlignType = 'left' | 'center' | 'right'

interface Props {
  text?: string
  align?: AlignType
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Подпись или дополнительная информация',
  align: 'left'
})
</script>

<style scoped lang="scss">
@import './styles/CardFooter.scss';
</style>
