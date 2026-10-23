import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  effect,
  inject,
  input,
  model,
  output,
  untracked,
  viewChild,
} from '@angular/core';

/**
 * Accessible cookie-consent banner. Manages focus (moves focus to the
 * primary action when shown, restores focus to the previously-focused
 * element when dismissed) and emits consent decisions as output events.
 *
 * Bind `[(open)]` to show it again later, e.g. from a "Cookie settings" link;
 * reopening always moves focus into the banner. Set `autoFocus` to `false` to
 * leave focus alone when it first appears on page load, so the skip link stays
 * the first stop. Project content to replace `message`, e.g. to link to a
 * cookie policy.
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
  /** Banner message copy. Projected content takes its place. */
  readonly message = input(
    'We use cookies to improve your experience. By continuing to browse, you agree to our use of cookies.',
  );
  /** Whether the banner is shown. Bind with `[(open)]` to reopen it. */
  readonly open = model(true);
  /**
   * Whether focus moves into the banner the first time it is shown: on first render, or when the page opens it
   * later (e.g. after reading a consent cookie in the browser). Every later opening, such as from a "Cookie
   * settings" link, moves focus.
   */
  readonly autoFocus = input(true);
  /** Label of the accept action. */
  readonly acceptLabel = input('Accept');
  /** Label of the decline action. */
  readonly declineLabel = input('Decline');
  /** Label of an optional third action that emits `manage` (e.g. "Manage preferences"); none when `null`. */
  readonly manageLabel = input<string | null>(null);
  /** Gives decline the same visual weight as accept, as UK and EU consent guidance expects. */
  readonly equalProminence = input(false);
  /** Emitted when the user accepts cookie usage. */
  readonly accepted = output<void>();
  /** Emitted when the user declines cookie usage. */
  readonly declined = output<void>();
  /** Emitted when the user asks to choose categories. The banner stays open; close it through `open`. */
  readonly manage = output<void>();

  private readonly acceptButton = viewChild<ElementRef<HTMLButtonElement>>('acceptButton');
  private readonly injector = inject(Injector);
  private previouslyFocused: HTMLElement | null = null;
  private rendered = false;
  private shownBefore = false;

  constructor() {
    afterNextRender(() => {
      this.rendered = true;
      if (this.open()) this.shown();
    });

    effect(() => {
      const open = this.open();
      // The first render is handled above; afterwards each change of `open` moves focus in or gives it back.
      untracked(() => {
        if (!this.rendered) return;
        if (open) {
          afterNextRender(() => this.shown(), { injector: this.injector });
        } else {
          this.previouslyFocused?.focus();
          this.previouslyFocused = null;
        }
      });
    });
  }

  protected accept(): void {
    this.open.set(false);
    this.accepted.emit();
  }

  protected decline(): void {
    this.open.set(false);
    this.declined.emit();
  }

  protected requestManage(): void {
    this.manage.emit();
  }

  /** The first showing follows `autoFocus`; every later one moves focus in. */
  private shown(): void {
    const first = !this.shownBefore;
    this.shownBefore = true;
    if (first && !this.autoFocus()) return;
    this.moveFocusIn();
  }

  private moveFocusIn(): void {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    this.acceptButton()?.nativeElement.focus();
  }
}
