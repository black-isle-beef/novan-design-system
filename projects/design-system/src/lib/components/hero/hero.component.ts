import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type DsHeroVariant = 'primary' | 'dark' | 'light' | 'image';

let uniqueId = 0;

/**
 * Flexible hero/banner section with configurable background variants,
 * a heading/subheading, and projected CTA button slot(s).
 */
@Component({
  selector: 'ds-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-hero',
  },
})
export class DsHeroComponent {
  /** Visual background treatment. */
  readonly variant = input<DsHeroVariant>('primary');
  /** Main hero heading (rendered as an `<h1>`). */
  readonly heading = input.required<string>();
  /** Supporting sub-heading copy. */
  readonly subheading = input<string | undefined>(undefined);
  /** Optional background image URL, used when `variant="image"`. */
  readonly backgroundImage = input<string | undefined>(undefined);

  protected readonly headingId = `ds-hero-heading-${(uniqueId += 1)}`;
}
