import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

/**
 * A full-bleed image card that flips on its vertical axis to reveal content
 * on the reverse. The whole card is a native `<button>`, so it's focusable
 * and activated with Enter/Space for free; hovering with a mouse flips it
 * via CSS alone, while the button's `click` (which fires for mouse, touch,
 * and keyboard activation alike) toggles a persisted flipped state so
 * keyboard and touch users — who can't "hover" — can flip it open and keep
 * it open. `aria-expanded` reports the current state, and each face is
 * `aria-hidden` while it isn't the one showing.
 */
@Component({
  selector: 'ds-flip-card',
  standalone: true,
  templateUrl: './flip-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-flip-card',
    '[class.ds-flip-card--flipped]': 'flipped()',
    '[class.ds-flip-card--light-media]': "mediaTone() === 'light'",
  },
})
export class DsFlipCardComponent {
  /** Heading shown over the front-face image. */
  readonly heading = input.required<string>();
  /**
   * Overall tone of the front-face image, so the heading stays legible:
   * `'dark'` (the default) gets a white heading, `'light'` gets a dark one.
   * The component can't infer this from the projected `<img>` itself, so
   * the caller states it based on the specific image used.
   */
  readonly mediaTone = input<'dark' | 'light'>('dark');

  protected readonly flipped = signal(false);

  protected toggle(): void {
    this.flipped.update((value) => !value);
  }
}
