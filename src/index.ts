// Основные экспорты
export { default as CardHeader } from './components/CardHeader/CardHeader.vue';
export { default as CardBody } from './components/CardBody/CardBody.vue';
export { default as CardFooter } from './components/CardFooter/CardFooter.vue';
export { default as CardPreview } from './components/CardPreview/CardPreview.vue';
export { default as CardWithTheme } from './components/CardWithTheme/CardWithTheme.vue';
export { default as UserProfileCard } from './components/UserProfileCard/UserProfileCard.vue';

// Импорты для Vue плагина
import CardHeader from './components/CardHeader/CardHeader.vue';
import CardBody from './components/CardBody/CardBody.vue';
import CardFooter from './components/CardFooter/CardFooter.vue';
import CardPreview from './components/CardPreview/CardPreview.vue';
import CardWithTheme from './components/CardWithTheme/CardWithTheme.vue';
import UserProfileCard from './components/UserProfileCard/UserProfileCard.vue';

// Типы
export type { CardHeaderThemeCSSVariables } from './components/CardHeader/types';
export type { CardBodyThemeCSSVariables } from './components/CardBody/types';
export type { CardFooterThemeCSSVariables } from './components/CardFooter/types';
export type { CardPreviewThemeCSSVariables } from './components/CardPreview/types';
export type { UserProfileCardThemeCSSVariables } from './components/UserProfileCard/types';
export type { ThemeCSSVariables } from './themes/types';

// Утилиты для работы с темами
export { themeMetadata } from './types/theme';
export type { ThemeName } from './types/theme';

// Простой объект для переключения тем
export const themes = {
  light: 'light',
  dark: 'dark',
  green: 'green'
} as const;

// Функция для применения темы
export function applyTheme(themeName: ThemeName): void {
  document.documentElement.setAttribute('data-theme', themeName);
}

// Функция для получения текущей темы
export function getCurrentTheme(): ThemeName | null {
  return document.documentElement.getAttribute('data-theme') as ThemeName | null;
}

// Функция для переключения темы
export function toggleTheme(): ThemeName {
  const currentTheme = getCurrentTheme();
  const themeNames = Object.keys(themes) as ThemeName[];
  const currentIndex = themeNames.indexOf(currentTheme || 'light');
  const nextIndex = (currentIndex + 1) % themeNames.length;
  const nextTheme = themeNames[nextIndex];
  
  applyTheme(nextTheme);
  return nextTheme;
}

// Vue плагин для автоматической регистрации компонентов
import type { App } from 'vue';

export default {
  install(app: App): void {
    app.component('CardHeader', CardHeader);
    app.component('CardBody', CardBody);
    app.component('CardFooter', CardFooter);
    app.component('CardPreview', CardPreview);
    app.component('CardWithTheme', CardWithTheme);
    app.component('UserProfileCard', UserProfileCard);
  }
};
