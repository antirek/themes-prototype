<template>
  <div class="card-footer">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Подвал карточки'
})
</script>

<style scoped lang="scss">
@use './styles/CardFooter.scss';
</style>
