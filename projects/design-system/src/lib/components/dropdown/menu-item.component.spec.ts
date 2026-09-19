import { TestBed } from '@angular/core/testing';
import { DsMenuItemComponent } from './menu-item.component';

describe('DsMenuItemComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsMenuItemComponent] }).compileComponents();
    return TestBed.createComponent(DsMenuItemComponent);
  }

  function getButton(fixture: { nativeElement: HTMLElement }): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  }

  it('renders role="menuitem" with tabindex -1 by default', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    const button = getButton(fixture);
    expect(button.getAttribute('role')).toBe('menuitem');
    expect(button.getAttribute('tabindex')).toBe('-1');
  });

  it('sets tabindex 0 when setTabbable(true) is called', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    fixture.componentInstance.setTabbable(true);
    fixture.detectChanges();

    expect(getButton(fixture).getAttribute('tabindex')).toBe('0');
  });

  it('emits activated on click', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    let activatedCount = 0;
    fixture.componentInstance.activated.subscribe(() => activatedCount++);

    getButton(fixture).click();

    expect(activatedCount).toBe(1);
  });

  it('does not emit activated when disabled', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let activatedCount = 0;
    fixture.componentInstance.activated.subscribe(() => activatedCount++);

    getButton(fixture).click();

    expect(activatedCount).toBe(0);
    expect(getButton(fixture).disabled).toBe(true);
  });

  it('focus() focuses the native button', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);

    fixture.componentInstance.focus();

    expect(document.activeElement).toBe(getButton(fixture));
    fixture.nativeElement.remove();
  });

  it('exposes the trimmed button text as label', async () => {
    const fixture = await createFixture();
    getButton(fixture); // ensure view is initialized before projecting text via a wrapper below
    fixture.nativeElement.querySelector('button')!.textContent = '  Duplicate  ';
    fixture.detectChanges();

    expect(fixture.componentInstance.label).toBe('Duplicate');
  });
});
