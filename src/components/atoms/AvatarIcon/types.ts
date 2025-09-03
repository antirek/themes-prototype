// Доступные типы иконок (соответствуют именам SVG файлов)
export type AvatarIconType = 'default' | 'starwars' | 'user' | 'admin' | 'guest'

// Интерфейс для SVG иконки
export interface SvgIcon {
  name: string
  path: string
}
