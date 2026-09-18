import { ChangeDetectionStrategy, Component, ElementRef, effect, input, output, viewChild } from '@angular/core';

export type DsModalSize = 'sm' | 'md' | 'lg';

let nextModalId = 0;

/**
 * Accessible modal dialog built on the native `<dialog>` element, which
 * provides the top-layer stacking, focus trap, and (in current browsers)
 * focus restoration for free. Visibility is controlled by the parent through
 * the `open` input; bind `[(open)]` for two-way sync.
 *
 * Dismissal (Escape, backdrop click, and the built-in close button) can be
 * turned off with `dismissible="false"` for flows that require an explicit
 * in-content action before the modal may close.
 */
@Component({
  selector: 'ds-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-modal',
  },
})
export class DsModalComponent {
  /** Whether the modal is open. Bind with `[(open)]` for two-way sync. */
  readonly open = input(false);
  /** Modal surface width. */
  readonly size = input<DsModalSize>('md');
  /** Heading rendered in the modal header and used as its accessible name. */
  readonly heading = input<string | null>(null);
  /** Accessible name for the dialog when no visible `heading` is provided. */
  readonly ariaLabel = input<string | null>(null);
  /** Whether Escape, the backdrop, and the close button can dismiss the modal. */
  readonly dismissible = input(true);
  /** Accessible label for the built-in close button. */
  readonly closeButtonLabel = input('Close');

  /** Emits the new open state; pair with `open` for `[(open)]="isOpen"`. */
  readonly openChange = output<boolean>();
  /** Emits whenever the modal finishes closing, regardless of cause. */
  readonly closed = output<void>();

  protected readonly headingId = `ds-modal-heading-${nextModalId++}`;
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

  /** Blocks the native Escape-to-close gesture when the modal isn't dismissible. */
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
