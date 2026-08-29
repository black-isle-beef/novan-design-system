import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FooterLinkGroup } from '../../models/nav-item.model';

/**
 * Multi-column responsive footer with grouped links, a copyright notice,
 * and a slot for additional legal disclaimers.
 */
@Component({
  selector: 'ds-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-footer',
  },
})
export class DsFooterComponent {
  /** Grouped link columns rendered before the copyright/legal row. */
  readonly linkGroups = input<FooterLinkGroup[]>([]);
  /** Company/organization name interpolated into the copyright line. */
  readonly organizationName = input.required<string>();

  protected readonly currentYear = new Date().getFullYear();
}
