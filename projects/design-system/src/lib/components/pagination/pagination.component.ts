import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type DsPaginationItem = number | 'ellipsis';

/**
 * Angular wrapper around Bootstrap's `.pagination` CSS. Page controls are
 * native `<button>`s (this is action-based navigation that typically drives
 * a data fetch, not a route change, so there's no `href`/`routerLink` here —
 * see `DsBreadcrumbComponent`/`DsSidebarComponent` for the link-based case).
 * The current page gets `aria-current="page"`; every button gets a
 * descriptive `aria-label`. Bind `[(page)]` for two-way sync, or `page` +
 * `(pageChange)` to control it externally (e.g. keep it in sync with a
 * `page` query param).
 */
@Component({
  selector: 'ds-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-pagination',
  },
})
export class DsPaginationComponent {
  /** Current page, 1-indexed. */
  readonly page = input(1);
  readonly totalPages = input.required<number>();
  /** How many page numbers to show on each side of the current page before collapsing into an ellipsis. */
  readonly siblingCount = input(1);
  /** Accessible label for the `<nav>` landmark. */
  readonly ariaLabel = input('Pagination');

  /** Emits the requested page; pair with `page` for `[(page)]="currentPage"`. */
  readonly pageChange = output<number>();

  protected readonly pageItems = computed<DsPaginationItem[]>(() => {
    const total = Math.max(this.totalPages(), 1);
    const current = this.clamp(this.page(), 1, total);
    const siblings = Math.max(this.siblingCount(), 0);

    // First + last + current + up to two siblings each side + up to two
    // ellipses: below this count there's no truncation to do at all.
    const minPagesBeforeTruncation = siblings * 2 + 5;
    if (total <= minPagesBeforeTruncation) {
      return this.range(1, total);
    }

    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);
    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftItemCount = 3 + siblings * 2;
      return [...this.range(1, leftItemCount), 'ellipsis', total];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightItemCount = 3 + siblings * 2;
      return [1, 'ellipsis', ...this.range(total - rightItemCount + 1, total)];
    }

    return [1, 'ellipsis', ...this.range(leftSibling, rightSibling), 'ellipsis', total];
  });

  protected goTo(target: number): void {
    const clamped = this.clamp(target, 1, Math.max(this.totalPages(), 1));
    if (clamped !== this.page()) {
      this.pageChange.emit(clamped);
    }
  }

  private range(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
