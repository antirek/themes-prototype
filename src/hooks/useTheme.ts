import { ref, computed } from 'vue'
import type { ThemeName } from '../types/theme'

export function useTheme() {
  // Читаем CSS-переменную из любого элемента с темой
  const getCssVariable = (variableName: string, defaultValue?: string): string => {
    console.log('🔍 useTheme: Ищем переменную:', variableName)
    
    // Сначала определяем текущую активную тему
    const currentTheme = getCurrentTheme()
    console.log('🔍 useTheme: Текущая активная тема:', currentTheme)
    
    // Ищем все элементы с data-theme
    const themeElements = document.querySelectorAll('[data-theme]')
    console.log('🔍 useTheme: Найдено элементов с темами:', themeElements.length)
    
    // Сначала ищем в элементе с активной темой
    for (let i = 0; i < themeElements.length; i++) {
      const themeElement = themeElements[i]
      const theme = themeElement.getAttribute('data-theme')
      
      // Если это элемент с активной темой, проверяем его первым
      if (theme === currentTheme) {
        const value = getComputedStyle(themeElement).getPropertyValue(variableName)
        
        console.log('🔍 useTheme: Проверяем элемент с активной темой:', {
          element: themeElement,
          theme,
          variableName,
          value: value.trim()
        })
        
        if (value && value.trim()) {
          console.log('🔍 useTheme: Найдено значение в активной теме:', value.trim())
          return value.trim()
        }
      }
    }
    
    // Если не нашли в активной теме, ищем в любом элементе
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

  // Получаем текущую активную тему
  const getCurrentTheme = (): ThemeName => {
    // Ищем элемент с data-theme (обычно это корневой элемент страницы)
    const themeElement = document.querySelector('[data-theme]')
    if (themeElement) {
      const theme = themeElement.getAttribute('data-theme') as ThemeName
      if (theme && ['light', 'dark', 'green', 'starwars'].indexOf(theme) !== -1) {
        return theme
      }
    }
    return 'light' // fallback
  }

  return {
    getCssVariable,
    getCurrentTheme
  }
}
