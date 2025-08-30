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
import { ref, onMounted } from 'vue'
import CardPreview from '../CardPreview/CardPreview.vue'
import type { ThemeName } from '@/types/theme'
import type { CardData } from '@/types/card'
import { themes, defaultTheme } from '@/types/theme'

interface Props {
  id: string
  cardData: CardData
}

const props = defineProps<Props>()

const currentTheme = ref<ThemeName>(defaultTheme)

const availableThemes = Object.keys(themes).map(key => themes[key as ThemeName])

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
  if (savedTheme && themes[savedTheme]) {
    currentTheme.value = savedTheme
  }

  // Применяем тему
  changeTheme()
})
</script>

<style scoped lang="scss">
@use './styles/CardWithTheme.scss';
</style>
