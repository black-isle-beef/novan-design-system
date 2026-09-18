import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { DsToastVariant } from './toast.model';

/**
 * A single toast/notification surface. Presentational only — queuing,
 * auto-dismiss timing, and pause-on-hover/focus live in `DsToastService`;
 * this component just renders one message and reports pointer/focus and
 * dismissal events for the service to act on.
 *
 * `danger` and `warning` render with `role="alert"` (assertive, interrupts);
 * `success` and `info` render with `role="status"` (polite, waits its turn).
 */
@Component({
  selector: 'ds-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-toast',
    '[class.ds-toast--success]': "variant() === 'success'",
    '[class.ds-toast--warning]': "variant() === 'warning'",
    '[class.ds-toast--danger]': "variant() === 'danger'",
    '[class.ds-toast--info]': "variant() === 'info'",
    '[attr.role]': 'role()',
    '(mouseenter)': 'paused.emit()',
    '(mouseleave)': 'resumed.emit()',
    '(focusin)': 'paused.emit()',
    '(focusout)': 'resumed.emit()',
  },
})
export class DsToastComponent {
  readonly variant = input<DsToastVariant>('info');
  /** Optional bold lead-in rendered above the projected message. */
  readonly title = input<string | null>(null);
  readonly dismissible = input(true);
  /** Accessible label for the built-in close button. */
  readonly closeButtonLabel = input('Dismiss');

  /** Requests removal; the container is expected to call `DsToastService.dismiss()` in response. */
  readonly dismissed = output<void>();
  /** The toast gained pointer or keyboard focus; the auto-dismiss timer should pause. */
  readonly paused = output<void>();
  /** The toast lost pointer and keyboard focus; the auto-dismiss timer should resume. */
  readonly resumed = output<void>();

  private readonly isUrgent = computed(() => this.variant() === 'danger' || this.variant() === 'warning');
  protected readonly role = computed(() => (this.isUrgent() ? 'alert' : 'status'));

  protected requestClose(): void {
    this.dismissed.emit();
  }
}
