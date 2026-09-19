import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsTooltipComponent, type DsTooltipPosition } from './tooltip.component';

@Component({
  standalone: true,
  imports: [DsTooltipComponent],
  template: `
    <ds-tooltip [content]="content" [position]="position" [disabled]="disabled">
      <button>Trigger</button>
    </ds-tooltip>
  `,
})
class HostComponent {
  content: string | null = 'Helpful hint';
  position: DsTooltipPosition = 'top';
  disabled = false;
}

function mockRect(el: Element, rect: Partial<DOMRect>): void {
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...rect,
  } as DOMRect);
}

describe('DsTooltipComponent', () => {
  async function createFixture(overrides: Partial<HostComponent> = {}) {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, overrides);
    fixture.detectChanges();
    const tooltipHost = fixture.nativeElement.querySelector('ds-tooltip') as HTMLElement;
    const popover = tooltipHost.querySelector('.ds-tooltip') as HTMLElement;
    return { fixture, tooltipHost, popover };
  }

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true });
  });

  it('does not set aria-describedby before the tooltip is shown', async () => {
    const { tooltipHost } = await createFixture();
    expect(tooltipHost.hasAttribute('aria-describedby')).toBe(false);
  });

  it('sets aria-describedby to the popover id on hover and clears it on mouseleave', async () => {
    const { fixture, tooltipHost, popover } = await createFixture();
    mockRect(tooltipHost, { top: 400, left: 400, width: 40, height: 20, bottom: 420, right: 440 });
    mockRect(popover, { width: 80, height: 30 });

    tooltipHost.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(tooltipHost.getAttribute('aria-describedby')).toBe(popover.id);

    tooltipHost.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(tooltipHost.hasAttribute('aria-describedby')).toBe(false);
  });

  it('shows on focusin and hides on focusout, so keyboard users get it too', async () => {
    const { fixture, tooltipHost, popover } = await createFixture();
    mockRect(tooltipHost, { top: 400, left: 400, width: 40, height: 20, bottom: 420, right: 440 });
    mockRect(popover, { width: 80, height: 30 });

    tooltipHost.dispatchEvent(new FocusEvent('focusin'));
    fixture.detectChanges();
    expect(tooltipHost.getAttribute('aria-describedby')).toBe(popover.id);

    tooltipHost.dispatchEvent(new FocusEvent('focusout'));
    fixture.detectChanges();
    expect(tooltipHost.hasAttribute('aria-describedby')).toBe(false);
  });

  it('hides on Escape', async () => {
    const { fixture, tooltipHost, popover } = await createFixture();
    mockRect(tooltipHost, { top: 400, left: 400, width: 40, height: 20, bottom: 420, right: 440 });
    mockRect(popover, { width: 80, height: 30 });

    tooltipHost.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(tooltipHost.hasAttribute('aria-describedby')).toBe(true);

    tooltipHost.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(tooltipHost.hasAttribute('aria-describedby')).toBe(false);
  });

  it('never shows when content is empty', async () => {
    const { fixture, tooltipHost } = await createFixture({ content: null });

    tooltipHost.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(tooltipHost.hasAttribute('aria-describedby')).toBe(false);
  });

  it('never shows when disabled', async () => {
    const { fixture, tooltipHost } = await createFixture({ disabled: true });

    tooltipHost.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(tooltipHost.hasAttribute('aria-describedby')).toBe(false);
  });

  it('flips to the opposite side when the preferred side would overflow the viewport', async () => {
    const { fixture, tooltipHost, popover } = await createFixture();
    // Trigger pinned to the very top of the viewport — 'top' can't fit above it.
    mockRect(tooltipHost, { top: 4, left: 200, width: 40, height: 20, bottom: 24, right: 240 });
    mockRect(popover, { width: 80, height: 30 });

    tooltipHost.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(popover.classList.contains('ds-tooltip--bottom')).toBe(true);
    expect(popover.classList.contains('ds-tooltip--top')).toBe(false);
  });

  it('keeps the preferred side when it fits within the viewport', async () => {
    const { fixture, tooltipHost, popover } = await createFixture();
    mockRect(tooltipHost, { top: 400, left: 400, width: 40, height: 20, bottom: 420, right: 440 });
    mockRect(popover, { width: 80, height: 30 });

    tooltipHost.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(popover.classList.contains('ds-tooltip--top')).toBe(true);
  });

  it('projects the trigger content', async () => {
    const { fixture } = await createFixture();
    expect(fixture.nativeElement.querySelector('button')?.textContent).toContain('Trigger');
  });
});
