// Экспорт всех иконок аватара
export { default as DefaultAvatarIcon } from './DefaultAvatarIcon.vue'
export { default as StarWarsAvatarIcon } from './StarWarsAvatarIcon.vue'

// Типы иконок
export const AVATAR_ICON_TYPES = {
  DEFAULT: 'default',
  STAR_WARS: 'starwars',
} as const

export type AvatarIconType = typeof AVATAR_ICON_TYPES[keyof typeof AVATAR_ICON_TYPES]
