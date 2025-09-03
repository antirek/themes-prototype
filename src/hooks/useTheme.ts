import { ref, computed } from 'vue'
import type { ThemeName } from '../types/theme'
import { useContainerId } from './useContainerId'

export function useTheme() {
  // Получаем ID контейнера через inject
  const containerId = useContainerId()

  // Читаем CSS-переменную из конкретного контейнера
  const getCssVariable = (variableName: string, defaultValue?: string): string => {
    console.log('🔍 useTheme: Ищем переменную:', variableName, 'в контейнере:', containerId)
    
    if (!containerId) {
      console.warn('useTheme: Не удалось определить ID контейнера')
      return defaultValue || ''
    }
    
    // Ищем контейнер с конкретным ID
    const container = document.querySelector(`[data-container-id="${containerId}"]`)
    console.log('🔍 useTheme: Найден контейнер:', container)
    
    if (container) {
      const value = getComputedStyle(container).getPropertyValue(variableName)
      console.log('🔍 useTheme: Значение из контейнера:', value.trim())
      
      if (value && value.trim()) {
        return value.trim()
      }
    }
    
    // Fallback к documentElement
    if (document.documentElement) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(variableName)
      console.log('🔍 useTheme: Fallback к documentElement:', value.trim())
      if (value && value.trim()) {
        return value.trim()
      }
    }
    
    console.log('🔍 useTheme: Значение не найдено, возвращаем default:', defaultValue)
    return defaultValue || ''
  }

  // Получаем текущую тему из контейнера
  const getCurrentTheme = (): string | null => {
    if (!containerId) {
      return null
    }
    
    const container = document.querySelector(`[data-container-id="${containerId}"]`)
    if (container) {
      const theme = container.getAttribute('data-theme')
      return theme
    }
    
    return null
  }

  return {
    getCssVariable,
    getCurrentTheme
  }
}
