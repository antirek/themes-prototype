import { inject } from 'vue'

export function useContainerId() {
  // Получаем ID контейнера из BaseContainer через inject
  const containerId = inject<string>('containerId')
  
  if (!containerId) {
    console.warn('useContainerId: Компонент должен использоваться внутри BaseContainer')
    return null
  }
  
  return containerId
}
