<template>
  <div class="card-preview">
    <div class="card">
      <!-- Заголовок карточки -->
      <CardHeader :text="cardData.header.text" />
      
      <!-- Тело карточки -->
      <CardBody :text="cardData.body.text" />
      
      <!-- Низ карточки -->
      <CardFooter :text="cardData.footer.text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CardHeader from '../CardHeader/CardHeader.vue'
import CardBody from '../CardBody/CardBody.vue'
import CardFooter from '../CardFooter/CardFooter.vue'
interface Props {
  cardData: {
    header: { text: string }
    body: { text: string }
    footer: { text: string }
  }
}

const props = defineProps<Props>()

// Стили теперь определяются только через CSS переменные тем
</script>

<style scoped lang="scss">
@use './styles/CardPreview.scss';
</style>
