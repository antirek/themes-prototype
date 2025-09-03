<template>
  <div class="card-with-theme">
    <CardPreview :card-data="cardData" />
  </div>
</template>

<script setup lang="ts">
import type { CardData } from '../../../types/card'
import CardPreview from '../../elements/CardPreview/CardPreview.vue'

interface Props {
  id: string
  cardData: CardData
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
@use './styles/CardWithTheme.scss';
</style>
