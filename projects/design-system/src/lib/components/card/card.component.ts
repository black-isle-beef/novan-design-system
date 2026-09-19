import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Structural content container with optional media, header, and footer
 * projection slots, matching the modal's named-slot API
 * (`[dsCardMedia]`/`[dsCardHeader]`/`[dsCardFooter]`, default slot for the
 * body). Empty slots collapse rather than leaving behind empty padding.
 *
 * Rests at `elevation.component.card`; `hoverable` lifts it to
 * `elevation.component.card-hover` on hover/focus-within, for cards that
 * are themselves interactive (e.g. wrap an `<a>` or `<button>`).
 */
@Component({
  selector: 'ds-card',
  standalone: true,
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-card',
    '[class.ds-card--hoverable]': 'hoverable()',
  },
})
export class DsCardComponent {
  /** Whether the card lifts to `elevation.component.card-hover` on hover/focus-within. */
  readonly hoverable = input(false);
}
