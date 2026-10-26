# @black-isle-beef/novan-design-system

Token-driven Angular (v17+ standalone components) + Bootstrap 6 design system.

## Install

```bash
npm install @black-isle-beef/novan-design-system bootstrap@6.0.0-alpha.1
```

The styles compile Bootstrap 6's Sass source, so Bootstrap is a peer dependency.
Bootstrap 6 is currently an alpha release.

## Usage

```ts
import { DsHeroComponent, DsHeaderComponent } from '@black-isle-beef/novan-design-system';

@Component({
  standalone: true,
  imports: [DsHeroComponent, DsHeaderComponent],
  // ...
})
export class AppComponent {}
```

Add the compiled stylesheet to your app's global styles (`angular.json`):

```jsonc
"styles": ["node_modules/@black-isle-beef/novan-design-system/styles/styles.scss"]
```

Or load it from a root SCSS file with `@use`. The module forwards the `$ds-*` design tokens,
and you can configure it the same way:

```scss
@use '@black-isle-beef/novan-design-system/styles/styles' with (
  $ds-enable-web-fonts: false // self-host Inter and Montserrat Alternates instead
);
```

Dark mode is opt-in: set `data-bs-theme="dark"` on `<html>` (or on any element, for a dark
subtree). Pages don't follow the operating system's colour scheme on their own.

### Upgrading from 2.x (Bootstrap 5)

- Load the styles with `@use`, not `@import`, and install `bootstrap@6.0.0-alpha.1`.
- Bootstrap's custom properties are unprefixed: `var(--bs-body-bg)` is now `var(--bg-body)`,
  `var(--bs-link-color)` is `var(--link-color)`, and colour roles are `var(--primary-base)`,
  `var(--primary-fg)` and so on. The `--bs-*-rgb` triplets are gone; use `color-mix()`.
- Component inputs (`variant`, `size`, …) are unchanged. If your own templates use Bootstrap
  classes, follow Bootstrap's [v6 migration guide](https://getbootstrap.com/docs/6.0/migration/):
  for example `btn btn-primary` is now `btn-solid theme-primary`, `col-md-6` is `md:col-6`, and
  `text-muted` is `fg-3`.
- The design system keeps Bootstrap 5's breakpoints (`lg` is 992px, `2xl` replaces `xxl` at
  1400px), its spacing scale (keys 1–16) and its heading sizes, so layouts don't shift.

Design tokens are also available as typed TypeScript constants:

```ts
import { colorTokens, SpacingScale } from '@black-isle-beef/novan-design-system';
```

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
npm run build:lib
```

This command builds the tokens first (`build:tokens`), then compiles the library with `ng-packagr`; build artifacts are placed in `dist/design-system`.

### Publishing the Library

Publishing is automated via [semantic-release](../../.releaserc.json) from CI. To publish manually:

1. Navigate to the `dist` directory:

   ```bash
   cd dist/design-system
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
