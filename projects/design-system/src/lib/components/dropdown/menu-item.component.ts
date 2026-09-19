import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

/**
 * A single action in a `DsDropdownComponent`'s menu. `role="menuitem"` lives
 * on the inner native `<button>` so it keeps native click/Enter/Space
 * activation; the parent dropdown owns roving tabindex and calls
 * `setTabbable()`/`focus()` directly on the queried instances rather than
 * through input bindings, since it doesn't own this component's template.
 */
@Component({
  selector: 'ds-menu-item',
  standalone: true,
  templateUrl: './menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-menu-item',
  },
})
export class DsMenuItemComponent {
  readonly disabled = input(false);

  /** Fires when activated by click, Enter, or Space; the parent dropdown closes the menu in response. */
  readonly activated = output<void>();

  protected readonly tabbable = signal(false);
  private readonly buttonRef = viewChild.required<ElementRef<HTMLButtonElement>>('button');

  /** Called by the parent dropdown to move roving tabindex onto/off this item. */
  setTabbable(tabbable: boolean): void {
    this.tabbable.set(tabbable);
  }

  focus(): void {
    this.buttonRef().nativeElement.focus();
  }

  /** Trimmed visible text, used by the parent dropdown's typeahead search. */
  get label(): string {
    return this.buttonRef().nativeElement.textContent?.trim() ?? '';
  }

  protected activate(): void {
    if (!this.disabled()) {
      this.activated.emit();
    }
  }
}
