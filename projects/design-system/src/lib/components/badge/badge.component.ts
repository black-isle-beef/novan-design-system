import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

export type DsBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * Small presentational label for a status, category, or filter — badge, tag,
 * or pill depending on context. Purely decorative by default (no ARIA role);
 * when `dismissible`, an inline close button lets the reader remove it
 * (e.g. a selected filter chip), emitting `dismissed` for the caller to act
 * on rather than removing itself, since a tag's presence is normally driven
 * by the surrounding list, not local state.
 */
@Component({
  selector: 'ds-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-badge',
    '[class.ds-badge--primary]': "variant() === 'primary'",
    '[class.ds-badge--secondary]': "variant() === 'secondary'",
    '[class.ds-badge--success]': "variant() === 'success'",
    '[class.ds-badge--warning]': "variant() === 'warning'",
    '[class.ds-badge--danger]': "variant() === 'danger'",
    '[class.ds-badge--info]': "variant() === 'info'",
    '[class.ds-badge--neutral]': "variant() === 'neutral'",
  },
})
export class DsBadgeComponent {
  readonly variant = input<DsBadgeVariant>('neutral');
  /** Whether a close button is rendered, letting the reader request removal. Works as a bare attribute, e.g. `<ds-badge dismissible>`. */
  readonly dismissible = input(false, { transform: booleanAttribute });
  /** Accessible label for the close button; should name what's being removed, e.g. "Remove Draft filter". */
  readonly closeButtonLabel = input('Remove');

  /** Fires when the close button is activated; the caller removes this badge from its own data, the badge doesn't remove itself. */
  readonly dismissed = output<void>();

  protected requestDismiss(): void {
    this.dismissed.emit();
  }
}
