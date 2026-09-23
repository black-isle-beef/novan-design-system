import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DsMainNavComponent } from '../main-nav/main-nav.component';
import type { NavItem } from '../../models/nav-item.model';

/**
 * Structural site header. Renders the `banner` landmark, a projected
 * branding slot, an integrated `DsMainNavComponent`, and a trailing
 * `[dsActions]` slot for controls such as a theme toggle.
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
  },
})
export class DsHeaderComponent {
  /** Navigation entries forwarded to the internal `DsMainNavComponent`. */
  readonly navItems = input.required<NavItem[]>();
}
