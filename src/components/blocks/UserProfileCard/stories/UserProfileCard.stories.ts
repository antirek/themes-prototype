import type { Meta, StoryObj } from '@storybook/vue3';
import UserProfileCard from '../UserProfileCard.vue';
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

const meta: Meta<typeof UserProfileCard> = {
  title: 'Components/Blocks/UserProfileCard',
  component: UserProfileCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Составной компонент карточки профиля пользователя с аватаром, информацией и поддержкой темизации.'
      }
    }
  },
  argTypes: {
    userData: {
      control: 'object',
      description: 'Данные пользователя'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Основная история с полной информацией
export const Default: Story = {
  args: {
    userData: {
      name: 'Иван Иванов',
      phone: '+7 (999) 123-45-67',
      description: 'Frontend разработчик с опытом работы с Vue.js и TypeScript',
      avatar: 'https://via.placeholder.com/150x150/667eea/ffffff?text=II',
      status: 'Активен'
    }
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard с полной информацией о пользователе.'
      }
    }
  }
};

// История с минимальной информацией
export const Minimal: Story = {
  args: {
    userData: {
      name: 'Анна Петрова',
      phone: '+7 (999) 987-65-43',
      description: '',
      avatar: '',
      status: 'Офлайн'
    }
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard с минимальной информацией (только имя и телефон).'
      }
    }
  }
};

// История с длинным именем
export const LongName: Story = {
  args: {
    userData: {
      name: 'Александр Максимович Петров-Сидоров',
      phone: '+7 (999) 555-44-33',
      description: 'Старший разработчик с многолетним опытом',
      avatar: '',
      status: 'В работе'
    }
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard с длинным именем для демонстрации переноса текста.'
      }
    }
  }
};

// История с длинным описанием
export const LongDescription: Story = {
  args: {
    userData: {
      name: 'Мария Сидорова',
      phone: '+7 (999) 111-22-33',
      description: 'Опытный UI/UX дизайнер с более чем 5-летним стажем работы в крупных IT-компаниях. Специализируется на создании интуитивных пользовательских интерфейсов для веб-приложений и мобильных платформ.',
      avatar: '',
      status: 'Доступна'
    }
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard с длинным описанием для демонстрации адаптивности.'
      }
    }
  }
};

// История без аватара
export const WithoutAvatar: Story = {
  args: {
    userData: {
      name: 'Дмитрий Козлов',
      phone: '+7 (999) 444-55-66',
      description: 'Backend разработчик',
      avatar: '',
      status: 'Занят'
    }
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard без аватара - показывает дефолтную иконку.'
      }
    }
  }
};

// История с ошибкой загрузки аватара
export const AvatarError: Story = {
  args: {
    userData: {
      name: 'Елена Волкова',
      phone: '+7 (999) 777-88-99',
      description: 'QA инженер',
      avatar: 'invalid-url',
      status: 'Тестирует'
    }
  },
  decorators: [
    withBaseContainer('light', {})
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard с ошибкой загрузки аватара - показывает дефолтную иконку.'
      }
    }
  }
};

// История в темной теме
export const DarkTheme: Story = {
  args: {
    userData: {
      name: 'Андрей Морозов',
      phone: '+7 (999) 333-22-11',
      description: 'DevOps инженер',
      avatar: '',
      status: 'Развертывает'
    }
  },
  decorators: [
    withBaseContainer('dark', {
      '--thepro-useravatar-icon-type': 'admin',
      '--thepro-useravatar-icon-color': '#8b5cf6',
      '--thepro-useravatar-size': '120px'
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard в темной теме.'
      }
    }
  }
};

// История в зеленой теме
export const GreenTheme: Story = {
  args: {
    userData: {
      name: 'Ольга Лебедева',
      phone: '+7 (999) 666-77-88',
      description: 'Экологический дизайнер',
      avatar: '',
      status: 'Эко-проект'
    }
  },
  decorators: [
    withBaseContainer('green', {
      '--thepro-useravatar-icon-type': 'user',
      '--thepro-useravatar-icon-color': '#10b981',
      '--thepro-useravatar-size': '120px'
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard в зеленой теме.'
      }
    }
  }
};

// История в Star Wars теме
export const StarWarsTheme: Story = {
  args: {
    userData: {
      name: 'Дарт Вейдер',
      phone: '+7 (999) 000-00-01',
      description: 'Sith Lord',
      avatar: '',
      status: 'Темная сторона'
    }
  },
  decorators: [
    withBaseContainer('starwars', {
      '--thepro-useravatar-icon-type': 'starwars',
      '--thepro-useravatar-icon-color': '#ffd700',
      '--thepro-useravatar-size': '120px'
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard в Star Wars теме.'
      }
    }
  }
};

// История с кастомными размерами аватара
export const CustomAvatarSize: Story = {
  args: {
    userData: {
      name: 'Николай Соколов',
      phone: '+7 (999) 999-99-99',
      description: 'Архитектор решений',
      avatar: '',
      status: 'Проектирует'
    }
  },
  decorators: [
    withBaseContainer('light', {
      '--thepro-userprofilecard-avatar-size': '120px',
      '--thepro-userprofilecard-avatar-size-mobile': '100px'
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard с кастомным размером аватара.'
      }
    }
  }
};

