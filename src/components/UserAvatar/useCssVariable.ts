import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Хук для отслеживания CSS переменной
 */
export function useCssVariable(
  variableName: string,
  defaultValue: string = '',
  element: HTMLElement | null = null
) {
  const value = ref(defaultValue)
  
  const updateValue = () => {
    // Если элемент передан, используем его, иначе ищем ближайший родительский элемент с data-theme
    let targetElement = element
    if (!targetElement) {
      const avatarElement = document.querySelector('.user-avatar')
      if (avatarElement) {
        targetElement = avatarElement.closest('[data-theme]') as HTMLElement || document.documentElement
      } else {
        targetElement = document.documentElement
      }
    } else {
      // Если элемент передан, ищем ближайший родительский элемент с data-theme
      targetElement = targetElement.closest('[data-theme]') as HTMLElement || targetElement
    }
    
    console.log('=== useCssVariable DEBUG ===')
    console.log('Target element:', targetElement)
    console.log('Target element data-theme:', targetElement?.getAttribute('data-theme'))
    console.log('Looking for variable:', variableName)
    
    const computedStyle = getComputedStyle(targetElement)
    const newValue = computedStyle.getPropertyValue(variableName).trim()
    console.log('Found value:', newValue || 'NOT FOUND')
    console.log('============================')
    
    value.value = newValue || defaultValue
  }
  
  let observer: MutationObserver | null = null
  
  onMounted(() => {
    updateValue()
    
    // Создаем наблюдатель за изменениями
    observer = new MutationObserver(() => {
      updateValue()
    })
    
    // Наблюдаем за изменениями атрибутов
    if (element) {
      observer.observe(element, { 
        attributes: true, 
        attributeFilter: ['style', 'data-theme'] 
      })
    }
    
    // Также наблюдаем за documentElement для глобальных изменений
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })
    
    // Наблюдаем за всеми элементами с data-theme на странице
    const themeElements = document.querySelectorAll('[data-theme]')
    themeElements.forEach(themeElement => {
      if (observer) {
        observer.observe(themeElement, { 
          attributes: true, 
          attributeFilter: ['data-theme'] 
        })
      }
    })
  })
  
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
  
  return { value, updateValue }
}
