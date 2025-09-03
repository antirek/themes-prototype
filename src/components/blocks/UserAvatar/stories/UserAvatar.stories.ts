import type { Meta, StoryObj } from '@storybook/vue3';
import UserAvatar from '../UserAvatar.vue';
import { AVATAR_ICON_TYPES } from '../constants';

const meta: Meta<typeof UserAvatar> = {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент аватара пользователя с поддержкой темизированных иконок через CSS переменные.'
      }
    }
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL изображения аватара'
    },
    alt: {
      control: 'text',
      description: 'Альтернативный текст для изображения'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Основная история с дефолтной иконкой
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar с дефолтной иконкой (когда нет изображения).'
      }
    }
  }
};

// История с изображением
export const WithImage: Story = {
  args: {
    src: 'https://via.placeholder.com/150x150/667eea/ffffff?text=Avatar',
    alt: 'User avatar'
  },
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar с загруженным изображением.'
      }
    }
  }
};

// История с Star Wars иконкой
export const StarWarsIcon: Story = {
  args: {},
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-useravatar-icon-type: ${AVATAR_ICON_TYPES.STAR_WARS};
          --thepro-useravatar-icon-effects: drop-shadow(0 0 4px rgba(255, 215, 0, 0.3));
          --thepro-useravatar-icon-effects-hover: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar с Star Wars иконкой (шлем Дарта Вейдера) через CSS переменную.'
      }
    }
  }
};

// История с кастомными эффектами
export const CustomEffects: Story = {
  args: {},
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="
          --thepro-useravatar-icon-type: ${AVATAR_ICON_TYPES.STAR_WARS};
          --thepro-useravatar-icon-effects: drop-shadow(0 0 8px rgba(255, 0, 255, 0.6));
          --thepro-useravatar-icon-effects-hover: drop-shadow(0 0 12px rgba(255, 0, 255, 0.8));
        ">
          <story />
        </div>
      `
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar с кастомными эффектами для Star Wars иконки.'
      }
    }
  }
};

// История с ошибкой загрузки изображения
export const ImageError: Story = {
  args: {
    src: 'invalid-url'
  },
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar с ошибкой загрузки изображения - показывает дефолтную иконку.'
      }
    }
  }
};

// История с длинным alt текстом
export const LongAltText: Story = {
  args: {
    src: 'https://via.placeholder.com/150x150/4ecdc4/ffffff?text=User',
    alt: 'Очень длинный альтернативный текст для изображения аватара пользователя, который может содержать дополнительную информацию'
  },
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar с длинным alt текстом для демонстрации доступности.'
      }
    }
  }
};
