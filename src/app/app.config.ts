import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Navigation components (header/main-nav, footer, sidebar, breadcrumb)
    // use `routerLink` for in-app hrefs, which needs a `Router` to inject
    // into even when, as in this fragment-only sandbox, nothing ever
    // actually navigates through it. `withDisabledInitialNavigation()`
    // stops the router from trying (and failing with NG04002) to match
    // the page's own URL against this empty route config on load.
    provideRouter([], withDisabledInitialNavigation()),
  ]
};
