import type { Meta, StoryObj } from '@storybook/vue3';
import UserAvatar from '../UserAvatar.vue';
import BaseContainer from '../../../containers/BaseContainer.vue';

// Создаем декоратор для темы, который использует BaseContainer
const withBaseContainer = (theme: string, cssVariables: Record<string, string>) => {
  return (story: any) => ({
    components: { story, BaseContainer },
    template: `
      <BaseContainer id="storybook-container" :initial-theme="theme" :style="cssVars">
        <story />
      </BaseContainer>
    `,
    setup() {
      return { theme, cssVars: cssVariables };
    }
  });
};

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
  decorators: [
    withBaseContainer('light', {})
  ],
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
  decorators: [
    withBaseContainer('light', {})
  ],
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
    withBaseContainer('starwars', {
      '--thepro-useravatar-icon-type': 'starwars',
      '--thepro-useravatar-icon-color': '#ffd700',
      '--thepro-useravatar-size': '140px',
      '--thepro-useravatar-border': '#ffd700',
      '--thepro-useravatar-shadow': '0 0 20px rgba(255, 215, 0, 0.4)'
    })
  ],
  render: () => ({
    components: { UserAvatar },
    template: `
      <div>
        <UserAvatar />
        <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
          <strong>Debug StarWars Icon:</strong><br>
          --thepro-useravatar-icon-type: starwars<br>
          --thepro-useravatar-icon-color: #ffd700<br>
          --thepro-useravatar-size: 140px<br>
          --thepro-useravatar-border: #ffd700<br>
          --thepro-useravatar-shadow: 0 0 20px rgba(255, 215, 0, 0.4)
        </div>
      </div>
    `
  }),
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
    withBaseContainer('starwars', {
      '--thepro-useravatar-icon-type': 'starwars',
      '--thepro-useravatar-icon-color': '#ff6b35',
      '--thepro-useravatar-size': '140px',
      '--thepro-useravatar-border': '#ff6b35',
      '--thepro-useravatar-shadow': '0 0 20px rgba(255, 107, 53, 0.6)'
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
  decorators: [
    withBaseContainer('light', {})
  ],
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
  decorators: [
    withBaseContainer('light', {})
  ],
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
    components: { UserAvatar, BaseContainer },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <BaseContainer id="storybook-size-1" initial-theme="light" style="--thepro-useravatar-size: 80px;">
          <UserAvatar />
        </BaseContainer>
        <BaseContainer id="storybook-size-2" initial-theme="light" style="--thepro-useravatar-size: 120px;">
          <UserAvatar />
        </BaseContainer>
        <BaseContainer id="storybook-size-3" initial-theme="light" style="--thepro-useravatar-size: 160px;">
          <UserAvatar />
        </BaseContainer>
      </div>
      <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        <strong>Debug Different Sizes:</strong><br>
        Size 1: 80px<br>
        Size 2: 120px<br>
        Size 3: 160px
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
    components: { UserAvatar, BaseContainer },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <BaseContainer id="storybook-icon-1" initial-theme="light" style="--thepro-useravatar-icon-type: default; --thepro-useravatar-size: 100px;">
          <UserAvatar />
        </BaseContainer>
        <BaseContainer id="storybook-icon-2" initial-theme="starwars" style="--thepro-useravatar-icon-type: starwars; --thepro-useravatar-size: 100px; --thepro-useravatar-icon-color: #ffd700;">
          <UserAvatar />
        </BaseContainer>
        <BaseContainer id="storybook-icon-3" initial-theme="light" style="--thepro-useravatar-icon-type: user; --thepro-useravatar-size: 100px; --thepro-useravatar-icon-color: #3498db;">
          <UserAvatar />
        </BaseContainer>
        <BaseContainer id="storybook-icon-4" initial-theme="light" style="--thepro-useravatar-icon-type: admin; --thepro-useravatar-size: 100px; --thepro-useravatar-icon-color: #e74c3c;">
          <UserAvatar />
        </BaseContainer>
        <BaseContainer id="storybook-icon-5" initial-theme="light" style="--thepro-useravatar-icon-type: guest; --thepro-useravatar-size: 100px; --thepro-useravatar-icon-color: #27ae60;">
          <UserAvatar />
        </BaseContainer>
      </div>
      <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        <strong>Debug Different Icon Types:</strong><br>
        Icon 1: default (100px)<br>
        Icon 2: starwars (100px) - gold<br>
        Icon 3: user (100px) - blue<br>
        Icon 4: admin (100px) - red<br>
        Icon 5: guest (100px) - green
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
