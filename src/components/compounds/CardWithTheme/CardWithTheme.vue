<template>
  <div class="card-with-theme" :data-theme="currentTheme">
    <div class="theme-switcher">
      <label :for="`theme-select-${id}`" class="theme-label">Выберите тему:</label>
      <select
        :id="`theme-select-${id}`"
        v-model="currentTheme"
        @change="changeTheme"
        class="theme-select"
      >
        <option
          v-for="theme in availableThemes"
          :key="theme.name"
          :value="theme.name"
        >
          {{ theme.displayName }}
        </option>
      </select>
    </div>

    <CardPreview :card-data="cardData" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import type { CardData } from '../../types/card'
import type { ThemeName } from '../../types/theme'
import CardHeader from '../../elements/CardHeader/CardHeader.vue'
import CardBody from '../../elements/CardBody/CardBody.vue'
import CardFooter from '../../elements/CardFooter/CardFooter.vue'
import CardPreview from '../../elements/CardPreview/CardPreview.vue'
import { themeMetadata, defaultTheme } from '@/types/theme'

interface Props {
  id: string
  cardData: CardData
}

const props = defineProps<Props>()

const currentTheme = ref<ThemeName>(defaultTheme)

const availableThemes = Object.keys(themeMetadata).map(key => themeMetadata[key as ThemeName])

const changeTheme = () => {
  // Тема применяется автоматически через :data-theme="currentTheme"
  // Сохраняем в localStorage с уникальным ключом
  localStorage.setItem(`selected-theme-${props.id}`, currentTheme.value)

  // Убираем глобальную тему, если она была установлена
  document.documentElement.removeAttribute('data-theme')
}

onMounted(() => {
  // Загружаем сохраненную тему для конкретной карточки
  const savedTheme = localStorage.getItem(`selected-theme-${props.id}`) as ThemeName
  if (savedTheme && themeMetadata[savedTheme]) {
    currentTheme.value = savedTheme
  }

  // Применяем тему
  changeTheme()
})
</script>

<style scoped lang="scss">
@use './styles/CardWithTheme.scss';
</style>
