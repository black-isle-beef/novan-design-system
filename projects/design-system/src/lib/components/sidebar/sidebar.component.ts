import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { SidebarItem } from '../../models/nav-item.model';
import { isExternalLink } from '../../utils/link.util';

/**
 * Collapsible side navigation with `aria-current="page"` active-route
 * indication and a labeled toggle button for collapsing/expanding the rail.
 */
@Component({
  selector: 'ds-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-sidebar',
    '[class.ds-sidebar--open]': '!collapsed()',
  },
})
export class DsSidebarComponent {
  /** Sidebar navigation entries. */
  readonly items = input.required<SidebarItem[]>();
  /** Accessible label for the `<nav>` landmark. */
  readonly ariaLabel = input('Sidebar');
  /** Emits the new collapsed state whenever the user toggles the sidebar. */
  readonly collapsedChange = output<boolean>();

  protected readonly isExternalLink = isExternalLink;

  protected readonly collapsed = signal(false);

  protected toggleCollapsed(): void {
    this.collapsed.update((value) => !value);
    this.collapsedChange.emit(this.collapsed());
  }
}
