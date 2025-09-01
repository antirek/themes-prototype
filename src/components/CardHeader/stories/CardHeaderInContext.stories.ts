import type { Meta, StoryObj } from '@storybook/vue3';
import CardHeader from '../CardHeader.vue';

const meta: Meta<typeof CardHeader> = {
  title: 'Components/CardHeader/In Context',
  component: CardHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'CardHeader в контексте полной карточки для демонстрации реального использования.'
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

// История с простой карточкой
export const SimpleCard: Story = {
  args: {
    text: 'Простая карточка'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          width: 300px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        ">
          <story />
          <div style="padding: 16px; background: white;">
            <p style="margin: 0; color: #4a5568;">
              Содержимое карточки с каким-то текстом для демонстрации.
            </p>
          </div>
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в составе простой карточки с содержимым.'
      }
    }
  }
};

// История с карточкой в темной теме
export const DarkCard: Story = {
  args: {
    text: 'Темная карточка'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          width: 300px;
          border: 1px solid #2d3748;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          background: #1a202c;
        ">
          <story />
          <div style="padding: 16px; background: #2d3748;">
            <p style="margin: 0; color: #e2e8f0;">
              Содержимое темной карточки с соответствующим стилем.
            </p>
          </div>
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в составе темной карточки.'
      }
    }
  }
};

// История с карточкой в зеленой теме
export const GreenCard: Story = {
  args: {
    text: 'Зеленая карточка'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          width: 300px;
          border: 1px solid #68d391;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(104, 211, 145, 0.2);
          background: #f0fff4;
        ">
          <story />
          <div style="padding: 16px; background: white;">
            <p style="margin: 0; color: #2f855a;">
              Содержимое зеленой карточки с природными мотивами.
            </p>
          </div>
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в составе зеленой карточки.'
      }
    }
  }
};

// История с карточкой в Star Wars теме
export const StarWarsCard: Story = {
  args: {
    text: 'Star Wars карточка'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          width: 300px;
          border: 2px solid #ffd700;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
          background: #000;
        ">
          <story />
          <div style="padding: 16px; background: #1a1a1a;">
            <p style="margin: 0; color: #ffd700; font-family: 'Courier New', monospace;">
              May the Force be with you, young padawan.
            </p>
          </div>
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в составе Star Wars карточки.'
      }
    }
  }
};

// История с карточкой с изображением
export const CardWithImage: Story = {
  args: {
    text: 'Карточка с изображением'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          width: 300px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ">
          <story />
          <div style="
            height: 150px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
          ">
            🖼️ Изображение
          </div>
          <div style="padding: 16px; background: white;">
            <p style="margin: 0; color: #4a5568;">
              Карточка с заголовком, изображением и описанием.
            </p>
          </div>
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в составе карточки с изображением.'
      }
    }
  }
};

// История с карточкой с действиями
export const CardWithActions: Story = {
  args: {
    text: 'Карточка с действиями'
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          width: 300px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ">
          <story />
          <div style="padding: 16px; background: white;">
            <p style="margin: 0 0 16px 0; color: #4a5568;">
              Карточка с заголовком, содержимым и кнопками действий.
            </p>
            <div style="display: flex; gap: 8px;">
              <button style="
                padding: 8px 16px;
                background: #3182ce;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              ">Действие 1</button>
              <button style="
                padding: 8px 16px;
                background: #e2e8f0;
                color: #4a5568;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              ">Действие 2</button>
            </div>
          </div>
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'CardHeader в составе карточки с кнопками действий.'
      }
    }
  }
};
