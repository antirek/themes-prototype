<template>
  <div 
    class="card-body"
    :style="bodyStyles"
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
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Это пример текста тела карточки. Здесь может быть размещен любой контент, который вы хотите отобразить.',
  textColor: '#34495e',
  fontSize: 16,
  backgroundColor: '#f8f9fa'
})

const bodyStyles = computed(() => ({
  color: props.textColor,
  fontSize: `${props.fontSize}px`,
  backgroundColor: props.backgroundColor
}))
</script>

<style scoped lang="scss">
@import './styles/CardBody.scss';
</style>
