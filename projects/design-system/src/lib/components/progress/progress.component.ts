import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type DsProgressVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Thin wrapper around Bootstrap's `.progress`/`.progress-bar`, for
 * determinate progress (a known value between `min` and `max`). The ARIA
 * `role="progressbar"` and `aria-value*` attributes live on the inner bar,
 * matching Bootstrap's own documented markup. Provide `label` for the
 * accessible name (e.g. "Uploading photo.jpg"); set `showValueText` to also
 * render the percentage as visible text inside the bar.
 */
@Component({
  selector: 'ds-progress',
  standalone: true,
  templateUrl: './progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-progress progress',
  },
})
export class DsProgressComponent {
  readonly value = input(0);
  readonly min = input(0);
  readonly max = input(100);
  /** Accessible name for the progress bar, e.g. "Uploading photo.jpg". */
  readonly label = input<string | null>(null);
  /** Whether the percentage is also rendered as visible text inside the bar. */
  readonly showValueText = input(false);
  readonly variant = input<DsProgressVariant>('primary');

  protected readonly percent = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) {
      return 0;
    }
    const ratio = (this.value() - this.min()) / range;
    return Math.min(Math.max(ratio, 0), 1) * 100;
  });

  protected readonly valueText = computed(() => `${Math.round(this.percent())}%`);
}
