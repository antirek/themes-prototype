import type { Meta, StoryObj } from '@storybook/vue3';
import CardHeader from '../CardHeader.vue';

const meta: Meta<typeof CardHeader> = {
  title: 'Components/CardHeader',
  component: CardHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент заголовка карточки с поддержкой тем и кастомизации.'
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст заголовка карточки',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Заголовок карточки' }
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Основная история с дефолтными значениями
export const Default: Story = {
  args: {
    text: 'Заголовок карточки'
  }
};

// История с кастомным текстом
export const CustomText: Story = {
  args: {
    text: 'Мой кастомный заголовок'
  }
};

// История с длинным текстом
export const LongText: Story = {
  args: {
    text: 'Очень длинный заголовок карточки, который может занимать несколько строк и демонстрирует, как компонент обрабатывает длинный контент'
  }
};

// История с коротким текстом
export const ShortText: Story = {
  args: {
    text: 'Кратко'
  }
};

// История с пустым текстом
export const EmptyText: Story = {
  args: {
    text: ''
  }
};

// История с HTML-символами
export const HtmlText: Story = {
  args: {
    text: 'Заголовок с & < > символами'
  }
};
