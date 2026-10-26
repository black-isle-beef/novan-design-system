import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type DsButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'hero-light'
  | 'hero-dark';
export type DsButtonSize = 'sm' | 'md' | 'lg';

/**
 * Bootstrap 6 classes for each variant: a style (`btn-solid`, `btn-outline`)
 * plus a theme role. `info` uses the accent role, the brand purple Bootstrap 5
 * `btn-info` was themed with.
 */
const VARIANT_CLASSES: Record<DsButtonVariant, string> = {
  primary: 'btn-solid theme-primary',
  secondary: 'btn-outline theme-primary ds-btn-secondary',
  success: 'btn-solid theme-success',
  warning: 'btn-solid theme-warning',
  danger: 'btn-solid theme-danger',
  info: 'btn-solid theme-accent',
  'hero-light': 'btn-hero-light',
  'hero-dark': 'btn-hero-dark',
};

/**
 * An accessible action button with semantic variants, size options, and a
 * projected label and optional leading icon.
 */
@Component({
  selector: 'ds-button',
  standalone: true,
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Disabled/busy state lives on the inner native <button> only; repeating it on this non-interactive host
  // would be redundant, and a busy ancestor can hold back the loading announcement.
  host: {
    class: 'ds-button',
  },
})
export class DsButtonComponent {
  readonly variant = input<DsButtonVariant>('primary');
  readonly size = input<DsButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly ariaLabel = input<string | null>(null);
  readonly pressed = output<void>();

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());
  protected readonly variantClass = computed(() => VARIANT_CLASSES[this.variant()]);

  protected handleClick(): void {
    if (!this.isDisabled()) {
      this.pressed.emit();
    }
  }
}