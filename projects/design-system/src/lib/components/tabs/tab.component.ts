import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

let nextTabId = 0;

/**
 * A single tab panel. The parent `ds-tabs` generates the tablist buttons
 * from this component's `label()`/`disabled()` and drives its active state
 * by calling `setActive()` directly on the queried instances — it doesn't
 * own this component's projected template, so it can't bind inputs on it
 * the way it would on an element in its own template.
 *
 * Panel content is deferred until the tab is first activated (`@defer` on
 * the projected content in the template), so an inactive tab's content
 * isn't even instantiated until it's needed; `ds-tabs`'s `renderMode="eager"`
 * forces every tab's content to render up front instead.
 */
@Component({
  selector: 'ds-tab',
  standalone: true,
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-tab-panel',
    role: 'tabpanel',
    tabindex: '0',
    '[id]': 'panelId',
    '[attr.aria-labelledby]': 'tabId',
    '[hidden]': '!active()',
  },
})
export class DsTabComponent {
  /** Text shown in the generated tab button. */
  readonly label = input.required<string>();
  readonly disabled = input(false);

  protected readonly active = signal(false);
  protected readonly rendered = signal(false);

  readonly tabId = `ds-tab-${nextTabId}`;
  readonly panelId = `ds-tab-panel-${nextTabId++}`;

  /** Called by the parent ds-tabs to mark this tab active/inactive. */
  setActive(active: boolean): void {
    this.active.set(active);
    if (active) {
      this.rendered.set(true);
    }
  }

  /** Called by the parent ds-tabs in `renderMode="eager"` to render every panel up front. */
  forceRender(): void {
    this.rendered.set(true);
  }
}
