import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

export type DsTooltipPosition = 'top' | 'bottom' | 'start' | 'end';

let nextTooltipId = 0;

/**
 * Accessible tooltip that wraps its trigger via content projection and shows
 * a short description on hover *and* focus (never hover-only, so keyboard
 * and touch users still get it). No native element covers this pattern, so
 * it follows the WAI-ARIA tooltip pattern: the popup has `role="tooltip"`
 * and the trigger references it with `aria-describedby` while it's open.
 *
 * The popup itself is a native `popover="manual"` element, which — like the
 * modal's `<dialog>` — gets top-layer stacking for free, so it's never
 * clipped by an `overflow: hidden` ancestor. Position is computed from the
 * trigger's bounding rect and flips to the opposite side if it would
 * overflow the viewport.
 */
@Component({
  selector: 'ds-tooltip',
  standalone: true,
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-tooltip-trigger',
    '[attr.aria-describedby]': 'shouldBeOpen() ? tooltipId : null',
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focusin)': 'show()',
    '(focusout)': 'hide()',
    '(keydown.escape)': 'hide()',
  },
})
export class DsTooltipComponent {
  /** Tooltip text. A tooltip never renders while this is empty, since it must never be the sole carrier of essential info. */
  readonly content = input<string | null>(null);
  /** Preferred side; flips to the opposite side when it would overflow the viewport. */
  readonly position = input<DsTooltipPosition>('top');
  readonly disabled = input(false);

  protected readonly tooltipId = `ds-tooltip-${nextTooltipId++}`;
  protected readonly resolvedPosition = signal<DsTooltipPosition>('top');

  private readonly popoverRef = viewChild.required<ElementRef<HTMLElement>>('popover');
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly visible = signal(false);
  private readonly canShow = computed(() => !this.disabled() && !!this.content());
  protected readonly shouldBeOpen = computed(() => this.visible() && this.canShow());
  private isOpen = false;

  constructor() {
    effect((onCleanup) => {
      const popoverEl = this.popoverRef().nativeElement;

      if (this.shouldBeOpen()) {
        if (!this.isOpen) {
          this.showPopover(popoverEl);
          this.isOpen = true;
        }
        this.updatePosition(popoverEl);

        const reposition = () => this.updatePosition(popoverEl);
        window.addEventListener('scroll', reposition, true);
        window.addEventListener('resize', reposition);
        onCleanup(() => {
          window.removeEventListener('scroll', reposition, true);
          window.removeEventListener('resize', reposition);
        });
      } else if (this.isOpen) {
        this.hidePopover(popoverEl);
        this.isOpen = false;
      }
    });
  }

  protected show(): void {
    if (this.canShow()) {
      this.visible.set(true);
    }
  }

  protected hide(): void {
    this.visible.set(false);
  }

  private updatePosition(popoverEl: HTMLElement): void {
    const triggerRect = this.hostRef.nativeElement.getBoundingClientRect();
    const popoverRect = popoverEl.getBoundingClientRect();
    const gap = 8;

    let position = this.position();
    if (position === 'top' && triggerRect.top - popoverRect.height - gap < 0) {
      position = 'bottom';
    } else if (position === 'bottom' && triggerRect.bottom + popoverRect.height + gap > window.innerHeight) {
      position = 'top';
    } else if (position === 'start' && triggerRect.left - popoverRect.width - gap < 0) {
      position = 'end';
    } else if (position === 'end' && triggerRect.right + popoverRect.width + gap > window.innerWidth) {
      position = 'start';
    }
    this.resolvedPosition.set(position);

    let top: number;
    let left: number;
    switch (position) {
      case 'bottom':
        top = triggerRect.bottom + gap;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case 'start':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.left - popoverRect.width - gap;
        break;
      case 'end':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.right + gap;
        break;
      case 'top':
      default:
        top = triggerRect.top - popoverRect.height - gap;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
    }

    left = Math.max(gap, Math.min(left, window.innerWidth - popoverRect.width - gap));
    top = Math.max(gap, top);

    popoverEl.style.insetBlockStart = `${top}px`;
    popoverEl.style.insetInlineStart = `${left}px`;
  }

  // The Popover API has been broadly supported in evergreen browsers since
  // 2024, but these guards keep an unsupported environment (an older
  // browser, or a test DOM) from throwing instead of just not showing.
  private showPopover(popoverEl: HTMLElement): void {
    if (typeof popoverEl.showPopover === 'function') {
      popoverEl.showPopover();
    }
  }

  private hidePopover(popoverEl: HTMLElement): void {
    if (typeof popoverEl.hidePopover === 'function') {
      popoverEl.hidePopover();
    }
  }
}
