// Экспортируем основные компоненты
export { default as CardHeader } from './components/elements/CardHeader/CardHeader.vue';
export { default as CardBody } from './components/elements/CardBody/CardBody.vue';
export { default as CardFooter } from './components/elements/CardFooter/CardFooter.vue';
export { default as CardPreview } from './components/elements/CardPreview/CardPreview.vue';
export { default as UserProfileCard } from './components/blocks/UserProfileCard/UserProfileCard.vue';
export { default as UserAvatar } from './components/elements/UserAvatar/UserAvatar.vue';
export { default as AvatarIcon } from './components/atoms/AvatarIcon/AvatarIcon.vue';

// Импортируем компоненты для регистрации
import CardHeader from './components/elements/CardHeader/CardHeader.vue';
import CardBody from './components/elements/CardBody/CardBody.vue';
import CardFooter from './components/elements/CardFooter/CardFooter.vue';
import CardPreview from './components/elements/CardPreview/CardPreview.vue';
import UserProfileCard from './components/blocks/UserProfileCard/UserProfileCard.vue';
import UserAvatar from './components/elements/UserAvatar/UserAvatar.vue';
import AvatarIcon from './components/atoms/AvatarIcon/AvatarIcon.vue';

// Типы
export type { CardHeaderThemeCSSVariables } from './components/elements/CardHeader/types';
export type { CardBodyThemeCSSVariables } from './components/elements/CardBody/types';
export type { CardFooterThemeCSSVariables } from './components/elements/CardFooter/types';
export type { CardPreviewThemeCSSVariables } from './components/elements/CardPreview/types';
export type { UserProfileCardThemeCSSVariables } from './components/blocks/UserProfileCard/types';
export type { AvatarIconType, AvatarIconProps } from './components/atoms/AvatarIcon/types';
export type { ThemeCSSVariables } from './themes/types';

// Утилиты для работы с темами

// Простой объект для переключения тем
export const themes = {
  light: 'light',
  dark: 'dark',
  green: 'green',
  starwars: 'starwars'
} as const;

// Функция для применения темы
export function applyTheme(themeName: 'light' | 'dark' | 'green' | 'starwars'): void {
  document.documentElement.setAttribute('data-theme', themeName);
}

// Функция для получения текущей темы
export function getCurrentTheme(): 'light' | 'dark' | 'green' | 'starwars' | null {
  return document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | 'green' | 'starwars' | null;
}

// Функция для переключения темы
export function toggleTheme(): 'light' | 'dark' | 'green' | 'starwars' {
  const currentTheme = getCurrentTheme();
  const themeNames = Object.keys(themes) as ('light' | 'dark' | 'green' | 'starwars')[];
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
    app.component('UserProfileCard', UserProfileCard);
    app.component('UserAvatar', UserAvatar);
    app.component('AvatarIcon', AvatarIcon);
  }
};
