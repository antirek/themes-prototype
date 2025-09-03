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
            <div class="profile-card-wrapper">
              <div class="theme-selector">
                <label class="theme-label">Тема карточки 1:</label>
                <select 
                  v-model="profileTheme1" 
                  class="theme-select"
                  @change="updateProfileTheme(1, profileTheme1)"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="green">Зеленая</option>
                  <option value="starwars">Star Wars</option>
                </select>
              </div>
              <UserProfileCard 
                :user-data="userData1" 
                :theme="profileTheme1"
              />
            </div>
            
            <div class="profile-card-wrapper">
              <div class="theme-selector">
                <label class="theme-label">Тема карточки 2:</label>
                <select 
                  v-model="profileTheme2" 
                  class="theme-select"
                  @change="updateProfileTheme(2, profileTheme2)"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="green">Зеленая</option>
                  <option value="starwars">Star Wars</option>
                </select>
              </div>
              <UserProfileCard 
                :user-data="userData2" 
                :theme="profileTheme2"
              />
            </div>
            
            <div class="profile-card-wrapper">
              <div class="theme-selector">
                <label class="theme-label">Тема карточки 3:</label>
                <select 
                  v-model="profileTheme3" 
                  class="theme-select"
                  @change="updateProfileTheme(3, profileTheme3)"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="green">Зеленая</option>
                  <option value="starwars">Star Wars</option>
                </select>
              </div>
              <UserProfileCard 
                :user-data="userData3" 
                :theme="profileTheme3"
              />
            </div>
          </div>
        </div>
        
        <div class="avatar-section">
          <h2>👤 Демонстрация компонента аватара</h2>
          <div class="avatar-grid">
            <div class="avatar-wrapper" :data-theme="avatarTheme1">
              <div class="theme-selector">
                <label class="theme-label">Тема аватара 1:</label>
                <select 
                  v-model="avatarTheme1" 
                  class="theme-select"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="green">Зеленая</option>
                  <option value="starwars">Star Wars</option>
                </select>
              </div>
              <UserAvatar 
                :src="userData1.avatar" 
                :alt="userData1.name"
              />
            </div>
            
            <div class="avatar-wrapper" :data-theme="avatarTheme2">
              <div class="theme-selector">
                <label class="theme-label">Тема аватара 2:</label>
                <select 
                  v-model="avatarTheme2" 
                  class="theme-select"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="green">Зеленая</option>
                  <option value="starwars">Star Wars</option>
                </select>
              </div>
              <UserAvatar 
                :src="userData2.avatar" 
                :alt="userData2.name"
              />
            </div>
            
            <div class="avatar-wrapper" :data-theme="avatarTheme3">
              <div class="theme-selector">
                <label class="theme-label">Тема аватара 3:</label>
                <select 
                  v-model="avatarTheme3" 
                  class="theme-select"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="green">Зеленая</option>
                  <option value="starwars">Star Wars</option>
                </select>
              </div>
              <UserAvatar 
                :src="userData3.avatar" 
                :alt="userData3.name"
              />
            </div>
            
            <div class="avatar-wrapper" :data-theme="avatarTheme4">
              <div class="theme-selector">
                <label class="theme-label">Аватар без фото:</label>
                <select 
                  v-model="avatarTheme4" 
                  class="theme-select"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="green">Зеленая</option>
                  <option value="starwars">Star Wars</option>
                </select>
              </div>
              <UserAvatar />
            </div>
            
            <div class="avatar-wrapper" :data-theme="avatarTheme5">
              <div class="theme-selector">
                <label class="theme-label">Аватар с ошибкой:</label>
                <select 
                  v-model="avatarTheme5" 
                  class="theme-select"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="green">Зеленая</option>
                  <option value="starwars">Star Wars</option>
                </select>
              </div>
              <UserAvatar 
                src="https://invalid-url-that-will-fail.com/avatar.jpg"
                alt="Broken avatar"
              />
            </div>
          </div>
        </div>
        
        <div class="avatar-icon-section">
          <h2>🎭 Демонстрация AvatarIcon компонента</h2>
          <div class="avatar-icon-grid">
            <div class="avatar-icon-wrapper">
              <h3>Автоматическое определение через CSS переменные:</h3>
              <div class="avatar-icon-demo" data-theme="light">
                <AvatarIcon icon-type="default" />
              </div>
              <div class="avatar-icon-demo" data-theme="starwars">
                <AvatarIcon icon-type="starwars" />
              </div>
            </div>
            
            <div class="avatar-icon-wrapper">
              <h3>Принудительное указание иконки через props:</h3>
              <div class="avatar-icon-demo">
                <AvatarIcon icon-type="default" />
              </div>
              <div class="avatar-icon-demo">
                <AvatarIcon icon-type="starwars" />
              </div>
            </div>
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
import CardWithTheme from './components/compounds/CardWithTheme/CardWithTheme.vue'
import UserProfileCard from './components/blocks/UserProfileCard/UserProfileCard.vue'
import UserAvatar from './components/elements/UserAvatar/UserAvatar.vue'
import { AvatarIcon } from './components/atoms/AvatarIcon'
import type { CardData } from './types/card'
import type { ThemeName } from './types/theme'

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

