export interface ThemeSelectorThemeCSSVariables {
  /** Радиус скругления средний */
  '--thepro-themeselector-radius-md': string;
  /** Радиус скругления маленький */
  '--thepro-themeselector-radius-sm': string;
  /** Время перехода для анимаций */
  '--thepro-themeselector-transition': string;
  /** Размер шрифта базовый */
  '--thepro-themeselector-font-size-base': string;
  /** Размер шрифта маленький */
  '--thepro-themeselector-font-size-sm': string;
  /** Жирность шрифта жирный */
  '--thepro-themeselector-font-weight-bold': string;
  /** Цвет основной */
  '--thepro-themeselector-color-primary': string;
  /** Цвет фона */
  '--thepro-themeselector-color-bg': string;
  /** Цвет фона вторичный */
  '--thepro-themeselector-color-bg-secondary': string;
  /** Цвет границы */
  '--thepro-themeselector-color-border': string;
  /** Цвет текста */
  '--thepro-themeselector-color-text': string;
  /** Тень маленькая */
  '--thepro-themeselector-shadow-sm': string;
  /** Шрифт вторичный */
  '--thepro-themeselector-font-family-secondary': string;
  /** Отступы контейнера */
  '--thepro-themeselector-padding': string;
  /** Отступы селекта */
  '--thepro-themeselector-select-padding': string;
  /** Отступы опций */
  '--thepro-themeselector-option-padding': string;
  /** Тень фокуса */
  '--thepro-themeselector-focus-shadow': string;
}

export interface ThemeSelectorProps {
  /** Дополнительные CSS классы */
  class?: string;
}
