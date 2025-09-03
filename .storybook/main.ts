import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  viteFinal: async (config) => {
    // Добавляем поддержку SCSS
    if (config.css) {
      config.css.preprocessorOptions = {
        scss: {
          additionalData: `@use "sass:math";`
        }
      };
    }
    return config;
  }
};

export default config;