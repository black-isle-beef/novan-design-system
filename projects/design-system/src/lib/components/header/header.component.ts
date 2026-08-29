import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DsMainNavComponent } from '../main-nav/main-nav.component';
import type { NavItem } from '../../models/nav-item.model';

/**
 * Structural site header. Renders the `banner` landmark, a projected
 * branding slot, and an integrated `DsMainNavComponent`.
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
