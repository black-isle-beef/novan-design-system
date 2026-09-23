import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { applicationConfig, type Preview } from '@storybook/angular';

// The design-system stylesheet (generated tokens -> overrides -> Bootstrap
// core -> custom utilities) is registered as a global style on the
// `storybook-browser-target` in angular.json, so every story renders with
// the real production styles instead of Storybook's default theme.

const preview: Preview = {
  // Navigation components (main-nav, header, footer, sidebar, breadcrumb)
  // use `routerLink` for in-app hrefs, which needs a `Router` to inject into.
  // An empty route config is fine — stories never actually navigate.
  // `withDisabledInitialNavigation()` stops the router from trying (and
  // failing with NG04002) to match the iframe's own preview URL on load.
  //
  // The second decorator applies the real dark-mode mechanism (`data-bs-theme`
  // on <html>, read by `_dark-mode.scss`) to every story canvas, driven by the
  // "Theme" toolbar item below — this is what makes dark mode previewable
  // for any component, not just the dedicated Brand/Dark Mode story.
  decorators: [
    applicationConfig({ providers: [provideRouter([], withDisabledInitialNavigation())] }),
    (story, context) => {
      document.documentElement.setAttribute('data-bs-theme', context.globals['theme'] ?? 'light');
      return story();
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
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
