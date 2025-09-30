# CardFooter

Компонент подвала карточки с анимированной полоской и поддержкой тем.

## Реализовать

**Цель:** Создать элемент-компонент для подвала карточки.

**Структура:**
- Контейнер с классом `card-footer`
- Отображение текста статуса/информации
- Анимированная полоска при наведении
- Поддержка CSS переменных для темизации

**Требования:**
- Поддержка всех тем (light, dark, green, starwars)
- TypeScript типизация
- CSS переменные для кастомизации
- Анимация полоски при hover
- Адаптивные отступы и размеры шрифта
- Обработка пустого текста

**Props:**
```typescript
interface Props {
  text?: string  // Текст подвала (по умолчанию: 'Подвал карточки')
}
```

## Использование

```vue
<CardFooter text="Статус: Активен" />
```

## CSS переменные

```scss
--thepro-cardfooter-bg: var(--thepro-card-bg);
--thepro-cardfooter-text: var(--thepro-card-text);
--thepro-cardfooter-border: var(--thepro-card-border);
--thepro-cardfooter-padding: 1rem;
--thepro-cardfooter-padding-mobile: 0.75rem;
--thepro-cardfooter-padding-small: 0.5rem;
--thepro-cardfooter-font-size: 0.875rem;
--thepro-cardfooter-font-size-small: 0.75rem;
--thepro-cardfooter-text-align: center;
--thepro-cardfooter-stripe-height: 2px;
--thepro-cardfooter-stripe-color: var(--thepro-primary);
--thepro-cardfooter-stripe-transform: scaleX(0);
--thepro-cardfooter-stripe-transform-hover: scaleX(1);
--thepro-cardfooter-stripe-transition: transform 0.3s ease;
```

## Storybook

Запуск: `npm run storybook`
