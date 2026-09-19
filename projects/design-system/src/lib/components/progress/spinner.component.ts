import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type DsSpinnerSize = 'sm' | 'md';

/**
 * Thin wrapper around Bootstrap's `.spinner-border`, for indeterminate
 * progress (no known value/duration). `role="status"` gives it an implicit
 * polite live region, and the visually-hidden `label` is what's actually
 * announced — there's no visible text by default, matching Bootstrap's
 * documented spinner markup.
 *
 * For a larger region that's temporarily loading (a panel, a whole page),
 * prefer setting `aria-busy="true"` directly on that region's own container
 * over relying on the spinner alone — `aria-busy` is a property of the
 * content being loaded, not something this component can apply on the
 * caller's behalf.
 */
@Component({
  selector: 'ds-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-spinner spinner-border',
    '[class.spinner-border-sm]': "size() === 'sm'",
    role: 'status',
  },
})
export class DsSpinnerComponent {
  readonly size = input<DsSpinnerSize>('md');
  /** Accessible label announced by assistive tech; not shown visibly. */
  readonly label = input('Loading');
}
