<template>
  <div class="app">
    <header class="header">
      <h1>🎨 Демонстрация независимых тем</h1>
      <p>Каждая карточка имеет свой селектор темы. Попробуйте разные комбинации!</p>
    </header>
    
    <main class="main">
      <div class="content">
        <CardWithTheme 
          id="card-1" 
          :card-data="cardData1" 
        />
        <CardWithTheme 
          id="card-2" 
          :card-data="cardData2" 
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardWithTheme from './components/CardWithTheme/CardWithTheme.vue'
import type { CardData } from '@/types/card'

const cardData1 = ref<CardData>({
  header: {
    text: 'Первая карточка',
    textColor: '#ffffff',
    fontSize: 24,
    bold: true
  },
  body: {
    text: 'Это первая карточка с независимым селектором темы. Попробуйте переключить тему и посмотрите, как она изменится!',
    textColor: '#2c3e50',
    fontSize: 16,
    backgroundColor: '#f8f9fa'
  },
  footer: {
    text: 'Карточка #1 - Vue 3 + TypeScript + SCSS',
    textColor: '#6c757d',
    fontSize: 14,
    align: 'center'
  },
  width: 400,
  backgroundColor: '#ffffff',
  shadow: true,
  borderRadius: 12
})

const cardData2 = ref<CardData>({
  header: {
    text: 'Вторая карточка',
    textColor: '#ffffff',
    fontSize: 24,
    bold: true
  },
  body: {
    text: 'Это вторая карточка с собственным селектором темы. Каждая карточка может иметь свою тему независимо от других!',
    textColor: '#2c3e50',
    fontSize: 16,
    backgroundColor: '#f8f9fa'
  },
  footer: {
    text: 'Карточка #2 - Модульная архитектура',
    textColor: '#6c757d',
    fontSize: 14,
    align: 'center'
  },
  width: 400,
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
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 1200px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
}
</style>
