import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';

let nextAccordionItemId = 0;

/**
 * A single progressive-disclosure panel built on native `<details>`/
 * `<summary>`, which gets click/Enter-Space toggling, an implicit disclosure
 * role and `aria-expanded`, and independent open state for free from the
 * browser. Works standalone — wrap several in a `ds-accordion` only when
 * they need to be mutually exclusive (single-open); on its own, each item
 * opens and closes independently.
 */
@Component({
  selector: 'ds-accordion-item',
  standalone: true,
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-accordion-item',
  },
})
export class DsAccordionItemComponent {
  /** Text shown in the summary row; ignored when `[dsAccordionItemSummary]` content is projected instead. */
  readonly summary = input.required<string>();
  /** Whether the panel starts open. Bind with `[(open)]` for two-way sync. */
  readonly open = input(false);

  /** Emits the new open state whenever the user toggles the panel. */
  readonly openChange = output<boolean>();

  protected readonly headingId = `ds-accordion-item-heading-${nextAccordionItemId++}`;
  private readonly detailsRef = viewChild.required<ElementRef<HTMLDetailsElement>>('details');

  protected handleToggle(event: Event): void {
    this.openChange.emit((event.target as HTMLDetailsElement).open);
  }

  /** Called by a parent `ds-accordion` enforcing single-open behavior. */
  forceClose(): void {
    const detailsEl = this.detailsRef().nativeElement;
    if (detailsEl.open) {
      detailsEl.open = false;
      this.openChange.emit(false);
    }
  }
}
