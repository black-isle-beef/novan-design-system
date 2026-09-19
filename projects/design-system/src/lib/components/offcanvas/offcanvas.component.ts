import { ChangeDetectionStrategy, Component, ElementRef, effect, input, output, viewChild } from '@angular/core';

export type DsOffcanvasPlacement = 'start' | 'end' | 'top' | 'bottom';

let nextOffcanvasId = 0;

/**
 * Accessible off-canvas drawer built on the native `<dialog>` element, which
 * provides top-layer stacking, a focus trap, and (in current browsers) focus
 * restoration for free — the same foundation as `ds-modal`, but the surface
 * is anchored to a viewport edge and slides in from it instead of appearing
 * centered. Visibility is controlled by the parent through the `open` input;
 * bind `[(open)]` for two-way sync.
 *
 * Dismissal (Escape, backdrop click, and the built-in close button) can be
 * turned off with `dismissible="false"` for flows that require an explicit
 * in-content action before the drawer may close.
 */
@Component({
  selector: 'ds-offcanvas',
  standalone: true,
  templateUrl: './offcanvas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-offcanvas',
  },
})
export class DsOffcanvasComponent {
  /** Whether the drawer is open. Bind with `[(open)]` for two-way sync. */
  readonly open = input(false);
  /** Which viewport edge the drawer slides in from. */
  readonly placement = input<DsOffcanvasPlacement>('start');
  /** Heading rendered in the drawer header and used as its accessible name. */
  readonly heading = input<string | null>(null);
  /** Accessible name for the dialog when no visible `heading` is provided. */
  readonly ariaLabel = input<string | null>(null);
  /** Whether Escape, the backdrop, and the close button can dismiss the drawer. */
  readonly dismissible = input(true);
  /** Accessible label for the built-in close button. */
  readonly closeButtonLabel = input('Close');

  /** Emits the new open state; pair with `open` for `[(open)]="isOpen"`. */
  readonly openChange = output<boolean>();
  /** Emits whenever the drawer finishes closing, regardless of cause. */
  readonly closed = output<void>();

  protected readonly headingId = `ds-offcanvas-heading-${nextOffcanvasId++}`;
  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private previouslyFocused: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const dialogEl = this.dialogRef().nativeElement;
      if (this.open()) {
        if (!dialogEl.open) {
          this.previouslyFocused = document.activeElement as HTMLElement | null;
          dialogEl.showModal();
        }
      } else if (dialogEl.open) {
        dialogEl.close();
      }
    });
  }

  /** Blocks the native Escape-to-close gesture when the drawer isn't dismissible. */
  protected handleCancel(event: Event): void {
    if (!this.dismissible()) {
      event.preventDefault();
    }
  }

  /** Fires for every close, however it happened (Escape, backdrop, button, or `open` flipping to false). */
  protected handleClose(): void {
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
    if (this.open()) {
      this.openChange.emit(false);
    }
    this.closed.emit();
  }

  /** A click landing on the `<dialog>` element itself (not its content) is a backdrop click. */
  protected handleBackdropClick(event: MouseEvent): void {
    if (this.dismissible() && event.target === this.dialogRef().nativeElement) {
      this.requestClose();
    }
  }

  /** Programmatic close used by the built-in close button. */
  protected requestClose(): void {
    if (this.dismissible()) {
      this.dialogRef().nativeElement.close();
    }
  }
}
