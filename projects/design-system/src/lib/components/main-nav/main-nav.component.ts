import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { NavItem } from '../../models/nav-item.model';
import { isExternalLink } from '../../utils/link.util';

/** `default`: site navigation, collapsing below `lg`. `pills`: compact app navigation, collapsing below `md`. */
export type DsMainNavVariant = 'default' | 'pills';

/**
 * Accessible primary navigation bar with desktop dropdown support and a
 * keyboard-navigable mobile toggle. Implements the WAI-ARIA disclosure
 * pattern for dropdowns and the navigation-menu pattern for the mobile toggle.
 */
@Component({
  selector: 'ds-main-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-main-nav',
    '[class.ds-main-nav--pills]': 'pills()',
  },
})
export class DsMainNavComponent {
  /** Top-level navigation entries, each optionally with dropdown `children`. */
  readonly items = input.required<NavItem[]>();
  /** Accessible label for the `<nav>` landmark (distinguishes multiple navs on a page). */
  readonly ariaLabel = input('Primary');
  /** `pills` renders a compact row of pill links (the active one on a raised surface) that collapses below `md`. */
  readonly variant = input<DsMainNavVariant>('default');

  protected readonly pills = computed(() => this.variant() === 'pills');

  protected readonly isExternalLink = isExternalLink;

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
