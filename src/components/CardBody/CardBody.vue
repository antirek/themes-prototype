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
  text: 'Это пример текста тела карточки. Здесь может быть размещен любой контент, который вы хотите отобразить.'
})
</script>

<style scoped lang="scss">
@import './styles/CardBody.scss';
</style>