// История с кастомными отступами
export const CustomPadding: Story = {
  args: {
    userData: {
      name: 'Татьяна Новикова',
      phone: '+7 (999) 888-77-66',
      description: 'Менеджер проектов',
      avatar: '',
      status: 'Управляет'
    }
  },
  decorators: [
    withBaseContainer('light', {
      '--thepro-userprofilecard-body-padding': '2rem',
      '--thepro-userprofilecard-content-gap': '1.5rem'
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard с кастомными отступами.'
      }
    }
  }
};

// История с разными темами (сравнение)
export const ThemeComparison: Story = {
  render: () => ({
    components: { UserProfileCard, BaseContainer },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        <BaseContainer id="storybook-theme-1" initial-theme="light" style="--thepro-useravatar-icon-type: default; --thepro-useravatar-icon-color: #3b82f6; --thepro-useravatar-size: 100px;">
          <UserProfileCard 
            :user-data="{
              name: 'Светлая тема',
              phone: '+7 (999) 111-11-11',
              description: 'Классическая светлая тема',
              avatar: '',
              status: 'Активна'
            }"
          />
        </BaseContainer>
        <BaseContainer id="storybook-theme-2" initial-theme="dark" style="--thepro-useravatar-icon-type: admin; --thepro-useravatar-icon-color: #8b5cf6; --thepro-useravatar-size: 100px;">
          <UserProfileCard 
            :user-data="{
              name: 'Темная тема',
              phone: '+7 (999) 222-22-22',
              description: 'Современная темная тема',
              avatar: '',
              status: 'Активна'
            }"
          />
        </BaseContainer>
        <BaseContainer id="storybook-theme-3" initial-theme="green" style="--thepro-useravatar-icon-type: user; --thepro-useravatar-icon-color: #10b981; --thepro-useravatar-size: 100px;">
          <UserProfileCard 
            :user-data="{
              name: 'Зеленая тема',
              phone: '+7 (999) 333-33-33',
              description: 'Природная зеленая тема',
              avatar: '',
              status: 'Активна'
            }"
          />
        </BaseContainer>
        <BaseContainer id="storybook-theme-4" initial-theme="starwars" style="--thepro-useravatar-icon-type: starwars; --thepro-useravatar-icon-color: #ffd700; --thepro-useravatar-size: 100px;">
          <UserProfileCard 
            :user-data="{
              name: 'Star Wars',
              phone: '+7 (999) 444-44-44',
              description: 'Космическая тема',
              avatar: '',
              status: 'Активна'
            }"
          />
        </BaseContainer>
      </div>
      <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        <strong>Debug Theme Comparison:</strong><br>
        Все карточки используют одинаковые данные, но разные темы
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Сравнение UserProfileCard во всех доступных темах.'
      }
    }
  }
};

// История с разными размерами
export const DifferentSizes: Story = {
  render: () => ({
    components: { UserProfileCard, BaseContainer },
    template: `
      <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
        <BaseContainer id="storybook-size-1" initial-theme="light" style="--thepro-userprofilecard-avatar-size: 80px; --thepro-useravatar-icon-type: default; --thepro-useravatar-icon-color: #3b82f6; max-width: 250px;">
          <UserProfileCard 
            :user-data="{
              name: 'Маленькая',
              phone: '+7 (999) 111-11-11',
              description: 'Компактная версия',
              avatar: '',
              status: 'Активна'
            }"
          />
        </BaseContainer>
        <BaseContainer id="storybook-size-2" initial-theme="light" style="--thepro-userprofilecard-avatar-size: 120px; --thepro-useravatar-icon-type: user; --thepro-useravatar-icon-color: #10b981; max-width: 350px;">
          <UserProfileCard 
            :user-data="{
              name: 'Средняя',
              phone: '+7 (999) 222-22-22',
              description: 'Стандартная версия карточки',
              avatar: '',
              status: 'Активна'
            }"
          />
        </BaseContainer>
        <BaseContainer id="storybook-size-3" initial-theme="light" style="--thepro-userprofilecard-avatar-size: 160px; --thepro-useravatar-icon-type: admin; --thepro-useravatar-icon-color: #ef4444; max-width: 450px;">
          <UserProfileCard 
            :user-data="{
              name: 'Большая',
              phone: '+7 (999) 333-33-33',
              description: 'Расширенная версия с большим аватаром',
              avatar: '',
              status: 'Активна'
            }"
          />
        </BaseContainer>
      </div>
      <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        <strong>Debug Different Sizes:</strong><br>
        Size 1: 80px avatar, 250px max-width<br>
        Size 2: 120px avatar, 350px max-width<br>
        Size 3: 160px avatar, 450px max-width
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'UserProfileCard с разными размерами аватара и шириной карточки.'
      }
    }
  }
};