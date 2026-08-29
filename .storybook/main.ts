import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../.storybook/Introduction.mdx', '../projects/design-system/src/lib/**/*.stories.ts'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: (config) => {
    // Works around a webpack5 "Conflict: Multiple assets emit different
    // content to the same filename" build failure affecting `*.js.map`
    // source maps when many small async story chunks share content hashes.
    config.devtool = false;
    return config;
  },
  staticDirs: ['../public'],
  docs: {
    defaultName: 'Docs',
  },
};

export default config;
