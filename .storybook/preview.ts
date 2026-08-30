import type { Preview } from '@storybook/angular';

// The design-system stylesheet (generated tokens -> overrides -> Bootstrap
// core -> custom utilities) is registered as a global style on the
// `storybook-browser-target` in angular.json, so every story renders with
// the real production styles instead of Storybook's default theme.

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Run @storybook/addon-a11y checks for every story and surface
    // violations as errors in Storybook's test workflow.
    a11y: {
      test: 'error',
    },
    // Default padded layout so the Docs page's embedded story canvases keep
    // normal breathing room; full-bleed structural components opt into
    // `layout: 'fullscreen'` individually via their own story meta.
    options: {
      // Force the top-level Introduction page first so it's what Storybook
      // opens to on launch; everything else keeps its natural sort order.
      storySort: {
        order: ['Introduction', 'Getting Started', 'Foundations', 'Components'],
      },
    },
  },
};

export default preview;
