import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useContainerId } from './useContainerId'

export function useTheme() {
  // Получаем ID контейнера через inject
  const containerId = useContainerId()
  
  // Реактивная ссылка на текущую тему
  const currentTheme = ref<string | null>(null)
  
  // Реактивная ссылка на CSS переменные
  const cssVariables = ref<Record<string, string>>({})

  // Функция для обновления темы и CSS переменных
  const updateThemeAndVariables = () => {
    if (!containerId) return
    
    const container = document.querySelector(`[data-container-id="${containerId}"]`)
    if (container) {
      const theme = container.getAttribute('data-theme')
      currentTheme.value = theme
      
      // Обновляем CSS переменные
      const newVariables: Record<string, string> = {}
      const computedStyle = getComputedStyle(container)
      
      // Читаем все CSS переменные из контейнера
      for (let i = 0; i < computedStyle.length; i++) {
        const property = computedStyle[i]
        if (property.indexOf('--') === 0) {
          const value = computedStyle.getPropertyValue(property)
          if (value && value.trim()) {
            newVariables[property] = value.trim()
          }
        }
      }
      
      cssVariables.value = newVariables
    }
  }

  // Наблюдаем за изменениями в DOM
  let observer: MutationObserver | null = null

  const startObserving = () => {
    if (!containerId) return
    
    const container = document.querySelector(`[data-container-id="${containerId}"]`)
    if (container) {
      observer = new MutationObserver((mutations) => {
        let shouldUpdate = false
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            shouldUpdate = true
          }
        })
        
        if (shouldUpdate) {
          updateThemeAndVariables()
        }
      })
      
      observer.observe(container, { 
        attributes: true, 
        attributeFilter: ['data-theme'] 
      })
    }
  }

  const stopObserving = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  // Читаем CSS-переменную из контейнера
  const getCssVariable = (variableName: string, defaultValue?: string): string => {
    if (!containerId) {
      return defaultValue || ''
    }
    
    // Используем кэшированные CSS переменные
    if (cssVariables.value[variableName]) {
      return cssVariables.value[variableName]
    }
    
    // Fallback: ищем в контейнере напрямую
    const container = document.querySelector(`[data-container-id="${containerId}"]`)
    if (container) {
      const value = getComputedStyle(container).getPropertyValue(variableName)
      
      if (value && value.trim()) {
        return value.trim()
      }
    }
    
    // Fallback к documentElement
    if (document.documentElement) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(variableName)
      if (value && value.trim()) {
        return value.trim()
      }
    }
    
    return defaultValue || ''
  }

  // Получаем текущую тему из контейнера
  const getCurrentTheme = (): string | null => {
    return currentTheme.value
  }

  // Инициализация при монтировании
  onMounted(() => {
    updateThemeAndVariables()
    startObserving()
  })

  // Очистка при размонтировании
  onUnmounted(() => {
    stopObserving()
  })

  return {
    getCssVariable,
    getCurrentTheme,
    currentTheme: computed(() => currentTheme.value),
    cssVariables: computed(() => cssVariables.value)
  }
}
