import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type DsButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type DsButtonSize = 'sm' | 'md' | 'lg';

/**
 * An accessible action button with semantic variants, size options, and a
 * projected label and optional leading icon.
 */
@Component({
  selector: 'ds-button',
  standalone: true,
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-button',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.aria-busy]': 'loading()',
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

  protected handleClick(): void {
    if (!this.isDisabled()) {
      this.pressed.emit();
    }
  }
}