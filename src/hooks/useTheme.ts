import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { ThemeName } from '../types/theme'

export function useTheme(element?: HTMLElement | null) {
  const currentTheme = ref<ThemeName>('light')
  const observer = ref<MutationObserver | null>(null)
  const targetElement = ref<HTMLElement | null>(element || null)

  // Читаем CSS-переменную из целевого элемента или его родителей
  const getCssVariable = (variableName: string, defaultValue?: string): string => {
    console.log('🔍 getCssVariable called:', { variableName, defaultValue, targetElement: targetElement.value })
    
    // Ищем CSS-переменную в конкретном контейнере с темой
    // CSS-переменные компонентов находятся в контейнерах с data-theme, а не глобально
    
    if (targetElement.value) {
      // Ищем ближайший родительский элемент с data-theme
      const themeContainer = targetElement.value.closest('[data-theme]')
      console.log('🔍 Theme container found:', themeContainer)
      
      if (themeContainer) {
        const value = getComputedStyle(themeContainer).getPropertyValue(variableName)
        console.log('🔍 Value from theme container:', { value: value.trim(), theme: themeContainer.getAttribute('data-theme') })
        if (value && value.trim()) {
          return value.trim()
        }
      }
      
      // Если не нашли в ближайшем контейнере с темой, ищем в цепочке родителей
      let currentElement: HTMLElement | null = targetElement.value
      while (currentElement) {
        const value = getComputedStyle(currentElement).getPropertyValue(variableName)
        console.log('🔍 Checking parent element:', { element: currentElement, value: value.trim() })
        
        if (value && value.trim()) {
          return value.trim()
        }
        
        // Переходим к родительскому элементу
        currentElement = currentElement.parentElement
      }
    }
    
    // Fallback к documentElement (для глобальных переменных)
    if (document.documentElement) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(variableName)
      console.log('🔍 Value from documentElement:', value.trim())
      if (value && value.trim()) {
        return value.trim()
      }
    }
    
    console.log('🔍 No value found, returning default:', defaultValue)
    return defaultValue || ''
  }

  // Определяем текущую тему
  const detectTheme = () => {
    let elementToCheck = targetElement.value
    
    // Если элемент не передан, не можем определить тему
    // Хук должен получать targetElement для корректной работы
    if (!elementToCheck) {
      return
    }
    
    // Ищем ближайший родительский элемент с data-theme
    const themeElement = elementToCheck.closest('[data-theme]')
    if (themeElement) {
      const theme = themeElement.getAttribute('data-theme') as ThemeName
      if (theme && ['light', 'dark', 'green', 'starwars'].indexOf(theme) !== -1) {
        currentTheme.value = theme
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
