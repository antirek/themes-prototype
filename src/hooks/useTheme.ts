import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { ThemeName } from '../types/theme'

export function useTheme(element?: HTMLElement | null) {
  const currentTheme = ref<ThemeName>('light')
  const observer = ref<MutationObserver | null>(null)
  const targetElement = ref<HTMLElement | null>(element || null)

  // Определяем текущую тему
  const detectTheme = () => {
    let elementToCheck = targetElement.value
    
    // Если элемент не передан, ищем ближайший родительский элемент с data-theme
    if (!elementToCheck) {
      // Fallback: ищем глобально
      const avatarElement = document.querySelector('.user-avatar')
      if (avatarElement) {
        elementToCheck = avatarElement.closest('[data-theme]') as HTMLElement
      }
    }
    
    if (elementToCheck) {
      // Ищем ближайший родительский элемент с data-theme
      const themeElement = elementToCheck.closest('[data-theme]')
      if (themeElement) {
        const theme = themeElement.getAttribute('data-theme') as ThemeName
        if (theme && ['light', 'dark', 'green', 'starwars'].indexOf(theme) !== -1) {
          currentTheme.value = theme
        }
      }
    }
  }

  // Начинаем наблюдение за изменениями темы
  const startObserving = () => {
    if (observer.value) {
      observer.value.disconnect()
    }

    observer.value = new MutationObserver(() => {
      detectTheme()
    })

    // Наблюдаем за documentElement для глобальных изменений
    observer.value.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })

    // Наблюдаем за всеми элементами с data-theme
    const themeElements = document.querySelectorAll('[data-theme]')
    themeElements.forEach(themeElement => {
      observer.value?.observe(themeElement, { 
        attributes: true, 
        attributeFilter: ['data-theme'] 
      })
    })
  }

  // Останавливаем наблюдение
  const stopObserving = () => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  // Обновляем целевой элемент
  const updateTargetElement = (newElement: HTMLElement | null) => {
    targetElement.value = newElement
    detectTheme()
  }

  onMounted(() => {
    detectTheme()
    startObserving()
  })

  onUnmounted(() => {
    stopObserving()
  })

  return {
    currentTheme,
    detectTheme,
    startObserving,
    stopObserving,
    updateTargetElement
  }
}
