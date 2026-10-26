import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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

/** Matches the projected control the tooltip describes. */
const FOCUSABLE_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Grace period before a mouse-out hides the tooltip, long enough to cross the gap onto the popup itself. */
const HIDE_DELAY_MS = 150;

/**
 * Accessible tooltip that wraps its trigger via content projection and shows
 * a short description on hover *and* focus (never hover-only, so keyboard
 * and touch users still get it). No native element covers this pattern, so
 * it follows the WAI-ARIA tooltip pattern: the popup has `role="tooltip"`
 * and the trigger references it with `aria-describedby` while it's open.
 * That reference goes on the projected focusable control itself (falling
 * back to the host when nothing inside is focusable), since a description on
 * the non-interactive `<ds-tooltip>` wrapper is never announced.
 *
 * Mouse-out hides it after a short delay that re-entering cancels, so the
 * pointer can move from the trigger onto the popup without it vanishing
 * (WCAG 1.4.13); Escape and focus-out still hide it at once.
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
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hideAfterDelay()',
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
  private hideTimeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    effect((onCleanup) => {
      const popoverEl = this.popoverRef().nativeElement;

      if (this.shouldBeOpen()) {
        if (!this.isOpen) {
          this.showPopover(popoverEl);
          this.setDescribedBy(true);
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
        this.setDescribedBy(false);
        this.isOpen = false;
      }
    });

    inject(DestroyRef).onDestroy(() => clearTimeout(this.hideTimeoutId));
  }

  protected show(): void {
    clearTimeout(this.hideTimeoutId);
    if (this.canShow()) {
      this.visible.set(true);
    }
  }

  protected hide(): void {
    clearTimeout(this.hideTimeoutId);
    this.visible.set(false);
  }

  protected hideAfterDelay(): void {
    clearTimeout(this.hideTimeoutId);
    this.hideTimeoutId = setTimeout(() => this.visible.set(false), HIDE_DELAY_MS);
  }

  /** Adds or removes this tooltip's id on the trigger's `aria-describedby`, keeping any ids the caller already set. */
  private setDescribedBy(describe: boolean): void {
    const host: HTMLElement = this.hostRef.nativeElement;
    const trigger = host.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? host;
    const ids = (trigger.getAttribute('aria-describedby') ?? '').split(/\s+/).filter((id) => id && id !== this.tooltipId);
    if (describe) {
      ids.push(this.tooltipId);
    }
    if (ids.length) {
      trigger.setAttribute('aria-describedby', ids.join(' '));
    } else {
      trigger.removeAttribute('aria-describedby');
    }
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
