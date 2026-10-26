import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { NavItem } from '../../models/nav-item.model';
import { isExternalLink } from '../../utils/link.util';

/** `default`: site navigation, collapsing below `lg`. `pills`: compact app navigation, collapsing below `md`. */
export type DsMainNavVariant = 'default' | 'pills';

let nextMainNavId = 0;

/**
 * Accessible primary navigation bar with desktop dropdown support and a
 * keyboard-navigable mobile toggle. Implements the WAI-ARIA disclosure
 * pattern for dropdowns and the navigation-menu pattern for the mobile toggle.
 *
 * Escape closes the open dropdown, or else the open mobile menu, and returns
 * focus to the button that opened it. Following a link closes both.
 */
@Component({
  selector: 'ds-main-nav',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './main-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-main-nav',
    '[class.ds-main-nav--pills]': 'pills()',
    '(keydown.escape)': 'onEscape()',
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

  /** Unique per instance, so `aria-controls` never resolves to another nav's menu on the same page. */
  protected readonly menuId = `ds-main-nav-menu-${nextMainNavId++}`;

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  protected dropdownId(index: number): string {
    return `${this.menuId}-dropdown-${index}`;
  }

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
    if (event.key === 'ArrowDown' && this.openDropdownIndex() !== index) {
      event.preventDefault();
      this.toggleDropdown(index);
    }
  }

  /** Closes the innermost open menu and puts focus back on the button that opened it. */
  protected onEscape(): void {
    const dropdown = this.openDropdownIndex();
    if (dropdown !== null) {
      this.closeDropdown();
      this.focus(`[aria-controls="${this.dropdownId(dropdown)}"]`);
    } else if (this.mobileOpen()) {
      this.mobileOpen.set(false);
      this.focus('.ds-main-nav__toggle');
    }
  }

  /** A followed link leaves the page (or the in-app view) behind, so no menu should stay open over it. */
  protected closeMenus(): void {
    this.closeDropdown();
    this.mobileOpen.set(false);
  }

  private focus(selector: string): void {
    this.host.nativeElement.querySelector<HTMLElement>(selector)?.focus();
  }
}
