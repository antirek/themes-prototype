<template>
  <div class="app">
    <header class="app-header">
      <h1>🎨 Прототип системы тем</h1>
      <p>Демонстрация компонентов с различными темами</p>
    </header>

    <main class="app-main">
      <!-- Демонстрация компонентов -->
      <section class="demo-section">
        <h2>📱 UserProfileCard с темами</h2>
        <p class="demo-description">
          Демонстрация карточек пользователей в разных темах. Каждая карточка имеет уникальный профиль и может переключать темы независимо.
        </p>
        <div class="cards-grid">
          <BaseContainer 
            v-for="(user, index) in users.slice(0, 3)" 
            :key="user.name"
            :id="`profile-${index + 1}`"
            :initial-theme="themes[index]"
          >
            <div class="theme-demo">
              <ThemeSelector :themes="{
                light: 'Светлая',
                dark: 'Темная', 
                green: 'Зеленая',
                starwars: 'Star Wars'
              }" />
              <UserProfileCard :user-data="user" />
            </div>
          </BaseContainer>
        </div>
      </section>

      <section class="demo-section">
        <h2>🎭 AvatarIcon с явным указанием типа</h2>
        <p class="demo-description">
          Демонстрация базового компонента иконки аватара с принудительным указанием типа иконки через props, а также возможностью настройки цвета и размера.
        </p>
        <div class="icon-demo">
          <div class="icon-item">
            <h3>Default Icon (72px):</h3>
            <AvatarIcon icon-type="default" size="72px" />
          </div>
          <div class="icon-item">
            <h3>Star Wars Icon (72px):</h3>
            <AvatarIcon icon-type="starwars" size="72px" />
          </div>
          <div class="icon-item">
            <h3>User Icon (96px, Blue):</h3>
            <AvatarIcon icon-type="user" color="#3498db" size="96px" />
          </div>
          <div class="icon-item">
            <h3>Admin Icon (120px, Red):</h3>
            <AvatarIcon icon-type="admin" color="#e74c3c" size="120px" />
          </div>
          <div class="icon-item">
            <h3>Guest Icon (144px, Green):</h3>
            <AvatarIcon icon-type="guest" color="#27ae60" size="144px" />
          </div>
          <div class="icon-item">
            <h3>Large Star Wars (192px, Purple):</h3>
            <AvatarIcon icon-type="starwars" size="192px" color="#9b59b6" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BaseContainer } from './components/containers'
import { ThemeSelector } from './components/elements'
import { UserProfileCard, AvatarIcon } from './components'
import type { ThemeName } from './types/theme'

// Списки тем для демонстрации
const themes: ThemeName[] = ['light', 'dark', 'green', 'starwars']

// Примеры пользователей для демонстрации
const users = [
  {
    name: 'Иван Иванов',
    phone: '+7 (999) 123-45-67',
    description: 'Frontend разработчик с опытом работы с Vue.js и современными веб-технологиями',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'Доступен для проектов'
  },
  {
    name: 'Анна Петрова',
    phone: '+7 (999) 234-56-78',
    description: 'UX/UI дизайнер, специализирующийся на создании интуитивных интерфейсов',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'Занята в проекте'
  },
  {
    name: 'Михаил Сидоров',
    phone: '+7 (999) 345-67-89',
    description: 'Backend разработчик с опытом в Node.js, Python и микросервисной архитектуре',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'Открыт к предложениям'
  },
  {
    name: 'Елена Козлова',
    phone: '+7 (999) 456-78-90',
    description: 'Product Manager с опытом управления digital-продуктами и командами разработчиков',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'Рассматривает варианты'
  }
]
</script>

<style lang="scss">
// Стили компонента App
.app {
  min-height: 100vh;
  background: #ffffff;
  color: #2c3e50;
}

.app-header {
  text-align: center;
  padding: 2rem 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;

  h1 {
    margin: 0 0 0.5rem 0;
    color: #3498db;
    font-size: 2.5rem;
  }

  p {
    margin: 0;
    color: #6c757d;
    font-size: 1.1rem;
  }
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.demo-section {
  margin-bottom: 3rem;

  h2 {
    color: #3498db;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .demo-description {
    color: #6c757d;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-width: 800px;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.icon-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  justify-content: center;
}

.theme-demo {
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background: #f8f9fa;
}

.icon-item {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  min-width: 250px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    margin: 0 0 1.5rem 0;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 700;
  }
}
</style>
