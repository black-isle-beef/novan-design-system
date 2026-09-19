import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsDropdownComponent, type DsDropdownPosition } from './dropdown.component';
import { DsMenuItemComponent } from './menu-item.component';

@Component({
  standalone: true,
  imports: [DsDropdownComponent, DsMenuItemComponent],
  template: `
    <ds-dropdown label="Actions" [position]="position" [disabled]="disabled" [open]="open">
      <ds-menu-item (activated)="onFirst()">First action</ds-menu-item>
      <ds-menu-item [disabled]="secondDisabled" (activated)="onSecond()">Second action</ds-menu-item>
      <ds-menu-item (activated)="onThird()">Third action</ds-menu-item>
    </ds-dropdown>
  `,
})
class HostComponent {
  position: DsDropdownPosition = 'bottom-start';
  disabled = false;
  secondDisabled = false;
  open = false;
  onFirst = vi.fn();
  onSecond = vi.fn();
  onThird = vi.fn();
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

function dispatchToggle(el: HTMLElement, newState: 'open' | 'closed'): void {
  const event = new Event('toggle') as ToggleEvent;
  Object.defineProperty(event, 'newState', { value: newState, configurable: true });
  el.dispatchEvent(event);
}

describe('DsDropdownComponent', () => {
  let showPopoverSpy: ReturnType<typeof vi.fn>;
  let hidePopoverSpy: ReturnType<typeof vi.fn>;
  const attached: HTMLElement[] = [];

  beforeEach(() => {
    showPopoverSpy = vi.fn();
    hidePopoverSpy = vi.fn();
    HTMLElement.prototype.showPopover = showPopoverSpy as unknown as HTMLElement['showPopover'];
    HTMLElement.prototype.hidePopover = hidePopoverSpy as unknown as HTMLElement['hidePopover'];
  });

  afterEach(() => {
    delete (HTMLElement.prototype as { showPopover?: unknown }).showPopover;
    delete (HTMLElement.prototype as { hidePopover?: unknown }).hidePopover;
    attached.forEach((el) => el.remove());
    attached.length = 0;
  });

  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    attached.push(fixture.nativeElement);

    const trigger = fixture.nativeElement.querySelector('.ds-dropdown__trigger') as HTMLButtonElement;
    const menu = fixture.nativeElement.querySelector('.ds-dropdown__menu') as HTMLElement;
    mockRect(trigger, { top: 100, left: 100, width: 80, height: 32, bottom: 132, right: 180 });
    mockRect(menu, { width: 160, height: 120 });

    return { fixture, trigger, menu };
  }

  it('renders aria-haspopup="menu" and starts collapsed', async () => {
    const { trigger } = await createFixture();
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('wires the trigger to the menu via popovertarget/aria-controls', async () => {
    const { trigger, menu } = await createFixture();
    expect(trigger.getAttribute('popovertarget')).toBe(menu.id);
    expect(trigger.getAttribute('aria-controls')).toBe(menu.id);
  });

  it('ArrowDown on the trigger opens the menu and focuses the first item', async () => {
    const { fixture, trigger, menu } = await createFixture();

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    expect(showPopoverSpy).toHaveBeenCalledTimes(1);

    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const items = menu.querySelectorAll('.ds-menu-item__button');
    expect(document.activeElement).toBe(items[0]);
    expect(items[0].getAttribute('tabindex')).toBe('0');
  });

  it('ArrowUp on the trigger opens the menu and focuses the last item', async () => {
    const { fixture, trigger, menu } = await createFixture();

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    const items = menu.querySelectorAll('.ds-menu-item__button');
    expect(document.activeElement).toBe(items[2]);
  });

  it('ArrowDown/ArrowUp inside the menu move roving focus and skip disabled items', async () => {
    const { fixture, trigger, menu } = await createFixture();
    fixture.componentInstance.secondDisabled = true;
    fixture.detectChanges();

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    const items = menu.querySelectorAll('.ds-menu-item__button');
    expect(document.activeElement).toBe(items[0]);

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[2]); // second is disabled, skipped

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[0]); // wraps back, skipping disabled again
  });

  it('Home/End jump to the first/last enabled item', async () => {
    const { fixture, trigger, menu } = await createFixture();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    const items = menu.querySelectorAll('.ds-menu-item__button');

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[2]);

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[0]);
  });

  it('typeahead jumps to the next item whose label starts with the typed character', async () => {
    const { fixture, trigger, menu } = await createFixture();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    const items = menu.querySelectorAll('.ds-menu-item__button');
    expect(document.activeElement).toBe(items[0]); // "First action"

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 't' })); // "Third action"
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[2]);
  });

  it('activating an item closes the menu and fires the item\'s activated handler', async () => {
    const { fixture, trigger, menu } = await createFixture();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    const items = menu.querySelectorAll<HTMLButtonElement>('.ds-menu-item__button');
    items[0].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.onFirst).toHaveBeenCalledTimes(1);
    expect(hidePopoverSpy).toHaveBeenCalledTimes(1);
  });

  it('Tab closes the menu', async () => {
    const { fixture, trigger, menu } = await createFixture();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    fixture.detectChanges();

    expect(hidePopoverSpy).toHaveBeenCalledTimes(1);
  });

  it('restores focus to the trigger when the menu closes', async () => {
    const { fixture, trigger, menu } = await createFixture();
    trigger.focus();

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    dispatchToggle(menu, 'closed');
    fixture.detectChanges();

    expect(document.activeElement).toBe(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('emits openChange on every toggle, however it was triggered', async () => {
    const { fixture, trigger, menu } = await createFixture();
    let lastValue: boolean | undefined;
    const dropdown = fixture.debugElement.children.find((child) => child.name === 'ds-dropdown')
      ?.componentInstance as DsDropdownComponent;
    dropdown.openChange.subscribe((value: boolean) => (lastValue = value));

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    dispatchToggle(menu, 'open');
    fixture.detectChanges();
    expect(lastValue).toBe(true);

    dispatchToggle(menu, 'closed');
    fixture.detectChanges();
    expect(lastValue).toBe(false);
  });

  it('syncs the open input to the native popover via effect', async () => {
    const { fixture, menu } = await createFixture();

    fixture.componentInstance.open = true;
    fixture.detectChanges();
    expect(showPopoverSpy).toHaveBeenCalledTimes(1);

    dispatchToggle(menu, 'open');
    fixture.detectChanges();

    fixture.componentInstance.open = false;
    fixture.detectChanges();
    expect(hidePopoverSpy).toHaveBeenCalledTimes(1);
  });

  it('does not respond to ArrowDown on a disabled trigger', async () => {
    const { fixture, trigger } = await createFixture();
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    expect(showPopoverSpy).not.toHaveBeenCalled();
  });
});
