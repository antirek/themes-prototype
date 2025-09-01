# Storybook Guide

## Обзор

Storybook - это инструмент для разработки и документирования компонентов в изоляции. В нашем проекте он используется для:

- Демонстрации компонентов в различных состояниях
- Тестирования компонентов
- Документирования API компонентов
- Создания интерактивных примеров

## Установка и запуск

### Запуск Storybook

```bash
npm run storybook
```

Storybook будет доступен по адресу: http://localhost:6006

### Сборка Storybook

```bash
npm run build-storybook
```

## Структура историй

Истории компонентов находятся в директории `src/components/{ComponentName}/stories/`:

```
src/components/CardHeader/stories/
├── CardHeader.stories.ts          # Основные истории
├── CardHeaderThemes.stories.ts    # Истории с темами
├── CardHeaderVariants.stories.ts  # Различные варианты
├── CardHeaderInContext.stories.ts # В контексте
└── index.ts                       # Экспорт историй
```

## Создание историй

### Базовая структура истории

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import ComponentName from '../ComponentName.vue';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Описание компонента'
      }
    }
  },
  argTypes: {
    // Описание пропсов
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Значения пропсов
  }
};
```

### Типы историй

1. **Основные истории** - базовые варианты использования
2. **Истории с темами** - демонстрация различных тем
3. **Варианты** - различные состояния и модификации
4. **В контексте** - компонент в реальном окружении

### Декораторы

Декораторы позволяют обернуть компонент в дополнительный контекст:

```typescript
export const StoryWithDecorator: Story = {
  args: { /* ... */ },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="background: #f0f0f0; padding: 20px;">
          <story />
        </div>
      `
    })
  ]
};
```

## Особенности проекта

### Поддержка тем

Наш проект использует систему CSS переменных для тем. В историях можно демонстрировать различные темы:

```typescript
export const DarkTheme: Story = {
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-cardheader-bg: #1a1a1a;
          --thepro-cardheader-text: #ffffff;
        ">
          <story />
        </div>
      `
    })
  ]
};
```

### CSS переменные

Основные CSS переменные для компонентов:

- `--thepro-{component}-bg` - фон
- `--thepro-{component}-text` - цвет текста
- `--thepro-{component}-border` - цвет границы
- `--thepro-{component}-font-size` - размер шрифта
- `--thepro-{component}-font-weight` - жирность шрифта
- `--thepro-{component}-text-align` - выравнивание текста

## Аддоны

### @storybook/addon-a11y

Проверяет доступность компонентов:

```typescript
parameters: {
  a11y: {
    test: 'todo', // или 'error', 'off'
    options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    }
  }
}
```

### @storybook/addon-vitest

Позволяет запускать тесты прямо в Storybook:

```bash
npx vitest --project=storybook
```

## Лучшие практики

1. **Именование историй** - используйте описательные имена
2. **Документация** - добавляйте описания для компонентов и историй
3. **Тестирование** - создавайте истории для различных состояний
4. **Доступность** - проверяйте a11y для всех историй
5. **Контекст** - показывайте компоненты в реальном окружении

## Полезные ссылки

- [Storybook Documentation](https://storybook.js.org/)
- [Vue 3 + Storybook](https://storybook.js.org/docs/guides/guide-vue/)
- [Addon A11y](https://storybook.js.org/addons/@storybook/addon-a11y/)
- [Addon Vitest](https://storybook.js.org/addons/@storybook/addon-vitest/)
