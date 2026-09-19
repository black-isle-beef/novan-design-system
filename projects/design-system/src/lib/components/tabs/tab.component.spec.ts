import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsTabComponent } from './tab.component';

@Component({
  standalone: true,
  imports: [DsTabComponent],
  template: `
    <ds-tab [label]="label" [disabled]="disabled">
      <p>Panel body</p>
    </ds-tab>
  `,
})
class HostComponent {
  label = 'Profile';
  disabled = false;
}

describe('DsTabComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const tabEl = fixture.nativeElement.querySelector('ds-tab') as HTMLElement;
    const tab = fixture.debugElement.children[0].componentInstance as DsTabComponent;
    return { fixture, tabEl, tab };
  }

  it('renders as a hidden role="tabpanel" by default', async () => {
    const { tabEl } = await createFixture();
    expect(tabEl.getAttribute('role')).toBe('tabpanel');
    expect(tabEl.hidden).toBe(true);
  });

  it('exposes unique, linked tabId/panelId', async () => {
    const { tabEl, tab } = await createFixture();
    expect(tabEl.id).toBe(tab.panelId);
    expect(tabEl.getAttribute('aria-labelledby')).toBe(tab.tabId);
    expect(tab.panelId).not.toBe(tab.tabId);
  });

  it('defers panel content until setActive(true) is called', async () => {
    const { fixture, tabEl, tab } = await createFixture();
    expect(tabEl.querySelector('p')).toBeNull();

    tab.setActive(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tabEl.hidden).toBe(false);
    expect(tabEl.querySelector('p')?.textContent).toContain('Panel body');
  });

  it('keeps content rendered (but hidden) once deactivated again', async () => {
    const { fixture, tabEl, tab } = await createFixture();
    tab.setActive(true);
    fixture.detectChanges();
    await fixture.whenStable();

    tab.setActive(false);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tabEl.hidden).toBe(true);
    expect(tabEl.querySelector('p')).not.toBeNull();
  });

  it('forceRender() renders content while still inactive, for eager mode', async () => {
    const { fixture, tabEl, tab } = await createFixture();

    tab.forceRender();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tabEl.hidden).toBe(true);
    expect(tabEl.querySelector('p')?.textContent).toContain('Panel body');
  });
});
