import { ref, computed } from 'vue'
import type { ThemeName } from '../types/theme'

export function useTheme() {
  // Читаем CSS-переменную из любого элемента с темой
  const getCssVariable = (variableName: string, defaultValue?: string): string => {
    console.log('🔍 useTheme: Ищем переменную:', variableName)
    
    // Ищем все элементы с data-theme
    const themeElements = document.querySelectorAll('[data-theme]')
    console.log('🔍 useTheme: Найдено элементов с темами:', themeElements.length)
    
    // Проходим по всем элементам с темами и ищем переменную
    for (let i = 0; i < themeElements.length; i++) {
      const themeElement = themeElements[i]
      const theme = themeElement.getAttribute('data-theme')
      const value = getComputedStyle(themeElement).getPropertyValue(variableName)
      
      console.log('🔍 useTheme: Проверяем элемент:', {
        element: themeElement,
        theme,
        variableName,
        value: value.trim()
      })
      
      if (value && value.trim()) {
        console.log('🔍 useTheme: Найдено значение:', value.trim())
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

  // Получаем текущую активную тему (без валидации конкретных значений)
  const getCurrentTheme = (): string | null => {
    // Ищем элемент с data-theme (обычно это корневой элемент страницы)
    const themeElement = document.querySelector('[data-theme]')
    if (themeElement) {
      const theme = themeElement.getAttribute('data-theme')
      return theme
    }
    return null
  }

  return {
    getCssVariable,
    getCurrentTheme
  }
}
