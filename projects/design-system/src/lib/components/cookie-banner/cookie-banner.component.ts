import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

/**
 * Accessible cookie-consent banner. Manages focus (moves focus to the
 * primary action when shown, restores focus to the previously-focused
 * element when dismissed) and emits consent decisions as output events.
 */
@Component({
  selector: 'ds-cookie-banner',
  standalone: true,
  templateUrl: './cookie-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-cookie-banner',
  },
})
export class DsCookieBannerComponent {
  /** Banner message copy. */
  readonly message = input(
    'We use cookies to improve your experience. By continuing to browse, you agree to our use of cookies.',
  );
  /** Emitted when the user accepts cookie usage. */
  readonly accepted = output<void>();
  /** Emitted when the user declines cookie usage. */
  readonly declined = output<void>();

  protected readonly visible = signal(true);
  private readonly acceptButton = viewChild<ElementRef<HTMLButtonElement>>('acceptButton');
  private previouslyFocused: HTMLElement | null = null;

  constructor() {
    afterNextRender(() => {
      if (this.visible()) {
        this.previouslyFocused = document.activeElement as HTMLElement | null;
        this.acceptButton()?.nativeElement.focus();
      }
    });

    effect(() => {
      if (!this.visible()) {
        this.previouslyFocused?.focus();
      }
    });
  }

  protected accept(): void {
    this.visible.set(false);
    this.accepted.emit();
  }

  protected decline(): void {
    this.visible.set(false);
    this.declined.emit();
  }
}
