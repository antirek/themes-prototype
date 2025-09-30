# UserAvatar

Компонент аватара пользователя с fallback на иконку и поддержкой тем.

## Реализовать

**Цель:** Создать элемент-компонент для отображения аватара пользователя.

**Структура:**
- Контейнер с классом `user-avatar`
- Изображение аватара (если доступно)
- Fallback на AvatarIcon при отсутствии/ошибке изображения
- Поддержка CSS переменных для кастомизации

**Требования:**
- Поддержка всех тем (light, dark, green, starwars)
- TypeScript типизация
- CSS переменные для кастомизации
- Обработка ошибок загрузки изображения
- Fallback на иконку при отсутствии src
- Интеграция с AvatarIcon компонентом
- Адаптивные размеры
- Hover эффекты

**Props:**
```typescript
interface Props {
  src?: string  // URL изображения аватара
  alt?: string  // Альтернативный текст для изображения
}
```

## Использование

```vue
<!-- С изображением -->
<UserAvatar 
  src="https://example.com/avatar.jpg" 
  alt="Аватар пользователя" 
/>

<!-- Без изображения (fallback на иконку) -->
<UserAvatar />
```

## CSS переменные

```scss
--thepro-useravatar-size: 140px;
--thepro-useravatar-border: 2px solid var(--thepro-border);
--thepro-useravatar-border-radius: 50%;
--thepro-useravatar-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
--thepro-useravatar-size-large: 160px;
--thepro-useravatar-size-medium: 120px;
--thepro-useravatar-size-mobile: 100px;
--thepro-useravatar-size-small: 80px;
--thepro-useravatar-icon-color: var(--thepro-text);
--thepro-useravatar-icon-color-hover: var(--thepro-primary);
--thepro-useravatar-icon-padding: 1rem;
--thepro-useravatar-icon-type: default;
--thepro-useravatar-transition: all 0.3s ease;
```

## Зависимости

- `AvatarIcon` — компонент иконки аватара
- `useTheme` — хук для работы с CSS переменными

## Storybook

Запуск: `npm run storybook`