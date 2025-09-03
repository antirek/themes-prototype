// Константы для использования в stories и других местах
export const AVATAR_ICON_TYPES = {
  DEFAULT: 'default',
  STAR_WARS: 'starwars',
  USER: 'user',
  ADMIN: 'admin',
  GUEST: 'guest'
} as const

// Утилита для загрузки SVG иконок по имени
export const svgIcons: Record<string, string> = {
  default: '/src/components/atoms/AvatarIcon/svg/default.svg',
  starwars: '/src/components/atoms/AvatarIcon/svg/starwars.svg',
  user: '/src/components/atoms/AvatarIcon/svg/user.svg',
  admin: '/src/components/atoms/AvatarIcon/svg/admin.svg',
  guest: '/src/components/atoms/AvatarIcon/svg/guest.svg'
}

// Функция для получения пути к SVG иконке
export function getSvgIconPath(iconName: string): string {
  return svgIcons[iconName] || svgIcons.default
}

// Функция для проверки существования иконки
export function iconExists(iconName: string): boolean {
  return iconName in svgIcons
}
