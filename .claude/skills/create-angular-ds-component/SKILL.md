---
name: create-angular-ds-component
description: "Use when creating or extending an Angular design-system component with standalone APIs, signals, design tokens, scoped SCSS, Storybook stories, unit tests, and public exports."
---

# Create Angular Design-System Component

Create enterprise-ready components for `@black-isle-beef/novan-design-system`. Follow this workflow exactly. The source library is `projects/design-system`; never create a parallel `libs/ui` tree.

If the user passed an argument, read it as `<component-name> [variants] [sizes] [states]`, for example: `ds-button primary,secondary sm,md,lg disabled,loading`. When variants, sizes, or states are missing, ask for them before writing implementation code.

## 1. Inputs And Verification

Before creating files, identify and restate:

1. The selector in kebab case, beginning with `ds-`, such as `ds-button`.
2. The PascalCase class name, such as `DsButtonComponent`.
3. The required variants, sizes, states, native HTML element, interactive behavior, and projected content slots.
4. Accessibility requirements, including keyboard behavior, accessible name, disabled/loading semantics, and any role needed beyond the native element.

Reject or normalize invalid names. Use `ds-status-badge`, not `StatusBadge`, `status_badge`, or `badge`. If the request omits variants, sizes, or states, ask for them before writing implementation code.

Use a native control when one exists. A clickable component must normally render `<button type="button">`, not an element with `role="button"`.

## 2. Files And Directories

For a component named `ds-button`, create this exact layout. The component directory name omits the `ds-` prefix only when the existing library does; this library uses `button`.

```text
projects/design-system/src/lib/components/button/
  button.component.ts
  button.component.html
  button.component.scss
  button.component.spec.ts
  button.component.stories.ts
  index.ts
tokens/
  color.tokens.json                 # Update only when a needed semantic color is absent.
  spacing.tokens.json               # Update only when a needed spacing token is absent.
  typography.tokens.json            # Update only when a needed typography token is absent.
projects/design-system/src/public-api.ts
```

Keep templates, styles, tests, and stories beside the component. `index.ts` is the local barrel:

```ts
export * from './button.component';
```

Export the local barrel from the library public API:

```ts
export * from './lib/components/button';
```

Do not place generated token output under source control by hand. Token build output is generated in `projects/design-system/src/styles/tokens/` and `projects/design-system/src/lib/tokens/design-tokens.ts` by `npm run build:tokens`.

## 3. Architecture And Code Standards

### Angular Component

Use standalone components, `OnPush`, signal-based inputs and outputs, `computed()` for derived state, a `host` object for stable host bindings, native HTML semantics, and content projection. Do not use `@Input()`, `@Output()`, `EventEmitter`, `ngClass`, or imperative DOM class manipulation for new code.

```ts
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type DsButtonVariant = 'primary' | 'secondary';
export type DsButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-button',
    '[class.ds-button--primary]': "variant() === 'primary'",
    '[class.ds-button--secondary]': "variant() === 'secondary'",
    '[class.ds-button--sm]': "size() === 'sm'",
    '[class.ds-button--md]': "size() === 'md'",
    '[class.ds-button--lg]': "size() === 'lg'",
    '[class.ds-button--disabled]': 'isDisabled()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.aria-busy]': 'loading()',
  },
})
export class DsButtonComponent {
  readonly variant = input<DsButtonVariant>('primary');
  readonly size = input<DsButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly pressed = output<void>();

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());

  protected handleClick(): void {
    if (!this.isDisabled()) {
      this.pressed.emit();
    }
  }
}
```

The template must bind ARIA attributes and native control behavior directly to signals. Keep decorative loading content hidden from assistive technology and expose useful loading text.

```html
<button
  class="ds-button__control"
  type="button"
  [disabled]="isDisabled()"
  [attr.aria-busy]="loading()"
  (click)="handleClick()"
>
  @if (loading()) {
    <span class="ds-button__spinner" aria-hidden="true"></span>
    <span class="ds-button__loading-text">Loading</span>
  }
  <ng-content></ng-content>
</button>
```

Use named projection slots only when there are multiple meaningful content regions:

```html
<ng-content select="[dsButtonIcon]"></ng-content>
<span class="ds-button__label"><ng-content></ng-content></span>
```

### Tokens And Scoped SCSS

Use only global design tokens and component-local CSS custom properties. Never introduce raw hex, `rgb()`/`rgba()`, pixel values, arbitrary shadows, or unapproved magic numbers. Add a DTCG token to `tokens/*.tokens.json` when a semantic value is missing, then generate its outputs.

Map component properties to global tokens at the host. Use `rem` or `em` for any component-relative measurement and preserve the existing BEM, host-centric naming convention.

