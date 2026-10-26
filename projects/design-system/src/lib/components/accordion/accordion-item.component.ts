import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { DsAccordionComponent } from './accordion.component';

let nextAccordionItemId = 0;

/**
 * A single Bootstrap 6 accordion panel (`details.accordion-item`), which gets
 * click/Enter-Space toggling, an implicit disclosure role and
 * `aria-expanded`, and independent open state for free from the browser.
 * Works standalone — the host then carries `.accordion` itself so
 * Bootstrap's accordion tokens apply — or inside a `ds-accordion`, which
 * makes the items mutually exclusive (single-open).
 */
@Component({
  selector: 'ds-accordion-item',
  standalone: true,
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-accordion-item',
    '[class.accordion]': '!accordion',
  },
})
export class DsAccordionItemComponent {
  /** Text shown in the summary row; ignored when `[dsAccordionItemSummary]` content is projected instead. */
  readonly summary = input.required<string>();
  /** Whether the panel starts open; a bare `open` attribute counts. Bind with `[(open)]` for two-way sync. */
  readonly open = input(false, { transform: booleanAttribute });

  /** Emits the new open state whenever the panel toggles, including when a sibling in a `ds-accordion` closes it. */
  readonly openChange = output<boolean>();

  protected readonly accordion = inject(DsAccordionComponent, { optional: true });
  protected readonly headingId = `ds-accordion-item-heading-${nextAccordionItemId++}`;
  private readonly detailsRef = viewChild.required<ElementRef<HTMLDetailsElement>>('details');

  protected handleToggle(event: Event): void {
    this.openChange.emit((event.target as HTMLDetailsElement).open);
  }

  /** Closes the panel programmatically, emitting `openChange(false)` if it was open. */
  forceClose(): void {
    const detailsEl = this.detailsRef().nativeElement;
    if (detailsEl.open) {
      detailsEl.open = false;
      this.openChange.emit(false);
    }
  }
}
