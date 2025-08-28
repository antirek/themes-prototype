<template>
  <div class="app">
    <header class="header">
      <h1>🎨 Демонстрация тем</h1>
      <p>Переключайте темы и смотрите, как изменяется карточка</p>
    </header>
    
    <main class="main">
      <div class="content">
        <ThemeSwitcher />
        <CardPreview :card-data="cardData" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardPreview from './components/CardPreview/CardPreview.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import type { CardData } from '@/types/card'

const cardData = ref<CardData>({
  header: {
    text: 'Демонстрационная карточка',
    textColor: '#ffffff',
    fontSize: 24,
    bold: true
  },
  body: {
    text: 'Это демонстрационная карточка, которая показывает, как работают различные темы. Переключайте темы с помощью селектора выше и наблюдайте за изменениями.',
    textColor: '#2c3e50',
    fontSize: 16,
    backgroundColor: '#f8f9fa'
  },
  footer: {
    text: 'Создано с использованием Vue 3 + TypeScript + SCSS',
    textColor: '#6c757d',
    fontSize: 14,
    align: 'center'
  },
  width: 450,
  backgroundColor: '#ffffff',
  shadow: true,
  borderRadius: 12
})
</script>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.app {
  min-height: 100vh;
  padding: $spacing-lg;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color $transition-base, color $transition-base;
  
  @include respond-to(sm) {
    padding: $spacing-sm;
  }
}

.header {
  text-align: center;
  margin-bottom: $spacing-3xl;
  color: var(--text-primary);
  
  h1 {
    font-size: $font-size-4xl;
    margin-bottom: $spacing-sm;
    text-shadow: var(--shadow-lg);
    
    @include respond-to(sm) {
      font-size: $font-size-3xl;
    }
  }
  
  p {
    font-size: $font-size-xl;
    opacity: 0.8;
  }
}

.main {
  max-width: 800px;
  margin: 0 auto;
}

.content {
  @include flex(column, flex-start, center);
  gap: $spacing-2xl;
}
</style>
