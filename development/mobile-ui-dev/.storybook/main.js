/** @type { import('@storybook/react-native-web-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
