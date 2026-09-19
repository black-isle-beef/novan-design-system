import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  contentChildren,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DsMenuItemComponent } from './menu-item.component';

export type DsDropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

let nextDropdownId = 0;

/**
 * WAI-ARIA "Menu Button" pattern: a trigger button with `aria-haspopup="menu"`
 * that opens a `role="menu"` list of `ds-menu-item`s, with roving tabindex and
 * arrow-key/Home/End/typeahead navigation.
 *
 * The trigger uses the native `popovertarget`/`popovertargetaction="toggle"`
 * invoker attributes to open/close the menu (a native `popover="auto"`
 * element), which gets top-layer stacking, outside-click light-dismiss, and
 * Escape-to-close for free from the browser — the same trick the modal and
 * tooltip use for their own native overlay elements, just via the invoker
 * attributes instead of an imperative call. Arrow keys on the closed trigger,
 * and all in-menu keyboard navigation, still go through the component since
 * no native element covers that part of the pattern.
 */
@Component({
  selector: 'ds-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-dropdown',
  },
})
export class DsDropdownComponent {
  /** Trigger button text; ignored when `[dsDropdownTrigger]` content is projected instead. */
  readonly label = input<string>('');
  readonly position = input<DsDropdownPosition>('bottom-start');
  readonly disabled = input(false);
  /** Whether the menu is open. Bind with `[(open)]` for two-way sync. */
  readonly open = input(false);

  /** Emits the new open state; pair with `open` for `[(open)]="isOpen"`. */
  readonly openChange = output<boolean>();

  protected readonly menuId = `ds-dropdown-menu-${nextDropdownId++}`;
  protected readonly isOpen = signal(false);

  private readonly menuRef = viewChild.required<ElementRef<HTMLElement>>('menu');
  private readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly items = contentChildren(DsMenuItemComponent);

  private isOpenNow = false;
  private pendingFocus: 'first' | 'last' | null = null;
  private previouslyFocused: HTMLElement | null = null;
  private activeIndex = -1;
  private typeaheadBuffer = '';
  private typeaheadTimeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    // Keeps the native popover's imperative open/closed state in sync with
    // the `open` input, the same way the modal syncs `open` to `<dialog>`.
    effect(() => {
      const menuEl = this.menuRef().nativeElement;
      if (this.open()) {
        if (!this.isOpenNow) {
          menuEl.showPopover?.();
        }
      } else if (this.isOpenNow) {
        menuEl.hidePopover?.();
      }
    });

    // Subscribes to whichever `ds-menu-item`s are currently projected — this
    // component doesn't own their template, so it can't bind `(activated)`
    // on them directly and instead reacts to the live content-children query.
    effect((onCleanup) => {
      const subscriptions = this.items().map((item) => item.activated.subscribe(() => this.close()));
      onCleanup(() => subscriptions.forEach((subscription) => subscription.unsubscribe()));
    });

    // The menu is a top-layer popover, so it isn't positioned by normal flow;
    // anchor it to the trigger's current rect while open, same approach as
    // the tooltip's viewport-relative positioning.
    effect((onCleanup) => {
      if (!this.isOpen()) {
        return;
      }
      const reposition = () => this.updateMenuPosition();
      reposition();
      window.addEventListener('scroll', reposition, true);
      window.addEventListener('resize', reposition);
      onCleanup(() => {
        window.removeEventListener('scroll', reposition, true);
        window.removeEventListener('resize', reposition);
      });
    });
  }

  private updateMenuPosition(): void {
    const menuEl = this.menuRef().nativeElement;
    const triggerRect = this.triggerRef().nativeElement.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();
    const gap = 4;

    const top =
      this.position() === 'top-start' || this.position() === 'top-end'
        ? triggerRect.top - gap - menuRect.height
        : triggerRect.bottom + gap;
    const left =
      this.position() === 'bottom-end' || this.position() === 'top-end'
        ? triggerRect.right - menuRect.width
        : triggerRect.left;

    menuEl.style.insetBlockStart = `${top}px`;
    menuEl.style.insetInlineStart = `${left}px`;
  }

  protected handleTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.isOpenNow) {
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.pendingFocus = 'first';
      this.menuRef().nativeElement.showPopover?.();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.pendingFocus = 'last';
      this.menuRef().nativeElement.showPopover?.();
    }
  }

  protected handleMenuKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevious();
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirst();
        break;
      case 'End':
        event.preventDefault();
        this.focusLast();
        break;
      case 'Tab':
        this.close();
        break;
      default:
        if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
          this.handleTypeahead(event.key);
        }
    }
  }

  /** Fired by the native popover on every open/close, however it happened (invoker click, Escape, outside click, or our own calls). */
  protected handleToggle(event: ToggleEvent): void {
    this.isOpenNow = event.newState === 'open';
    this.isOpen.set(this.isOpenNow);

    if (this.isOpenNow) {
      this.previouslyFocused = document.activeElement as HTMLElement | null;
      const focusTarget = this.pendingFocus ?? 'first';
      this.pendingFocus = null;
      if (focusTarget === 'last') {
        this.focusLast();
      } else {
        this.focusFirst();
      }
    } else {
      this.previouslyFocused?.focus();
      this.previouslyFocused = null;
      this.activeIndex = -1;
    }

    this.openChange.emit(this.isOpenNow);
  }

  private close(): void {
    if (this.isOpenNow) {
      this.menuRef().nativeElement.hidePopover?.();
    }
  }

  private focusFirst(): void {
    const items = this.items();
    const index = items.findIndex((item) => !item.disabled());
    if (index >= 0) {
      this.moveFocus(items, index);
    }
  }

  private focusLast(): void {
    const items = this.items();
    for (let i = items.length - 1; i >= 0; i--) {
      if (!items[i].disabled()) {
        this.moveFocus(items, i);
        return;
      }
    }
  }

  private focusNext(): void {
    const items = this.items();
    const count = items.length;
    for (let offset = 1; offset <= count; offset++) {
      const index = (this.activeIndex + offset) % count;
      if (!items[index].disabled()) {
        this.moveFocus(items, index);
        return;
      }
    }
  }

  private focusPrevious(): void {
    const items = this.items();
    const count = items.length;
    for (let offset = 1; offset <= count; offset++) {
      const index = (((this.activeIndex - offset) % count) + count) % count;
      if (!items[index].disabled()) {
        this.moveFocus(items, index);
        return;
      }
    }
  }

  private moveFocus(items: readonly DsMenuItemComponent[], index: number): void {
    items.forEach((item, i) => item.setTabbable(i === index));
    items[index]?.focus();
    this.activeIndex = index;
  }

  private handleTypeahead(char: string): void {
    clearTimeout(this.typeaheadTimeoutId);
    this.typeaheadBuffer += char.toLowerCase();
    this.typeaheadTimeoutId = setTimeout(() => (this.typeaheadBuffer = ''), 500);

    const items = this.items();
    const count = items.length;
    for (let offset = 1; offset <= count; offset++) {
      const index = (this.activeIndex + offset) % count;
      const item = items[index];
      if (!item.disabled() && item.label.toLowerCase().startsWith(this.typeaheadBuffer)) {
        this.moveFocus(items, index);
        return;
      }
    }
  }
}
