/**
 * Константы для типов иконок аватара
 */
export const AVATAR_ICON_TYPES = {
  /** Стандартная иконка (по умолчанию) */
  DEFAULT: 'default',
  /** Star Wars иконка */
  STAR_WARS: 'starwars',
} as const;

/**
 * Тип для значений типов иконок
 */
export type AvatarIconType = typeof AVATAR_ICON_TYPES[keyof typeof AVATAR_ICON_TYPES];

/**
 * CSS переменные для типов иконок
 */
export const AVATAR_ICON_CSS_VARS = {
  /** CSS переменная для типа иконки */
  ICON_TYPE: '--thepro-useravatar-icon-type',
  /** CSS переменная для эффектов иконки */
  ICON_EFFECTS: '--thepro-useravatar-icon-effects',
  /** CSS переменная для эффектов иконки при hover */
  ICON_EFFECTS_HOVER: '--thepro-useravatar-icon-effects-hover',
} as const;
