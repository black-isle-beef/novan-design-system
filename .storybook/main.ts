import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import type { StorybookConfig } from '@storybook/angular';

const require = createRequire(import.meta.url);

// Forces every `@angular/*` import (from the story bundles, from
// @storybook/angular's own renderer, and from any other webpack entry point
// mixed into the preview iframe) to resolve to the exact same installed
// copy. Without this, Angular's signal `input()`/`output()`/content-
// projection internals can end up split across two module instances in the
// same page — each with its own "current injector" state — which throws
// `NG0203: inject() must be called from an injection context` and
// `ɵɵprojectionDef` errors for effectively every real component.
const angularPackageEntry = (pkg: string) => require.resolve(pkg);

const config: StorybookConfig = {
  stories: ['../.storybook/*.mdx', '../projects/design-system/src/lib/**/*.stories.ts'],
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

    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      ...Object.fromEntries(
        [
          '@angular/core',
          '@angular/common',
          '@angular/compiler',
          '@angular/forms',
          '@angular/platform-browser',
          '@angular/platform-browser-dynamic',
          '@angular/router',
        ].map((pkg) => [`${pkg}$`, angularPackageEntry(pkg)]),
      ),
    };

    return config;
  },
  staticDirs: ['../public'],
  docs: {
    defaultName: 'Docs',
  },
};

export default config;
