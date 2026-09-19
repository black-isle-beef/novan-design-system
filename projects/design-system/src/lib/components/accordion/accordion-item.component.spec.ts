import { TestBed } from '@angular/core/testing';
import { DsAccordionItemComponent } from './accordion-item.component';

describe('DsAccordionItemComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsAccordionItemComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsAccordionItemComponent);
    fixture.componentRef.setInput('summary', 'Shipping details');
    return fixture;
  }

  function getDetails(fixture: { nativeElement: HTMLElement }): HTMLDetailsElement {
    return fixture.nativeElement.querySelector('details') as HTMLDetailsElement;
  }

  it('renders the summary text and starts closed by default', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    const details = getDetails(fixture);
    expect(details.open).toBe(false);
    expect(details.querySelector('summary')?.textContent).toContain('Shipping details');
  });

  it('starts open when open is true', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    expect(getDetails(fixture).open).toBe(true);
  });

  it('emits openChange with the native open state on toggle', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    let lastValue: boolean | undefined;
    fixture.componentInstance.openChange.subscribe((value) => (lastValue = value));

    const details = getDetails(fixture);
    details.open = true;
    details.dispatchEvent(new Event('toggle'));

    expect(lastValue).toBe(true);
  });

  it('forceClose() closes an open panel and emits openChange(false)', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    let lastValue: boolean | undefined;
    fixture.componentInstance.openChange.subscribe((value) => (lastValue = value));

    fixture.componentInstance.forceClose();

    expect(getDetails(fixture).open).toBe(false);
    expect(lastValue).toBe(false);
  });

  it('forceClose() is a no-op on an already-closed panel', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    let emitted = false;
    fixture.componentInstance.openChange.subscribe(() => (emitted = true));

    fixture.componentInstance.forceClose();

    expect(emitted).toBe(false);
  });
});
