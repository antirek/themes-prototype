export interface UserAvatarThemeCSSVariables {
  /** Размер аватара пользователя */
  '--thepro-useravatar-size': string;
  /** Граница аватара пользователя */
  '--thepro-useravatar-border': string;
  /** Радиус скругления аватара пользователя */
  '--thepro-useravatar-border-radius': string;
  /** Тень аватара пользователя */
  '--thepro-useravatar-shadow': string;
  /** Размер аватара на больших экранах */
  '--thepro-useravatar-size-large': string;
  /** Размер аватара на средних экранах */
  '--thepro-useravatar-size-medium': string;
  /** Размер аватара на мобильных */
  '--thepro-useravatar-size-mobile': string;
  /** Размер аватара на маленьких мобильных */
  '--thepro-useravatar-size-small': string;
  /** Цвет иконки аватара по умолчанию */
  '--thepro-useravatar-icon-color': string;
  /** Цвет иконки аватара при hover */
  '--thepro-useravatar-icon-color-hover': string;
  /** Отступы иконки аватара */
  '--thepro-useravatar-icon-padding': string;
}

export interface UserAvatarProps {
  /** URL изображения аватара */
  src?: string;
  /** Альтернативный текст для изображения */
  alt?: string;
  /** Размер аватара (опционально, переопределяет CSS переменную) */
  size?: string;
}
