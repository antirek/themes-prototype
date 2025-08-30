<template>
  <div class="app">
    <header class="header">
      <h1>🎨 Демонстрация компонентов с темизацией</h1>
      <p>Карточки с независимыми селекторами тем и новая карточка профиля пользователя!</p>
    </header>
    
    <main class="main">
      <div class="content">
        <div class="profile-section">
          <h2>👤 Карточка профиля пользователя</h2>
          <div class="profile-grid">
            <UserProfileCard 
              :user-data="userData1" 
              theme="light"
            />
            <UserProfileCard 
              :user-data="userData2" 
              theme="dark"
            />
            <UserProfileCard 
              :user-data="userData3" 
              theme="green"
            />
          </div>
        </div>
        
        <div class="cards-section">
          <h2>📋 Обычные карточки</h2>
          <div class="cards-grid">
            <CardWithTheme 
              id="card-1" 
              :card-data="cardData1" 
            />
            <CardWithTheme 
              id="card-2" 
              :card-data="cardData2" 
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardWithTheme from './components/CardWithTheme/CardWithTheme.vue'
import UserProfileCard from './components/UserProfileCard/UserProfileCard.vue'
import type { CardData } from '@/types/card'

const cardData1 = ref<CardData>({
  header: {
    text: 'Первая карточка'
  },
  body: {
    text: 'Это первая карточка с независимым селектором темы. Попробуйте переключить тему и посмотрите, как она изменится!'
  },
  footer: {
    text: 'Карточка #1 - Vue 3 + TypeScript + SCSS'
  }
})

const cardData2 = ref<CardData>({
  header: {
    text: 'Вторая карточка'
  },
  body: {
    text: 'Это вторая карточка с собственным селектором темы. Каждая карточка может иметь свою тему независимо от других!'
  },
  footer: {
    text: 'Карточка #2 - Модульная архитектура'
  }
})

const userData1 = ref({
  name: 'Анна Петрова',
  phone: '+7 (999) 123-45-67',
  description: 'Frontend разработчик с 5-летним опытом работы с Vue.js, React и современными веб-технологиями.',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  status: 'Доступна для проектов'
})

const userData2 = ref({
  name: 'Михаил Сидоров',
  phone: '+7 (999) 987-65-43',
  description: 'UX/UI дизайнер, специализирующийся на создании интуитивных и красивых пользовательских интерфейсов.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  status: 'Занят в проекте'
})

const userData3 = ref({
  name: 'Елена Козлова',
  phone: '+7 (999) 555-12-34',
  description: 'Product Manager с опытом управления digital-продуктами и командой разработчиков.',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  status: 'Открыта к предложениям'
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
  gap: 3rem;
  width: 100%;
}

.cards-section,
.profile-section {
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.75rem;
    color: var(--text-primary);
    
    @media (max-width: 576px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
}

.cards-grid {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  
  @media (max-width: 1200px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
}

.profile-grid {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  
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
