<template>
  <div class="app">
    <header class="header">
      <h1>🎨 Кастомизатор тем</h1>
      <p>Настройте внешний вид ваших карточек</p>
    </header>
    
    <main class="main">
      <div class="customizer-panel">
        <h2>Настройки карточки</h2>
        
        <!-- Настройки заголовка -->
        <section class="section">
          <h3>Заголовок</h3>
          <div class="controls">
            <div class="control-group">
              <label>Текст заголовка:</label>
              <input 
                v-model="cardData.header.text" 
                type="text" 
                placeholder="Введите заголовок"
                class="input"
              >
            </div>
            <div class="control-group">
              <label>Цвет текста:</label>
              <input 
                v-model="cardData.header.textColor" 
                type="color" 
                class="color-input"
              >
            </div>
            <div class="control-group">
              <label>Размер шрифта:</label>
              <input 
                v-model="cardData.header.fontSize" 
                type="range" 
                min="12" 
                max="48" 
                class="range-input"
              >
              <span>{{ cardData.header.fontSize }}px</span>
            </div>
            <div class="control-group">
              <label>Жирный шрифт:</label>
              <input 
                v-model="cardData.header.bold" 
                type="checkbox" 
                class="checkbox"
              >
            </div>
          </div>
        </section>

        <!-- Настройки тела -->
        <section class="section">
          <h3>Тело карточки</h3>
          <div class="controls">
            <div class="control-group">
              <label>Текст тела:</label>
              <textarea 
                v-model="cardData.body.text" 
                placeholder="Введите текст тела карточки"
                class="textarea"
                rows="4"
              ></textarea>
            </div>
            <div class="control-group">
              <label>Цвет текста:</label>
              <input 
                v-model="cardData.body.textColor" 
                type="color" 
                class="color-input"
              >
            </div>
            <div class="control-group">
              <label>Размер шрифта:</label>
              <input 
                v-model="cardData.body.fontSize" 
                type="range" 
                min="10" 
                max="24" 
                class="range-input"
              >
              <span>{{ cardData.body.fontSize }}px</span>
            </div>
            <div class="control-group">
              <label>Цвет фона:</label>
              <input 
                v-model="cardData.body.backgroundColor" 
                type="color" 
                class="color-input"
              >
            </div>
          </div>
        </section>

        <!-- Настройки низа -->
        <section class="section">
          <h3>Низ карточки</h3>
          <div class="controls">
            <div class="control-group">
              <label>Текст низа:</label>
              <input 
                v-model="cardData.footer.text" 
                type="text" 
                placeholder="Введите текст низа"
                class="input"
              >
            </div>
            <div class="control-group">
              <label>Цвет текста:</label>
              <input 
                v-model="cardData.footer.textColor" 
                type="color" 
                class="color-input"
              >
            </div>
            <div class="control-group">
              <label>Размер шрифта:</label>
              <input 
                v-model="cardData.footer.fontSize" 
                type="range" 
                min="10" 
                max="20" 
                class="range-input"
              >
              <span>{{ cardData.footer.fontSize }}px</span>
            </div>
            <div class="control-group">
              <label>Выравнивание:</label>
              <select v-model="cardData.footer.align" class="select">
                <option value="left">По левому краю</option>
                <option value="center">По центру</option>
                <option value="right">По правому краю</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Общие настройки карточки -->
        <section class="section">
          <h3>Общие настройки</h3>
          <div class="controls">
            <div class="control-group">
              <label>Ширина карточки:</label>
              <input 
                v-model="cardData.width" 
                type="range" 
                min="200" 
                max="600" 
                class="range-input"
              >
              <span>{{ cardData.width }}px</span>
            </div>
            <div class="control-group">
              <label>Цвет фона карточки:</label>
              <input 
                v-model="cardData.backgroundColor" 
                type="color" 
                class="color-input"
              >
            </div>
            <div class="control-group">
              <label>Тень:</label>
              <input 
                v-model="cardData.shadow" 
                type="checkbox" 
                class="checkbox"
              >
            </div>
            <div class="control-group">
              <label>Скругление углов:</label>
              <input 
                v-model="cardData.borderRadius" 
                type="range" 
                min="0" 
                max="20" 
                class="range-input"
              >
              <span>{{ cardData.borderRadius }}px</span>
            </div>
          </div>
        </section>
      </div>

      <div class="preview-panel">
        <h2>Предварительный просмотр</h2>
        <CardPreview :card-data="cardData" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardPreview from './components/CardPreview/CardPreview.vue'
import type { CardData } from '@/types/card'

const cardData = ref<CardData>({
  header: {
    text: 'Заголовок карточки',
    textColor: '#2c3e50',
    fontSize: 24,
    bold: true
  },
  body: {
    text: 'Это пример текста тела карточки. Здесь может быть размещен любой контент, который вы хотите отобразить.',
    textColor: '#34495e',
    fontSize: 16,
    backgroundColor: '#f8f9fa'
  },
  footer: {
    text: 'Подпись или дополнительная информация',
    textColor: '#7f8c8d',
    fontSize: 14,
    align: 'left'
  },
  width: 400,
  backgroundColor: '#ffffff',
  shadow: true,
  borderRadius: 8
})
</script>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.app {
  min-height: 100vh;
  padding: $spacing-lg;
  
  @include respond-to(sm) {
    padding: $spacing-sm;
  }
}

.header {
  text-align: center;
  margin-bottom: $spacing-3xl;
  color: white;
  
  h1 {
    font-size: $font-size-4xl;
    margin-bottom: $spacing-sm;
    text-shadow: $shadow-lg;
    
    @include respond-to(sm) {
      font-size: $font-size-3xl;
    }
  }
  
  p {
    font-size: $font-size-xl;
    opacity: 0.9;
  }
}

.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-3xl;
  max-width: 1400px;
  margin: 0 auto;
  
  @include respond-to(lg) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
}

.customizer-panel, .preview-panel {
  @include card-base;
  padding: $spacing-2xl;
  
  @include respond-to(md) {
    padding: $spacing-lg;
  }
  
  h2 {
    color: $secondary-color;
    margin-bottom: $spacing-xl;
    font-size: $font-size-2xl;
    border-bottom: 2px solid $primary-color;
    padding-bottom: $spacing-sm;
  }
}

.section {
  margin-bottom: $spacing-2xl;
  padding: $spacing-lg;
  background: $light-color;
  border-radius: $border-radius-md;
  border-left: 4px solid $primary-color;
  
  h3 {
    color: $secondary-color;
    margin-bottom: $spacing-md;
    font-size: $font-size-xl;
  }
}

.controls {
  @include flex(column);
  gap: $spacing-md;
}

.control-group {
  @include flex(row, flex-start, center);
  gap: $spacing-sm;
  flex-wrap: wrap;
  
  @include respond-to(sm) {
    flex-direction: column;
    align-items: flex-start;
  }
  
  label {
    min-width: 120px;
    font-weight: 500;
    color: $secondary-color;
    
    @include respond-to(sm) {
      min-width: auto;
    }
  }
}

.input, .textarea, .select {
  flex: 1;
  padding: $spacing-sm $spacing-md;
  border: 2px solid #ddd;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  transition: border-color $transition-base;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

.color-input {
  width: 50px;
  height: 40px;
  border: none;
  border-radius: $border-radius-sm;
  cursor: pointer;
}

.range-input {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  cursor: pointer;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.preview-panel {
  @include flex(column, flex-start, center);
}
</style>
