import { TestBed } from '@angular/core/testing';
import { DsToastComponent } from './toast.component';

describe('DsToastComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsToastComponent] }).compileComponents();
    return TestBed.createComponent(DsToastComponent);
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

  it('renders a title only when one is provided', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ds-toast__title')).toBeNull();

    fixture.componentRef.setInput('title', 'Upload complete');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ds-toast__title')?.textContent).toContain('Upload complete');
  });

  it('renders a close button by default and omits it when not dismissible', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ds-toast__close')).toBeTruthy();

    fixture.componentRef.setInput('dismissible', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ds-toast__close')).toBeNull();
  });

  it('labels the close button with closeButtonLabel', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('closeButtonLabel', 'Close notification');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ds-toast__close')?.getAttribute('aria-label')).toBe(
      'Close notification',
    );
  });

  it('emits dismissed when the close button is clicked', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    let dismissedCount = 0;
    fixture.componentInstance.dismissed.subscribe(() => dismissedCount++);

    (fixture.nativeElement.querySelector('.ds-toast__close') as HTMLButtonElement).click();

    expect(dismissedCount).toBe(1);
  });

  it('emits paused on mouseenter/focusin and resumed on mouseleave/focusout', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    let pausedCount = 0;
    let resumedCount = 0;
    fixture.componentInstance.paused.subscribe(() => pausedCount++);
    fixture.componentInstance.resumed.subscribe(() => resumedCount++);

    fixture.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    expect(pausedCount).toBe(1);

    fixture.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
    expect(resumedCount).toBe(1);

    fixture.nativeElement.dispatchEvent(new FocusEvent('focusin'));
    expect(pausedCount).toBe(2);

    fixture.nativeElement.dispatchEvent(new FocusEvent('focusout'));
    expect(resumedCount).toBe(2);
  });
});
