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
    // Accessibility checks run for every story (components and templates).
    // `'error'` promotes any Axe violation to a failing test in the Storybook
    // test run and flags it in the a11y addon panel.
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
        order: ['Introduction', 'Getting Started', 'Foundations', 'Components', 'Templates'],
      },
    },
  },
};

export default preview;
