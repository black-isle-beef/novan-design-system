import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export type DsAlertVariant = 'success' | 'warning' | 'danger' | 'info';

/**
 * Persistent, inline status message — distinct from `DsToastComponent`,
 * which is transient, auto-dismissing, and floats above the page. An alert
 * stays wherever it's placed in the document until the reader dismisses it
 * (if `dismissible`) or the surrounding content stops rendering it.
 *
 * `danger` and `warning` render with `role="alert"` (assertive, interrupts);
 * `success` and `info` render with `role="status"` (polite, waits its turn).
 */
@Component({
  selector: 'ds-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-alert',
    '[class.ds-alert--success]': "variant() === 'success'",
    '[class.ds-alert--warning]': "variant() === 'warning'",
    '[class.ds-alert--danger]': "variant() === 'danger'",
    '[class.ds-alert--info]': "variant() === 'info'",
    '[attr.role]': 'role()',
    '[hidden]': '!visible()',
  },
})
export class DsAlertComponent {
  readonly variant = input<DsAlertVariant>('info');
  /** Optional bold lead-in rendered above the projected message. */
  readonly title = input<string | null>(null);
  readonly dismissible = input(false);
  /** Accessible label for the built-in close button. */
  readonly closeButtonLabel = input('Dismiss');

  /** Fires when the reader dismisses the alert; the component hides itself in response. */
  readonly dismissed = output<void>();

  protected readonly visible = signal(true);

  private readonly isUrgent = computed(() => this.variant() === 'danger' || this.variant() === 'warning');
  protected readonly role = computed(() => (this.isUrgent() ? 'alert' : 'status'));

  protected dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
