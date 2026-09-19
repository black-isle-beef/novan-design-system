import { TestBed } from '@angular/core/testing';
import { DsAlertComponent } from './alert.component';

describe('DsAlertComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsAlertComponent] }).compileComponents();
    return TestBed.createComponent(DsAlertComponent);
  }

  it('defaults to the info variant and a status role', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('role')).toBe('status');
  });

  it('uses role="alert" for the danger and warning variants', async () => {
    const fixture = await createFixture();

    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('alert');

    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('alert');
  });

  it('uses role="status" for the success and info variants', async () => {
    const fixture = await createFixture();

    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('status');

    fixture.componentRef.setInput('variant', 'info');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('status');
  });

  it('is visible by default and has no close button', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.hidden).toBe(false);
    expect(fixture.nativeElement.querySelector('.ds-alert__close')).toBeNull();
  });

  it('renders a title only when one is provided', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ds-alert__title')).toBeNull();

    fixture.componentRef.setInput('title', 'Payment failed');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ds-alert__title')?.textContent).toContain('Payment failed');
  });

  it('renders a close button when dismissible, labeled with closeButtonLabel', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('dismissible', true);
    fixture.componentRef.setInput('closeButtonLabel', 'Dismiss alert');
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.ds-alert__close');
    expect(closeButton).toBeTruthy();
    expect(closeButton?.getAttribute('aria-label')).toBe('Dismiss alert');
  });

  it('hides itself and emits dismissed when the close button is clicked', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();

    let dismissedCount = 0;
    fixture.componentInstance.dismissed.subscribe(() => dismissedCount++);

    (fixture.nativeElement.querySelector('.ds-alert__close') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(dismissedCount).toBe(1);
    expect(fixture.nativeElement.hidden).toBe(true);
  });
});
