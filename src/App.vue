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
.app {
  min-height: 100vh;
  padding: 1.5rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
  
  @media (max-width: 576px) {
    padding: 0.75rem;
  }
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    text-shadow: var(--shadow-lg);
    
    @media (max-width: 576px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    opacity: 0.8;
  }
}

.main {
  max-width: 800px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
</style>
