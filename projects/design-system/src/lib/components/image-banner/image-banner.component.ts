import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type DsImageBannerLayout = 'split' | 'image';
export type DsImageBannerImagePosition = 'left' | 'right';
export type DsImageBannerCornerStyle = 'pill' | 'sweep';
export type DsImageBannerCtaPosition = 'start' | 'center' | 'end';

let uniqueId = 0;

/**
 * Content banner with two layouts:
 *
 * - `split` (default): an image on one side and a text panel on the other, each
 *   filling half of whatever width the component is given, separated by a
 *   gutter. `imagePosition` sets the image side; project the copy as default
 *   content and an optional `<h2>` via `heading`.
 * - `image`: the image alone, full width, with a projected `[dsImageBannerCta]`
 *   overlaid and placed by `ctaPosition` (`start` / `center` / `end`).
 *
 * Distinct from `ds-hero`, which overlays all of its copy on a full-bleed
 * background image. When `rounded` is set, `cornerStyle` shapes the corners:
 * `pill` caps the facing edges (split) or both ends (image) with a semicircle;
 * `sweep` cuts one large 15rem corner into each panel, its direction mirrored
 * by `imagePosition` ("sweep" vs "sweep right").
 */
@Component({
  selector: 'ds-image-banner',
  standalone: true,
  templateUrl: './image-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-image-banner',
    '[class.ds-image-banner--layout-split]': "layout() === 'split'",
    '[class.ds-image-banner--layout-image]': "layout() === 'image'",
    '[class.ds-image-banner--image-left]': "imagePosition() === 'left'",
    '[class.ds-image-banner--image-right]': "imagePosition() === 'right'",
    '[class.ds-image-banner--rounded]': 'rounded()',
    '[class.ds-image-banner--pill]': "rounded() && cornerStyle() === 'pill'",
    '[class.ds-image-banner--sweep]': "rounded() && cornerStyle() === 'sweep'",
    '[class.ds-image-banner--cta-start]': "ctaPosition() === 'start'",
    '[class.ds-image-banner--cta-center]': "ctaPosition() === 'center'",
    '[class.ds-image-banner--cta-end]': "ctaPosition() === 'end'",
  },
})
export class DsImageBannerComponent {
  /**
   * `split` = image + text panel side by side; `image` = full-width image
   * (capped at 300px tall, cropped to fit) with an overlaid CTA.
   */
  readonly layout = input<DsImageBannerLayout>('split');
  /**
   * Which side the image sits on. In `split` the text panel takes the opposite
   * side; in `image` it only mirrors the `sweep` corner direction.
   */
  readonly imagePosition = input<DsImageBannerImagePosition>('left');
  /** Image source URL. */
  readonly imageSrc = input.required<string>();
  /**
   * Accessible description of the image. Leave empty for a purely decorative
   * image so assistive technology skips it.
   */
  readonly imageAlt = input('');
  /**
   * Optional panel heading in the `split` layout, rendered as an `<h2>` and
   * used to label the region. Ignored in the `image` layout.
   */
  readonly heading = input<string | undefined>(undefined);
  /**
   * Whether the shaped corners are applied at all. Split-layout corners are
   * squared off regardless on the narrow stacked layout.
   */
  readonly rounded = input(true);
  /**
   * How the corners are shaped when `rounded` is set. `pill` caps the facing
   * edges (split) or both short ends (image) with a semicircle; `sweep` cuts a
   * single large 15rem corner into each panel, its direction mirrored by
   * `imagePosition`.
   */
  readonly cornerStyle = input<DsImageBannerCornerStyle>('pill');
  /** Horizontal placement of the projected `[dsImageBannerCta]` in the `image` layout. */
  readonly ctaPosition = input<DsImageBannerCtaPosition>('center');

  protected readonly headingId = `ds-image-banner-heading-${(uniqueId += 1)}`;
  protected readonly labelledBy = computed(() =>
    this.layout() === 'split' && this.heading() ? this.headingId : null,
  );
}
