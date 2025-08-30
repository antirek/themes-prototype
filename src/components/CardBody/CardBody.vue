<template>
  <div class="card-body">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Содержимое карточки'
})
</script>

<style scoped lang="scss">
@use './styles/CardBody.scss';
</style>
