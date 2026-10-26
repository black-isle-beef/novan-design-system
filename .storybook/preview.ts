import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { applicationConfig, type Preview } from '@storybook/angular';

// The design-system stylesheet (generated tokens -> overrides -> Bootstrap
// core -> custom utilities) is registered as a global style on the
// `storybook-browser-target` in angular.json, so every story renders with
// the real production styles instead of Storybook's default theme.

/** `copper` is dark mode plus `data-ds-theme="copper"`; `light`/`dark` are plain Bootstrap color modes. */
function applyTheme(element: HTMLElement, theme: string): void {
  element.setAttribute('data-bs-theme', theme === 'copper' ? 'dark' : theme);
  if (theme === 'copper') {
    element.setAttribute('data-ds-theme', 'copper');
  } else {
    element.removeAttribute('data-ds-theme');
  }
}

function themeAttributes(theme: string): string {
  return theme === 'copper' ? 'data-bs-theme="dark" data-ds-theme="copper"' : `data-bs-theme="${theme}"`;
}

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
  // "Charcoal & Copper" sets `data-ds-theme="copper"` on top of dark mode; the
  // `Themes/Charcoal & Copper` stories force it with `parameters.dsTheme`.
  //
  // On the Docs page every inline story shares one document, so a theme a story
  // forces can't go on <html> without leaking onto Storybook's white docs
  // canvas (light theme text on white). There it is scoped to a wrapper around
  // the story instead (the theme selectors work on any subtree, and the themed
  // element paints its own background), while <html> keeps the toolbar theme.
  // Rendering such stories as docs iframes isn't an alternative: each iframe
  // holds a dev-server HMR connection, and past Chrome's six per host the rest
  // never load.
  decorators: [
    applicationConfig({ providers: [provideRouter([], withDisabledInitialNavigation())] }),
    (story, context) => {
      const globalTheme: string = context.globals['theme'] ?? 'light';
      const forcedTheme: string | undefined = context.parameters['dsTheme'];
      const scopeToCanvas = context.viewMode === 'docs' && !!forcedTheme;
      applyTheme(document.documentElement, scopeToCanvas ? globalTheme : (forcedTheme ?? globalTheme));

      const rendered = story();
      if (!scopeToCanvas || !rendered.template) {
        return rendered;
      }
      const padding = context.parameters['layout'] === 'fullscreen' ? '' : ' p-4';
      return {
        ...rendered,
        template: `<div class="ds-docs-theme-canvas${padding}" ${themeAttributes(forcedTheme)}>${rendered.template}</div>`,
      };
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
          { value: 'copper', icon: 'contrast', title: 'Charcoal & Copper' },
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
        order: ['Introduction', 'Getting Started', 'Foundations', 'Components', 'Templates', 'Themes'],
      },
    },
  },
};

export default preview;
