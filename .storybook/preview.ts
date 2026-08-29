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
    // @storybook/addon-a11y: panel-driven manual checks only. Automated CI
    // enforcement of WCAG 2.1 AA lives in the dedicated Playwright +
    // @axe-core/playwright suite (see playwright.config.ts / e2e/a11y),
    // which would otherwise collide with the addon's own axe instance.
    a11y: {
      test: 'off',
    },
    // Default padded layout so the Docs page's embedded story canvases keep
    // normal breathing room; full-bleed structural components opt into
    // `layout: 'fullscreen'` individually via their own story meta.
    options: {
      // Force the top-level Introduction page first so it's what Storybook
      // opens to on launch; everything else keeps its natural sort order.
      storySort: {
        order: ['Introduction', 'Getting Started', 'Components'],
      },
    },
  },
};

export default preview;
