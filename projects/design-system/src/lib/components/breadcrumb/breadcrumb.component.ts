import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { BreadcrumbItem } from '../../models/nav-item.model';
import { isExternalLink } from '../../utils/link.util';

/**
 * Accessible breadcrumb trail. Every item but the last renders as a link,
 * optionally paired with a leading icon; the last item renders as the
 * non-interactive current page, underlined, with `aria-current="page"`.
 */
@Component({
  selector: 'ds-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-breadcrumb',
  },
})
export class DsBreadcrumbComponent {
  /** Ordered breadcrumb trail; the last entry is treated as the current page. */
  readonly items = input.required<BreadcrumbItem[]>();
  /** Accessible label for the `<nav>` landmark. */
  readonly ariaLabel = input('Breadcrumb');

  protected readonly isExternalLink = isExternalLink;
}
