import type { Meta, StoryObj } from '@storybook/vue3';
import UserAvatar from '../UserAvatar.vue';

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
          --thepro-useravatar-icon-type: starwars;
          --thepro-useravatar-icon-color: #ffd700;
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
          --thepro-useravatar-icon-type: starwars;
          --thepro-useravatar-icon-color: #ff6b35;
          --thepro-useravatar-border: #ff6b35;
          --thepro-useravatar-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
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

// История с разными размерами
export const DifferentSizes: Story = {
  render: () => ({
    components: { UserAvatar },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <div style="--thepro-useravatar-size: 80px;">
          <UserAvatar />
        </div>
        <div style="--thepro-useravatar-size: 120px;">
          <UserAvatar />
        </div>
        <div style="--thepro-useravatar-size: 160px;">
          <UserAvatar />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar с разными размерами через CSS переменные.'
      }
    }
  }
};

// История с разными типами иконок
export const DifferentIconTypes: Story = {
  render: () => ({
    components: { UserAvatar },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <div style="--thepro-useravatar-icon-type: default; --thepro-useravatar-size: 100px;">
          <UserAvatar />
        </div>
        <div style="--thepro-useravatar-icon-type: starwars; --thepro-useravatar-size: 100px; --thepro-useravatar-icon-color: #ffd700;">
          <UserAvatar />
        </div>
        <div style="--thepro-useravatar-icon-type: user; --thepro-useravatar-size: 100px; --thepro-useravatar-icon-color: #3498db;">
          <UserAvatar />
        </div>
        <div style="--thepro-useravatar-icon-type: admin; --thepro-useravatar-size: 100px; --thepro-useravatar-icon-color: #e74c3c;">
          <UserAvatar />
        </div>
        <div style="--thepro-useravatar-icon-type: guest; --thepro-useravatar-size: 100px; --thepro-useravatar-icon-color: #27ae60;">
          <UserAvatar />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar с разными типами иконок: default, starwars, user, admin, guest.'
      }
    }
  }
};
