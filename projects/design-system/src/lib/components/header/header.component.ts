import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DsMainNavComponent } from '../main-nav/main-nav.component';
import type { NavItem } from '../../models/nav-item.model';

/** `site`: the marketing-site header. `app`: one compact row for application shells. */
export type DsHeaderVariant = 'site' | 'app';

/**
 * Structural site header. Renders the `banner` landmark, a projected
 * branding slot, an integrated `DsMainNavComponent`, and a trailing
 * `[dsActions]` slot for controls such as a theme toggle.
 *
 * The `app` variant is a single compact row (brand, nav, actions) with the nav
 * rendered as pills; the active item sits on the raised surface with
 * `aria-current="page"`. Below the `md` breakpoint its nav collapses into the
 * menu button (the `site` variant collapses below `lg`).
 *
 * Includes a "Skip to main content" link (visible on focus) that targets
 * `#ds-main-content` — the consuming page must give its `<main>` landmark
 * that id, or the skip link will silently go nowhere. `DsLandingPageComponent`
 * already sets this id on its own `<main>`.
 */
@Component({
  selector: 'ds-header',
  standalone: true,
  imports: [DsMainNavComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-header',
    '[class.ds-header--app]': 'app()',
  },
})
export class DsHeaderComponent {
  /** Navigation entries forwarded to the internal `DsMainNavComponent`. */
  readonly navItems = input.required<NavItem[]>();
  /** `app` renders one compact row with pill navigation, for application shells. */
  readonly variant = input<DsHeaderVariant>('site');

  protected readonly app = computed(() => this.variant() === 'app');
}
