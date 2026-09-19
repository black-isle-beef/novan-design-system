import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  contentChildren,
  effect,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { DsTabComponent } from './tab.component';

export type DsTabsRenderMode = 'eager' | 'lazy';

/**
 * WAI-ARIA Tabs pattern: a generated `role="tablist"` of buttons with roving
 * tabindex and arrow-key/Home/End navigation, each controlling a projected
 * `ds-tab`'s `role="tabpanel"`.
 *
 * `renderMode="lazy"` (the default) defers a tab's panel content until it's
 * first activated; `"eager"` renders every panel's content up front and
 * relies on `[hidden]` alone to switch between them.
 */
@Component({
  selector: 'ds-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-tabs',
  },
})
export class DsTabsComponent {
  /** Index of the selected tab. Bind with `[(activeIndex)]` for two-way sync. */
  readonly activeIndex = input(0);
  readonly renderMode = input<DsTabsRenderMode>('lazy');
  /** Accessible name for the tablist, needed when it isn't preceded by a visible heading. */
  readonly ariaLabel = input<string | null>(null);

  /** Emits the new selected index; pair with `activeIndex` for `[(activeIndex)]="index"`. */
  readonly activeIndexChange = output<number>();

  protected readonly tabs = contentChildren(DsTabComponent);
  protected readonly currentIndex = signal(0);

  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      const index = this.clampIndex(this.activeIndex(), tabs);
      this.currentIndex.set(index);
      tabs.forEach((tab, i) => tab.setActive(i === index));
      if (this.renderMode() === 'eager') {
        tabs.forEach((tab) => tab.forceRender());
      }
    });
  }

  protected selectIndex(index: number): void {
    const tabs = this.tabs();
    const clamped = this.clampIndex(index, tabs);
    this.currentIndex.set(clamped);
    tabs.forEach((tab, i) => tab.setActive(i === clamped));
    this.activeIndexChange.emit(clamped);
  }

  protected handleTablistKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.moveSelection(this.nextEnabledIndex(1));
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.moveSelection(this.nextEnabledIndex(-1));
        break;
      case 'Home':
        event.preventDefault();
        this.moveSelection(this.firstEnabledIndex());
        break;
      case 'End':
        event.preventDefault();
        this.moveSelection(this.lastEnabledIndex());
        break;
    }
  }

  private moveSelection(index: number | null): void {
    if (index === null) {
      return;
    }
    this.selectIndex(index);
    this.tabButtons()[index]?.nativeElement.focus();
  }

  private nextEnabledIndex(direction: 1 | -1): number | null {
    const tabs = this.tabs();
    const count = tabs.length;
    if (!count) {
      return null;
    }
    for (let offset = 1; offset <= count; offset++) {
      const index = (((this.currentIndex() + direction * offset) % count) + count) % count;
      if (!tabs[index].disabled()) {
        return index;
      }
    }
    return null;
  }

  private firstEnabledIndex(): number | null {
    const index = this.tabs().findIndex((tab) => !tab.disabled());
    return index >= 0 ? index : null;
  }

  private lastEnabledIndex(): number | null {
    const tabs = this.tabs();
    for (let i = tabs.length - 1; i >= 0; i--) {
      if (!tabs[i].disabled()) {
        return i;
      }
    }
    return null;
  }

  private clampIndex(index: number, tabs: readonly DsTabComponent[]): number {
    if (!tabs.length) {
      return 0;
    }
    return Math.min(Math.max(index, 0), tabs.length - 1);
  }
}
