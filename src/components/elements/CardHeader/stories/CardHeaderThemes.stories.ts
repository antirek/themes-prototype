import type { Meta, StoryObj } from '@storybook/vue3';
import CardHeader from '../CardHeader.vue';

const meta: Meta<typeof CardHeader> = {
  title: 'Components/CardHeader/Themes',
  component: CardHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Демонстрация различных тем для компонента CardHeader.'
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст заголовка карточки'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// История с темой по умолчанию (light)
export const LightTheme: Story = {
  args: {
    text: 'Светлая тема'
  },
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в светлой теме по умолчанию.'
      }
    }
  }
};

// История с темной темой
export const DarkTheme: Story = {
  args: {
    text: 'Темная тема'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="background: #1a1a1a; padding: 20px; border-radius: 8px;">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в темной теме.'
      }
    }
  }
};

// История с зеленой темой
export const GreenTheme: Story = {
  args: {
    text: 'Зеленая тема'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="background: #f0f9f0; padding: 20px; border-radius: 8px;">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в зеленой теме.'
      }
    }
  }
};

// История с Star Wars темой
export const StarWarsTheme: Story = {
  args: {
    text: 'Star Wars тема'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="background: #000; padding: 20px; border-radius: 8px;">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в Star Wars теме.'
      }
    }
  }
};

// История с кастомными CSS переменными
export const CustomCSSVariables: Story = {
  args: {
    text: 'Кастомные CSS переменные'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-cardheader-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --thepro-cardheader-text: #ffffff;
          --thepro-cardheader-border: #4a5568;
          --thepro-cardheader-overlay: rgba(0, 0, 0, 0.1);
          --thepro-cardheader-font-size: 1.5rem;
          --thepro-cardheader-font-weight: 700;
          --thepro-cardheader-text-align: center;
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader с кастомными CSS переменными для демонстрации гибкости темизации.'
      }
    }
  }
};
