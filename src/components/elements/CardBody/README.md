# CardBody

Компонент тела карточки для отображения основного содержимого.

## Реализовать

**Цель:** Создать элемент-компонент для тела карточки.

**Структура:**
- Контейнер с классом `card-body`
- Отображение текстового содержимого
- Поддержка CSS переменных для темизации

**Требования:**
- Поддержка всех тем (light, dark, green, starwars)
- TypeScript типизация
- CSS переменные для кастомизации
- Обработка пустого текста
- Экранирование HTML символов

**Props:**
```typescript
interface Props {
  text?: string  // Текст содержимого (по умолчанию: 'Содержимое карточки')
}
```

## Использование

```vue
<CardBody text="Основное содержимое карточки" />
```

## CSS переменные

```scss
--thepro-cardbody-bg: var(--thepro-card-bg);
--thepro-cardbody-text: var(--thepro-card-text);
--thepro-cardbody-overlay: rgba(0, 0, 0, 0.05);
--thepro-cardbody-font-family: var(--thepro-font-family);
--thepro-cardbody-text-align: left;
```

## Storybook

Запуск: `npm run storybook`
