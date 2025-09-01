import type { Meta, StoryObj } from '@storybook/vue3';
import CardHeader from '../CardHeader.vue';

const meta: Meta<typeof CardHeader> = {
  title: 'Components/CardHeader/Variants',
  component: CardHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Различные варианты и состояния компонента CardHeader.'
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

// История с большим размером шрифта
export const LargeFont: Story = {
  args: {
    text: 'Большой заголовок'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-cardheader-font-size: 2rem;
          --thepro-cardheader-font-weight: 800;
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader с увеличенным размером шрифта.'
      }
    }
  }
};

// История с маленьким размером шрифта
export const SmallFont: Story = {
  args: {
    text: 'Маленький заголовок'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-cardheader-font-size: 0.875rem;
          --thepro-cardheader-font-weight: 400;
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader с уменьшенным размером шрифта.'
      }
    }
  }
};

// История с выравниванием по центру
export const CenterAligned: Story = {
  args: {
    text: 'По центру'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
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
        story: 'CardHeader с выравниванием текста по центру.'
      }
    }
  }
};

// История с выравниванием по правому краю
export const RightAligned: Story = {
  args: {
    text: 'По правому краю'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-cardheader-text-align: right;
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader с выравниванием текста по правому краю.'
      }
    }
  }
};

// История с жирным шрифтом
export const BoldFont: Story = {
  args: {
    text: 'Жирный заголовок'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-cardheader-font-weight: 900;
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader с максимально жирным шрифтом.'
      }
    }
  }
};

// История с тонким шрифтом
export const ThinFont: Story = {
  args: {
    text: 'Тонкий заголовок'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-cardheader-font-weight: 300;
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader с тонким шрифтом.'
      }
    }
  }
};

// История с кастомным градиентом
export const CustomGradient: Story = {
  args: {
    text: 'Кастомный градиент'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-cardheader-bg: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
          --thepro-cardheader-text: #ffffff;
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader с кастомным многоцветным градиентом.'
      }
    }
  }
};
