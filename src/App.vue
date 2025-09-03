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
        <div class="cards-grid">
          <BaseContainer 
            v-for="theme in themes" 
            :key="theme"
            :initial-theme="theme"
          >
            <div class="theme-demo">
              <ThemeSelector />
              <UserProfileCard :user-data="sampleUser" />
            </div>
          </BaseContainer>
        </div>
      </section>

      <section class="demo-section">
        <h2>👤 UserAvatar с автоматическим определением темы</h2>
        <div class="avatar-demo">
          <BaseContainer initial-theme="light">
            <div class="theme-demo">
              <ThemeSelector />
              <div class="avatar-item">
                <h3>Автоматическое определение:</h3>
                <UserAvatar :user="sampleUser" />
              </div>
            </div>
          </BaseContainer>
        </div>
      </section>

      <section class="demo-section">
        <h2>🎭 AvatarIcon с явным указанием типа</h2>
        <div class="icon-demo">
          <BaseContainer initial-theme="light">
            <div class="theme-demo">
              <ThemeSelector />
              <div class="icon-item">
                <h3>Default Icon:</h3>
                <AvatarIcon icon-type="default" />
              </div>
              <div class="icon-item">
                <h3>Star Wars Icon:</h3>
                <AvatarIcon icon-type="starwars" />
              </div>
            </div>
          </BaseContainer>
        </div>
      </section>

      <section class="demo-section">
        <h2>🃏 Карточки с темами (UserProfileCard)</h2>
        <div class="cards-grid">
          <BaseContainer 
            v-for="theme in cardThemes" 
            :key="theme"
            :initial-theme="theme"
          >
            <div class="theme-demo">
              <ThemeSelector />
              <UserProfileCard :user-data="sampleUser" />
            </div>
          </BaseContainer>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BaseContainer, ThemeSelector } from './components/containers'
import { UserProfileCard, UserAvatar, AvatarIcon } from './components'
import type { ThemeName } from './types/theme'

// Списки тем для демонстрации
const themes: ThemeName[] = ['light', 'dark', 'green', 'starwars']
const cardThemes: ThemeName[] = ['light', 'dark', 'green']

// Пример пользователя
const sampleUser = {
  name: 'Иван Иванов',
  phone: '+7 (999) 123-45-67',
  description: 'Frontend разработчик с опытом работы с Vue.js и современными веб-технологиями',
  avatar: '',
  status: 'Доступен для проектов'
}
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
    margin-bottom: 1.5rem;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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

.avatar-item, .icon-item {
  text-align: center;
  padding: 1rem;
  background: var(--thepro-theme-color-bg);
  border: 1px solid var(--thepro-theme-color-border);
  border-radius: var(--thepro-theme-radius-md);
  margin-top: 1rem;

  h3 {
    margin: 0 0 1rem 0;
    color: var(--thepro-theme-color-text);
    font-size: var(--thepro-theme-font-size-base);
  }
}
</style>
