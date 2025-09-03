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
              <ThemeSelector />
              <UserProfileCard :user-data="user" />
            </div>
          </BaseContainer>
        </div>
      </section>

      <section class="demo-section">
        <h2>🎭 AvatarIcon с явным указанием типа</h2>
        <p class="demo-description">
          Демонстрация базового компонента иконки аватара с принудительным указанием типа иконки через props.
        </p>
        <div class="icon-demo">
          <div class="icon-item">
            <h3>Default Icon:</h3>
            <AvatarIcon icon-type="default" />
          </div>
          <div class="icon-item">
            <h3>Star Wars Icon:</h3>
            <AvatarIcon icon-type="starwars" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BaseContainer, ThemeSelector } from './components/containers'
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

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  background: var(--thepro-theme-color-bg);
  color: var(--thepro-theme-color-text);
}

.app-header {
  text-align: center;
  padding: 2rem 1rem;
  background: var(--thepro-theme-color-bg-secondary);
  border-bottom: 1px solid var(--thepro-theme-color-border);

  h1 {
    margin: 0 0 0.5rem 0;
    color: var(--thepro-theme-color-primary);
    font-size: 2.5rem;
  }

  p {
    margin: 0;
    color: var(--thepro-theme-color-text-muted);
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
    color: var(--thepro-theme-color-primary);
    border-bottom: 2px solid var(--thepro-theme-color-primary);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .demo-description {
    color: var(--thepro-theme-color-text-muted);
    font-size: var(--thepro-theme-font-size-base);
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

.avatar-demo, .icon-demo {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.theme-demo {
  padding: 1rem;
  border: 1px solid var(--thepro-theme-color-border);
  border-radius: var(--thepro-theme-radius-md);
  background: var(--thepro-theme-color-bg-secondary);
}

.icon-demo {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.icon-item {
  text-align: center;
  padding: 1.5rem;
  background: var(--thepro-theme-color-bg-secondary);
  border: 1px solid var(--thepro-theme-color-border);
  border-radius: var(--thepro-theme-radius-md);
  min-width: 200px;

  h3 {
    margin: 0 0 1rem 0;
    color: var(--thepro-theme-color-text);
    font-size: var(--thepro-theme-font-size-base);
    font-weight: var(--thepro-theme-font-weight-bold);
  }
}
</style>
