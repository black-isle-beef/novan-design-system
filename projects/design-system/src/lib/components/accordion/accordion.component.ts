import { ChangeDetectionStrategy, Component } from '@angular/core';

let nextAccordionId = 0;

/**
 * Bootstrap 6 `.accordion` wrapper that makes its `ds-accordion-item`
 * children mutually exclusive — opening one closes the others. It does this
 * natively: every item's `<details>` gets the same `name`, which is how the
 * browser groups exclusive disclosures. Each item already opens and closes
 * independently on its own, so only wrap them in this when single-open
 * behavior is explicitly wanted; otherwise just use bare `ds-accordion-item`s.
 *
 * Bootstrap's modifiers go on the host: `class="accordion-flush"`,
 * `"accordion-gap"` or `"accordion-sm"`.
 */
@Component({
  selector: 'ds-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-accordion accordion',
  },
})
export class DsAccordionComponent {
  /** Shared `<details name>` that groups the items into one exclusive set. */
  readonly groupName = `ds-accordion-${nextAccordionId++}`;
}
