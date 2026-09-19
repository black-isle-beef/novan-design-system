import { TestBed } from '@angular/core/testing';
import { DsOffcanvasComponent } from './offcanvas.component';

describe('DsOffcanvasComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsOffcanvasComponent] }).compileComponents();
    return TestBed.createComponent(DsOffcanvasComponent);
  }

  function getDialog(fixture: { nativeElement: HTMLElement }): HTMLDialogElement {
    return fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
  }

  it('does not open the native dialog by default', async () => {
    const fixture = await createFixture();
    const showModal = vi.spyOn(HTMLDialogElement.prototype, 'showModal');
    fixture.detectChanges();

    expect(showModal).not.toHaveBeenCalled();
  });

  it('calls showModal() when open becomes true and close() when it becomes false', async () => {
    const fixture = await createFixture();
    const showModal = vi.spyOn(HTMLDialogElement.prototype, 'showModal').mockImplementation(function (
      this: HTMLDialogElement,
    ) {
      this.setAttribute('open', '');
    });
    const close = vi.spyOn(HTMLDialogElement.prototype, 'close').mockImplementation(function (
      this: HTMLDialogElement,
    ) {
      this.removeAttribute('open');
    });
    fixture.detectChanges();

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(showModal).toHaveBeenCalledTimes(1);

    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('defaults to the "start" placement', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    expect(getDialog(fixture).classList.contains('ds-offcanvas__dialog--start')).toBe(true);
  });

  it('applies the placement modifier class matching the placement input', async () => {
    const fixture = await createFixture();

    for (const placement of ['start', 'end', 'top', 'bottom'] as const) {
      fixture.componentRef.setInput('placement', placement);
      fixture.detectChanges();

      const dialog = getDialog(fixture);
      expect(dialog.classList.contains(`ds-offcanvas__dialog--${placement}`)).toBe(true);
      for (const other of ['start', 'end', 'top', 'bottom'] as const) {
        if (other !== placement) {
          expect(dialog.classList.contains(`ds-offcanvas__dialog--${other}`)).toBe(false);
        }
      }
    }
  });

  it('sets aria-labelledby to the heading id when a heading is provided', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('heading', 'Filters');
    fixture.detectChanges();

    const dialog = getDialog(fixture);
    const headingId = dialog.getAttribute('aria-labelledby');
    expect(headingId).toBeTruthy();
    expect(dialog.querySelector(`#${headingId}`)?.textContent).toContain('Filters');
    expect(dialog.hasAttribute('aria-label')).toBe(false);
  });

  it('falls back to ariaLabel for its accessible name when no heading is set', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('ariaLabel', 'Filter results');
    fixture.detectChanges();

    const dialog = getDialog(fixture);
    expect(dialog.getAttribute('aria-label')).toBe('Filter results');
    expect(dialog.hasAttribute('aria-labelledby')).toBe(false);
  });

  it('renders a close button by default and omits it when not dismissible', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();
    expect(getDialog(fixture).querySelector('.ds-offcanvas__close')).toBeTruthy();

    fixture.componentRef.setInput('dismissible', false);
    fixture.detectChanges();
    expect(getDialog(fixture).querySelector('.ds-offcanvas__close')).toBeNull();
  });

  it('emits openChange(false) and closed when the native dialog fires close', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    let openChangeValue: boolean | undefined;
    let closedCount = 0;
    fixture.componentInstance.openChange.subscribe((value) => (openChangeValue = value));
    fixture.componentInstance.closed.subscribe(() => closedCount++);

    getDialog(fixture).dispatchEvent(new Event('close'));

    expect(openChangeValue).toBe(false);
    expect(closedCount).toBe(1);
  });

  it('prevents the default Escape-to-close (cancel) gesture when not dismissible', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('dismissible', false);
    fixture.detectChanges();

    const cancelEvent = new Event('cancel', { cancelable: true });
    getDialog(fixture).dispatchEvent(cancelEvent);

    expect(cancelEvent.defaultPrevented).toBe(true);
  });

  it('allows the Escape-to-close (cancel) gesture when dismissible', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    const cancelEvent = new Event('cancel', { cancelable: true });
    getDialog(fixture).dispatchEvent(cancelEvent);

    expect(cancelEvent.defaultPrevented).toBe(false);
  });

  it('closes on a click that lands on the dialog element itself (the backdrop area)', async () => {
    const fixture = await createFixture();
    const close = vi.spyOn(HTMLDialogElement.prototype, 'close').mockImplementation(function (
      this: HTMLDialogElement,
    ) {
      this.removeAttribute('open');
    });
    fixture.detectChanges();

    const dialog = getDialog(fixture);
    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(close).toHaveBeenCalledTimes(1);
  });

  it('ignores a backdrop click when not dismissible', async () => {
    const fixture = await createFixture();
    const close = vi.spyOn(HTMLDialogElement.prototype, 'close').mockImplementation(function (
      this: HTMLDialogElement,
    ) {
      this.removeAttribute('open');
    });
    fixture.componentRef.setInput('dismissible', false);
    fixture.detectChanges();

    getDialog(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(close).not.toHaveBeenCalled();
  });

  it('restores focus to the previously focused element after closing', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const fixture = await createFixture();
    vi.spyOn(HTMLDialogElement.prototype, 'showModal').mockImplementation(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    fixture.detectChanges();

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    getDialog(fixture).dispatchEvent(new Event('close'));

    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });
});