```scss
:host {
  --ds-button-background-primary: var(--ds-color-brand-primary);
  --ds-button-color-primary: var(--ds-color-text-inverse);
  --ds-button-background-secondary: var(--ds-color-neutral-gray-100);
  --ds-button-color-secondary: var(--ds-color-text-body);
  --ds-button-padding-inline: var(--ds-spacing-4);
  --ds-button-padding-block: var(--ds-spacing-2);
  --ds-button-focus-ring: var(--ds-color-brand-primary);

  display: inline-block;
}

.ds-button__control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-spacing-2);
  min-block-size: 2.75rem;
  padding: var(--ds-button-padding-block) var(--ds-button-padding-inline);
  border: 0;
  background-color: var(--ds-button-background-primary);
  color: var(--ds-button-color-primary);
  font: inherit;
}

:host(.ds-button--secondary) .ds-button__control {
  background-color: var(--ds-button-background-secondary);
  color: var(--ds-button-color-secondary);
}

.ds-button__control:focus-visible {
  outline: 0.1875rem solid var(--ds-button-focus-ring);
  outline-offset: 0.125rem;
}

:host(.ds-button--disabled) .ds-button__control {
  cursor: not-allowed;
}

@media (forced-colors: active) {
  .ds-button__control {
    border: 0.0625rem solid ButtonText;
    forced-color-adjust: auto;
  }
}
```

Use token references in a DTCG token file rather than duplicating raw values:

```json
{
  "color": {
    "focus": {
      "default": {
        "$type": "color",
        "$value": "{color.brand.primary}",
        "$description": "Visible keyboard focus indicator."
      }
    }
  }
}
```

Prefer `color: CanvasText`, `background: Canvas`, and system colors only inside the `forced-colors` override. Keep all normal rendering values token based.

### Accessibility

Treat accessibility as component API, not a Storybook afterthought:

- Bind `disabled`, `aria-disabled`, `aria-busy`, `aria-expanded`, `aria-pressed`, `aria-selected`, and `aria-live` directly to signals whenever the semantic state exists.
- Never apply an ARIA role that conflicts with the native element. Add a role only when no suitable native element exists.
- Ensure keyboard interaction matches the native control or the relevant WAI-ARIA pattern.
- Keep focus visible, use `:focus-visible`, and test `forced-colors: active` styles.
- Provide an accessible name through visible text, a required label input, or an `aria-label` input. Do not rely on an icon alone.
- Maintain valid contrast through semantic tokens and ensure disabled states are still legible.

## 4. Execution Workflow

Complete these steps in order. Do not skip a step or leave an import, export, generated token, test, or story unresolved.

1. Inspect one neighboring component, its spec, and its story. Confirm the requested API and choose the correct native semantic element.
2. Determine whether existing tokens satisfy every visual property. When one is absent, update the most appropriate source file in `tokens/` using DTCG `$type`, `$value`, and `$description`.
3. Run `npm run build:tokens`. Resolve token-reference errors before creating component code that consumes the generated variables.
4. Create the component TypeScript, template, SCSS, test, Storybook story, and `index.ts` in the component directory. Use a narrow, typed public API and signal state only.
5. Add the component barrel to `projects/design-system/src/public-api.ts`. Preserve existing exports and ordering conventions.
6. Add focused unit tests for defaults, each meaningful variant or state, emitted outputs, disabled/loading behavior, accessibility attributes, and projected content where applicable.
7. Add Storybook stories for the default, every visual variant, sizes, disabled, loading, long content, and icon-only or projected-content cases as applicable. Use typed `Meta` and `StoryObj`:

```ts
import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from './button.component';

const meta: Meta<DsButtonComponent> = {
  title: 'Components/Global/Button',
  component: DsButtonComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsButtonComponent>;

export const Primary: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
```

8. Validate in this order and fix failures before continuing. On Windows PowerShell, invoke `npm.cmd` and `npx.cmd` instead:

```powershell
npm.cmd run build:tokens
npx.cmd ng test design-system --watch=false
npm.cmd run lint
npm.cmd run build:lib
npm.cmd run build-storybook
npx.cmd playwright test
```

Do not use the raw Storybook CLI; use the Angular architect-backed npm scripts configured by the workspace.

9. Report the created files, public API additions, token changes, and exact validation results. Mention any intentionally omitted variant or behavior.

## Completion Criteria

The component is complete only when it is importable from `@black-isle-beef/novan-design-system`, token-generated styles resolve, its tests pass, its Storybook stories render, and the accessibility suite finds no violations. Keep the change focused; do not refactor neighboring components merely to make the new API look uniform.
