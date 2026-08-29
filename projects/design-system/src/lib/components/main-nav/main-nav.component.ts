import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import type { NavItem } from '../../models/nav-item.model';

/**
 * Accessible primary navigation bar with desktop dropdown support and a
 * keyboard-navigable mobile toggle. Implements the WAI-ARIA disclosure
 * pattern for dropdowns and the navigation-menu pattern for the mobile toggle.
 */
@Component({
  selector: 'ds-main-nav',
  standalone: true,
  templateUrl: './main-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-main-nav',
  },
})
export class DsMainNavComponent {
  /** Top-level navigation entries, each optionally with dropdown `children`. */
  readonly items = input.required<NavItem[]>();
  /** Accessible label for the `<nav>` landmark (distinguishes multiple navs on a page). */
  readonly ariaLabel = input('Primary');

  protected readonly mobileOpen = signal(false);
  protected readonly openDropdownIndex = signal<number | null>(null);

  protected toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  protected toggleDropdown(index: number): void {
    this.openDropdownIndex.update((current) => (current === index ? null : index));
  }

  protected closeDropdown(): void {
    this.openDropdownIndex.set(null);
  }

  protected onDropdownKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Escape') {
      this.closeDropdown();
    } else if (event.key === 'ArrowDown' && this.openDropdownIndex() !== index) {
      event.preventDefault();
      this.toggleDropdown(index);
    }
  }
}
