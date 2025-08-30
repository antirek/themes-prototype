export type ThemeName = 'light' | 'dark' | 'green' | 'starwars' | 'avatar';

// Интерфейс для метаданных темы (только для UI)
export interface ThemeMetadata {
  name: ThemeName;
  displayName: string;
  description: string;
}

// Метаданные тем для UI (отображение названий в селекторах)
export const themeMetadata = {
  light: {
    name: 'light',
    displayName: 'Светлая',
    description: 'Классическая светлая тема с синими акцентами'
  },
  dark: {
    name: 'dark',
    displayName: 'Темная',
    description: 'Современная темная тема с фиолетовыми акцентами'
  },
  green: {
    name: 'green',
    displayName: 'Зеленая',
    description: 'Природная зеленая тема с экологическими акцентами'
  },
  starwars: {
    name: 'starwars',
    displayName: 'Star Wars',
    description: 'Футуристическая тема в стиле Звездных войн'
  },
  avatar: {
    name: 'avatar',
    displayName: 'Avatar',
    description: 'Биолюминесцентная тема в стиле Пандоры'
  }
} as const;

export const defaultTheme: ThemeName = 'light';
