# UserProfileCard

Составной компонент карточки профиля пользователя с аватаром, информацией и поддержкой темизации.

## Реализовать

**Цель:** Создать блок-компонент для отображения профиля пользователя.

**Структура:**
- Заголовок с именем (`CardHeader`)
- Аватар с fallback на иконку (`UserAvatar`) 
- Информация: имя, телефон, описание
- Статус в подвале (`CardFooter`)

**Требования:**
- Поддержка всех тем (light, dark, green, starwars)
- Адаптивность (мобильные/десктоп размеры)
- TypeScript типизация
- CSS переменные для кастомизации
- Обработка отсутствующего аватара

**Props:**
```typescript
interface UserData {
  name: string        // Имя пользователя
  phone: string       // Номер телефона  
  description: string // Описание/должность
  avatar: string      // URL аватара (может быть пустым)
  status: string      // Статус пользователя
}
```

## Использование

```vue
<UserProfileCard :user-data="userData" />
```

## CSS переменные

```scss
--thepro-userprofilecard-avatar-size: 100px;
--thepro-userprofilecard-avatar-size-mobile: 80px;
--thepro-userprofilecard-body-padding: 1.5rem;
--thepro-userprofilecard-content-gap: 1rem;
```

## Storybook

Запуск: `npm run storybook`
