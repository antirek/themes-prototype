# CardHeader

Компонент заголовка карточки с поддержкой тем и кастомизации.

## Реализовать

**Цель:** Создать элемент-компонент для заголовка карточки.

**Структура:**
- Контейнер с классом `card-header`
- Отображение текста заголовка
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
  text?: string  // Текст заголовка (по умолчанию: 'Заголовок карточки')
}
```

## Использование

```vue
<CardHeader text="Мой заголовок" />
```

## CSS переменные

```scss
--thepro-cardheader-bg: var(--thepro-card-bg);
--thepro-cardheader-text: var(--thepro-card-text);
--thepro-cardheader-border: var(--thepro-card-border);
--thepro-cardheader-overlay: rgba(0, 0, 0, 0.1);
--thepro-cardheader-font-size: 1.25rem;
--thepro-cardheader-font-weight: 600;
--thepro-cardheader-text-align: left;
```

## Storybook

Запуск: `npm run storybook`
