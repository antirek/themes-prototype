<template>
  <div class="app">
    <header class="app-header">
      <h1>ThePro Cards Example</h1>
      <div class="theme-controls">
        <button @click="switchTheme('light')" :class="{ active: currentTheme === 'light' }">
          Light
        </button>
        <button @click="switchTheme('dark')" :class="{ active: currentTheme === 'dark' }">
          Dark
        </button>
        <button @click="switchTheme('green')" :class="{ active: currentTheme === 'green' }">
          Green
        </button>
      </div>
    </header>

    <main class="app-content">
      <div class="cards-grid">
        <!-- Карточка 1 -->
        <div class="card">
          <CardHeader text="Welcome to ThePro Cards" />
          <CardBody text="This is a beautiful card component with customizable themes. You can switch between light, dark, and green themes using the buttons above." />
          <CardFooter text="Built with Vue 3 and CSS Variables" />
        </div>

        <!-- Карточка 2 -->
        <div class="card">
          <CardHeader text="Feature Rich" />
          <CardBody text="ThePro Cards framework provides a complete solution for creating beautiful card components with a powerful theming system." />
          <CardFooter text="TypeScript support included" />
        </div>

        <!-- Карточка 3 -->
        <div class="card">
          <CardHeader text="Easy to Use" />
          <CardBody text="Simply import the components and themes, then start building amazing card-based interfaces with minimal setup." />
          <CardFooter text="Perfect for dashboards and portfolios" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CardHeader, CardBody, CardFooter, applyTheme, getCurrentTheme } from '../dist/index.es.js';

const currentTheme = ref<string>('light');

const switchTheme = (theme: string) => {
  applyTheme(theme as any);
  currentTheme.value = theme;
};

onMounted(() => {
  currentTheme.value = getCurrentTheme() || 'light';
});
</script>

<style scoped>
.app {
  min-height: 100vh;
  padding: 2rem;
  background: var(--thepro-theme-color-bg);
  color: var(--thepro-theme-color-text);
  transition: all 0.3s ease;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--thepro-theme-color-primary);
}

.theme-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.theme-controls button {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--thepro-theme-color-border);
  background: var(--thepro-theme-color-bg);
  color: var(--thepro-theme-color-text);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.theme-controls button:hover {
  background: var(--thepro-theme-color-primary);
  color: var(--thepro-theme-color-white);
  border-color: var(--thepro-theme-color-primary);
}

.theme-controls button.active {
  background: var(--thepro-theme-color-primary);
  color: var(--thepro-theme-color-white);
  border-color: var(--thepro-theme-color-primary);
}

.app-content {
  max-width: 1200px;
  margin: 0 auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--thepro-theme-shadow-md);
  background: var(--thepro-theme-color-card-bg);
  border: 1px solid var(--thepro-theme-color-card-border);
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .theme-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
