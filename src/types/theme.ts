export type ThemeName = 'light' | 'dark' | 'green' | 'starwars' | 'avatar';

export interface ThemeColors {
  // Основные цвета
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  
  // Цвета текста
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Цвета акцента
  accentPrimary: string;
  accentSecondary: string;
  accentSuccess: string;
  accentWarning: string;
  accentDanger: string;
  
  // Градиенты
  gradientPrimary: string;
  gradientSecondary: string;
  gradientAccent: string;
  
  // Границы
  borderPrimary: string;
  borderSecondary: string;
  borderAccent: string;
  
  // Тени
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;
  
  // Состояния
  hoverBg: string;
  activeBg: string;
  focusRing: string;
  
  // Специальные цвета для карточек
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  
  // Цвета для заголовка карточки
  cardHeaderBg: string;
  cardHeaderText: string;
  cardHeaderBorder: string;
  
  // Цвета для тела карточки
  cardBodyBg: string;
  cardBodyText: string;
  
  // Цвета для футера карточки
  cardFooterBg: string;
  cardFooterText: string;
  cardFooterBorder: string;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
  displayName: string;
  description: string;
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    name: 'light',
    displayName: 'Светлая',
    description: 'Классическая светлая тема с синими акцентами',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8f9fa',
      bgTertiary: '#e9ecef',
      textPrimary: '#2c3e50',
      textSecondary: '#6c757d',
      textMuted: '#adb5bd',
      accentPrimary: '#3498db',
      accentSecondary: '#2980b9',
      accentSuccess: '#27ae60',
      accentWarning: '#f39c12',
      accentDanger: '#e74c3c',
      gradientPrimary: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      gradientSecondary: 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
      gradientAccent: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      borderPrimary: '#dee2e6',
      borderSecondary: '#ced4da',
      borderAccent: '#3498db',
      shadowSm: '0 2px 4px rgba(0, 0, 0, 0.1)',
      shadowMd: '0 4px 8px rgba(0, 0, 0, 0.12)',
      shadowLg: '0 8px 16px rgba(0, 0, 0, 0.15)',
      shadowXl: '0 12px 24px rgba(0, 0, 0, 0.18)',
      hoverBg: '#f8f9fa',
      activeBg: '#e9ecef',
      focusRing: 'rgba(52, 152, 219, 0.3)',
      cardBg: '#ffffff',
      cardBorder: '#dee2e6',
      cardShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      cardHeaderBg: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      cardHeaderText: '#ffffff',
      cardHeaderBorder: 'rgba(255, 255, 255, 0.1)',
      cardBodyBg: '#f8f9fa',
      cardBodyText: '#2c3e50',
      cardFooterBg: '#f8f9fa',
      cardFooterText: '#6c757d',
      cardFooterBorder: '#dee2e6'
    }
  },
  dark: {
    name: 'dark',
    displayName: 'Темная',
    description: 'Современная темная тема с фиолетовыми акцентами',
    colors: {
      bgPrimary: '#1a1a1a',
      bgSecondary: '#2d2d2d',
      bgTertiary: '#3a3a3a',
      textPrimary: '#ffffff',
      textSecondary: '#b3b3b3',
      textMuted: '#808080',
      accentPrimary: '#667eea',
      accentSecondary: '#764ba2',
      accentSuccess: '#27ae60',
      accentWarning: '#f39c12',
      accentDanger: '#e74c3c',
      gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      gradientSecondary: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      gradientAccent: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderPrimary: '#404040',
      borderSecondary: '#555555',
      borderAccent: '#667eea',
      shadowSm: '0 2px 4px rgba(0, 0, 0, 0.3)',
      shadowMd: '0 4px 8px rgba(0, 0, 0, 0.4)',
      shadowLg: '0 8px 16px rgba(0, 0, 0, 0.5)',
      shadowXl: '0 12px 24px rgba(0, 0, 0, 0.6)',
      hoverBg: '#404040',
      activeBg: '#505050',
      focusRing: 'rgba(102, 126, 234, 0.3)',
      cardBg: '#2d2d2d',
      cardBorder: '#404040',
      cardShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      cardHeaderBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardHeaderText: '#ffffff',
      cardHeaderBorder: 'rgba(255, 255, 255, 0.1)',
      cardBodyBg: '#3a3a3a',
      cardBodyText: '#e0e0e0',
      cardFooterBg: '#2d2d2d',
      cardFooterText: '#b3b3b3',
      cardFooterBorder: '#404040'
    }
  },
  green: {
    name: 'green',
    displayName: 'Зеленая',
    description: 'Природная зеленая тема с экологическими акцентами',
    colors: {
      bgPrimary: '#f0f8f0',
      bgSecondary: '#e8f5e8',
      bgTertiary: '#d4edda',
      textPrimary: '#1e4d2b',
      textSecondary: '#2d5a3d',
      textMuted: '#6c8b7a',
      accentPrimary: '#28a745',
      accentSecondary: '#20c997',
      accentSuccess: '#198754',
      accentWarning: '#ffc107',
      accentDanger: '#dc3545',
      gradientPrimary: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
      gradientSecondary: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
      gradientAccent: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
      borderPrimary: '#c3e6cb',
      borderSecondary: '#b1dfbb',
      borderAccent: '#28a745',
      shadowSm: '0 2px 4px rgba(40, 167, 69, 0.1)',
      shadowMd: '0 4px 8px rgba(40, 167, 69, 0.15)',
      shadowLg: '0 8px 16px rgba(40, 167, 69, 0.2)',
      shadowXl: '0 12px 24px rgba(40, 167, 69, 0.25)',
      hoverBg: '#d4edda',
      activeBg: '#c3e6cb',
      focusRing: 'rgba(40, 167, 69, 0.3)',
      cardBg: '#ffffff',
      cardBorder: '#c3e6cb',
      cardShadow: '0 4px 20px rgba(40, 167, 69, 0.15)',
      cardHeaderBg: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
      cardHeaderText: '#ffffff',
      cardHeaderBorder: 'rgba(255, 255, 255, 0.1)',
      cardBodyBg: '#f8fff8',
      cardBodyText: '#1e4d2b',
      cardFooterBg: '#e8f5e8',
      cardFooterText: '#2d5a3d',
      cardFooterBorder: '#c3e6cb'
    }
  },
  starwars: {
    name: 'starwars',
    displayName: 'Star Wars',
    description: 'Футуристическая тема в стиле Звездных войн',
    colors: {
      bgPrimary: '#0a0a0a',
      bgSecondary: '#1a1a1a',
      bgTertiary: '#2a2a2a',
      textPrimary: '#FFD700',
      textSecondary: '#C0C0C0',
      textMuted: '#808080',
      accentPrimary: '#FFD700',
      accentSecondary: '#8B0000',
      accentSuccess: '#32CD32',
      accentWarning: '#FF8C00',
      accentDanger: '#DC143C',
      gradientPrimary: 'linear-gradient(135deg, #FFD700 0%, #8B0000 100%)',
      gradientSecondary: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      gradientAccent: 'linear-gradient(135deg, #FFD700 0%, #32CD32 100%)',
      borderPrimary: '#333333',
      borderSecondary: '#444444',
      borderAccent: '#FFD700',
      shadowSm: '0 2px 4px rgba(255, 215, 0, 0.2)',
      shadowMd: '0 4px 8px rgba(255, 215, 0, 0.3)',
      shadowLg: '0 8px 16px rgba(255, 215, 0, 0.4)',
      shadowXl: '0 12px 24px rgba(255, 215, 0, 0.5)',
      hoverBg: '#2a2a2a',
      activeBg: '#3a3a3a',
      focusRing: 'rgba(255, 215, 0, 0.3)',
      cardBg: '#0a0a0a',
      cardBorder: '#FFD700',
      cardShadow: '0 8px 16px rgba(255, 215, 0, 0.4)',
      cardHeaderBg: 'linear-gradient(135deg, #FFD700 0%, #8B0000 100%)',
      cardHeaderText: '#000000',
      cardHeaderBorder: '#FFD700',
      cardBodyBg: '#0a0a0a',
      cardBodyText: '#FFD700',
      cardFooterBg: '#1a1a1a',
      cardFooterText: '#C0C0C0',
      cardFooterBorder: '#333333'
    }
  },
  avatar: {
    name: 'avatar',
    displayName: 'Avatar',
    description: 'Биолюминесцентная тема в стиле Пандоры',
    colors: {
      bgPrimary: '#001a1a',
      bgSecondary: '#002a2a',
      bgTertiary: '#003a3a',
      textPrimary: '#E0FFFF',
      textSecondary: '#B0E0E6',
      textMuted: '#87CEEB',
      accentPrimary: '#00FFFF',
      accentSecondary: '#FF6B9D',
      accentSuccess: '#7FFF00',
      accentWarning: '#FFD700',
      accentDanger: '#FF4500',
      gradientPrimary: 'linear-gradient(135deg, #00FFFF 0%, #FF6B9D 100%)',
      gradientSecondary: 'linear-gradient(135deg, #002a2a 0%, #003a3a 100%)',
      gradientAccent: 'linear-gradient(135deg, #00FFFF 0%, #7FFF00 100%)',
      borderPrimary: '#004040',
      borderSecondary: '#005050',
      borderAccent: '#00FFFF',
      shadowSm: '0 2px 8px rgba(0, 255, 255, 0.3)',
      shadowMd: '0 4px 16px rgba(0, 255, 255, 0.4)',
      shadowLg: '0 8px 32px rgba(0, 255, 255, 0.5)',
      shadowXl: '0 12px 48px rgba(0, 255, 255, 0.6)',
      hoverBg: '#003a3a',
      activeBg: '#004a4a',
      focusRing: 'rgba(0, 255, 255, 0.3)',
      cardBg: '#001a1a',
      cardBorder: '#00FFFF',
      cardShadow: '0 8px 32px rgba(0, 255, 255, 0.5)',
      cardHeaderBg: 'linear-gradient(135deg, #00FFFF 0%, #FF6B9D 100%)',
      cardHeaderText: '#000000',
      cardHeaderBorder: '#00FFFF',
      cardBodyBg: '#001a1a',
      cardBodyText: '#E0FFFF',
      cardFooterBg: '#002a2a',
      cardFooterText: '#B0E0E6',
      cardFooterBorder: '#004040'
    }
  }
};

export const defaultTheme: ThemeName = 'light';
