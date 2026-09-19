import { ChangeDetectionStrategy, Component, contentChildren, effect } from '@angular/core';
import { DsAccordionItemComponent } from './accordion-item.component';

/**
 * Optional coordinating wrapper that makes its `ds-accordion-item` children
 * mutually exclusive — opening one closes the others. Each item's own
 * `<details>`/`<summary>` already opens and closes independently on its
 * own, so only wrap them in this when single-open behavior is explicitly
 * wanted; otherwise just use bare `ds-accordion-item`s.
 */
@Component({
  selector: 'ds-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-accordion',
  },
})
export class DsAccordionComponent {
  protected readonly items = contentChildren(DsAccordionItemComponent);

  constructor() {
    // Reacts to whichever items are currently projected — this component
    // doesn't own their template, so it can't bind `(openChange)` on them
    // directly and instead subscribes via the live content-children query.
    effect((onCleanup) => {
      const items = this.items();
      const subscriptions = items.map((item) =>
        item.openChange.subscribe((isOpen) => {
          if (!isOpen) {
            return;
          }
          items.forEach((other) => {
            if (other !== item) {
              other.forceClose();
            }
          });
        }),
      );
      onCleanup(() => subscriptions.forEach((subscription) => subscription.unsubscribe()));
    });
  }
}
