import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { ThemeName } from '../types/theme'

export function useTheme(element?: HTMLElement | null) {
  const currentTheme = ref<ThemeName>('light')
  const observer = ref<MutationObserver | null>(null)
  const targetElement = ref<HTMLElement | null>(element || null)

  // Читаем CSS-переменную из целевого элемента или его родителей
  const getCssVariable = (variableName: string, defaultValue?: string): string => {
    console.log('🔍 getCssVariable called:', { variableName, defaultValue })
    
    // Сначала ищем в цепочке родителей targetElement
    if (targetElement.value) {
      let currentElement: HTMLElement | null = targetElement.value
      while (currentElement) {
        const value = getComputedStyle(currentElement).getPropertyValue(variableName)
        console.log('🔍 Checking element:', {
          element: currentElement,
          hasDataTheme: currentElement.hasAttribute('data-theme'),
          dataTheme: currentElement.getAttribute('data-theme'),
          variableName,
          value: value.trim()
        })
        
        if (value && value.trim()) {
          console.log('🔍 Found value in element:', value.trim())
          return value.trim()
        }
        
        // Переходим к родительскому элементу
        currentElement = currentElement.parentElement
      }
    }
    
    // Если не нашли, ищем в любом элементе с data-theme
    const allThemeElements = document.querySelectorAll('[data-theme]')
    console.log('🔍 Searching all theme elements:', allThemeElements.length)
    
    allThemeElements.forEach((themeElement) => {
      const value = getComputedStyle(themeElement as HTMLElement).getPropertyValue(variableName)
      console.log('🔍 Checking theme element:', {
        element: themeElement,
        theme: themeElement.getAttribute('data-theme'),
        variableName,
        value: value.trim()
      })
      
      if (value && value.trim()) {
        console.log('🔍 Found value in theme element:', value.trim())
        return value.trim()
      }
    })
    
    console.log('🔍 No value found, returning default:', defaultValue)
    return defaultValue || ''
  }

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
    updateTargetElement,
    getCssVariable
  }
}
