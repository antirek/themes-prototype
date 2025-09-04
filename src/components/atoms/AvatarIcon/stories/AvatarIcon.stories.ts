import type { Meta, StoryObj } from '@storybook/vue3';
import AvatarIcon from '../AvatarIcon.vue';
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

const meta: Meta<typeof AvatarIcon> = {
  title: 'Components/Atoms/AvatarIcon',
  component: AvatarIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Базовый компонент иконки аватара с поддержкой различных типов иконок и кастомизации через CSS переменные.'
      }
    }
  },
  argTypes: {
    iconType: {
      control: 'select',
      options: ['default', 'starwars', 'user', 'admin', 'guest'],
      description: 'Тип иконки для отображения'
    },
    color: {
      control: 'color',
      description: 'Цвет иконки'
    },
    size: {
      control: 'text',
      description: 'Размер иконки'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Основная история с дефолтной иконкой
export const Default: Story = {
  args: {
    iconType: 'default',
    color: '#3498db',
    size: '48px'
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'AvatarIcon с дефолтной иконкой пользователя.'
      }
    }
  }
};

// История с Star Wars иконкой
export const StarWars: Story = {
  args: {
    iconType: 'starwars',
    color: '#ffd700',
    size: '64px'
  },
  decorators: [
    withBaseContainer('starwars', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'AvatarIcon с Star Wars иконкой (шлем Дарта Вейдера).'
      }
    }
  }
};

// История с иконкой пользователя
export const User: Story = {
  args: {
    iconType: 'user',
    color: '#27ae60',
    size: '56px'
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'AvatarIcon с иконкой обычного пользователя.'
      }
    }
  }
};

// История с иконкой администратора
export const Admin: Story = {
  args: {
    iconType: 'admin',
    color: '#e74c3c',
    size: '56px'
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'AvatarIcon с иконкой администратора.'
      }
    }
  }
};

// История с иконкой гостя
export const Guest: Story = {
  args: {
    iconType: 'guest',
    color: '#9b59b6',
    size: '56px'
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'AvatarIcon с иконкой гостя.'
      }
    }
  }
};

// История с разными размерами
export const DifferentSizes: Story = {
  render: () => ({
    components: { AvatarIcon, BaseContainer },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <BaseContainer id="storybook-size-1" initial-theme="light">
          <AvatarIcon icon-type="default" color="#3498db" size="32px" />
        </BaseContainer>
        <BaseContainer id="storybook-size-2" initial-theme="light">
          <AvatarIcon icon-type="default" color="#3498db" size="48px" />
        </BaseContainer>
        <BaseContainer id="storybook-size-3" initial-theme="light">
          <AvatarIcon icon-type="default" color="#3498db" size="64px" />
        </BaseContainer>
        <BaseContainer id="storybook-size-4" initial-theme="light">
          <AvatarIcon icon-type="default" color="#3498db" size="80px" />
        </BaseContainer>
      </div>
      <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        <strong>Debug Different Sizes:</strong><br>
        Size 1: 32px<br>
        Size 2: 48px<br>
        Size 3: 64px<br>
        Size 4: 80px
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'AvatarIcon с разными размерами: 32px, 48px, 64px, 80px.'
      }
    }
  }
};

// История с разными цветами
export const DifferentColors: Story = {
  render: () => ({
    components: { AvatarIcon, BaseContainer },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <BaseContainer id="storybook-color-1" initial-theme="light">
          <AvatarIcon icon-type="user" color="#3498db" size="56px" />
        </BaseContainer>
        <BaseContainer id="storybook-color-2" initial-theme="light">
          <AvatarIcon icon-type="user" color="#e74c3c" size="56px" />
        </BaseContainer>
        <BaseContainer id="storybook-color-3" initial-theme="light">
          <AvatarIcon icon-type="user" color="#27ae60" size="56px" />
        </BaseContainer>
        <BaseContainer id="storybook-color-4" initial-theme="light">
          <AvatarIcon icon-type="user" color="#f39c12" size="56px" />
        </BaseContainer>
        <BaseContainer id="storybook-color-5" initial-theme="light">
          <AvatarIcon icon-type="user" color="#9b59b6" size="56px" />
        </BaseContainer>
      </div>
      <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        <strong>Debug Different Colors:</strong><br>
        Color 1: #3498db (blue)<br>
        Color 2: #e74c3c (red)<br>
        Color 3: #27ae60 (green)<br>
        Color 4: #f39c12 (orange)<br>
        Color 5: #9b59b6 (purple)
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'AvatarIcon с разными цветами для демонстрации кастомизации.'
      }
    }
  }
};

// История с разными типами иконок
export const AllIconTypes: Story = {
  render: () => ({
    components: { AvatarIcon, BaseContainer },
    template: `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <BaseContainer id="storybook-icon-1" initial-theme="light">
          <div style="text-align: center;">
            <AvatarIcon icon-type="default" color="#3498db" size="64px" />
            <div style="margin-top: 8px; font-size: 12px; font-weight: bold;">Default</div>
          </div>
        </BaseContainer>
        <BaseContainer id="storybook-icon-2" initial-theme="starwars">
          <div style="text-align: center;">
            <AvatarIcon icon-type="starwars" color="#ffd700" size="64px" />
            <div style="margin-top: 8px; font-size: 12px; font-weight: bold;">Star Wars</div>
          </div>
        </BaseContainer>
        <BaseContainer id="storybook-icon-3" initial-theme="light">
          <div style="text-align: center;">
            <AvatarIcon icon-type="user" color="#27ae60" size="64px" />
            <div style="margin-top: 8px; font-size: 12px; font-weight: bold;">User</div>
          </div>
        </BaseContainer>
        <BaseContainer id="storybook-icon-4" initial-theme="light">
          <div style="text-align: center;">
            <AvatarIcon icon-type="admin" color="#e74c3c" size="64px" />
            <div style="margin-top: 8px; font-size: 12px; font-weight: bold;">Admin</div>
          </div>
        </BaseContainer>
        <BaseContainer id="storybook-icon-5" initial-theme="light">
          <div style="text-align: center;">
            <AvatarIcon icon-type="guest" color="#9b59b6" size="64px" />
            <div style="margin-top: 8px; font-size: 12px; font-weight: bold;">Guest</div>
          </div>
        </BaseContainer>
      </div>
      <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        <strong>Debug All Icon Types:</strong><br>
        All icons are 64px with their respective theme colors
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные типы иконок AvatarIcon: default, starwars, user, admin, guest.'
      }
    }
  }
};

// История с кастомными эффектами
export const CustomEffects: Story = {
  args: {
    iconType: 'starwars',
    color: '#ff6b35',
    size: '80px'
  },
  decorators: [
    withBaseContainer('starwars', {
      '--thepro-avataricon-shadow': '0 0 20px rgba(255, 107, 53, 0.6)',
      '--thepro-avataricon-border': '2px solid #ff6b35',
      '--thepro-avataricon-border-radius': '50%'
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'AvatarIcon с кастомными эффектами: тень, граница и скругление.'
      }
    }
  }
};
