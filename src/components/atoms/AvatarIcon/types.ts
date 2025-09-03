// Доступные типы иконок (соответствуют именам SVG файлов)
export type AvatarIconType = 'default' | 'starwars' | 'user' | 'admin' | 'guest'

// Интерфейс для SVG иконки
export interface SvgIcon {
  name: string
  path: string
}

// Интерфейс для props AvatarIcon
export interface AvatarIconProps {
  /** Тип иконки для отображения */
  iconType: AvatarIconType
  /** Цвет иконки (CSS цвет: hex, rgb, название цвета) */
  color?: string
  /** Размер иконки */
  size?: string | number
}
