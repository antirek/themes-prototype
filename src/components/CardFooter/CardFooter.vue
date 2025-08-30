<template>
  <div class="card-footer" :class="`text-${align}`">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Подвал карточки',
  align: 'left'
})
</script>

<style scoped lang="scss">
@use './styles/CardFooter.scss';
</style>
