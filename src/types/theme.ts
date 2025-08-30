export type ThemeName = 'light' | 'dark' | 'green';

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
  }
} as const;

export const defaultTheme: ThemeName = 'light';