// Переменные для тем карточек профиля
const profileTheme1 = ref<ThemeName>('light')
const profileTheme2 = ref<ThemeName>('dark')
const profileTheme3 = ref<ThemeName>('green')

// Переменные для тем аватаров
const avatarTheme1 = ref<ThemeName>('light')
const avatarTheme2 = ref<ThemeName>('dark')
const avatarTheme3 = ref<ThemeName>('green')
const avatarTheme4 = ref<ThemeName>('light')
const avatarTheme5 = ref<ThemeName>('dark')

// Функция для обновления темы карточки профиля
const updateProfileTheme = (cardNumber: number, theme: ThemeName) => {
  // Логика обновления темы (пока не реализована)
}
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
.profile-section,
.avatar-section {
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
  gap: 3rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1400px) {
    gap: 2.5rem;
    max-width: 1200px;
  }
  
  @media (max-width: 1200px) {
    gap: 2rem;
    max-width: 1000px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    max-width: 100%;
  }
}

.avatar-grid {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1400px) {
    gap: 2.5rem;
    max-width: 1200px;
  }
  
  @media (max-width: 1200px) {
    gap: 2rem;
    max-width: 1000px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    max-width: 100%;
  }
}

.avatar-icon-section {
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

.avatar-icon-grid {
  display: flex;
  flex-direction: row;
  gap: 4rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    gap: 3rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
}

.avatar-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  
  h3 {
    font-size: 1.25rem;
    color: var(--text-primary);
    margin: 0;
    text-align: center;
  }
}

.avatar-icon-demo {
  width: 120px;
  height: 120px;
  border: 2px solid var(--thepro-theme-color-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--thepro-theme-color-bg-secondary);
  box-shadow: var(--thepro-theme-shadow-sm);
  transition: all var(--thepro-theme-transition);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: var(--thepro-theme-shadow-md);
  }
  
  .avatar-icon {
    width: 60%;
    height: 60%;
  }
}

.profile-card-wrapper,
.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  /* Размеры аватаров для демонстрации */
  &:nth-child(1) .user-avatar {
    --thepro-useravatar-size: 140px;
    --thepro-useravatar-size-large: 130px;
    --thepro-useravatar-size-medium: 120px;
    --thepro-useravatar-size-mobile: 110px;
    --thepro-useravatar-size-small: 100px;
  }
  
  &:nth-child(2) .user-avatar {
    --thepro-useravatar-size: 120px;
    --thepro-useravatar-size-large: 110px;
    --thepro-useravatar-size-medium: 100px;
    --thepro-useravatar-size-mobile: 90px;
    --thepro-useravatar-size-small: 80px;
  }
  
  &:nth-child(3) .user-avatar {
    --thepro-useravatar-size: 100px;
    --thepro-useravatar-size-large: 90px;
    --thepro-useravatar-size-medium: 80px;
    --thepro-useravatar-size-mobile: 70px;
    --thepro-useravatar-size-small: 60px;
  }
  
  &:nth-child(4) .user-avatar {
    --thepro-useravatar-size: 100px;
    --thepro-useravatar-size-large: 90px;
    --thepro-useravatar-size-medium: 80px;
    --thepro-useravatar-size-mobile: 70px;
    --thepro-useravatar-size-small: 60px;
  }
  
  &:nth-child(5) .user-avatar {
    --thepro-useravatar-size: 100px;
    --thepro-useravatar-size-large: 90px;
    --thepro-useravatar-size-medium: 80px;
    --thepro-useravatar-size-mobile: 70px;
    --thepro-useravatar-size-small: 60px;
  }
}

.theme-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--thepro-theme-color-bg-secondary);
  border: 1px solid var(--thepro-theme-color-border);
  border-radius: 8px;
  box-shadow: var(--thepro-theme-shadow-sm);
  min-width: 200px;
}

.theme-label {
  font-family: var(--thepro-theme-font-family-secondary);
  font-weight: 500;
  color: var(--thepro-theme-color-text);
  font-size: var(--thepro-theme-font-size-sm);
  margin: 0;
}

.theme-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--thepro-theme-color-border);
  border-radius: 4px;
  background: var(--thepro-theme-color-bg);
  color: var(--thepro-theme-color-text);
  font-family: var(--thepro-theme-font-family-primary);
  font-size: var(--thepro-theme-font-size-sm);
  cursor: pointer;
  transition: all var(--thepro-theme-transition);
}

.theme-select:focus {
  outline: none;
  border-color: var(--thepro-theme-color-primary);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.theme-select:hover {
  border-color: var(--thepro-theme-color-primary);
}

.theme-select option {
  background: var(--thepro-theme-color-bg);
  color: var(--thepro-theme-color-text);
}
</style>
