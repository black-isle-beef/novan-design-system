# @my-org/design-system

Token-driven Angular (v17+ standalone components) + Bootstrap 5 design system.

## Install

```bash
npm install @my-org/design-system bootstrap
```

## Usage

```ts
import { DsHeroComponent, DsHeaderComponent } from '@my-org/design-system';

@Component({
  standalone: true,
  imports: [DsHeroComponent, DsHeaderComponent],
  // ...
})
export class AppComponent {}
```

Add the compiled stylesheet to your app's global styles (`angular.json`):

```jsonc
"styles": ["node_modules/@my-org/design-system/styles/styles.scss"]
```

Or import it directly in a root SCSS file:

```scss
@import '@my-org/design-system/styles/styles';
```

Design tokens are also available as typed TypeScript constants:

```ts
import { colorTokens, SpacingScale } from '@my-org/design-system';
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
