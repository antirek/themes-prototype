<template>
  <div class="card-preview">
    <div 
      class="card" 
      :style="cardStyles"
    >
      <!-- Заголовок карточки -->
      <CardHeader 
        :text="cardData.header.text"
        :text-color="cardData.header.textColor"
        :font-size="cardData.header.fontSize"
        :bold="cardData.header.bold"
      />
      
      <!-- Тело карточки -->
      <CardBody 
        :text="cardData.body.text"
        :text-color="cardData.body.textColor"
        :font-size="cardData.body.fontSize"
        :background-color="cardData.body.backgroundColor"
      />
      
      <!-- Низ карточки -->
      <CardFooter 
        :text="cardData.footer.text"
        :text-color="cardData.footer.textColor"
        :font-size="cardData.footer.fontSize"
        :align="cardData.footer.align"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CardHeader from '../CardHeader/CardHeader.vue'
import CardBody from '../CardBody/CardBody.vue'
import CardFooter from '../CardFooter/CardFooter.vue'
import type { CardData } from '@/types/card'

interface Props {
  cardData: CardData
}

const props = defineProps<Props>()

const cardStyles = computed(() => ({
  width: `${props.cardData.width}px`,
  backgroundColor: props.cardData.backgroundColor,
  borderRadius: `${props.cardData.borderRadius}px`,
  boxShadow: props.cardData.shadow 
    ? '0 4px 20px rgba(0,0,0,0.15)' 
    : 'none'
}))
</script>

<style scoped lang="scss">
@import './styles/CardPreview.scss';
</style>
