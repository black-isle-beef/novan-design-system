import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsTabComponent } from './tab.component';
import { DsTabsComponent, type DsTabsRenderMode } from './tabs.component';

@Component({
  standalone: true,
  imports: [DsTabsComponent, DsTabComponent],
  template: `
    <ds-tabs
      [activeIndex]="activeIndex()"
      [renderMode]="renderMode()"
      (activeIndexChange)="onActiveIndexChange($event)"
    >
      <ds-tab label="Profile"><p>Profile content</p></ds-tab>
      <ds-tab label="Billing" [disabled]="billingDisabled()"><p>Billing content</p></ds-tab>
      <ds-tab label="Settings"><p>Settings content</p></ds-tab>
    </ds-tabs>
  `,
})
class HostComponent {
  // Signals, not plain fields: under zoneless change detection a plain field
  // mutation never marks the view dirty, so a later `fixture.detectChanges()`
  // is a no-op (and a synchronous native-event handler that reads the child's
  // input in between would still see the stale value). Writing through a
  // signal notifies the scheduler so `detectChanges()` actually re-runs.
  readonly activeIndex = signal(0);
  readonly renderMode = signal<DsTabsRenderMode>('lazy');
  readonly billingDisabled = signal(false);
  onActiveIndexChange = vi.fn();
}

describe('DsTabsComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const tablist = fixture.nativeElement.querySelector('[role="tablist"]') as HTMLElement;
    const tabButtons = () => Array.from(fixture.nativeElement.querySelectorAll('.ds-tabs__tab')) as HTMLButtonElement[];
    const panels = () => Array.from(fixture.nativeElement.querySelectorAll('.ds-tab-panel')) as HTMLElement[];
    return { fixture, tablist, tabButtons, panels };
  }

  it('generates one tab button per ds-tab, labeled from each tab', async () => {
    const { tabButtons } = await createFixture();
    expect(tabButtons().map((button) => button.textContent?.trim())).toEqual(['Profile', 'Billing', 'Settings']);
  });

  it('marks the tab at activeIndex as selected and shows its panel', async () => {
    const { tabButtons, panels } = await createFixture();
    expect(tabButtons()[0].getAttribute('aria-selected')).toBe('true');
    expect(tabButtons()[1].getAttribute('aria-selected')).toBe('false');
    expect(panels()[0].hidden).toBe(false);
    expect(panels()[1].hidden).toBe(true);
  });

  it('only the selected tab button is in the tab order (roving tabindex)', async () => {
    const { tabButtons } = await createFixture();
    expect(tabButtons().map((button) => button.getAttribute('tabindex'))).toEqual(['0', '-1', '-1']);
  });

  it('clicking a tab selects it, moves its panel into view, and emits activeIndexChange', async () => {
    const { fixture, tabButtons, panels } = await createFixture();
    tabButtons()[2].click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tabButtons()[2].getAttribute('aria-selected')).toBe('true');
    expect(panels()[2].hidden).toBe(false);
    expect(fixture.componentInstance.onActiveIndexChange).toHaveBeenCalledWith(2);
  });

  it('ArrowRight/ArrowLeft move roving focus and selection, wrapping around', async () => {
    const { fixture, tablist, tabButtons } = await createFixture();

    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement).toBe(tabButtons()[1]);

    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement).toBe(tabButtons()[0]);

    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement).toBe(tabButtons()[2]); // wraps to the last tab
  });

  it('ArrowRight skips a disabled tab', async () => {
    const { fixture, tablist, tabButtons } = await createFixture();
    fixture.componentInstance.billingDisabled.set(true);
    fixture.detectChanges();

    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.activeElement).toBe(tabButtons()[2]); // Billing (index 1) is skipped
  });

  it('Home/End jump to the first/last enabled tab', async () => {
    const { fixture, tablist, tabButtons } = await createFixture();

    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement).toBe(tabButtons()[2]);

    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement).toBe(tabButtons()[0]);
  });

  it('reflects an externally changed activeIndex input', async () => {
    const { fixture, tabButtons, panels } = await createFixture();

    fixture.componentInstance.activeIndex.set(1);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tabButtons()[1].getAttribute('aria-selected')).toBe('true');
    expect(panels()[1].hidden).toBe(false);
  });

  it('renderMode="eager" renders every panel up front', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.renderMode.set('eager');
    fixture.detectChanges();
    await fixture.whenStable();

    const panels = Array.from(fixture.nativeElement.querySelectorAll('.ds-tab-panel')) as HTMLElement[];
    expect(panels[1].querySelector('p')?.textContent).toContain('Billing content');
    expect(panels[2].querySelector('p')?.textContent).toContain('Settings content');
  });

  it('renderMode="lazy" (default) never instantiates an unvisited tab\'s content', async () => {
    const { panels } = await createFixture();
    expect(panels()[2].querySelector('p')).toBeNull();
  });
});
