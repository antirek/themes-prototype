<template>
  <div class="card-header">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Заголовок карточки'
})
</script>

<style lang="scss">
@use './styles/CardHeader.scss';
</style>
